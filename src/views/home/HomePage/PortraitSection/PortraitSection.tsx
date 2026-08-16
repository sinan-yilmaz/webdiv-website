'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, RefObject } from 'react';
import Image from 'next/image';
import { portraet } from 'core/consts/content';
import { useFrame } from 'lib/motion/hooks/useFrame';
import { useInViewFlag } from 'lib/motion/hooks/useInViewFlag';
import { useInViewOnce } from 'lib/motion/hooks/useInViewOnce';
import { useRemeasure } from 'lib/motion/hooks/useRemeasure';
import { clamp, smoothstep } from 'lib/motion/services/interpolate';

type PortraitSectionProps = {
  /* Stack-Wrapper (Portraet + Statement) – Bezug fuer Parallax und Tick-Gating,
     weil die sticky Sektion selbst keine stabile Position liefert */
  stackRef: RefObject<HTMLDivElement | null>;
};

/* Sticky Portraet: Parallax ±6 % svh, Kobalt-Strich zeichnet sich ueber den
   Einfahr-Fortschritt, Pills gestaggert. Solange public/portrait.jpg fehlt,
   zeigt die Figur den dokumentierten Platzhalter. */
function PortraitSection({ stackRef }: PortraitSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const figureRef = useRef<HTMLElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const strokeSvgRef = useRef<SVGSVGElement | null>(null);
  const strokesRef = useRef<{ path: SVGPathElement; len: number }[]>([]);
  const pillsRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef({ stackTop: 0, nextTop: Infinity, lastRise: -1 });
  const [missing, setMissing] = useState(false);
  const stackVisibleRef = useInViewFlag(stackRef);
  const inView = useInViewOnce(sectionRef, 0.45);

  useEffect(() => {
    const svg = strokeSvgRef.current;
    if (!svg) return;
    strokesRef.current = Array.from(svg.querySelectorAll('path')).map((path) => {
      const len = path.getTotalLength();
      path.style.strokeDasharray = String(len);
      path.style.strokeDashoffset = String(len);
      return { path, len };
    });
  }, []);

  /* Bildfehler vor der Hydration erkennen (onError feuert dann nicht mehr) */
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setMissing(true);
  }, []);

  useRemeasure(() => {
    const stack = stackRef.current;
    if (!stack) return;
    measureRef.current.stackTop = stack.getBoundingClientRect().top + window.scrollY;
    /* Oberkante der nachfolgenden Sektion (Statement) – die Pills weichen ihr
       nach oben aus, statt hinter ihr zu verschwinden */
    const next = sectionRef.current?.nextElementSibling;
    measureRef.current.nextTop = next
      ? next.getBoundingClientRect().top + window.scrollY
      : Infinity;
  });

  useFrame(({ scrollY, smoothY, vh }) => {
    if (!stackVisibleRef.current) return;
    const figure = figureRef.current;
    const scene = sceneRef.current;
    if (!figure || !scene || strokesRef.current.length === 0) return;
    const { stackTop, nextTop } = measureRef.current;
    /* Parallax: Foto laeuft langsamer als der Scroll (ca. -12 % Sektionshoehe) */
    const f = clamp((smoothY - (stackTop - vh)) / (1.5 * vh), 0, 1);
    figure.style.transform = `translateX(-50%) translateY(${(0.06 - 0.12 * f) * vh}px)`;
    /* Hub der Statement-Oberkante ueber dem unteren Viewport-Rand; rohes
       scrollY statt smoothY, weil die Kante nativ scrollt */
    const rise = vh - (nextTop - scrollY);
    /* Szene (Strich + Foto) gewinnt mit der Scroll-Tiefe Deckkraft (voll ab
       f ~0.7) und verliert sie wieder, sobald die Statement-Kante ~22 % des
       Viewports erklommen hat – komplett gedimmt, bevor sie den Kopf erreicht.
       Opacity auf der Gruppe statt dem Foto: so verdeckt der Kopf die Linie
       auch im halbtransparenten Zustand */
    const fadeIn = smoothstep(clamp((f - 0.05) / 0.65, 0, 1));
    const fadeOut = 1 - smoothstep(clamp((rise / vh - 0.22) / 0.5, 0, 1));
    scene.style.opacity = String(0.15 + 0.85 * fadeIn * fadeOut);
    /* Kobalt-Kritzel zeichnet sich beim Einfahren; der Echo-Strich zieht wie
       ein zweiter Stift-Durchgang leicht versetzt nach */
    const draw = clamp((f - 0.18) / 0.5, 0, 1);
    strokesRef.current.forEach(({ path, len }, index) => {
      const p = index === 0 ? draw : clamp((draw - 0.12) / 0.88, 0, 1);
      path.style.strokeDashoffset = String(len * (1 - smoothstep(p)));
    });
    /* Pills reiten auf der Oberkante der einfahrenden Statement-Sektion mit
       und halten ihren Bodenabstand zu ihr, statt dahinter zu verschwinden */
    const pills = pillsRef.current;
    if (!pills) return;
    const pillRise = Math.round(clamp(rise, 0, vh) * 2) / 2;
    if (pillRise === measureRef.current.lastRise) return;
    measureRef.current.lastRise = pillRise;
    pills.style.transform = pillRise > 0 ? `translateY(${-pillRise}px)` : '';
  });

  return (
    <section
      className={`portrait bg-dots-dark${inView ? ' in' : ''}`}
      data-theme="dark"
      data-rails
      aria-label={portraet.ariaLabel}
      ref={sectionRef}
    >
      {/* Szene = Strich + Foto als Compositing-Gruppe: die Scroll-Opacity liegt
          auf der Gruppe, damit der Kopf die Linie auch halbtransparent verdeckt */}
      <div className="portrait-scene" ref={sceneRef}>
        {/* Kritzel-Strich: runde Schwung-Cluster links und rechts, breiter Bogen
            hinter dem Kopf; zweiter, duennerer Pfad als versetzter Stift-Durchgang */}
        <svg className="portrait-stroke" viewBox="0 0 920 220" aria-hidden="true" ref={strokeSvgRef}>
          <path
            className="stroke-main"
            d="M 8 178 C 48 150, 100 60, 145 60 C 172 60, 178 172, 205 172 C 232 172, 238 60, 265 60 C 292 60, 298 172, 325 172 C 380 172, 460 76, 560 76 C 610 76, 606 174, 650 174 C 694 174, 700 62, 744 62 C 788 62, 820 140, 898 114"
          />
          <path
            className="stroke-echo"
            d="M 15 185 C 54 158, 106 68, 151 68 C 178 68, 184 180, 211 180 C 238 180, 244 68, 271 68 C 298 68, 304 180, 331 180 C 386 180, 466 84, 566 84 C 616 84, 612 182, 656 182 C 700 182, 706 70, 750 70 C 794 70, 826 146, 902 122"
          />
        </svg>
        <figure className={`portrait-figure${missing ? ' missing' : ''}`} ref={figureRef}>
          <Image
            ref={imgRef}
            src={portraet.bildSrc}
            alt={portraet.bildAlt}
            width={900}
            height={1200}
            onError={() => setMissing(true)}
          />
          <div className="missing-note" aria-hidden="true">
            {portraet.platzhalter}
            <small>{portraet.platzhalterPfad}</small>
          </div>
        </figure>
      </div>
      <div className="portrait-pills" aria-label={portraet.pillsLabel} ref={pillsRef}>
        {portraet.pills.map((pill, index) => (
          <span key={pill} className="pill-label" style={{ '--ri': index } as CSSProperties}>
            {pill}
          </span>
        ))}
      </div>
    </section>
  );
}

export default PortraitSection;
