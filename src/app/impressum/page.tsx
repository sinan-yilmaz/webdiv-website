import type { Metadata } from 'next';
import { impressum } from 'core/consts/legal';
import ImpressumPage from 'views/impressum/ImpressumPage';

export const metadata: Metadata = {
  title: impressum.metaTitle,
  description: impressum.metaDescription,
  alternates: { canonical: '/impressum/' },
};

export default function Page() {
  return <ImpressumPage />;
}
