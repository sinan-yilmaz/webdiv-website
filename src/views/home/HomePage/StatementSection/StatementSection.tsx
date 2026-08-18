'use client';

import { useEffect, useRef } from 'react';
import { statement } from 'core/consts/content';
import { useFrame } from 'lib/motion/hooks/useFrame';
import { useInViewFlag } from 'lib/motion/hooks/useInViewFlag';
import { useRemeasure } from 'lib/motion/hooks/useRemeasure';
import { clamp, lerp, smoothstep } from 'lib/motion/services/interpolate';

type FloatObject = { el: HTMLElement; depth: number; phase: number; mx: number; my: number };

/* Text in fuellbare Wort-Spans zerlegen (Whitespace bleibt als Textknoten);
   accents-Woerter fuellen sich ins Kobalt statt Papier-Weiss */
function renderWords(parts: string[], accents: readonly string[] = []) {
  return parts.map((part, index) => {
    if (!part) return null;
    if (/^\s+$/.test(part)) return part;
    return (
      <span key={index} className={accents.includes(part) ? 'w w-accent' : 'w'}>
        {part}
      </span>
    );
  });
}

/* Frei scrollend (kein Pin): p = Viewport-Durchlauf 0→1 (Oberkante am unteren
   Rand → Unterkante am oberen Rand). Woerter fuellen sich wortweise beim
   Einfahren (p 0.24–0.54), die Kobalt-Linie zeichnet sich im unteren Drittel
   (p 0.46–0.82); die Buehne laeuft mit ~0.82x Scrolltempo (Lag 0.18, weiches
   Verweilen). Vier Objekte pendeln in flachem 3D (18 s Zyklus, ±8°
   Zeiger-Reaktion, Floaten auf beiden Achsen, Scroll-Parallaxe je Tiefe). */
function StatementSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const stateRef = useRef({
    top: 0,
    height: 1,
    lines: [] as { path: SVGPathElement; len: number; echo: boolean }[],
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
    st.lines = Array.from(
      sectionRef.current?.querySelectorAll<SVGPathElement>('.statement-line path') ?? [],
    ).map((path) => {
      const len = path.getTotalLength();
      path.style.strokeDasharray = String(len);
      path.style.strokeDashoffset = String(len);
      return { path, len, echo: path.classList.contains('line-echo') };
    });
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

    /* Kobalt-Linie zeichnet sich synchron zum Scroll; der Echo-Strich zieht
       wie ein zweiter Stift-Durchgang leicht versetzt nach */
    const dl = clamp((p - 0.46) / 0.36, 0, 1);
    st.lines.forEach(({ path, len, echo }) => {
      const lp = echo ? clamp((dl - 0.12) / 0.88, 0, 1) : dl;
      path.style.strokeDashoffset = String(len * (1 - smoothstep(lp)));
    });

    /* Objekte: Sinus-Pendel ±30° (18 s/Zyklus), Zeiger-Reaktion (Lerp 0.04),
       Floaten auf beiden Achsen und eine tiefenabhaengige Scroll-Parallaxe
       (depth 1 laeuft mit der Buehne, tiefere Objekte ziehen spuerbar nach) */
    const baseRot = (now / 18000) * 360;
    st.objects.forEach((obj) => {
      obj.mx = lerp(obj.mx, mouse.nx, 0.04);
      obj.my = lerp(obj.my, mouse.ny, 0.04);
      const rotY =
        Math.sin(((baseRot + obj.phase * 40) * Math.PI) / 180) * 30 + obj.mx * 8 * obj.depth;
      const rotX =
        10 +
        Math.cos(((baseRot * 0.7 + obj.phase * 60) * Math.PI) / 180) * 6 +
        obj.my * -6 * obj.depth;
      const fx = Math.cos(now / 3100 + obj.phase * 1.3) * 6;
      const fy = Math.sin(now / 2400 + obj.phase) * 13;
      const py = (p - 0.5) * travel * 0.045 * (obj.depth - 1);
      obj.el.style.transform = `perspective(1100px) translate3d(${fx.toFixed(1)}px, ${(fy + py).toFixed(1)}px, 0) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
    });
  });

  const leadParts = statement.lead.split(/(\s+)/);
  const restParts = statement.rest.split(/(\s+)/);

  return (
    <section className="statement" data-theme="dark" aria-label={statement.ariaLabel} ref={sectionRef}>
      <div className="statement-inner bg-dots-dark" data-rails>
        <div className="statement-stage" ref={stageRef}>
          <div className="float-obj obj-browser" data-depth="1">
            <svg viewBox="0 0 200 150" strokeWidth="1.5" aria-hidden="true">
              <rect className="st-paper" x="1" y="1" width="198" height="148" rx="10" />
              <line className="st-paper" x1="1" y1="26" x2="199" y2="26" />
              <circle className="st-paper" cx="13" cy="13.5" r="2.6" />
              <circle className="st-paper" cx="23" cy="13.5" r="2.6" />
              <circle className="st-paper" cx="33" cy="13.5" r="2.6" />
              <rect className="st-paper" x="46" y="7.5" width="108" height="13" rx="6.5" />
              <rect className="st-paper" x="52" y="11" width="6" height="6" rx="1.5" />
              <line className="st-paper" x1="64" y1="14" x2="118" y2="14" />
              <rect className="st-cobalt" x="14" y="38" width="110" height="34" rx="4" />
              <line className="st-cobalt" x1="22" y1="49" x2="86" y2="49" />
              <line className="st-cobalt" x1="22" y1="60" x2="64" y2="60" />
              <line className="st-paper" x1="140" y1="46" x2="186" y2="46" />
              <line className="st-paper" x1="140" y1="56" x2="178" y2="56" />
              <line className="st-paper" x1="140" y1="66" x2="170" y2="66" />
              <rect className="st-paper" x="14" y="84" width="52" height="44" rx="4" />
              <rect className="st-paper" x="74" y="84" width="52" height="44" rx="4" />
              <rect className="st-paper" x="134" y="84" width="52" height="44" rx="4" />
              <circle className="st-paper" cx="24" cy="98" r="4" />
              <circle className="st-paper" cx="84" cy="98" r="4" />
              <circle className="st-paper" cx="144" cy="98" r="4" />
              <line className="st-paper" x1="20" y1="118" x2="48" y2="118" />
              <line className="st-paper" x1="80" y1="118" x2="108" y2="118" />
              <line className="st-paper" x1="140" y1="118" x2="168" y2="118" />
              <line className="st-paper" x1="193" y1="36" x2="193" y2="60" />
            </svg>
          </div>

          <div className="float-obj obj-phone" data-depth="1.6">
            <svg viewBox="0 0 90 170" strokeWidth="1.5" aria-hidden="true">
              <rect className="st-paper" x="1" y="1" width="88" height="168" rx="18" />
              <rect className="st-paper" x="7" y="7" width="76" height="156" rx="13" />
              <circle className="st-paper" cx="45" cy="15" r="2" />
              <line className="st-paper" x1="16" y1="36" x2="74" y2="36" />
              <line className="st-paper" x1="16" y1="46" x2="58" y2="46" />
              <rect className="st-paper" x="16" y="60" width="58" height="44" rx="4" />
              <line className="st-paper" x1="19" y1="101" x2="71" y2="63" />
              <circle className="st-paper" cx="28" cy="72" r="4" />
              <rect className="st-cobalt" x="16" y="116" width="46" height="15" rx="7.5" />
              <line className="st-cobalt" x1="24" y1="123.5" x2="48" y2="123.5" />
              <line className="st-paper" x1="32" y1="154" x2="58" y2="154" />
            </svg>
          </div>

          <div className="float-obj obj-db" data-depth="1.3">
            <svg viewBox="0 0 170 150" strokeWidth="1.5" aria-hidden="true">
              <ellipse className="st-paper" cx="55" cy="22" rx="46" ry="14" />
              <line className="st-paper" x1="9" y1="22" x2="9" y2="118" />
              <line className="st-paper" x1="101" y1="22" x2="101" y2="118" />
              <path className="st-paper" d="M9 118 C 9 126, 30 132, 55 132 C 80 132, 101 126, 101 118" />
              <path className="st-paper" d="M9 54 C 9 62, 30 68, 55 68 C 80 68, 101 62, 101 54" />
              <path className="st-cobalt" d="M9 86 C 9 94, 30 100, 55 100 C 80 100, 101 94, 101 86" />
              <path className="st-paper" d="M101 62 C 118 62, 112 44, 128 44" />
              <path className="st-cobalt" d="M101 94 C 118 94, 112 106, 128 106" />
              <rect className="st-paper" x="128" y="30" width="36" height="26" rx="5" />
              <line className="st-paper" x1="135" y1="40" x2="157" y2="40" />
              <line className="st-paper" x1="135" y1="47" x2="150" y2="47" />
              <rect className="st-paper" x="128" y="94" width="36" height="26" rx="5" />
              <line className="st-paper" x1="135" y1="104" x2="157" y2="104" />
              <line className="st-cobalt" x1="135" y1="111" x2="150" y2="111" />
              <circle className="st-paper" cx="113" cy="55" r="1.8" />
              <circle className="st-cobalt" cx="113" cy="99" r="1.8" />
            </svg>
          </div>

          <div className="float-obj obj-api" data-depth="1.8">
            <svg viewBox="0 0 190 120" strokeWidth="1.5" aria-hidden="true">
              <rect className="st-paper" x="1" y="34" width="54" height="52" rx="8" />
              <line className="st-paper" x1="11" y1="52" x2="43" y2="52" />
              <line className="st-paper" x1="11" y1="63" x2="35" y2="63" />
              <circle className="st-paper" cx="14" cy="75" r="2.4" />
              <rect className="st-paper" x="135" y="34" width="54" height="52" rx="8" />
              <line className="st-paper" x1="145" y1="52" x2="177" y2="52" />
              <line className="st-paper" x1="145" y1="63" x2="169" y2="63" />
              <circle className="st-paper" cx="148" cy="75" r="2.4" />
              <path className="st-paper" d="M55 60 C 62 60, 64 58, 68 58" />
              <path className="st-paper" d="M122 58 C 126 58, 128 60, 135 60" />
              <path className="st-cobalt" d="M84 40 C 76 40, 80 51, 72 57 C 80 63, 76 76, 84 76" />
              <path className="st-cobalt" d="M106 40 C 114 40, 110 51, 118 57 C 110 63, 114 76, 106 76" />
              <circle className="st-paper" cx="90" cy="58" r="1.5" />
              <circle className="st-paper" cx="95" cy="58" r="1.5" />
              <circle className="st-paper" cx="100" cy="58" r="1.5" />
            </svg>
          </div>

          <p className="statement-text display2" ref={textRef}>
            {/* Lead fuellt sich wie der Rest (statt dauerhaft weiss), nur fett */}
            <strong className="w-strong">{renderWords(leadParts)}</strong>
            {renderWords(restParts, statement.accents)}
          </p>

          {/* Duktus wie der Portraet-Kritzel: satter Hauptstrich + duenner,
              versetzter Echo-Strich als zweiter Stift-Durchgang. Beide Formen
              enden IM Bild: die untere Clip-Kante der Sektion liegt unsichtbar
              im durchlaufenden Dunkel der Treppenkante und wuerde jede nach
              unten auslaufende Linie hart kappen; seitlich (echte
              Bildschirmkante) duerfen die Enden raus. */}
          <svg
            className="statement-line statement-line--desktop"
            viewBox="0 0 1000 280"
            aria-hidden="true"
          >
            <path
              className="line-main"
              d="M64 96 C 360 150, 820 122, 896 200 C 924 240, 900 262, 854 262 C 808 262, 770 252, 746 236"
            />
            <path
              className="line-echo"
              d="M71 104 C 367 158, 827 130, 903 208 C 931 248, 907 270, 861 270 C 815 270, 777 260, 753 244"
            />
          </svg>

          {/* Mobil: kommt tief von links (laeuft seitlich aus dem Bild und
              UNTER dem DB-Objekt durch), schwingt im freien Korridor zwischen
              den unteren Objekten nach oben und hakt dort in der Schleife nach
              links zurueck – Duktus wie Desktop, aber ohne die Ecken-Objekte
              zu schneiden (Schleife endet vor der Mark-Spalte) */}
          <svg
            className="statement-line statement-line--mobile"
            viewBox="0 0 700 320"
            aria-hidden="true"
          >
            <path
              className="line-main"
              d="M-60 285 C 60 272, 150 266, 250 252 C 310 246, 330 170, 380 150 C 415 138, 440 170, 446 205 C 452 248, 438 286, 400 290 C 370 293, 352 283, 345 270"
            />
            <path
              className="line-echo"
              d="M-53 293 C 67 280, 157 274, 257 260 C 317 254, 337 178, 387 158 C 422 146, 447 178, 453 213 C 459 256, 445 294, 407 298 C 377 301, 359 291, 352 278"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default StatementSection;
