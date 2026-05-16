import { NextResponse } from 'next/server';

type LeadFormPayload = {
  name: string;
  business: string;
  email: string;
  phone: string;
  need: string;
  message: string;
  submittedAt: string;
  source?: string;
};

const needLabelMap: Record<string, string> = {
  automation: 'Lead conversion automation',
  web: 'Web & full-stack development',
  both: 'Both — automation + web',
  unsure: 'Not sure yet',
};

function validatePayload(payload: Partial<LeadFormPayload> | undefined): payload is LeadFormPayload {
  if (!payload) return false;
  const required = ['name', 'business', 'email', 'phone', 'need', 'submittedAt'] as const;
  const hasRequired = required.every((key) => typeof payload[key] === 'string' && payload[key].trim().length > 0);
  if (!hasRequired) return false;
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email ?? '');
  const validPhone = /^\d{8,15}$/.test((payload.phone ?? '').replace(/\s+/g, ''));
  return validEmail && validPhone;
}

function formatMessage(data: LeadFormPayload): string {
  const needLabel = needLabelMap[data.need] ?? data.need;
  const optionalMsg = data.message.trim().length > 0 ? data.message.trim() : 'N/A';
  const submittedDate = new Date(data.submittedAt);
  const dtf = new Intl.DateTimeFormat('en-AU', {
    timeZone: 'Australia/Sydney',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  const parts = dtf.formatToParts(submittedDate);
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? '';
  const submittedSydney = `${get('day')}/${get('month')}/${get('year')} ${get('hour')}:${get('minute')} ${get('dayPeriod').toUpperCase()}`;
  return [
    '🔥 New Triggr Lead',
    '',
    `Name: ${data.name}`,
    `Business: ${data.business}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Need: ${needLabel}`,
    '',
    'Notes:',
    optionalMsg,
    '',
    `Submitted: ${submittedSydney} (Sydney)`,
    'Source: landing page',
  ].join('\n');
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json({ ok: false, error: 'Telegram env vars are missing' }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  if (!validatePayload(body as Partial<LeadFormPayload>)) {
    return NextResponse.json({ ok: false, error: 'Invalid form payload' }, { status: 400 });
  }

  const payload = body as LeadFormPayload;
  const text = formatMessage(payload);

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      return NextResponse.json({ ok: false, error: 'Telegram API error', details }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Failed to send Telegram message', details: String(error) }, { status: 500 });
  }
}
