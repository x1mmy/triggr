import type { Metadata } from 'next';
import { TermsPage } from '@/marketing-pages/TermsPage';
import { SITE_URL } from '@/lib/seo/entity';

export const metadata: Metadata = {
  title: 'Terms of Service | Triggr',
  description: 'Terms of service for Triggr — web development and automation services for Sydney trade businesses.',
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    url: `${SITE_URL}/terms`,
    title: 'Terms of Service | Triggr',
    description: 'Terms of service for Triggr — web development and automation services for Sydney trade businesses.',
  },
};

export default function Terms() {
  return <TermsPage />;
}
