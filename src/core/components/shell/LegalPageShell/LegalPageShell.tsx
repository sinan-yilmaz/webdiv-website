'use client';

import { Fragment, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import Link from 'next/link';
import { legal } from 'core/consts/legal';
import { useRevealChildren } from 'lib/motion/hooks/useRevealChildren';
import SubpageNav from '../SubpageNav';

type LegalPageShellProps = {
  titel: string;
  fussLinks: readonly { label: string; href: string }[];
  children: ReactNode;
};

/* Gemeinsames Geruest der Rechtsseiten (Impressum/Datenschutz): Subpage-Nav
   und ein einzelnes helles, rein typografisches Kapitel – Kopf wie die 404,
   darunter der Fliesstext der jeweiligen Seite, unten eine mono-Fusszeile
   mit den Querlinks (Startseite + jeweils anderes Rechtsdokument). */
function LegalPageShell({ titel, fussLinks, children }: LegalPageShellProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  useRevealChildren(sectionRef);

  return (
    <>
      <SubpageNav />
      <main>
        <section className="legal" data-theme="light" data-rails ref={sectionRef}>
          <div className="container">
            <p className="eyebrow" data-reveal>
              {legal.eyebrow}
            </p>
            <h1 className="legal-title" data-reveal style={{ '--ri': 1 } as CSSProperties}>
              {titel}
            </h1>
            <div className="legal-body">{children}</div>
            <p className="legal-foot mono" data-reveal>
              {fussLinks.map((link, index) => (
                <Fragment key={link.href}>
                  {index > 0 && ' · '}
                  <Link className="link-draw" href={link.href}>
                    {link.label}
                  </Link>
                </Fragment>
              ))}
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default LegalPageShell;
