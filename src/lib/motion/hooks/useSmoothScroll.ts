'use client';

import { useEffect } from 'react';
import { startSmoothScroll } from 'lib/motion/services/smoothScroll';

/* Aktiviert den Lenis-Smooth-Scroll fuer die Lebensdauer der Komponente. */
export function useSmoothScroll() {
  useEffect(() => startSmoothScroll(), []);
}
