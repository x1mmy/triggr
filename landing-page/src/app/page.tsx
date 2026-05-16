import { HomePageClient } from './HomePageClient';
import { FaqJsonLd } from '@/lib/seo/FaqJsonLd';

export default function HomePage() {
  return (
    <>
      <FaqJsonLd />
      <HomePageClient />
    </>
  );
}
