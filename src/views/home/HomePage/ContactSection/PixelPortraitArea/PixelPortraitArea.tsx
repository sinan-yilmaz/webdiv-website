'use client';

import { useEffect, useRef, useState } from 'react';
import { kontakt, portraet } from 'core/consts/content';

/* Pixel-Portraet: 24x24-Downsample des Portraets per Canvas; dunkle Pixel
   (Foto-Hintergrund, Luminanz < 26) werden transparent gestellt. Solange
   public/portrait.jpg fehlt, bleibt der markierte Platzhalter stehen. */
function PixelPortraitArea() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.src = portraet.bildSrc;
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;
      const side = Math.min(img.naturalWidth, img.naturalHeight * 0.72);
      const sx = (img.naturalWidth - side) / 2;
      const sy = img.naturalHeight * 0.04;
      ctx.drawImage(img, sx, sy, side, side, 0, 0, 24, 24);
      const pixels = ctx.getImageData(0, 0, 24, 24);
      for (let i = 0; i < pixels.data.length; i += 4) {
        const lum =
          0.2126 * pixels.data[i] + 0.7152 * pixels.data[i + 1] + 0.0722 * pixels.data[i + 2];
        if (lum < 26) pixels.data[i + 3] = 0;
      }
      ctx.putImageData(pixels, 0, 0);
      setLoaded(true);
    };
    return () => {
      img.onload = null;
    };
  }, []);

  return (
    <div className="pixel-portrait">
      <canvas width={24} height={24} hidden={!loaded} ref={canvasRef} />
      <span className="missing-note" hidden={loaded}>
        {kontakt.pixelPlatzhalter}
      </span>
    </div>
  );
}

export default PixelPortraitArea;
