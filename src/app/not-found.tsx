import type { Metadata } from 'next';
import { notFound } from 'core/consts/content';
import NotFoundPage from 'views/not-found/NotFoundPage';

export const metadata: Metadata = {
  title: notFound.metaTitle,
};

export default function NotFound() {
  return <NotFoundPage />;
}
