import { useMemo, useState, type CSSProperties, type FormEvent } from 'react';
import { LogoMark } from '../components/LogoMark';

type DemoFormState = {
  name: string;
  phone: string;
  businessType: string;
};

function normalizePhoneForValidation(value: string): string {
  return value.replace(/[^\d+]/g, '');
}

function isValidAustralianMobile(value: string): boolean {
  return /^04\d{8}$/.test(value) || /^\+614\d{8}$/.test(value);
}

export function DemoPage() {
  const [form, setForm] = useState<DemoFormState>({ name: '', phone: '', businessType: '' });
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

  const validate = (): string => {
    const trimmedName = form.name.trim();
    const trimmedBusinessType = form.businessType.trim();
    const normalizedPhone = form.phone.trim();

    if (trimmedName.length < 2 || trimmedName.length > 50) {
      return 'Please enter your name';
    }

    if (!isValidAustralianMobile(normalizedPhone)) {
      return 'Please enter a valid Australian phone number';
    }

    if (!trimmedBusinessType || trimmedBusinessType.length > 30) {
      return 'Please enter your business type';
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
      const response = await fetch('/api/demo-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          businessType: form.businessType.trim(),
        }),
      });

      const payload = (await response.json().catch(() => null)) as { success?: boolean; message?: string } | null;
      if (!response.ok || !payload?.success) {
        throw new Error(payload?.message ?? 'Failed');
      }

      setSuccess(true);
      setForm({ name: '', phone: '', businessType: '' });
    } catch {
      setError('Something went wrong. Try again or contact us at hello@usetriggr.com.au');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#090909', color: '#F0F0EE' }}>
      <header
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '24px 24px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <a href="/" aria-label="Triggr home" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <LogoMark size={22} color="#F0F0EE" />
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: '14px',
              color: '#F0F0EE',
              letterSpacing: '0.12em',
            }}
          >
            TRIGGR
          </span>
        </a>
        <a
          href="/"
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '13px',
            color: '#888884',
            textDecoration: 'none',
          }}
        >
          ← Back to site
        </a>
      </header>

      <main style={{ padding: '48px 24px 64px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(34px, 5vw, 54px)',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                color: '#F0F0EE',
              }}
            >
              See It In Action
            </h1>
            <p
              style={{
                marginTop: '12px',
                fontFamily: "'Figtree', sans-serif",
                fontSize: '16px',
                color: '#888884',
                lineHeight: 1.7,
                maxWidth: '760px',
                marginInline: 'auto',
              }}
            >
              Fill out the form below and you&apos;ll receive an instant SMS notification within 10 seconds. That&apos;s how
              fast Triggr notifies you when a new lead comes in.
            </p>
            <p
              style={{
                marginTop: '8px',
                fontFamily: "'Figtree', sans-serif",
                fontSize: '15px',
                color: '#888884',
                lineHeight: 1.7,
                maxWidth: '760px',
                marginInline: 'auto',
              }}
            >
              Add your own mobile number below. You&apos;ll get a demo SMS to your phone showing what a real lead
              notification looks like.
            </p>
          </div>

          <div
            style={{
              maxWidth: '520px',
              margin: '0 auto',
              background: '#111111',
              border: '0.5px solid #2A2A2A',
              borderRadius: '6px',
              padding: '40px',
            }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Name</label>
                <input
                  required
                  style={inputStyle}
                  value={form.name}
                  maxLength={50}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label style={labelStyle}>Phone Number</label>
                <input
                  required
                  type="tel"
                  style={inputStyle}
                  value={form.phone}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      phone: normalizePhoneForValidation(e.target.value),
                    }))
                  }
                  placeholder="0412345678 or +61412345678"
                />
              </div>
              <div>
                <label style={labelStyle}>What Type of Business?</label>
                <input
                  required
                  style={inputStyle}
                  value={form.businessType}
                  maxLength={30}
                  onChange={(e) => setForm((prev) => ({ ...prev, businessType: e.target.value }))}
                  placeholder="Electrician"
                />
              </div>

              {submitting && (
                <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: '13px', color: '#B6B6B2' }}>
                  Sending your demo SMS...
                </p>
              )}
              {success && (
                <div
                  style={{
                    border: '0.5px solid #2A2A2A',
                    borderRadius: '6px',
                    padding: '12px 14px',
                    background: '#0D0D0D',
                  }}
                >
                  <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: '13px', color: '#d7d7d3', lineHeight: 1.6 }}>
                    Check your phone! Your demo SMS is on the way.
                  </p>
                  <p style={{ marginTop: '8px', fontFamily: "'Figtree', sans-serif", fontSize: '13px', color: '#888884', lineHeight: 1.6 }}>
                    Ready to set this up for your business? <a href="/contact" style={{ color: '#F0F0EE' }}>Open the contact form</a>.
                  </p>
                </div>
              )}
              {error && (
                <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: '13px', color: '#d59494', lineHeight: 1.6 }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                style={{
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
                  opacity: submitting ? 0.75 : 1,
                  cursor: submitting ? 'wait' : 'pointer',
                }}
              >
                {submitting ? 'Sending your demo SMS...' : 'Send Me Demo SMS'}
              </button>
            </form>

            <p
              style={{
                marginTop: '14px',
                fontFamily: "'Figtree', sans-serif",
                fontSize: '12px',
                color: '#666662',
                lineHeight: 1.6,
              }}
            >
              Questions? Email hello@usetriggr.com.au
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
