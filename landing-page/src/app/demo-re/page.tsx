import type { Metadata } from 'next';
import { DemoRePage } from '@/marketing-pages/DemoRePage';
import { SITE_URL } from '@/lib/seo/entity';

export const metadata: Metadata = {
  title: 'Buyer Demo | Triggr',
  description:
    'Try the automated buyer response demo — enter your details and get the same SMS a buyer would receive on a listing enquiry.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: '/demo-re',
  },
  openGraph: {
    url: `${SITE_URL}/demo-re`,
    title: 'Buyer Demo | Triggr',
    description:
      'Try the automated buyer response demo — enter your details and get the same SMS a buyer would receive on a listing enquiry.',
  },
};

export default function DemoRe() {
  return <DemoRePage />;
}
