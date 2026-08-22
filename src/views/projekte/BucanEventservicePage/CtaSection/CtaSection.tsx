'use client';

import { Fragment, useRef } from 'react';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { caseStudyBucan } from 'core/consts/caseStudyBucan';
import { footer } from 'core/consts/content';
import { useRevealChildren } from 'lib/motion/hooks/useRevealChildren';

/* Kobalt-Abschluss: Erstgespraech-CTA zurueck zur One-Page plus die
   rechtlichen Links (Impressum/Datenschutz muessen von jeder Seite aus
   erreichbar sein). */
function CtaSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useRevealChildren(sectionRef);

  const { cta, zurueck } = caseStudyBucan;

  return (
    <section className="case-cta bg-dots-cobalt" data-theme="cobalt" data-rails ref={sectionRef}>
      <div className="container">
        <h2 className="display2" data-reveal>
          {cta.titel}
        </h2>
        <p className="case-cta-text" data-reveal style={{ '--ri': 1 } as CSSProperties}>
          {cta.text}
        </p>
        <div className="case-cta-actions" data-reveal style={{ '--ri': 2 } as CSSProperties}>
          <Link className="btn btn-invert" href={cta.button.href}>
            {cta.button.label}
            <span className="btn-arrow" aria-hidden="true">
              →
            </span>
          </Link>
          <Link className="link-draw" href={zurueck.href}>
            {zurueck.label}
          </Link>
        </div>
      </div>
      <footer className="case-cta-footer">
        <div className="container mono">
          <span className="cf-left">{footer.copyright}</span>
          <span className="cf-right">
            {footer.rechtliches.map((link, index) => (
              <Fragment key={link.href}>
                {index > 0 && ' · '}
                <a href={link.href}>{link.label}</a>
              </Fragment>
            ))}
          </span>
        </div>
      </footer>
    </section>
  );
}

export default CtaSection;
