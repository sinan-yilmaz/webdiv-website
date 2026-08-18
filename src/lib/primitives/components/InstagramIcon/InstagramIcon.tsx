/* Instagram-Glyphe als Monoline im 24er-Raster; Farbe folgt currentColor,
   Strichstil per Attribut-Default, vom Nutzungskontext via CSS uebersteuerbar */
function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <line x1="17.2" y1="6.8" x2="17.21" y2="6.8" />
    </svg>
  );
}

export default InstagramIcon;
