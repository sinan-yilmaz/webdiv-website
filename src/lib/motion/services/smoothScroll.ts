import Lenis from 'lenis';

/* Lenis glaettet Wheel-Scrolls auf feinen Zeigern (Desktop); Touch scrollt
   nativ (syncTouch aus, CSS scroll-behavior bleibt das Fallback). Getrieben
   vom frameLoop-Tick (updateSmoothScroll), damit alle Motion-Reaktionen im
   selben Takt den fertig geglaetteten Scrollwert lesen.
   Anchor-Klicks werden selbst abgefangen (Lenis' anchors-Option laesst den
   nativen Sprung durch): preventDefault + gefuehrte Fahrt; den Versatz um
   scroll-padding-top rechnet Lenis selbst ein. */
const WHEEL_LERP = 0.1;
const ANCHOR_DURATION = 1.2;
const anchorEasing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

let lenis: Lenis | null = null;
let consumers = 0;

function onAnchorClick(event: MouseEvent) {
  if (!lenis || event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const link = event
    .composedPath()
    .find((node): node is HTMLAnchorElement => node instanceof HTMLAnchorElement && !!node.href);
  if (!link) return;
  const url = new URL(link.href, window.location.href);
  if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
  const target = decodeURIComponent(url.hash);
  if (!target || !document.querySelector(target)) return;
  event.preventDefault();
  scrollToAnchor(target);
}

/* Gefuehrte Fahrt zu einem Anker-Ziel ("#id"): mit aktivem Lenis dessen
   Animation, sonst natives Smooth-Scrolling (scroll-padding-top rechnen
   beide selbst ein). Fuer Aufrufer ausserhalb des Klick-Abfangens, z. B.
   das Menue-Overlay, das vor der Fahrt erst den Scroll-Lock loesen muss. */
export function scrollToAnchor(target: string): void {
  const el = document.querySelector(target);
  if (!el) return;
  history.pushState(null, '', target);
  if (lenis) {
    /* Nach einem Body-Scroll-Lock (Menue-Overlay) sind Lenis' Masse noch die
       der kollabierten Seite – ohne resize() wuerde scrollTo auf 0 clampen */
    lenis.resize();
    lenis.scrollTo(target, { duration: ANCHOR_DURATION, easing: anchorEasing });
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

export function isSmoothScrollActive(): boolean {
  return lenis !== null;
}

export function updateSmoothScroll(now: number): void {
  lenis?.raf(now);
}

export function startSmoothScroll(): () => void {
  consumers += 1;
  if (consumers === 1 && window.matchMedia('(pointer: fine)').matches) {
    /* respectReducedMotion aus: die Site verzichtet laut Briefing bewusst auf
       eine Reduced-Motion-Variante – Lenis wuerde sonst hart springen */
    lenis = new Lenis({ lerp: WHEEL_LERP, respectReducedMotion: false });
    window.addEventListener('click', onAnchorClick);
  }
  return () => {
    consumers -= 1;
    if (consumers === 0 && lenis) {
      window.removeEventListener('click', onAnchorClick);
      lenis.destroy();
      lenis = null;
    }
  };
}
