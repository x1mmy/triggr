import { useEffect, useState, type CSSProperties, type FormEvent } from 'react';

type ContactModalProps = {
  onClose: () => void;
};

export function ContactModal({ onClose }: ContactModalProps) {
  const [name, setName] = useState('');
  const [biz, setBiz] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [need, setNeed] = useState('');
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const inputStyle: CSSProperties = {
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
  };

  const labelStyle: CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    color: '#444440',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '8px',
    display: 'block',
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose} aria-hidden="true" />

      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '16px',
            right: '20px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#444440',
            fontSize: '20px',
            lineHeight: 1,
            padding: '4px',
            transition: 'color 150ms',
            fontFamily: 'sans-serif',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#F0F0EE';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#444440';
          }}
        >
          ✕
        </button>

        {sent ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: '24px',
                color: '#F0F0EE',
                letterSpacing: '-0.02em',
                marginBottom: '12px',
              }}
            >
              We&apos;ll be in touch.
            </div>
            <p
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: '14px',
                color: '#888884',
                lineHeight: 1.65,
              }}
            >
              Thanks for reaching out. We typically respond within one business day.
            </p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '28px' }}>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  color: '#444440',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '12px',
                }}
              >
                Get started
              </div>
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: '26px',
                  color: '#F0F0EE',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.05,
                }}
              >
                Let&apos;s build your system.
              </h3>
              <p
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: '13px',
                  color: '#888884',
                  lineHeight: 1.65,
                  marginTop: '10px',
                }}
              >
                Tell us a bit about your business and what you&apos;re trying to solve. We&apos;ll come back to you
                fast.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Your name</label>
                <input
                  required
                  style={inputStyle}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="James Miller"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#555';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#2A2A2A';
                  }}
                />
              </div>
              <div>
                <label style={labelStyle}>Business name</label>
                <input
                  required
                  style={inputStyle}
                  value={biz}
                  onChange={(e) => setBiz(e.target.value)}
                  placeholder="Miller Plumbing"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#555';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#2A2A2A';
                  }}
                />
              </div>
              <div>
                <label style={labelStyle}>Email address</label>
                <input
                  required
                  type="email"
                  style={inputStyle}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="james@example.com.au"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#555';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#2A2A2A';
                  }}
                />
              </div>
              <div>
                <label style={labelStyle}>Phone number</label>
                <input
                  required
                  type="tel"
                  style={inputStyle}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="04xx xxx xxx"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#555';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#2A2A2A';
                  }}
                />
              </div>
              <div>
                <label style={labelStyle}>What do you need?</label>
                <select
                  required
                  style={{
                    ...inputStyle,
                    cursor: 'pointer',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    color: need ? '#F0F0EE' : '#444440',
                  }}
                  value={need}
                  onChange={(e) => setNeed(e.target.value)}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#555';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#2A2A2A';
                  }}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="automation">Lead conversion automation</option>
                  <option value="web">Web &amp; full-stack development</option>
                  <option value="both">Both — automation + web</option>
                  <option value="unsure">Not sure yet</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>
                  Anything else?{' '}
                  <span
                    style={{
                      color: '#444440',
                      textTransform: 'none',
                      letterSpacing: 0,
                      fontFamily: "'Figtree', sans-serif",
                    }}
                  >
                    (optional)
                  </span>
                </label>
                <textarea
                  rows={4}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '90px' }}
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="Tell us more about what you're trying to solve..."
                  onFocus={(e) => {
                    e.target.style.borderColor = '#555';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#2A2A2A';
                  }}
                />
              </div>
              <button
                type="submit"
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
                  cursor: 'pointer',
                  transition: 'background 180ms',
                  marginTop: '4px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#E8E8E6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FFF';
                }}
              >
                Send message
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
}
