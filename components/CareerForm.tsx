'use client';

import { useState } from 'react';

const initialState = {
  fullName: '',
  email: '',
  phone: '',
  position: '',
  experience: '',
  message: '',
};

export function CareerForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeName, setResumeName] = useState('');

  const handleChange = (field: keyof typeof initialState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      const input = document.getElementById('resume') as HTMLInputElement | null;
      const file = input?.files?.[0];
      if (file) data.append('resume', file);

      const response = await fetch('/api/careers', {
        method: 'POST',
        body: data,
      });
      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(result.message || 'Unable to submit application.');
      }

      setStatus({ type: 'success', message: result.message || 'Application sent successfully.' });
      setForm(initialState);
      setResumeName('');
      if (input) input.value = '';
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Unable to submit application.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-shell p-6 sm:p-8" encType="multipart/form-data">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="field-wrap text-sm text-slate-200">
          <label htmlFor="career-name">Full Name</label>
          <input id="career-name" value={form.fullName} onChange={(e) => handleChange('fullName', e.target.value)} required placeholder="Jane Doe" />
        </div>
        <div className="field-wrap text-sm text-slate-200">
          <label htmlFor="career-email">Email</label>
          <input id="career-email" type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} required placeholder="jane@example.com" />
        </div>
        <div className="field-wrap text-sm text-slate-200">
          <label htmlFor="career-phone">Phone Number</label>
          <input id="career-phone" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} required placeholder="+91 98765 43210" />
        </div>
        <div className="field-wrap text-sm text-slate-200">
          <label htmlFor="career-position">Position Applying For</label>
          <select id="career-position" value={form.position} onChange={(e) => handleChange('position', e.target.value)} required>
            <option value="">Select a position</option>
            <option value="Senior Full Stack Developer">Senior Full Stack Developer</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
            <option value="Cloud Engineer">Cloud Engineer</option>
          </select>
        </div>
        <div className="field-wrap text-sm text-slate-200 md:col-span-2">
          <label htmlFor="career-experience">Experience</label>
          <input id="career-experience" value={form.experience} onChange={(e) => handleChange('experience', e.target.value)} required placeholder="3+ years" />
        </div>
        <div className="field-wrap text-sm text-slate-200 md:col-span-2">
          <label htmlFor="career-message">Message</label>
          <textarea id="career-message" value={form.message} onChange={(e) => handleChange('message', e.target.value)} rows={5} placeholder="Tell us a bit about yourself and why you'd like to join the team." />
        </div>
        <div className="field-wrap text-sm text-slate-200 md:col-span-2">
          <label htmlFor="resume">Resume Upload</label>
          <input
            id="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResumeName(e.target.files?.[0]?.name || '')}
            className="block w-full rounded-xl border border-dashed border-slate-600 bg-slate-900/80 px-4 py-3 text-white"
          />
          {resumeName && <span className="mt-2 block text-xs text-slate-300">Selected: {resumeName}</span>}
        </div>
      </div>
      <button type="submit" disabled={isSubmitting} className="form-submit-btn primary-btn mt-6 disabled:cursor-not-allowed disabled:opacity-70">
        {isSubmitting ? 'Submitting...' : 'Apply Now'}
      </button>
      {status.type !== 'idle' && (
        <p className={status.type === 'success' ? 'mt-4 text-sm text-emerald-400' : 'mt-4 text-sm text-red-400'}>{status.message}</p>
      )}
    </form>
  );
}
