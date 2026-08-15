'use client';

import { useState } from 'react';

const initialState = {
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  serviceRequired: '',
  projectBudget: '',
  projectDetails: '',
};

export function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof typeof initialState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(result.message || 'Unable to send enquiry.');
      }

      setStatus({ type: 'success', message: result.message || 'Enquiry sent successfully.' });
      setForm(initialState);
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Unable to send enquiry.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-shell p-6 sm:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="field-wrap text-sm text-slate-200">
          <label htmlFor="contact-name">Full Name</label>
          <input id="contact-name" value={form.fullName} onChange={(e) => handleChange('fullName', e.target.value)} required placeholder="John Smith" />
        </div>
        <div className="field-wrap text-sm text-slate-200">
          <label htmlFor="contact-company">Company Name</label>
          <input id="contact-company" value={form.companyName} onChange={(e) => handleChange('companyName', e.target.value)} placeholder="Acme Inc." />
        </div>
        <div className="field-wrap text-sm text-slate-200">
          <label htmlFor="contact-email">Email Address</label>
          <input id="contact-email" type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} required placeholder="john@company.com" />
        </div>
        <div className="field-wrap text-sm text-slate-200">
          <label htmlFor="contact-phone">Phone Number</label>
          <input id="contact-phone" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder="+91 98765 43210" />
        </div>
        <div className="field-wrap text-sm text-slate-200 md:col-span-2">
          <label htmlFor="contact-service">Service Required</label>
          <select id="contact-service" value={form.serviceRequired} onChange={(e) => handleChange('serviceRequired', e.target.value)}>
            <option value="">Select a service</option>
            <option value="Custom Software Development">Custom Software Development</option>
            <option value="Website Development">Website Development</option>
            <option value="Mobile App Development">Mobile App Development</option>
            <option value="Cloud Solutions">Cloud Solutions</option>
            <option value="IT Consulting">IT Consulting</option>
          </select>
        </div>
        <div className="field-wrap text-sm text-slate-200">
          <label htmlFor="contact-budget">Project Budget</label>
          <input id="contact-budget" value={form.projectBudget} onChange={(e) => handleChange('projectBudget', e.target.value)} placeholder="$5,000 - $20,000" />
        </div>
        <div className="field-wrap text-sm text-slate-200">
          <label htmlFor="contact-details">Project Details</label>
          <textarea id="contact-details" value={form.projectDetails} onChange={(e) => handleChange('projectDetails', e.target.value)} required rows={5} placeholder="Tell us about your project goals and requirements." />
        </div>
      </div>
      <button type="submit" disabled={isSubmitting} className="form-submit-btn primary-btn mt-6 disabled:cursor-not-allowed disabled:opacity-70">
        {isSubmitting ? 'Sending...' : 'Send Enquiry'}
      </button>
      {status.type !== 'idle' && (
        <p className={status.type === 'success' ? 'mt-4 text-sm text-emerald-400' : 'mt-4 text-sm text-red-400'}>{status.message}</p>
      )}
    </form>
  );
}
