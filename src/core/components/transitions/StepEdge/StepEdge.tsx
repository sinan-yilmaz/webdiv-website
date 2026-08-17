'use client';

import { useRef } from 'react';
import type { CSSProperties, Ref } from 'react';
import { useFrame } from 'lib/motion/hooks/useFrame';
import { useRemeasure } from 'lib/motion/hooks/useRemeasure';
import { clamp } from 'lib/motion/services/interpolate';

type StepEdgeProps = {
  /* Ausgangs- und Zielflaeche als CSS-Farbwert (z. B. "var(--paper)") */
  from: string;
  to: string;
  /* Zielflaeche traegt das Punktraster der Folgesektion (phasengleich) */
  dots?: boolean;
  ref?: Ref<HTMLDivElement>;
};

/* Treppenkante: das eine Uebergangs-Motiv zwischen den Farbflaechen
   (Geometrie und Stufenhoehe in tokens.css, .step-edge). Die Stufen wachsen
   scroll-gekoppelt: flach, wenn die Kante am unteren Viewport-Rand erscheint,
   voll ausgepraegt, sobald sie die untere Viewport-Haelfte durchquert hat
   (--edge-p 0..1, CSS-Fallback 1 fuer statisches HTML ohne JS). */
function StepEdge({ from, to, dots = false, ref = undefined }: StepEdgeProps) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef({ top: 0, lastP: -1 });

  useRemeasure(() => {
    const el = elRef.current;
    if (!el) return;
    measureRef.current.top = el.getBoundingClientRect().top + window.scrollY;
  });

  useFrame(({ scrollY, vh }) => {
    const el = elRef.current;
    if (!el) return;
    /* Rohes scrollY: die Kante scrollt nativ mit dem Dokument */
    const p = clamp((vh - (measureRef.current.top - scrollY)) / (0.45 * vh), 0, 1);
    const rounded = Math.round(p * 200) / 200;
    if (rounded === measureRef.current.lastP) return;
    measureRef.current.lastP = rounded;
    el.style.setProperty('--edge-p', String(rounded));
  });

  const setRefs = (node: HTMLDivElement | null) => {
    elRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) (ref as { current: HTMLDivElement | null }).current = node;
  };

  return (
    <div
      ref={setRefs}
      className={`step-edge${dots ? ' step-edge--dots' : ''}`}
      style={{ '--edge-from': from, '--edge-to': to } as CSSProperties}
      aria-hidden="true"
    />
  );
}

export default StepEdge;
