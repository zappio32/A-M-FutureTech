import { NextResponse } from 'next/server';
import { jsonError, jsonSuccess, readJsonBody } from '@/lib/api';
import { contactFormSchema, firstZodError } from '@/lib/schemas';
import { isSheetsConfigured } from '@/lib/google-sheets';
import { submitContactEnquiry } from '@/lib/submit-contact';

export const runtime = 'nodejs';
export const maxDuration = 30;

const SUCCESS_MESSAGE =
  'Thank you for contacting A&M FutureTech! Your enquiry has been submitted successfully. Our team will review your requirements and get in touch with you.';

const FAILURE_MESSAGE = 'Unable to submit your enquiry right now. Please try again.';

export async function POST(request: Request) {
  try {
    if (!isSheetsConfigured()) {
      console.error('[api/contact] Google Sheets webhook is not configured.');
      return jsonError(FAILURE_MESSAGE, 503);
    }

    const body = await readJsonBody<Record<string, unknown>>(request);
    if (!body) return jsonError('Invalid request body.');

    // Honeypot: pretend success so bots do not retry, but do not store or notify.
    if (typeof body.websiteUrl === 'string' && body.websiteUrl.trim()) {
      return jsonSuccess(SUCCESS_MESSAGE);
    }

    const parsed = contactFormSchema.safeParse({
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      serviceRequired: '',
      projectDetails: '',
      consent: false,
      websiteUrl: '',
      ...body,
    });
    if (!parsed.success) return jsonError(firstZodError(parsed.error));

    await submitContactEnquiry(parsed.data);
    return jsonSuccess(SUCCESS_MESSAGE);
  } catch (error) {
    console.error('[api/contact] Contact route error', error);
    return NextResponse.json({ success: false, message: FAILURE_MESSAGE }, { status: 500 });
  }
}
