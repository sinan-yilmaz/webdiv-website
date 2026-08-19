'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { caseStudyErp } from 'core/consts/caseStudyErp';
import { useRevealChildren } from 'lib/motion/hooks/useRevealChildren';

/* Zwei Browserrahmen nebeneinander (Nutzerverwaltung: Tabelle + Formular) –
   neutrale Labels statt URL, Beispieldaten statt Kundendaten. Solange die
   Dateien fehlen, zeigen die Rahmen den dokumentierten Platzhalter. */
function ScreenSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [missing, setMissing] = useState<readonly boolean[]>(() =>
    caseStudyErp.screens.eintraege.map(() => false),
  );
  useRevealChildren(sectionRef);

  const { screens } = caseStudyErp;

  const markMissing = (index: number) =>
    setMissing((prev) => (prev[index] ? prev : prev.map((value, i) => (i === index ? true : value))));

  /* Bildfehler vor der Hydration erkennen (onError feuert dann nicht mehr) */
  useEffect(() => {
    sectionRef.current?.querySelectorAll('img').forEach((img, index) => {
      if (img.complete && img.naturalWidth === 0) markMissing(index);
    });
  }, []);

  return (
    <section className="case-screen" data-theme="light" data-rails ref={sectionRef}>
      <div className="container">
        <div className="case-screens" data-reveal>
          {screens.eintraege.map((screen, index) => (
            <figure
              key={screen.bildSrc}
              className={`case-browser browser-frame${missing[index] ? ' missing' : ''}`}
            >
              <div className="bf-bar" aria-hidden="true">
                <i />
                <i />
                <i />
                <span className="bf-url">{screen.label}</span>
              </div>
              <div className="bf-body">
                <Image
                  src={screen.bildSrc}
                  alt={screen.bildAlt}
                  width={1568}
                  height={753}
                  onError={() => markMissing(index)}
                />
                <div className="missing-note" aria-hidden="true">
                  {screens.platzhalter}
                  <small>{screen.platzhalterPfad}</small>
                </div>
              </div>
            </figure>
          ))}
        </div>
        <p className="case-screens-note mono" data-reveal>
          {screens.hinweis}
        </p>
      </div>
    </section>
  );
}

export default ScreenSection;
