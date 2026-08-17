import { SubpageNav } from 'core/components/shell';
import NotFoundSection from './NotFoundSection';

/* 404 – rein typografische Unterseite in der webdiv-Formensprache:
   Subpage-Nav und ein einzelnes helles Kapitel. */
function NotFoundPage() {
  return (
    <>
      <SubpageNav />
      <main>
        <NotFoundSection />
      </main>
    </>
  );
}

export default NotFoundPage;
