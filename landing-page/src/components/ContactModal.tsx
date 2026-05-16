'use client';

import { useEffect } from 'react';
import { ContactForm } from './ContactForm';

type ContactModalProps = {
  onClose: () => void;
};

export function ContactModal({ onClose }: ContactModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <>
      <div className="modal-overlay" onClick={onClose} aria-hidden="true" />

      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '16px',
            right: '20px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#444440',
            fontSize: '20px',
            lineHeight: 1,
            padding: '4px',
            transition: 'color 150ms',
            fontFamily: 'sans-serif',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#F0F0EE';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#444440';
          }}
        >
          ✕
        </button>

        <ContactForm source="landing page" />
      </div>
    </>
  );
}
