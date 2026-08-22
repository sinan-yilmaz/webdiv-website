import type { Metadata } from 'next';
import { datenschutz } from 'core/consts/legal';
import DatenschutzPage from 'views/datenschutz/DatenschutzPage';

export const metadata: Metadata = {
  title: datenschutz.metaTitle,
  description: datenschutz.metaDescription,
  alternates: { canonical: '/datenschutz/' },
};

export default function Page() {
  return <DatenschutzPage />;
}
