'use client';

import { useRef } from 'react';
import type { CSSProperties } from 'react';
import { caseStudyErp } from 'core/consts/caseStudyErp';
import { useRevealChildren } from 'lib/motion/hooks/useRevealChildren';

/* Auftrag und Rolle: Fundament gelegt, Hauptautor in Zusammenarbeit mit dem
   Team – plus die Detail-Box zur vereinbarten Vertraulichkeit. */
function BriefSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useRevealChildren(sectionRef);

  const { auftrag } = caseStudyErp;

  return (
    <section className="case-brief" data-theme="light" data-rails ref={sectionRef}>
      <div className="container">
        <div className="case-brief-grid">
          <div>
            <p className="eyebrow" data-reveal>
              {auftrag.eyebrow}
            </p>
            <h2 className="h2" data-reveal style={{ '--ri': 1 } as CSSProperties}>
              {auftrag.titel}
            </h2>
          </div>
          <div className="case-brief-text">
            {auftrag.absaetze.map((absatz, index) => (
              <p key={index} data-reveal style={{ '--ri': index + 2 } as CSSProperties}>
                {absatz}
              </p>
            ))}
            <p
              className="case-brief-detail"
              data-reveal
              style={{ '--ri': auftrag.absaetze.length + 2 } as CSSProperties}
            >
              {auftrag.detail}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BriefSection;
