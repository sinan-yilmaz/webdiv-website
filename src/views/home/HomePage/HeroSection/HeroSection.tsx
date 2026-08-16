'use client';

import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { SignatureMark } from 'core/components/branding';
import { hero, marke } from 'core/consts/content';
import { useFrame } from 'lib/motion/hooks/useFrame';
import { useInViewFlag } from 'lib/motion/hooks/useInViewFlag';
import { useRemeasure } from 'lib/motion/hooks/useRemeasure';
import { hasFinePointer } from 'lib/motion/services/frameLoop';
import { clamp, lerp, smoothstep } from 'lib/motion/services/interpolate';

type HeroSectionProps = {
  revealed: boolean;
  /* Ruheposition der Unterschrift ueber der Wortmarke – Ziel des Preloader-Flugs */
  sigRef: RefObject<HTMLDivElement | null>;
};

const LUPE_RADIUS = 220;
const WAVE_INTERVAL = 3500;
const WAVE_DURATION = 3000;
const POINTER_IDLE = 2000;

type LetterState = { wght: number; wdth: number; lastW: number; lastD: number };

/* Lupe: pro Buchstabe zaehlt der 2D-Abstand zum Zeiger (y x 0,6 gewichtet),
   smoothstep-Falloff, Lerp 0.2/Frame auf font-variation-settings.
   Idle-Welle alle 3,5 s (3 s Durchlauf, Cosinus-Easing); die Maus uebernimmt
   nur, solange sie sich in den letzten 2 s ueber der Sektion bewegt hat – eine
   ruhende Maus oder ein Tab-Wechsel blockiert die Welle nicht.
   Touch erhaelt nur die Welle. */
