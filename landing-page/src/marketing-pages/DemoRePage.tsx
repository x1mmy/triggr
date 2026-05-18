'use client';

import { useMemo, useState, type CSSProperties, type FormEvent } from 'react';

const WEBHOOK_URL = 'https://eoujxei27dx177q.m.pipedream.net';

type DemoReFormState = {
  name: string;
  phone: string;
};

function normalizePhoneInput(value: string): string {
  const digits = value.replace(/[^\d+]/g, '');

  if (digits.startsWith('04')) {
    return `+61${digits.slice(1)}`;
  }

  if (digits.startsWith('614') && !digits.startsWith('+')) {
    return `+${digits}`;
  }

  return digits;
}

function isValidAustralianMobile(value: string): boolean {
  return /^\+614\d{8}$/.test(value);
}

function toInternationalPhone(value: string): string {
  return normalizePhoneInput(value.trim());
}

export function DemoRePage() {
  const [form, setForm] = useState<DemoReFormState>({ name: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const inputStyle: CSSProperties = useMemo(
    () => ({
      width: '100%',
      background: '#0D0D0D',
      border: '0.5px solid #2A2A2A',
      borderRadius: '6px',
      color: '#F0F0EE',
      fontFamily: "'Figtree', sans-serif",
      fontSize: '14px',
      padding: '10px 14px',
      outline: 'none',
      transition: 'border-color 180ms',
      display: 'block',
    }),
    [],
  );

  const labelStyle: CSSProperties = useMemo(
    () => ({
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '10px',
      color: '#444440',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      marginBottom: '8px',
      display: 'block',
    }),
    [],
  );

  const primaryButtonStyle: CSSProperties = useMemo(
    () => ({
      background: '#FFF',
      color: '#090909',
      border: 'none',
      borderRadius: '6px',
      padding: '11px',
      width: '100%',
      fontFamily: "'Figtree', sans-serif",
      fontWeight: 500,
      fontSize: '14px',
      transition: 'background 180ms',
      marginTop: '4px',
    }),
    [],
  );

  const validate = (): string => {
    const trimmedName = form.name.trim();
    const internationalPhone = toInternationalPhone(form.phone);

    if (trimmedName.length < 2 || trimmedName.length > 50) {
      return 'Please enter your name';
    }

    if (!isValidAustralianMobile(internationalPhone)) {
      return 'Please enter a valid Australian mobile number with +61 (e.g. +61412345678)';
    }

    return '';
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: toInternationalPhone(form.phone),
        }),
      });

      if (!response.ok) {
        throw new Error('Webhook failed');
      }

      setSuccess(true);
    } catch {
      setError('Something went wrong — try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100dvh', background: '#090909', color: '#F0F0EE' }}>
      <main
        style={{
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 24px',
        }}
      >
        <div style={{ width: '100%', maxWidth: '480px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(28px, 4.5vw, 42px)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: '#F0F0EE',
              }}
            >
              See what your buyers experience
            </h1>
            <p
              style={{
                marginTop: '14px',
                fontFamily: "'Figtree', sans-serif",
                fontSize: '16px',
                color: '#888884',
                lineHeight: 1.7,
              }}
            >
              Fill this in as if you&apos;re a buyer enquiring on a listing. You&apos;ll get the automated response on
              your phone in seconds.
            </p>
          </div>

          <div>
            {success ? (
              <div style={{ textAlign: 'center' }}>
                <p
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: '18px',
                    fontWeight: 500,
                    color: '#F0F0EE',
                    lineHeight: 1.5,
                  }}
                >
                  Done. Check your phone.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label htmlFor="demo-re-name" style={labelStyle}>
                    Name
                  </label>
                  <input
                    id="demo-re-name"
                    required
                    type="text"
                    autoComplete="name"
                    style={inputStyle}
                    value={form.name}
                    maxLength={50}
                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Jane Buyer"
                  />
                </div>
                <div>
                  <label htmlFor="demo-re-phone" style={labelStyle}>
                    Phone
                  </label>
                  <input
                    id="demo-re-phone"
                    required
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    style={inputStyle}
                    value={form.phone}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        phone: normalizePhoneInput(e.target.value),
                      }))
                    }
                    placeholder="+61412345678"
                  />
                </div>

                {error && (
                  <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: '13px', color: '#d59494', lineHeight: 1.6 }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    ...primaryButtonStyle,
                    opacity: submitting ? 0.75 : 1,
                    cursor: submitting ? 'wait' : 'pointer',
                  }}
                >
                  {submitting ? 'Sending…' : 'Send me the demo'}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
