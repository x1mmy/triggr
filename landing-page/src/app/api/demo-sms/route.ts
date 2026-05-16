import { NextResponse } from 'next/server';

type DemoSmsPayload = {
  name: string;
  phone: string;
  businessType: string;
};

const DEFAULT_WEBHOOK_URL = 'https://eoox4atsq75w3h.m.pipedream.net';

function normalizeAustralianMobile(rawPhone: string): string | null {
  const normalized = rawPhone.trim().replace(/\s+/g, '');
  if (/^04\d{8}$/.test(normalized)) return `+61${normalized.slice(1)}`;
  if (/^\+614\d{8}$/.test(normalized)) return normalized;
  return null;
}

function validatePayload(payload: Partial<DemoSmsPayload> | undefined): payload is DemoSmsPayload {
  if (!payload) return false;
  if (typeof payload.name !== 'string' || typeof payload.phone !== 'string' || typeof payload.businessType !== 'string') {
    return false;
  }

  const trimmedName = payload.name.trim();
  const trimmedBusinessType = payload.businessType.trim();
  const normalizedPhone = normalizeAustralianMobile(payload.phone);

  if (trimmedName.length < 2 || trimmedName.length > 50) return false;
  if (!trimmedBusinessType || trimmedBusinessType.length > 30) return false;
  if (!normalizedPhone) return false;
  return true;
}

function buildSmsMessage(name: string): string {
  return `Hi ${name}, this is what a Triggr lead alert looks like. You'd get this instantly when someone submits a form. That's it. No emails, no delays. -Triggr`;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to send SMS. Please try again.' }, { status: 400 });
  }

  if (!validatePayload(body as Partial<DemoSmsPayload>)) {
    return NextResponse.json({ success: false, message: 'Failed to send SMS. Please try again.' }, { status: 400 });
  }

  const demoBody = body as DemoSmsPayload;
  const phone = normalizeAustralianMobile(demoBody.phone)!;
  const name = demoBody.name.trim();
  const businessType = demoBody.businessType.trim();
  const webhookUrl = process.env.PIPEDREAM_DEMO_SMS_WEBHOOK_URL || DEFAULT_WEBHOOK_URL;
  const smsMessage = buildSmsMessage(name);

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        phone,
        businessType,
        smsMessage,
      }),
    });

    if (!webhookResponse.ok) {
      return NextResponse.json({ success: false, message: 'Failed to send SMS. Please try again.' }, { status: 502 });
    }

    return NextResponse.json({ success: true, message: 'SMS sent successfully' });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to send SMS. Please try again.' }, { status: 500 });
  }
}
