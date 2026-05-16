import type { Metadata } from 'next';
import { ContactPage } from '@/marketing-pages/ContactPage';
import { SITE_URL } from '@/lib/seo/entity';

export const metadata: Metadata = {
  title: 'Contact Triggr | Sydney Trade Automation & Web Dev',
  description:
    'Get in touch with Triggr for AI automation and custom web development for your Sydney trade business. Fast response, fixed pricing.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    url: `${SITE_URL}/contact`,
    title: 'Contact Triggr | Sydney Trade Automation & Web Dev',
    description:
      'Get in touch with Triggr for AI automation and custom web development for your Sydney trade business. Fast response, fixed pricing.',
  },
};

export default function Contact() {
  return <ContactPage />;
}
