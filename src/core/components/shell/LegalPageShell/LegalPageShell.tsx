'use client';

import { Fragment, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import Link from 'next/link';
import { footer } from 'core/consts/content';
import { legal } from 'core/consts/legal';
import { useRevealChildren } from 'lib/motion/hooks/useRevealChildren';
import SubpageBackBand from '../SubpageBackBand';
import SubpageNav from '../SubpageNav';

type LegalPageShellProps = {
  titel: string;
  children: ReactNode;
};

/* Gemeinsames Geruest der Rechtsseiten (Impressum/Datenschutz): Subpage-Nav,
   dann ein Linien-Band im FAQ-Duktus (Haarlinien oben/unten ueber die volle
   Breite, die Rails laufen durch) mit dem Rueckweg zur Startseite, darunter
   das helle, rein typografische Kapitel. Den Abschluss macht eine helle
   Footer-Zeile mit den Credits der One-Page (© + rechtliche Links). */
function LegalPageShell({ titel, children }: LegalPageShellProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  useRevealChildren(sectionRef);

  return (
    <>
      <SubpageNav />
      <main>
        <section className="legal" data-theme="light" data-rails ref={sectionRef}>
          <SubpageBackBand href={legal.zurueck.href} label={legal.zurueck.label} />
          <div className="container">
            <p className="eyebrow" data-reveal>
              {legal.eyebrow}
            </p>
            <h1 className="legal-title" data-reveal style={{ '--ri': 1 } as CSSProperties}>
              {titel}
            </h1>
            <div className="legal-body">{children}</div>
          </div>
        </section>
      </main>
      <footer className="legal-footer" data-rails>
        <div className="container mono">
          <span className="cf-left">{footer.copyright}</span>
          <span className="cf-right">
            {footer.rechtliches.map((link, index) => (
              <Fragment key={link.href}>
                {index > 0 && ' · '}
                <Link href={link.href}>{link.label}</Link>
              </Fragment>
            ))}
          </span>
        </div>
      </footer>
    </>
  );
}

export default LegalPageShell;
