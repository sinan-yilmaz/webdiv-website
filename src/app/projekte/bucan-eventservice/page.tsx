import type { Metadata } from 'next';
import { caseStudyBucan } from 'core/consts/caseStudyBucan';
import { site } from 'core/consts/content';
import BucanEventservicePage from 'views/projekte/BucanEventservicePage';

export const metadata: Metadata = {
  title: caseStudyBucan.meta.title,
  description: caseStudyBucan.meta.description,
  alternates: { canonical: '/projekte/bucan-eventservice/' },
  openGraph: {
    title: caseStudyBucan.meta.title,
    description: caseStudyBucan.meta.description,
    type: 'website',
    locale: 'de_DE',
    url: '/projekte/bucan-eventservice/',
    images: [{ url: site.ogImage, width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <BucanEventservicePage />;
}
