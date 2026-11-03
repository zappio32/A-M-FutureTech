/**
 * Bind this script to the A&M FutureTech Google Sheet, then Deploy > Web app.
 * Execute as: Me
 * Who has access: Anyone
 *
 * After deploy, paste the web app URL into GOOGLE_SHEETS_WEBHOOK_URL
 * and the same secret into GOOGLE_SHEETS_WEBHOOK_SECRET.
 *
 * If Contact Enquiries already has a header row, that row is reused as-is
 * (append maps by header name). HEADERS.contact below is only used for
 * brand-new empty sheets.
 */

const SHEETS = {
  blogs: 'Blogs',
  contact: 'Contact Enquiries',
  quote: 'Quote Requests',
  careers: 'Career Applications',
  zschool: 'zschool4u_leads',
};

const HEADERS = {
  [SHEETS.blogs]: ['Title', 'Slug', 'Excerpt', 'Content', 'Image URL', 'Category', 'Author', 'Published At', 'SEO Title', 'SEO Description', 'Tags', 'Status'],
  [SHEETS.contact]: [
    'Submission ID',
    'Submission Date & Time',
    'Full Name',
    'Job Title',
    'Company Name',
    'Work Email',
    'Phone Number',
    'Company Website',
    'Service Required',
    'Project Budget',
    'Project Timeline',
    'Lead Source',
    'Project Details',
    'Privacy Consent',
    'Lead Status',
  ],
  [SHEETS.quote]: ['Submitted At', 'Full Name', 'Job Title', 'Company Name', 'Email', 'Phone', 'Website', 'Service Required', 'Project Budget', 'Timeline', 'How Heard', 'Project Details', 'Consent'],
  [SHEETS.careers]: ['Submitted At', 'Full Name', 'Email', 'Phone', 'City', 'LinkedIn', 'Position', 'Experience', 'Current Company', 'Notice Period', 'Expected CTC', 'Resume', 'Message', 'Consent'],
  [SHEETS.zschool]: ['Submitted At', 'Full Name', 'Email', 'Phone', 'School Name', 'Location', 'Classes', 'Message'],
};

function getSecret() {
  return PropertiesService.getScriptProperties().getProperty('WEBHOOK_SECRET') || '';
}

function ensureSheet(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  const headers = HEADERS[name];
  if (headers && !sheet.getRange(1, 1).getValue()) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, headers.length);
  }
  return sheet;
}

function getSheetHeaders(sheet, sheetName) {
  if (sheet.getLastColumn() > 0 && sheet.getRange(1, 1).getValue()) {
    return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(String);
  }
  const headers = HEADERS[sheetName];
  if (headers) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
    return headers;
  }
  return [];
}

function rowsToObjects(sheet) {
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0].map(String);
  return values.slice(1).filter((row) => row.join('').trim()).map((row) => {
    const item = {};
    headers.forEach((header, index) => {
      item[header] = String(row[index] || '');
    });
    return item;
  });
}

function sanitizeCell(value) {
  const text = value == null ? '' : String(value);
  // Leading +/= would be treated as formulas by Sheets (e.g. phone +91…).
  if (text.startsWith('+') || text.startsWith('=')) return "'" + text.replace(/^'/, '');
  return text;
}

function appendObject(sheetName, values) {
  const sheet = ensureSheet(sheetName);
  const headers = getSheetHeaders(sheet, sheetName);
  sheet.appendRow(headers.map((header) => sanitizeCell(values[header] || '')));
}

function doPost(e) {
  const body = JSON.parse(e.postData.contents || '{}');
  const expected = getSecret();
  if (expected && body.secret !== expected) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: 'Unauthorized' })).setMimeType(ContentService.MimeType.JSON);
  }

  Object.values(SHEETS).forEach(ensureSheet);

  if (body.action === 'list') {
    const sheet = ensureSheet(body.sheet || SHEETS.contact);
    return ContentService.createTextOutput(JSON.stringify({ success: true, rows: rowsToObjects(sheet) })).setMimeType(ContentService.MimeType.JSON);
  }

  if (body.action === 'seed-blogs' && Array.isArray(body.rows)) {
    const sheet = ensureSheet(SHEETS.blogs);
    body.rows.forEach((row) => appendObject(SHEETS.blogs, row));
    return ContentService.createTextOutput(JSON.stringify({ success: true, sheet: SHEETS.blogs, count: body.rows.length })).setMimeType(ContentService.MimeType.JSON);
  }

  if (body.action === 'append' && body.values) {
    appendObject(body.sheet, body.values);
    return ContentService.createTextOutput(JSON.stringify({ success: true, sheet: body.sheet })).setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify({ success: false, message: 'Unsupported action' })).setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  Object.values(SHEETS).forEach(ensureSheet);
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    sheets: Object.values(SHEETS),
  })).setMimeType(ContentService.MimeType.JSON);
}
