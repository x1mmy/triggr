'use client';

import { useId, useState } from 'react';
import { FAQ_ITEMS } from '@/lib/seo/faq';

function FaqAccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  id,
  panelId,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  id: string;
  panelId: string;
}) {
  return (
    <div style={{ borderBottom: '0.5px solid #222' }}>
      <button
        type="button"
        id={id}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '16px',
          padding: '20px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '15px',
            fontWeight: 500,
            color: '#F0F0EE',
            lineHeight: 1.45,
          }}
        >
          {question}
        </span>
        <span
          aria-hidden
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '14px',
            color: '#444440',
            flexShrink: 0,
            transform: isOpen ? 'rotate(45deg)' : 'none',
            transition: 'transform 180ms cubic-bezier(.16,1,.3,1)',
          }}
        >
          +
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={id}
        hidden={!isOpen}
        style={{
          overflow: 'hidden',
          maxHeight: isOpen ? '400px' : 0,
          opacity: isOpen ? 1 : 0,
          transition: 'max-height 280ms cubic-bezier(.16,1,.3,1), opacity 200ms',
        }}
      >
        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '14px',
            color: '#888884',
            lineHeight: 1.65,
            margin: 0,
            paddingBottom: '20px',
            maxWidth: '720px',
          }}
        >
          {answer}
        </p>
      </div>
    </div>
  );
}

export function FAQ() {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-pad" style={{ padding: '100px 40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '48px' }}>
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
            FAQ
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
            Still not sure?
          </h2>
        </div>

        <div className="reveal" style={{ borderTop: '0.5px solid #222' }}>
          {FAQ_ITEMS.map((item, index) => {
            const buttonId = `${baseId}-q-${index}`;
            const panelId = `${baseId}-a-${index}`;
            const isOpen = openIndex === index;

            return (
              <FaqAccordionItem
                key={item.question}
                question={item.question}
                answer={item.answer}
                isOpen={isOpen}
                onToggle={() => setOpenIndex(isOpen ? null : index)}
                id={buttonId}
                panelId={panelId}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
