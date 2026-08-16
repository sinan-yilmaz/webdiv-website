'use client';

import { useRef } from 'react';
import type { CSSProperties } from 'react';
import { caseStudyBucan } from 'core/consts/caseStudyBucan';
import { useRevealChildren } from 'lib/motion/hooks/useRevealChildren';

/* Kunden-Kapitel in den Bucan-Farben (nur hier): Palette aus der Print-CI,
   Typografie, Kapitel-Dramaturgie und Motion der Live-Site. */
function DesignSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useRevealChildren(sectionRef);

  const { design } = caseStudyBucan;

  return (
    <section className="case-design bg-dots-dark" data-theme="dark" data-rails ref={sectionRef}>
      <div className="container">
        <p className="eyebrow" data-reveal>
          {design.eyebrow}
        </p>
        <h2 className="h2" data-reveal style={{ '--ri': 1 } as CSSProperties}>
          {design.titel}
        </h2>
        <p className="case-design-text" data-reveal style={{ '--ri': 2 } as CSSProperties}>
          {design.text}
        </p>
        <ul className="case-swatches" data-reveal style={{ '--ri': 3 } as CSSProperties}>
          {design.farben.map((farbe) => (
            <li key={farbe.hex} className="case-swatch">
              <i style={{ background: farbe.hex }} aria-hidden="true" />
              <span className="swatch-name">{farbe.name}</span>
              <span className="swatch-hex mono">
                {farbe.hex}
                {'hinweis' in farbe ? ` · ${farbe.hinweis}` : ''}
              </span>
            </li>
          ))}
        </ul>
        <div className="case-design-cols">
          {design.kapitel.map((kapitel, index) => (
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

export default DesignSection;
