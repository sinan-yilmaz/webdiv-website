'use client';

import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

/* Sichtbarkeits-Flag fuer teure Frame-Ticks – als Ref, damit kein Re-Render entsteht. */
export function useInViewFlag(
  ref: RefObject<Element | null>,
  rootMargin = '80px 0px',
): RefObject<boolean> {
  const flag = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          flag.current = entry.isIntersecting;
        });
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);

  return flag;
}
