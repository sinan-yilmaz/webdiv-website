'use client';

import { useRef } from 'react';
import type { CSSProperties } from 'react';
import { caseStudyBucan } from 'core/consts/caseStudyBucan';
import { useRevealChildren } from 'lib/motion/hooks/useRevealChildren';

/* Technik- und Datenschutz-Entscheidungen der Live-Site als Spaltenraster
   (Ablauf-Aesthetik: Haarlinie links, Titel, Text) plus Betriebs-Notiz. */
function CraftSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useRevealChildren(sectionRef);

  const { handwerk } = caseStudyBucan;

  return (
    <section className="case-craft" data-theme="light" data-rails ref={sectionRef}>
      <div className="container">
        <p className="eyebrow" data-reveal>
          {handwerk.eyebrow}
        </p>
        <h2 className="h2" data-reveal style={{ '--ri': 1 } as CSSProperties}>
          {handwerk.titel}
        </h2>
        <div className="case-craft-grid">
          {handwerk.punkte.map((punkt, index) => (
            <div
              key={punkt.titel}
              className="case-craft-item"
              data-reveal
              style={{ '--ri': index + 2 } as CSSProperties}
            >
              <h3>{punkt.titel}</h3>
              <p>{punkt.text}</p>
            </div>
          ))}
        </div>
        <p className="case-craft-note" data-reveal>
          {handwerk.betrieb}
        </p>
      </div>
    </section>
  );
}

export default CraftSection;
