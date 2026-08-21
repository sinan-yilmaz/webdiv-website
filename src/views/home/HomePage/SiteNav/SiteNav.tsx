'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties, MouseEvent as ReactMouseEvent, RefObject } from 'react';
import { BrandMark } from 'core/components/branding';
import { drawBrandMark } from 'core/components/branding/BrandMark/drawBrandMark';
import { hero, marke, nav } from 'core/consts/content';
import { useFrame } from 'lib/motion/hooks/useFrame';
import { useRemeasure } from 'lib/motion/hooks/useRemeasure';
import { snapSmoothY } from 'lib/motion/services/frameLoop';
import { scrollToAnchor } from 'lib/motion/services/smoothScroll';

type SiteNavProps = {
  markRef: RefObject<SVGSVGElement | null>;
  /* 'waiting': unsichtbar bis zur Preloader-Uebergabe · 'enter': einblenden + Logo zeichnen */
  intro: 'none' | 'waiting' | 'enter';
  /* Wechselpunkte der Theme-Invertierung in Seitenreihenfolge:
     'edge' = Treppenkante, kippt auf Kantenmitte · 'band' = klebendes Band
     (FAQ-Chat-Kopf), kippt sobald es die Pille beruehrt. hideNav: in dieser
     Zone bleibt die Pille komplett ausgeblendet (der Chat gehoert sich
     selbst); die hide-on-scroll-Logik laeuft intern weiter, damit sie beim
     Verlassen der Zone nahtlos uebernimmt */
  themeZones: ReadonlyArray<{
    ref: RefObject<HTMLDivElement | null>;
    dark: boolean;
    kind: 'edge' | 'band';
    hideNav?: boolean;
  }>;
};

/* Scroll-Lock fuers Menue-Overlay: fixierter Body wie beim Preloader (haelt
   die Scrollbalken-Spur), zusaetzlich mit top-Offset, damit die Seite hinter
   dem Overlay optisch stehen bleibt. */
let scrollLockY = 0;

