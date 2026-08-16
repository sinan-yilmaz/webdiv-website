'use client';

import { useEffect, useRef } from 'react';
import { whenFontsReady } from 'lib/motion/services/fontsReady';
import { onRemeasure } from 'lib/motion/services/remeasure';

/* Fuehrt die Mess-Funktion aus: initial, nach Schrift-Laden, bei Resize/Load
   und wenn eine Komponente requestRemeasure() ausloest. */
export function useRemeasure(measure: () => void) {
  const measureRef = useRef(measure);

  useEffect(() => {
    measureRef.current = measure;
  });

  useEffect(() => {
    let cancelled = false;
    const run = () => measureRef.current();
    run();
    whenFontsReady(1000).then(() => {
      if (!cancelled) run();
    });
    window.addEventListener('resize', run);
    window.addEventListener('load', run);
    const offRemeasure = onRemeasure(run);
    return () => {
      cancelled = true;
      window.removeEventListener('resize', run);
      window.removeEventListener('load', run);
      offRemeasure();
    };
  }, []);
}
