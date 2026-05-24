import { ContactForm } from '@/components/ContactForm';
import { MarketingPageHeader } from '@/components/MarketingPageHeader';
import { MarketingScrollShell } from '@/components/MarketingScrollShell';

export function ContactPage() {
  return (
    <MarketingScrollShell>
      <div className="marketing-page">
        <MarketingPageHeader />

        <main className="marketing-main">
          <div className="marketing-main__inner">
            <div className="marketing-hero" data-reveal-group="contact-hero">
              <h1 className="marketing-hero__title reveal">Get in touch</h1>
              <p className="marketing-hero__lead reveal reveal--subtle">
                Tell us about your business and we&apos;ll map out the fastest way to stop missed leads.
              </p>
            </div>

            <div className="marketing-card reveal reveal--scale card-lift" style={{ maxWidth: '480px' }}>
              <ContactForm source="contact page" />
            </div>
          </div>
        </main>
      </div>
    </MarketingScrollShell>
  );
}
