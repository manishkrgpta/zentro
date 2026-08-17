import { readCsvRows, postEmail } from '../_contactUtils';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Allow', 'POST');
    res.end(JSON.stringify({ message: 'Method not allowed.' }));
    return;
  }

  try {
    const rows = await readCsvRows();
    if (rows.length === 0) {
      res.statusCode = 400;
      res.end(JSON.stringify({ message: 'No contacts to resend.' }));
      return;
    }

    const last = rows[rows.length - 1];
    const reference = `ZNT-RESEND-${Math.floor(100000 + Math.random() * 900000)}`;
    const subject = `Resend: Contact request from ${last.name || 'Unknown'}`;
    const html = `
      <h2>Resent Contact Request</h2>
      <p><strong>Reference:</strong> ${reference}</p>
      <p><strong>Name:</strong> ${last.name || 'N/A'}</p>
      <p><strong>Email:</strong> ${last.email || 'N/A'}</p>
      <p><strong>Phone:</strong> ${last.countryCode || ''} ${last.phone || 'N/A'}</p>
      <p><strong>Company / Product:</strong> ${last.company || 'N/A'}</p>
      <p><strong>Budget Range:</strong> ${last.budgetRange || 'N/A'}</p>
      <p><strong>Estimated Budget:</strong> ${last.budget || 'N/A'}</p>
      <p><strong>Services Requested:</strong> ${last.services || 'N/A'}</p>
      <p><strong>System Objectives:</strong></p>
      <p>${String(last.brief).replace(/\n/g, '<br/>')}</p>
    `;
    const text = `Resent contact request from ${last.name || 'Unknown'}\n\nReference: ${reference}\nName: ${last.name || 'N/A'}\nEmail: ${last.email || 'N/A'}\nPhone: ${last.countryCode || ''} ${last.phone || 'N/A'}\nCompany / Product: ${last.company || 'N/A'}\nBudget Range: ${last.budgetRange || 'N/A'}\nEstimated Budget: ${last.budget || 'N/A'}\nServices: ${last.services || 'N/A'}\nObjectives: ${last.brief || 'N/A'}`;

    let emailStatus = 'skipped';
    try {
      emailStatus = await postEmail({ subject, html, text, replyTo: last.email });
    } catch (error: any) {
      console.error('Resend email failure:', error);
      emailStatus = 'failed';
    }

    const message = emailStatus === 'failed' ? 'Resend attempted, but email delivery failed.' : 'Resend attempted.';
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message, reference, emailStatus }));
  } catch (error: any) {
    console.error('Resend API error:', error);
    res.statusCode = 500;
    res.end(JSON.stringify({ message: String(error?.message || 'Unable to resend contact request.') }));
  }
}
