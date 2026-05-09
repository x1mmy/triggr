import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    num: '01',
    timing: 'Day 0',
    title: 'Audit your lead flow',
    body: 'We map every touchpoint where leads come in — forms, calls, DMs, referrals. Nothing is assumed.',
  },
  {
    num: '02',
    timing: 'Days 1-3',
    title: 'Build the system',
    body: 'Custom automations built around your business. CRM integration, AI response drafts, routing rules — done for you.',
  },
  {
    num: '03',
    timing: 'Days 4-5',
    title: 'Test under load',
    body: 'We simulate real enquiry volume before going live. If it breaks, it breaks in testing, not on a Friday night.',
  },
  {
    num: '04',
    timing: 'Ongoing',
    title: 'Go live. We monitor.',
    body: 'Systems run. You get notified of anything that needs you. We handle the rest.',
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          steps.forEach((_, i) => {
            setTimeout(() => setActiveStep(i), i * 520);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="section-pad" style={{ padding: '100px 40px' }} ref={sectionRef}>
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
            How it works
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
            From audit to live
            <br />
            in days, not months.
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {steps.map((step, i) => (
            <div
              key={i}
              className="reveal"
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr',
                gap: '0 32px',
                borderTop: '0.5px solid #222',
                padding: '28px 0',
                alignItems: 'start',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', color: '#F0F0EE' }}>
                  {step.num}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    color: activeStep >= i ? '#F0F0EE' : '#444440',
                    transition: 'color 300ms ease',
                  }}
                >
                  {`Typical: ${step.timing}`}
                </div>
              </div>
              <div className="grid-hiw" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0 40px' }}>
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: '20px',
                    color: '#F0F0EE',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                  }}
                >
                  {step.title}
                </div>
                <div style={{ fontFamily: "'Figtree', sans-serif", fontSize: '14px', color: '#888884', lineHeight: 1.65 }}>
                  {step.body}
                </div>
              </div>
            </div>
          ))}
          <div style={{ borderTop: '0.5px solid #222' }} />
        </div>
      </div>
    </section>
  );
}
