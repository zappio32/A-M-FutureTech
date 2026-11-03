'use client';

import { FormEvent, useId, useState } from 'react';
import Link from 'next/link';
import {
  CONTACT_BUDGET_OPTIONS,
  CONTACT_HEAR_ABOUT_OPTIONS,
  CONTACT_SERVICE_OPTIONS,
  CONTACT_TIMELINE_OPTIONS,
} from '@/lib/constants';
import { contactFormSchema, firstZodError } from '@/lib/schemas';

const initialState = {
  fullName: '',
  jobTitle: '',
  companyName: '',
  email: '',
  phone: '',
  website: '',
  serviceRequired: '',
  projectBudget: '',
  timeline: '',
  howHeard: '',
  projectDetails: '',
  consent: false,
  websiteUrl: '',
};

type FieldErrors = Partial<Record<keyof typeof initialState, string>>;

const SUCCESS_MESSAGE =
  'Thank you for contacting A&M FutureTech!\n\nYour enquiry has been submitted successfully. Our team will review your requirements and get in touch with you.';

const FAILURE_MESSAGE = 'Unable to submit your enquiry right now. Please try again.';

async function readApiResponse(response: Response) {
  try {
    return await response.json();
  } catch {
    return { success: false, message: FAILURE_MESSAGE };
  }
}

function RequiredMark() {
  return <span className="text-red-500" aria-hidden="true"> *</span>;
}

