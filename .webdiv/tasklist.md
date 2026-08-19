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

## Fertig (Footer-Umbau Variante D „Werkbank“, 18.08.2026)

- [x] Footer-Redesign aus 4 Lab-Varianten (Lab lag unter `public/lab/footer.html`, Umschalter A–D; nach Entscheidung wieder entfernt): Variante D übernommen – kompaktes Abschluss-Band über der Credits-Zeile (Wortmarke 2rem + Adresszeile links, Icon-Reihe Mail/Instagram/LinkedIn rechts), Kontaktformular unverändert
- [x] Abgeschnittene Hintergrund-Wortmarke (`contact-bg-mark`) entfernt; „Oder direkt“-Zeile unterm Formular ins Band gewandert (`footer.adresse` in `content.ts`)
- [x] Social-Icons als Monoline-Glyphen (1,5 px, currentColor) in `src/lib/primitives/components/` (MailIcon, InstagramIcon, LinkedInIcon); Pill-Duktus `.icon-btn`, Hover invertiert Paper/Kobalt
- [x] Kontakt-Sektion auf mindestens volle Viewport-Höhe (100svh als Flex-Spalte, Grid zentriert, Band + Credits unten): die Treppenkante ist am Seitenende komplett aus dem Bild; weiterer Feinschliff folgt

## Fertig (Leistungen: Rückbau auf ruhige Bühnen-Karten, 18.08.2026 spät)

