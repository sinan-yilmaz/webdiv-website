'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { ablauf } from 'core/consts/content';
import { useInViewOnce } from 'lib/motion/hooks/useInViewOnce';
import { useRevealChildren } from 'lib/motion/hooks/useRevealChildren';
import { clamp } from 'lib/motion/services/interpolate';

/* Spalten gestaggert (CSS ueber .process.in), Nummern zaehlen 00 -> NN
   (520 ms, 90 ms Versatz). */
function ProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const countedRef = useRef(false);
  const inView = useInViewOnce(sectionRef, 0.3);
  useRevealChildren(sectionRef);

  useEffect(() => {
    if (!inView || countedRef.current) return;
    countedRef.current = true;
    const nums = Array.from(sectionRef.current?.querySelectorAll<HTMLElement>('.process-num') ?? []);
    nums.forEach((numEl, index) => {
      const target = parseInt(numEl.dataset.num ?? '0', 10);
      const t0 = performance.now() + index * 90;
      const dur = 520;
      numEl.textContent = '00';
      const step = (now: number) => {
        const t = clamp((now - t0) / dur, 0, 1);
        numEl.textContent = String(Math.round(target * t)).padStart(2, '0');
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, [inView]);

  return (
    <section
      className={`process${inView ? ' in' : ''}`}
      id="ablauf"
      data-theme="light"
      data-rails
      ref={sectionRef}
    >
      <div className="container">
        <p className="eyebrow" data-reveal>
          {ablauf.eyebrow}
        </p>
        <h2 className="h2" data-reveal style={{ '--ri': 1 } as CSSProperties}>
          {ablauf.titel}
        </h2>
        <div className="process-cols">
          {ablauf.schritte.map((schritt, index) => (
            <div key={schritt.nummer} className="process-col" style={{ '--ri': index } as CSSProperties}>
              <span className="process-num" data-num={schritt.nummer}>
                {schritt.nummer}
              </span>
              <h3>{schritt.titel}</h3>
              <p className="process-promise">{schritt.zusage}</p>
              <p>{schritt.text}</p>
            </div>
          ))}
        </div>
        <p className="process-note" data-reveal>
          {ablauf.hinweis}
        </p>
      </div>
    </section>
  );
}

export default ProcessSection;
