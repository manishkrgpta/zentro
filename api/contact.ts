import { appendContactCsv, parseJsonBody, postEmail } from './_contactUtils';

const buildEmailPayload = (payload: any) => {
  const { name, email, countryCode, phone, company, budgetRange, brief, selectedServices, budget } = payload;
  const subject = `New contact request from ${name}`;
  const html = `
    <h2>New Contact Request</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${countryCode || ''} ${phone || 'N/A'}</p>
    <p><strong>Company / Product:</strong> ${company || 'N/A'}</p>
    <p><strong>Budget Range:</strong> ${budgetRange || 'N/A'}</p>
    <p><strong>Estimated Budget:</strong> ${budget || 'N/A'}</p>
    <p><strong>Services Requested:</strong> ${Array.isArray(selectedServices) ? selectedServices.join(', ') : 'None'}</p>
    <p><strong>System Objectives:</strong></p>
    <p>${String(brief).replace(/\n/g, '<br/>')}</p>
  `;
  const text = [
    `New contact request from ${name}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${countryCode || ''} ${phone || 'N/A'}`,
    `Company / Product: ${company || 'N/A'}`,
    `Budget Range: ${budgetRange || 'N/A'}`,
    `Estimated Budget: ${budget || 'N/A'}`,
    `Services: ${Array.isArray(selectedServices) ? selectedServices.join('; ') : 'None'}`,
    `Objectives: ${brief}`,
  ].join('\n');

  return { subject, html, text };
};

const validateRequest = (payload: any) => {
  const { name, email, brief, budgetRange, phone } = payload;
  if (!name || !email || !brief || !budgetRange) {
    return 'Name, email, budget range, and project objectives are required.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(String(email))) {
    return 'A valid email address is required.';
  }

  if (phone) {
    const digits = String(phone).replace(/\D/g, '');
    if (!/^\d+$/.test(digits)) {
      return 'Phone number must contain digits only.';
    }
    if (digits.length > 12) {
      return 'Phone number can contain at most 12 digits.';
    }
  }

  return null;
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Allow', 'POST');
    res.end(JSON.stringify({ message: 'Method not allowed.' }));
    return;
  }

  try {
    const payload = await parseJsonBody(req);
    const validationError = validateRequest(payload);
    if (validationError) {
      res.statusCode = 400;
      res.end(JSON.stringify({ message: validationError }));
      return;
    }

    const reference = `ZNT-${Math.floor(100000 + Math.random() * 900000)}`;
    await appendContactCsv({
      timestamp: new Date().toISOString(),
      name: payload.name,
      email: payload.email,
      countryCode: payload.countryCode,
      phone: payload.phone,
      company: payload.company,
      budgetRange: payload.budgetRange,
      budget: payload.budget,
      services: Array.isArray(payload.selectedServices) ? payload.selectedServices.join('; ') : '',
      brief: payload.brief,
    });

    const { subject, html, text } = buildEmailPayload(payload);
    let emailStatus = 'skipped';

    try {
      emailStatus = await postEmail({ subject, html, text, replyTo: payload.email });
    } catch (error: any) {
      console.error('Email send failure:', error);
      emailStatus = 'failed';
    }

    const message = emailStatus === 'failed'
      ? 'Contact request saved, but email delivery failed.'
      : 'Contact request saved successfully.';

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message, reference, emailStatus }));
  } catch (error: any) {
    console.error('Contact API error:', error);
    res.statusCode = 500;
    res.end(JSON.stringify({ message: String(error?.message || 'Unable to process contact request.') }));
  }
}