- [x] Entscheidung Sinan nach Ansicht von Sticky-Overlap + Bild-Texturen: „passt alles nicht zur Website“ – Sticky-Overlap raus („dass die Card pinned ist, bis das nächste kommt, stört mich“ → auch sticky zählt als Pinning), Wurfschatten raus, Bilder raus (kommen nicht wieder; `public/leistungen/` gelöscht, `bildSrc` aus `content.ts`, `.svc-card-bg` aus TSX/CSS), Karten-Tönung zurück von `--paper-2` auf `--paper`
- [x] Geblieben: helle Haarlinien-Karten in Bühnengröße (`min-height: calc(100svh - 176px)`), Nummer 01–03, 96px-Titel, Kobalt-Strich, Text, Tags am Kartenfuß, Objekt rechts; Stack wieder `display: grid` + `gap: 26px` (Block/Margin war nur für sticky nötig), frei scrollend
- [x] Mobil <768 (Entscheidung Sinan): gar keine Karten-Box mehr – Rahmen/Radius weg, Inhalt auf dem Seitenrand (padding-inline 0, bündig mit Eyebrow), Trennung über Nummer + Tag-Haarlinie + 40px Gap
- [x] Dezente Schattierung wieder rein (Wunsch Sinan, „will das sehen“): zweischichtiger weicher Wurf nach unten (`0 2px 6px` 3% + `0 22px 48px` 6% Ink) – Blatt-auf-Papier-Tiefe; mobil aus (dort keine Box) – Look bewerten
- [x] Tag-Pills: `cursor: default` (Labels, nicht klickbar; Selektion bleibt); Desktop-Größe erst wie Portrait-Pills (24px) → Sinan: zu groß → final eine Stufe darunter (19px / 14 28 = Mobil-Maß der Portrait-Pills); mobil <768 bleibt 15px / 11 20
- [x] Titel höher + mehr Luft zum Text (Wunsch Sinan): Spacer-Row über dem Titel von 1fr auf 0.55fr (Titel rückt nach oben), Strich-margin-bottom 30→72px (Abstand Titelblock→Text wächst); mobil unverändert (dortiger Strich-margin-Override 24/32 bleibt)
- [ ] **TEMPORÄRER TESTBLOCK am Ende von `main.css`** („VISUELLER TEST“, 18.08.2026): Dunkel läuft vom Statement bis „Zuletzt gebaut“ durch (Leistungen-Sektion + Karten in `--dark`, Karten nur mit `--line-dark`-Haarlinie), Treppenkante als Konturlinie in Rail-Liniensprache (1px, `--line-dark`; `::before` Originalform als Linie, `::after` um 1px geschrumpfte dunkle Füllung – Inline-`--edge-to` der Komponente wird per `::after`-background übersteuert; Selektor `.step-edge:has(+ .services)`) → nach Sinans Bewertung KOMPLETT ENTFERNEN (nur diesen Block löschen, sonst ist nichts angefasst)
- [x] Dot-Lupe („Kreisel“) je Leistungs-Karte (Wunsch Sinan, exakt wie Portrait): Canvas pro Karte (`.svc-card-dots`, z-index -1 hinter dem Inhalt via `isolation: isolate`), gleiche Parameter wie die Portrait-Lupe (26px-Raster, Radius 260, Ring `0.06+0.14e`, Lerp amt 0.12 / Position 0.25), nur feine Pointer + `pointerType === 'mouse'` → mobil/Touch bewusst ohne Effekt (wie Portrait); Karten-Punktraster (bg-dots-dark-Werte) liegt aktuell im TESTBLOCK – bei Rückbau auf hell braucht die Lupe eine Ink-Farbvariante + helles Raster (Canvas-Farbe kommt aus `--paper`)
- [x] Unteres Ende des dunklen Kapitels (Sinan: „nicht plötzlich gerade Linie zu weiß“): erst Probe nach Referenz-Übergang harrisoncarloss.com (`BrushEdge`, SVG-Ink-Riss mit Trockenpinsel-Fragmenten) – Entscheidung Sinan 19.08.2026: „einheitlich mit den Stufen“ → BrushEdge komplett entfernt (Komponente, Barrel, CSS), stattdessen `<StepEdge from="var(--dark)" to="var(--paper)" />` in HomePage zwischen Services und Projekte (ohne Ref, nicht in `stepEdgeRefs` der Nav)
- [x] Folge-Punkt aus dem dunklen Test (gefixt 19.08.2026, gemeldet von Sinan: Nav war hell über den dunklen Leistungen): `edgeToPaperRef` (Hell-Messpunkt der Nav) von der Kante Statement→Services an die Kante Services→Projekte verschoben – Nav bleibt jetzt bis zum Ende des dunklen Kapitels invertiert und kippt über „Zuletzt gebaut“ zurück (beide Richtungen im Browser geprüft); bei Rückbau des Tests wandert das Ref zurück (Kommentar in HomePage.tsx)
- [x] Leistungen dezent heller als das Statement (Wunsch Sinan 19.08.2026): Testblock-Variable `--dark-soft` (erst #1B1B1A, Sinan: „passt farblich nicht, dunkler“ → #161615; Statement bleibt `--dark` #121212) für Sektion, Karten, oberes Kontur-::after und die Grundfläche der unteren Kante (`.services + .step-edge`) – die obere Treppe liest sich dadurch als subtiler Zweiton + Konturlinie; bei Übernahme des Tests wird `--dark-soft` ein echter Token in tokens.css
- [ ] Nächster Schritt: Look so bewerten; falls es weiterhin nicht sitzt, ganz neue Richtung für die Sektion erarbeiten (Sinan: „hmm, was ganz neues” – erst mal zurückgestellt)

## Projekte-Sektionstitel (20.08.2026, Entscheidung offen)

- [ ] Sinan fragt nach Alternativen zu „Zuletzt gebaut” (h2 der Projekte-Sektion) – Vorschläge
      liegen vor (u. a. „Woran Sie mich messen können.”, „Echte Aufträge.”, „Arbeit, die Sie
      sich ansehen können.”); Empfehlung: behalten oder „Woran Sie mich messen können.”;
      Achtung bei Alternativen: keine „live/im Einsatz”-Behauptung (cnyn unveröffentlicht)

## Fertig (Leistungen als Service-Bühnen mit Sticky-Overlap, 18.08.2026 – Referenz harrisoncarloss.com)

- [x] Referenz-Mechanik übernommen, Ausführung webdiv (kein Klon): eine fast viewportfüllende Karte pro Service (Fokus), beim Weiterscrollen schiebt sich die nächste per `position: sticky` über die vorige – CSS-only, Scroll bleibt 1:1, bewusst KEIN Scroll-Hijacking (Abgrenzung zur Pinning-Abneigung: es ist ständig Bewegung im Bild)
- [x] Karte: Nummer 01–03 (`--ink-3`, aus dem Index generiert) → 96px-Titel volle Kartenbreite (`--fs-service` auf `clamp(2.5rem, 6.7vw, 6rem)`; „Schnittstellen & Datenbanken“ bricht gewollt zweizeilig am &) → Kobalt-Strich → Text → Tags am Kartenfuß; Objekt rechts im unteren Bereich (auf 430px vergrößert); zwei 1fr-Räume verteilen die Bühnenhöhe
- [x] Sticky-Geometrie: `top: 88px`, `min-height: calc(100svh - 176px)`, Stack als `display: block` (in einer Grid-Row hätte sticky keinen Klebe-Spielraum), 32px Fluss-Abstand; Deckung über Paint-Reihenfolge, dezenter Wurfschatten nach oben trennt Papier von Papier
- [x] Referenz-Abweichung bestätigt: Tags bleiben neutrale Outline-Pills (Referenz füllt sie orange, weil klickbar – wollen wir nicht)
- [x] Schutzschalter: Overlap aus bei `max-height: 699px` (flache Laptops – angedockte Karte ragt sonst unter den Fold, unterer Inhalt nie erreichbar) und unter 1024px Breite (einspaltige Karte höher als Viewport); mobil <768 normaler Stapel im Seitenrand
- [x] Bild-Textur pro Bühnenkarte (Idee Sinan): Karte auf `--paper-2` abgetönt, `.svc-card-bg` als Layer hinter dem Inhalt (`z-index: -1` + `isolation: isolate`, `overflow: hidden` clippt am Radius) mit `grayscale(1)` und Opacity 0.13 – jedes Stock-Foto wird so zur webdiv-Textur; `bildSrc` je Eintrag in `content.ts` → Dateien fehlen noch: `public/leistungen/firmen-websites.jpg`, `web-anwendungen.jpg`, `schnittstellen-datenbanken.jpg` (Platzhalter-Mechanik: background-image ohne Datei rendert nichts)
- [x] Bilder eingesetzt (18.08.2026, Sinan aus Downloads 01–03.jpg): via System.Drawing auf 1920px skaliert + JPEG q78 (107–260 KB); 02 (Code, fast schwarzer Grund) wurde beim Erzeugen INVERTIERT gespeichert – dunkle Codezeilen auf hellem Grund statt 13%-Eintrübung der ganzen Karte, CSS bleibt für alle Bilder gleich (Original in Downloads unangetastet); Originale: 01 minimalistischer Schreibtisch, 02 Code-Screen, 03 RJ45-Stecker-Makro
- [ ] Mobile-Strategie für die Sektion (Sinan: „später“)
- [ ] Look mit Sinan bewerten; Option, falls gewünscht: `top` je Karte leicht staffeln (88/96/104px), damit die Kanten der vorigen Karten als Deck sichtbar bleiben

## Fertig (Leistungen hell gedreht, 18.08.2026 – nach den „Farbboxen“)

- [x] Diagnose zum „irgendwas passt nicht“ der dunklen Karten: drei fast full-breite `--dark`-Flächen à 640px direkt nach dem dunklen Statement = Seitenmitte über zwei Screens schwarz, Statement verliert die Sonderrolle, Treppenkante wird sofort widerrufen; min-height 640 bei 3 Zeilen Text = großes Loch zwischen Text und Tags; kollidiert mit der Linie „keine großen Flächenkarten, Typo/Linien“
- [x] Karten hell gedreht: `--paper` + 1px-Haarlinien-Rahmen (`--line`), kein Punktraster, Objekte zeichnen in Ink/Kobalt/`--ink-3` (CSS-Fallbacks greifen, Karten-Overrides entfernt); dunkel bleibt exklusiv Statement, Kobalt dem Footer
- [x] Kompakt statt aufgeblasen: `min-height` raus, Padding `clamp(44px, 4.5vw, 72px)`, Tags rücken direkt an den Text (letzte Grid-Zeile `1fr` + `align-self: start` statt `end`) → Kartenhöhen ~420/420/493 statt 3×640, Sektion 1731 statt 2319px
- [x] Titel-Umbruch gefixt: `--fs-service` auf `clamp(2.25rem, 5.5vw, 4.5rem)` (war cap 5rem) → „Web-Anwendungen“ einzeilig bei 1440; Kobalt-Strich 76→88px, Text/Tags in `--ink-2`, Tag-/Fuß-Haarlinien auf `--line`
- [x] Mobile <768: full-bleed passt nicht zum Haarlinien-Rahmen → Karte bleibt im Seitenrand (Radius 20px, Padding 44/28, Stack-Gap 18px); <1024-Stack unverändert, Tag-Trennlinie hell
- [ ] Look mit Sinan bewerten (Screens: Desktop 1440, Tablet 800, Mobil 390 geprüft via iframe-Testseite, danach gelöscht)

## Fertig (Leistungen-Redesign „Farbboxen“, 18.08.2026)

- [x] Sektion neu als große dunkle Karten (finale Richtung nach mehreren Lab-Iterationen in `public/lab/leistungen.html`: 5 Richtungen A–E → Farbboxen E1/Tint → Referenz-Impuls „dunkle Karten mit Keyword-Pills“): pro Leistung eine Karte (volle Containerbreite, `--r-box`, Punktraster, min-height 640px – Höhe testweise +1/3, Sinan will den Big-Card-Look prüfen); Aufbau: Titel (voll hell) → Kobalt-Strich (zeichnet sich beim Reveal) → Text → Keyword-Tags unten links als Kartenfuß; frei scrollend, bewusst ohne Pin; einheitlich dunkel = Kobalt bleibt reiner Akzent, Footer behält den einzigen großen Kobalt-Block
- [ ] Tag-Labels absegnen (`leistungen.eintraege[].tags` in `content.ts`; 18.08.2026 spät auf Sinans Feedback überarbeitet): Design & Entwicklung / SEO / Hosting & Pflege · Kundenportale / Verwaltung / Buchung & Abwicklung · Backend / Nutzer & Rechte / Datenübernahme (Karte 3 neu: „Login & Rechte“ → „Nutzer & Rechte“, „Datenimporte“ → „Datenübernahme“ – beide [Vorschlag]; Alternativen falls unpassend: Zugriffsrechte, Benutzerverwaltung, Systemanbindung)
- [x] Linienobjekte im Statement-Duktus (`BoxObject`: web/app/db, 1,5 px, pathLength-Zeichnen beim Reveal mit Strich-Stagger); Objekte schwenken gelerpt zur Mausposition (`--sway-x/-y` via frameLoop, Stärke je Box) und floaten leicht
- [x] Mobile: Boxen full-bleed (Farbe volle Breite, Inhalt behält Seitenrand, Radius entfällt) statt der alten paper-2-Karten – Entscheidung Sinan: keine „eingerückten“ Boxen, kein Pinning
- [x] Aufgeräumt: `MediaArea` (Browserrahmen-Platzhalter + Medien-SVGs) entfernt, `leistungen.browserUrl`/`screenshotPlatzhalter` aus `content.ts`; `.browser-frame` bleibt (Case Study nutzt ihn); neues Token `--r-box: 28px`
- [x] Feinschliff offen: Sinan will noch nachschärfen („da gibt es noch einiges“)

## Ablauf-Sektion & CTA (besprochen 19.08.2026, noch nichts umgesetzt)

- [ ] Ablauf-Sektion bleibt (sie ist die Einwandbehandlung: kostenlos/unverbindlich, schriftlicher
      Festpreis, Zwischenstände im Browser, Betreuung – wichtigster Vertrauensbaustein solange nur
      eine Referenz da ist); Entscheidung Sinan 19.08.2026 (Lab-Runde): KEIN Erstgespräch-CTA in
      der Sektion – der Haupt-CTA bleibt allein bei Nav + Kontakt, die Monospace-Schlusszeile bleibt
- [ ] Ablauf-Redesign: zwei Lab-Runden am 19.08.2026 verworfen (Lab `public/lab/ablauf.html`
      wieder gelöscht) – Runde 1 mit 4 Typo-Layouts (Leitlinie/Register/Frage-Antwort/Kompakt):
      Sinan „alles langweilig, passt nicht zum Design“; Runde 2 mit 4 Mechanik-Varianten in der
      Website-Sprache (A Titel-Füllung scroll-gekoppelt, B gezeichnete Kobalt-Weglinie,
      C Linienobjekt-Vignetten, D monumentale Outline-Ziffern mit Tinten-Füllstand):
      „gefällt mir alles nicht“ → Richtung weiter offen, neuer Anlauf in einer nächsten Session
- [ ] Entschieden: kein Accordion (versteckt die Einwandbehandlung, falsches UI-Möbel);
      FAQ-Unterseite kommt erst NACH dem Livegang (Entscheidung Sinan 19.08.2026) – dann vom
      Ablauf-Ende + Footer verlinken; Checklisten-Kandidat „FAQ + FAQPage-Strukturdaten“ dabei prüfen
      (Achtung: Google zeigt FAQ-Rich-Results seit 2023 praktisch nur noch für Behörden-/
      Gesundheitsseiten – vor Einbau gegen Primärquelle prüfen, Strukturdaten schaden aber nicht)
- [ ] FAQ-Fragensammlung: liegt in `.webdiv/faq.md` (Start 19.08.2026 – Frage 1
      „seriös ohne auszusehen wie alle anderen“ mit Antwort-[Vorschlag], fünf aus fremdem
      Portfolio-Screenshot adaptierte Kandidaten + zwei eigene als [Rohidee]); Antworten in
      webdiv-Stimme ausformulieren und absegnen, auf die Website erst mit der FAQ-Unterseite
- [ ] Entschieden: kein interaktiver Preiskalkulator und kein E-Mail-Gate (Hormozi „eine Hürde“;
      Konfigurator = Baukasten-Signal, bei Custom-Arbeit keine ehrlichen Zahlen möglich)
- [ ] Offene Entscheidung Sinan: „ab“-Preis öffentlich auf die Seite? (Listenpreis laut Akquise-Plan
      Abschnitt 9: 3.500–6.000 € Custom-One-Pager; KI-Einwand „mach ich selbst für 50 €“ besprochen –
      Preis selektiert richtig, aber nur tragfähig, wenn Sinan selbst dahintersteht)
- [ ] Idee fürs Kontaktformular: Anliegen-Feld (neue Website / bestehende Seite verbessern /
      Anwendung) zur Qualifizierung, ggf. Budget-Select – Entscheidung offen
- [ ] Kontakttext ggf. um die Facette „ehrliche Einschätzung Ihrer bestehenden Seite“ schärfen
      (ersetzt einen separaten prominenten „Website-Check“-CTA auf der One-Page; der Check selbst
      kommt später als eigenes Tool, siehe Akquise-Plan Abschnitt 1 Variante B)

## Projekte-Sektion & cnyn-Referenz (19.08.2026, in Arbeit)

- [x] Freigabe Stefan Eitel (mündlich, 19.08.2026): Projekt als Referenz + Case Study ok,
      Namensnennung „Stefan E." ok, Testimonial (2–3 Sätze, von Sinan formuliert) ok.
      **Auflagen:** Produktname „cnyn" nicht nennen, Produkt/Funktionalitäten nicht erklären
      (Produkt unveröffentlicht), keine Verlinkung auf die Web-App, Launch-Zeitpunkt nicht
      anzeigen. Konsequenz: keine App-Screenshots (Logo/Modulnamen identifizierbar) –
      Erzählung auf Engineering-Ebene (Rolle, Zahlen, Architektur, Arbeitsweise)
- [x] Zweiter Projekte-Eintrag umgesetzt (19.08.2026): „ERP für die Bauwirtschaft" /
      „Modulare B2B-Anwendung, im Kundenauftrag" / „Web-Anwendung · Frontend & Beratung" /
      Jahr 2025–26, gleiche Zeilen-Anatomie wie Bucan; Entscheidungen Sinan: Branche ja,
      kein Redaction-/Diskretions-Motiv, Testimonial-Wortlaut („Fundament gelegt … Großteil
      gebaut … Jederzeit wieder") abgenickt, KI-Workflow nicht erwähnt
- [x] Case Study `/projekte/erp-bauwirtschaft` komplett (19.08.2026): Intro mit Status-Zeile
      statt Live-Link, zwei Browserrahmen (Nutzerverwaltung Übersicht + Anlage), Auftrag/
      Rolle mit Vertraulichkeits-Box, dunkles Fundament-Kapitel in den Produktfarben
      (#1E2A24/#507A61, aus dem UI-Theme der App konvertiert) mit Zahlen-Leiste
      (10 Monate · 201/320 Commits · 200+ Komponenten · ~30 Ansichten), Arbeitsweise
      (6 Punkte), Zitat Stefan E., Kobalt-CTA; Texte in `caseStudyErp.ts` – **[Vorschlag],
      Sinan absegnen + Stefan als Kurzfreigabe vorlegen (Titel „ERP", Branche, Screenshots,
      Testimonial)**; Fakten verifiziert aus `../contract-copilot-frontend` (git-Historie:
      Aug 2025–Jun 2026, 633/698 src-Dateien, 209 eigene Komponenten, ~31.000 LOC)
- [x] Screenshots erzeugt (19.08.2026): cnyn-App lokal mit temporären Mock-Patches
      (Auth/useMe/useUserModules/useAllUsers + Detail-Hooks + Dummy-Logo „ERP") gestartet –
      alle Personen fiktiv, kein cnyn-Bezug sichtbar, schlanke Sidebar (nur Dashboard/
      Administration, nichts Produktspezifisches erfunden); Repo danach per git restore
      zurückgesetzt; Dateien: `public/projekte/erp-bauwirtschaft/{screen-tabelle,screen-detail,thumb}.webp`
- [x] Feedback Sinan (19.08.2026): Screens wirkten beschnitten (Crop + cover-Mismatch) →
      neu aufgenommen als unbeschnittene Vollbilder; zweiter Screen jetzt die
      **Detailansicht** (`/users/:id` mit Stammdaten/Modulen/Rollen) statt des Anlage-Sheets;
      ScreenSection-Layout von 2 Spalten auf untereinander/volle Breite mit natürlicher
      Bildhöhe (`aspect-ratio` nur noch als Platzhalter-Fallback)
- [x] Hover-Farbwelt der Projektzeilen (Idee Sinan 19.08.2026): Hover füllt die Zeile mit
      der dunklen Referenzfarbe (Bucan Tannengrün, ERP Graugrün; `farben` je Eintrag in
      `content.ts` → Inline-Variablen), Texte invertieren gestuft (color-mix), Haarlinien-
      Kontur über transparente Border (kein Layout-Sprung); im Browser geprüft
- [x] Projekt-Zeilen größer: Lab 1 (`public/lab/projekte.html`, A Register / B Schlagzeile /
      C Farbmarke / D Monument) → Entscheidung Sinan 20.08.2026: **Variante B übernommen**
      (Mono-Kicker „Jahr · Meta" über clamp(3rem, 5vw, 4.5rem)-Titel, Sub darunter, Pfeil 64px
      rechts; <1024 kompakter/Pfeil 48, <768 Titel clamp(1.75rem, 8vw, 2.5rem) + Kicker 12px);
      project-year/project-meta-Spalten samt Tablet-grid-areas entfielen; Lab 1 gelöscht;
      Desktop/800/390 im Browser verifiziert (Mobile via iframe-Testseite), tsc sauber
- [x] Hover-Farbwelt auf helle Markenfarben gedreht (Wunsch Sinan 20.08.2026): Bucan
      Gold #C2A25E + Tannengrün-Tinte (Badge-Kombi der Bucan-Website), ERP Salbei #507A61 +
      Hell #FCFCFC (Primary-Button-Kombi der App) – Creme/Weiß beider Marken lägen unsichtbar
      auf dem webdiv-Papier; Cursor-Pill + Thumb unverändert (waren nie entfernt)
- [x] Lab 2 (`public/lab/projekt-titel.html`): (a) Ruhe-Differenzierung h2 vs. Projekttitel
      (T1 wdth 112 / T2 Skala 88px / T3 beides / T4 Kopf auf Mono-Zeile) + (b) Farbmodus-Analyse
      (R Referenzfarben / M monoton / H hybrid: dunkle Flut, Referenzfarbe an Kicker+Pfeil) →
      **Entscheidung Sinan 20.08.2026: T3 + M** – Titel clamp(3.25rem, 5.8vw, 5.25rem) (84px
      auf 1440) mit font-stretch 110 % (eigene Stimme neben der h2 mit 102 %), Hover dehnt auf
      115 % (font-stretch-Transition 380ms); Fremdfarben-Mechanik komplett entfernt (`farben`
      aus content.ts, Inline `--row-bg/--row-ink` aus ProjectsSection.tsx, Hover-Regeln in
      main.css) – Referenzfarben leben nur noch auf den Case-Study-Unterseiten; Lab gelöscht,
      Desktop im Browser verifiziert, tsc sauber
- [x] Hover-Flut revidiert (Sinan, gleiche Session): statt `--dark` jetzt **`--paper-2`** –
      die Fläche der direkt folgenden Ablauf-Sektion, Hover als Übergangs-Vorgriff; keine
      Text-Invertierung mehr nötig (Tinten bleiben unverändert, tote color-Transitions mit
      entfernt), Dehnung/Kontur/Pfeil/Pill/Thumb unverändert; im Browser verifiziert
- [x] Doppellinien-Fix (Sinan, gleiche Session): beim Hover weichen die angrenzenden
      Trennlinien der Hover-Kontur (eigene ::after-Linie, ::after der Zeile darüber via
      `:has(+ .project-row:hover)`, Listen-Kopflinie via `:has(> :first-child:hover)`),
      jeweils weich über border-color-Transition; beide Zeilen im Browser per Zoom geprüft

## Offen aus dem Bucan-Abgleich (für Deploy-Phase)

- [ ] SkipLink im Layout (a11y; Bucan hat einen) – 17.08.2026: bewusst weggelassen (Entscheidung Sinan)
- [ ] `.htaccess` (Caching für `_next/static`, Schutz der Formular-Config, `ErrorDocument 404 /404.html`) + GitHub-Actions-Deploy (`deploy.yml`) – erst wenn Hosting steht
- [ ] JSON-LD um E-Mail/Telefon ergänzen, sobald die [Platzhalter] ersetzt sind; Impressum/Datenschutz in die Sitemap aufnehmen, sobald die Seiten existieren

## Offene Entscheidungen (Feedback nötig)

- [ ] Hero-Wortmarke: mit Token-Skala ~62 % der Inhaltsbreite statt ~80 % aus dem Briefing – Skala behalten oder auf ~22,5vw vergrößern?
- [ ] Logo Variante 2: Strichstärke 16/120 statt exakt Mona-Sans-800-Stamm (20/120) – bewusste Abweichung, ok so?
- [x] Logo-Favorit benannt (16.08.2026): Variante 3 (Icon, Kobalt-Quadrat) – bereits als Favicon/App-Icon im Einsatz; die Varianten haben laut Briefing feste Rollen (V1 Monoline = feine Kontexte, V2 Schwer = Nav/Lockups, V3 = Icon). Falls V3 auch im Nav-Lockup gewünscht: Bescheid geben
- [ ] Eyebrows in `--ink-3` (13 px) ≈ 3,2:1 Kontrast, unter AA – so lassen oder auf `--ink-2` heben?
- [x] Regler-Toggle unten links: obsolet (19.08.2026) – die Prototyp-Regler (DevControls) wurden nie in die Next.js-App portiert und bleiben bewusst draußen; CSS-Rest `.controls` in `main.css` mit entfernt
- [ ] Nav-Button „Erstgespräch“ springt zu `#kontakt` – gewünschtes Verhalten?
- [ ] Ergänzte [Vorschlag]-Texte absegnen: Seitentitel, Formular-Validierungstexte, Platzhalter-Labels, 404-Texte (`notFound` in `content.ts`) (Meta-Description: Variante A am 17.08.2026 abgesegnet)

## Meine Todos (Assets liefern)

- [ ] Porträtfoto (frontal, schwarzer Hintergrund) als `public/portrait.jpg` ablegen → Porträt-Block und Über-mich übernehmen es automatisch
- [ ] Echte Unterschrift als SVG-Einstrich-Pfad (ersetzt Mr-Dafoe-Platzhalter in `src/core/consts/signature.ts`)
- [ ] E-Mail-Adresse, Impressumsdaten (stehen als sichtbare `[Platzhalter]` in `src/core/consts/content.ts`); Domain webdiv.de ist seit 17.08.2026 hinterlegt
- [x] Instagram-/LinkedIn-Profil-URLs für die Footer-Icons (19.08.2026): beide als direkte externe Links in `footer.soziale` (`content.ts`) – https://www.instagram.com/webdiv.de und https://www.linkedin.com/in/sinan-yilmaz-webdiv/ (Slug auf Empfehlung geändert); externe Footer-Links bekommen `target="_blank" rel="noopener"` (`ContactSection.tsx`); JSON-LD (`src/app/page.tsx`): Instagram als `sameAs` am LocalBusiness, LinkedIn als `sameAs` am `founder`-Person-Objekt. Social-Strategie-TODOs: `.webdiv/akquise-plan.md` Abschnitt 11
- [ ] Bucan-Screenshot (Projekt-Vorschaubild; der Slot in den Leistungen ist seit dem Farbboxen-Redesign 18.08.2026 entfallen); Case Study: Startseiten-Screenshot als `public/projekte/bucan/screen-home.webp` ablegen → Browserrahmen übernimmt ihn automatisch

## Runde 2 (nächste Session)

- [ ] USP „performant + custom + zugeschnitten" belegt hervorheben: Satz-Ergänzung in Leistungen/Firmen-Websites (Text-[Vorschlag] liegt vor, absegnen) + Fakten-Leiste mit Messwerten im Technik-Kapitel der Case Study (PageSpeed/Ladezeit/Cookies der Bucan-Seite – erst messen, nichts behaupten)

- [x] Mobile-Ableitung bis 390 px (16.08.2026 – siehe „Fertig (Mobile/Tablet-Ableitung)“; Touch: nur Welle statt Lupe war schon im Port enthalten)
- [x] Unterseite `/projekte/bucan-eventservice` (16.08.2026 – siehe „Fertig (Case Study Bucan)“)
- [ ] Unterseiten `/impressum`, `/datenschutz` (rein typografisch)
- [ ] Motion-Feinschliff mit GSAP/ScrollTrigger (Lenis ist seit 16.08.2026 drin; Design-Intent steht in `.website/HANDOFF.md`)
- [ ] Formular an echtes Backend anbinden (z. B. Supabase Edge Function)
