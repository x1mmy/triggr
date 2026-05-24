'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LogoMark } from './LogoMark';

type NavProps = {
  onOpenModal: () => void;
};

export function Nav({ onOpenModal }: NavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 10));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const links = [
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Services', href: '/#services' },
    { label: 'Pricing', href: '/#pricing' },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        borderBottom: scrolled ? '0.5px solid #222' : '0.5px solid transparent',
        background: scrolled ? 'rgba(9,9,9,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition:
          'background 320ms cubic-bezier(0.23, 1, 0.32, 1), border-color 320ms cubic-bezier(0.23, 1, 0.32, 1), backdrop-filter 320ms cubic-bezier(0.23, 1, 0.32, 1)',
      }}
    >
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '9px', textDecoration: 'none' }}>
        <LogoMark size={22} color="#F0F0EE" />
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: '15px',
            color: '#F0F0EE',
            letterSpacing: '0.12em',
          }}
        >
          TRIGGR
        </span>
      </Link>

      <div className="nav-links-desktop" style={{ gap: '28px', alignItems: 'center' }}>
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
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
            {l.label}
          </a>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <a
          href="/#pricing"
          className="nav-links-desktop"
          style={{
            background: 'transparent',
            color: '#F0F0EE',
            border: '0.5px solid #333',
            borderRadius: '6px',
            padding: '7px 14px',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 500,
            fontSize: '12px',
            textDecoration: 'none',
            transition: 'background 180ms, border-color 180ms',
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
          Pricing
        </a>
        <button
          type="button"
          className="btn-primary"
          onClick={onOpenModal}
          style={{
            background: '#FFF',
            color: '#090909',
            border: 'none',
            borderRadius: '6px',
            padding: '7px 14px',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 500,
            fontSize: '12px',
            cursor: 'pointer',
            display: 'inline-block',
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
      </div>
    </nav>
  );
}
