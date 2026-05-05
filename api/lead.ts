type LeadFormPayload = {
  name: string;
  business: string;
  email: string;
  phone: string;
  need: string;
  message: string;
  submittedAt: string;
  source: string;
};

type Req = {
  method?: string;
  body?: LeadFormPayload;
};

type Res = {
  status: (code: number) => Res;
  json: (payload: unknown) => void;
};

const needLabelMap: Record<string, string> = {
  automation: 'Lead conversion automation',
  web: 'Web & full-stack development',
  both: 'Both — automation + web',
  unsure: 'Not sure yet',
};

function validatePayload(payload: Partial<LeadFormPayload> | undefined): payload is LeadFormPayload {
  if (!payload) return false;
  const required = ['name', 'business', 'email', 'phone', 'need', 'submittedAt', 'source'] as const;
  return required.every((key) => typeof payload[key] === 'string' && payload[key].trim().length > 0);
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
    `Source: ${data.source}`,
  ].join('\n');
}

export default async function handler(req: Req, res: Res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    res.status(500).json({ ok: false, error: 'Telegram env vars are missing' });
    return;
  }

  if (!validatePayload(req.body)) {
    res.status(400).json({ ok: false, error: 'Invalid form payload' });
    return;
  }

  const text = formatMessage(req.body);

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
      res.status(502).json({ ok: false, error: 'Telegram API error', details });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, error: 'Failed to send Telegram message', details: String(error) });
  }
}
