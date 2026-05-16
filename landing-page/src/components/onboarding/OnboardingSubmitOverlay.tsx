'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  open: boolean;
  progress: number;
  phase: 'upload' | 'processing';
};

export function OnboardingSubmitOverlay({ open, progress, phase }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || !mounted) return null;

  const label =
    phase === 'processing'
      ? 'Saving your submission…'
      : progress > 0
        ? `Uploading… ${progress}%`
        : 'Preparing upload…';

  const showIndeterminate = phase === 'upload' && progress === 0;
  const fillWidth = Math.min(100, Math.max(progress, phase === 'processing' ? 100 : 0));

  return createPortal(
    <div className="ob-submit-overlay" role="status" aria-live="polite" aria-busy="true" aria-label={label}>
      <div className="ob-submit-panel">
        <div className="ob-submit-spinner" aria-hidden />
        <p className="ob-submit-title">{label}</p>
        <div className="ob-submit-track" aria-hidden>
          <div
            className={showIndeterminate ? 'ob-submit-fill ob-submit-fill--indeterminate' : 'ob-submit-fill'}
            style={showIndeterminate ? undefined : { width: `${fillWidth}%` }}
          />
        </div>
        <p className="ob-submit-hint">Stay on this page until it finishes.</p>
      </div>
    </div>,
    document.body,
  );
}
