import express from 'express';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const EMAIL_SENDER = process.env.EMAIL_SENDER || 'manishkrgpta30@gmail.com';
const EMAIL_RECEIVER = process.env.EMAIL_RECEIVER || 'manishkrgpta@gmail.com';
const CSV_PATH = path.resolve(process.cwd(), 'contacts.csv');

const ensureCsvFile = () => {
  if (!fs.existsSync(CSV_PATH)) {
    const header = 'timestamp,name,email,countryCode,phone,company,budgetRange,budget,services,brief\n';
    fs.writeFileSync(CSV_PATH, header, 'utf8');
  }
};

ensureCsvFile();

const escapeCsv = (value = '') => {
  const str = String(value).replace(/"/g, '""').replace(/\r?\n/g, ' ');
  return `"${str}"`;
};

const appendContactCsv = async (row) => {
  const line = [
    escapeCsv(row.timestamp),
    escapeCsv(row.name),
    escapeCsv(row.email),
    escapeCsv(row.countryCode),
    escapeCsv(row.phone),
    escapeCsv(row.company),
    escapeCsv(row.budgetRange),
    escapeCsv(row.budget),
    escapeCsv(row.services),
    escapeCsv(row.brief)
  ].join(',') + '\n';

  await fs.promises.appendFile(CSV_PATH, line, 'utf8');
};

if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
  console.warn('Warning: SMTP credentials are not configured. Contact form email delivery will fail until SMTP_HOST, SMTP_USER, and SMTP_PASS are provided.');
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

app.post('/api/contact', async (req, res) => {
  const { name, email, countryCode, phone, company, budgetRange, brief, selectedServices, budget } = req.body;

  if (!name || !email || !brief || !budgetRange) {
    return res.status(400).json({ message: 'Name, email, budget range, and project objectives are required.' });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(String(email))) {
    return res.status(400).json({ message: 'A valid email address is required.' });
  }

  // Phone must be digits only if provided
  if (phone) {
    const digits = String(phone).replace(/\s+/g, '');
    if (!/^\d+$/.test(digits)) {
      return res.status(400).json({ message: 'Phone number must contain digits only.' });
    }
  }

  const reference = `ZNT-${Math.floor(100000 + Math.random() * 900000)}`;
  const subject = `New contact request from ${name}`;
  const serviceList = Array.isArray(selectedServices) && selectedServices.length > 0
    ? `<li>${selectedServices.join('</li><li>')}</li>`
    : '<li>No services selected</li>';

  const html = `
    <h2>New Contact Request</h2>
    <p><strong>Reference:</strong> ${reference}</p>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${countryCode || ''} ${phone || 'N/A'}</p>
    <p><strong>Company / Product:</strong> ${company || 'N/A'}</p>
    <p><strong>Budget Range:</strong> ${budgetRange || 'N/A'}</p>
    <p><strong>Estimated Budget:</strong> ${budget || 'N/A'}</p>
    <p><strong>Services Requested:</strong></p>
    <ul>${serviceList}</ul>
    <p><strong>System Objectives:</strong></p>
    <p>${String(brief).replace(/\n/g, '<br/>')}</p>
  `;

  const text = [
    `New contact request from ${name}`,
    `Reference: ${reference}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${countryCode || ''} ${phone || 'N/A'}`,
    `Company / Product: ${company || 'N/A'}`,
    `Budget Range: ${budgetRange || 'N/A'}`,
    `Estimated Budget: ${budget || 'N/A'}`,
    `Services: ${Array.isArray(selectedServices) ? selectedServices.join('; ') : ''}`,
    `Objectives: ${brief}`
  ].join('\n');

  try {
    await appendContactCsv({
      timestamp: new Date().toISOString(),
      name,
      email,
      countryCode,
      phone,
      company,
      budgetRange,
      budget,
      services: Array.isArray(selectedServices) ? selectedServices.join('; ') : '',
      brief
    });

    if (SENDGRID_API_KEY) {
      // Send via SendGrid API when API key is provided
      try {
        await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${SENDGRID_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            personalizations: [{ to: [{ email: EMAIL_RECEIVER }] }],
            from: { email: EMAIL_SENDER },
            subject,
            content: [
              { type: 'text/plain', value: text },
              { type: 'text/html', value: html }
            ]
          })
        });
      } catch (sgErr) {
        console.error('SendGrid send error:', sgErr);
        throw sgErr;
      }
    } else if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
      const info = await transporter.sendMail({
        from: EMAIL_SENDER,
        to: EMAIL_RECEIVER,
        replyTo: email,
        subject,
        text,
        html,
      });
      console.log('SMTP send info:', info);
    } else {
      console.warn('Email not configured - skipping email send. Provide SMTP_* or SENDGRID_API_KEY to enable email delivery.');
    }

    return res.json({ message: 'Contact request saved successfully.', reference });
  } catch (error) {
    console.error('Error handling contact request:', error);
    const message = error && error.message ? String(error.message) : 'Unable to process contact request.';
    return res.status(500).json({ message });
  }
});

