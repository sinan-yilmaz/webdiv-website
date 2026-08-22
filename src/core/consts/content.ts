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
      text: 'Kein Baukasten, kein gekauftes Theme. Ich entwerfe und baue Ihre Website eigens für Ihre Firma. Sie sieht aus wie Ihr Betrieb, lädt schnell und macht aus Besuchern Anfragen.',
      tags: ['Design & Entwicklung', 'SEO', 'Hosting & Pflege'],
    },
    {
      titel: 'Web-Anwendungen',
      text: 'Manche Abläufe passen in kein fertiges Programm. Ich baue Ihnen dafür eine eigene Anwendung, die genau Ihrem Ablauf folgt. Ein Kundenportal, ein Buchungssystem, eine interne Verwaltung. Alles im Browser, ohne Installation, für Ihr ganzes Team.',
      tags: ['Kundenportale', 'Verwaltung', 'Buchung & Abwicklung'],
    },
    {
      titel: 'Schnittstellen & Datenbanken',
      text: 'Hinter jeder Website und jeder Anwendung liegt ein Fundament. Datenbank, Login und Rechte, Anbindung an die Systeme, mit denen Sie schon arbeiten. Ich baue es solide auf oder binde Ihre bestehende Schnittstelle an.',
      tags: ['Backend', 'Nutzer & Rechte', 'Datenübernahme'],
    },
  ],
} as const;

export const projekte = {
  eyebrow: 'Projekte',
  titel: 'Zuletzt gebaut',
  cursorPill: 'Projekt ansehen',
  thumbPlatzhalter: 'Screenshot folgt',
  /* Zeilen-Formel (22.08.2026, mit Sinan abgestimmt):
     Kicker = jahr + meta, gerendert als "Jahr · Gattung · Rolle" (Gattung
     aus festem Vokabular: One-Pager, Website, Web-Anwendung, Online-Shop, ...;
     Rolle im Muster "A & B"). titel = staerkster nennbarer Identifikator –
     im Normalfall der Kundenname, nur bei Vertraulichkeit die Sache.
     sub = Antwort auf "... und das ist?" – beim Kundennamen Branche/Leistung
     + Ort, bei der Sache eine verstaendliche Einordnung + Auftragskontext;
     der sub darf Jargon des Titels uebersetzen, wiederholt aber nie etwas
     aus dem Kicker. */
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
      sub: 'Modulare B2B-Software, im Kundenauftrag',
      meta: 'Web-Anwendung · Frontend & Beratung',
      href: '/projekte/erp-bauwirtschaft',
      thumbSrc: '/projekte/erp-bauwirtschaft/thumb.webp',
    },
  ],
} as const;

export const ablauf = {
  eyebrow: 'Ablauf',
  /* Neue Fassung aus Lab-Runde 4, Variante E "kooperativ" (22.08.2026,
     abgesegnet von Sinan 22.08.2026 – siehe .webdiv/tasklist.md "Ablauf-Sektion & CTA"):
     Stationswort + Zusagenzeile (zusage) + Text, Iteration wohnt in
     Schritt 03; D-Alternativen fuer Titel/03 stehen in der Tasklist */
  titel: 'Wir entwickeln das zusammen.',
  schritte: [
    {
      nummer: '01',
      titel: 'Erstgespräch',
      zusage: 'kostenlos und unverbindlich',
      text: 'Wir klären, was Sie brauchen. Und ob ich der Richtige dafür bin.',
    },
    {
      nummer: '02',
      titel: 'Angebot',
      zusage: 'Festpreis, schriftlich',
      text: 'Aus dem Gespräch wird ein Konzept mit klarem Umfang. Was dort steht, gilt.',
    },
    {
      nummer: '03',
      titel: 'Umsetzung',
      zusage: 'Zwischenstände im Browser',
      text: 'Jeder neue Stand geht exklusiv an Sie und bleibt jederzeit erreichbar. Ihr Feedback fließt laufend ein.',
    },
    {
      nummer: '04',
      titel: 'Livegang',
      zusage: 'Betreuung auf Wunsch',
      text: 'Ich bringe Ihre Seite oder Anwendung live. Auf Wunsch bleibe ich Ihr Partner für Pflege und Weiterentwicklung.',
    },
  ],
  hinweis: 'Festpreis nach Erstgespräch – das Erstgespräch ist kostenlos.',
} as const;

