import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { onboardingSchema, type OnboardingPayload } from '@/lib/onboarding/schemas';
import { createLinearOnboardingIssue } from '@/lib/integrations/linear';
import { createNotionClientRow } from '@/lib/integrations/notion';
import {
  ALLOWED_DOC_TYPES,
  ALLOWED_LOGO_TYPES,
  ALLOWED_PHOTO_TYPES,
  MAX_FILE_BYTES,
} from '@/lib/onboarding/constants';
import { serviceLabelForPayload } from '@/lib/onboarding/summary';
import { formatSydneyTimestamp, notifyOnboardingError, sendTelegramMessage } from '@/lib/telegram';

const SUBMIT_SUPPORT_EMAIL = 'hi@usetriggr.com.au';
const SUBMIT_USER_ERROR = `Could not save your submission. Please email ${SUBMIT_SUPPORT_EMAIL}.`;

export const runtime = 'nodejs';
export const maxDuration = 60;

function str(fd: FormData, key: string): string {
  const v = fd.get(key);
  return typeof v === 'string' ? v : '';
}

function arr(fd: FormData, key: string): string[] {
  return fd.getAll(key).filter((x): x is string => typeof x === 'string');
}

function filesOf(fd: FormData, key: string): File[] {
  return fd.getAll(key).filter((x): x is File => x instanceof File && x.size > 0);
}

function rawPayloadFromFormData(fd: FormData): Record<string, unknown> {
  const formType = str(fd, 'formType');
  const fullName = str(fd, 'fullName');
  const businessName = str(fd, 'businessName');
  const businessType = str(fd, 'businessType');
  const suburb = str(fd, 'suburb');

  if (formType === 'automation') {
    return {
      formType: 'automation',
      fullName,
      businessName,
      businessType,
      suburb,
      leadSources: arr(fd, 'leadSources'),
      enquiriesPerWeek: str(fd, 'enquiriesPerWeek'),
      responseTime: str(fd, 'responseTime'),
      smsPhone: str(fd, 'smsPhone'),
      hasWebsite: str(fd, 'hasWebsite'),
      websiteUrl: str(fd, 'websiteUrl'),
      hasGbp: str(fd, 'hasGbp'),
      usesCrm: str(fd, 'usesCrm'),
      crmName: str(fd, 'crmName'),
      firstMessage: str(fd, 'firstMessage'),
    };
  }

  if (formType === 'webdev') {
    return {
      formType: 'webdev',
      fullName,
      businessName,
      businessType,
      suburb,
      displayPhone: str(fd, 'displayPhone'),
      displayEmail: str(fd, 'displayEmail'),
      mainJob: str(fd, 'mainJob'),
      pagesNeeded: arr(fd, 'pagesNeeded'),
      otherPagesFeatures: str(fd, 'otherPagesFeatures'),
      hasLogo: str(fd, 'hasLogo'),
      hasBrandColors: str(fd, 'hasBrandColors'),
      brandColors: str(fd, 'brandColors'),
      inspirationSites: str(fd, 'inspirationSites'),
      photosReady: str(fd, 'photosReady'),
      copyReady: str(fd, 'copyReady'),
      copyText: str(fd, 'copyText'),
      servicesList: str(fd, 'servicesList'),
      hasDomain: str(fd, 'hasDomain'),
      domainName: str(fd, 'domainName'),
      currentWebsiteUrl: str(fd, 'currentWebsiteUrl'),
    };
  }

  if (formType === 'both') {
    return {
      formType: 'both',
      fullName,
      businessName,
      businessType,
      suburb,
      mainJob: str(fd, 'mainJob'),
      pagesNeeded: arr(fd, 'pagesNeeded'),
      otherPagesFeatures: str(fd, 'otherPagesFeatures'),
      hasLogo: str(fd, 'hasLogo'),
      hasBrandColors: str(fd, 'hasBrandColors'),
      brandColors: str(fd, 'brandColors'),
      inspirationSites: str(fd, 'inspirationSites'),
      photosReady: str(fd, 'photosReady'),
      copyReady: str(fd, 'copyReady'),
      copyText: str(fd, 'copyText'),
      servicesList: str(fd, 'servicesList'),
      hasDomain: str(fd, 'hasDomain'),
      domainName: str(fd, 'domainName'),
      currentWebsiteUrl: str(fd, 'currentWebsiteUrl'),
      leadSources: arr(fd, 'leadSources'),
      enquiriesPerWeek: str(fd, 'enquiriesPerWeek'),
      responseTime: str(fd, 'responseTime'),
      smsPhone: str(fd, 'smsPhone'),
      usesCrm: str(fd, 'usesCrm'),
      crmName: str(fd, 'crmName'),
      firstMessage: str(fd, 'firstMessage'),
    };
  }

  return { formType: 'invalid' };
}

