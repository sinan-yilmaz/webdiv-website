'use client';

import { useState } from 'react';
import { leistungen } from 'core/consts/content';
import MediaArea from './MediaArea';

/* Frei scrollend (kein Pin): Hover/Fokus waehlt den aktiven Eintrag, die
   Auswahl bleibt beim Verlassen stehen; Eintrag 1 startet offen. */
function ServicesSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="services" id="leistungen" data-theme="light" data-rails>
      <h2 className="sr-only">{leistungen.titel}</h2>
      <div className="pin-wrap">
        <div className="pin">
          <div className="container">
            <p className="eyebrow">{leistungen.eyebrow}</p>
            <div className="services-grid">
              <div className="services-list">
                {leistungen.eintraege.map((eintrag, index) => (
                  <div
                    key={eintrag.titel}
                    className={`svc${index === activeIdx ? ' active' : ''}`}
                    onFocus={() => setActiveIdx(index)}
                    onMouseEnter={() => setActiveIdx(index)}
                  >
                    <button className="svc-title" type="button">
                      {eintrag.titel}
                    </button>
                    <div className="svc-desc">
                      <div>
                        <p>{eintrag.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <MediaArea activeIdx={activeIdx} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
