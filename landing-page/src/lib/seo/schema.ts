import { BUSINESS, SITE_URL } from './entity';
import type { FaqItem } from './faq';

export function buildLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BUSINESS.name,
    url: SITE_URL,
    description: BUSINESS.description,
    email: BUSINESS.email,
    areaServed: BUSINESS.areaServed,
    serviceType: [...BUSINESS.serviceTypes],
    founder: {
      '@type': 'Person',
      name: BUSINESS.founderName,
    },
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'ABN',
      value: BUSINESS.abn,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
      addressCountry: BUSINESS.addressCountry,
    },
    sameAs: [...BUSINESS.sameAs],
  };
}

export function buildFaqPageJsonLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
