type DemoSmsPayload = {
  name: string;
  phone: string;
  businessType: string;
};

type Req = {
  method?: string;
  body?: Partial<DemoSmsPayload>;
};

type Res = {
  status: (code: number) => Res;
  json: (payload: unknown) => void;
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

export default async function handler(req: Req, res: Res) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Failed to send SMS. Please try again.' });
    return;
  }

  if (!validatePayload(req.body)) {
    res.status(400).json({ success: false, message: 'Failed to send SMS. Please try again.' });
    return;
  }

  const phone = normalizeAustralianMobile(req.body.phone)!;
  const name = req.body.name.trim();
  const businessType = req.body.businessType.trim();
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
      res.status(502).json({ success: false, message: 'Failed to send SMS. Please try again.' });
      return;
    }

    res.status(200).json({ success: true, message: 'SMS sent successfully' });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to send SMS. Please try again.' });
  }
}
