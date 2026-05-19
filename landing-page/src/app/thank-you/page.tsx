import type { Metadata } from 'next';
import { ThankYouPage } from '@/marketing-pages/ThankYouPage';
import { SITE_URL } from '@/lib/seo/entity';

export const metadata: Metadata = {
  title: 'Thank you | Triggr',
  description: 'Your enquiry has been received. We typically respond within one business day.',
  alternates: {
    canonical: '/thank-you',
  },
  robots: { index: false, follow: false },
  openGraph: {
    url: `${SITE_URL}/thank-you`,
    title: 'Thank you | Triggr',
    description: 'Your enquiry has been received. We typically respond within one business day.',
  },
};

export default function ThankYou() {
  return <ThankYouPage />;
}