// Return parsed contacts as JSON (useful for debugging submissions)
app.get('/api/contacts', async (req, res) => {
  try {
    const raw = await fs.promises.readFile(CSV_PATH, 'utf8');
    const lines = raw.split(/\r?\n/).filter((l) => l.trim() !== '');
    if (lines.length <= 1) return res.json({ count: 0, rows: [] });

    const dataLines = lines.slice(1); // skip header
    const rows = dataLines.map((line) => {
      const matches = line.match(/"((?:[^"]|"")*)"/g) || [];
      const fields = matches.map((m) => m.slice(1, -1).replace(/""/g, '"'));
      return {
        timestamp: fields[0] || null,
        name: fields[1] || null,
        email: fields[2] || null,
        countryCode: fields[3] || null,
        phone: fields[4] || null,
        company: fields[5] || null,
        budgetRange: fields[6] || null,
        budget: fields[7] || null,
        services: fields[8] || null,
        brief: fields[9] || null,
      };
    });

    return res.json({ count: rows.length, rows });
  } catch (error) {
    console.error('Error reading contacts.csv:', error);
    return res.status(500).json({ message: String(error) });
  }
});

// Download contacts.csv
app.get('/api/contacts/download', (req, res) => {
  res.download(CSV_PATH, 'contacts.csv', (err) => {
    if (err) {
      console.error('Error sending contacts.csv:', err);
    }
  });
});

// Resend the last contact row by email
app.post('/api/contact/resend', async (req, res) => {
  try {
    const raw = await fs.promises.readFile(CSV_PATH, 'utf8');
    const lines = raw.split(/\r?\n/).filter((l) => l.trim() !== '');
    if (lines.length <= 1) return res.status(400).json({ message: 'No contacts to resend.' });

    const last = lines[lines.length - 1];
    const matches = last.match(/"((?:[^"]|"")*)"/g) || [];
    const fields = matches.map((m) => m.slice(1, -1).replace(/""/g, '"'));

    const [timestamp, name, email, countryCode, phone, company, budgetRange, budget, services, brief] = fields;
    const reference = `ZNT-RESEND-${Math.floor(100000 + Math.random() * 900000)}`;
    const subject = `Resend: Contact request from ${name}`;
    const html = `
      <h2>Resent Contact Request</h2>
      <p><strong>Reference:</strong> ${reference}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${countryCode || ''} ${phone || 'N/A'}</p>
      <p><strong>Company / Product:</strong> ${company || 'N/A'}</p>
      <p><strong>Budget Range:</strong> ${budgetRange || 'N/A'}</p>
      <p><strong>Estimated Budget:</strong> ${budget || 'N/A'}</p>
      <p><strong>Services Requested:</strong></p>
      <p>${services}</p>
      <p><strong>System Objectives:</strong></p>
      <p>${(brief || '').replace(/\n/g, '<br/>')}</p>
    `;
    const text = `Resent contact request from ${name}\n\nReference: ${reference}\nName: ${name}\nEmail: ${email}\nPhone: ${countryCode || ''} ${phone || 'N/A'}\nCompany: ${company || 'N/A'}\nBudget Range: ${budgetRange || 'N/A'}\nEstimated Budget: ${budget || 'N/A'}\nServices: ${services}\nObjectives: ${brief}`;

    if (SENDGRID_API_KEY) {
      const sgRes = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: { Authorization: `Bearer ${SENDGRID_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ personalizations: [{ to: [{ email: EMAIL_RECEIVER }] }], from: { email: EMAIL_SENDER }, subject, content: [{ type: 'text/plain', value: text }, { type: 'text/html', value: html }] })
      });
      const sgText = await sgRes.text();
      console.log('SendGrid resend status:', sgRes.status, sgText);
      if (!sgRes.ok) throw new Error(`SendGrid resend failed: ${sgRes.status}`);
    } else if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
      const info = await transporter.sendMail({ from: EMAIL_SENDER, to: EMAIL_RECEIVER, replyTo: email, subject, text, html });
      console.log('SMTP resend info:', info);
    } else {
      console.warn('Email not configured - skipping resend.');
      return res.status(400).json({ message: 'Email not configured on server.' });
    }

    return res.json({ message: 'Resend attempted.', reference });
  } catch (error) {
    console.error('Error resending contact email:', error);
    return res.status(500).json({ message: String(error) });
  }
});

const port = Number(process.env.API_PORT || 5000);
app.listen(port, () => {
  console.log(`Contact API server running on http://localhost:${port}`);
});
