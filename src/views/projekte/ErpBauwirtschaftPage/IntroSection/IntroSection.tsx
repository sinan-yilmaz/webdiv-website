'use client';

import { useRef } from 'react';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { caseStudyErp } from 'core/consts/caseStudyErp';
import { useRevealChildren } from 'lib/motion/hooks/useRevealChildren';

/* Projektkopf: Rueckweg, Titel, Status-Zeile (statt Live-Link – die
   Anwendung ist nicht oeffentlich) und die Fakten-Leiste. */
function IntroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useRevealChildren(sectionRef);

  const { intro, zurueck } = caseStudyErp;

  return (
    <section className="case-intro" data-theme="light" data-rails ref={sectionRef}>
      <div className="container">
        <p className="case-back mono" data-reveal>
          <Link className="link-draw" href={zurueck.href}>
            ← {zurueck.label}
          </Link>
        </p>
        <p className="eyebrow" data-reveal style={{ '--ri': 1 } as CSSProperties}>
          {intro.eyebrow}
        </p>
        <h1 className="case-title" data-reveal style={{ '--ri': 2 } as CSSProperties}>
          {intro.titel}
        </h1>
        <div className="case-lead" data-reveal style={{ '--ri': 3 } as CSSProperties}>
          <p className="case-sub">{intro.sub}</p>
          <p className="case-status mono">{intro.status}</p>
        </div>
        <dl className="case-facts" data-reveal style={{ '--ri': 4 } as CSSProperties}>
          {intro.fakten.map((fakt) => (
            <div key={fakt.label} className="case-fact">
              <dt className="mono">{fakt.label}</dt>
              <dd>{fakt.wert}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default IntroSection;
