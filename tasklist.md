# webdiv – Tasklist (Stand: 16.08.2026, nach Next.js-Port)

## Ausgangspunkt

- Design-Briefing Runde 1: One-Page-Website für webdiv (Sinan Yilmaz, Günzburg) als interaktiver HTML-Prototyp, Desktop 1440 px
- Umfang Runde 1: Design-Tokens, Logo `/>` in 3 Varianten, komplette One-Page mit allen Sektionen + Motion (Vanilla JS), Regler-Panel
- Runde-1-Prototyp liegt als Snapshot in `.website/prototyp/`; Details und Motion-Spezifikation in `.website/HANDOFF.md`
- Referenz: `.website/referenz-bucan-website.md` – vollständige Projektdoku der Bucan-Website (Lessons learned, Stack-/DSGVO-/Deploy-Entscheidungen); dient als Faktenquelle für die Case Study und als Blaupause für Hosting/Formular/Recht der webdiv-Site
- Beide sind auch in `.claude/CLAUDE.md` als Pflichtlektüre für kommende Sessions verlinkt

## Fertig (Runde 1)

- [x] `css/tokens.css` – komplettes Design-System (Farben, Typo, Raster, Radien, Motion-Werte)
- [x] `design-system.html` – Schauseite: Tokens, Typo-Skala, Logo-Varianten, Treppenkante, Komponenten
- [x] Logo: Monoline / Schwer / App-Icon (`assets/logo/`), Zeichnen-Animation, Favicon
- [x] `index.html` – alle Sektionen mit wörtlichen Briefing-Texten: Preloader (Unterschrift), Nav (Glas-Pille, invertiert), Hero (Lupe + Idle-Welle), Porträt-Block, Statement (Wortfüllung), Leistungen (gepinnt), Projekte (Cursor-Pill), Ablauf, Über mich, Kobalt-Footer mit Formular
- [x] Regler-Panel: Akzent-Hue/Sättigung, Hero-Gewichte/-Breiten, Stufenhöhe, Sektionsabstand, Raster, 12-Spalten-Overlay
- [x] Fonts selbst gehostet (Mona Sans VF mit wdth-Achse, Geist Mono VF), keine externen Requests

## Fertig (Next.js-Port, 16.08.2026)

- [x] Prototyp 1:1 als Next.js-App (App Router, TypeScript, `output: 'export'`) nach Bucan-Blaupause übernommen – Optik und Motion unverändert (Vanilla-rAF; Lenis/GSAP folgt als Feinschliff)
- [x] Struktur nach frontend-next-plugin: `src/views/home/HomePage/` (eine Komponente pro Sektion), Texte in `src/core/consts/content.ts`, Logo/Unterschrift in `src/core/components/branding/`, Motion-Loop + Hooks in `src/lib/motion/`, Design-CSS unverändert in `src/assets/css/`
- [x] Fonts über `next/font/local` (Mona Sans VF inkl. font-stretch-Achse, Geist Mono VF)
- [x] Unterschrift-Pfade als `src/core/consts/signature.ts` (vorher `js/signature-data.js`)
- [x] Regler-Panel + 12-Spalten-Overlay portiert; Preloader inkl. Veil gegen Inhalts-Blitz vor der Hydration
- [x] `design-system.html` bewusst nicht portiert – kompletter Prototyp-Snapshot inkl. Schauseite liegt in `.website/prototyp/` (`../testing` am 16.08.2026 gelöscht)

## Fertig (Hero-Feinschliff, 16.08.2026)

- [x] Unterschrift-Intro läuft bei jedem Aufruf (Session-Gate `webdiv-seen` entfernt)
- [x] Unterschrift fliegt nach dem Schreiben an ihre Ruheposition über der Wortmarke und bleibt dort stehen (statt in der Nav zu verschwinden)
- [x] Idle-Welle zuverlässig: ruhende Maus / Tab-Wechsel blockiert sie nicht mehr (nur echte Mausbewegung ≥ 6 px pausiert sie für 2 s); Takt startet erst nach dem Hero-Reveal
- [x] Idle-Welle langsamer: 3 s Durchlauf statt 1,6 s (weiterhin 3,5 s Pause zwischen den Läufen)
- [x] Hero vertikal zentriert (Wortmarke auf optischer Mitte, Subzeilen darunter)
- [x] Haarlinie unter der Wortmarke entfernt
- [x] Wortmarke nicht mehr selektierbar (`user-select: none` – rein CSS, SEO-neutral)
- [x] Doppeltes „Sinan Yilmaz“ raus: Subzeile links heißt jetzt nur „Websites & Web-Anwendungen“ (Unterschrift trägt den Namen)
- [x] Kein Layout-Sprung mehr beim Intro: Scrollbalken-Spur dauerhaft (`html { overflow-y: scroll }`), Preloader-Scroll-Lock über fixierten Body statt `overflow: hidden`
- [x] Hero-Karo fadet radial von der Wortmarke nach außen aus (wie Referenz; Overlay-Schicht in `.bg-grid` + Veil, Regler `--grid-vis` funktioniert weiter)

