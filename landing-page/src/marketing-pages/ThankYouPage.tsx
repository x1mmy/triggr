'use client';

import Link from 'next/link';
import Script from 'next/script';
import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LogoMark } from '@/components/LogoMark';
import { GOOGLE_ADS_LEAD_CONVERSION } from '@/lib/google-ads';

function ThankYouContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (searchParams.get('submitted') !== '1') {
      router.replace('/contact');
      return;
    }
    setReady(true);
  }, [searchParams, router]);

  if (!ready) {
    return <div style={{ minHeight: '100vh', background: '#090909' }} aria-busy="true" aria-label="Loading" />;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#090909', color: '#F0F0EE' }}>
      <Script id="google-ads-lead-conversion" strategy="afterInteractive">
        {`gtag('event', 'conversion', {'send_to': '${GOOGLE_ADS_LEAD_CONVERSION}'});`}
      </Script>
      <header
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '24px 24px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <Link href="/" aria-label="Triggr home" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <LogoMark size={22} color="#F0F0EE" />
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: '14px',
              color: '#F0F0EE',
              letterSpacing: '0.12em',
            }}
          >
            TRIGGR
          </span>
        </Link>
      </header>

      <main style={{ padding: '80px 24px 64px' }}>
        <div
          style={{
            maxWidth: '520px',
            margin: '0 auto',
            textAlign: 'center',
            background: '#111111',
            border: '0.5px solid #2A2A2A',
            borderRadius: '6px',
            padding: '48px 32px',
          }}
        >
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(28px, 4vw, 36px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: '#F0F0EE',
              marginBottom: '16px',
            }}
          >
            Thanks for your enquiry
          </h1>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '15px',
              color: '#888884',
              lineHeight: 1.7,
              marginBottom: '32px',
            }}
          >
            We&apos;ve received your message and typically respond within one business day.
          </p>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '44px',
              padding: '0 20px',
              borderRadius: '6px',
              background: '#FFF',
              color: '#090909',
              fontFamily: "'Figtree', sans-serif",
              fontSize: '14px',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}

export function ThankYouPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#090909' }} aria-busy="true" aria-label="Loading" />}>
      <ThankYouContent />
    </Suspense>
  );
}
