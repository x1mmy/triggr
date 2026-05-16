import type { Metadata } from 'next';
import { PrivacyPage } from '@/marketing-pages/PrivacyPage';
import { SITE_URL } from '@/lib/seo/entity';

export const metadata: Metadata = {
  title: 'Privacy Policy | Triggr',
  description: 'Privacy policy for Triggr — AI automation and web development services for Sydney trade businesses.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    url: `${SITE_URL}/privacy`,
    title: 'Privacy Policy | Triggr',
    description: 'Privacy policy for Triggr — AI automation and web development services for Sydney trade businesses.',
  },
};

export default function Privacy() {
  return <PrivacyPage />;
}
