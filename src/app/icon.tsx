import { ImageResponse } from 'next/og';

/* output: 'export' verlangt fuer generierte Metadata-Routen force-static */
export const dynamic = 'force-static';
export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

/* PNG-Fallback zum SVG-Favicon (app/icon.svg) fuer Browser ohne
   SVG-Favicon-Support; gleiche Konstruktion wie Variante 3 (rx 30/120) */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#2A3CFF',
          borderRadius: 16,
        }}
      >
        <svg width="46" height="46" viewBox="0 0 120 120" fill="none">
          <path d="M15 91.5 L31 28.5" stroke="#F2EFE9" strokeWidth="16" />
          <path d="M49 27 L105 60 L49 93" stroke="#F2EFE9" strokeWidth="16" strokeLinejoin="miter" />
        </svg>
      </div>
    ),
    size,
  );
}
