import { LogoMark } from './LogoMark';

const productLinks = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
];

const companyLinks = [
  { label: 'About', href: '#' },
  { label: 'Contact', href: '#contact' },
  { label: 'usetriggr.com.au', href: 'https://usetriggr.com.au' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="section-pad" style={{ padding: '48px 40px', background: '#090909' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '48px',
            flexWrap: 'wrap',
            gap: '32px',
          }}
        >
          <div>
            <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', marginBottom: '10px' }}>
              <LogoMark size={18} color="#F0F0EE" />
              <span
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: '13px',
                  color: '#F0F0EE',
                  letterSpacing: '0.12em',
                }}
              >
                TRIGGR
              </span>
            </a>
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: '13px',
                color: '#444440',
                lineHeight: 1.6,
                maxWidth: '260px',
              }}
            >
              Done-for-you AI automation and custom web development. Western Sydney.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
            <div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  color: '#444440',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '14px',
                }}
              >
                Product
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {productLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    style={{
                      fontFamily: "'Figtree', sans-serif",
                      fontSize: '13px',
                      color: '#888884',
                      textDecoration: 'none',
                      transition: 'color 180ms',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#F0F0EE';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#888884';
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  color: '#444440',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '14px',
                }}
              >
                Company
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {companyLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    style={{
                      fontFamily: "'Figtree', sans-serif",
                      fontSize: '13px',
                      color: '#888884',
                      textDecoration: 'none',
                      transition: 'color 180ms',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#F0F0EE';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#888884';
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            borderTop: '0.5px solid #1A1A1A',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#444440' }}>
            © {year} Triggr. All rights reserved.
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#444440' }}>
            Western Sydney, Australia
          </div>
        </div>
      </div>
    </footer>
  );
}
