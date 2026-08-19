/* Case Study /projekte/erp-bauwirtschaft – zweite Referenz (anonymisiert).
   Freigabe des Auftraggebers (muendlich, 19.08.2026): Nennung „Stefan E." und
   Testimonial ja – Produktname, Erklaerung von Produkt/Funktionalitaeten,
   App-Link und Launch-Zeitpunkt duerfen NICHT erscheinen (Produkt ist noch
   unveroeffentlicht). Fakten am 19.08.2026 aus dem Projekt-Repository
   verifiziert (git-Historie: Aug 2025–Jun 2026, 201 von 320 Commits, 209
   eigene Komponenten, ~30 Ansichten). Saemtliche Texte [Vorschlag] – vor dem
   Livegang von Sinan absegnen und Stefan zur Kurzfreigabe vorlegen.
   Die Produktfarben (UI-Theme der Anwendung) gelten nur in dieser Case Study. */

const erpFarben = {
  dunkel: '#1E2A24',
  salbei: '#507A61',
  hell: '#FCFCFC',
} as const;

export const caseStudyErp = {
  meta: {
    title: 'Projekt: ERP für die Bauwirtschaft – Frontend & technische Beratung · webdiv',
    description:
      'Case Study: Das Frontend eines modularen ERP für die Bauwirtschaft – zehn Monate, über 200 eigene Komponenten, React, TanStack Query und Zod. Frontend-Architektur und technische Beratung: webdiv.',
  },
  farbTokens: erpFarben,
  zurueck: { label: 'Alle Projekte', href: '/#projekte' },
  intro: {
    eyebrow: 'Projekt · 2025–2026',
    titel: 'ERP für die Bauwirtschaft',
    sub: 'Modulare B2B-Anwendung – im Auftrag von Stefan E.',
    status:
      'Das Produkt ist noch nicht veröffentlicht – diese Referenz kommt deshalb ohne Namen und Link aus.',
    fakten: [
      { label: 'Leistung', wert: 'Frontend & technische Beratung' },
      { label: 'Stack', wert: 'React · TanStack Query · Zod · AWS Cognito' },
      { label: 'Umfang', wert: '10 Monate · 200+ Komponenten' },
      { label: 'Status', wert: 'Produkt vor Veröffentlichung' },
    ],
  },
  screens: {
    eintraege: [
      {
        label: 'Nutzerverwaltung · Übersicht',
        bildSrc: '/projekte/erp-bauwirtschaft/screen-tabelle.webp',
        bildAlt: 'Nutzerverwaltung der Anwendung: Tabellenansicht mit Beispieldaten',
        platzhalterPfad: 'public/projekte/erp-bauwirtschaft/screen-tabelle.webp',
      },
      {
        label: 'Nutzerverwaltung · Detailansicht',
        bildSrc: '/projekte/erp-bauwirtschaft/screen-detail.webp',
        bildAlt: 'Detailansicht eines Nutzers mit Stammdaten, Modulen und Rollen, Beispieldaten',
        platzhalterPfad: 'public/projekte/erp-bauwirtschaft/screen-detail.webp',
      },
    ],
    platzhalter: 'Screenshot folgt',
    hinweis: 'Zwei Ansichten der Nutzerverwaltung – Beispieldaten, neutralisierte Oberfläche.',
  },
  auftrag: {
    eyebrow: 'Auftrag',
    titel: 'Ein Frontend, das mitwachsen muss.',
    absaetze: [
      'Ein Unternehmer entwickelt mit einem kleinen Team ein modulares B2B-Produkt für die Bauwirtschaft: viele Fachbereiche, feingranulare Rechte, wachsender Funktionsumfang. Gesucht war jemand, der das Frontend nicht nur baut, sondern seine Architektur verantwortet – und bei technischen Fragen in der Tiefe berät.',
      'Ich habe das Fundament gelegt – die Struktur nach Fachdomänen, ein gemeinsames Formular- und Tabellensystem, die Anbindung an Anmeldung und Schnittstellen – und als Hauptautor den Großteil der Anwendung gebaut, in Zusammenarbeit mit dem Team hinter Backend und Produkt.',
    ],
    detail:
      'Das Produkt ist noch nicht veröffentlicht. Sein Name, seine Oberfläche im Detail und sein Funktionsumfang bleiben deshalb bewusst außen vor – so, wie es mit dem Auftraggeber vereinbart ist.',
  },
  fundament: {
    eyebrow: 'Fundament',
    titel: 'Eine Architektur, die Ordnung hält.',
    text: 'Ein Produkt mit vielen Fachbereichen bleibt nur konsistent, wenn das Fundament die Ordnung vorgibt: Der Code ist nach Fachdomänen geschnitten, Formulare und Tabellen kommen aus einem gemeinsamen System, und jede Antwort der Schnittstelle wird gegen ein Schema geprüft, bevor sie die Oberfläche erreicht. Neue Ansichten entstehen nach Muster statt nach Laune – die dreißigste so sauber wie die erste.',
    zahlen: [
      { wert: '10', label: 'Monate' },
      { wert: '201/320', label: 'Commits als Hauptautor' },
      { wert: '200+', label: 'eigene Komponenten' },
      { wert: '~30', label: 'Ansichten' },
    ],
    kapitel: [
      {
        label: 'Konfigurierbare Logik',
        text: 'Fachanwender definieren eigene Felder, Bedingungen und Berechnungen – das Frontend prüft Abhängigkeiten bis zur Zyklenerkennung und baut Formulare, Tabellen und Validierung aus der Konfiguration auf.',
      },
      {
        label: 'Rechte & Module',
        text: 'Was ein Nutzer sieht, entscheiden Rolle und freigeschaltete Module: Navigation und Ansichten passen sich an, die Anmeldung läuft mandantenfähig über AWS Cognito.',
      },
    ],
  },
  handwerk: {
    eyebrow: 'Arbeitsweise',
    titel: 'Nachvollziehbar von der Aufgabe bis zum Commit.',
    punkte: [
      {
        titel: 'Nach Domänen geschnitten',
        text: 'Die Codebasis folgt den Fachbereichen des Produkts, nicht technischen Zufällen – wer ein Thema sucht, findet es an genau einer Stelle.',
      },
      {
        titel: 'Ein System für Formulare & Tabellen',
        text: 'Eingabefelder, Validierung und Datentabellen sind einmal sauber gebaut und überall wiederverwendet – gleiche Bedienung in jeder Ansicht.',
      },
      {
        titel: 'Geprüfte Schnittstellen',
        text: 'Jede API-Antwort wird zur Laufzeit gegen ein Zod-Schema validiert: Fehler fallen an der Grenze auf, nicht irgendwo in der Oberfläche.',
      },
      {
        titel: 'Parallel zum Backend',
        text: 'Mit Mock-Daten und klaren Verträgen entstand das Frontend, ohne auf fertige Schnittstellen zu warten – Backend und Frontend trafen sich am Vertrag.',
      },
      {
        titel: 'Strukturierte Zusammenarbeit',
        text: 'Aufgaben in Azure DevOps, dokumentierte Entscheidungen und offene Fragen, eine gepflegte Landkarte der Fachbegriffe – jeder Stand war nachvollziehbar.',
      },
      {
        titel: 'Beratung in der Tiefe',
        text: 'Wenn Fragen über das Frontend hinausgingen – Datenmodell, Rechtekonzept, technische Abwägungen –, war ich erster Ansprechpartner.',
      },
    ],
    betrieb:
      'Übergabe: dokumentierte Struktur, konsistente Muster – das Team kann jede Stelle weiterbauen.',
  },
  zitat: {
    text: 'Sinan hat das Fundament unseres Frontends gelegt und den Großteil der Anwendung gebaut – strukturiert, eigenständig und in einer Qualität, auf die sich das ganze Team verlassen konnte. Auch bei technischen Fragen über das Frontend hinaus war er unser erster Ansprechpartner. Jederzeit wieder.',
    name: 'Stefan E.',
    rolle: 'Auftraggeber',
  },
  cta: {
    titel: 'Und was haben Sie vor?',
    text: 'Neue Website oder eine Anwendung für Ihren Betrieb – das Erstgespräch ist kostenlos.',
    button: { label: 'Erstgespräch', href: '/#kontakt' },
  },
} as const;
