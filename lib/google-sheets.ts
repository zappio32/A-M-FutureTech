import { SHEET_NAMES } from '@/lib/constants';
import { toDriveImageUrl } from '@/lib/drive';

type SheetPayload = {
  action?: 'append' | 'list' | 'seed-blogs';
  sheet: string;
  secret?: string;
  values?: Record<string, string>;
  rows?: Record<string, string>[];
};

function webhookConfig() {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();
  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET?.trim();
  return { url, secret };
}

async function callSheetsWebhook(payload: SheetPayload) {
  const { url, secret } = webhookConfig();
  if (!url) return null;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, secret }),
    cache: 'no-store',
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Google Sheets webhook failed.');
  }

  return response.json();
}

export async function appendToSheet(
  sheet: string,
  values: Record<string, string>,
  options?: { requireSuccess?: boolean },
) {
  try {
    const result = await callSheetsWebhook({ action: 'append', sheet, values });
    if (!result) {
      console.warn('[sheets] Webhook is not configured. Skipping Google Sheets append for', sheet);
      if (options?.requireSuccess) {
        throw new Error('Google Sheets webhook is not configured.');
      }
      return { ok: false, skipped: true };
    }
    if (result.success === false) {
      throw new Error(result.message || 'Google Sheets webhook rejected the submission.');
    }
    return { ok: true, skipped: false };
  } catch (error) {
    console.error('[sheets] Append failed', { sheet, error: error instanceof Error ? error.message : error });
    if (options?.requireSuccess) {
      throw error instanceof Error ? error : new Error('Google Sheets append failed.');
    }
    return { ok: false, skipped: false };
  }
}

export async function listSheetRows(sheet: string): Promise<Record<string, string>[]> {
  try {
    const result = await callSheetsWebhook({ action: 'list', sheet });
    const rows = Array.isArray(result?.rows) ? result.rows : [];
    return rows as Record<string, string>[];
  } catch (error) {
    console.error('[sheets] List failed', { sheet, error: error instanceof Error ? error.message : error });
    return [];
  }
}

export async function fetchBlogsFromSheet() {
  const rows = await listSheetRows(SHEET_NAMES.blogs);
  return rows
    .map((row) => ({
      title: row.Title || row.title || '',
      slug: row.Slug || row.slug || '',
      excerpt: row.Excerpt || row.excerpt || '',
      content: row.Content || row.content || '',
      image: toDriveImageUrl(row['Image URL'] || row.image || row.Image || ''),
      category: row.Category || row.category || 'Insights',
      author: row.Author || row.author || 'A&M FutureTech',
      publishedAt: row['Published At'] || row.publishedAt || new Date().toISOString().slice(0, 10),
      seoTitle: row['SEO Title'] || row.seoTitle || row.Title || '',
      seoDescription: row['SEO Description'] || row.seoDescription || row.Excerpt || '',
      tags: (row.Tags || row.tags || '')
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      status: (row.Status || row.status || 'Published').toLowerCase(),
    }))
    .filter((post) => post.title && post.slug && post.status !== 'draft');
}

export async function seedBlogsToSheet(rows: Record<string, string>[]) {
  return callSheetsWebhook({ action: 'seed-blogs', sheet: SHEET_NAMES.blogs, rows });
}

export function isSheetsConfigured() {
  return Boolean(process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim());
}
