/* Schreib-Animation: Kontur zeichnet sich pro Glyphe, dann fuellt sie auf.
   Glyphen ueberlappen leicht (0.82) – fluessiger Schreibfluss.
   Rueckgabe: Dauer in ms bis zum Ende des Schreibflusses. */
export function writeSignature(svg: SVGSVGElement, totalMs = 1350): number {
  const glyphs = Array.from(svg.querySelectorAll<SVGPathElement>('.sig-glyph'));
  const lens = glyphs.map((glyph) => glyph.getTotalLength());
  const sum = lens.reduce((a, b) => a + b, 0);
  let t = 0;
  glyphs.forEach((glyph, i) => {
    const dur = (lens[i] / sum) * totalMs;
    glyph.style.strokeDasharray = String(lens[i]);
    glyph.style.strokeDashoffset = String(lens[i]);
    glyph.animate([{ strokeDashoffset: lens[i] }, { strokeDashoffset: 0 }], {
      duration: dur,
      delay: t,
      easing: 'cubic-bezier(0.45, 0, 0.55, 1)',
      fill: 'forwards',
    });
    glyph.animate([{ fillOpacity: 0 }, { fillOpacity: 1 }], {
      duration: 300,
      delay: t + dur * 0.6,
      easing: 'ease-out',
      fill: 'forwards',
    });
    t += dur * 0.82;
  });
  return t + 380;
}
