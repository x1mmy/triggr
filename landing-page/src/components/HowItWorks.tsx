'use client';

import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    num: '01',
    phase: 'Now',
    elapsed: '0:00',
    title: 'Audit your lead flow',
    body: 'We map every touchpoint where leads come in. Forms, calls, DMs, referrals. Nothing assumed.',
  },
  {
    num: '02',
    phase: 'Day 1-3',
    elapsed: '24:00',
    title: 'Build the system',
    body: 'Custom automations built around your business. CRM wiring, SMS alerts, response drafts. Done for you.',
  },
  {
    num: '03',
    phase: 'Day 4-5',
    elapsed: '96:00',
    title: 'Test under load',
    body: 'We simulate real enquiry volume before going live. If it breaks, it breaks here. Not on a Friday night.',
  },
  {
    num: '04',
    phase: 'Live',
    elapsed: 'Ongoing',
    title: 'Go live. We monitor.',
    body: 'Systems run. You get notified when something needs you. We handle the rest.',
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
            <div key={i} className="reveal how-step-row">
              <div className="how-step-meta">
                <div className="how-num">{step.num}</div>
                <div className="how-phase">{step.phase}</div>
                <div className={`how-elapsed${activeStep >= i ? ' is-lit' : ''}`}>{step.elapsed}</div>
              </div>
              <div className="how-step-content grid-hiw">
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