function assertFile(name: string, file: File, allowed: readonly string[]): void {
  if (file.size > MAX_FILE_BYTES) {
    throw new Error(`${name}: file too large (max 10MB)`);
  }
  if (!allowed.includes(file.type)) {
    throw new Error(`${name}: unsupported file type (${file.type || 'unknown'})`);
  }
}

async function uploadToBlob(pathPrefix: string, file: File): Promise<string> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new Error('File storage not configured (BLOB_READ_WRITE_TOKEN)');
  }
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, '-').slice(0, 120);
  const pathname = `${pathPrefix}/${Date.now()}-${safeName}`;
  const blob = await put(pathname, file, { access: 'public', token });
  return blob.url;
}

async function collectUploads(fd: FormData, payload: OnboardingPayload): Promise<{ label: string; url: string }[]> {
  const out: { label: string; url: string }[] = [];
  const prefix = `onboarding/${payload.formType}`;

  if (payload.formType === 'webdev' || payload.formType === 'both') {
    if (payload.hasLogo === 'yes') {
      const logo = fd.get('logo');
      if (logo instanceof File && logo.size > 0) {
        assertFile('Logo', logo, ALLOWED_LOGO_TYPES);
        const url = await uploadToBlob(`${prefix}/logo`, logo);
        out.push({ label: 'Logo', url });
      }
    }

    if (payload.photosReady === 'yes' || payload.photosReady === 'some') {
      const photos = filesOf(fd, 'photos');
      let i = 0;
      for (const photo of photos) {
        i += 1;
        assertFile(`Photo ${i}`, photo, ALLOWED_PHOTO_TYPES);
        const url = await uploadToBlob(`${prefix}/photos`, photo);
        out.push({ label: `Photo ${i}`, url });
      }
    }

    if (payload.copyReady === 'yes') {
      const doc = fd.get('copyDocument');
      if (doc instanceof File && doc.size > 0) {
        assertFile('Copy document', doc, ALLOWED_DOC_TYPES);
        const url = await uploadToBlob(`${prefix}/copy`, doc);
        out.push({ label: 'Copy document', url });
      }
    }
  }

  return out;
}

async function sendSuccessTelegram(
  payload: OnboardingPayload,
  fileUrls: { label: string; url: string }[],
  extras: string,
) {
  const time = formatSydneyTimestamp();
  const service = serviceLabelForPayload(payload);
  const lines = [
    `New client onboarded: ${payload.fullName} — ${payload.businessName} (${service}).`,
    `Form submitted at ${time}.`,
    '',
    extras,
  ];
  if (fileUrls.length) {
    lines.push('', 'Files:', ...fileUrls.map((f) => `${f.label}: ${f.url}`));
  }
  await sendTelegramMessage(lines.filter(Boolean).join('\n').slice(0, 4000));
}

export async function POST(request: Request) {
  try {
    const fd = await request.formData();

    const raw = rawPayloadFromFormData(fd);
    const parsed = onboardingSchema.safeParse(raw);
    if (!parsed.success) {
      const msg = parsed.error.flatten().fieldErrors;
      await notifyOnboardingError('Onboarding validation', JSON.stringify(msg));
      return NextResponse.json({ ok: false, error: 'Invalid form data', details: msg }, { status: 400 });
    }

    const payload = parsed.data;

    let fileUrls: { label: string; url: string }[] = [];
    try {
      fileUrls = await collectUploads(fd, payload);
    } catch (e) {
      await notifyOnboardingError('Onboarding file upload', e);
      return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : 'Upload failed' }, { status: 400 });
    }

    const notionRes = await createNotionClientRow(payload, fileUrls);
    if (!notionRes.ok) {
      await notifyOnboardingError('Notion create failed', notionRes.error);
      return NextResponse.json(
        { ok: false, error: SUBMIT_USER_ERROR, fileUrls },
        { status: 500 },
      );
    }

    const linearRes = await createLinearOnboardingIssue(payload, fileUrls, notionRes.url);
    let linearNote = '';
    if (!linearRes.ok) {
      linearNote = `Linear: failed (${linearRes.error})`;
      await notifyOnboardingError(
        `Linear create failed (${linearRes.reason})`,
        linearRes.error,
      );
    } else if (linearRes.url) {
      linearNote = `Linear: ${linearRes.url}`;
    }

    const notionNote = notionRes.url ? `Notion: ${notionRes.url}` : 'Notion: created';

    try {
      await sendSuccessTelegram(payload, fileUrls, [notionNote, linearNote].filter(Boolean).join('\n'));
    } catch (e) {
      await notifyOnboardingError('Telegram success message failed', e);
    }

    return NextResponse.json({
      ok: true,
      notionUrl: notionRes.url,
      linearUrl: linearRes.ok ? linearRes.url : undefined,
      linearError: linearRes.ok ? undefined : linearRes.error,
    });
  } catch (e) {
    await notifyOnboardingError('Onboarding submit uncaught', e);
    return NextResponse.json(
      { ok: false, error: `Something went wrong. Please try again or email ${SUBMIT_SUPPORT_EMAIL}.` },
      { status: 500 },
    );
  }
}