function HeroSection({ revealed, sigRef }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const markRef = useRef<HTMLHeadingElement | null>(null);
  const stateRef = useRef({
    letters: [] as HTMLSpanElement[],
    centers: [] as number[],
    cur: [] as LetterState[],
    lineY: 0,
    radius: LUPE_RADIUS,
    base: { wght: 700, wdth: 105 },
    peak: { wght: 900, wdth: 125 },
    waveStart: 0,
    waveActive: false,
    lastWave: 0,
    hover: false,
    lastMove: 0,
    anchorX: 0,
    anchorY: 0,
  });
  const visibleRef = useInViewFlag(sectionRef);

  useEffect(() => {
    const st = stateRef.current;
    st.letters = Array.from(markRef.current?.querySelectorAll<HTMLSpanElement>('.ltr') ?? []);
    st.cur = st.letters.map(() => ({
      wght: st.base.wght,
      wdth: st.base.wdth,
      lastW: 0,
      lastD: 0,
    }));
    const section = sectionRef.current;
    if (!section) return;
    /* Nur Bewegungen ab 6 px zaehlen: Chrome feuert synthetische mousemove-
       Events unter einem ruhenden Cursor (etwa wenn sich die Buchstaben unter
       ihm verformen) – die wuerden die Idle-Welle sonst dauerhaft abbrechen. */
    const handleEnter = (event: MouseEvent) => {
      st.hover = true;
      st.anchorX = event.clientX;
      st.anchorY = event.clientY;
    };
    const handleMove = (event: MouseEvent) => {
      if (Math.hypot(event.clientX - st.anchorX, event.clientY - st.anchorY) < 6) return;
      st.anchorX = event.clientX;
      st.anchorY = event.clientY;
      st.lastMove = performance.now();
    };
    const handleLeave = () => {
      st.hover = false;
    };
    section.addEventListener('mouseenter', handleEnter);
    section.addEventListener('mousemove', handleMove, { passive: true });
    section.addEventListener('mouseleave', handleLeave);
    return () => {
      section.removeEventListener('mouseenter', handleEnter);
      section.removeEventListener('mousemove', handleMove);
      section.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  /* Wellen-Takt beim Reveal neu starten – die erste sichtbare Welle laeuft
     erst, wenn die Wortmarke ruhig steht, nicht mitten im Hochfahren. */
  useEffect(() => {
    if (!revealed) return;
    const st = stateRef.current;
    st.waveActive = false;
    st.lastWave = performance.now();
  }, [revealed]);

  useRemeasure(() => {
    const st = stateRef.current;
    const rootStyle = getComputedStyle(document.documentElement);
    st.base.wght = parseFloat(rootStyle.getPropertyValue('--hero-wght-base')) || 700;
    st.base.wdth = parseFloat(rootStyle.getPropertyValue('--hero-wdth-base')) || 105;
    st.peak.wght = parseFloat(rootStyle.getPropertyValue('--hero-wght-peak')) || 900;
    st.peak.wdth = parseFloat(rootStyle.getPropertyValue('--hero-wdth-peak')) || 125;
    /* Auf schmalen Screens schrumpft die Lupe mit, sonst erfasst sie die
       ganze Wortmarke auf einmal (und der Peak-Zustand wuerde ueberlaufen) */
    st.radius = Math.min(LUPE_RADIUS, window.innerWidth * 0.5);
    /* Wrap statt Mark messen: die Mark startet um 105 % verschoben (Reveal) */
    const wrap = wrapRef.current;
    if (!wrap) return;
    const wrapRect = wrap.getBoundingClientRect();
    st.lineY = wrapRect.top + wrapRect.height * 0.55 + window.scrollY;
    st.centers = st.letters.map((letter) => {
      const rect = letter.getBoundingClientRect();
      return rect.left + rect.width / 2;
    });
  });

  useFrame(({ now, scrollY, mouse }) => {
    if (!visibleRef.current) return;
    const st = stateRef.current;
    const fine = hasFinePointer();

    /* Maus zaehlt nur als aktiv, wenn sie sich kuerzlich bewegt hat – sonst
       (ruhende Maus, Fenster verlassen per Tastatur) laeuft die Welle weiter */
    const pointerActive = fine && st.hover && now - st.lastMove < POINTER_IDLE;

    /* Idle-Welle: ein virtueller Zeiger laeuft ueber die Zeile */
    let px: number | null = null;
    let py: number | null = null;
    if (!pointerActive && !st.waveActive && now - st.lastWave > WAVE_INTERVAL) {
      st.waveActive = true;
      st.waveStart = now;
    }
    if (st.waveActive) {
      const t = (now - st.waveStart) / WAVE_DURATION;
      if (t >= 1 || pointerActive) {
        st.waveActive = false;
        st.lastWave = now;
      } else {
        const e = 0.5 - 0.5 * Math.cos(Math.PI * t);
        px = -st.radius + e * (window.innerWidth + st.radius * 2);
        py = st.lineY - scrollY;
      }
    }
    if (pointerActive) {
      px = mouse.x;
      py = mouse.y;
    }

    st.letters.forEach((letter, i) => {
      let f = 0;
      if (px !== null && py !== null) {
        const dx = st.centers[i] - px;
        const dy = st.lineY - scrollY - py;
        const d = Math.hypot(dx, dy * 0.6);
        f = smoothstep(clamp(1 - d / st.radius, 0, 1));
      }
      const targetWght = st.base.wght + (st.peak.wght - st.base.wght) * f;
      const targetWdth = st.base.wdth + (st.peak.wdth - st.base.wdth) * f;
      const cur = st.cur[i];
      cur.wght = lerp(cur.wght, targetWght, 0.2);
      cur.wdth = lerp(cur.wdth, targetWdth, 0.2);
      const w = Math.round(cur.wght * 2) / 2;
      const d2 = Math.round(cur.wdth * 2) / 2;
      if (cur.lastW !== w || cur.lastD !== d2) {
        cur.lastW = w;
        cur.lastD = d2;
        letter.style.fontVariationSettings = `"wght" ${w}, "wdth" ${d2}`;
      }
    });
  });

  return (
    <section
      className={`hero bg-grid${revealed ? ' revealed' : ''}`}
      id="hero"
      data-theme="light"
      data-rails
      aria-label={hero.ariaLabel}
      ref={sectionRef}
    >
      <div className="hero-sig" ref={sigRef} aria-hidden="true">
        <SignatureMark />
      </div>
      <div className="hero-mark-wrap" ref={wrapRef}>
        <h1 className="hero-mark wordmark" aria-label={marke.wortmarke} ref={markRef}>
          {Array.from(marke.wortmarke).map((letter, index) => (
            <span key={index} className="ltr">
              {letter}
            </span>
          ))}
        </h1>
      </div>
      <p className="hero-sub sub-left">{hero.subLeft}</p>
      <p className="hero-sub sub-right">{hero.subRight}</p>
    </section>
  );
}

export default HeroSection;
