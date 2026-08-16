import type { Metadata } from 'next';
import { caseStudyBucan } from 'core/consts/caseStudyBucan';
import BucanEventservicePage from 'views/projekte/BucanEventservicePage';

export const metadata: Metadata = {
  title: caseStudyBucan.meta.title,
  description: caseStudyBucan.meta.description,
};

export default function Page() {
  return <BucanEventservicePage />;
}
