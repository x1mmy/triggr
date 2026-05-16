import type { Metadata } from 'next';
import { AboutPage } from '@/marketing-pages/AboutPage';
import { SITE_URL } from '@/lib/seo/entity';

export const metadata: Metadata = {
  title: 'About Triggr | Sydney Automation & Web Dev for Tradies',
  description:
    'Meet Zimraan Anjum — the Sydney developer behind Triggr. Custom automation and web builds for trade businesses, no agencies or templates.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    url: `${SITE_URL}/about`,
    title: 'About Triggr | Sydney Automation & Web Dev for Tradies',
    description:
      'Meet Zimraan Anjum — the Sydney developer behind Triggr. Custom automation and web builds for trade businesses, no agencies or templates.',
  },
};

export default function About() {
  return <AboutPage />;
}
