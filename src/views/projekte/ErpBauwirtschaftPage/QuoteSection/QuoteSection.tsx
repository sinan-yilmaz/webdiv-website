'use client';

import { useRef } from 'react';
import type { CSSProperties } from 'react';
import { caseStudyErp } from 'core/consts/caseStudyErp';
import { useRevealChildren } from 'lib/motion/hooks/useRevealChildren';

/* Kundenstimme des Auftraggebers – Wortlaut von Stefan E. freigegeben
   (Nennung als "Stefan E." Teil der Vereinbarung). */
function QuoteSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useRevealChildren(sectionRef);

  const { zitat } = caseStudyErp;

  return (
    <section className="case-quote" data-theme="light" data-rails ref={sectionRef}>
      <div className="container">
        <figure className="case-quote-figure" data-reveal>
          <blockquote>„{zitat.text}“</blockquote>
          <figcaption className="mono" data-reveal style={{ '--ri': 1 } as CSSProperties}>
            {zitat.name} · {zitat.rolle}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export default QuoteSection;
