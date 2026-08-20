import nodemailer, { type SendMailOptions } from 'nodemailer';

function getEnv(...keys: string[]): string {
  for (const key of keys) {
    const value = process.env[key];

    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }

  return '';
}

/**
 * Titan Email SMTP configuration
 *
 * SMTP:
 * Host: smtp.titan.email
 * Port: 465
 * Security: SSL
 */
export function getSmtpConfig() {
  const host = getEnv('EMAIL_HOST') || 'smtp.titan.email';

  const user = getEnv('EMAIL_USER');

  const pass = getEnv('EMAIL_PASS');

  const from = getEnv('EMAIL_FROM') || user;

  // For Titan, keep the SMTP port fixed at 465.
  // This prevents old Railway variables such as SMTP_PORT=587
  // from accidentally overriding the configuration.
  const port = 465;

  // -----------------------------
  // Validate configuration
  // -----------------------------

  if (!host) {
    console.error('[email] SMTP host is missing.');
    return null;
  }

  if (!user) {
    console.error('[email] EMAIL_USER is missing.');
    return null;
  }

  if (!pass) {
    console.error('[email] EMAIL_PASS is missing.');
    return null;
  }

  if (!from) {
    console.error('[email] EMAIL_FROM is missing.');
    return null;
  }

  const config = {
    host,
    port,
    secure: true,

    auth: {
      user,
      pass,
    },

    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 30000,
  };

  console.log('[email] SMTP configuration loaded:', {
    host: config.host,
    port: config.port,
    secure: config.secure,
    user: `${user.substring(0, 3)}***`,
    from,
  });

  return config;
}

/**
 * Convert SMTP errors into user-friendly messages.
 */
export function getEmailErrorMessage(error: unknown): string {
  if (!(error instanceof Error)) {
    return 'Unable to send email. Please try again later.';
  }

  const message = error.message.toLowerCase();

  console.error('[email] Error details:', {
    name: error.name,
    message: error.message,
  });

  // -----------------------------
  // Authentication errors
  // -----------------------------

  if (
    message.includes('authentication failed') ||
    message.includes('invalid login') ||
    message.includes('invalid credentials') ||
    message.includes('535') ||
    message.includes('535-5.7.8')
  ) {
    return 'Titan SMTP authentication failed. Please verify the Titan email address and mailbox password configured in Railway.';
  }

  // -----------------------------
  // DNS / hostname errors
  // -----------------------------

  if (
    message.includes('enotfound') ||
    message.includes('getaddrinfo') ||
    message.includes('host not found')
  ) {
    return 'Titan SMTP server could not be found. Please verify the SMTP hostname.';
  }

  // -----------------------------
  // Connection timeout
  // -----------------------------

  if (
    message.includes('etimedout') ||
    message.includes('timed out') ||
    message.includes('connection timeout')
  ) {
    return 'Unable to connect to the Titan SMTP server. The SMTP connection timed out.';
  }

  // -----------------------------
  // Connection refused
  // -----------------------------

  if (
    message.includes('econnrefused') ||
    message.includes('connection refused')
  ) {
    return 'Titan SMTP connection was refused. Please verify the SMTP server and port.';
  }

  // -----------------------------
  // TLS / SSL errors
  // -----------------------------

  if (
    message.includes('tls') ||
    message.includes('ssl') ||
    message.includes('certificate')
  ) {
    return 'Titan SMTP SSL/TLS connection failed. Please verify the Titan SMTP security settings.';
  }

  // -----------------------------
  // Generic error
  // -----------------------------

  return `Email sending failed: ${error.message}`;
}

/**
 * Send email through Titan SMTP.
 */
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

  /**
   * Use the authenticated Titan account as the sender.
   */
  const fromAddress = transporterConfig.auth.user;

  const transporter = nodemailer.createTransport({
    ...transporterConfig,

    // Titan port 465 = direct SSL
    secure: true,
  });

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
    console.log('[email] Verifying Titan SMTP connection...', {
      host: transporterConfig.host,
      port: transporterConfig.port,
      secure: transporterConfig.secure,
      from: fromAddress,
      to: options.to,
    });

    /**
     * Test SMTP connection and authentication.
     */
    await transporter.verify();

    console.log(
      '[email] Titan SMTP connection verified successfully.'
    );

    /**
     * Send email.
     */
    const info = await transporter.sendMail(mailOptions);

    console.log('[email] Email sent successfully:', {
      messageId: info.messageId,
      to: options.to,
      response: info.response,
    });

    return info;
  } catch (error) {
    console.error('[email] Titan SMTP send failed:', {
      error:
        error instanceof Error
          ? error.message
          : 'Unknown SMTP error',

      name:
        error instanceof Error
          ? error.name
          : 'Unknown',

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