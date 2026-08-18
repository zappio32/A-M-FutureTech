import nodemailer, { type SendMailOptions } from 'nodemailer';

function getEnv(...keys: string[]) {
  for (const key of keys) {
    const value = process.env[key];

    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }

  return '';
}

export function getSmtpConfig() {
  const host = getEnv(
    'EMAIL_HOST',
    'SMTP_HOST',
    'MAIL_HOST',
    'SMTP_HOSTNAME'
  );

  const portValue =
    getEnv(
      'EMAIL_PORT',
      'SMTP_PORT',
      'MAIL_PORT',
      'EMAIL_SMTP_PORT'
    ) || '465';

  const user = getEnv(
    'EMAIL_USER',
    'SMTP_USER',
    'MAIL_USER',
    'GMAIL_USER'
  );

  const pass = getEnv(
    'EMAIL_PASS',
    'EMAIL_PASSWORD',
    'SMTP_PASSWORD',
    'MAIL_PASSWORD',
    'GMAIL_APP_PASSWORD'
  );

  const from = getEnv(
    'EMAIL_FROM',
    'SMTP_FROM',
    'MAIL_FROM',
    'EMAIL_USER',
    'SMTP_USER',
    'GMAIL_USER'
  );

  const port = Number(portValue);

  // Validate configuration
  if (!host) {
    console.error('[email] SMTP host is missing.');
    return null;
  }

  if (!user) {
    console.error('[email] SMTP username is missing.');
    return null;
  }

  if (!pass) {
    console.error('[email] SMTP password/App Password is missing.');
    return null;
  }

  if (!from) {
    console.error('[email] FROM email address is missing.');
    return null;
  }

  if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    console.error('[email] Invalid SMTP port:', portValue);
    return null;
  }

  console.log('[email] SMTP configuration loaded:', {
    host,
    port,
    secure: port === 465,
    user: user ? `${user.substring(0, 3)}***` : 'missing',
    from,
  });

 return {
  host,
  port,

  // Titan SMTP port 465 uses SSL
  secure: true,

  auth: {
    user,
    pass,
  },

  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
};
}

export function getEmailErrorMessage(error: unknown) {
  if (!(error instanceof Error)) {
    return 'The mail server rejected the request. Please verify the deployment email settings.';
  }

  const message = error.message.toLowerCase();

  console.error('[email] Error details:', {
    name: error.name,
    message: error.message,
  });

  // Missing configuration
  if (
    message.includes('missing smtp configuration') ||
    message.includes('email service is not configured')
  ) {
    return 'Email service is not configured in the deployment environment.';
  }

  // Gmail authentication errors
  if (
    message.includes('authentication failed') ||
    message.includes('invalid login') ||
    message.includes('535') ||
    message.includes('535-5.7.8')
  ) {
    return 'SMTP authentication failed. Please verify your Gmail address and 16-digit Gmail App Password in Railway.';
  }

  // DNS / hostname errors
  if (
    message.includes('enotfound') ||
    message.includes('getaddrinfo') ||
    message.includes('host not found')
  ) {
    return 'SMTP host could not be found. Please verify EMAIL_HOST in Railway.';
  }

  // Timeout errors
  if (
    message.includes('etimedout') ||
    message.includes('timed out') ||
    message.includes('connection timeout')
  ) {
    return 'SMTP connection timed out. Railway could not connect to the mail server. Please verify SMTP host, port, and provider settings.';
  }

  // Connection refused
  if (
    message.includes('econnrefused') ||
    message.includes('connection refused')
  ) {
    return 'SMTP connection was refused. Please verify the SMTP host and port.';
  }

  // TLS / SSL errors
  if (
    message.includes('tls') ||
    message.includes('ssl') ||
    message.includes('certificate')
  ) {
    return 'SMTP TLS/SSL connection failed. Please check whether the SMTP port uses SSL (465) or STARTTLS (587).';
  }

  return `Email sending failed: ${error.message}`;
}

export async function sendEmail(options: {
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
  attachments?: SendMailOptions['attachments'];
}) {
  const transporterConfig = getSmtpConfig();

  if (!transporterConfig) {
    throw new Error('Email service is not configured.');
  }

  const fromAddress = getEnv(
    'EMAIL_FROM',
    'SMTP_FROM',
    'MAIL_FROM',
    'EMAIL_USER',
    'SMTP_USER',
    'GMAIL_USER'
  );

  const transporter = nodemailer.createTransport(transporterConfig);

  const mailOptions: SendMailOptions = {
    from: fromAddress,
    to: options.to,
    replyTo: options.replyTo,
    subject: options.subject,
    html: options.html,
    text: options.text,
    attachments: options.attachments,
  };

  try {
    console.log('[email] Verifying SMTP connection...', {
      host: transporterConfig.host,
      port: transporterConfig.port,
      secure: transporterConfig.secure,
    });

    await transporter.verify();

    console.log('[email] SMTP connection verified successfully.');

    const info = await transporter.sendMail(mailOptions);

    console.log('[email] Email sent successfully:', {
      messageId: info.messageId,
      to: options.to,
      response: info.response,
    });

    return info;
  } catch (error) {
    console.error('[email] SMTP send failed:', {
      error: error instanceof Error ? error.message : 'Unknown SMTP error',
      name: error instanceof Error ? error.name : 'Unknown',
      host: transporterConfig.host,
      port: transporterConfig.port,
      secure: transporterConfig.secure,
      from: fromAddress,
      to: options.to,
    });

    throw error;
  } finally {
    transporter.close();
  }
}