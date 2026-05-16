const sydneyFmt = new Intl.DateTimeFormat('en-AU', {
  timeZone: 'Australia/Sydney',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
});

export function formatSydneyTimestamp(date: Date = new Date()): string {
  const parts = sydneyFmt.formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? '';
  return `${get('day')}/${get('month')}/${get('year')} ${get('hour')}:${get('minute')} ${get('dayPeriod').toUpperCase()} (Sydney)`;
}

export async function sendTelegramMessage(text: string): Promise<{ ok: true } | { ok: false; error: string; details?: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return { ok: false, error: 'Telegram env vars missing' };
  }
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
  if (!response.ok) {
    const details = await response.text();
    return { ok: false, error: 'Telegram API error', details };
  }
  return { ok: true };
}

export async function notifyOnboardingError(context: string, err: unknown): Promise<void> {
  const msg = err instanceof Error ? err.message : String(err);
  const stack = err instanceof Error ? err.stack?.slice(0, 800) : '';
  const text = [
    'Triggr onboarding ERROR:',
    '',
    `Context: ${context}`,
    `Time: ${formatSydneyTimestamp()}`,
    '',
    msg,
    stack ? `\n${stack}` : '',
  ].join('\n');
  try {
    await sendTelegramMessage(text.slice(0, 4000));
  } catch {
    /* avoid throw */
  }
}
