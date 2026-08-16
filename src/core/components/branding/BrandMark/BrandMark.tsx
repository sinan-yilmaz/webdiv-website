import type { Ref } from 'react';

type BrandMarkProps = {
  ref?: Ref<SVGSVGElement>;
};

/* Logo-Zeichen "/>" in Variante 2 (schwer, Strichstaerke 16/120), faerbt sich
   ueber currentColor. Zeichnen-Animation: drawBrandMark.ts. */
function BrandMark({ ref = undefined }: BrandMarkProps) {
  return (
    <svg ref={ref} viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <path className="mark-slash" d="M15 91.5 L31 28.5" stroke="currentColor" strokeWidth="16" />
      <path
        className="mark-angle"
        d="M49 27 L105 60 L49 93"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export default BrandMark;
