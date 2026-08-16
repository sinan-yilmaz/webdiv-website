'use client';

import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

/* true, sobald das Element einmal den Schwellwert erreicht hat (bleibt true). */
export function useInViewOnce(ref: RefObject<Element | null>, threshold = 0.18): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setInView(true);
          io.disconnect();
        });
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);

  return inView;
}