## Fertig (Smooth Scroll, 16.08.2026)

- [x] Lenis-Smooth-Scroll auf Desktop (`lerp 0.1`, wie Referenz nithinmwarrier.com); Touch/Mobil scrollt nativ
- [x] Verzahnt mit dem eigenen rAF-Loop: ein Takt, kein doppelter Nachlauf (`smoothY` folgt bei aktivem Lenis direkt)
- [x] Nav-Anchor-Klicks als geführte Lenis-Fahrt (1,2 s, easeOutExpo, preventDefault statt nativem Sprung; scroll-padding-top rechnet Lenis selbst ein)
- [x] `respectReducedMotion: false` gemäß Briefing-Vorgabe „keine Reduced-Motion-Variante“ (sonst springt Lenis auf Systemen mit reduzierter Animation hart)

## Fertig (Mobile/Tablet-Ableitung, 16.08.2026)

- [x] Breakpoints: < 1024 px (Tablet) und < 768 px (Mobile) als Token-Ableitung in `tokens.css` (Seitenrand, Sektionsabstand, Stufenhöhe, Karo-Zelle, Typo-Skalen); Layout-Ableitung gesammelt am Ende von `main.css`
- [x] Nav < 1024: Pille nur mit Lockup + „Menü“-Knopf (< 768 über die volle Breite: Lockup links, Menü rechts, Seitenrand 22 px = top-Abstand); Vollbild-Overlay als dunkles Kapitel (Punktraster, maskierte Link-Reveals mit Stagger, CTA + Ortszeile unten), Escape/Resize schließen, Scroll-Lock über fixierten Body (Preloader-Muster mit top-Offset)
- [x] Menü-Anchor-Fahrt: `scrollToAnchor()` aus `smoothScroll.ts` (Lenis mit vorherigem `resize()` – nach dem Scroll-Lock wären dessen Maße sonst veraltet; Touch nativ per `scrollIntoView`); `snapSmoothY()` im frameLoop verhindert Parallax-Nachfahren nach dem Unlock
- [x] Hero Mobile: Wortmarke ~23vw (Peak-Zustand der Welle passt in 390 px), Subzeilen mittig gestapelt (Ort gedämpft), Unterschrift kleiner; Lupen-/Wellen-Radius skaliert mit der Viewport-Breite
- [x] Leistungen < 1024: Pin aufgelöst, Einträge als gestapelte Karten (paper-2, alle Beschreibungen offen), Medienkarte entfällt
- [x] Projekte < 1024: Zeile bricht in Jahr/Titel/Meta mit Pfeil rechts (Desktop-Grid quetscht den Titel schon auf Tablet); Cursor-Follower auf Touch aus
- [x] Statement Mobile: 260vh Strecke, Objekte klein in den Ecken, Text mit Seitenrand; Porträt: Figur über die Breite (76vw), Pills kompakt in einer Reihe; Ablauf: 2×2 (Tablet) → einspaltige Zeitleiste (< 560); Über mich & Kontakt einspaltig, Footer zentriert gestapelt
- [x] Bugfix (galt auch für Desktop seit Runde 1): `<figure>` hatte den Browser-Default-Margin (40 px seitlich) – Porträt-Figur stand 40 px rechts der Mitte, About-Bild füllte seine Spalte nicht; `figure` in den Basis-Reset aufgenommen

## Fertig (Case Study Bucan, 16.08.2026)

- [x] `/projekte/bucan-eventservice` – Case Study komplett, responsive (gleiche Stufen wie die One-Page): Projektkopf (Titel, Live-Link, Fakten-Leiste), Browser-Screenshot mit Platzhalter-Mechanik, Auftrag, Design-Kapitel in den Bucan-Kundenfarben (Tannengrün/Gold/Creme – nur innerhalb der Case Study, als Inline-Tokens aus `caseStudyBucan.ts`), Technik & Datenschutz, Kobalt-CTA mit Impressum/Datenschutz-Zeile
- [x] Sämtliche Aussagen aus `.website/referenz-bucan-website.md` (nichts erfunden; keine Preise, kein Kundenzitat, Symirna neutral); Texte in `src/core/consts/caseStudyBucan.ts`
- [x] `SubpageNav` (core/components/shell): Glas-Pille mit Lockup → `/` und Erstgespräch-CTA → `/#kontakt`; hide-on-scroll + Invertierung über den `[data-theme]`-Sektionen der Unterseite; StepEdge nach `core/components/transitions` gezogen (jetzt von beiden Routen genutzt)
- [x] Deeplink-Fahrt: Ankunft auf `/#kontakt`/`/#projekte` fährt nach dem Unterschrift-Intro zur Sektion (der Preloader erzwingt sonst Position 0)
- [x] Styles in `src/assets/css/case-study.css` (Basis + < 1024 + < 768 + < 560)

