import nodemailer, { type SendMailOptions } from 'nodemailer';

export function getSmtpConfig() {
  const host = (process.env.EMAIL_HOST || process.env.SMTP_HOST || '').trim();
  const portValue = String(process.env.EMAIL_PORT || process.env.SMTP_PORT || 587).trim();
  const user = (process.env.EMAIL_USER || process.env.SMTP_USER || '').trim();
  const pass = (process.env.EMAIL_PASS || process.env.SMTP_PASSWORD || '').trim();
  const from = (process.env.EMAIL_FROM || process.env.SMTP_FROM || user || '').trim();

  const port = Number(portValue);

  if (!host || !user || !pass || !from) {
    console.error('[email] Missing SMTP configuration. Required: EMAIL_HOST/SMTP_HOST, EMAIL_PORT/SMTP_PORT, EMAIL_USER/SMTP_USER, EMAIL_PASS/SMTP_PASSWORD, EMAIL_FROM/SMTP_FROM.');
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
    throw new Error('Email service is not configured.');
  }

  const transporter = nodemailer.createTransport(transporterConfig);
  const fromAddress = (process.env.EMAIL_FROM || process.env.SMTP_FROM || process.env.EMAIL_USER || process.env.SMTP_USER || '').trim();

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
