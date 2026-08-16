/* Case Study /projekte/bucan-eventservice – saemtliche Fakten stammen aus
   .website/referenz-bucan-website.md (verbindliche Quelle, nichts erfinden):
   keine Preise, keine erfundenen Kundenstimmen, Symirna Foods neutral.
   Die Bucan-Kundenfarben gelten nur innerhalb dieser Case Study. */

const bucanFarben = {
  gruen: '#0E2318',
  gold: '#C2A25E',
  creme: '#F7F3EA',
} as const;

export const caseStudyBucan = {
  meta: {
    title: 'Projekt: Bucan GmbH – Website für Premium Catering & Eventservice · webdiv',
    description:
      'Case Study: One-Pager für die Bucan GmbH aus Günzburg – Design aus der Print-CI, statisch exportiertes Next.js, DSGVO-sauber ohne Cookie-Banner. Konzept, Design und Entwicklung: webdiv.',
  },
  farbTokens: bucanFarben,
  zurueck: { label: 'Alle Projekte', href: '/#projekte' },
  intro: {
    eyebrow: 'Projekt · 2026',
    titel: 'Bucan GmbH',
    sub: 'Premium Catering & Eventservice, Günzburg',
    live: { label: 'bucan-eventservice.de', href: 'https://bucan-eventservice.de' },
    liveHinweis: 'öffnet in neuem Tab',
    fakten: [
      { label: 'Leistung', wert: 'One-Pager · Design & Entwicklung' },
      { label: 'Stack', wert: 'Next.js · TypeScript · statischer Export' },
      { label: 'Hosting', wert: 'Strato, deutsches Rechenzentrum' },
      { label: 'Status', wert: 'Live seit 2026' },
    ],
  },
  screen: {
    url: 'bucan-eventservice.de',
    bildSrc: '/projekte/bucan/screen-home.webp',
    bildAlt: 'Startseite von bucan-eventservice.de',
    platzhalter: 'Screenshot folgt',
    platzhalterPfad: 'public/projekte/bucan/screen-home.webp',
  },
  auftrag: {
    eyebrow: 'Auftrag',
    titel: 'Vertrauen aufbauen, Anfragen erzeugen.',
    absaetze: [
      'Ein One-Pager mit Impressum, Datenschutzerklärung und gestalteter 404-Seite. Die Website soll Vertrauen aufbauen und Event-Anfragen erzeugen – und zugleich als Referenz für sauberes Handwerk stehen.',
      'Festpreis mit klarem Umfang: Nach der Abnahme gilt Feature-Stopp, neue Ideen wandern bepreist auf die v2-Liste. Bewusste Inhaltsregeln von Anfang an: keine Preise auf der Website, keine erfundenen Kundenstimmen.',
    ],
    detail:
      'Detailtreue bis in die Quellen: Die Firmierung „Bucan GmbH“ stammt aus der Handelsregister-Mitteilung, die Schreibweise „Symirna“ vom echten Standschild – amtliche und physische Quellen schlagen Entwurfsmaterial.',
  },
  design: {
    eyebrow: 'Design',
    titel: 'Die Print-CI der Kundin, ins Web übersetzt.',
    text: 'Tannengrün, Gold und Creme kommen direkt aus der Print-CI, dazu Anthrazit für den Fließtext. Gold bleibt reiner Akzent – nie Fließtext auf hellem Grund. Marcellus führt als Display-Schrift, Jost trägt den Text, und die Handschrift Great Vibes erscheint an exakt drei Stellen: die „goldene Handschrift“ als Signature-Element der Marke.',
    farben: [
      { name: 'Tannengrün', hex: bucanFarben.gruen },
      { name: 'Gold', hex: bucanFarben.gold, hinweis: 'nur Akzente' },
      { name: 'Creme', hex: bucanFarben.creme },
    ],
    kapitel: [
      {
        label: 'Dramaturgie',
        text: 'Zwei Kapitel erzählen die Seite: das Catering als eleganter Abend in Dunkelgrün und Kerzenlicht, Symirna Foods als frischer Tag in Salbei und Tageslicht. Geschwungene, goldgesäumte Übergänge aus der Print-CI markieren den Kapitelwechsel.',
      },
      {
        label: 'Motion',
        text: 'Ein orchestrierter Hero-Moment, dezente Scroll-Reveals, eine Lightbox mit Zoom. Bei reduzierter Bewegung bleiben die Fades erhalten – nur Bewegungs- und Zoom-Anteile entfallen.',
      },
    ],
  },
  handwerk: {
    eyebrow: 'Technik & Datenschutz',
    titel: 'Schnell, robust, ohne Cookie-Banner.',
    punkte: [
      {
        titel: 'Statisch exportiert',
        text: 'Next.js (App Router, TypeScript) als statischer Export: reines HTML, sämtliche Inhalte sofort da – gut für Ladezeit und Suchmaschinen.',
      },
      {
        titel: 'Deutsches Hosting',
        text: 'Gehostet bei Strato im deutschen Rechenzentrum, Auftragsverarbeitungsvertrag inklusive – eine kurze, saubere DSGVO-Kette.',
      },
      {
        titel: 'Formular ohne Drittanbieter',
        text: 'Anfragen laufen über einen eigenen Handler auf demselben Webspace – kein Formulardienst, keine US-Anbieter. Spam-Schutz per Honeypot und Ausfülldauer-Prüfung, Versand authentifiziert per SMTP.',
      },
      {
        titel: 'Kein Cookie-Banner nötig',
        text: 'Keine Tracker, keine Analyse-Tools, keine externen Einbindungen; die Schriften liegen auf dem eigenen Server. Wo nichts einwilligungspflichtig ist, braucht es keinen Banner – das ist Architektur, kein Zufall.',
      },
      {
        titel: 'Deployment auf Knopfdruck',
        text: 'Jeder Push baut die Seite automatisch und lädt sie verschlüsselt auf den Server. Zugangsdaten liegen im Secret-Tresor, nie im Code.',
      },
      {
        titel: 'SEO handfest',
        text: 'Seitentitel mit der Leistung vorn („Premium Catering & Eventservice in Günzburg“), Open-Graph-Bild, Sitemap und strukturierte Daten als LocalBusiness.',
      },
    ],
    betrieb:
      'Im Betrieb: Textänderung = Edit + Push, die Seite deployt sich selbst – kein CMS, das brachliegt. Änderungen übernimmt webdiv.',
  },
  cta: {
    titel: 'Und was haben Sie vor?',
    text: 'Neue Website oder eine Anwendung für Ihren Betrieb – das Erstgespräch ist kostenlos.',
    button: { label: 'Erstgespräch', href: '/#kontakt' },
  },
} as const;
