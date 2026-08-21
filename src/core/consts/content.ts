/* Saemtliche Texte der webdiv-One-Page – woertlich aus dem Design-Briefing
   Runde 1 uebernommen (Prototyp index.html). [Platzhalter] bleiben sichtbar,
   bis die echten Angaben vorliegen (siehe .webdiv/tasklist.md). */

export const site = {
  url: 'https://webdiv.de',
  title: 'webdiv – Websites & Web-Anwendungen. Sinan Yilmaz, Günzburg',
  /* Description am Statement ausgerichtet ("mehr können als gut aussehen"),
     Variante A – abgesegnet 17.08.2026 */
  description:
    'Digitale Lösungen, die mehr können als gut aussehen: Firmen-Websites und Web-Anwendungen, entworfen und entwickelt von Sinan Yilmaz – webdiv, Günzburg.',
  ogImage: '/og-image.jpg',
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
  /* tags: Keyword-Pills am Kartenfuss – Begriffe aus den Texten bzw. der
     Bucan-Blaupause abgeleitet, Labels sind [Vorschlag] (18.08.2026) */
  eintraege: [
    {
      titel: 'Firmen-Websites',
      text: 'Kein Baukasten, kein gekauftes Theme. Ihre Website wird für Ihre Firma entworfen und gebaut, damit sie aussieht wie Ihr Betrieb und nicht wie eine Vorlage.',
      tags: ['Design & Entwicklung', 'SEO', 'Hosting & Pflege'],
    },
    {
      titel: 'Web-Anwendungen',
      text: 'Individuelle Software im Browser für einen konkreten Ablauf in Ihrem Betrieb: Kundenportal, interne Verwaltung, Buchung, Auftragsabwicklung. Nichts zu installieren.',
      tags: ['Kundenportale', 'Verwaltung', 'Buchung & Abwicklung'],
    },
    {
      titel: 'Schnittstellen & Datenbanken',
      text: 'Das Fundament dahinter: Datenbank, Login und Rechte, Datenimporte, Anbindung an Systeme, die Sie schon nutzen. Ich baue das Backend auf Supabase oder binde Ihre bestehende Schnittstelle an.',
      tags: ['Backend', 'Nutzer & Rechte', 'Datenübernahme'],
    },
  ],
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
      thumbSrc: '/projekte/bucan/thumb.webp',
    },
    {
      jahr: '2025–26',
      titel: 'ERP für die Bauwirtschaft',
      sub: 'Modulare B2B-Anwendung, im Kundenauftrag',
      meta: 'Web-Anwendung · Frontend & Beratung',
      href: '/projekte/erp-bauwirtschaft',
      thumbSrc: '/projekte/erp-bauwirtschaft/thumb.webp',
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
  titel: 'Über mich',
  bildAlt: 'Sinan Yilmaz, engerer Bildausschnitt',
  text: 'Ich bin Sinan Yilmaz, Webentwickler aus Günzburg. Seit über zehn Jahren baue ich Oberflächen und Anwendungen für den Browser – heute vor allem mit React, Next.js und Supabase. webdiv ist bewusst klein: Von der ersten Skizze bis zum Livegang sprechen Sie mit dem, der Ihre Seite auch baut.',
  signaturLabel: 'Unterschrift Sinan Yilmaz',
} as const;

/* FAQ-Kurzsektion als Chat-Fenster (Beschluss 21.08.2026): Startseiten-
   Fassungen der Fragen aus .webdiv/faq.md; Antworten 2+3 sowie Status- und
   Composer-Zeile sind [Vorschlag] (siehe .webdiv/tasklist.md) */
