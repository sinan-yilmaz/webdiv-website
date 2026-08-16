import type { Ref } from 'react';
import { signature } from 'core/consts/signature';

type SignatureMarkProps = {
  ref?: Ref<SVGSVGElement>;
};

/* Unterschrift "Sinan Yilmaz" als Glyphen-Pfade (core/consts/signature.ts).
   Optik (.sig-glyph) kommt vom umgebenden Kontext, Animation: writeSignature.ts. */
function SignatureMark({ ref = undefined }: SignatureMarkProps) {
  return (
    <svg ref={ref} viewBox={signature.viewBox} fill="none" aria-hidden="true">
      {signature.glyphs.map((d, index) => (
        <path key={index} className="sig-glyph" d={d} />
      ))}
    </svg>
  );
}

export default SignatureMark;
