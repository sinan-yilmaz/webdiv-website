/* Logo-Zeichen: drei Striche zeichnen sich (Slash, oberer, unterer Schenkel).
   Der Winkel laeuft in zwei Phasen (42 % -> Pause -> 100 %), damit er sich
   als zwei Striche liest. */
export function drawBrandMark(svg: SVGSVGElement, dur = 620, delay = 0) {
  const slash = svg.querySelector<SVGPathElement>('.mark-slash');
  const angle = svg.querySelector<SVGPathElement>('.mark-angle');
  if (!slash || !angle) return;
  const ls = slash.getTotalLength();
  const la = angle.getTotalLength();
  slash.style.strokeDasharray = String(ls);
  slash.style.strokeDashoffset = String(ls);
  angle.style.strokeDasharray = String(la);
  angle.style.strokeDashoffset = String(la);
  slash.animate([{ strokeDashoffset: ls }, { strokeDashoffset: 0 }], {
    duration: dur * 0.4,
    delay,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    fill: 'forwards',
  });
  angle.animate(
    [
      { strokeDashoffset: la, offset: 0 },
      { strokeDashoffset: la * 0.5, offset: 0.42 },
      { strokeDashoffset: la * 0.5, offset: 0.55 },
      { strokeDashoffset: 0, offset: 1 },
    ],
    { duration: dur, delay: delay + dur * 0.28, easing: 'ease-in-out', fill: 'forwards' },
  );
}
