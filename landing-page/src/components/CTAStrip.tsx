type CTAStripProps = {
  onOpenModal: () => void;
};

export function CTAStrip({ onOpenModal }: CTAStripProps) {
  return (
    <section
      id="contact"
      className="section-pad"
      style={{ padding: '100px 40px', borderTop: '0.5px solid #222', borderBottom: '0.5px solid #222' }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '40px',
          flexWrap: 'wrap',
        }}
      >
        <div>
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
            Ready to start
          </div>
          <h2
            className="reveal"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(32px, 5vw, 64px)',
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
              color: '#F0F0EE',
              maxWidth: '600px',
            }}
          >
            Build it once.
            <br />
            Let it run.
          </h2>
        </div>
        <div className="reveal" style={{ display: 'flex', gap: '10px', flexShrink: 0, alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn-primary"
            onClick={onOpenModal}
            style={{
              background: '#FFF',
              color: '#090909',
              border: 'none',
              borderRadius: '6px',
              padding: '12px 24px',
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 500,
              fontSize: '14px',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#E8E8E6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FFF';
            }}
          >
            Talk to us
          </button>
          <a
            href="#how-it-works"
            className="btn-secondary"
            style={{
              background: 'transparent',
              color: '#F0F0EE',
              border: '0.5px solid #333',
              borderRadius: '6px',
              padding: '12px 24px',
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 500,
              fontSize: '14px',
              textDecoration: 'none',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1A1A1A';
              e.currentTarget.style.borderColor = '#444440';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = '#333';
            }}
          >
            See how it works
          </a>
        </div>
      </div>
    </section>
  );
}
