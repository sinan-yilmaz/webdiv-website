# webdiv – Website (Runde 2: Next.js)

One-Page-Website für webdiv (Sinan Yilmaz, Webentwickler, Günzburg) als Next.js-App
(App Router, TypeScript, `output: 'export'`) nach der Bucan-Blaupause, Desktop 1440 px,
responsive bis 390 px (Token-Ableitung in `tokens.css`, Layout-Ableitung am Ende von
`main.css`; Breakpoints < 1024 und < 768).
Ansehen: `yarn dev` → http://localhost:3000 · statischer Build: `yarn build` → `out/`.
Der Runde-1-Prototyp (statisches HTML/CSS/JS inkl. `design-system.html`) liegt als Snapshot in
`.website/prototyp/` (Ansehen: dort `node serve.js` → http://localhost:4173).
Aufgabenstand und offene Punkte: `.webdiv/tasklist.md` (siehe „Projektpläne").

## Struktur (frontend-next-plugin)

- `src/app/` – Route-Shells: `layout.tsx` (Fonts via `next/font/local`, Metadata, Veil-Script), `page.tsx` → HomePage, `projekte/bucan-eventservice/page.tsx` → BucanEventservicePage
- `src/views/home/HomePage/` – One-Page-Komposition, eine Komponente pro Sektion (Preloader, SiteNav, Hero, Portrait, Statement, Services, Projects, Process, About, Contact)
- `src/views/projekte/BucanEventservicePage/` – Case Study (Intro, Screen, Brief, Design, Craft, Cta); Bucan-Kundenfarben nur hier, als Inline-Tokens aus `caseStudyBucan.ts`
- `src/core/consts/content.ts` – sämtliche One-Page-Texte (wörtlich aus dem Briefing, `[Platzhalter]` sichtbar) · `caseStudyBucan.ts` – Case-Study-Texte (Fakten aus der Bucan-Referenz) · `signature.ts` – Unterschrift-Pfade
- `src/core/components/branding/` – BrandMark + SignatureMark mit Zeichnen-Animationen · `shell/` – SubpageNav (Unterseiten) · `transitions/` – StepEdge (Treppenkante)
- `src/lib/motion/` – gemeinsamer rAF-Loop mit gelerptem Scrollwert (`services/frameLoop.ts`), Remeasure-Kanal, Sichtbarkeits-/Reveal-Hooks
- `src/assets/css/tokens.css` – Design-Tokens (einzige Quelle für Farbe/Typo/Raster/Motion-Werte) · `main.css` – Layout, Komponenten, Sektionen der One-Page · `case-study.css` – Case-Study-Sektionen

**Porträt nachrüsten:** Datei als `public/portrait.jpg` ablegen – Porträt-Block und „Über mich“
greifen automatisch (bis dahin markierte `[ Porträt folgt ]`-Platzhalter).

## Projektpläne (`.webdiv/` – intern, nicht deployen)

Alle Pläne und der Arbeitsstand dieses Projekts liegen in `.webdiv/`:

- **`.webdiv/tasklist.md`** – Aufgabenstand, offene Entscheidungen, Runde-2-Plan;
  zu Sessionbeginn lesen und beim Erledigen oder Anlegen von Aufgaben pflegen.
- **`.webdiv/akquise-plan.md`** – Akquise-, Marketing- und Social-Media-Plan nach
  Livegang (Website-Check, Kanäle, Pitch-Demos, Referenz-Pflege; Instagram/
  LinkedIn-Strategie in Abschnitt 11); reinschauen, sobald ein Thema Marketing,
  Leads, Referenzen, Preise oder Social Media berührt.
- **`.webdiv/faq.md`** – Fragensammlung für die FAQ-Unterseite (kommt erst nach
  dem Livegang); Q&A-Texte entstehen und reifen hier in webdiv-Stimme, bevor
  sie auf die Website gehen – neue Kundenfragen/Einwände hier ergänzen.

## Referenzdokumente (vor Arbeit an Runde 2 lesen)

- **`.website/HANDOFF.md`** – Handoff des Runde-1-Prototyps: Dateiübersicht,
  Logo-Konstruktion, umgesetzte Motion (Vanilla) und Design-Intent für die
  Umsetzung mit Lenis + GSAP, Platzhalter-Mechanik fürs Porträt, bekannte Punkte.
- **`.website/referenz-bucan-website.md`** – vollständige Projektdoku der
  Bucan-Website (bucan-eventservice.de): verbindliche Faktenquelle für die
  Case Study `/projekte/bucan-eventservice` (nichts erfinden) und Blaupause für
  Stack-, Hosting-, Formular-, DSGVO- und Deploy-Entscheidungen sowie die
  gelernten Prinzipien (Abschnitt 13).

## Website-Checkliste (projektübergreifend)

`../checklist/checklist.md` ist die Checkliste für alle webdiv-Websites (Meta/OG,
JSON-LD, Icons, robots/sitemap, .htaccess, Recht, Sprache, Performance, a11y,
Livegang). Beim Abarbeiten gilt deren Abschnitt 0: nichts ungeprüft implementieren
(Primärquellen-Check mit Prüfdatum), jeden Punkt mit Vorschau/Verifikation abschließen.
**Taucht in der Arbeit ein neues Ding/Thema auf, das dort noch fehlt** (neuer Technik-,
SEO-, Recht- oder Qualitätsaspekt), **aktiv vorschlagen, ob es in die Checkliste
aufgenommen werden soll** – Entscheidung trifft Sinan, nicht ungefragt eintragen.
