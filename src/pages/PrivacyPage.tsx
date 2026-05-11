import { LogoMark } from '../components/LogoMark';
import '../terms.css';

export function PrivacyPage() {
  return (
    <div className="terms-page">
      <header className="terms-header">
        <a href="/" className="terms-logo" aria-label="Triggr home">
          <LogoMark size={22} color="#F0F0EE" />
          <span className="terms-logo-wordmark">TRIGGR</span>
        </a>
        <a href="/" className="terms-back-link">
          ← Back to site
        </a>
      </header>

      <div className="terms-content">
        <div className="terms-hero">
          <div className="terms-label">Legal</div>
          <h1>Privacy Policy</h1>
          <div className="terms-meta">
            <div>
              Effective: <span>1 January 2025</span>
            </div>
            <div>
              Jurisdiction: <span>New South Wales, Australia</span>
            </div>
          </div>
        </div>

        <div className="terms-toc">
          <div className="terms-toc-title">Contents</div>
          <ol>
            <li>
              <a href="#s1">
                <span className="terms-toc-num">01</span> Who We Are
              </a>
            </li>
            <li>
              <a href="#s2">
                <span className="terms-toc-num">02</span> What We Collect
              </a>
            </li>
            <li>
              <a href="#s3">
                <span className="terms-toc-num">03</span> How We Use Your Information
              </a>
            </li>
            <li>
              <a href="#s4">
                <span className="terms-toc-num">04</span> Third-Party Platforms
              </a>
            </li>
            <li>
              <a href="#s5">
                <span className="terms-toc-num">05</span> Data Storage &amp; Security
              </a>
            </li>
            <li>
              <a href="#s6">
                <span className="terms-toc-num">06</span> Data Retention
              </a>
            </li>
            <li>
              <a href="#s7">
                <span className="terms-toc-num">07</span> Your Rights
              </a>
            </li>
            <li>
              <a href="#s8">
                <span className="terms-toc-num">08</span> Cookies &amp; Tracking
              </a>
            </li>
            <li>
              <a href="#s9">
                <span className="terms-toc-num">09</span> Changes to This Policy
              </a>
            </li>
            <li>
              <a href="#s10">
                <span className="terms-toc-num">10</span> Contact
              </a>
            </li>
          </ol>
        </div>

        <div className="terms-section" id="s1">
          <div className="terms-section-header">
            <span className="terms-section-num">01</span>
            <h2>Who We Are</h2>
          </div>
          <p>
            Triggr is operated by Zimraan Anjum (ABN 66 456 224 219) based in Sydney, NSW. We build websites and
            automation systems for small businesses. This policy explains how we handle personal information collected
            through our website and services.
          </p>
        </div>

        <div className="terms-section" id="s2">
          <div className="terms-section-header">
            <span className="terms-section-num">02</span>
            <h2>What We Collect</h2>
          </div>
          <p>We may collect the following:</p>
          <ul>
            <li>Name, email address, phone number, and business name when you contact us</li>
            <li>Basic analytics data (pages visited, device type) to understand how our site is used</li>
            <li>
              For clients: personal data belonging to their customers, processed as part of automation systems we build on
              their behalf
            </li>
          </ul>
          <p>We do not collect sensitive information (health, financial, or government identifiers).</p>
        </div>

        <div className="terms-section" id="s3">
          <div className="terms-section-header">
            <span className="terms-section-num">03</span>
            <h2>How We Use Your Information</h2>
          </div>
          <p>We use your information to:</p>
          <ul>
            <li>Respond to enquiries and deliver the services you engaged us for</li>
            <li>Send project updates and invoices</li>
            <li>Improve our website and services</li>
          </ul>
          <p>We do not sell, rent, or trade your personal information to third parties.</p>
        </div>

        <div className="terms-section" id="s4">
          <div className="terms-section-header">
            <span className="terms-section-num">04</span>
            <h2>Third-Party Platforms</h2>
          </div>
          <p>Delivering our services involves the following platforms, each with their own privacy policies:</p>
          <ul>
            <li>
              <strong>Twilio</strong> — SMS delivery
            </li>
            <li>
              <strong>Google Sheets / Google Workspace</strong> — data storage and CRM functions
            </li>
            <li>
              <strong>Pipedream</strong> — automation workflow processing
            </li>
            <li>
              <strong>Vercel</strong> — website hosting
            </li>
            <li>
              <strong>Anthropic (Claude API)</strong> — AI processing in certain automation builds
            </li>
          </ul>
          <p>We share only the minimum data necessary with each platform to deliver your service.</p>
        </div>

        <div className="terms-section" id="s5">
          <div className="terms-section-header">
            <span className="terms-section-num">05</span>
            <h2>Data Storage &amp; Security</h2>
          </div>
          <p>
            Data is stored in Google Sheets and the automation platforms listed above. We take reasonable steps to
            protect your information from unauthorised access, but no system is 100% secure. If you believe your data
            has been compromised, contact us immediately.
          </p>
        </div>

        <div className="terms-section" id="s6">
          <div className="terms-section-header">
            <span className="terms-section-num">06</span>
            <h2>Data Retention</h2>
          </div>
          <p>
            We retain your data for as long as your services are active, or as required by law. On request, we will
            delete your information within 30 days, except where retention is legally required.
          </p>
        </div>

        <div className="terms-section" id="s7">
          <div className="terms-section-header">
            <span className="terms-section-num">07</span>
            <h2>Your Rights</h2>
          </div>
          <p>Under the Australian Privacy Act 1988 (Cth), you have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request corrections to inaccurate information</li>
            <li>Request deletion of your data</li>
            <li>
              Lodge a complaint with the Office of the Australian Information Commissioner (
              <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer">
                oaic.gov.au
              </a>
              )
            </li>
          </ul>
          <p>
            To exercise any of these rights, email{' '}
            <a href="mailto:hi@usetriggr.com.au">hi@usetriggr.com.au</a>.
          </p>
        </div>

        <div className="terms-section" id="s8">
          <div className="terms-section-header">
            <span className="terms-section-num">08</span>
            <h2>Cookies &amp; Tracking</h2>
          </div>
          <p>
            Our website may use basic analytics to track page views and traffic sources. No personally identifiable
            information is collected through cookies. You can disable cookies in your browser settings at any time.
          </p>
        </div>

        <div className="terms-section" id="s9">
          <div className="terms-section-header">
            <span className="terms-section-num">09</span>
            <h2>Changes to This Policy</h2>
          </div>
          <p>
            We may update this policy from time to time. The effective date at the top of this page reflects the most
            recent revision. Continued use of our services after changes are posted constitutes acceptance.
          </p>
        </div>

        <div className="terms-section" id="s10">
          <div className="terms-section-header">
            <span className="terms-section-num">10</span>
            <h2>Contact</h2>
          </div>
          <ul>
            <li>
              <strong>Business:</strong> Triggr
            </li>
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:hi@usetriggr.com.au">hi@usetriggr.com.au</a>
            </li>
            <li>
              <strong>Website:</strong>{' '}
              <a href="https://usetriggr.com.au" target="_blank" rel="noopener noreferrer">
                usetriggr.com.au
              </a>
            </li>
            <li>
              <strong>Location:</strong> Sydney, NSW
            </li>
          </ul>
        </div>
      </div>

      <footer className="terms-footer">
        <p>© 2025 Triggr · usetriggr.com.au · <a href="/">Home</a></p>
      </footer>
    </div>
  );
}
