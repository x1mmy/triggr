import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#090909',
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'Triggr | AI Automation & Web Dev for Sydney Tradies',
  description:
    'Done-for-you AI automation and custom web development for Sydney trade businesses. Stop losing jobs to slow response times. Fast setup, zero templates.',
  metadataBase: new URL('https://usetriggr.com.au'),
  openGraph: {
    type: 'website',
    url: 'https://usetriggr.com.au/',
    title: 'Triggr | AI Automation & Web Dev for Sydney Tradies',
    description:
      'Done-for-you AI automation and custom web development for Sydney trade businesses. Stop losing jobs to slow response times. Fast setup, zero templates.',
    images: ['https://usetriggr.com.au/og-image.jpg'],
    siteName: 'Triggr',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Triggr | AI Automation & Web Dev for Sydney Tradies',
    description:
      'Done-for-you AI automation and custom web development for Sydney trade businesses. Stop losing jobs to slow response times. Fast setup, zero templates.',
    images: ['https://usetriggr.com.au/og-image.jpg'],
  },
  icons: [{ rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' }],
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Triggr',
  url: 'https://usetriggr.com.au',
  description: 'Done-for-you AI automation and custom web development for Sydney trade businesses',
  areaServed: 'Sydney',
  serviceType: ['Web Development', 'Automation', 'AI Automation'],
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'NSW',
    addressCountry: 'AU',
  },
  sameAs: ['https://au.linkedin.com/company/triggrai'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://usetriggr.com.au" />
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
