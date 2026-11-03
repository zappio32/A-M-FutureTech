export const GOOGLE_SHEET_ID =
  process.env.GOOGLE_SHEET_ID || '1cjQg7HITYsfmYXPO0Wdc2C8hRLozo8lCRpSHbL3Db0A';

export const GOOGLE_DRIVE_FOLDER_ID =
  process.env.GOOGLE_DRIVE_FOLDER_ID || '1XMOEBMg9rxKK7UTnqG9tndqNlkU9GTcB';

export const GOOGLE_SHEET_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/edit`;
export const GOOGLE_DRIVE_FOLDER_URL = `https://drive.google.com/drive/folders/${GOOGLE_DRIVE_FOLDER_ID}`;

export const SHEET_NAMES = {
  blogs: 'Blogs',
  contact: 'Contact Enquiries',
  quote: 'Quote Requests',
  careers: 'Career Applications',
} as const;

export const SERVICE_OPTIONS = [
  'Custom Software Development',
  'Website Development',
  'Mobile App Development',
  'Web Application Development',
  'UI/UX Design',
  'Cloud Solutions',
  'API & Third-Party Integration',
  'E-Commerce Solutions',
  'IT Consulting',
  'Maintenance & Support',
] as const;

export const BUDGET_OPTIONS = [
  'Under $5,000',
  '$5,000 - $10,000',
  '$10,000 - $20,000',
  '$20,000 - $50,000',
  '$50,000+',
  'Custom',
] as const;

export const TIMELINE_OPTIONS = [
  'As soon as possible',
  '1 - 3 months',
  '3 - 6 months',
  '6 - 12 months',
  'Not sure yet',
] as const;

export const HEAR_ABOUT_OPTIONS = [
  'Google Search',
  'LinkedIn',
  'Referral',
  'Social Media',
  'Existing Client',
  'Other',
] as const;

/** Contact page form options (INR + conversion-focused labels). */
export const CONTACT_SERVICE_OPTIONS = [
  'Website Development',
  'Web Application Development',
  'Mobile Application Development',
  'Custom Software Development',
  'UI/UX Design',
  'ERP / CRM Solutions',
  'E-Commerce Development',
  'Cloud Solutions',
  'API Integration',
  'IT Consulting',
  'Maintenance & Support',
  'Other',
] as const;

export const CONTACT_BUDGET_OPTIONS = [
  'Under ₹25,000',
  '₹25,000 – ₹50,000',
  '₹50,000 – ₹1,00,000',
  '₹1,00,000 – ₹3,00,000',
  '₹3,00,000 – ₹5,00,000',
  'Above ₹5,00,000',
  'Not Decided Yet',
] as const;

export const CONTACT_TIMELINE_OPTIONS = [
  'Immediately',
  'Within 1 Month',
  '1–3 Months',
  '3–6 Months',
  'Flexible',
] as const;

export const CONTACT_HEAR_ABOUT_OPTIONS = [
  'Google Search',
  'LinkedIn',
  'Instagram',
  'Facebook',
  'Referral',
  'Existing Client',
  'Other',
] as const;

export const POSITION_OPTIONS = [
  'Senior Full Stack Developer',
  'UI/UX Designer',
  'Cloud Engineer',
] as const;

export const EXPERIENCE_OPTIONS = ['0-1 years', '1-3 years', '3-5 years', '5-8 years', '8+ years'] as const;
export const NOTICE_OPTIONS = ['Immediate', '15 days', '30 days', '60 days', '90 days'] as const;
