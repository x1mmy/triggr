/** Load a Google Font buffer for next/og ImageResponse (TTF/OTF only — not WOFF2). */
export async function loadGoogleFont(family: string, weight: number): Promise<ArrayBuffer> {
  const css = await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&display=swap`, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (compatible; OGImageBot/1.0; +https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)',
    },
  }).then((res) => res.text());

  const sources = [...css.matchAll(/src: url\((.+?)\) format\('(opentype|truetype|woff2)'\)/g)];
  const preferred =
    sources.find(([, , format]) => format === 'truetype' || format === 'opentype') ?? sources[0];

  if (!preferred?.[1]) {
    throw new Error(`Failed to load font: ${family} ${weight}`);
  }

  return fetch(preferred[1]).then((res) => res.arrayBuffer());
}