function lockBodyScroll() {
  scrollLockY = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollLockY}px`;
  document.body.style.width = '100%';
}

function unlockBodyScroll() {
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo({ top: scrollLockY, behavior: 'instant' });
}

function SiteNav({ markRef, intro, themeZones }: SiteNavProps) {
  const [hidden, setHidden] = useState(false);
  const [suppressed, setSuppressed] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const [entered, setEntered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useRef<HTMLElement | null>(null);
  const lastYRef = useRef(0);
  const menuOpenRef = useRef(false);
  const zonesRef = useRef<{ y: number; dark: boolean; hideNav: boolean }[]>([]);

  useRemeasure(() => {
    const stepH =
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--step-h')) || 64;
    const mid = stepH * 1.5;
    const zones: { y: number; dark: boolean; hideNav: boolean }[] = [
      { y: 0, dark: false, hideNav: false },
    ];
    themeZones.forEach((zone) => {
      const el = zone.ref.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      /* 'band': Pillen-Unterkante liegt bei ~80 px, die Messbedingung addiert
         44 – der Punkt top - 36 kippt also genau bei der Beruehrung */
      zones.push({
        y: zone.kind === 'edge' ? top + mid : top - 36,
        dark: zone.dark,
        hideNav: zone.hideNav === true,
      });
    });
    zonesRef.current = zones;
  });

  useEffect(() => {
    if (intro !== 'enter') return;
    const root = rootRef.current;
    if (!root) return;
    const animation = root.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 450,
      delay: 240,
      fill: 'forwards',
    });
    animation.onfinish = () => setEntered(true);
    if (markRef.current) drawBrandMark(markRef.current, 620, 260);
  }, [intro, markRef]);

  const openMenu = useCallback(() => {
    lockBodyScroll();
    menuOpenRef.current = true;
    setMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    unlockBodyScroll();
    snapSmoothY();
    /* hide-on-scroll darf den Ruecksprung nicht als Runterscrollen lesen */
    lastYRef.current = window.scrollY;
    menuOpenRef.current = false;
    setMenuOpen(false);
  }, []);

  /* Escape schliesst; ab 1024 px (volle Nav) schliesst das Menue sich selbst */
  useEffect(() => {
    if (!menuOpen) return;
    const mq = window.matchMedia('(min-width: 1024px)');
    const handleMq = () => {
      if (mq.matches) closeMenu();
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };
    mq.addEventListener('change', handleMq);
    window.addEventListener('keydown', handleKey);
    return () => {
      mq.removeEventListener('change', handleMq);
      window.removeEventListener('keydown', handleKey);
    };
  }, [menuOpen, closeMenu]);

  /* Sicherheitsnetz: Body-Lock nicht zuruecklassen, falls die Nav unmountet */
  useEffect(
    () => () => {
      if (menuOpenRef.current) unlockBodyScroll();
    },
    [],
  );

  /* Ab 120 px beim Runterscrollen raus, beim Hochscrollen rein;
     Theme-Invertierung anhand der Treppenkanten-Mittelpunkte. */
  useFrame(({ scrollY }) => {
    const lastY = lastYRef.current;
    if (scrollY > 120 && scrollY > lastY + 4) {
      setHidden(true);
      lastYRef.current = scrollY;
    } else if (scrollY < lastY - 8 || scrollY <= 120) {
      setHidden(false);
      lastYRef.current = scrollY;
    }
    let dark = false;
    let inHideZone = false;
    zonesRef.current.forEach((zone) => {
      if (scrollY + 44 >= zone.y) {
        dark = zone.dark;
        inHideZone = zone.hideNav;
      }
    });
    setOnDark(dark);
    setSuppressed(inHideZone);
  });

  const introStyle: CSSProperties | undefined =
    intro === 'waiting' || (intro === 'enter' && !entered) ? { opacity: 0 } : undefined;

  /* Menue-Link: erst den Scroll-Lock loesen, dann die gefuehrte Fahrt starten */
  const handleMenuLink = (event: ReactMouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    closeMenu();
    scrollToAnchor(href);
  };

  return (
    <>
      <header
        className={`site-nav${hidden || suppressed ? ' nav-hidden' : ''}${onDark ? ' on-dark' : ''}${menuOpen ? ' menu-open' : ''}`}
        style={introStyle}
        ref={rootRef}
      >
        <nav className="nav-pill" aria-label={nav.ariaLabel}>
          <a
            className="nav-lockup"
            href="#top"
            aria-label={nav.lockupLabel}
            onClick={menuOpen ? (event) => handleMenuLink(event, '#top') : undefined}
          >
            <BrandMark ref={markRef} />
            <span className="lockup-word wordmark">{marke.wortmarke}</span>
          </a>
          <ul className="nav-links">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <a className="btn btn-primary btn-small" href={nav.cta.href}>
            {nav.cta.label}
            <span className="btn-arrow" aria-hidden="true">
              →
            </span>
          </a>
          <button
            className="nav-menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="nav-overlay"
            onClick={menuOpen ? closeMenu : openMenu}
          >
            {menuOpen ? nav.menue.schliessen : nav.menue.oeffnen}
          </button>
        </nav>
      </header>
      {/* Ausserhalb des Headers: dessen transform wuerde sonst das fixed
          Overlay einfangen (Containing Block) */}
      {menuOpen && (
        <div className="nav-overlay bg-dots-dark" id="nav-overlay">
          <div className="nav-overlay-inner">
            <nav aria-label={nav.menue.ariaLabel}>
              <ul className="nav-overlay-links">
                {nav.links.map((link, index) => (
                  <li key={link.href} style={{ '--ri': index } as CSSProperties}>
                    <a href={link.href} onClick={(event) => handleMenuLink(event, link.href)}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="nav-overlay-foot">
              <a
                className="btn btn-invert"
                href={nav.cta.href}
                onClick={(event) => handleMenuLink(event, nav.cta.href)}
              >
                {nav.cta.label}
                <span className="btn-arrow" aria-hidden="true">
                  →
                </span>
              </a>
              <span className="nav-overlay-place mono">{hero.subRight}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SiteNav;
