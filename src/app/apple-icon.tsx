import { ImageResponse } from 'next/og';

/* output: 'export' verlangt fuer generierte Metadata-Routen force-static */
export const dynamic = 'force-static';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/* webdiv Zeichen, Variante 3 als Apple-Touch-Icon: vollflaechig Kobalt
   (iOS rundet selbst), Zeichen-Geometrie wie app/icon.svg */
export default function AppleIcon() {
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
        }}
      >
        <svg width="130" height="130" viewBox="0 0 120 120" fill="none">
          <path d="M15 91.5 L31 28.5" stroke="#F2EFE9" strokeWidth="16" />
          <path d="M49 27 L105 60 L49 93" stroke="#F2EFE9" strokeWidth="16" strokeLinejoin="miter" />
        </svg>
      </div>
    ),
    size,
  );
}
