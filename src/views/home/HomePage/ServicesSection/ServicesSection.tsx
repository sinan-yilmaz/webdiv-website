'use client';

import { useRef } from 'react';
import { leistungen } from 'core/consts/content';
import { useFrame } from 'lib/motion/hooks/useFrame';
import { useInViewFlag } from 'lib/motion/hooks/useInViewFlag';
import { useRevealChildren } from 'lib/motion/hooks/useRevealChildren';
import { lerp } from 'lib/motion/services/interpolate';
import BoxObject from './BoxObject';

const objektArten = ['web', 'app', 'db'] as const;
const objektSway = [1, 1.35, 1.15] as const;

/* Eine Buehne pro Service: fast viewportfuellende Haarlinien-Karten, frei
   scrollend (kein Pin, kein Overlap); je Karte Nummer, Titel, Kobalt-
   Strich, Text und Keyword-Tags. Die Linienobjekte schwenken gelerpt zur
   Mausposition (--sway-x/-y an der Sektion, Staerke je Objekt via --sway-f). */
function ServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const swayRef = useRef({ x: 0, y: 0 });
  const visibleRef = useInViewFlag(sectionRef);
  useRevealChildren(sectionRef);

  useFrame(({ mouse }) => {
    if (!visibleRef.current) return;
    const section = sectionRef.current;
    if (!section) return;
    const sway = swayRef.current;
    sway.x = lerp(sway.x, mouse.nx, 0.06);
    sway.y = lerp(sway.y, mouse.ny, 0.06);
    section.style.setProperty('--sway-x', sway.x.toFixed(3));
    section.style.setProperty('--sway-y', sway.y.toFixed(3));
  });

  return (
    <section className="services" id="leistungen" data-theme="light" data-rails ref={sectionRef}>
      <h2 className="sr-only">{leistungen.titel}</h2>
      <div className="container">
        <p className="eyebrow" data-reveal>
          {leistungen.eyebrow}
        </p>
        <div className="services-stack">
          {leistungen.eintraege.map((eintrag, index) => (
            <div key={eintrag.titel} className="svc-card" data-reveal>
              <span className="svc-card-num" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="svc-card-title">{eintrag.titel}</h3>
              <span className="svc-card-stroke" aria-hidden="true" />
              <p className="svc-card-text">{eintrag.text}</p>
              <ul className="svc-card-tags">
                {eintrag.tags.map((tag) => (
                  <li key={tag} className="svc-card-tag">
                    {tag}
                  </li>
                ))}
              </ul>
              <BoxObject kind={objektArten[index]} sway={objektSway[index]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
