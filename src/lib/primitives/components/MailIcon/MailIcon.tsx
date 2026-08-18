/* Briefumschlag als Monoline-Glyphe im 24er-Raster; Farbe folgt currentColor,
   Strichstil per Attribut-Default, vom Nutzungskontext via CSS uebersteuerbar */
function MailIcon() {
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
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M3.5 7l7.4 5a2 2 0 0 0 2.2 0L20.5 7" />
    </svg>
  );
}

export default MailIcon;
