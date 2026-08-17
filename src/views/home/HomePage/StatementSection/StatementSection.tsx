'use client';

import { useEffect, useRef } from 'react';
import { statement } from 'core/consts/content';
import { useFrame } from 'lib/motion/hooks/useFrame';
import { useInViewFlag } from 'lib/motion/hooks/useInViewFlag';
import { useRemeasure } from 'lib/motion/hooks/useRemeasure';
import { clamp, lerp } from 'lib/motion/services/interpolate';

type FloatObject = { el: HTMLElement; depth: number; phase: number; mx: number; my: number };

/* Text in fuellbare Wort-Spans zerlegen (Whitespace bleibt als Textknoten) */
function renderWords(parts: string[]) {
  return parts.map((part, index) => {
    if (!part) return null;
    if (/^\s+$/.test(part)) return part;
    return (
      <span key={index} className="w">
        {part}
      </span>
    );
  });
}

/* Frei scrollend (kein Pin): p = Viewport-Durchlauf 0→1 (Oberkante am unteren
   Rand → Unterkante am oberen Rand). Woerter fuellen sich wortweise beim
   Einfahren (p 0.24–0.54), die Kobalt-Linie zeichnet sich im unteren Drittel
   (p 0.46–0.82); die Buehne laeuft mit ~0.82x Scrolltempo (Lag 0.18, weiches
   Verweilen). Vier Objekte pendeln in flachem 3D (24 s Zyklus, ±6°
   Zeiger-Reaktion, leichtes Floaten). */
function StatementSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const linePathRef = useRef<SVGPathElement | null>(null);
  const stateRef = useRef({
    top: 0,
    height: 1,
    lineLen: 0,
    words: [] as HTMLSpanElement[],
    wordOpacities: [] as number[],
    objects: [] as FloatObject[],
  });
  const visibleRef = useInViewFlag(sectionRef);

  useEffect(() => {
    const st = stateRef.current;
    st.words = Array.from(textRef.current?.querySelectorAll<HTMLSpanElement>('.w') ?? []);
    st.wordOpacities = st.words.map(() => -1);
    st.objects = Array.from(
      sectionRef.current?.querySelectorAll<HTMLElement>('.float-obj') ?? [],
    ).map((el, index) => ({
      el,
      depth: parseFloat(el.dataset.depth || '1'),
      phase: index * 1.7,
      mx: 0,
      my: 0,
    }));
    const path = linePathRef.current;
    if (!path) return;
    st.lineLen = path.getTotalLength();
    path.style.strokeDasharray = String(st.lineLen);
    path.style.strokeDashoffset = String(st.lineLen);
  }, []);

  useRemeasure(() => {
    const section = sectionRef.current;
    if (!section) return;
    const st = stateRef.current;
    st.top = section.getBoundingClientRect().top + window.scrollY;
    st.height = section.offsetHeight;
  });

  useFrame(({ now, smoothY, vh, mouse }) => {
    if (!visibleRef.current) return;
    const st = stateRef.current;
    const travel = st.height + vh;
    const p = clamp((smoothY + vh - st.top) / travel, 0, 1);

    /* Weiches Verweilen: Buehne laeuft dem Scroll mit Lag 0.18 hinterher und
       bleibt so laenger im Bild, ohne je stillzustehen */
    const stage = stageRef.current;
    if (stage) {
      stage.style.transform = `translate3d(0, ${((p - 0.5) * travel * 0.18).toFixed(1)}px, 0)`;
    }

    /* Woerter fuellen sich Wort fuer Wort auf 100 % (pro Wort ±1 Ueberlappung) */
    const n = st.words.length;
    const x = clamp((p - 0.24) / 0.3, 0, 1) * (n + 2);
    st.words.forEach((word, i) => {
      const wp = clamp(x - i, 0, 1);
      const o = 0.28 + 0.72 * wp;
      if (st.wordOpacities[i] !== o) {
        st.wordOpacities[i] = o;
        word.style.setProperty('--wo', o.toFixed(3));
      }
    });

    /* Kobalt-Linie zeichnet sich synchron zum Scroll */
    const path = linePathRef.current;
    if (path) {
      const dl = clamp((p - 0.46) / 0.36, 0, 1);
      path.style.strokeDashoffset = String(st.lineLen * (1 - dl));
    }

    /* Objekte: langsame Rotation (24 s/Umdrehung als Sinus-Pendel ±24°),
       minimale Zeiger-Reaktion (Lerp 0.04) */
    const baseRot = (now / 24000) * 360;
    st.objects.forEach((obj) => {
      obj.mx = lerp(obj.mx, mouse.nx, 0.04);
      obj.my = lerp(obj.my, mouse.ny, 0.04);
      const rotY =
        Math.sin(((baseRot + obj.phase * 40) * Math.PI) / 180) * 24 + obj.mx * 6 * obj.depth;
      const rotX =
        10 +
        Math.cos(((baseRot * 0.7 + obj.phase * 60) * Math.PI) / 180) * 6 +
        obj.my * -4 * obj.depth;
      const fy = Math.sin(now / 2400 + obj.phase) * 9;
      obj.el.style.transform = `perspective(1100px) translateY(${fy}px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
  });

  const leadParts = statement.lead.split(/(\s+)/);
  const restParts = statement.rest.split(/(\s+)/);

  return (
    <section className="statement" data-theme="dark" aria-label={statement.ariaLabel} ref={sectionRef}>
      <div className="statement-inner bg-dots-dark" data-rails>
        <div className="statement-stage" ref={stageRef}>
          <div className="float-obj obj-browser" data-depth="1">
            <svg viewBox="0 0 190 140" strokeWidth="1.5" aria-hidden="true">
              <rect className="st-paper" x="1" y="1" width="188" height="138" rx="10" />
              <line className="st-paper" x1="1" y1="26" x2="189" y2="26" />
              <circle className="st-paper" cx="14" cy="13.5" r="2.6" />
              <circle className="st-paper" cx="24" cy="13.5" r="2.6" />
              <circle className="st-paper" cx="34" cy="13.5" r="2.6" />
              <rect className="st-paper" x="48" y="8" width="94" height="11" rx="5.5" />
              <rect className="st-cobalt" x="14" y="40" width="112" height="46" rx="4" />
              <line className="st-paper" x1="14" y1="102" x2="150" y2="102" />
              <line className="st-paper" x1="14" y1="114" x2="104" y2="114" />
            </svg>
          </div>

          <div className="float-obj obj-appcard" data-depth="1.6">
            <svg viewBox="0 0 170 150" strokeWidth="1.5" aria-hidden="true">
              <rect className="st-paper" x="1" y="1" width="168" height="148" rx="10" />
              <line className="st-paper" x1="1" y1="28" x2="169" y2="28" />
              <line className="st-paper" x1="14" y1="48" x2="96" y2="48" />
              <line className="st-paper" x1="14" y1="66" x2="96" y2="66" />
              <line className="st-paper" x1="14" y1="84" x2="96" y2="84" />
              <line className="st-paper" x1="14" y1="102" x2="96" y2="102" />
              <line className="st-paper" x1="55" y1="40" x2="55" y2="110" />
              <line className="st-cobalt" x1="112" y1="56" x2="156" y2="56" />
              <line className="st-cobalt" x1="112" y1="82" x2="156" y2="82" />
              <rect className="st-cobalt" x="112" y="100" width="44" height="16" rx="8" />
            </svg>
          </div>

          <div className="float-obj obj-db" data-depth="1.3">
            <svg viewBox="0 0 130 150" strokeWidth="1.5" aria-hidden="true">
              <ellipse className="st-paper" cx="65" cy="24" rx="56" ry="17" />
              <line className="st-paper" x1="9" y1="24" x2="9" y2="126" />
              <line className="st-paper" x1="121" y1="24" x2="121" y2="126" />
              <path className="st-paper" d="M9 126 C 9 135.4, 34 143, 65 143 C 96 143, 121 135.4, 121 126" />
              <path className="st-paper" d="M9 58 C 9 67.4, 34 75, 65 75 C 96 75, 121 67.4, 121 58" />
              <path className="st-cobalt" d="M9 92 C 9 101.4, 34 109, 65 109 C 96 109, 121 101.4, 121 92" />
            </svg>
          </div>

          <div className="float-obj obj-mark" data-depth="1.8">
            <svg viewBox="0 0 120 120" strokeWidth="6" aria-hidden="true">
              <path className="st-cobalt" d="M16 91.5 L32 28.5" />
              <path className="st-cobalt" d="M48 27 L104 60 L48 93" strokeLinejoin="miter" />
            </svg>
          </div>

          <p className="statement-text display2" ref={textRef}>
            {/* Lead fuellt sich wie der Rest (statt dauerhaft weiss), nur fett */}
            <strong className="w-strong">{renderWords(leadParts)}</strong>
            {renderWords(restParts)}
          </p>

          <svg className="statement-line" viewBox="0 0 1000 520" aria-hidden="true">
            <path
              ref={linePathRef}
              d="M64 22 C 360 86, 820 66, 896 178 C 948 266, 320 282, 264 384 C 238 452, 536 470, 520 520"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default StatementSection;