export const ueberMich = {
  eyebrow: 'Über mich',
  titel: 'Über mich',
  bildAlt: 'Sinan Yilmaz, engerer Bildausschnitt',
  text: 'Ich bin Sinan Yilmaz, Webentwickler aus Günzburg. Seit über zehn Jahren entwickle ich fürs Web, vom One-Pager bis zur ausgewachsenen Web-Anwendung. Die beste Lösung ist oft die einfachste. Weniger, dafür zu Ende gedacht. Von mir kommt nichts, was ich nicht unterschreiben würde.',
  signaturLabel: 'Unterschrift Sinan Yilmaz',
} as const;

/* FAQ-Kurzsektion als Chat-Fenster (Beschluss 21.08.2026): Startseiten-
   Fassungen der Fragen aus .webdiv/faq.md; Frage 02 neu gedreht + abgesegnet
   22.08.2026 (Abgrenzung statt Selbstbau-Rechtfertigung). Antwort 3, Status-
   und Composer-Zeile sowie die Akzente 01+03 sind [Vorschlag] (siehe .webdiv/tasklist.md) */
export const faq = {
  eyebrow: 'FAQ',
  titel: 'Bevor wir sprechen.',
  chat: {
    avatar: 'w',
    name: 'Sinan Yilmaz',
    /* bewusst kein Erreichbarkeits-Status („online" suggeriert Live-Chat) */
    status: 'Websites & Web-Anwendungen',
  },
  /* akzent: genau eine Stelle pro Antwort faerbt sich Kobalt – Merksatz
     (Anti-Verkaufs-/Kernaussage) oder ein einzelnes Wort (02 „Expertise",
     Entscheidung Sinan 22.08.2026), muss woertlich im Antwort-Text
     vorkommen. Texte value-first gekuerzt 21.08.2026, Akzente 01+03
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
      frage: 'Heute kann doch jeder mit KI bauen. Wie heben wir uns da noch ab?',
      antwort: [
        'So neu ist die Lage nicht. Mit Baukästen konnte auch vorher jeder bauen. Am Werkzeug lag der Unterschied aber nie, sondern an der Expertise dahinter.',
        'Die KI hebt das nicht auf, sie verschärft es. Wer sie beherrscht, macht gute Arbeit besser. Wer sie nur bedient, macht billige billiger. Der Abstand wird größer, nicht kleiner.',
      ],
      akzent: 'Expertise',
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
    /* Pflichthinweis unterm Formular (Checkliste Abschnitt 7, Bucan-Blaupause):
       keine erzwungene Einwilligung, nur der Link auf die Erklaerung */
    hinweis: {
      vor: 'Ihre Angaben verwende ich ausschließlich zur Bearbeitung Ihrer Anfrage. Näheres in der ',
      linkLabel: 'Datenschutzerklärung',
      href: '/datenschutz/',
      nach: '.',
    },
    erfolg: 'Danke – Ihre Nachricht ist angekommen. Ich melde mich.',
    fehlerServer: 'Das hat nicht geklappt. Schreiben Sie mir direkt an hallo@webdiv.de.',
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
  adresse: 'Websites & Anwendungen · Günzburg · hallo@webdiv.de',
  soziale: [
    { id: 'mail', label: 'E-Mail', href: 'mailto:hallo@webdiv.de' },
    { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/webdiv.de' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/sinan-yilmaz-webdiv/' },
  ],
  linksPrefix: 'created by',
  linksName: 'webdiv',
  copyright: '© 2026',
  /* Trailing Slash wie der statische Export (next.config: trailingSlash) –
     erspart den 301 des Hosters auf die Slash-Variante */
  rechtliches: [
    { label: 'Impressum', href: '/impressum/' },
    { label: 'Datenschutz', href: '/datenschutz/' },
  ],
  rechtsPrefix: 'created with',
  rechtsName: 'Claude Code',
} as const;