export function ContactForm() {
  const formId = useId().replace(/:/g, '');
  const [form, setForm] = useState(initialState);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof typeof initialState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus({ type: 'idle', message: '' });
    setFieldErrors({});

    try {
      const parsed = contactFormSchema.safeParse(form);
      if (!parsed.success) {
        const errors: FieldErrors = {};
        for (const issue of parsed.error.issues) {
          const key = issue.path[0];
          if (typeof key === 'string' && !(key in errors)) {
            errors[key as keyof typeof initialState] = issue.message;
          }
        }
        setFieldErrors(errors);
        throw new Error(firstZodError(parsed.error));
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const result = await readApiResponse(response);
      if (!response.ok || result.success === false) {
        throw new Error(typeof result.message === 'string' && result.message ? result.message : FAILURE_MESSAGE);
      }

      setStatus({ type: 'success', message: SUCCESS_MESSAGE });
      setForm(initialState);
      setFieldErrors({});
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : FAILURE_MESSAGE,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldError = (name: keyof typeof initialState) => fieldErrors[name];

  return (
    <form onSubmit={handleSubmit} className="form-shell relative p-6 sm:p-8" noValidate>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[var(--text)]">Send us an enquiry</h2>
        <p className="mt-2 text-sm text-[var(--text-soft)]">
          Share a few details and our team will review your requirements. Fields marked with * are required.
        </p>
      </div>

      {/* Honeypot — hidden from users, bots often fill it */}
      <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${formId}-website-url`}>Website URL</label>
        <input
          id={`${formId}-website-url`}
          name="websiteUrl"
          tabIndex={-1}
          autoComplete="off"
          value={form.websiteUrl}
          onChange={(e) => handleChange('websiteUrl', e.target.value)}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="field-wrap text-sm">
          <label htmlFor={`${formId}-name`}>Full Name<RequiredMark /></label>
          <input
            id={`${formId}-name`}
            name="fullName"
            value={form.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            autoComplete="name"
            placeholder="John Smith"
            aria-invalid={Boolean(fieldError('fullName'))}
            aria-describedby={fieldError('fullName') ? `${formId}-name-error` : undefined}
          />
          {fieldError('fullName') && (
            <p id={`${formId}-name-error`} className="mt-1.5 text-xs text-red-500">{fieldError('fullName')}</p>
          )}
        </div>

        <div className="field-wrap text-sm">
          <label htmlFor={`${formId}-title`}>Job Title</label>
          <input
            id={`${formId}-title`}
            name="jobTitle"
            value={form.jobTitle}
            onChange={(e) => handleChange('jobTitle', e.target.value)}
            autoComplete="organization-title"
            placeholder="Operations Director"
          />
        </div>

        <div className="field-wrap text-sm">
          <label htmlFor={`${formId}-company`}>Company Name<RequiredMark /></label>
          <input
            id={`${formId}-company`}
            name="companyName"
            value={form.companyName}
            onChange={(e) => handleChange('companyName', e.target.value)}
            autoComplete="organization"
            placeholder="Acme Inc."
            aria-invalid={Boolean(fieldError('companyName'))}
            aria-describedby={fieldError('companyName') ? `${formId}-company-error` : undefined}
          />
          {fieldError('companyName') && (
            <p id={`${formId}-company-error`} className="mt-1.5 text-xs text-red-500">{fieldError('companyName')}</p>
          )}
        </div>

        <div className="field-wrap text-sm">
          <label htmlFor={`${formId}-email`}>Work Email<RequiredMark /></label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            autoComplete="email"
            placeholder="john@company.com"
            aria-invalid={Boolean(fieldError('email'))}
            aria-describedby={fieldError('email') ? `${formId}-email-error` : undefined}
          />
          {fieldError('email') && (
            <p id={`${formId}-email-error`} className="mt-1.5 text-xs text-red-500">{fieldError('email')}</p>
          )}
        </div>

        <div className="field-wrap text-sm">
          <label htmlFor={`${formId}-phone`}>Phone Number<RequiredMark /></label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            autoComplete="tel"
            placeholder="+91 98765 43210"
            aria-invalid={Boolean(fieldError('phone'))}
            aria-describedby={fieldError('phone') ? `${formId}-phone-error` : undefined}
          />
          {fieldError('phone') && (
            <p id={`${formId}-phone-error`} className="mt-1.5 text-xs text-red-500">{fieldError('phone')}</p>
          )}
        </div>

        <div className="field-wrap text-sm">
          <label htmlFor={`${formId}-website`}>Company Website</label>
          <input
            id={`${formId}-website`}
            name="website"
            type="url"
            value={form.website}
            onChange={(e) => handleChange('website', e.target.value)}
            autoComplete="url"
            placeholder="https://company.com"
            aria-invalid={Boolean(fieldError('website'))}
            aria-describedby={fieldError('website') ? `${formId}-website-error` : undefined}
          />
          {fieldError('website') && (
            <p id={`${formId}-website-error`} className="mt-1.5 text-xs text-red-500">{fieldError('website')}</p>
          )}
        </div>

        <div className="field-wrap text-sm md:col-span-2">
          <label htmlFor={`${formId}-service`}>Service Required<RequiredMark /></label>
          <select
            id={`${formId}-service`}
            name="serviceRequired"
            value={form.serviceRequired}
            onChange={(e) => handleChange('serviceRequired', e.target.value)}
            aria-invalid={Boolean(fieldError('serviceRequired'))}
            aria-describedby={fieldError('serviceRequired') ? `${formId}-service-error` : undefined}
          >
            <option value="">Select a service</option>
            {CONTACT_SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {fieldError('serviceRequired') && (
            <p id={`${formId}-service-error`} className="mt-1.5 text-xs text-red-500">{fieldError('serviceRequired')}</p>
          )}
        </div>

        <div className="field-wrap text-sm">
          <label htmlFor={`${formId}-budget`}>Project Budget</label>
          <select
            id={`${formId}-budget`}
            name="projectBudget"
            value={form.projectBudget}
            onChange={(e) => handleChange('projectBudget', e.target.value)}
            aria-invalid={Boolean(fieldError('projectBudget'))}
          >
            <option value="">Select a budget range (optional)</option>
            {CONTACT_BUDGET_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {fieldError('projectBudget') && (
            <p className="mt-1.5 text-xs text-red-500">{fieldError('projectBudget')}</p>
          )}
        </div>

        <div className="field-wrap text-sm">
          <label htmlFor={`${formId}-timeline`}>Project Timeline</label>
          <select
            id={`${formId}-timeline`}
            name="timeline"
            value={form.timeline}
            onChange={(e) => handleChange('timeline', e.target.value)}
            aria-invalid={Boolean(fieldError('timeline'))}
          >
            <option value="">Select a timeline (optional)</option>
            {CONTACT_TIMELINE_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {fieldError('timeline') && (
            <p className="mt-1.5 text-xs text-red-500">{fieldError('timeline')}</p>
          )}
        </div>

        <div className="field-wrap text-sm md:col-span-2">
          <label htmlFor={`${formId}-heard`}>How did you hear about us?</label>
          <select
            id={`${formId}-heard`}
            name="howHeard"
            value={form.howHeard}
            onChange={(e) => handleChange('howHeard', e.target.value)}
          >
            <option value="">Select an option (optional)</option>
            {CONTACT_HEAR_ABOUT_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="field-wrap text-sm md:col-span-2">
          <label htmlFor={`${formId}-details`}>Project Details<RequiredMark /></label>
          <textarea
            id={`${formId}-details`}
            name="projectDetails"
            value={form.projectDetails}
            onChange={(e) => handleChange('projectDetails', e.target.value)}
            rows={5}
            placeholder="Share goals, current systems, users, and any deadline we should know about."
            aria-invalid={Boolean(fieldError('projectDetails'))}
            aria-describedby={fieldError('projectDetails') ? `${formId}-details-error` : undefined}
          />
          {fieldError('projectDetails') && (
            <p id={`${formId}-details-error`} className="mt-1.5 text-xs text-red-500">{fieldError('projectDetails')}</p>
          )}
        </div>
      </div>

      <label className="mt-5 flex items-start gap-3 text-sm text-[var(--text-soft)]">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => handleChange('consent', e.target.checked)}
          className="mt-1 h-4 w-4"
          aria-invalid={Boolean(fieldError('consent'))}
        />
        <span>
          I agree to the{' '}
          <Link href="/privacy-policy" className="text-[var(--link)] hover:underline">
            Privacy Policy
          </Link>{' '}
          and consent to A&M FutureTech contacting me about this enquiry.
          <RequiredMark />
        </span>
      </label>
      {fieldError('consent') && (
        <p className="mt-1.5 text-xs text-red-500">{fieldError('consent')}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="form-submit-btn primary-btn mt-6 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? 'Submitting...' : 'Send Enquiry'}
      </button>

      {status.type === 'success' && (
        <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400" role="status">
          {status.message.split('\n').map((line) => (
            <p key={line || 'blank'} className={line ? 'mt-1 first:mt-0' : 'h-2'}>{line}</p>
          ))}
        </div>
      )}
      {status.type === 'error' && (
        <p className="mt-4 text-sm text-red-500" role="alert">
          {status.message}
        </p>
      )}
    </form>
  );
}
