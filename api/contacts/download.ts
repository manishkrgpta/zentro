import { readCsvText } from '../_contactUtils';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('Allow', 'GET');
    res.end(JSON.stringify({ message: 'Method not allowed.' }));
    return;
  }

  try {
    const rawCsv = await readCsvText();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="contacts.csv"');
    res.end(rawCsv);
  } catch (error: any) {
    console.error('Download API error:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: String(error?.message || 'Unable to download contacts.') }));
  }
}
