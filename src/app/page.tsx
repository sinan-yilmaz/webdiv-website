import type { Metadata } from 'next';
import { marke, site } from 'core/consts/content';
import HomePage from 'views/home/HomePage';

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    title: site.title,
    description: site.description,
    type: 'website',
    locale: 'de_DE',
    url: '/',
    images: [{ url: site.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
    images: [site.ogImage],
  },
};

/* JSON-LD nach Bucan-Blaupause (WebSite + LocalBusiness); nur belegte Fakten –
   E-Mail/Telefon folgen, sobald die [Platzhalter] im Briefing ersetzt sind.
   Bewusst der generische LocalBusiness-Typ: ProfessionalService ist auf
   schema.org deprecated, und einen spezifischeren Subtyp fuer ein
   Web-Studio gibt es nicht (geprueft 17.08.2026). */
const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: marke.wortmarke,
    url: `${site.url}/`,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: marke.wortmarke,
    description: site.description,
    url: `${site.url}/`,
    image: `${site.url}${site.ogImage}`,
    sameAs: ['https://www.instagram.com/webdiv.de'],
    founder: {
      '@type': 'Person',
      name: 'Sinan Yilmaz',
      sameAs: ['https://www.linkedin.com/in/sinan-yilmaz-webdiv/'],
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Günzburg',
      addressCountry: 'DE',
    },
  },
];

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePage />
    </>
  );
}
