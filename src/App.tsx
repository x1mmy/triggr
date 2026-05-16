import { useEffect, useState } from 'react';
import { ContactModal } from './components/ContactModal';
import { CTAStrip } from './components/CTAStrip';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Nav } from './components/Nav';
import { Pricing } from './components/Pricing';
import { Problem } from './components/Problem';
import { SectionBorder } from './components/SectionBorder';
import { Services } from './components/Services';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const parent = el.parentElement;
            const siblings = parent ? [...parent.querySelectorAll<HTMLElement>('.reveal')] : [el];
            const idx = siblings.indexOf(el);
            setTimeout(() => el.classList.add('visible'), idx * 80);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    const divObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            divObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );
    document.querySelectorAll('.divider-line').forEach((el) => divObs.observe(el));

    return () => {
      observer.disconnect();
      divObs.disconnect();
    };
  }, []);

  return (
    <>
      <div className="light-beam" aria-hidden="true" />
      <div className="light-beam light-beam-2" aria-hidden="true" />

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
        <CTAStrip onOpenModal={openModal} />
      </main>
      <Footer />
    </>
  );
}
