'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projekte } from 'core/consts/content';
import { useFrame } from 'lib/motion/hooks/useFrame';
import { useRevealChildren } from 'lib/motion/hooks/useRevealChildren';
import { hasFinePointer } from 'lib/motion/services/frameLoop';
import { clamp, lerp } from 'lib/motion/services/interpolate';

/* Vorschaubild folgt dem Zeiger mit Lerp 0.14 (+210 px Versatz, Rotation
   proportional zur Geschwindigkeit), Cursor-Pill mit Lerp 0.26 – nur Desktop. */
function ProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const pillRef = useRef<HTMLDivElement | null>(null);
  const followRef = useRef({ on: false, tx: 0, ty: 0, x: 0, y: 0, px: 0, py: 0, vx: 0 });
  const [followOn, setFollowOn] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [missing, setMissing] = useState<readonly boolean[]>(() =>
    projekte.eintraege.map(() => false),
  );
  useRevealChildren(sectionRef);

  const markMissing = (index: number) =>
    setMissing((prev) => (prev[index] ? prev : prev.map((value, i) => (i === index ? true : value))));

  /* Bildfehler vor der Hydration erkennen (onError feuert dann nicht mehr) */
  useEffect(() => {
    thumbRef.current?.querySelectorAll('img').forEach((img, index) => {
      if (img.complete && img.naturalWidth === 0) markMissing(index);
    });
  }, []);

  const handleRowEnter = (event: MouseEvent<HTMLAnchorElement>, index: number) => {
    if (!hasFinePointer()) return;
    setActiveIndex(index);
    const follow = followRef.current;
    follow.on = true;
    follow.x = event.clientX;
    follow.tx = event.clientX;
    follow.y = event.clientY;
    follow.ty = event.clientY;
    setFollowOn(true);
  };

  const handleRowLeave = () => {
    followRef.current.on = false;
    setFollowOn(false);
  };

  useFrame(({ mouse }) => {
    const follow = followRef.current;
    if (!follow.on && Math.abs(follow.x - follow.tx) < 0.5) return;
    follow.tx = mouse.x;
    follow.ty = mouse.y;
    follow.vx = lerp(follow.vx, follow.tx - follow.x, 0.2);
    follow.x = lerp(follow.x, follow.tx, 0.14);
    follow.y = lerp(follow.y, follow.ty, 0.14);
    follow.px = lerp(follow.px, follow.tx, 0.26);
    follow.py = lerp(follow.py, follow.ty, 0.26);
    const rot = clamp(follow.vx * 0.35, -6, 6);
    if (thumbRef.current) {
      thumbRef.current.style.transform = `translate(-50%, -50%) translate3d(${follow.x + 210}px, ${follow.y - 8}px, 0) rotate(${rot}deg) scale(1)`;
    }
    if (pillRef.current) {
      pillRef.current.style.transform = `translate(-50%, -50%) translate3d(${follow.px}px, ${follow.py}px, 0) scale(1)`;
    }
  });

  return (
    <>
      <section className="projects" id="projekte" data-theme="light" data-rails ref={sectionRef}>
        <div className="container">
          <p className="eyebrow" data-reveal>
            {projekte.eyebrow}
          </p>
          <h2 className="h2" data-reveal style={{ '--ri': 1 } as CSSProperties}>
            {projekte.titel}
          </h2>
          <div className="project-list" data-reveal style={{ '--ri': 2 } as CSSProperties}>
            {projekte.eintraege.map((projekt, index) => (
              <Link
                key={projekt.href}
                className="project-row"
                href={projekt.href}
                style={
                  {
                    '--row-bg': projekt.farben.flaeche,
                    '--row-ink': projekt.farben.tinte,
                  } as CSSProperties
                }
                onMouseEnter={(event) => handleRowEnter(event, index)}
                onMouseLeave={handleRowLeave}
              >
                <span className="project-year">{projekt.jahr}</span>
                <span className="project-main">
                  <span className="project-title">{projekt.titel}</span>
                  <span className="project-sub">{projekt.sub}</span>
                </span>
                <span className="project-meta">{projekt.meta}</span>
                <span className="project-arrow" aria-hidden="true">
                  <svg viewBox="0 0 18 18" fill="none" strokeWidth="1.5">
                    <path d="M2 9 H16 M10 3 L16 9 L10 15" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div className={`proj-thumb${followOn ? ' on' : ''}`} aria-hidden="true" ref={thumbRef}>
        <span className="proj-thumb-note">{projekte.thumbPlatzhalter}</span>
        {projekte.eintraege.map((projekt, index) => (
          <Image
            key={projekt.href}
            className={`proj-thumb-img${index === activeIndex && !missing[index] ? ' on' : ''}`}
            src={projekt.thumbSrc}
            alt=""
            width={480}
            height={320}
            onError={() => markMissing(index)}
          />
        ))}
      </div>
      <div className={`cursor-pill${followOn ? ' on' : ''}`} aria-hidden="true" ref={pillRef}>
        {projekte.cursorPill}
      </div>
    </>
  );
}

export default ProjectsSection;
