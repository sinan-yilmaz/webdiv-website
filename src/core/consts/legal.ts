/* Rechtstexte der Unterseiten /impressum und /datenschutz – Struktur nach der
   Bucan-Blaupause (.website/referenz-bucan-website.md Abschnitt 5), Rechtslage
   am 22.08.2026 gegen Primaerquellen geprueft: § 5 DDG (Pflichtangaben),
   § 36 Abs. 3 VSBG (keine Streitbeilegungs-Info noetig bei <= 10 Beschaeftigten),
   § 2 Abs. 1 Nr. 11 DL-InfoV (Berufshaftpflicht nur angeben, falls vorhanden).
   Die EU-OS-Plattform wurde zum 20.07.2025 eingestellt (VO (EU) 2024/3228) –
   ein Verweis darauf waere irrefuehrend und bleibt bewusst draussen.
   [Platzhalter] bleiben sichtbar, bis die echten Angaben vorliegen
   (siehe .webdiv/tasklist.md). */

/* Anbieterdaten: einzige Quelle fuer Impressum UND Datenschutzerklaerung –
   Sinan liefert Anschrift/E-Mail, dann hier einmal ersetzen. */
export const anbieter = {
  marke: 'webdiv',
  name: 'Sinan Yilmaz',
  strasse: '[Straße und Hausnummer]',
  ort: '[PLZ und Ort]',
  email: 'hallo@webdiv.de',
} as const;

export const legal = {
  eyebrow: 'Rechtliches',
} as const;

export const impressum = {
  metaTitle: 'Impressum – webdiv',
  /* [Vorschlag] – absegnen (siehe .webdiv/tasklist.md) */
  metaDescription:
    'Impressum von webdiv, Sinan Yilmaz, Günzburg. Anbieterkennzeichnung nach § 5 DDG mit Anschrift und Kontakt.',
  titel: 'Impressum',
  angabenTitel: 'Angaben gemäß § 5 DDG',
  kontaktTitel: 'Kontakt',
  emailLabel: 'E-Mail',
  verantwortlichTitel: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV',
  verantwortlichText: 'Sinan Yilmaz, Anschrift wie oben.',
  fussLinks: [
    { label: 'Zur Startseite', href: '/' },
    { label: 'Datenschutzerklärung', href: '/datenschutz/' },
  ],
} as const;

export const datenschutz = {
  metaTitle: 'Datenschutzerklärung – webdiv',
  /* [Vorschlag] – absegnen (siehe .webdiv/tasklist.md) */
  metaDescription:
    'Datenschutzerklärung von webdiv. Welche Daten beim Besuch dieser Website und über das Kontaktformular verarbeitet werden und welche Rechte Sie haben.',
  titel: 'Datenschutzerklärung',
  intro:
    'Der Schutz Ihrer persönlichen Daten ist mir wichtig. Diese Erklärung informiert Sie darüber, welche Daten beim Besuch dieser Website und bei Anfragen verarbeitet werden.',
  verantwortlichTitel: '1. Verantwortlicher',
  verantwortlichText: 'Verantwortlich für die Datenverarbeitung auf dieser Website ist',
  abschnitte: [
    {
      titel: '2. Hosting und Server-Logfiles',
      text: 'Diese Website wird bei der STRATO GmbH (Otto-Ostrowski-Straße 7, 10249 Berlin) gehostet. Beim Aufruf der Website verarbeitet der Hoster automatisch technisch notwendige Server-Logfiles, unter anderem IP-Adresse, Datum und Uhrzeit des Abrufs, aufgerufene Seite und Browsertyp. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO, dem berechtigten Interesse an einem sicheren und stabilen Betrieb der Website. Die Logfiles werden nach kurzer Zeit gelöscht. Mit dem Hoster besteht ein Vertrag über Auftragsverarbeitung gemäß Art. 28 DSGVO.',
    },
    {
      titel: '3. Kontaktformular und E-Mail-Kontakt',
      text: 'Wenn Sie mir über das Kontaktformular oder per E-Mail schreiben, verarbeite ich die von Ihnen angegebenen Daten, also Name, E-Mail-Adresse und den Inhalt Ihrer Nachricht, ausschließlich zur Bearbeitung Ihrer Anfrage (Art. 6 Abs. 1 lit. b DSGVO). Die Daten werden gelöscht, sobald sie für die Bearbeitung nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.',
    },
    {
      titel: '4. Keine Cookies, kein Tracking',
      text: 'Diese Website verwendet keine Cookies, keine Analyse-Tools und keine externen Einbindungen, die eine Einwilligung erfordern würden. Schriften sind lokal eingebunden und werden von keinem fremden Server geladen.',
    },
    {
      titel: '5. Ihre Rechte',
      text: 'Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen die Verarbeitung Ihrer Daten (Art. 15 bis 21 DSGVO). Zudem besteht ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde (Art. 77 DSGVO).',
    },
  ],
  stand: 'Stand: August 2026',
  fussLinks: [
    { label: 'Zur Startseite', href: '/' },
    { label: 'Impressum', href: '/impressum/' },
  ],
} as const;
