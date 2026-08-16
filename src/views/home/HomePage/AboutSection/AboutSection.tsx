'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import { SignatureMark } from 'core/components/branding';
import { writeSignature } from 'core/components/branding/SignatureMark/writeSignature';
import { portraet, ueberMich } from 'core/consts/content';
import { useInViewOnce } from 'lib/motion/hooks/useInViewOnce';
import { useRevealChildren } from 'lib/motion/hooks/useRevealChildren';

/* Enger Portraet-Ausschnitt (gleiche Platzhalter-Mechanik wie der
   Portraet-Block) und die Unterschrift, die sich beim Einscrollen zeichnet. */
function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const sigWrapRef = useRef<HTMLDivElement | null>(null);
  const sigSvgRef = useRef<SVGSVGElement | null>(null);
  const writtenRef = useRef(false);
  const [missing, setMissing] = useState(false);
  const sigInView = useInViewOnce(sigWrapRef, 0.6);
  useRevealChildren(sectionRef);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setMissing(true);
  }, []);

  useEffect(() => {
    if (!sigInView || writtenRef.current) return;
    writtenRef.current = true;
    if (sigSvgRef.current) writeSignature(sigSvgRef.current, 1500);
  }, [sigInView]);

  return (
    <section className="about" id="ueber-mich" data-theme="light" data-rails ref={sectionRef}>
      <div className="container">
        <p className="eyebrow" data-reveal>
          {ueberMich.eyebrow}
        </p>
        <div className="about-grid">
          <figure className={`about-figure${missing ? ' missing' : ''}`} data-reveal>
            <Image
              ref={imgRef}
              src={portraet.bildSrc}
              alt={ueberMich.bildAlt}
              width={800}
              height={1000}
              onError={() => setMissing(true)}
            />
            <div className="missing-note" aria-hidden="true">
              {portraet.platzhalter}
            </div>
          </figure>
          <div className="about-text" data-reveal style={{ '--ri': 1 } as CSSProperties}>
            <p>{ueberMich.text}</p>
            <div className="about-sig" aria-label={ueberMich.signaturLabel} ref={sigWrapRef}>
              <SignatureMark ref={sigSvgRef} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
