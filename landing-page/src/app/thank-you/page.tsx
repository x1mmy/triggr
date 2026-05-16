import type { Metadata } from 'next';
import { ThankYouPage } from '@/marketing-pages/ThankYouPage';

export const metadata: Metadata = {
  title: 'Thank you | Triggr',
  description: 'Your enquiry has been received.',
  alternates: {
    canonical: '/thank-you',
  },
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  return <ThankYouPage />;
}
