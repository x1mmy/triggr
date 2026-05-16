'use client';

import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import {
  COPY_READY,
  DOMAIN_STATUS,
  MAX_FILE_BYTES,
  PAGE_OPTIONS,
  PHOTOS_READY,
  WEBSITE_MAIN_JOB,
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
import { OnboardingSubmitOverlay } from '@/components/onboarding/OnboardingSubmitOverlay';
import { useMultipartSubmit } from '@/components/onboarding/useMultipartSubmit';
import { LogoMark } from '@/components/LogoMark';

const TOTAL = 5;

type Props = { greetingName?: string };

export function WebdevOnboardingClient({ greetingName }: Props) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [postSubmitNote, setPostSubmitNote] = useState('');
  const { progress, phase, error, submitting, submitFormData, setError } = useMultipartSubmit();

  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [suburb, setSuburb] = useState('');
  const [displayPhone, setDisplayPhone] = useState('');
  const [displayEmail, setDisplayEmail] = useState('');

  const [mainJob, setMainJob] = useState('');
  const [pagesNeeded, setPagesNeeded] = useState<string[]>([]);
  const [otherPagesFeatures, setOtherPagesFeatures] = useState('');

  const [hasLogo, setHasLogo] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [hasBrandColors, setHasBrandColors] = useState('');
  const [brandColors, setBrandColors] = useState('');
  const [inspirationSites, setInspirationSites] = useState('');

  const [photosReady, setPhotosReady] = useState('');
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [copyReady, setCopyReady] = useState('');
  const [copyText, setCopyText] = useState('');
  const [copyDoc, setCopyDoc] = useState<File | null>(null);
  const [servicesList, setServicesList] = useState('');

  const [hasDomain, setHasDomain] = useState('');
  const [domainName, setDomainName] = useState('');
  const [currentWebsiteUrl, setCurrentWebsiteUrl] = useState('');

  const toggleMulti = useCallback((list: string[], setList: (s: string[]) => void, value: string) => {
    if (list.includes(value)) setList(list.filter((x) => x !== value));
    else setList([...list, value]);
  }, []);

  const onLogoChange = (f: File | null) => {
    setLogoFile(f);
    if (logoPreview) URL.revokeObjectURL(logoPreview);
    setLogoPreview(f && f.type.startsWith('image/') ? URL.createObjectURL(f) : null);
  };

  const onPhotosChange = (files: FileList | null) => {
    if (!files?.length) return;
    photoPreviews.forEach(URL.revokeObjectURL);
    const arr = [...photoFiles, ...Array.from(files)].slice(0, 20);
    setPhotoFiles(arr);
    setPhotoPreviews(
      arr.map((file) => (file.type.startsWith('image/') ? URL.createObjectURL(file) : '')),
    );
  };

  const validateFiles = () => {
    const check = (label: string, f: File) => {
      if (f.size > MAX_FILE_BYTES) throw new Error(`${label} “${f.name}” is over 10MB.`);
    };
    if (hasLogo === 'yes' && logoFile) check('Logo', logoFile);
    photoFiles.forEach((f, i) => check(`Photo ${i + 1}`, f));
    if (copyDoc) check('Copy document', copyDoc);
  };

  const canNext = useMemo(() => {
    if (step === 0) {
      const d = displayPhone.replace(/\D/g, '');
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(displayEmail.trim());
      return (
        fullName.trim() &&
        businessName.trim() &&
        businessType.trim() &&
        suburb.trim() &&
        d.length >= 8 &&
        d.length <= 15 &&
        emailOk
      );
    }
    if (step === 1) return mainJob && pagesNeeded.length > 0;
    if (step === 2) {
      if (!hasLogo || !hasBrandColors) return false;
      if (hasBrandColors === 'yes' && !brandColors.trim()) return false;
      return true;
    }
    if (step === 3) {
      if (!photosReady || !copyReady || !servicesList.trim()) return false;
      return true;
    }
    if (step === 4) {
      if (!hasDomain) return false;
      if (hasDomain === 'yes' && !domainName.trim()) return false;
      return true;
    }
    return true;
  }, [
    step,
    fullName,
    businessName,
    businessType,
    suburb,
    displayPhone,
    displayEmail,
    mainJob,
    pagesNeeded.length,
    hasLogo,
    hasBrandColors,
    brandColors,
    photosReady,
    copyReady,
    servicesList,
    hasDomain,
    domainName,
    displayPhone,
    displayEmail,
  ]);

  const buildFormData = () => {
    const fd = new FormData();
    fd.set('formType', 'webdev');
    fd.set('fullName', fullName.trim());
    fd.set('businessName', businessName.trim());
    fd.set('businessType', businessType.trim());
    fd.set('suburb', suburb.trim());
    fd.set('displayPhone', displayPhone.replace(/\D/g, ''));
    fd.set('displayEmail', displayEmail.trim());
    fd.set('mainJob', mainJob);
    pagesNeeded.forEach((p) => fd.append('pagesNeeded', p));
    fd.set('otherPagesFeatures', otherPagesFeatures);
    fd.set('hasLogo', hasLogo);
    fd.set('hasBrandColors', hasBrandColors);
    fd.set('brandColors', brandColors);
    fd.set('inspirationSites', inspirationSites);
    fd.set('photosReady', photosReady);
    fd.set('copyReady', copyReady);
    fd.set('copyText', copyText);
    fd.set('servicesList', servicesList.trim());
    fd.set('hasDomain', hasDomain);
    fd.set('domainName', domainName);
    fd.set('currentWebsiteUrl', currentWebsiteUrl);
    if (logoFile) fd.append('logo', logoFile);
    photoFiles.forEach((f) => fd.append('photos', f));
    if (copyDoc) fd.append('copyDocument', copyDoc);
    return fd;
  };

  const handleSubmit = async () => {
    try {
      validateFiles();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid files');
      return;
    }
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
    } else {
      const j = res.json as { error?: string } | undefined;
      setError(j?.error ?? 'Something went wrong. Please try again.');
    }
  };

  const chk = (checked: boolean, onChange: () => void, label: string, key: string) => (
    <label key={key} style={onboardingCheckboxRow}>
      <input type="checkbox" checked={checked} onChange={onChange} style={{ marginTop: 2 }} />
      <span>{label}</span>
    </label>
  );

  const primaryEnabled = canNext && !submitting;

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
          Payment received. Let&apos;s get you set up
          {greetingName ? `, ${greetingName}` : ''}.
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
            <input style={onboardingInput} value={fullName} onChange={(e) => setFullName(e.target.value)} autoComplete="name" />
          </div>
          <div style={onboardingFieldGroup}>
            <label style={onboardingLabel}>Business name</label>
            <input style={onboardingInput} value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
          </div>
          <div style={onboardingFieldGroup}>
            <label style={onboardingLabel}>Business type / trade</label>
            <input style={onboardingInput} value={businessType} onChange={(e) => setBusinessType(e.target.value)} placeholder="e.g. electrician" />
          </div>
          <div style={onboardingFieldGroup}>
            <label style={onboardingLabel}>Suburb / service area</label>
            <input style={onboardingInput} value={suburb} onChange={(e) => setSuburb(e.target.value)} />
          </div>
          <div style={onboardingFieldGroup}>
            <label style={onboardingLabel}>Phone number to display on site</label>
            <input style={onboardingInput} type="tel" value={displayPhone} onChange={(e) => setDisplayPhone(e.target.value.replace(/\D/g, ''))} />
          </div>
          <div style={onboardingFieldGroup}>
            <label style={onboardingLabel}>Email to display on site</label>
            <input style={onboardingInput} type="email" value={displayEmail} onChange={(e) => setDisplayEmail(e.target.value)} />
          </div>
        </section>
      )}

      {step === 1 && (
        <section>
          <h1 style={onboardingSectionTitle}>Your website goals</h1>
          <div style={onboardingFieldGroup}>
            <label style={onboardingLabel}>Main job of this website</label>
            <select
              style={{ ...onboardingSelect, color: mainJob ? '#F0F0EE' : onboardingMutedSelect }}
              value={mainJob}
              onChange={(e) => setMainJob(e.target.value)}
            >
              <option value="">Select</option>
              {WEBSITE_MAIN_JOB.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div style={onboardingFieldGroup}>
            <span style={onboardingLabel}>Pages you need</span>
            {PAGE_OPTIONS.map((o) =>
              chk(
                pagesNeeded.includes(o.value),
                () => toggleMulti(pagesNeeded, setPagesNeeded, o.value),
                o.label,
                o.value,
              ),
            )}
          </div>
          <div style={onboardingFieldGroup}>
            <label style={onboardingLabel}>Other pages or features</label>
            <textarea
              style={{ ...onboardingInput, minHeight: '100px', resize: 'vertical' }}
              value={otherPagesFeatures}
              onChange={(e) => setOtherPagesFeatures(e.target.value)}
            />
          </div>
        </section>
      )}

      {step === 2 && (
        <section>
          <h1 style={onboardingSectionTitle}>Branding</h1>
          <div style={onboardingFieldGroup}>
            <span style={onboardingLabel}>Do you have a logo?</span>
            {[
              ['yes', 'Yes'],
              ['no', 'No'],
            ].map(([v, l]) => (
              <label key={v} style={onboardingRadioRow}>
                <input type="radio" name="hasLogo" checked={hasLogo === v} onChange={() => setHasLogo(v)} />
                {l}
              </label>
            ))}
            {hasLogo === 'yes' && (
              <div style={{ marginTop: '12px' }}>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml,image/webp"
                  onChange={(e) => onLogoChange(e.target.files?.[0] ?? null)}
                />
                {logoPreview && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logoPreview} alt="" style={{ maxWidth: '120px', marginTop: '10px', borderRadius: '6px' }} />
                )}
              </div>
            )}
          </div>
          <div style={onboardingFieldGroup}>
            <span style={onboardingLabel}>Brand colours?</span>
            {[
              ['yes', 'Yes'],
              ['no', 'No'],
            ].map(([v, l]) => (
              <label key={v} style={onboardingRadioRow}>
                <input type="radio" name="hasBrandColors" checked={hasBrandColors === v} onChange={() => setHasBrandColors(v)} />
                {l}
              </label>
            ))}
            {hasBrandColors === 'yes' && (
              <input
                style={{ ...onboardingInput, marginTop: '8px' }}
                value={brandColors}
                onChange={(e) => setBrandColors(e.target.value)}
                placeholder="Describe or hex codes"
              />
            )}
          </div>
          <div style={onboardingFieldGroup}>
            <label style={onboardingLabel}>Sites you like the look of</label>
            <textarea
              style={{ ...onboardingInput, minHeight: '88px' }}
              value={inspirationSites}
              onChange={(e) => setInspirationSites(e.target.value)}
              placeholder="Links or vibe — minimal, bold, etc."
            />
            <p style={onboardingHelper}>Links or just describe the vibe — clean and minimal, bold and dark, etc.</p>
          </div>
        </section>
      )}

      {step === 3 && (
        <section>
          <h1 style={onboardingSectionTitle}>Content</h1>
          <div style={onboardingFieldGroup}>
            <span style={onboardingLabel}>Photos ready?</span>
            {PHOTOS_READY.map((o) => (
              <label key={o.value} style={onboardingRadioRow}>
                <input type="radio" name="photosReady" checked={photosReady === o.value} onChange={() => setPhotosReady(o.value)} />
                {o.label}
              </label>
            ))}
            {(photosReady === 'yes' || photosReady === 'some') && (
              <div style={{ marginTop: '12px' }}>
                <input type="file" accept="image/png,image/jpeg,image/webp" multiple onChange={(e) => onPhotosChange(e.target.files)} />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                  {photoPreviews.map(
                    (src, i) =>
                      src && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img key={i} src={src} alt="" style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: '6px' }} />
                      ),
                  )}
                </div>
              </div>
            )}
            {photosReady === 'no' && <p style={onboardingHelper}>No worries. We&apos;ll sort this together.</p>}
          </div>
          <div style={onboardingFieldGroup}>
            <span style={onboardingLabel}>Copy written?</span>
            {COPY_READY.map((o) => (
              <label key={o.value} style={onboardingRadioRow}>
                <input type="radio" name="copyReady" checked={copyReady === o.value} onChange={() => setCopyReady(o.value)} />
                {o.label}
              </label>
            ))}
            {copyReady === 'yes' && (
              <>
                <textarea
                  style={{ ...onboardingInput, minHeight: '88px', marginTop: '10px' }}
                  value={copyText}
                  onChange={(e) => setCopyText(e.target.value)}
                  placeholder="Paste text here, or upload a file below"
                />
                <input
                  type="file"
                  accept=".pdf,.docx,.doc,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                  style={{ marginTop: '10px' }}
                  onChange={(e) => setCopyDoc(e.target.files?.[0] ?? null)}
                />
                {copyDoc && <p style={onboardingHelper}>{copyDoc.name}</p>}
              </>
            )}
          </div>
          <div style={onboardingFieldGroup}>
            <label style={onboardingLabel}>Services to show on the site</label>
            <textarea
              style={{ ...onboardingInput, minHeight: '100px' }}
              value={servicesList}
              onChange={(e) => setServicesList(e.target.value)}
              placeholder="Dot points are fine"
            />
            <p style={onboardingHelper}>Just dot points is fine.</p>
          </div>
        </section>
      )}

      {step === 4 && (
        <section>
          <h1 style={onboardingSectionTitle}>Technical</h1>
          <div style={onboardingFieldGroup}>
            <span style={onboardingLabel}>Domain name?</span>
            {DOMAIN_STATUS.map((o) => (
              <label key={o.value} style={onboardingRadioRow}>
                <input type="radio" name="hasDomain" checked={hasDomain === o.value} onChange={() => setHasDomain(o.value)} />
                {o.label}
              </label>
            ))}
            {hasDomain === 'yes' && (
              <input style={{ ...onboardingInput, marginTop: '8px' }} value={domainName} onChange={(e) => setDomainName(e.target.value)} placeholder="example.com.au" />
            )}
          </div>
          <div style={onboardingFieldGroup}>
            <label style={onboardingLabel}>Current website URL (if any)</label>
            <input
              style={onboardingInput}
              type="url"
              value={currentWebsiteUrl}
              onChange={(e) => setCurrentWebsiteUrl(e.target.value)}
              placeholder="https://"
            />
            <p style={onboardingHelper}>So Zimraan can reference what you have now.</p>
          </div>
        </section>
      )}

      {error && <p style={onboardingErrorText}>{error}</p>}

      <div style={onboardingNavRow}>
        {step > 0 && (
          <button type="button" className="ob-btn" onClick={() => setStep((s) => s - 1)} disabled={submitting} style={{ ...onboardingBtnSecondary, cursor: submitting ? 'wait' : 'pointer' }}>
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
