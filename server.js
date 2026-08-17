import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
app.use(express.json());

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_RECEIVER = process.env.EMAIL_RECEIVER || 'hello@example.com';
const EMAIL_SENDER = process.env.EMAIL_SENDER || process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

const escapeHtml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/\"/g, '&quot;')
  .replace(/'/g, '&#039;')
  .replace(/\r?\n/g, '<br />');

const normalizePhone = (value = '') => String(value).replace(/\D/g, '').slice(0, 12);
const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
const generateReference = () => `ZNT-${Math.floor(100000 + Math.random() * 900000)}`;

const asyncJsonBody = async (req) => {
  if (req.body && typeof req.body === 'object') return req.body;
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  const text = Buffer.concat(chunks).toString('utf8').trim();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch (error) {
    const malformed = new Error('Malformed JSON request body.');
    malformed.statusCode = 400;
    throw malformed;
  }
};

const sendEmailWithSmtp = async ({ subject, text, html, replyTo }) => {
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

const postEmail = async ({ subject, text, html, replyTo }) => {
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

const validateRequest = (payload) => {
  const { name, email, brief, budgetRange, phone } = payload || {};
  if (!name || !String(name).trim()) return 'Name is required.';
  if (!email || !String(email).trim()) return 'Email is required.';
  if (!isValidEmail(String(email))) return 'A valid email address is required.';
  if (!budgetRange || !String(budgetRange).trim()) return 'Budget range is required.';
  if (!brief || !String(brief).trim()) return 'Project objectives are required.';
  if (phone !== undefined && phone !== null && String(phone).trim() !== '') {
    const digits = normalizePhone(phone);
    if (!/^\d+$/.test(digits) || digits.length > 12) return 'Phone number must contain up to 12 digits.';
  }
  return null;
};

const buildEmailPayload = (payload) => {
  const cleanName = String(payload.name || 'N/A');
  const cleanEmail = String(payload.email || 'N/A');
  const cleanPhone = `${payload.countryCode || ''} ${payload.phone || 'N/A'}`.trim();
  const cleanCompany = String(payload.company || 'N/A');
  const cleanBudgetRange = String(payload.budgetRange || 'N/A');
  const cleanBudget = String(payload.budget || payload.estimatedBudget || 'N/A');
  const cleanServices = Array.isArray(payload.selectedServices) && payload.selectedServices.length > 0 ? payload.selectedServices.join(', ') : 'No services selected';
  const cleanBrief = String(payload.brief || 'N/A');

  const subject = `New Zentro project inquiry from ${cleanName}`;
  const html = `
    <h2>New Contact Request</h2>
    <p><strong>Reference:</strong> ${escapeHtml(payload.reference || 'N/A')}</p>
    <p><strong>Name:</strong> ${escapeHtml(cleanName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(cleanPhone)}</p>
    <p><strong>Company / Product:</strong> ${escapeHtml(cleanCompany)}</p>
    <p><strong>Budget Range:</strong> ${escapeHtml(cleanBudgetRange)}</p>
    <p><strong>Estimated Budget:</strong> ${escapeHtml(cleanBudget)}</p>
    <p><strong>Selected Services:</strong> ${escapeHtml(cleanServices)}</p>
    <p><strong>System Objectives:</strong></p>
    <p>${escapeHtml(cleanBrief)}</p>
  `;

  const text = [
    `New Zentro project inquiry from ${cleanName}`,
    `Reference: ${payload.reference || 'N/A'}`,
    `Name: ${cleanName}`,
    `Email: ${cleanEmail}`,
    `Phone: ${cleanPhone}`,
    `Company / Product: ${cleanCompany}`,
    `Budget Range: ${cleanBudgetRange}`,
    `Estimated Budget: ${cleanBudget}`,
    `Selected Services: ${cleanServices}`,
    `System Objectives: ${cleanBrief}`,
  ].join('\n');

  return { subject, html, text };
};

app.post('/api/contact', async (req, res) => {
  try {
    const payload = await asyncJsonBody(req);
    const validationError = validateRequest(payload);
    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    const reference = generateReference();
    const submission = {
      ...payload,
      reference,
      phone: normalizePhone(payload.phone),
      email: String(payload.email).trim(),
      name: String(payload.name).trim(),
      company: String(payload.company || '').trim(),
      brief: String(payload.brief).trim(),
      budget: payload.budget ?? payload.estimatedBudget ?? payload.budgetRange,
    };

    const { subject, html, text } = buildEmailPayload(submission);
    await postEmail({ subject, html, text, replyTo: submission.email });

    return res.status(200).json({
      success: true,
      message: 'Contact request submitted successfully.',
      reference,
    });
  } catch (error) {
    console.error('Contact API error:', error);
    const statusCode = error && error.statusCode === 400 ? 400 : 500;
    const message = statusCode === 400 ? (error.message || 'Invalid request.') : 'Unable to process contact request.';
    return res.status(statusCode).json({ success: false, message });
  }
});

const PORT = Number(process.env.PORT || process.env.API_PORT || 5001);

const startServer = (port) => {
  app.listen(port, () => {
    console.log(`Express API listening on port ${port}`);
  }).on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      const nextPort = port + 1;
      console.warn(`Port ${port} is busy, retrying on ${nextPort}`);
      startServer(nextPort);
      return;
    }

    throw error;
  });
};

startServer(PORT);
