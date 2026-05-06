import { ContactForm } from '../components/ContactForm';
import { LogoMark } from '../components/LogoMark';

export function ContactPage() {
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
              Get in touch
            </h1>
            <p
              style={{
                marginTop: '12px',
                fontFamily: "'Figtree', sans-serif",
                fontSize: '15px',
                color: '#888884',
                lineHeight: 1.7,
              }}
            >
              Tell us about your business and we&apos;ll map out the fastest way to stop missed leads.
            </p>
          </div>

          <div
            style={{
              maxWidth: '480px',
              margin: '0 auto',
              background: '#111111',
              border: '0.5px solid #2A2A2A',
              borderRadius: '6px',
              padding: '40px',
            }}
          >
            <ContactForm source="contact page" />
          </div>
        </div>
      </main>
    </div>
  );
}
