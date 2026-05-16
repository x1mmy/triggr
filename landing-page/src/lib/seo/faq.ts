export type FaqItem = {
  question: string;
  answer: string;
};

/** Shared by FAQ UI and FAQPage JSON-LD — answers must match verbatim in both places. */
export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What is Triggr?',
    answer:
      'Triggr is a Sydney-based business that builds done-for-you AI automation and custom web development for trade businesses. We help operators capture leads, respond faster, and follow up automatically — without agencies or off-the-shelf templates.',
  },
  {
    question: 'Who is Triggr for?',
    answer:
      'Triggr is built for Sydney trade businesses — plumbers, electricians, builders, and similar operators who lose jobs when they cannot respond quickly. If you are on the tools and enquiries slip through while you are busy, Triggr is a fit.',
  },
  {
    question: 'What services does Triggr offer in Sydney?',
    answer:
      'Triggr offers two core services: automation and AI systems (lead capture, instant SMS alerts, CRM wiring, follow-up sequences, and custom workflows) and web development (conversion-focused sites, client portals, landing pages, and ongoing hosting and upkeep). Both are scoped and built custom for how your business works.',
  },
  {
    question: 'How fast can Triggr respond to new leads?',
    answer:
      'Automation systems are built for sub-60-second lead response — instant SMS alerts to your phone, automated follow-ups, and CRM logging so nothing sits unread. Speed depends on your setup, but the goal is that no enquiry waits until you are off the job.',
  },
  {
    question: 'How much does Triggr charge for websites and automation?',
    answer:
      'Website builds are typically $800–$1,200 one-off, with hosting and upkeep at $50–$100 per month. Automation starter setups run $800–$1,500 one-off; full system setups $2,000–$3,500 one-off; monthly retainers $150–$400. Lead conversion automation can be added to a website build for $500 setup and $150 per month. Custom scopes are quoted after a short discovery call.',
  },
  {
    question: 'How long does it take to go live?',
    answer:
      'Most projects follow a short audit, build, and test cycle — often within days, not months. After you sign off, systems are targeted to go live within 48 hours, with monitoring and support included on setup packages.',
  },
  {
    question: 'Does Triggr use website templates?',
    answer:
      'No. Triggr does not sell template websites or hand projects to a junior team. Sites and automations are built from scratch, fitted to your business, and supported directly by the person who scopes and builds the work.',
  },
  {
    question: 'Who builds and supports Triggr projects?',
    answer:
      'You work directly with Zimraan Anjum — a Sydney-based full-stack developer and automation specialist who operates Triggr (ABN 66 456 224 219). He scopes, builds, and supports every project. Contact hi@usetriggr.com.au to start.',
  },
];
