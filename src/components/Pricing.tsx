import { useState } from 'react';

type PricingCardProps = {
  name: string;
  price: string;
  period: string;
  desc: string;
  features: string[];
  cta: string;
  featured?: boolean;
  onOpenModal: () => void;
};

function PricingCard({
  name,
  price,
  period,
  desc,
  features,
  cta,
  featured,
  onOpenModal,
}: PricingCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="reveal"
      style={{
        background: featured ? '#161616' : '#111',
        border: `0.5px solid ${featured ? '#444' : '#222'}`,
        borderRadius: '6px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        position: 'relative',
        transition: 'background 220ms cubic-bezier(.16,1,.3,1)',
      }}
    >
      {featured && (
        <div
          style={{
            position: 'absolute',
            top: '-1px',
            right: '20px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px',
            color: '#888884',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            background: '#161616',
            padding: '0 8px',
            borderLeft: '0.5px solid #444',
            borderRight: '0.5px solid #444',
          }}
        >
          Most popular
        </div>
      )}
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '10px',
          color: '#888884',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
        {name}
      </div>
      <div>
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: '28px',
            color: '#F0F0EE',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          {price}
        </div>
        {period && (
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              color: '#444440',
              marginTop: '4px',
            }}
          >
            / {period}
          </div>
        )}
      </div>
      <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: '13px', color: '#888884', lineHeight: 1.6 }}>{desc}</p>
      <div style={{ borderTop: '0.5px solid #222', paddingTop: '14px', display: 'flex', flexDirection: 'column' }}>
        {features.map((f, j) => (
          <div
            key={j}
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-start',
              padding: '6px 0',
              borderBottom: j < features.length - 1 ? `0.5px solid ${featured ? '#222' : '#1A1A1A'}` : 'none',
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: '#333',
                flexShrink: 0,
                marginTop: '2px',
              }}
            >
              —
            </span>
            <span style={{ fontFamily: "'Figtree', sans-serif", fontSize: '13px', color: '#888884' }}>{f}</span>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={onOpenModal}
        style={{
          marginTop: 'auto',
          display: 'block',
          textAlign: 'center',
          background: featured ? (hovered ? '#E8E8E6' : '#FFF') : hovered ? '#1A1A1A' : 'transparent',
          color: featured ? '#090909' : '#F0F0EE',
          border: featured ? 'none' : `0.5px solid ${hovered ? '#444440' : '#333'}`,
          borderRadius: '6px',
          padding: '10px',
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 500,
          fontSize: '13px',
          cursor: 'pointer',
          transition: 'background 180ms, border-color 180ms',
          width: '100%',
        }}
      >
        {cta}
      </button>
    </div>
  );
}

type PricingProps = {
  onOpenModal: () => void;
};

export function Pricing({ onOpenModal }: PricingProps) {
  const webCards = [
    {
      name: 'Website build',
      price: '$800–$1,200',
      period: 'one-off',
      desc: 'Up to 5 pages. Clean, fast, built to convert.',
      features: ['Up to 5 pages', 'Mobile-responsive', 'CMS setup if needed', 'Handover included'],
      cta: 'Get started',
      featured: false,
    },
    {
      name: 'Hosting & upkeep',
      price: '$50–$100',
      period: 'per month',
      desc: 'Monthly hosting, maintenance, and minor updates. Set and forget.',
      features: ['Managed hosting', 'Security updates', 'Minor content edits', 'Monthly check-in'],
      cta: 'Get started',
      featured: false,
    },
  ];

  const autoCards = [
    {
      name: 'Starter setup',
      price: '$800–$1,500',
      period: 'one-off',
      desc: 'Basic lead capture + instant SMS alert + Google Sheets CRM. Operational in days.',
      features: ['Lead capture integration', 'Instant SMS to your phone', 'Google Sheets CRM', '30-day support'],
      cta: 'Get started',
      featured: false,
    },
    {
      name: 'Full system setup',
      price: '$2,000–$3,500',
      period: 'one-off',
      desc: 'Full automation stack + AI chatbot + follow-up sequences. The complete system.',
      features: [
        'Full automation stack',
        'AI chatbot for enquiries',
        'Follow-up sequences',
        'CRM integration',
        '60-day support & monitoring',
      ],
      cta: 'Get started',
      featured: true,
    },
    {
      name: 'Monthly retainer',
      price: '$150–$400',
      period: 'per month',
      desc: "Ongoing maintenance, tweaks, and a monthly report so you know it's working.",
      features: ['System maintenance', 'Workflow adjustments', 'Monthly performance report', 'Priority support'],
      cta: 'Get started',
      featured: false,
    },
  ];

  return (
    <section id="pricing" className="section-pad" style={{ padding: '100px 40px' }}>
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
            Pricing
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
            Fixed price.
            <br />
            No surprises.
          </h2>
        </div>

        <div style={{ marginBottom: '48px' }}>
          <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                color: '#888884',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                whiteSpace: 'nowrap',
              }}
            >
              Web development
            </span>
            <div style={{ flex: 1, height: '0.5px', background: '#222' }} />
          </div>
          <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {webCards.map((card, i) => (
              <PricingCard key={i} {...card} onOpenModal={onOpenModal} />
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                color: '#888884',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                whiteSpace: 'nowrap',
              }}
            >
              Automation & AI systems
            </span>
            <div style={{ flex: 1, height: '0.5px', background: '#222' }} />
          </div>
          <div className="grid-3col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            {autoCards.map((card, i) => (
              <PricingCard key={i} {...card} onOpenModal={onOpenModal} />
            ))}
          </div>
        </div>

        <div className="reveal" style={{ borderTop: '0.5px solid #1A1A1A', paddingTop: '24px', marginBottom: '16px' }}>
          <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: '13px', color: '#444440', lineHeight: 1.7, maxWidth: '680px' }}>
            Building a website? We offer lead conversion automation as an add-on — $500 to setup, $150/month. One client over
            12 months is worth $3,300 vs $1,000 without it.
          </p>
        </div>
        <div className="reveal">
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#333333', letterSpacing: '0.02em' }}>
            Custom scopes and full-stack projects —{' '}
            <a href="#contact" style={{ color: '#444440', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              get in touch.
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
