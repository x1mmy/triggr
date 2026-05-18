'use client';

import Link from 'next/link';
import {
  onboardingBtnPrimary,
  onboardingDoneTitle,
  onboardingHelper,
  onboardingIntro,
  onboardingLogoLink,
  onboardingShellDone,
} from '@/components/onboarding/onboarding-styles';
import { LogoMark } from '@/components/LogoMark';

type Props = {
  greetingName?: string;
  onStart: () => void;
};

export function OnboardingPaymentConfirmed({ greetingName, onStart }: Props) {
  return (
    <div className="onboarding-root ob-payment-confirmed" style={onboardingShellDone}>
      <Link href="/" style={{ ...onboardingLogoLink, marginBottom: 0 }}>
        <LogoMark size={22} color="#F0F0EE" />
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: 14,
            color: '#F0F0EE',
            letterSpacing: '0.12em',
          }}
        >
          TRIGGR
        </span>
      </Link>

      <div className="ob-payment-confirmed__hero" aria-hidden>
        <div className="ob-payment-confirmed__glow" />
        <div className="ob-payment-confirmed__ring" />
        <svg
          className="ob-payment-confirmed__check"
          viewBox="0 0 56 56"
          width={88}
          height={88}
          aria-hidden
        >
          <circle className="ob-payment-confirmed__check-circle" cx="28" cy="28" r="26" />
          <path className="ob-payment-confirmed__check-path" d="M17 28.5 24.5 36 39 20.5" />
        </svg>
      </div>

      <div className="ob-payment-confirmed__copy">
        <h1 style={{ ...onboardingDoneTitle, marginTop: 28 }}>Payment confirmed</h1>
        <p style={{ ...onboardingIntro, marginTop: 14, maxWidth: 360, marginLeft: 'auto', marginRight: 'auto' }}>
          {greetingName ? (
            <>
              Thanks, <span style={{ color: '#C8C8C4' }}>{greetingName}</span>. Your spot is secured.
            </>
          ) : (
            <>Your spot is secured. We&apos;re ready when you are.</>
          )}
        </p>
        <p style={{ ...onboardingHelper, marginTop: 10, fontSize: 13 }}>
          This takes about 5 minutes. You can save and come back anytime.
        </p>
      </div>

      <div className="ob-payment-confirmed__cta">
        <button
          type="button"
          className="ob-btn"
          style={{ ...onboardingBtnPrimary, width: '100%', maxWidth: 340, flex: 'unset' }}
          onClick={onStart}
        >
          Let&apos;s start your onboarding
        </button>
      </div>
    </div>
  );
}
