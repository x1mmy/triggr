import type { CSSProperties } from 'react';

/** CTA surface; avoid pure #fff per Triggr tokens */
export const onboardingCtaBg = '#E8E8E4';
export const onboardingCtaText = '#0C0C0C';
/** Empty select placeholder tone */
export const onboardingMutedSelect = '#666662';

export const onboardingShellForm: CSSProperties = {
  boxSizing: 'border-box',
  width: '100%',
  maxWidth: 560,
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingTop: 'max(3rem, env(safe-area-inset-top, 0px))',
};

export const onboardingShellDone: CSSProperties = {
  ...onboardingShellForm,
  maxWidth: 520,
  paddingTop: 'max(4rem, env(safe-area-inset-top, 0px))',
  textAlign: 'center',
};

export const onboardingFieldGroup: CSSProperties = {
  marginBottom: 22,
};

export const onboardingInput: CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  backgroundColor: '#121212',
  border: '1px solid #3A3A38',
  borderRadius: 8,
  color: '#F0F0EE',
  fontFamily: "'Figtree', sans-serif",
  fontSize: 16,
  lineHeight: 1.4,
  minHeight: 48,
  padding: '13px 16px',
  outline: 'none',
  display: 'block',
  WebkitAppearance: 'none',
  appearance: 'none',
  caretColor: '#F0F0EE',
};

/** Room on the right for the custom chevron in globals.css (`.onboarding-root select`). */
export const onboardingSelect: CSSProperties = {
  ...onboardingInput,
  padding: '13px 44px 13px 16px',
};

export const onboardingLabel: CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 11,
  color: '#888884',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: 10,
  display: 'block',
};

export const onboardingHelper: CSSProperties = {
  fontFamily: "'Figtree', sans-serif",
  fontSize: 12,
  color: '#666662',
  marginTop: 8,
  lineHeight: 1.5,
};

export const onboardingSectionTitle: CSSProperties = {
  fontFamily: "'Syne', sans-serif",
  fontWeight: 700,
  fontSize: 'clamp(1.375rem, 3.2vw, 1.5rem)',
  color: '#F0F0EE',
  letterSpacing: '-0.02em',
  lineHeight: 1.15,
  marginBottom: 24,
};

export const onboardingDoneTitle: CSSProperties = {
  fontFamily: "'Syne', sans-serif",
  fontWeight: 700,
  fontSize: 'clamp(1.5rem, 4vw, 1.65rem)',
  color: '#F0F0EE',
  letterSpacing: '-0.02em',
  lineHeight: 1.15,
  marginBottom: 0,
};

export const onboardingCheckboxRow: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 12,
  cursor: 'pointer',
  marginBottom: 10,
  fontFamily: "'Figtree', sans-serif",
  fontSize: 15,
  lineHeight: 1.45,
  color: '#C8C8C4',
};

export const onboardingRadioRow: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  minHeight: 48,
  cursor: 'pointer',
  marginBottom: 4,
  fontFamily: "'Figtree', sans-serif",
  fontSize: 15,
  color: '#C8C8C4',
};

export const onboardingLogoLink: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  textDecoration: 'none',
  marginBottom: 12,
  padding: '8px 4px',
  minHeight: 44,
};

export const onboardingIntro: CSSProperties = {
  fontFamily: "'Figtree', sans-serif",
  fontSize: 15,
  lineHeight: 1.55,
  color: '#888884',
};

export const onboardingHeaderBlock: CSSProperties = {
  marginBottom: 28,
};

export const onboardingProgressTrack: CSSProperties = {
  marginTop: 16,
  height: 5,
  background: '#222',
  borderRadius: 3,
  overflow: 'hidden',
};

export const onboardingProgressFill: CSSProperties = {
  height: '100%',
  background: '#F0F0EE',
  transition: 'width 220ms cubic-bezier(0.16, 1, 0.3, 1)',
};

export const onboardingStepMeta: CSSProperties = {
  ...onboardingHelper,
  marginTop: 8,
};

export const onboardingNavRow: CSSProperties = {
  display: 'flex',
  gap: 12,
  marginTop: 32,
  flexWrap: 'wrap',
};

export const onboardingBtnSecondary: CSSProperties = {
  flex: 1,
  minWidth: 120,
  minHeight: 48,
  padding: '14px 18px',
  borderRadius: 8,
  border: '1px solid #3A3A38',
  background: 'transparent',
  color: '#F0F0EE',
  fontFamily: "'Figtree', sans-serif",
  fontSize: 16,
  fontWeight: 500,
  cursor: 'pointer',
};

export const onboardingBtnPrimary: CSSProperties = {
  flex: 2,
  minWidth: 160,
  minHeight: 48,
  padding: '14px 18px',
  borderRadius: 8,
  border: 'none',
  background: onboardingCtaBg,
  color: onboardingCtaText,
  fontFamily: "'Figtree', sans-serif",
  fontSize: 16,
  fontWeight: 600,
  cursor: 'pointer',
};

export const onboardingBtnPrimaryMuted: CSSProperties = {
  background: '#3A3A38',
  color: '#888884',
  cursor: 'not-allowed',
};

export const onboardingSubmitTrack: CSSProperties = {
  height: 6,
  background: '#222',
  borderRadius: 3,
  overflow: 'hidden',
};

export const onboardingSubmitFill: CSSProperties = {
  height: '100%',
  background: '#F0F0EE',
  transition: 'width 80ms linear',
};

export const onboardingBackLink: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 44,
  marginTop: 28,
  padding: '0 10px',
  color: '#888884',
  fontFamily: "'Figtree', sans-serif",
  fontSize: 15,
};

export const onboardingErrorText: CSSProperties = {
  color: '#d59494',
  fontFamily: "'Figtree', sans-serif",
  fontSize: 14,
  marginTop: 16,
};