## Fertig (Feedback-Fixes Navigation & Rails, 16.08.2026)

- [x] Intro-Veil lief auf der Case Study ins Leere (5 s Blockade, dann „plötzlich“ Inhalt) – das Veil-Script im Layout greift jetzt nur noch auf der Startseite
- [x] Interne Navigation auf `next/link` umgestellt (Projekt-Zeile, SubpageNav, Case-Study-CTAs): Client-Navigation mit Prefetch statt Full-Reload; `/#kontakt`-Deeplink landet per Next-Hash-Scroll exakt auf der Sektion (scroll-padding berücksichtigt)
- [x] Unterschrift-Intro nur noch einmal pro Seiten-Load (Modul-Flag in HomePage): Rundreise Case Study ↔ Startseite und Browser-Zurück zeigen es nicht erneut; frischer Aufruf von außen (Full-Load) weiterhin schon
- [x] Neues Token `--rail-pad` (36/26/16 px): `.container` hält jetzt Innenabstand zu den Rail-Haarlinien – Inhalt klebt nicht mehr an den Linien (Startseite + Case Study); `contact-grid`/`case-cta` auf `padding-block` umgestellt, Hero-Subzeilen und Porträt-Pills angeschlossen

## Zum Angucken (vor Runde 2)

- [ ] `yarn dev` → http://localhost:3000 (statischer Build: `yarn build` → `out/`)
- [x] `.website/prototyp/design-system.html`: Logo-Varianten geprüft – Favorit: Variante 3 (Icon)
- [ ] Startseite komplett durchscrollen (Desktop jetzt mit Lenis-Smooth-Scroll); Preloader (Unterschrift) kommt bei jedem Laden
- [ ] Hero: Maus über die Wortmarke bewegen (Lupe), Maus ruhen lassen → nach 3,5 s Idle-Welle (3 s Durchlauf)
- [ ] Projekte: über die Bucan-Zeile hovern (Cursor-Pill + Vorschaubild)
- [ ] Regler unten links durchspielen (inkl. „Zurücksetzen“)
- [ ] Kontakt-Formular testabschicken (Erfolgsmeldung; noch kein Backend)
- [ ] Mobile/Tablet ansehen: Fenster schmal ziehen oder Geräte-Emulation (390/768) – Menü-Overlay, gestapelte Leistungs-Karten, Hero-Subzeilen, Projekt-Zeile
- [ ] Case Study durchlesen: http://localhost:3000/projekte/bucan-eventservice (Projekte-Zeile auf der Startseite verlinkt sie); Texte und Seitentitel/Description sind [Vorschlag] – bitte absegnen
- [ ] Von der Case Study aus „Erstgespräch“ klicken: Startseite lädt mit Intro und fährt danach zur Kontakt-Sektion – Verhalten ok?
- [ ] 404 ansehen: http://localhost:3000/gibt-es-nicht (im Dev-Server rendert jede unbekannte Adresse die 404) – Texte sind [Vorschlag], bitte absegnen

## Fertig (SEO/Meta-Grundausstattung, 17.08.2026)

- [x] Meta-Description neu am Statement ausgerichtet (Variante A, abgesegnet); Domain: webdiv.de
- [x] `metadataBase` + Canonicals, OpenGraph/Twitter-Tags (Startseite + Case Study), `viewport`/themeColor (Papier)
- [x] OG-Bild 1200×630 (`public/og-image.jpg`): Lockup V3-Icon + Wortmarke auf Papier mit Karo-Raster, echte Markenfonts
- [x] JSON-LD nach Bucan-Blaupause: WebSite + LocalBusiness (nur belegte Fakten, ohne E-Mail/Telefon-Platzhalter; ProfessionalService wäre naheliegend, ist aber laut schema.org deprecated – geprüft 17.08.2026)
- [x] `public/robots.txt` + `public/sitemap.xml` (statisch, wie Bucan)
- [x] `app/apple-icon.tsx` (180×180) + `app/icon.tsx` (64×64 PNG-Fallback zum SVG-Favicon), generiert aus der V3-Geometrie
- [x] „Über mich“: sr-only-h2 ergänzt (einzige Sektion ohne Überschrift – Outline/SEO)

## Fertig (404 & favicon.ico, 17.08.2026)

