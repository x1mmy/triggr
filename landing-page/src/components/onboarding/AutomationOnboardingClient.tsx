'use client';

import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import {
  ENQUIRIES_PER_WEEK,
  LEAD_SOURCE_OPTIONS,
  RESPONSE_TIME,
} from '@/lib/onboarding/constants';
import {
  onboardingBackLink,
  onboardingBtnPrimary,
  onboardingBtnPrimaryMuted,
  onboardingBtnSecondary,
  onboardingCheckboxRow,
  onboardingDoneTitle,
  onboardingErrorText,
  onboardingFieldGroup,
  onboardingHeaderBlock,
  onboardingHelper,
  onboardingInput,
  onboardingIntro,
  onboardingLabel,
  onboardingLogoLink,
  onboardingMutedSelect,
  onboardingNavRow,
  onboardingProgressFill,
  onboardingProgressTrack,
  onboardingRadioRow,
  onboardingSectionTitle,
  onboardingSelect,
  onboardingShellDone,
  onboardingShellForm,
  onboardingStepMeta,
} from '@/components/onboarding/onboarding-styles';
import { OnboardingPaymentConfirmed } from '@/components/onboarding/OnboardingPaymentConfirmed';
import { OnboardingSubmitOverlay } from '@/components/onboarding/OnboardingSubmitOverlay';
import { useMultipartSubmit } from '@/components/onboarding/useMultipartSubmit';
import { useOnboardingStarted } from '@/components/onboarding/useOnboardingStarted';
import { LogoMark } from '@/components/LogoMark';

const TOTAL = 4;

type Props = { greetingName?: string };