export const faq = {
  eyebrow: 'FAQ',
  titel: 'Bevor wir sprechen.',
  chat: {
    avatar: 'w',
    name: 'Sinan Yilmaz',
    /* bewusst kein Erreichbarkeits-Status („online" suggeriert Live-Chat) */
    status: 'Websites & Web-Anwendungen',
  },
  /* akzent: genau eine Stelle pro Antwort faerbt sich Kobalt – jeweils der
     eine Merksatz der Antwort (Anti-Verkaufs-/Kernaussage), muss woertlich
     im Antwort-Text vorkommen. Texte value-first gekuerzt 21.08.2026,
     [Vorschlag] (siehe .webdiv/faq.md „Value-first-Umbau") */
  paare: [
    {
      chip: 'Frage 01',
      frage: 'Ist unsere Website eigentlich noch gut genug?',
      antwort: [
        'Drei Prüfungen, keine Minute Aufwand: Lädt sie auf dem Handy sofort? Findet ein Fremder Ihre Telefonnummer und Ihre wichtigste Leistung in zehn Sekunden? Und wirkt sie neben Ihren zwei besten Mitbewerbern eine Klasse darüber – oder darunter?',
        'Zweimal Nein: Dann lohnt sich ein Gespräch. Alles Ja: Behalten Sie Ihre Seite.',
      ],
      akzent: 'Behalten Sie Ihre Seite',
    },
    {
      chip: 'Frage 02',
      frage: 'Kann ich meine Website nicht einfach selbst mit KI bauen?',
      antwort: [
        'Können Sie. Wenn Ihre Website vor allem Visitenkarte ist – Kontakt, Öffnungszeiten, drei Bilder –, reicht das oft völlig. Ich nutze KI selbst, sie macht mich schneller.',
        'Was sie nicht ersetzt: das Urteil, was gut ist – und das Fertigmachen bis ins letzte Detail. Das Billige wird gerade billiger. Das Gute wird dadurch sichtbarer.',
      ],
      akzent: 'Das Gute wird dadurch sichtbarer',
    },
    {
      chip: 'Frage 03',
      frage: 'Wir wissen noch nicht genau, was wir brauchen. Ist das zu früh?',
      antwort: [
        'Nein – genau dafür ist das Erstgespräch da. Sie bringen die Ausgangslage mit, ich die Einschätzung, was sinnvoll ist und was nicht.',
        'Manchmal lautet die Antwort auch: Sie brauchen noch keine neue Website. Auch das erfahren Sie kostenlos.',
      ],
      akzent: 'Sie brauchen noch keine neue Website',
    },
  ],
  composer: {
    /* Tipp-Geist: Beispiel-Fragen tippen sich in die Leiste, die ganze
       Leiste bleibt ein Link zum Kontaktformular (Entscheidung 21.08.2026) */
    beispiele: [
      'Was kostet eine Website?',
      'Wir haben schon eine Website – lohnt sich ein Neuanfang?',
      'Wie lange dauert so ein Projekt?',
    ],
    sendenLabel: 'Zum Kontaktformular',
    href: '#kontakt',
  },
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
} as const;

/* 404-Seite – Texte sind [Vorschlag], bitte absegnen (siehe .webdiv/tasklist.md) */
export const notFound = {
  metaTitle: 'Seite nicht gefunden – webdiv',
  code: '404',
  titel: 'Diese Seite gibt es nicht.',
  text: 'Die aufgerufene Adresse führt ins Leere – vielleicht ein Tippfehler, vielleicht ein veralteter Link. Alles Weitere finden Sie auf der Startseite.',
  cta: { label: 'Zur Startseite', href: '/' },
} as const;

export const footer = {
  /* Abschluss-Band ueber der Credits-Zeile: Marke + Adresszeile links, Icons rechts.
     E-Mail ist [Platzhalter], bis die Adresse final ist (siehe .webdiv/tasklist.md) */
  adresse: 'Websites & Anwendungen · Günzburg · [E-Mail-Adresse]',
  soziale: [
    { id: 'mail', label: 'E-Mail', href: 'mailto:[E-Mail-Adresse]' },
    { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/webdiv.de' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/sinan-yilmaz-webdiv/' },
  ],
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
