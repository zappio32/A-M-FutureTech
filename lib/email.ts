import nodemailer, { type SendMailOptions } from 'nodemailer';

export function getSmtpConfig() {
  const host = process.env.EMAIL_HOST || process.env.SMTP_HOST;
  const port = Number(process.env.EMAIL_PORT || process.env.SMTP_PORT || 587);
  const user = process.env.EMAIL_USER || process.env.SMTP_USER;
  const pass = process.env.EMAIL_PASS || process.env.SMTP_PASSWORD;
  const from = process.env.EMAIL_FROM || process.env.SMTP_FROM || user;

  if (!host || !user || !pass || !from) {
    return null;
  }

  return {
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
  };
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
    console.error('[email] SMTP configuration is missing. Set EMAIL_HOST/SMTP_HOST, EMAIL_PORT/SMTP_PORT, EMAIL_USER/SMTP_USER, EMAIL_PASS/SMTP_PASSWORD, and EMAIL_FROM/SMTP_FROM.');
    throw new Error('Email service is not configured.');
  }

  const transporter = nodemailer.createTransport(transporterConfig);

  const mailOptions: SendMailOptions = {
    from: process.env.EMAIL_FROM || process.env.SMTP_FROM || process.env.EMAIL_USER || process.env.SMTP_USER,
    to: options.to,
    replyTo: options.replyTo,
    subject: options.subject,
    html: options.html,
    text: options.text,
    attachments: options.attachments,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('[email] Email sent successfully', {
      messageId: info.messageId,
      to: options.to,
      replyTo: options.replyTo || null,
    });
    return info;
  } catch (error) {
    console.error('[email] Email send failed', {
      error: error instanceof Error ? error.message : 'Unknown SMTP error',
      to: options.to,
    });
    throw error;
  }
}
