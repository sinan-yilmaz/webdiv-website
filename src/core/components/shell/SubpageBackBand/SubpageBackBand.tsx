import Link from 'next/link';

type SubpageBackBandProps = {
  href: string;
  label: string;
};

/* Linien-Band im FAQ-Duktus am Kopf der Unterseiten (Rechtsseiten und
   Case Studies): Haarlinien oben/unten ueber die volle Breite, die
   Sektions-Rails laufen durch; innen der Rueckweg (dunkler Kreis + Label),
   die ganze Zeile ist der Link. Sitzt als erstes Kind der Kopf-Sektion,
   deren padding-top den Nav-Rhythmus herstellt (22 + Pillenhoehe + 22). */
function SubpageBackBand({ href, label }: SubpageBackBandProps) {
  return (
    <div className="subpage-band" data-reveal>
      <div className="container">
        <Link className="subpage-band-link" href={href}>
          <span className="subpage-band-send" aria-hidden="true">←</span>
          {label}
        </Link>
      </div>
    </div>
  );
}

export default SubpageBackBand;
