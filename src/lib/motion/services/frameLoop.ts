import { lerp } from 'lib/motion/services/interpolate';
import { isSmoothScrollActive, updateSmoothScroll } from 'lib/motion/services/smoothScroll';

export type MotionFrame = {
  now: number;
  scrollY: number;
  /* gelerpter Scrollwert (weiches Nachlauf-Gefuehl ohne Scroll-Hijacking) */
  smoothY: number;
  vh: number;
  mouse: { x: number; y: number; nx: number; ny: number };
};

type FrameCallback = (frame: MotionFrame) => void;

const SMOOTH_FACTOR = 0.115;

const subscribers = new Set<FrameCallback>();
const mouse = { x: 0, y: 0, nx: 0, ny: 0 };
let smoothY = 0;
let rafId: number | null = null;
let initialized = false;
let finePointer = false;

export function hasFinePointer(): boolean {
  if (typeof window === 'undefined') return false;
  ensureInit();
  return finePointer;
}

/* Nach programmatischen Scroll-Spruengen (z. B. Loesen eines Scroll-Locks)
   den gelerpten Wert hart nachziehen, damit nichts sichtbar hinterherfaehrt. */
export function snapSmoothY(): void {
  smoothY = window.scrollY;
}

function ensureInit() {
  if (initialized) return;
  initialized = true;
  finePointer = window.matchMedia('(pointer: fine)').matches;
  mouse.x = window.innerWidth / 2;
  mouse.y = window.innerHeight / 2;
  smoothY = window.scrollY;
  if (finePointer) {
    window.addEventListener(
      'mousemove',
      (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
        mouse.nx = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.ny = (event.clientY / window.innerHeight) * 2 - 1;
      },
      { passive: true },
    );
  }
}

function tick(now: number) {
  /* Lenis zuerst schreiben lassen, dann lesen – ein Takt fuer alles */
  updateSmoothScroll(now);
  const scrollY = window.scrollY;
  /* Mit aktivem Lenis ist scrollY bereits geglaettet – kein zweiter Nachlauf */
  if (isSmoothScrollActive() || Math.abs(smoothY - scrollY) < 0.05) {
    smoothY = scrollY;
  } else {
    smoothY = lerp(smoothY, scrollY, SMOOTH_FACTOR);
  }
  const frame: MotionFrame = { now, scrollY, smoothY, vh: window.innerHeight, mouse };
  subscribers.forEach((callback) => callback(frame));
  rafId = requestAnimationFrame(tick);
}

/* Ein gemeinsamer rAF-Loop fuer alle Subscriber; laeuft nur, solange es welche gibt. */
export function subscribeFrame(callback: FrameCallback): () => void {
  ensureInit();
  subscribers.add(callback);
  if (rafId === null) rafId = requestAnimationFrame(tick);
  return () => {
    subscribers.delete(callback);
    if (subscribers.size === 0 && rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };
}
