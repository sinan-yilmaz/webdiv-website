'use client';

import { useEffect, useRef } from 'react';
import { subscribeFrame } from 'lib/motion/services/frameLoop';
import type { MotionFrame } from 'lib/motion/services/frameLoop';

/* Ruft den Callback in jedem Frame des gemeinsamen Motion-Loops auf. */
export function useFrame(callback: (frame: MotionFrame) => void) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => subscribeFrame((frame) => callbackRef.current(frame)), []);
}
