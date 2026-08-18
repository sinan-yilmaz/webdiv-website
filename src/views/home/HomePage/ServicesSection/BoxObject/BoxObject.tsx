'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';

type BoxObjectKind = 'web' | 'app' | 'db';

type BoxObjectProps = {
  kind: BoxObjectKind;
  /* Staerke des Maus-Schwenks relativ zur Basis (Tiefenstaffelung der Boxen) */
  sway?: number;
};

/* Linienobjekte der drei Leistungen im Statement-Duktus: web und db
   uebernehmen die Geometrie der Statement-Objekte, app ist neu im selben
   Strich. pathLength=1 macht das Zeichnen ueber stroke-dashoffset
   laengenunabhaengig; der Stagger pro Strich kommt als Inline-Delay. */
function BoxObject({ kind, sway = 1 }: BoxObjectProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const strokes = ref.current?.querySelectorAll<SVGElement>('.o, .oc, .od') ?? [];
    strokes.forEach((stroke, index) => {
      stroke.style.transitionDelay = `${index * 40}ms`;
    });
  }, []);

  return (
    <div className="svc-obj" style={{ '--sway-f': sway } as CSSProperties} ref={ref}>
      {kind === 'web' && (
        <svg viewBox="0 0 200 150" aria-hidden="true">
          <rect className="o" pathLength={1} x="1" y="1" width="198" height="148" rx="10" />
          <line className="o" pathLength={1} x1="1" y1="26" x2="199" y2="26" />
          <circle className="o" pathLength={1} cx="13" cy="13.5" r="2.6" />
          <circle className="o" pathLength={1} cx="23" cy="13.5" r="2.6" />
          <circle className="o" pathLength={1} cx="33" cy="13.5" r="2.6" />
          <rect className="o" pathLength={1} x="46" y="7.5" width="108" height="13" rx="6.5" />
          <rect className="o" pathLength={1} x="52" y="11" width="6" height="6" rx="1.5" />
          <line className="o" pathLength={1} x1="64" y1="14" x2="118" y2="14" />
          <rect className="oc" pathLength={1} x="14" y="38" width="110" height="34" rx="4" />
          <line className="oc" pathLength={1} x1="22" y1="49" x2="86" y2="49" />
          <line className="oc" pathLength={1} x1="22" y1="60" x2="64" y2="60" />
          <line className="o" pathLength={1} x1="140" y1="46" x2="186" y2="46" />
          <line className="o" pathLength={1} x1="140" y1="56" x2="178" y2="56" />
          <line className="o" pathLength={1} x1="140" y1="66" x2="170" y2="66" />
          <rect className="o" pathLength={1} x="14" y="84" width="52" height="44" rx="4" />
          <rect className="o" pathLength={1} x="74" y="84" width="52" height="44" rx="4" />
          <rect className="o" pathLength={1} x="134" y="84" width="52" height="44" rx="4" />
          <circle className="o" pathLength={1} cx="24" cy="98" r="4" />
          <circle className="o" pathLength={1} cx="84" cy="98" r="4" />
          <circle className="o" pathLength={1} cx="144" cy="98" r="4" />
          <line className="o" pathLength={1} x1="20" y1="118" x2="48" y2="118" />
          <line className="o" pathLength={1} x1="80" y1="118" x2="108" y2="118" />
          <line className="o" pathLength={1} x1="140" y1="118" x2="168" y2="118" />
          <line className="o" pathLength={1} x1="193" y1="36" x2="193" y2="60" />
        </svg>
      )}
      {kind === 'app' && (
        <svg viewBox="0 0 200 150" aria-hidden="true">
          <rect className="o" pathLength={1} x="1" y="1" width="198" height="148" rx="10" />
          <line className="o" pathLength={1} x1="1" y1="26" x2="199" y2="26" />
          <circle className="o" pathLength={1} cx="13" cy="13.5" r="2.6" />
          <circle className="o" pathLength={1} cx="23" cy="13.5" r="2.6" />
          <circle className="o" pathLength={1} cx="33" cy="13.5" r="2.6" />
          <line className="od" pathLength={1} x1="46" y1="14" x2="96" y2="14" />
          <rect className="o" pathLength={1} x="14" y="38" width="112" height="94" rx="4" />
          <line className="o" pathLength={1} x1="14" y1="60" x2="126" y2="60" />
          <line className="o" pathLength={1} x1="20" y1="49" x2="50" y2="49" />
          <line className="od" pathLength={1} x1="14" y1="78" x2="126" y2="78" />
          <line className="od" pathLength={1} x1="14" y1="96" x2="126" y2="96" />
          <line className="od" pathLength={1} x1="14" y1="114" x2="126" y2="114" />
          <line className="od" pathLength={1} x1="64" y1="60" x2="64" y2="132" />
          <line className="od" pathLength={1} x1="96" y1="60" x2="96" y2="132" />
          <line className="od" pathLength={1} x1="140" y1="52" x2="168" y2="52" />
          <line className="o" pathLength={1} x1="140" y1="72" x2="186" y2="72" />
          <line className="od" pathLength={1} x1="140" y1="88" x2="160" y2="88" />
          <line className="o" pathLength={1} x1="140" y1="106" x2="186" y2="106" />
          <rect className="oc" pathLength={1} x="140" y="118" width="46" height="16" rx="8" />
          <line className="oc" pathLength={1} x1="150" y1="126" x2="176" y2="126" />
          <path className="oc" pathLength={1} d="M128 132 l5.4 13 l2.6 -5.2 l5.6 -2.2 Z" />
        </svg>
      )}
      {kind === 'db' && (
        <svg viewBox="0 0 170 150" aria-hidden="true">
          <ellipse className="o" pathLength={1} cx="55" cy="22" rx="46" ry="14" />
          <line className="o" pathLength={1} x1="9" y1="22" x2="9" y2="118" />
          <line className="o" pathLength={1} x1="101" y1="22" x2="101" y2="118" />
          <path className="o" pathLength={1} d="M9 118 C 9 126, 30 132, 55 132 C 80 132, 101 126, 101 118" />
          <path className="o" pathLength={1} d="M9 54 C 9 62, 30 68, 55 68 C 80 68, 101 62, 101 54" />
          <path className="oc" pathLength={1} d="M9 86 C 9 94, 30 100, 55 100 C 80 100, 101 94, 101 86" />
          <path className="o" pathLength={1} d="M101 62 C 118 62, 112 44, 128 44" />
          <path className="oc" pathLength={1} d="M101 94 C 118 94, 112 106, 128 106" />
          <rect className="o" pathLength={1} x="128" y="30" width="36" height="26" rx="5" />
          <line className="o" pathLength={1} x1="135" y1="40" x2="157" y2="40" />
          <line className="o" pathLength={1} x1="135" y1="47" x2="150" y2="47" />
          <rect className="o" pathLength={1} x="128" y="94" width="36" height="26" rx="5" />
          <line className="o" pathLength={1} x1="135" y1="104" x2="157" y2="104" />
          <line className="oc" pathLength={1} x1="135" y1="111" x2="150" y2="111" />
          <circle className="o" pathLength={1} cx="113" cy="55" r="1.8" />
          <circle className="oc" pathLength={1} cx="113" cy="99" r="1.8" />
        </svg>
      )}
    </div>
  );
}

export default BoxObject;
