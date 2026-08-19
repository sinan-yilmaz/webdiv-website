'use client';

import { useRef } from 'react';
import type { CSSProperties } from 'react';
import { caseStudyErp } from 'core/consts/caseStudyErp';
import { useRevealChildren } from 'lib/motion/hooks/useRevealChildren';

/* Dunkles Kapitel in den Produktfarben (nur hier): Architektur-Erzaehlung,
   Zahlen-Leiste (Zahlen statt Adjektive) und zwei Vertiefungs-Spalten. */
function FoundationSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useRevealChildren(sectionRef);

  const { fundament } = caseStudyErp;

  return (
    <section className="case-foundation bg-dots-dark" data-theme="dark" data-rails ref={sectionRef}>
      <div className="container">
        <p className="eyebrow" data-reveal>
          {fundament.eyebrow}
        </p>
        <h2 className="h2" data-reveal style={{ '--ri': 1 } as CSSProperties}>
          {fundament.titel}
        </h2>
        <p className="case-foundation-text" data-reveal style={{ '--ri': 2 } as CSSProperties}>
          {fundament.text}
        </p>
        <dl className="case-stats" data-reveal style={{ '--ri': 3 } as CSSProperties}>
          {fundament.zahlen.map((zahl) => (
            <div key={zahl.label} className="case-stat">
              <dd>{zahl.wert}</dd>
              <dt className="mono">{zahl.label}</dt>
            </div>
          ))}
        </dl>
        <div className="case-foundation-cols">
          {fundament.kapitel.map((kapitel, index) => (
            <div key={kapitel.label} data-reveal style={{ '--ri': index + 4 } as CSSProperties}>
              <p className="case-col-label mono">{kapitel.label}</p>
              <p>{kapitel.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FoundationSection;
