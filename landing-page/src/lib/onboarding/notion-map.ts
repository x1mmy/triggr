/**
 * Maps onboarding payloads to Notion Clients database properties.
 * Adjust names via NOTION_* env vars when your DB schema differs.
 * Default title matches Triggr "Clients" DB (title column "Client Name").
 */

import type { OnboardingPayload } from '@/lib/onboarding/schemas';

export type NotionClientsDbPropertyNames = {
  title: string;
  notesRichText: string;
  businessName?: string;
  formSubmitted?: string;
  phone?: string;
  service?: string;
  status?: string;
};

/** Env unset → fallback; explicitly `VAR=` (empty) → omit that property from the API payload. */
function propName(envKey: string, fallback: string): string | undefined {
  const raw = process.env[envKey];
  if (raw === '') return undefined;
  const t = raw?.trim();
  return t || fallback;
}

export function getNotionClientsPropertyNames(): NotionClientsDbPropertyNames {
  const e = (key: string, fallback: string) => process.env[key]?.trim() || fallback;
  return {
    title: e('NOTION_TITLE_PROPERTY', 'Client Name'),
    notesRichText: e('NOTION_NOTES_PROPERTY', 'Notes'),
    businessName: propName('NOTION_BUSINESS_NAME_PROPERTY', 'Business Name'),
    formSubmitted: propName('NOTION_FORM_SUBMITTED_PROPERTY', 'Form Submitted'),
    phone: propName('NOTION_PHONE_PROPERTY', 'Phone'),
    service: propName('NOTION_SERVICE_PROPERTY', 'Service'),
    status: propName('NOTION_STATUS_PROPERTY', 'Status'),
  };
}

/** Notion Service select options (must match Clients DB exactly). */
export function notionServiceSelectName(p: OnboardingPayload): string {
  if (p.formType === 'automation') return 'Automation';
  if (p.formType === 'webdev') return 'Web Dev';
  return 'Both';
}

function phoneDigitsFromPayload(p: OnboardingPayload): string {
  if (p.formType === 'webdev') return p.displayPhone;
  return p.smsPhone;
}

/** Prefer E.164-style for Notion `phone_number` (AU mobiles common for Triggr). */
export function formatPhoneForNotion(digits: string): string {
  const d = digits.replace(/\D/g, '');
  if (!d) return '';
  if (d.startsWith('61')) return `+${d}`;
  if (d.startsWith('0') && d.length === 10) return `+61${d.slice(1)}`;
  if (d.length >= 8) return `+${d}`;
  return d;
}

/** Splits long text for Notion rich_text segment limits. */
export function toNotionRichTextSegments(summary: string, maxChunk = 1800): { type: 'text'; text: { content: string } }[] {
  const items: { type: 'text'; text: { content: string } }[] = [];
  for (let i = 0; i < summary.length; i += maxChunk) {
    items.push({ type: 'text', text: { content: summary.slice(i, i + maxChunk) } });
  }
  return items;
}

function statusAsSelect(): boolean {
  const v = process.env.NOTION_STATUS_AS_SELECT?.trim().toLowerCase();
  return v === '1' || v === 'true' || v === 'yes';
}

function onboardingStatusValue(): string {
  return process.env.NOTION_ONBOARDING_STATUS?.trim() || 'Onboarding';
}

/**
 * Properties for `notion.pages.create` on the Clients DB.
 * Skips optional columns when the corresponding env name is set to empty string (advanced).
 */
export function buildClientsDatabaseProperties(
  names: NotionClientsDbPropertyNames,
  titlePlain: string,
  summaryMarkdown: string,
  payload: OnboardingPayload,
  submittedAt: Date,
): Record<string, unknown> {
  const props: Record<string, unknown> = {
    [names.title]: {
      title: [{ type: 'text', text: { content: titlePlain.slice(0, 2000) } }],
    },
    [names.notesRichText]: {
      rich_text: toNotionRichTextSegments(summaryMarkdown),
    },
  };

  if (names.businessName) {
    props[names.businessName] = {
      rich_text: [{ type: 'text', text: { content: payload.businessName.trim().slice(0, 2000) } }],
    };
  }

  if (names.formSubmitted) {
    props[names.formSubmitted] = {
      date: { start: submittedAt.toISOString() },
    };
  }

  if (names.phone) {
    const formatted = formatPhoneForNotion(phoneDigitsFromPayload(payload));
    if (formatted) {
      props[names.phone] = { phone_number: formatted };
    }
  }

  if (names.service) {
    props[names.service] = {
      select: { name: notionServiceSelectName(payload) },
    };
  }

  if (names.status) {
    const statusName = onboardingStatusValue();
    if (statusAsSelect()) {
      props[names.status] = { select: { name: statusName } };
    } else {
      props[names.status] = { status: { name: statusName } };
    }
  }

  return props;
}
