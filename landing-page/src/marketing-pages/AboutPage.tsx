import { MarketingScrollShell } from '@/components/MarketingScrollShell';
import { LogoMark } from '@/components/LogoMark';
import '../terms.css';

export function AboutPage() {
  return (
    <MarketingScrollShell>
      <div className="terms-page">
        <header className="terms-header reveal reveal--subtle">
          <a href="/" className="terms-logo" aria-label="Triggr home">
            <LogoMark size={22} color="#F0F0EE" />
            <span className="terms-logo-wordmark">TRIGGR</span>
          </a>
          <a href="/" className="terms-back-link">
            ← Back to site
          </a>
        </header>

        <div className="terms-content">
          <div className="terms-hero" data-reveal-group="about-hero">
            <div className="terms-label reveal">About</div>
            <h1 className="reveal">About Triggr</h1>
            <p className="reveal reveal--subtle" style={{ maxWidth: '620px' }}>
              Built by someone who actually builds things.
            </p>
          </div>

          <div data-reveal-group="about-sections">
            <div className="terms-section reveal reveal--subtle">
              <div className="terms-section-header">
                <span className="terms-section-num">01</span>
                <h2>Built by someone who actually builds things.</h2>
              </div>
              <p>
                Hey, I&apos;m Zimraan — a full-stack developer and automation specialist based in Sydney.
              </p>
              <p>
                I started Triggr after noticing the same problem across nearly every trade business I came across: good
                operators were losing jobs not because they were bad at their work, but because they were slow to respond.
                They were on the tools, on a roof, under a car — and by the time they got back to an enquiry, the customer
                had already called someone else.
              </p>
              <p>That&apos;s not a marketing problem. That&apos;s a systems problem. And it&apos;s fixable.</p>
            </div>

            <div className="terms-section reveal reveal--subtle">
              <div className="terms-section-header">
                <span className="terms-section-num">02</span>
                <h2>What I do</h2>
              </div>
              <p>
                I build two things for trade businesses: websites that actually convert, and automation systems that make
                sure no enquiry ever slips through the cracks.
              </p>
              <p>
                Whether you need a clean, professional site that makes customers trust you before they even call — or a
                backend system that captures leads, sends instant alerts, and follows up automatically while you&apos;re on the
                job — I build it from scratch, custom-fitted to how your business works.
              </p>
              <p>No templates. No agencies. Just clean work that does its job.</p>
            </div>

            <div className="terms-section reveal reveal--subtle">
              <div className="terms-section-header">
                <span className="terms-section-num">03</span>
                <h2>Why work with me</h2>
              </div>
              <p>
                I&apos;m not an agency with a sales team and a junior in the back doing the actual work. When you work with
                Triggr, you&apos;re working directly with me — the person who scopes it, builds it, and supports it.
              </p>
              <p>
                I&apos;ve built websites, lead capture systems, AI chatbots, automated follow-up sequences, and CRM pipelines
                for real businesses. I know what works and what&apos;s overkill for a small operation.
              </p>
              <p>
                I&apos;m also local. Sydney is home, and the businesses I build for are the same ones I see every day.
              </p>
            </div>

            <div className="terms-section reveal reveal--subtle">
              <div className="terms-section-header">
                <span className="terms-section-num">04</span>
                <h2>The promise</h2>
              </div>
              <p>
                Every system goes live within 48 hours of sign-off — capturing leads, sending alerts, logging everything.
                If it&apos;s not working, I fix it. No excuses.
              </p>
              <p>If you need a better website, a smarter system, or both — let&apos;s talk.</p>
              <div className="terms-callout card-lift">
                <a
                  href="/#contact"
                  className="btn-secondary"
                  style={{
                    color: '#F0F0EE',
                    textDecoration: 'none',
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 500,
                    display: 'inline-block',
                  }}
                >
                  Get in touch →
                </a>
              </div>
            </div>
          </div>
        </div>

        <footer className="terms-footer reveal reveal--subtle">
          <p>
            © {new Date().getFullYear()} Triggr · usetriggr.com.au · <a href="/">Home</a> ·{' '}
            <a href="/terms">Terms of Service</a>
          </p>
        </footer>
      </div>
    </MarketingScrollShell>
  );
}
