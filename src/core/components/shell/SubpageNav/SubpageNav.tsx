'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { BrandMark } from 'core/components/branding';
import { marke, nav } from 'core/consts/content';
import { useFrame } from 'lib/motion/hooks/useFrame';
import { useRemeasure } from 'lib/motion/hooks/useRemeasure';

/* Schlanke Nav fuer Unterseiten: Glas-Pille mit Lockup (zur Startseite) und
   Erstgespraech-CTA – gleiche Mechanik wie die SiteNav der One-Page
   (hide-on-scroll, Invertierung ueber dunklen Sektionen), aber ohne
   Anker-Links und Menue-Overlay. Die dunklen Zonen werden direkt aus den
   [data-theme]-Sektionen der jeweiligen Seite gemessen. */
function SubpageNav() {
  const [hidden, setHidden] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const lastYRef = useRef(0);
  const zonesRef = useRef<{ top: number; bottom: number }[]>([]);

  useRemeasure(() => {
    zonesRef.current = Array.from(
      document.querySelectorAll<HTMLElement>('[data-theme="dark"], [data-theme="cobalt"]'),
    ).map((el) => {
      const rect = el.getBoundingClientRect();
      return { top: rect.top + window.scrollY, bottom: rect.bottom + window.scrollY };
    });
  });

  /* Ab 120 px beim Runterscrollen raus, beim Hochscrollen rein (wie SiteNav) */
  useFrame(({ scrollY }) => {
    const lastY = lastYRef.current;
    if (scrollY > 120 && scrollY > lastY + 4) {
      setHidden(true);
      lastYRef.current = scrollY;
    } else if (scrollY < lastY - 8 || scrollY <= 120) {
      setHidden(false);
      lastYRef.current = scrollY;
    }
    const probe = scrollY + 44;
    setOnDark(zonesRef.current.some((zone) => probe >= zone.top && probe <= zone.bottom));
  });

  return (
    <header
      className={`site-nav subpage-nav${hidden ? ' nav-hidden' : ''}${onDark ? ' on-dark' : ''}`}
    >
      <nav className="nav-pill" aria-label={nav.ariaLabel}>
        <Link className="nav-lockup" href="/" aria-label={nav.lockupStartLabel}>
          <BrandMark />
          <span className="lockup-word wordmark">{marke.wortmarke}</span>
        </Link>
        <Link className="btn btn-primary btn-small" href={`/${nav.cta.href}`}>
          {nav.cta.label}
          <span className="btn-arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </nav>
    </header>
  );
}

export default SubpageNav;
