import { parseJsonBody, readCsvRows } from './_contactUtils';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('Allow', 'GET');
    res.end(JSON.stringify({ message: 'Method not allowed.' }));
    return;
  }

  try {
    const rows = await readCsvRows();
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ count: rows.length, rows }));
  } catch (error: any) {
    console.error('Contacts API error:', error);
    res.statusCode = 500;
    res.end(JSON.stringify({ message: String(error?.message || 'Unable to read contacts.') }));
  }
}
