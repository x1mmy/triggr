import { useEffect, useRef, useState, type CSSProperties } from 'react';

function useCountUp(target: number, duration: number, started: boolean) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!started) return;
    const end = target;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(2, -10 * progress);
      setVal(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration]);

  return val;
}

type Stat = {
  value: string;
  label: string;
  notLast?: boolean;
  notFirst?: boolean;
};

function StatItem({ stat, started }: { stat: Stat; started: boolean }) {
  const match = stat.value.match(/^([<>]?\s*)(\d+)(.*)$/);
  const prefix = match ? match[1] : '';
  const num = match ? parseInt(match[2], 10) : null;
  const suffix = match ? match[3] : '';
  const counted = useCountUp(num !== null ? num : 0, 800, started);
  const display = num !== null ? `${prefix}${counted}${suffix}` : stat.value;

  return (
    <div
      className={`stat-item${stat.notFirst ? ' not-first' : ''}${stat.notLast ? ' not-last' : ''}`}
    >
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: '32px',
          color: '#F0F0EE',
          letterSpacing: '-0.02em',
          lineHeight: 1,
          marginBottom: '6px',
        }}
      >
        {display}
      </div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          color: '#444440',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        {stat.label}
      </div>
    </div>
  );
}

type HeroProps = {
  onOpenModal: () => void;
};

export function Hero({ onOpenModal }: HeroProps) {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsStarted, setStatsStarted] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const stats: Stat[] = [
    { value: '< 60s', label: 'avg lead response time', notLast: true, notFirst: false },
    { value: '24/7', label: 'systems running', notLast: true, notFirst: true },
    { value: '100%', label: 'done for you', notLast: false, notFirst: true },
  ];

  const heroDiagStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '70%',
    backgroundImage:
      'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'120\'%3E%3Cline x1=\'0\' y1=\'120\' x2=\'120\' y2=\'0\' stroke=\'white\' stroke-width=\'0.8\' stroke-opacity=\'0.08\'/%3E%3C/svg%3E")',
    backgroundRepeat: 'repeat',
    backgroundSize: '120px 120px',
    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)',
    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)',
    pointerEvents: 'none',
    zIndex: 0,
  };

  return (
    <section id="hero" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={heroDiagStyle} aria-hidden="true" />
      <div
        className="section-pad"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '120px 40px 80px',
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div style={{ maxWidth: '780px', width: '100%' }}>
          <div className="fade-up" style={{ animationDelay: '50ms', marginBottom: '28px' }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: '#888884',
                border: '0.5px solid #222',
                borderRadius: '4px',
                padding: '4px 10px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                background: '#111',
              }}
            >
              Western Sydney · Automation & Web Dev
            </span>
          </div>

          <h1
            className="headline-wipe"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(48px, 10vw, 120px)',
              lineHeight: 0.93,
              letterSpacing: '-0.02em',
              color: '#F0F0EE',
              marginBottom: '28px',
            }}
          >
            Built properly.
            <br />
            No agency required.
          </h1>

          <p
            className="fade-up"
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 400,
              fontSize: '17px',
              color: '#888884',
              lineHeight: 1.65,
              maxWidth: '520px',
              marginBottom: '40px',
              animationDelay: '220ms',
            }}
          >
            We build AI automation systems and custom web software for businesses that are done overpaying for slow,
            templated work. You deal directly with the person building it.
          </p>

          <div
            className="fade-up"
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              marginBottom: '64px',
              animationDelay: '340ms',
              flexWrap: 'wrap',
            }}
          >
            <button
              type="button"
              onClick={onOpenModal}
              style={{
                background: '#FFF',
                color: '#090909',
                border: 'none',
                borderRadius: '6px',
                padding: '11px 22px',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 500,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'background 180ms',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#E8E8E6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFF';
              }}
            >
              Get started
            </button>
            <a
              href="#how-it-works"
              style={{
                background: 'transparent',
                color: '#F0F0EE',
                border: '0.5px solid #333',
                borderRadius: '6px',
                padding: '11px 22px',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 500,
                fontSize: '14px',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'background 180ms, border-color 180ms',
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

          <div className="fade-up stats-row" ref={statsRef} style={{ animationDelay: '440ms' }}>
            {stats.map((s, i) => (
              <StatItem key={i} stat={s} started={statsStarted} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
