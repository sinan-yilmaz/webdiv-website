'use client';

import { useEffect, useRef } from 'react';
import { leistungen } from 'core/consts/content';
import { useFrame } from 'lib/motion/hooks/useFrame';
import { useInViewFlag } from 'lib/motion/hooks/useInViewFlag';
import { useRemeasure } from 'lib/motion/hooks/useRemeasure';
import { useRevealChildren } from 'lib/motion/hooks/useRevealChildren';
import { hasFinePointer } from 'lib/motion/services/frameLoop';
import { clamp, lerp, smoothstep } from 'lib/motion/services/interpolate';
import BoxObject from './BoxObject';

const objektArten = ['web', 'app', 'db'] as const;
const objektSway = [1, 1.35, 1.15] as const;

/* Dot-Lupe wie im Portraet: muss zum CSS-Punktraster passen
   (.bg-dots-dark: 26px Zellen, Punkt mittig) */
const DOT_GAP = 26;
const DOT_LUPE_RADIUS = 260;

type DotsState = {
  mx: number;
  my: number;
  sx: number;
  sy: number;
  amt: number;
  hover: boolean;
  cleared: boolean;
  w: number;
  h: number;
  dpr: number;
};

/* Eine Buehne pro Service: fast viewportfuellende Haarlinien-Karten, frei
   scrollend (kein Pin, kein Overlap); je Karte Nummer, Titel, Kobalt-
   Strich, Text und Keyword-Tags. Die Linienobjekte schwenken gelerpt zur
   Mausposition (--sway-x/-y an der Sektion, Staerke je Objekt via --sway-f);
   beim Mausfahren in einer Karte waechst die Dot-Lupe des Portraets um den
   Zeiger (nur feine Pointer, Touch bleibt statisch). */
function ServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const swayRef = useRef({ x: 0, y: 0 });
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsCanvasRef = useRef<(HTMLCanvasElement | null)[]>([]);
  const dotsRef = useRef<DotsState[]>(
    leistungen.eintraege.map(() => ({
      mx: 0,
      my: 0,
      sx: 0,
      sy: 0,
      amt: 0,
      hover: false,
      cleared: true,
      w: 0,
      h: 0,
      dpr: 1,
    })),
  );
  const paperRef = useRef('#F2EFE9');
  const visibleRef = useInViewFlag(sectionRef);
  useRevealChildren(sectionRef);

  /* Dot-Lupe: Zeigerposition je Karte verfolgen (nur feine Pointer; der
     pointerType-Filter haelt Touch-Taps wie im Portraet draussen) */
  useEffect(() => {
    if (!hasFinePointer()) return undefined;
    const cleanups = cardsRef.current.map((card, index) => {
      if (!card) return undefined;
      const st = dotsRef.current[index];
      const handleEnter = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') return;
        st.hover = true;
      };
      const handleMove = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') return;
        const rect = card.getBoundingClientRect();
        st.mx = event.clientX - rect.left;
        st.my = event.clientY - rect.top;
      };
      const handleLeave = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') return;
        st.hover = false;
      };
      card.addEventListener('pointerenter', handleEnter as EventListener);
      card.addEventListener('pointermove', handleMove as EventListener, { passive: true });
      card.addEventListener('pointerleave', handleLeave as EventListener);
      return () => {
        card.removeEventListener('pointerenter', handleEnter as EventListener);
        card.removeEventListener('pointermove', handleMove as EventListener);
        card.removeEventListener('pointerleave', handleLeave as EventListener);
      };
    });
    return () => {
      cleanups.forEach((cleanup) => cleanup && cleanup());
    };
  }, []);

  useRemeasure(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    paperRef.current = rootStyle.getPropertyValue('--paper').trim() || '#F2EFE9';
    dotsCanvasRef.current.forEach((canvas, index) => {
      if (!canvas) return;
      const st = dotsRef.current[index];
      st.dpr = Math.min(window.devicePixelRatio || 1, 2);
      st.w = canvas.clientWidth;
      st.h = canvas.clientHeight;
      canvas.width = Math.round(st.w * st.dpr);
      canvas.height = Math.round(st.h * st.dpr);
      st.cleared = true;
    });
  });

  useFrame(({ mouse }) => {
    if (!visibleRef.current) return;
    const section = sectionRef.current;
    if (!section) return;
    const sway = swayRef.current;
    sway.x = lerp(sway.x, mouse.nx, 0.06);
    sway.y = lerp(sway.y, mouse.ny, 0.06);
    section.style.setProperty('--sway-x', sway.x.toFixed(3));
    section.style.setProperty('--sway-y', sway.y.toFixed(3));
    /* Dot-Lupe je Karte: Punkte wachsen und hellen rund um den Zeiger auf
       (Spiegel der Portraet-Lupe, ohne deren Foto-Maske und Kanten-Zone) */
    dotsRef.current.forEach((st, index) => {
      const canvas = dotsCanvasRef.current[index];
      const ctx2d = canvas?.getContext('2d');
      if (!canvas || !ctx2d) return;
      st.amt = lerp(st.amt, st.hover ? 1 : 0, 0.12);
      if (st.amt < 0.01) {
        if (!st.cleared) {
          ctx2d.clearRect(0, 0, canvas.width, canvas.height);
          st.cleared = true;
        }
        return;
      }
      st.cleared = false;
      st.sx = lerp(st.sx, st.mx, 0.25);
      st.sy = lerp(st.sy, st.my, 0.25);
      ctx2d.setTransform(st.dpr, 0, 0, st.dpr, 0, 0);
      ctx2d.clearRect(0, 0, st.w, st.h);
      const half = DOT_GAP / 2;
      const i0 = Math.max(0, Math.floor((st.sx - DOT_LUPE_RADIUS - half) / DOT_GAP));
      const j0 = Math.max(0, Math.floor((st.sy - DOT_LUPE_RADIUS - half) / DOT_GAP));
      const i1 = Math.floor((st.sx + DOT_LUPE_RADIUS - half) / DOT_GAP);
      const j1 = Math.floor((st.sy + DOT_LUPE_RADIUS - half) / DOT_GAP);
      ctx2d.fillStyle = paperRef.current;
      ctx2d.strokeStyle = paperRef.current;
      ctx2d.lineWidth = 1;
      for (let i = i0; i <= i1; i += 1) {
        const x = half + i * DOT_GAP;
        if (x > st.w) break;
        for (let j = j0; j <= j1; j += 1) {
          const y = half + j * DOT_GAP;
          if (y > st.h) break;
          const d = Math.hypot(x - st.sx, y - st.sy);
          const e = smoothstep(clamp(1 - d / DOT_LUPE_RADIUS, 0, 1)) * st.amt;
          if (e < 0.02) continue;
          /* Punkt blendet aus, Ring blendet ein – am Effektrand nahtlos
             zum gefuellten CSS-Rasterpunkt */
          const fillAlpha = 0.07 * (1 - e);
          if (fillAlpha > 0.004) {
            ctx2d.globalAlpha = fillAlpha;
            ctx2d.beginPath();
            ctx2d.arc(x, y, 1, 0, Math.PI * 2);
            ctx2d.fill();
          }
          ctx2d.globalAlpha = 0.06 + 0.14 * e;
          ctx2d.beginPath();
          ctx2d.arc(x, y, 1 + 1.8 * e, 0, Math.PI * 2);
          ctx2d.stroke();
        }
      }
      ctx2d.globalAlpha = 1;
    });
  });

  return (
    <section className="services" id="leistungen" data-theme="dark" data-rails ref={sectionRef}>
      <h2 className="sr-only">{leistungen.titel}</h2>
      <div className="container">
        <p className="eyebrow" data-reveal>
          {leistungen.eyebrow}
        </p>
        <div className="services-stack">
          {leistungen.eintraege.map((eintrag, index) => (
            <div
              key={eintrag.titel}
              className="svc-card"
              data-reveal
              ref={(node) => {
                cardsRef.current[index] = node;
              }}
            >
              <canvas
                className="svc-card-dots"
                ref={(node) => {
                  dotsCanvasRef.current[index] = node;
                }}
                aria-hidden="true"
              />
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
