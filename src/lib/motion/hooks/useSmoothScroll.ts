'use client';

import { useEffect } from 'react';
import { settleNavigationScroll, startSmoothScroll } from 'lib/motion/services/smoothScroll';

/* Aktiviert den Lenis-Smooth-Scroll fuer die Lebensdauer der Komponente und
   richtet nach Client-Navigation die Scroll-Position ein (Push oben,
   Zurueck/Hash bleiben). */
export function useSmoothScroll() {
  useEffect(() => {
    const stop = startSmoothScroll();
    settleNavigationScroll();
    return stop;
  }, []);
}
