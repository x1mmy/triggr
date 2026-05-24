const problems = [
  { stat: '78%', text: 'of customers hire the first business that responds.' },
  { stat: '5 min', text: 'is the window before lead quality drops sharply.' },
  { stat: '3–5×', text: 'more jobs closed when response time is under 60 seconds.' },
];

export function Problem() {
  return (
    <section id="problem" className="section-pad" style={{ padding: '100px 40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div
          className="grid-2col problem-gap"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'start',
          }}
        >
          <div>
            <div
              className="reveal reveal--left"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                color: '#444440',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '20px',
              }}
            >
              The problem
            </div>
            <h2
              className="reveal reveal--left"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(32px, 4vw, 52px)',
                lineHeight: 0.92,
                letterSpacing: '-0.02em',
                color: '#F0F0EE',
                marginBottom: '24px',
              }}
            >
              Speed wins.
              <br />
              Silence loses.
            </h2>
            <p
              className="reveal reveal--left reveal--subtle"
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: '15px',
                color: '#888884',
                lineHeight: 1.65,
                maxWidth: '380px',
              }}
            >
              Your competitors aren&apos;t better. They&apos;re just faster. Every unanswered enquiry is a job you paid
              to attract and then handed to someone else.
            </p>
          </div>
          <div
            data-reveal-group="problem-stats"
            style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '8px' }}
          >
            {problems.map((p, i) => (
              <div
                key={i}
                className="reveal reveal--right reveal--scale card-lift"
                style={{
                  background: '#111',
                  border: '0.5px solid #222',
                  borderRadius: '6px',
                  padding: '20px 24px',
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'flex-start',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#1A1A1A';
                  e.currentTarget.style.borderColor = '#333';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#111';
                  e.currentTarget.style.borderColor = '#222';
                }}
              >
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: '28px',
                    color: '#FFFFFF',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    minWidth: '80px',
                    flexShrink: 0,
                  }}
                >
                  {p.stat}
                </div>
                <div
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: '14px',
                    color: '#888884',
                    lineHeight: 1.55,
                    paddingTop: '6px',
                  }}
                >
                  {p.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
