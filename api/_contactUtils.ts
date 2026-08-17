import fs from 'fs';
import path from 'path';

export const RESEND_API_KEY = process.env.RESEND_API_KEY;
export const EMAIL_SENDER = 'mrxtechnp@gmail.com';
export const EMAIL_RECEIVER = process.env.EMAIL_RECEIVER || 'manishkrgpta@gmail.com';

const baseDir = process.cwd();
export const CSV_PATH = path.resolve(baseDir, 'contacts.csv');

export const ensureCsvFile = async () => {
  if (!fs.existsSync(CSV_PATH)) {
    const header = 'timestamp,name,email,countryCode,phone,company,budgetRange,budget,services,brief\n';
    await fs.promises.writeFile(CSV_PATH, header, 'utf8');
  }
};

export const escapeCsv = (value = '') => {
  const str = String(value).replace(/"/g, '""').replace(/\r?\n/g, ' ');
  return `"${str}"`;
};

export const appendContactCsv = async (row: Record<string, any>) => {
  await ensureCsvFile();
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
    escapeCsv(row.brief),
  ].join(',') + '\n';
  await fs.promises.appendFile(CSV_PATH, line, 'utf8');
};

export const readCsvText = async () => {
  await ensureCsvFile();
  return fs.promises.readFile(CSV_PATH, 'utf8');
};

export const readCsvRows = async () => {
  const raw = await readCsvText();
  const lines = raw.split(/\r?\n/).filter((line) => line.trim() !== '');
  if (lines.length <= 1) return [];
  const rows = lines.slice(1).map((line) => {
    const matches = line.match(/"((?:[^\"]|\"\")*)"/g) || [];
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
  return rows;
};

export const parseJsonBody = async (req: any) => {
  if (req.body) return req.body;
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const text = Buffer.concat(chunks).toString('utf8');
  if (!text) return {};
  return JSON.parse(text);
};

export const postEmail = async ({ subject, text, html, replyTo }: { subject: string; text: string; html: string; replyTo?: string }) => {
  if (!RESEND_API_KEY) {
    return 'skipped';
  }

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
      reply_to: replyTo || EMAIL_SENDER,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend API failed: ${response.status} ${body}`);
  }

  return 'sent';
};
