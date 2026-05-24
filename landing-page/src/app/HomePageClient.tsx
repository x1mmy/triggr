'use client';

import { useState } from 'react';
import { ContactModal } from '@/components/ContactModal';
import { CTAStrip } from '@/components/CTAStrip';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { Nav } from '@/components/Nav';
import { Pricing } from '@/components/Pricing';
import { Problem } from '@/components/Problem';
import { MarketingScrollShell } from '@/components/MarketingScrollShell';
import { SectionBorder } from '@/components/SectionBorder';
import { Services } from '@/components/Services';

export function HomePageClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <MarketingScrollShell>

      {modalOpen && <ContactModal onClose={closeModal} />}
      <Nav onOpenModal={openModal} />
      <main>
        <Hero onOpenModal={openModal} />
        <SectionBorder />
        <Problem />
        <SectionBorder />
        <HowItWorks />
        <SectionBorder />
        <Services />
        <SectionBorder />
        <Pricing onOpenModal={openModal} />
        <SectionBorder />
        <FAQ />
        <CTAStrip onOpenModal={openModal} />
      </main>
      <Footer />
    </MarketingScrollShell>
  );
}
