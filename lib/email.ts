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
  const host = getEnv('EMAIL_HOST', 'SMTP_HOST', 'MAIL_HOST', 'SMTP_HOSTNAME');
  const portValue = getEnv('EMAIL_PORT', 'SMTP_PORT', 'MAIL_PORT', 'EMAIL_SMTP_PORT') || '587';
  const user = getEnv('EMAIL_USER', 'SMTP_USER', 'MAIL_USER', 'GMAIL_USER');
  const pass = getEnv('EMAIL_PASS', 'EMAIL_PASSWORD', 'SMTP_PASSWORD', 'MAIL_PASSWORD', 'GMAIL_APP_PASSWORD');
  const from = getEnv('EMAIL_FROM', 'SMTP_FROM', 'MAIL_FROM', 'EMAIL_USER', 'SMTP_USER', 'GMAIL_USER');

  const port = Number(portValue);

  if (!host || !user || !pass || !from) {
    console.error('[email] Missing SMTP configuration. Required one of: EMAIL_HOST/SMTP_HOST/MAIL_HOST, EMAIL_PORT/SMTP_PORT/MAIL_PORT, EMAIL_USER/SMTP_USER/GMAIL_USER, EMAIL_PASS/EMAIL_PASSWORD/SMTP_PASSWORD/GMAIL_APP_PASSWORD, EMAIL_FROM/SMTP_FROM/MAIL_FROM.');
    return null;
  }

  if (!Number.isFinite(port) || port <= 0) {
    console.error('[email] Invalid SMTP port configured.', { portValue });
    return null;
  }

return {
  host,
  port,
  secure: port === 465,
  family: 4, // Force IPv4 and avoid Railway IPv6 ENETUNREACH
  auth: { user, pass },
  tls: { rejectUnauthorized: false },
  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
};
}

export function getEmailErrorMessage(error: unknown) {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    if (message.includes('missing smtp configuration') || message.includes('email service is not configured')) {
      return 'Email service is not configured in the deployment environment.';
    }

    if (message.includes('authentication failed') || message.includes('535') || message.includes('535-5.7.8')) {
      return 'SMTP authentication failed. Please verify the email username and Gmail App Password in Railway.';
    }

    if (message.includes('connection') || message.includes('timed out') || message.includes('econnrefused')) {
      return 'SMTP connection failed. Please check the SMTP host and port in Railway.';
    }

    return 'The mail server rejected the request. Please verify the deployment email settings.';
  }

  return 'The mail server rejected the request. Please verify the deployment email settings.';
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

  const transporter = nodemailer.createTransport(transporterConfig);
  const fromAddress = getEnv('EMAIL_FROM', 'SMTP_FROM', 'MAIL_FROM', 'EMAIL_USER', 'SMTP_USER', 'GMAIL_USER');

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
    await transporter.verify();
    const info = await transporter.sendMail(mailOptions);
    console.log('[email] Email sent successfully', {
      messageId: info.messageId,
      to: options.to,
      replyTo: options.replyTo || null,
    });
    return info;
  } catch (error) {
    console.error('[email] SMTP send failed', {
      error: error instanceof Error ? error.message : 'Unknown SMTP error',
      to: options.to,
      from: fromAddress,
      host: transporterConfig.host,
      port: transporterConfig.port,
    });
    throw error;
  }
}
