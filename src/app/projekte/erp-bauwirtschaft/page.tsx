import type { Metadata } from 'next';
import { caseStudyErp } from 'core/consts/caseStudyErp';
import { site } from 'core/consts/content';
import ErpBauwirtschaftPage from 'views/projekte/ErpBauwirtschaftPage';

export const metadata: Metadata = {
  title: caseStudyErp.meta.title,
  description: caseStudyErp.meta.description,
  alternates: { canonical: '/projekte/erp-bauwirtschaft/' },
  openGraph: {
    title: caseStudyErp.meta.title,
    description: caseStudyErp.meta.description,
    type: 'website',
    locale: 'de_DE',
    url: '/projekte/erp-bauwirtschaft/',
    images: [{ url: site.ogImage, width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <ErpBauwirtschaftPage />;
}
