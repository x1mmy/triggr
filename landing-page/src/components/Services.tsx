const cols = [
  {
    tag: 'Automation & AI',
    headline: 'Systems that run\nwithout you.',
    body: 'We build end-to-end automation systems for businesses that are losing revenue to manual processes, slow response times, or missed follow-ups.',
    items: [
      'AI lead response (< 60 seconds)',
      'Automated follow-up sequences',
      'CRM integration & data routing',
      'Appointment booking automation',
      'Custom AI agents for your workflow',
      'Reporting & alert systems',
    ],
  },
  {
    tag: 'Web & Dev',
    headline: 'Software built\nfor the job.',
    body: 'Custom web applications and full-stack builds for businesses that have outgrown off-the-shelf tools or need something that actually fits how they work.',
    items: [
      'Custom web applications',
      'Client portals & dashboards',
      'API integrations & data pipelines',
      'Landing pages that convert',
      'Internal tools & admin systems',
      'Ongoing development retainers',
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="section-pad" style={{ padding: '100px 40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '56px' }}>
          <div
            className="reveal"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              color: '#444440',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '16px',
            }}
          >
            Services
          </div>
          <h2
            className="reveal"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(32px, 4vw, 52px)',
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
              color: '#F0F0EE',
            }}
          >
            Two things.
            <br />
            Done properly.
          </h2>
        </div>
        <div
          data-reveal-group="services"
          className="grid-2col"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}
        >
          {cols.map((col, i) => (
            <div
              key={i}
              className={`reveal reveal--scale card-lift${i === 1 ? ' reveal--subtle' : ''}`}
              style={{
                background: '#111',
                border: '0.5px solid #222',
                borderRadius: '6px',
                padding: '36px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  color: '#888884',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  background: '#090909',
                  border: '0.5px solid #222',
                  borderRadius: '4px',
                  padding: '3px 8px',
                  display: 'inline-block',
                  width: 'fit-content',
                }}
              >
                {col.tag}
              </span>
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: '28px',
                  color: '#F0F0EE',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.05,
                  whiteSpace: 'pre-line',
                }}
              >
                {col.headline}
              </h3>
              <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: '14px', color: '#888884', lineHeight: 1.65 }}>
                {col.body}
              </p>
              <div style={{ borderTop: '0.5px solid #222', paddingTop: '20px' }}>
                {col.items.map((item, j) => (
                  <div
                    key={j}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'flex-start',
                      padding: '8px 0',
                      borderBottom: j < col.items.length - 1 ? '0.5px solid #1A1A1A' : 'none',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '11px',
                        color: '#333',
                        marginTop: '2px',
                        flexShrink: 0,
                      }}
                    >
                      —
                    </span>
                    <span style={{ fontFamily: "'Figtree', sans-serif", fontSize: '14px', color: '#888884', lineHeight: 1.4 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
