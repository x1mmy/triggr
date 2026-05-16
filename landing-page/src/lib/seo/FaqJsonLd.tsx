import { FAQ_ITEMS } from './faq';
import { buildFaqPageJsonLd } from './schema';

const jsonLd = buildFaqPageJsonLd(FAQ_ITEMS);

export function FaqJsonLd() {
  return (
    <script id="json-ld-faq-page" type="application/ld+json">
      {JSON.stringify(jsonLd)}
    </script>
  );
}
