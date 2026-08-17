import nodemailer from 'nodemailer';

export const RESEND_API_KEY = process.env.RESEND_API_KEY;
export const EMAIL_RECEIVER = process.env.EMAIL_RECEIVER || 'hello@example.com';
export const EMAIL_SENDER = process.env.EMAIL_SENDER || process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
export const SMTP_HOST = process.env.SMTP_HOST;
export const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
export const SMTP_USER = process.env.SMTP_USER;
export const SMTP_PASS = process.env.SMTP_PASS;

export const escapeHtml = (value: unknown): string => {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\r?\n/g, '<br />');
};

export const normalizePhone = (value?: string): string => {
  if (!value) return '';
  return String(value).replace(/\D/g, '').slice(0, 12);
};

export const isValidEmail = (value: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
};

export const generateReference = (): string => `ZNT-${Math.floor(100000 + Math.random() * 900000)}`;

export const parseJsonBody = async (req: any) => {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return req.body;
  }

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const text = Buffer.concat(chunks).toString('utf8').trim();
  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    const malformed = new Error('Malformed JSON request body.');
    (malformed as any).statusCode = 400;
    throw malformed;
  }
};

export const sendEmailWithSmtp = async ({ subject, text, html, replyTo }: { subject: string; text: string; html: string; replyTo?: string }) => {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP email configuration is missing.');
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: EMAIL_SENDER,
    to: EMAIL_RECEIVER,
    replyTo: replyTo && isValidEmail(replyTo) ? replyTo : undefined,
    subject,
    text,
    html,
  });

  return 'sent';
};

export const postEmail = async ({ subject, text, html, replyTo }: { subject: string; text: string; html: string; replyTo?: string }) => {
  if (RESEND_API_KEY) {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: EMAIL_SENDER,
        to: [EMAIL_RECEIVER],
        subject,
        text,
        html,
        reply_to: replyTo && isValidEmail(replyTo) ? replyTo : undefined,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Resend API failed: ${response.status} ${body}`);
    }

    return 'sent';
  }

  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    return sendEmailWithSmtp({ subject, text, html, replyTo });
  }

  throw new Error('Email provider is not configured.');
};
