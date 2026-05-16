'use client';

import { useEffect, useRef } from 'react';

function AnimDivider() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return <span ref={ref} className="divider-line" />;
}

export function SectionBorder() {
  return (
    <div className="section-border-pad" style={{ paddingLeft: '40px', paddingRight: '40px' }}>
      <AnimDivider />
    </div>
  );
}
