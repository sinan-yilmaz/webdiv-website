'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { caseStudyBucan } from 'core/consts/caseStudyBucan';
import { useRevealChildren } from 'lib/motion/hooks/useRevealChildren';

/* Grosser Browserrahmen mit dem Startseiten-Screenshot; solange
   public/projekte/bucan/screen-home.webp fehlt, zeigt der Rahmen den
   dokumentierten Platzhalter (gleiche Mechanik wie beim Portraet). */
function ScreenSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [missing, setMissing] = useState(false);
  useRevealChildren(sectionRef);

  const { screen } = caseStudyBucan;

  /* Bildfehler vor der Hydration erkennen (onError feuert dann nicht mehr) */
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setMissing(true);
  }, []);

  return (
    <section className="case-screen" data-theme="light" data-rails ref={sectionRef}>
      <div className="container">
        <figure className={`case-browser browser-frame${missing ? ' missing' : ''}`} data-reveal>
          <div className="bf-bar" aria-hidden="true">
            <i />
            <i />
            <i />
            <span className="bf-url">{screen.url}</span>
          </div>
          <div className="bf-body">
            <Image
              ref={imgRef}
              src={screen.bildSrc}
              alt={screen.bildAlt}
              width={1440}
              height={920}
              onError={() => setMissing(true)}
            />
            <div className="missing-note" aria-hidden="true">
              {screen.platzhalter}
              <small>{screen.platzhalterPfad}</small>
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}

export default ScreenSection;
