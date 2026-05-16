import type { OnboardingPayload } from '@/lib/onboarding/schemas';
import { LEAD_SOURCE_OPTIONS, WEBSITE_MAIN_JOB, PAGE_OPTIONS, ENQUIRIES_PER_WEEK, RESPONSE_TIME } from '@/lib/onboarding/constants';

function labelMap<T extends readonly { value: string; label: string }[]>(opts: T, value: string): string {
  const o = opts.find((x) => x.value === value);
  return o?.label ?? value;
}

export function serviceLabelForPayload(p: OnboardingPayload): string {
  if (p.formType === 'automation') return 'Automation';
  if (p.formType === 'webdev') return 'Web Dev';
  return 'Both';
}

export function buildOnboardingSummary(p: OnboardingPayload, fileUrls: { label: string; url: string }[]): string {
  const lines: string[] = [`Form: ${p.formType}`, `Name: ${p.fullName}`, `Business: ${p.businessName}`, `Trade/type: ${p.businessType}`, `Suburb/area: ${p.suburb}`];

  if (p.formType === 'automation') {
    lines.push(
      '',
      '--- Leads ---',
      `Sources: ${p.leadSources.map((v) => labelMap(LEAD_SOURCE_OPTIONS, v)).join(', ')}`,
      `Enquiries/week: ${labelMap(ENQUIRIES_PER_WEEK, p.enquiriesPerWeek)}`,
      `Response time: ${labelMap(RESPONSE_TIME, p.responseTime)}`,
      '',
      '--- Setup ---',
      `SMS phone: ${p.smsPhone}`,
      `Has website: ${p.hasWebsite}`,
      p.hasWebsite === 'yes' ? `Website: ${p.websiteUrl}` : '',
      `Google Business Profile: ${p.hasGbp}`,
      `Uses CRM: ${p.usesCrm}`,
      p.usesCrm === 'yes' ? `CRM: ${p.crmName}` : '',
      '',
      '--- First message ---',
      p.firstMessage.trim() || '(default / written by Zimraan)',
    );
  } else if (p.formType === 'webdev') {
    lines.push(
      '',
      '--- Contact on site ---',
      `Phone: ${p.displayPhone}`,
      `Email: ${p.displayEmail}`,
      '',
      '--- Goals ---',
      `Main job: ${labelMap(WEBSITE_MAIN_JOB, p.mainJob)}`,
      `Pages: ${p.pagesNeeded.map((v) => labelMap(PAGE_OPTIONS, v)).join(', ')}`,
      p.otherPagesFeatures.trim() ? `Other/features:\n${p.otherPagesFeatures}` : '',
      '',
      '--- Branding ---',
      `Logo: ${p.hasLogo}`,
      `Brand colours: ${p.hasBrandColors}`,
      p.hasBrandColors === 'yes' ? p.brandColors : '',
      p.inspirationSites.trim() ? `Inspiration:\n${p.inspirationSites}` : '',
      '',
      '--- Content ---',
      `Photos ready: ${p.photosReady}`,
      `Copy ready: ${p.copyReady}`,
      p.copyReady === 'yes' && p.copyText.trim() ? `Copy:\n${p.copyText}` : '',
      '',
      '--- Services ---',
      p.servicesList,
      '',
      '--- Technical ---',
      `Domain: ${p.hasDomain}`,
      p.hasDomain === 'yes' ? p.domainName : '',
      p.currentWebsiteUrl ? `Current site: ${p.currentWebsiteUrl}` : '',
    );
  } else {
    lines.push(
      '',
      '--- Website goals ---',
      `Main job: ${labelMap(WEBSITE_MAIN_JOB, p.mainJob)}`,
      `Pages: ${p.pagesNeeded.map((v) => labelMap(PAGE_OPTIONS, v)).join(', ')}`,
      p.otherPagesFeatures.trim() ? `Other/features:\n${p.otherPagesFeatures}` : '',
      '',
      '--- Branding ---',
      `Logo: ${p.hasLogo}`,
      `Brand colours: ${p.hasBrandColors}`,
      p.hasBrandColors === 'yes' ? p.brandColors : '',
      p.inspirationSites.trim() ? `Inspiration:\n${p.inspirationSites}` : '',
      '',
      '--- Content ---',
      `Photos ready: ${p.photosReady}`,
      `Copy ready: ${p.copyReady}`,
      p.copyReady === 'yes' && p.copyText.trim() ? `Copy:\n${p.copyText}` : '',
      '',
      '--- Services ---',
      p.servicesList,
      '',
      '--- Technical ---',
      `Domain: ${p.hasDomain}`,
      p.hasDomain === 'yes' ? p.domainName : '',
      p.currentWebsiteUrl ? `Current site: ${p.currentWebsiteUrl}` : '',
      '',
      '--- Leads ---',
      `Sources: ${p.leadSources.map((v) => labelMap(LEAD_SOURCE_OPTIONS, v)).join(', ')}`,
      `Enquiries/week: ${labelMap(ENQUIRIES_PER_WEEK, p.enquiriesPerWeek)}`,
      `Response time: ${labelMap(RESPONSE_TIME, p.responseTime)}`,
      '',
      '--- Automation ---',
      `SMS phone: ${p.smsPhone}`,
      `Uses CRM: ${p.usesCrm}`,
      p.usesCrm === 'yes' ? `CRM: ${p.crmName}` : '',
      '',
      '--- First message ---',
      p.firstMessage.trim() || '(default / written by Zimraan)',
    );
  }

  if (fileUrls.length) {
    lines.push('', '--- Files ---', ...fileUrls.map((f) => `${f.label}: ${f.url}`));
  }

  return lines.filter(Boolean).join('\n');
}