- [x] `not-found.tsx` + `views/not-found/NotFoundPage`: rein typografische 404 in der webdiv-Formensprache (SubpageNav, mono-„404“-Eyebrow, große Zeile, CTA zur Startseite), vertikal zentriert, Reveals wie Case Study; Texte als `notFound` in `content.ts` – **[Vorschlag], bitte absegnen**; im Export als `out/404.html` (der `ErrorDocument 404`-Eintrag folgt mit der .htaccess in der Deploy-Phase)
- [x] `public/favicon.ico` als Alt-Client-Fallback: 16/32/48 px aus der V3-Geometrie (`app/icon.svg`) gerastert; moderne Browser nutzen weiter SVG/PNG aus `app/`
- [x] SubpageNav-Pille auch auf Desktop in der einheitlichen Breite (691px wie die Startseiten-Pille bzw. Kompakt-Nav < 1024, Lockup links / CTA rechts) – vorher war sie auf Unterseiten inhaltsgetrieben schmaler

## Offen aus dem Bucan-Abgleich (für Deploy-Phase)

- [ ] SkipLink im Layout (a11y; Bucan hat einen) – 17.08.2026: bewusst weggelassen (Entscheidung Sinan)
- [ ] `.htaccess` (Caching für `_next/static`, Schutz der Formular-Config, `ErrorDocument 404 /404.html`) + GitHub-Actions-Deploy (`deploy.yml`) – erst wenn Hosting steht
- [ ] JSON-LD um E-Mail/Telefon ergänzen, sobald die [Platzhalter] ersetzt sind; Impressum/Datenschutz in die Sitemap aufnehmen, sobald die Seiten existieren

## Offene Entscheidungen (Feedback nötig)

- [ ] Hero-Wortmarke: mit Token-Skala ~62 % der Inhaltsbreite statt ~80 % aus dem Briefing – Skala behalten oder auf ~22,5vw vergrößern?
- [ ] Logo Variante 2: Strichstärke 16/120 statt exakt Mona-Sans-800-Stamm (20/120) – bewusste Abweichung, ok so?
- [x] Logo-Favorit benannt (16.08.2026): Variante 3 (Icon, Kobalt-Quadrat) – bereits als Favicon/App-Icon im Einsatz; die Varianten haben laut Briefing feste Rollen (V1 Monoline = feine Kontexte, V2 Schwer = Nav/Lockups, V3 = Icon). Falls V3 auch im Nav-Lockup gewünscht: Bescheid geben
- [ ] Eyebrows in `--ink-3` (13 px) ≈ 3,2:1 Kontrast, unter AA – so lassen oder auf `--ink-2` heben?
- [ ] Regler-Toggle unten links verdeckt am Seitenende „created by webdiv“ – Position ok (nur Prototyp-Werkzeug)?
- [ ] Nav-Button „Erstgespräch“ springt zu `#kontakt` – gewünschtes Verhalten?
- [ ] Ergänzte [Vorschlag]-Texte absegnen: Seitentitel, Formular-Validierungstexte, Platzhalter-Labels, 404-Texte (`notFound` in `content.ts`) (Meta-Description: Variante A am 17.08.2026 abgesegnet)

## Meine Todos (Assets liefern)

- [ ] Porträtfoto (frontal, schwarzer Hintergrund) als `public/portrait.jpg` ablegen → Porträt-Block und Über-mich übernehmen es automatisch
- [ ] Echte Unterschrift als SVG-Einstrich-Pfad (ersetzt Mr-Dafoe-Platzhalter in `src/core/consts/signature.ts`)
- [ ] E-Mail-Adresse, Impressumsdaten (stehen als sichtbare `[Platzhalter]` in `src/core/consts/content.ts`); Domain webdiv.de ist seit 17.08.2026 hinterlegt
- [ ] Bucan-Screenshots (für Leistungs-Karte 1, Projekt-Vorschaubild); Case Study: Startseiten-Screenshot als `public/projekte/bucan/screen-home.webp` ablegen → Browserrahmen übernimmt ihn automatisch

## Runde 2 (nächste Session)

- [x] Mobile-Ableitung bis 390 px (16.08.2026 – siehe „Fertig (Mobile/Tablet-Ableitung)“; Touch: nur Welle statt Lupe war schon im Port enthalten)
- [x] Unterseite `/projekte/bucan-eventservice` (16.08.2026 – siehe „Fertig (Case Study Bucan)“)
- [ ] Unterseiten `/impressum`, `/datenschutz` (rein typografisch)
- [ ] Motion-Feinschliff mit GSAP/ScrollTrigger (Lenis ist seit 16.08.2026 drin; Design-Intent steht in `.website/HANDOFF.md`)
- [ ] Formular an echtes Backend anbinden (z. B. Supabase Edge Function)
