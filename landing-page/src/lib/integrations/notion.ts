import { Client } from '@notionhq/client';
import type { OnboardingPayload } from '@/lib/onboarding/schemas';
import { buildClientsDatabaseProperties, getNotionClientsPropertyNames } from '@/lib/onboarding/notion-map';
import { buildOnboardingSummary, serviceLabelForPayload } from '@/lib/onboarding/summary';

function getEnv(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim() ? v.trim() : undefined;
}

function normalizeNotionDatabaseId(raw: string): string {
  let s = raw.trim();
  if (!s) return s;

  s = s.split('?')[0].split('#')[0].trim();

  if (s.includes('notion.so')) {
    try {
      const href = s.startsWith('http') ? s : `https://${s}`;
      const u = new URL(href);
      const segments = u.pathname.split('/').filter(Boolean);
      const last = segments[segments.length - 1] ?? '';
      const dashed = last.match(
        /^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i,
      );
      if (dashed) return dashed[1];
      const tail32 = last.match(/([0-9a-f]{32})$/i);
      if (tail32) {
        const h = tail32[1];
        return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
      }
    } catch {
      /* not a valid URL; use stripped s */
    }
  }

  if (/^[0-9a-f]{32}$/i.test(s)) {
    return `${s.slice(0, 8)}-${s.slice(8, 12)}-${s.slice(12, 16)}-${s.slice(16, 20)}-${s.slice(20)}`;
  }

  return s;
}

export async function createNotionClientRow(
  payload: OnboardingPayload,
  fileUrls: { label: string; url: string }[],
): Promise<{ ok: true; url?: string } | { ok: false; error: string }> {
  const apiKey = getEnv('NOTION_API_KEY');
  const databaseIdRaw = getEnv('NOTION_CLIENTS_DATABASE_ID');
  const databaseId = databaseIdRaw ? normalizeNotionDatabaseId(databaseIdRaw) : undefined;

  if (!apiKey || !databaseId) {
    return { ok: false, error: 'Notion not configured (NOTION_API_KEY / NOTION_CLIENTS_DATABASE_ID)' };
  }

  const notion = new Client({ auth: apiKey });
  const title = `${payload.businessName} — ${serviceLabelForPayload(payload)}`;
  const summary = buildOnboardingSummary(payload, fileUrls);
  const propNames = getNotionClientsPropertyNames();
  const properties = buildClientsDatabaseProperties(propNames, title, summary, payload, new Date()) as Parameters<
    Client['pages']['create']
  >[0]['properties'];

  try {
    const page = await notion.pages.create({
      parent: { database_id: databaseId },
      properties,
    });
    const pageId = 'id' in page ? page.id : undefined;
    const url = pageId ? `https://www.notion.so/${pageId.replace(/-/g, '')}` : undefined;
    return { ok: true, url };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, error: msg };
  }
}
