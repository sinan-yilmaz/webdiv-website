/* Saemtliche Texte der webdiv-One-Page – woertlich aus dem Design-Briefing
   Runde 1 uebernommen (Prototyp index.html). [Platzhalter] bleiben sichtbar,
   bis die echten Angaben vorliegen (siehe tasklist.md). */

export const site = {
  title: 'webdiv – Websites & Web-Anwendungen. Sinan Yilmaz, Günzburg',
  description:
    'webdiv gestaltet und entwickelt Firmen-Websites und Web-Anwendungen – von der ersten Skizze bis zum Livegang. Sinan Yilmaz, Webentwickler in Günzburg.',
} as const;

export const marke = {
  wortmarke: 'webdiv',
} as const;

export const nav = {
  ariaLabel: 'Hauptnavigation',
  lockupLabel: 'webdiv – zum Seitenanfang',
  lockupStartLabel: 'webdiv – zur Startseite',
  links: [
    { label: 'Leistungen', href: '#leistungen' },
    { label: 'Projekte', href: '#projekte' },
    { label: 'Ablauf', href: '#ablauf' },
    { label: 'Über mich', href: '#ueber-mich' },
    { label: 'Kontakt', href: '#kontakt' },
  ],
  cta: { label: 'Erstgespräch', href: '#kontakt' },
  menue: {
    oeffnen: 'Menü',
    schliessen: 'Schließen',
    ariaLabel: 'Menü',
  },
} as const;

export const hero = {
  ariaLabel: 'webdiv – Sinan Yilmaz, Websites und Web-Anwendungen, Günzburg',
  subLeft: 'Websites & Web-Anwendungen',
  subRight: 'Günzburg, Bayern',
} as const;

/* Portraetfoto: Datei als public/portrait.jpg ablegen –
   Portraet-Block und "Über mich" greifen automatisch. */
export const portraet = {
  ariaLabel: 'Porträt Sinan Yilmaz',
  bildSrc: '/portrait.jpg',
  bildAlt: 'Porträt von Sinan Yilmaz, frontal vor schwarzem Hintergrund',
  platzhalter: '[ Porträt folgt ]',
  platzhalterPfad: 'public/portrait.jpg',
  pills: ['Web Designer', 'Frontend Developer', 'Software Engineer'],
  pillsLabel: 'Web Designer, Frontend Developer, Software Engineer',
} as const;

export const statement = {
  ariaLabel: 'Leitsatz',
  lead: 'Seit 10+ Jahren',
  rest: ' schaffe ich digitale Lösungen, die mehr können als gut aussehen.',
  /* Diese Woerter fuellen sich ins Kobalt statt Papier-Weiss */
  accents: ['mehr', 'können'],
} as const;

export const leistungen = {
  eyebrow: 'Leistungen',
  titel: 'Leistungen',
  eintraege: [
    {
      titel: 'Firmen-Websites',
      text: 'Kein Baukasten, kein gekauftes Theme. Ihre Website wird für Ihre Firma entworfen und gebaut, damit sie aussieht wie Ihr Betrieb und nicht wie eine Vorlage.',
    },
    {
      titel: 'Web-Anwendungen',
      text: 'Individuelle Software im Browser für einen konkreten Ablauf in Ihrem Betrieb: Kundenportal, interne Verwaltung, Buchung, Auftragsabwicklung. Nichts zu installieren.',
    },
    {
      titel: 'Schnittstellen & Datenbanken',
      text: 'Das Fundament dahinter: Datenbank, Login und Rechte, Datenimporte, Anbindung an Systeme, die Sie schon nutzen. Ich baue das Backend auf Supabase oder binde Ihre bestehende Schnittstelle an.',
    },
  ],
  browserUrl: 'bucan-eventservice.de',
  screenshotPlatzhalter: 'Screenshot folgt',
} as const;

export const projekte = {
  eyebrow: 'Projekte',
  titel: 'Zuletzt gebaut',
  cursorPill: 'Projekt ansehen',
  thumbPlatzhalter: 'Screenshot folgt',
  eintraege: [
    {
      jahr: '2026',
      titel: 'Bucan GmbH',
      sub: 'Premium Catering & Eventservice, Günzburg',
      meta: 'One-Pager · Design & Entwicklung',
      href: '/projekte/bucan-eventservice',
    },
  ],
} as const;

export const ablauf = {
  eyebrow: 'Ablauf',
  titel: 'Vier Schritte, ein Ansprechpartner.',
  schritte: [
    {
      nummer: '01',
      titel: 'Erstgespräch',
      text: 'Kostenlos und unverbindlich. Wir klären, was Sie brauchen – und ob ich der Richtige dafür bin.',
    },
    {
      nummer: '02',
      titel: 'Konzept & Festpreis',
      text: 'Sie bekommen ein schriftliches Konzept mit Umfang und Zeitplan – und einen Festpreis, der gilt.',
    },
    {
      nummer: '03',
      titel: 'Design & Umsetzung',
      text: 'Design und Code entstehen bei mir am selben Tisch. Zwischenstände sehen Sie im Browser, nicht auf Folien.',
    },
    {
      nummer: '04',
      titel: 'Livegang & Betreuung',
      text: 'Ich bringe Ihre Seite oder Anwendung live und bleibe dran: Änderungen, Erweiterungen, Pflege.',
    },
  ],
  hinweis: 'Festpreis nach Erstgespräch – das Erstgespräch ist kostenlos.',
} as const;

export const ueberMich = {
  eyebrow: 'Über mich',
  bildAlt: 'Sinan Yilmaz, engerer Bildausschnitt',
  text: 'Ich bin Sinan Yilmaz, Webentwickler aus Günzburg. Seit über zehn Jahren baue ich Oberflächen und Anwendungen für den Browser – heute vor allem mit React, Next.js und Supabase. webdiv ist bewusst klein: Von der ersten Skizze bis zum Livegang sprechen Sie mit dem, der Ihre Seite auch baut.',
  signaturLabel: 'Unterschrift Sinan Yilmaz',
} as const;

export const kontakt = {
  titel: 'Was haben Sie vor?',
  text: 'Neue Website oder eine Anwendung für Ihren Betrieb – schreiben Sie mir kurz, worum es geht. Sie bekommen eine klare Einschätzung, was sinnvoll ist und was nicht. Festpreis nach Erstgespräch – das Erstgespräch ist kostenlos.',
  formular: {
    name: { label: 'Name', fehler: 'Bitte geben Sie Ihren Namen an.' },
    email: { label: 'E-Mail', fehler: 'Bitte prüfen Sie die E-Mail-Adresse.' },
    nachricht: { label: 'Worum geht es?', fehler: 'Bitte beschreiben Sie kurz Ihr Vorhaben.' },
    absenden: 'Anfrage senden',
    erfolg: 'Danke – Ihre Nachricht ist angekommen. Ich melde mich.',
    fehlerServer: 'Das hat nicht geklappt. Schreiben Sie mir direkt an [E-Mail-Adresse].',
  },
  direkt: 'Oder direkt: [E-Mail-Adresse]',
} as const;

export const footer = {
  linksPrefix: 'created by',
  linksName: 'webdiv',
  copyright: '© 2026',
  rechtliches: [
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutz', href: '/datenschutz' },
  ],
  rechtsPrefix: 'created with',
  rechtsName: 'Claude Code',
} as const;
