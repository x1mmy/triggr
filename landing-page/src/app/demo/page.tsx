import type { Metadata } from 'next';
import { DemoPage } from '@/marketing-pages/DemoPage';
import { SITE_URL } from '@/lib/seo/entity';

export const metadata: Metadata = {
  title: 'Lead Alert Demo | Triggr Sydney',
  description:
    'Try Triggr’s SMS lead alert demo — see how Sydney trade businesses get instant notifications when a new enquiry comes in.',
  alternates: {
    canonical: '/demo',
  },
  openGraph: {
    url: `${SITE_URL}/demo`,
    title: 'Lead Alert Demo | Triggr Sydney',
    description:
      'Try Triggr’s SMS lead alert demo — see how Sydney trade businesses get instant notifications when a new enquiry comes in.',
  },
};

export default function Demo() {
  return <DemoPage />;
}
