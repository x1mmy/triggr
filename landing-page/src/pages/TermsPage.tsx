import { LogoMark } from '../components/LogoMark';
import '../terms.css';

export function TermsPage() {
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
          <h1>Terms of Service</h1>
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
            <li><a href="#s1"><span className="terms-toc-num">01</span> Agreement &amp; Scope</a></li>
            <li><a href="#s2"><span className="terms-toc-num">02</span> Services</a></li>
            <li><a href="#s3"><span className="terms-toc-num">03</span> Payment Terms</a></li>
            <li><a href="#s4"><span className="terms-toc-num">04</span> Retainer &amp; Cancellation</a></li>
            <li><a href="#s5"><span className="terms-toc-num">05</span> Revisions &amp; Changes</a></li>
            <li><a href="#s6"><span className="terms-toc-num">06</span> Client Responsibilities</a></li>
            <li><a href="#s7"><span className="terms-toc-num">07</span> Automation-Specific Terms</a></li>
            <li><a href="#s8"><span className="terms-toc-num">08</span> Intellectual Property</a></li>
            <li><a href="#s9"><span className="terms-toc-num">09</span> Limitation of Liability</a></li>
            <li><a href="#s10"><span className="terms-toc-num">10</span> Confidentiality</a></li>
            <li><a href="#s11"><span className="terms-toc-num">11</span> Governing Law</a></li>
            <li><a href="#s12"><span className="terms-toc-num">12</span> Contact</a></li>
          </ol>
        </div>

        <div className="terms-section" id="s1">
          <div className="terms-section-header"><span className="terms-section-num">01</span><h2>Agreement &amp; Scope</h2></div>
          <p>By engaging Triggr (operated by Zimraan Anjum, ABN 66 456 224 219) for any service — whether web development, automation, or ongoing retainer — you agree to these Terms of Service in full.</p>
          <p>These terms apply to all projects, proposals, invoices, and ongoing arrangements between you (the client) and Triggr. If you have a separate written agreement signed by both parties, that document takes precedence where there is a conflict.</p>
        </div>

        <div className="terms-section" id="s2">
          <div className="terms-section-header"><span className="terms-section-num">02</span><h2>Services</h2></div>
          <p>Triggr provides the following services:</p>
          <ul>
            <li><strong>Web development</strong> — design and build of business websites, landing pages, and contact forms</li>
            <li><strong>Automation systems</strong> — lead capture, SMS/email alerts, CRM piping, AI chatbots, and follow-up sequences</li>
            <li><strong>Ongoing retainer</strong> — maintenance, monitoring, tweaks, and support for live systems</li>
          </ul>
          <p>The specific deliverables for your project are defined in your proposal or invoice. <strong>Anything not listed in your proposal is out of scope</strong> and subject to a separate quote.</p>
        </div>

        <div className="terms-section" id="s3">
          <div className="terms-section-header"><span className="terms-section-num">03</span><h2>Payment Terms</h2></div>
          <div className="terms-callout">Work does not begin until a deposit is received. Files and credentials are not handed over until the full balance is cleared.</div>
          <ul>
            <li>A <strong>50% deposit</strong> is required upfront before any work begins</li>
            <li>The remaining <strong>50% is due on delivery</strong>, before credentials, files, or system access are transferred to you</li>
            <li>Monthly retainer fees are due on the <strong>1st of each month</strong></li>
            <li>If a retainer payment is not received within <strong>7 days of the due date</strong>, services will be paused</li>
            <li>If payment remains outstanding after <strong>14 days</strong>, services will be suspended until all overdue amounts are cleared in full</li>
            <li>Invoices unpaid beyond 30 days may incur a <strong>10% monthly late fee</strong> on the outstanding balance</li>
          </ul>
          <p>All prices are in Australian Dollars (AUD) and are exclusive of GST unless stated otherwise.</p>
        </div>

        <div className="terms-section" id="s4">
          <div className="terms-section-header"><span className="terms-section-num">04</span><h2>Retainer &amp; Cancellation</h2></div>
          <ul>
            <li>Either party may cancel a retainer with <strong>30 days written notice</strong> via email</li>
            <li>Retainer fees already paid are <strong>non-refundable</strong></li>
            <li>On cancellation, all files, credentials, and documentation will be handed over within <strong>7 business days</strong> of the final payment clearing</li>
            <li>Triggr reserves the right to terminate a retainer immediately if the client acts abusively, engages in unlawful activity, or breaches these terms</li>
          </ul>
        </div>

        <div className="terms-section" id="s5">
          <div className="terms-section-header"><span className="terms-section-num">05</span><h2>Revisions &amp; Changes</h2></div>
          <p>It's important to understand the difference between a <strong>revision</strong> and a <strong>change</strong>:</p>
          <ul>
            <li>A <strong>revision</strong> is a refinement within the agreed scope — for example, adjusting wording, swapping a colour, or tweaking a layout element on something we've already built</li>
            <li>A <strong>change</strong> is anything that adds to, removes from, or alters the agreed scope — for example, adding a new page, rebuilding a section from scratch, or connecting a platform we didn't originally plan for</li>
          </ul>
          <p>Each project includes <strong>2 rounds of revisions</strong>. Additional revisions beyond that, and any changes to scope, are quoted separately before work begins.</p>
          <ul>
            <li>All revision and change requests must be submitted in writing (email or message)</li>
            <li>Changes requested after final sign-off are treated as new work and quoted accordingly</li>
            <li>Scope changes mid-project will be agreed in writing before any additional work proceeds</li>
          </ul>
        </div>

        <div className="terms-section" id="s6">
          <div className="terms-section-header"><span className="terms-section-num">06</span><h2>Client Responsibilities</h2></div>
          <p>To deliver your project on time, we need the following from you promptly:</p>
          <ul>
            <li>All content, images, copy, and branding materials required for the project</li>
            <li>Access to any existing platforms, accounts, or credentials needed to complete the work</li>
            <li>Timely feedback and approvals at agreed milestones</li>
          </ul>
          <div className="terms-warning">Delays caused by the client (late content, slow approvals, unresponsiveness) do not affect your payment timeline. Project timelines will be adjusted accordingly but invoices remain due as agreed.</div>
          <p>You are responsible for the accuracy of all business information and content you provide. Triggr is not liable for errors originating from client-supplied materials.</p>
        </div>

        <div className="terms-section" id="s7">
          <div className="terms-section-header"><span className="terms-section-num">07</span><h2>Automation-Specific Terms</h2></div>
          <p>The following applies specifically to automation and lead conversion systems:</p>
          <ul>
            <li>Triggr is <strong>not responsible for outages or changes</strong> to third-party platforms we integrate with — including but not limited to Twilio, n8n, Facebook, Meta, Google, and any CRM tools</li>
            <li>You are responsible for maintaining <strong>active accounts and sufficient credits</strong> on any third-party platforms used in your automation (e.g. Twilio SMS credits)</li>
            <li>If you change your website, CRM, Facebook page, or any connected platform <strong>without notifying Triggr</strong> and it causes the automation to break, repairs are billable work</li>
            <li>Triggr <strong>guarantees the system works</strong> as built and tested — we do not guarantee the volume of leads you receive, as this depends on your own marketing activity</li>
            <li>The 48-hour go-live guarantee applies to standard setups under agreed scope. Custom or complex systems may require additional time, which will be communicated upfront</li>
          </ul>
        </div>

        <div className="terms-section" id="s8">
          <div className="terms-section-header"><span className="terms-section-num">08</span><h2>Intellectual Property</h2></div>
          <ul>
            <li>All work created by Triggr remains <strong>our intellectual property until paid in full</strong></li>
            <li>Once full payment is received, ownership of the final deliverables transfers to you</li>
            <li>Triggr retains the right to <strong>display work in our portfolio</strong> and use it for promotional purposes unless you request otherwise in writing</li>
            <li>Triggr retains ownership of any <strong>underlying frameworks, templates, or automation logic</strong> used to build your system — you receive a licence to use the final product, not the underlying code</li>
          </ul>
        </div>

        <div className="terms-section" id="s9">
          <div className="terms-section-header"><span className="terms-section-num">09</span><h2>Limitation of Liability</h2></div>
          <p>To the maximum extent permitted by law:</p>
          <ul>
            <li>Triggr's total liability to you is capped at the <strong>total fees paid in the 3 months prior</strong> to the event giving rise to the claim</li>
            <li>Triggr is <strong>not liable for indirect or consequential losses</strong> — including lost revenue, missed leads, lost contracts, or business interruption — arising from technical issues, platform outages, or any service failure</li>
            <li>Nothing in these terms excludes liability for fraud, gross negligence, or anything that cannot be excluded under Australian Consumer Law</li>
          </ul>
        </div>

        <div className="terms-section" id="s10">
          <div className="terms-section-header"><span className="terms-section-num">10</span><h2>Confidentiality</h2></div>
          <ul>
            <li>Triggr will not share your business data, lead information, or confidential business details with any third party without your consent</li>
            <li>You agree not to share, reverse-engineer, or reproduce Triggr's automation workflows, system designs, or templates with competitors or third parties</li>
            <li>Both parties agree to keep the financial terms of any arrangement confidential</li>
          </ul>
        </div>

        <div className="terms-section" id="s11">
          <div className="terms-section-header"><span className="terms-section-num">11</span><h2>Governing Law</h2></div>
          <p>These terms are governed by the laws of <strong>New South Wales, Australia</strong>. Any disputes will be subject to the exclusive jurisdiction of the courts of New South Wales.</p>
          <p>If any provision of these terms is found to be unenforceable, the remaining provisions continue in full force.</p>
        </div>

        <div className="terms-section" id="s12">
          <div className="terms-section-header"><span className="terms-section-num">12</span><h2>Contact</h2></div>
          <p>Questions about these terms? Get in touch:</p>
          <ul>
            <li><strong>Business:</strong> Triggr</li>
            <li><strong>Email:</strong> hi@usetriggr.com.au</li>
            <li><strong>Website:</strong> usetriggr.com.au</li>
            <li><strong>Location:</strong> Sydney, NSW</li>
          </ul>
          <div className="terms-callout">These terms were last updated on 1 January 2025. Triggr reserves the right to update these terms at any time. Continued use of our services after changes are posted constitutes acceptance of the updated terms.</div>
        </div>
      </div>

      <footer className="terms-footer">
        <p>© 2025 Triggr · usetriggr.com.au · <a href="/">Home</a></p>
      </footer>
    </div>
  );
}
