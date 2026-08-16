'use client';

import { useEffect } from 'react';
import type { RefObject } from 'react';

/* Gibt allen [data-reveal]-Kindern des Containers einmalig die Klasse "in",
   sobald sie den Schwellwert erreichen (CSS uebernimmt die Transition). */
export function useRevealChildren(containerRef: RefObject<HTMLElement | null>, threshold = 0.18) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        });
      },
      { threshold },
    );
    container.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [containerRef, threshold]);
}
