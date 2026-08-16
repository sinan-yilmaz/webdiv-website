'use client';

import { useRef, useState } from 'react';
import type { FocusEvent } from 'react';
import { leistungen } from 'core/consts/content';
import { useFrame } from 'lib/motion/hooks/useFrame';
import { useInViewFlag } from 'lib/motion/hooks/useInViewFlag';
import { useRemeasure } from 'lib/motion/hooks/useRemeasure';
import { clamp } from 'lib/motion/services/interpolate';
import MediaArea from './MediaArea';

/* Pin ueber 200 vh (Wrapper 300 vh): aktiver Eintrag = floor(p x 3), kein Snap;
   Hover/Fokus uebersteuert den Scroll-Zustand. */
function ServicesSection() {
  const pinWrapRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef({ top: 0, height: 1 });
  const [scrollIdx, setScrollIdx] = useState(0);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const visibleRef = useInViewFlag(pinWrapRef);

  useRemeasure(() => {
    const pinWrap = pinWrapRef.current;
    if (!pinWrap) return;
    measureRef.current.top = pinWrap.getBoundingClientRect().top + window.scrollY;
    measureRef.current.height = pinWrap.offsetHeight;
  });

  useFrame(({ smoothY, vh }) => {
    if (!visibleRef.current) return;
    const { top, height } = measureRef.current;
    const p = clamp((smoothY - top) / (height - vh), 0, 0.999);
    setScrollIdx(Math.floor(p * 3));
  });

  const activeIdx = hoverIdx ?? scrollIdx;

  const handleListLeave = () => setHoverIdx(null);

  const handleListBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHoverIdx(null);
  };

  return (
    <section className="services" id="leistungen" data-theme="light" data-rails>
      <h2 className="sr-only">{leistungen.titel}</h2>
      <div className="pin-wrap" ref={pinWrapRef}>
        <div className="pin">
          <div className="container">
            <p className="eyebrow">{leistungen.eyebrow}</p>
            <div className="services-grid">
              <div className="services-list" onBlur={handleListBlur} onMouseLeave={handleListLeave}>
                {leistungen.eintraege.map((eintrag, index) => (
                  <div
                    key={eintrag.titel}
                    className={`svc${index === activeIdx ? ' active' : ''}`}
                    onFocus={() => setHoverIdx(index)}
                    onMouseEnter={() => setHoverIdx(index)}
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