export function AutomationOnboardingClient({ greetingName }: Props) {
  const { started, beginOnboarding, ready } = useOnboardingStarted('automation');
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [postSubmitNote, setPostSubmitNote] = useState('');
  const { progress, phase, error, submitting, submitFormData, setError } = useMultipartSubmit();

  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [suburb, setSuburb] = useState('');

  const [leadSources, setLeadSources] = useState<string[]>([]);
  const [enquiriesPerWeek, setEnquiriesPerWeek] = useState('');
  const [responseTime, setResponseTime] = useState('');

  const [smsPhone, setSmsPhone] = useState('');
  const [hasWebsite, setHasWebsite] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [hasGbp, setHasGbp] = useState('');
  const [usesCrm, setUsesCrm] = useState('');
  const [crmName, setCrmName] = useState('');

  const [firstMessage, setFirstMessage] = useState('');

  const toggleMulti = useCallback((list: string[], setList: (s: string[]) => void, value: string) => {
    if (list.includes(value)) setList(list.filter((x) => x !== value));
    else setList([...list, value]);
  }, []);

  const chk = (checked: boolean, onChange: () => void, label: string, key: string) => (
    <label key={key} style={onboardingCheckboxRow}>
      <input type="checkbox" checked={checked} onChange={onChange} style={{ marginTop: 2 }} />
      <span>{label}</span>
    </label>
  );

  const canNext = useMemo(() => {
    if (step === 0) return fullName.trim() && businessName.trim() && businessType.trim() && suburb.trim();
    if (step === 1) return leadSources.length > 0 && enquiriesPerWeek && responseTime;
    if (step === 2) {
      const d = smsPhone.replace(/\D/g, '');
      if (d.length < 8) return false;
      if (!hasWebsite || !hasGbp || !usesCrm) return false;
      if (hasWebsite === 'yes' && !websiteUrl.trim()) return false;
      if (usesCrm === 'yes' && !crmName.trim()) return false;
      return true;
    }
    return true;
  }, [step, fullName, businessName, businessType, suburb, leadSources.length, enquiriesPerWeek, responseTime, smsPhone, hasWebsite, websiteUrl, hasGbp, usesCrm, crmName]);

  const buildFormData = () => {
    const fd = new FormData();
    fd.set('formType', 'automation');
    fd.set('fullName', fullName.trim());
    fd.set('businessName', businessName.trim());
    fd.set('businessType', businessType.trim());
    fd.set('suburb', suburb.trim());
    leadSources.forEach((p) => fd.append('leadSources', p));
    fd.set('enquiriesPerWeek', enquiriesPerWeek);
    fd.set('responseTime', responseTime);
    fd.set('smsPhone', smsPhone.replace(/\D/g, ''));
    fd.set('hasWebsite', hasWebsite);
    fd.set('websiteUrl', websiteUrl.trim());
    fd.set('hasGbp', hasGbp);
    fd.set('usesCrm', usesCrm);
    fd.set('crmName', crmName);
    fd.set('firstMessage', firstMessage);
    return fd;
  };

  const handleSubmit = async () => {
    const fd = buildFormData();
    const res = await submitFormData(fd);
    if (res.ok) {
      const j = res.json as { linearError?: string } | undefined;
      setPostSubmitNote(
        j?.linearError
          ? `Your responses were saved to Notion. A Linear ticket was not created: ${j.linearError}`
          : '',
      );
      setDone(true);
    } else setError((res.json as { error?: string })?.error ?? 'Something went wrong.');
  };

  const primaryEnabled = canNext && !submitting;

  if (!ready) {
    return <div className="onboarding-root" style={{ minHeight: '100dvh' }} aria-busy="true" />;
  }

  if (!started) {
    return <OnboardingPaymentConfirmed greetingName={greetingName} onStart={beginOnboarding} />;
  }

  if (done) {
    return (
      <div className="onboarding-root" style={onboardingShellDone}>
        <div style={onboardingDoneTitle}>You&apos;re all set.</div>
        <p style={{ ...onboardingHelper, color: '#888884', fontSize: 15, marginTop: 16 }}>Zimraan will be in touch within 24 hours.</p>
        {postSubmitNote ? (
          <p
            style={{
              ...onboardingHelper,
              color: '#c9a227',
              fontSize: 14,
              marginTop: 20,
              textAlign: 'left',
              maxWidth: 420,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {postSubmitNote}
          </p>
        ) : null}
        <Link href="/" style={onboardingBackLink}>
          ← Back to site
        </Link>
      </div>
    );
  }

  return (
    <div className="onboarding-root" style={onboardingShellForm}>
      <OnboardingSubmitOverlay open={submitting} progress={progress} phase={phase} />
      <header style={onboardingHeaderBlock}>
        <Link href="/" style={onboardingLogoLink}>
          <LogoMark size={22} color="#F0F0EE" />
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: '#F0F0EE', letterSpacing: '0.12em' }}>TRIGGR</span>
        </Link>
        <p style={onboardingIntro}>
          A few quick questions
          {greetingName ? `, ${greetingName}` : ''} to wire up your automations.
        </p>
        <div style={onboardingProgressTrack}>
          <div style={{ ...onboardingProgressFill, width: `${((step + 1) / TOTAL) * 100}%` }} />
        </div>
        <div style={onboardingStepMeta}>
          Step {step + 1} of {TOTAL}
        </div>
      </header>

      {step === 0 && (
        <section>
          <h1 style={onboardingSectionTitle}>About you</h1>
          <div style={onboardingFieldGroup}>
            <label style={onboardingLabel}>Full name</label>
            <input style={onboardingInput} value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div style={onboardingFieldGroup}>
            <label style={onboardingLabel}>Business name</label>
            <input style={onboardingInput} value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
          </div>
          <div style={onboardingFieldGroup}>
            <label style={onboardingLabel}>Business type / trade</label>
            <input style={onboardingInput} value={businessType} onChange={(e) => setBusinessType(e.target.value)} />
          </div>
          <div style={onboardingFieldGroup}>
            <label style={onboardingLabel}>Suburb</label>
            <input style={onboardingInput} value={suburb} onChange={(e) => setSuburb(e.target.value)} />
          </div>
        </section>
      )}

      {step === 1 && (
        <section>
          <h1 style={onboardingSectionTitle}>Your leads</h1>
          <div style={onboardingFieldGroup}>
            <span style={onboardingLabel}>How do new enquiries come in?</span>
            {LEAD_SOURCE_OPTIONS.map((o) =>
              chk(
                leadSources.includes(o.value),
                () => toggleMulti(leadSources, setLeadSources, o.value),
                o.label,
                o.value,
              ),
            )}
          </div>
          <div style={onboardingFieldGroup}>
            <label style={onboardingLabel}>Enquiries per week</label>
            <select
              style={{ ...onboardingSelect, color: enquiriesPerWeek ? '#F0F0EE' : onboardingMutedSelect }}
              value={enquiriesPerWeek}
              onChange={(e) => setEnquiriesPerWeek(e.target.value)}
            >
              <option value="">Select</option>
              {ENQUIRIES_PER_WEEK.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div style={onboardingFieldGroup}>
            <label style={onboardingLabel}>How long to respond?</label>
            <select
              style={{ ...onboardingSelect, color: responseTime ? '#F0F0EE' : onboardingMutedSelect }}
              value={responseTime}
              onChange={(e) => setResponseTime(e.target.value)}
            >
              <option value="">Select</option>
              {RESPONSE_TIME.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </section>
      )}

      {step === 2 && (
        <section>
          <h1 style={onboardingSectionTitle}>Setup details</h1>
          <div style={onboardingFieldGroup}>
            <label style={onboardingLabel}>Phone for SMS lead alerts</label>
            <input style={onboardingInput} type="tel" value={smsPhone} onChange={(e) => setSmsPhone(e.target.value.replace(/\D/g, ''))} />
            <p style={onboardingHelper}>This is the number that gets a text the moment a new lead comes in.</p>
          </div>
          <div style={onboardingFieldGroup}>
            <span style={onboardingLabel}>Do you have a website?</span>
            {['yes', 'no'].map((v) => (
              <label key={v} style={onboardingRadioRow}>
                <input type="radio" name="hasWebsite" checked={hasWebsite === v} onChange={() => setHasWebsite(v)} />
                {v === 'yes' ? 'Yes' : 'No'}
              </label>
            ))}
            {hasWebsite === 'yes' && (
              <input style={{ ...onboardingInput, marginTop: 8 }} type="url" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} placeholder="https://" />
            )}
          </div>
          <div style={onboardingFieldGroup}>
            <span style={onboardingLabel}>Google Business Profile?</span>
            {['yes', 'no'].map((v) => (
              <label key={v} style={onboardingRadioRow}>
                <input type="radio" name="hasGbp" checked={hasGbp === v} onChange={() => setHasGbp(v)} />
                {v === 'yes' ? 'Yes' : 'No'}
              </label>
            ))}
          </div>
          <div style={onboardingFieldGroup}>
            <span style={onboardingLabel}>CRM or lead tracking?</span>
            {['yes', 'no'].map((v) => (
              <label key={v} style={onboardingRadioRow}>
                <input type="radio" name="usesCrm" checked={usesCrm === v} onChange={() => setUsesCrm(v)} />
                {v === 'yes' ? 'Yes' : 'No'}
              </label>
            ))}
            {usesCrm === 'yes' && (
              <input style={{ ...onboardingInput, marginTop: 8 }} value={crmName} onChange={(e) => setCrmName(e.target.value)} />
            )}
          </div>
        </section>
      )}

      {step === 3 && (
        <section>
          <h1 style={onboardingSectionTitle}>First message</h1>
          <div style={onboardingFieldGroup}>
            <label style={onboardingLabel}>Anything specific for the first automated message?</label>
            <textarea style={{ ...onboardingInput, minHeight: 120 }} value={firstMessage} onChange={(e) => setFirstMessage(e.target.value)} />
            <p style={onboardingHelper}>Optional. If left blank, Zimraan will write something for your trade.</p>
          </div>
        </section>
      )}

      {error && <p style={onboardingErrorText}>{error}</p>}

      <div style={onboardingNavRow}>
        {step > 0 && (
          <button type="button" className="ob-btn" disabled={submitting} onClick={() => setStep((s) => s - 1)} style={{ ...onboardingBtnSecondary, cursor: submitting ? 'wait' : 'pointer' }}>
            Back
          </button>
        )}
        {step < TOTAL - 1 ? (
          <button type="button" className="ob-btn" disabled={!primaryEnabled} onClick={() => setStep((s) => s + 1)} style={{ ...onboardingBtnPrimary, ...(primaryEnabled ? {} : onboardingBtnPrimaryMuted) }}>
            Continue
          </button>
        ) : (
          <button type="button" className="ob-btn" disabled={!primaryEnabled} onClick={handleSubmit} style={{ ...onboardingBtnPrimary, ...(primaryEnabled ? {} : onboardingBtnPrimaryMuted) }}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
