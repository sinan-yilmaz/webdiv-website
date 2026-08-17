'use client';

import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { SignatureMark } from 'core/components/branding';
import { writeSignature } from 'core/components/branding/SignatureMark/writeSignature';
import { whenFontsReady } from 'lib/motion/services/fontsReady';

type PreloaderProps = {
  /* Ruheposition der Signatur ueber der Hero-Wortmarke – Ziel des FLIP-Flugs */
  heroSigRef: RefObject<HTMLDivElement | null>;
  /* Signatur fliegt los – Nav faehrt ein und zeichnet ihr Logo */
  onHandoff: () => void;
  /* Hero-Reveal starten, waehrend der Preloader ausblendet */
  onReveal: () => void;
  /* Preloader ist unsichtbar -> kann unmounten */
  onDone: () => void;
};

function Preloader({ heroSigRef, onHandoff, onReveal, onDone }: PreloaderProps) {
  const [fading, setFading] = useState(false);
  const sigWrapRef = useRef<HTMLDivElement | null>(null);
  const sigSvgRef = useRef<SVGSVGElement | null>(null);
  const callbacksRef = useRef({ onHandoff, onReveal, onDone });

  useEffect(() => {
    callbacksRef.current = { onHandoff, onReveal, onDone };
  });

  useEffect(() => {
    /* Der React-Preloader deckt jetzt selbst – Erstbesuchs-Veil abloesen.
       Erstbesuch beginnt immer am Seitenanfang: instant uebersteuert die
       Smooth-Fahrt einer evtl. Browser-Scroll-Restauration. */
    document.documentElement.removeAttribute('data-intro-pending');
    window.scrollTo({ top: 0, behavior: 'instant' });
    /* Kein Scroll-Lock: der Preloader liegt absolut ueber dem Hero und
       scrollt mit der Seite mit – wer sofort scrollt, sieht die Sektionen
       darunter, waehrend das Intro im Hero normal weiterlaeuft. Der
       FLIP-Flug bleibt korrekt: from und to werden im selben Frame im
       Viewport gemessen, der Scroll-Anteil kuerzt sich aus dx/dy raus. */
    let cancelled = false;
    const timers: number[] = [];

    whenFontsReady(900).then(() => {
      if (cancelled) return;
      const svg = sigSvgRef.current;
      const sigWrap = sigWrapRef.current;
      if (!svg || !sigWrap) return;
      const writeDur = writeSignature(svg, 750);
      /* erst jetzt zeigen: writeSignature hat die Konturen bereits synchron
         versteckt – die fertige Unterschrift kann nicht mehr aufblitzen */
      sigWrap.style.visibility = 'visible';

      /* Uebergabe: Signatur fliegt an ihre Ruheposition ueber der Wortmarke
         und bleibt deckungsgleich stehen; die Hero-Signatur uebernimmt beim
         Reveal unsichtbar darunter, der Preloader blendet dann nur noch aus. */
      timers.push(
        window.setTimeout(() => {
          const target = heroSigRef.current;
          if (target) {
            const from = sigWrap.getBoundingClientRect();
            const to = target.getBoundingClientRect();
            const dx = to.left + to.width / 2 - (from.left + from.width / 2);
            const dy = to.top + to.height / 2 - (from.top + from.height / 2);
            const s = to.width / from.width;
            sigWrap.animate(
              [
                { transform: 'translate(0,0) scale(1)' },
                { transform: `translate(${dx}px, ${dy}px) scale(${s})` },
              ],
              { duration: 640, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' },
            );
          }
          callbacksRef.current.onHandoff();

          timers.push(
            window.setTimeout(() => {
              setFading(true);
              callbacksRef.current.onReveal();
              timers.push(window.setTimeout(() => callbacksRef.current.onDone(), 550));
            }, 660),
          );
        }, writeDur + 120),
      );
    });

    return () => {
      cancelled = true;
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [heroSigRef]);

  return (
    <div className={`preloader bg-grid${fading ? ' done' : ''}`}>
      <div className="preloader-sig" ref={sigWrapRef}>
        <SignatureMark ref={sigSvgRef} />
      </div>
    </div>
  );
}

export default Preloader;
