import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { BUSINESS, SITE_URL } from '@/lib/seo/entity';
import { buildLocalBusinessJsonLd } from '@/lib/seo/schema';
import './globals.css';

const GOOGLE_ADS_TAG_ID = 'AW-18163960237';

const jsonLd = buildLocalBusinessJsonLd();

export const viewport: Viewport = {
  themeColor: '#090909',
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'Triggr | AI Automation & Web Dev for Sydney Tradies',
  description: BUSINESS.description,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/`,
    title: 'Triggr | AI Automation & Web Dev for Sydney Tradies',
    description: BUSINESS.description,
    images: [`${SITE_URL}/og-image.jpg`],
    siteName: BUSINESS.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Triggr | AI Automation & Web Dev for Sydney Tradies',
    description: BUSINESS.description,
    images: [`${SITE_URL}/og-image.jpg`],
  },
  icons: [{ rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_TAG_ID}`} strategy="afterInteractive" />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_TAG_ID}');
          `}
        </Script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@700&family=Figtree:wght@400;500&family=JetBrains+Mono:wght@400&display=swap"
          rel="stylesheet"
        />
        <script id="json-ld-local-business" type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </head>
      <body>{children}</body>
    </html>
  );
}
