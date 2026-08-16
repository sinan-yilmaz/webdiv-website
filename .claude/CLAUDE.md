# webdiv – Website (Runde 2: Next.js)

One-Page-Website für webdiv (Sinan Yilmaz, Webentwickler, Günzburg) als Next.js-App
(App Router, TypeScript, `output: 'export'`) nach der Bucan-Blaupause, Desktop 1440 px,
responsive bis 390 px (Token-Ableitung in `tokens.css`, Layout-Ableitung am Ende von
`main.css`; Breakpoints < 1024 und < 768).
Ansehen: `yarn dev` → http://localhost:3000 · statischer Build: `yarn build` → `out/`.
Der Runde-1-Prototyp (statisches HTML/CSS/JS inkl. `design-system.html`) liegt als Snapshot in
`.website/prototyp/` (Ansehen: dort `node serve.js` → http://localhost:4173).
Aufgabenstand und offene Punkte: `tasklist.md` im Projektroot.

## Struktur (frontend-next-plugin)

- `src/app/` – Route-Shells: `layout.tsx` (Fonts via `next/font/local`, Metadata, Veil-Script), `page.tsx` → HomePage, `projekte/bucan-eventservice/page.tsx` → BucanEventservicePage
- `src/views/home/HomePage/` – One-Page-Komposition, eine Komponente pro Sektion (Preloader, SiteNav, Hero, Portrait, Statement, Services, Projects, Process, About, Contact, DevControls)
- `src/views/projekte/BucanEventservicePage/` – Case Study (Intro, Screen, Brief, Design, Craft, Cta); Bucan-Kundenfarben nur hier, als Inline-Tokens aus `caseStudyBucan.ts`
- `src/core/consts/content.ts` – sämtliche One-Page-Texte (wörtlich aus dem Briefing, `[Platzhalter]` sichtbar) · `caseStudyBucan.ts` – Case-Study-Texte (Fakten aus der Bucan-Referenz) · `signature.ts` – Unterschrift-Pfade
- `src/core/components/branding/` – BrandMark + SignatureMark mit Zeichnen-Animationen · `shell/` – SubpageNav (Unterseiten) · `transitions/` – StepEdge (Treppenkante)
- `src/lib/motion/` – gemeinsamer rAF-Loop mit gelerptem Scrollwert (`services/frameLoop.ts`), Remeasure-Kanal, Sichtbarkeits-/Reveal-Hooks
- `src/assets/css/tokens.css` – Design-Tokens (einzige Quelle für Farbe/Typo/Raster/Motion-Werte) · `main.css` – Layout, Komponenten, Sektionen der One-Page · `case-study.css` – Case-Study-Sektionen

**Porträt nachrüsten:** Datei als `public/portrait.jpg` ablegen – Porträt-Block, „Über mich“
und Footer-Pixelbild greifen automatisch (bis dahin markierte `[ Porträt folgt ]`-Platzhalter).

## Referenzdokumente (vor Arbeit an Runde 2 lesen)

- **`.website/HANDOFF.md`** – Handoff des Runde-1-Prototyps: Dateiübersicht,
  Logo-Konstruktion, umgesetzte Motion (Vanilla) und Design-Intent für die
  Umsetzung mit Lenis + GSAP, Platzhalter-Mechanik fürs Porträt, bekannte Punkte.
- **`.website/referenz-bucan-website.md`** – vollständige Projektdoku der
  Bucan-Website (bucan-eventservice.de): verbindliche Faktenquelle für die
  Case Study `/projekte/bucan-eventservice` (nichts erfinden) und Blaupause für
  Stack-, Hosting-, Formular-, DSGVO- und Deploy-Entscheidungen sowie die
  gelernten Prinzipien (Abschnitt 13).
