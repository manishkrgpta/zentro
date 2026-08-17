import { escapeHtml, generateReference, isValidEmail, normalizePhone, parseJsonBody, postEmail } from './_contactUtils';

const buildEmailPayload = (payload: any) => {
  const { name, email, countryCode, phone, company, budgetRange, brief, selectedServices, budget } = payload;

  const cleanName = String(name || 'N/A');
  const cleanEmail = String(email || 'N/A');
  const cleanPhone = `${countryCode || ''} ${phone || 'N/A'}`.trim();
  const cleanCompany = String(company || 'N/A');
  const cleanBudgetRange = String(budgetRange || 'N/A');
  const cleanBudget = String(budget || 'N/A');
  const cleanServices = Array.isArray(selectedServices) && selectedServices.length > 0 ? selectedServices.join(', ') : 'No services selected';
  const cleanBrief = String(brief || 'N/A');

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

const validateRequest = (payload: any) => {
  const { name, email, brief, budgetRange, phone } = payload || {};

  if (!name || !String(name).trim()) {
    return 'Name is required.';
  }

  if (!email || !String(email).trim()) {
    return 'Email is required.';
  }

  if (!isValidEmail(String(email))) {
    return 'A valid email address is required.';
  }

  if (!budgetRange || !String(budgetRange).trim()) {
    return 'Budget range is required.';
  }

  if (!brief || !String(brief).trim()) {
    return 'Project objectives are required.';
  }

  if (phone !== undefined && phone !== null && String(phone).trim() !== '') {
    const digits = normalizePhone(String(phone));
    if (!/^\d+$/.test(digits) || digits.length > 12) {
      return 'Phone number must contain up to 12 digits.';
    }
  }

  return null;
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Allow', 'POST');
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, message: 'Method not allowed.' }));
    return;
  }

  try {
    const payload = await parseJsonBody(req);
    const validationError = validateRequest(payload);
    if (validationError) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, message: validationError }));
      return;
    }

    const reference = generateReference();
    const sanitizedPayload = {
      ...payload,
      reference,
      phone: normalizePhone(payload.phone),
      email: String(payload.email).trim(),
      name: String(payload.name).trim(),
      company: String(payload.company || '').trim(),
      brief: String(payload.brief).trim(),
      budget: payload.budget ?? payload.estimatedBudget ?? payload.budgetRange,
    };

    const { subject, html, text } = buildEmailPayload(sanitizedPayload);
    try {
      await postEmail({ subject, html, text, replyTo: sanitizedPayload.email });
    } catch (error: any) {
      console.error('Resend delivery failed:', error);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, message: 'Unable to process contact request.' }));
      return;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      success: true,
      message: 'Contact request submitted successfully.',
      reference,
    }));
  } catch (error: any) {
    const reason = error instanceof Error ? error.message : 'Unable to process contact request.';
    console.error('Contact API error:', reason);
    res.statusCode = error?.statusCode === 400 ? 400 : 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      success: false,
      message: error?.statusCode === 400 ? reason : 'Unable to process contact request.',
    }));
  }
}
