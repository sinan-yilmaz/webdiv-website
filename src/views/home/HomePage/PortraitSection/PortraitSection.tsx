'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, RefObject } from 'react';
import Image from 'next/image';
import { portraet } from 'core/consts/content';
import { useFrame } from 'lib/motion/hooks/useFrame';
import { useInViewFlag } from 'lib/motion/hooks/useInViewFlag';
import { useInViewOnce } from 'lib/motion/hooks/useInViewOnce';
import { useRemeasure } from 'lib/motion/hooks/useRemeasure';
import { hasFinePointer } from 'lib/motion/services/frameLoop';
import { clamp, lerp, smoothstep } from 'lib/motion/services/interpolate';

/* Muss zum CSS-Punktraster passen (.bg-dots-dark: 26px Zellen, Punkt mittig) */
const DOT_GAP = 26;
const DOT_LUPE_RADIUS = 260;

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
  const dotsCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const dotsRef = useRef({
    mx: 0,
    my: 0,
    sx: 0,
    sy: 0,
    amt: 0,
    hover: false,
    cleared: true,
    w: 0,
    h: 0,
    pad: 0,
    dpr: 1,
    paper: '#F2EFE9',
    ground: '#0B0B0B',
  });
  const measureRef = useRef({ stackTop: 0, nextTop: Infinity, sectionH: 0, lastRise: NaN });
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

  /* Dot-Lupe: Zeigerposition fuer das Punktraster verfolgen (nur feine Pointer;
     Touch behaelt das statische CSS-Raster). Der StepEdge-Streifen vor dem
     Stack wird mitverfolgt, damit der Effekt an der Stufen-Grenze nicht
     abreisst, sobald der Zeiger in die Kantenzone wandert. */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !hasFinePointer()) return;
    const edge = (stackRef.current?.previousElementSibling ?? null) as HTMLElement | null;
    const targets = edge ? [section, edge] : [section];
    const st = dotsRef.current;
    /* pointerType-Filter statt blossem hasFinePointer: Touch-Taps (auch in
       der DevTools-Emulation und auf Hybrid-Geraeten) loesen die Lupe nicht aus */
    const handleEnter = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      st.hover = true;
    };
    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const rect = section.getBoundingClientRect();
      st.mx = event.clientX - rect.left;
      st.my = event.clientY - rect.top;
    };
    const handleLeave = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      st.hover = false;
    };
    targets.forEach((target) => {
      target.addEventListener('pointerenter', handleEnter as EventListener);
      target.addEventListener('pointermove', handleMove as EventListener, { passive: true });
      target.addEventListener('pointerleave', handleLeave as EventListener);
    });
    return () => {
      targets.forEach((target) => {
        target.removeEventListener('pointerenter', handleEnter as EventListener);
        target.removeEventListener('pointermove', handleMove as EventListener);
        target.removeEventListener('pointerleave', handleLeave as EventListener);
      });
    };
  }, [stackRef]);

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
    measureRef.current.sectionH = sectionRef.current?.offsetHeight ?? 0;
    /* Dot-Lupe: Canvas auf Sektionsgroesse bringen, Token-Farben nachziehen */
    const canvas = dotsCanvasRef.current;
    if (canvas) {
      const st = dotsRef.current;
      st.dpr = Math.min(window.devicePixelRatio || 1, 2);
      st.w = canvas.clientWidth;
      st.h = canvas.clientHeight;
      canvas.width = Math.round(st.w * st.dpr);
      canvas.height = Math.round(st.h * st.dpr);
      const rootStyle = getComputedStyle(document.documentElement);
      st.paper = rootStyle.getPropertyValue('--paper').trim() || '#F2EFE9';
      st.ground = rootStyle.getPropertyValue('--dark-photo').trim() || '#0B0B0B';
      /* Ueberstand nach oben = Hoehe des StepEdge-Streifens (3 x --step-h) */
      st.pad = (parseFloat(rootStyle.getPropertyValue('--step-h')) || 0) * 3;
      st.cleared = true;
    }
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
    const sceneOpacity = 0.15 + 0.85 * fadeIn * fadeOut;
    scene.style.opacity = String(sceneOpacity);
    /* Kobalt-Kritzel zeichnet sich beim Einfahren; der Echo-Strich zieht wie
       ein zweiter Stift-Durchgang leicht versetzt nach */
    const draw = clamp((f - 0.18) / 0.5, 0, 1);
    strokesRef.current.forEach(({ path, len }, index) => {
      const p = index === 0 ? draw : clamp((draw - 0.12) / 0.88, 0, 1);
      path.style.strokeDashoffset = String(len * (1 - smoothstep(p)));
    });
    /* Dot-Lupe: Punkte des Rasters wachsen und hellen rund um den Zeiger auf.
       Das Canvas liegt ueber der Szene; jeder Punkt wird mit der Vignetten-
       Maske des Fotos (Spiegel der CSS-mask auf .portrait-figure img, inkl.
       Parallax und -4 %-Crop-Shift) gedaempft – die Lupe laeuft dadurch um
       die sichtbare Person herum statt hart am Fotorechteck abzureissen */
    const canvas = dotsCanvasRef.current;
    const ctx2d = canvas?.getContext('2d');
    if (canvas && ctx2d) {
      const dots = dotsRef.current;
      dots.amt = lerp(dots.amt, dots.hover ? 1 : 0, 0.12);
      if (dots.amt < 0.01) {
        if (!dots.cleared) {
          ctx2d.clearRect(0, 0, canvas.width, canvas.height);
          dots.cleared = true;
        }
      } else {
        dots.cleared = false;
        dots.sx = lerp(dots.sx, dots.mx, 0.25);
        dots.sy = lerp(dots.sy, dots.my, 0.25);
        /* Ursprung liegt auf der Sektionsoberkante; der StepEdge-Streifen
           darueber ist der negative y-Bereich des Canvas */
        ctx2d.setTransform(dots.dpr, 0, 0, dots.dpr, 0, dots.pad * dots.dpr);
        ctx2d.clearRect(0, -dots.pad, dots.w, dots.h);
        /* Kanten-Wachstum (Spiegel der StepEdge-Formel): staucht und
           beschneidet die Punkte auf der Ziggurat-Flaeche */
        const edgeP = clamp((vh - (stackTop - dots.pad - scrollY)) / (0.45 * vh), 0, 1);
        const figH = 0.66 * vh;
        const figW = figH * 0.75;
        const maskCx = dots.w / 2 - 0.04 * figW;
        const maskCy = (0.17 - 0.12 * f) * vh + 0.4 * figH;
        const maskRx = 0.74 * figW;
        const maskRy = 0.62 * figH;
        const half = DOT_GAP / 2;
        const i0 = Math.max(0, Math.floor((dots.sx - DOT_LUPE_RADIUS - half) / DOT_GAP));
        const j0 = Math.floor((dots.sy - DOT_LUPE_RADIUS - half) / DOT_GAP);
        const i1 = Math.floor((dots.sx + DOT_LUPE_RADIUS - half) / DOT_GAP);
        const j1 = Math.floor((dots.sy + DOT_LUPE_RADIUS - half) / DOT_GAP);
        ctx2d.fillStyle = dots.paper;
        ctx2d.strokeStyle = dots.paper;
        ctx2d.lineWidth = 1;
        for (let i = i0; i <= i1; i += 1) {
          const x = half + i * DOT_GAP;
          if (x > dots.w) break;
          for (let j = j0; j <= j1; j += 1) {
            const y = half + j * DOT_GAP;
            if (y < -dots.pad - half) continue;
            if (y > dots.h - dots.pad) break;
            let yDraw = y;
            if (y < 0) {
              /* Streifen: nur auf der dunklen Ziggurat-Flaeche zeichnen und
                 wie das CSS-Raster mit dem Kanten-Wachstum stauchen */
              const dxMid = Math.abs(x - dots.w / 2);
              const level =
                dxMid <= 0.1 * dots.w
                  ? dots.pad
                  : dxMid <= 0.28 * dots.w
                    ? (2 * dots.pad) / 3
                    : dots.pad / 3;
              if (-y > level) continue;
              yDraw = edgeP * y;
            }
            const d = Math.hypot(x - dots.sx, yDraw - dots.sy);
            const e = smoothstep(clamp(1 - d / DOT_LUPE_RADIUS, 0, 1)) * dots.amt;
            if (e < 0.02) continue;
            /* Vignette: opak bis 46 % des Masken-Radius, transparent ab 74 % */
            const pn = Math.hypot((x - maskCx) / maskRx, (yDraw - maskCy) / maskRy);
            const maskA = pn <= 0.46 ? 1 : pn >= 0.74 ? 0 : (0.74 - pn) / 0.28;
            const vis = 1 - maskA * sceneOpacity;
            if (e * vis < 0.02) continue;
            /* Punkt blendet aus, Ring blendet ein – am Effektrand nahtlos
               zum gefuellten CSS-Rasterpunkt */
            const fillAlpha = 0.07 * (1 - e) * vis;
            if (fillAlpha > 0.004) {
              ctx2d.globalAlpha = fillAlpha;
              ctx2d.beginPath();
              ctx2d.arc(x, yDraw, 1, 0, Math.PI * 2);
              ctx2d.fill();
            }
            ctx2d.globalAlpha = (0.06 + 0.14 * e) * vis;
            ctx2d.beginPath();
            ctx2d.arc(x, yDraw, 1 + 1.8 * e, 0, Math.PI * 2);
            ctx2d.stroke();
          }
        }
        ctx2d.globalAlpha = 1;
      }
    }
    /* Pills reiten auf der Oberkante der einfahrenden Statement-Sektion mit
       und halten ihren Bodenabstand zu ihr, statt dahinter zu verschwinden.
       drop gleicht die Mobil-Browserleiste aus: faehrt sie ein, reicht der
       sichtbare Viewport unter die 100svh-Sektion (vh > svh) – die Pills
       kleben am sichtbaren Rand statt am svh-Rand, und beim Reiten heben
       sich die vh-Spruenge in rise und drop auf (kein Teleport) */
    const pills = pillsRef.current;
    if (!pills) return;
    const drop = Math.max(0, vh - measureRef.current.sectionH);
    const pillShift = Math.round((clamp(rise, 0, vh) - drop) * 2) / 2;
    if (pillShift === measureRef.current.lastRise) return;
    measureRef.current.lastRise = pillShift;
    pills.style.transform = pillShift !== 0 ? `translateY(${-pillShift}px)` : '';
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
            draggable={false}
            onDragStart={(event) => event.preventDefault()}
            onError={() => setMissing(true)}
          />
          <div className="missing-note" aria-hidden="true">
            {portraet.platzhalter}
            <small>{portraet.platzhalterPfad}</small>
          </div>
        </figure>
      </div>
      {/* Dot-Lupe: liegt ueber der Szene; die Punkte werden pro Punkt mit der
          Vignetten-Maske des Fotos abgeschwaecht, damit sie um die Person
          herum erscheinen, aber nicht auf dem sichtbaren Portraet */}
      <canvas className="portrait-dots" ref={dotsCanvasRef} aria-hidden="true" />
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
