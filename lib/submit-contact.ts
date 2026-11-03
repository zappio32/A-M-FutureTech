import { randomUUID } from 'crypto';
import { SHEET_NAMES } from '@/lib/constants';
import { appendToSheet } from '@/lib/google-sheets';
import { saveSubmission } from '@/lib/submissions';
import type { ContactFormPayload } from '@/lib/schemas';

function formatSheetTimestamp(date = new Date()) {
  return date.toISOString().replace('T', ' ').replace(/\.\d{3}Z$/, ' UTC');
}

/** Prevent Google Sheets from treating +91… phone numbers as formulas. */
function sheetSafePhone(phone: string) {
  const value = phone.trim();
  if (!value) return '';
  if (value.startsWith('+') || value.startsWith('=')) return `'${value}`;
  return value;
}

/** Build a row that maps to both legacy and upgraded Contact Enquiries headers. */
export function buildContactSheetValues(data: ContactFormPayload, submissionId: string, submittedAt: string) {
  const consent = data.consent ? 'Yes' : 'No';
  const phone = sheetSafePhone(data.phone);
  return {
    'Submission ID': submissionId,
    'Submission Date & Time': submittedAt,
    'Submitted At': submittedAt,
    'Full Name': data.fullName,
    'Job Title': data.jobTitle || '',
    'Company Name': data.companyName,
    'Work Email': data.email,
    Email: data.email,
    'Phone Number': phone,
    Phone: phone,
    'Company Website': data.website || '',
    Website: data.website || '',
    'Service Required': data.serviceRequired,
    'Project Budget': data.projectBudget || '',
    'Project Timeline': data.timeline || '',
    Timeline: data.timeline || '',
    'Lead Source': data.howHeard || '',
    'How Heard': data.howHeard || '',
    'Project Details': data.projectDetails,
    'Privacy Consent': consent,
    Consent: consent,
    'Lead Status': 'New',
  };
}

/**
 * Contact enquiries: Google Sheets + local admin store only.
 * No email / Resend / SMTP.
 * Throws if Google Sheets does not confirm the row was stored.
 */
export async function submitContactEnquiry(data: ContactFormPayload) {
  const submissionId = `CNT-${randomUUID().slice(0, 8).toUpperCase()}`;
  const submittedAt = formatSheetTimestamp();
  const values = buildContactSheetValues(data, submissionId, submittedAt);

  await saveSubmission('contact', values);

  const sheetResult = await appendToSheet(SHEET_NAMES.contact, values, { requireSuccess: true });
  if (!sheetResult.ok) {
    throw new Error('Unable to submit your enquiry right now. Please try again.');
  }

  return { submissionId, submittedAt };
}
