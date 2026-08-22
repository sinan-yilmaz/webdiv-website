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
- [ ] Impressum + Datenschutz ansehen: http://localhost:3000/impressum/ und /datenschutz/ (Fusszeilen-Querlinks, [Platzhalter] für Anschrift/E-Mail/Hoster); dazu die neue Datenschutz-Hinweiszeile unterm Kontaktformular – Fragen 1–7 im Abschnitt „Fertig (Impressum & Datenschutz)" beantworten

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
- [x] Credits-Zeile exakt vertikal zentriert (22.08.2026, Prüfauftrag Sinan): das
      asymmetrische Padding der Leiste (26px oben / 30px unten) ließ die Zeile messbar
      ~2px zu hoch sitzen → `padding: 28px 0` (Leistenhöhe bleibt unverändert 76.8px),
      Mobil-Override auf `max(28px, env(safe-area-inset-bottom))` mitgezogen; per
      getBoundingClientRect nachgemessen: Innenraum zwischen Trennlinie und Seitenende
      jetzt exakt mittig (Restwert 0.4px zur Gesamtbox = halbe Trennlinie, korrekt)

## Fertig (Leistungen: Rückbau auf ruhige Bühnen-Karten, 18.08.2026 spät)

- [x] Entscheidung Sinan nach Ansicht von Sticky-Overlap + Bild-Texturen: „passt alles nicht zur Website“ – Sticky-Overlap raus („dass die Card pinned ist, bis das nächste kommt, stört mich“ → auch sticky zählt als Pinning), Wurfschatten raus, Bilder raus (kommen nicht wieder; `public/leistungen/` gelöscht, `bildSrc` aus `content.ts`, `.svc-card-bg` aus TSX/CSS), Karten-Tönung zurück von `--paper-2` auf `--paper`
- [x] Geblieben: helle Haarlinien-Karten in Bühnengröße (`min-height: calc(100svh - 176px)`), Nummer 01–03, 96px-Titel, Kobalt-Strich, Text, Tags am Kartenfuß, Objekt rechts; Stack wieder `display: grid` + `gap: 26px` (Block/Margin war nur für sticky nötig), frei scrollend
- [x] Mobil <768 (Entscheidung Sinan): gar keine Karten-Box mehr – Rahmen/Radius weg, Inhalt auf dem Seitenrand (padding-inline 0, bündig mit Eyebrow), Trennung über Nummer + Tag-Haarlinie + 40px Gap
- [x] Dezente Schattierung wieder rein (Wunsch Sinan, „will das sehen“): zweischichtiger weicher Wurf nach unten (`0 2px 6px` 3% + `0 22px 48px` 6% Ink) – Blatt-auf-Papier-Tiefe; mobil aus (dort keine Box) – Look bewerten
- [x] Tag-Pills: `cursor: default` (Labels, nicht klickbar; Selektion bleibt); Desktop-Größe erst wie Portrait-Pills (24px) → Sinan: zu groß → final eine Stufe darunter (19px / 14 28 = Mobil-Maß der Portrait-Pills); mobil <768 bleibt 15px / 11 20
- [x] Titel höher + mehr Luft zum Text (Wunsch Sinan): Spacer-Row über dem Titel von 1fr auf 0.55fr (Titel rückt nach oben), Strich-margin-bottom 30→72px (Abstand Titelblock→Text wächst); mobil unverändert (dortiger Strich-margin-Override 24/32 bleibt)
- [x] **Dunkles Kapitel ABGENOMMEN & fest eingebaut (22.08.2026):** Sinan: Design gefällt
      „extremst", bis „Zuletzt gebaut" inkl. Karten gilt als fertig → der temporäre
      Testblock („VISUELLER TEST", 18.08.2026) vom Ende von `main.css` wurde aufgelöst und
      als reguläres Design eingebaut: `--dark-soft` ist echter Token in `tokens.css`,
      alle Regeln (Konturkante `.step-edge:has(+ .services)`, Sektion, Karten-Farben)
      sind in den Leistungen-Block von `main.css` gefaltet, `ServicesSection` steht auf
      `data-theme="dark"` (Rail-Farbe kommt jetzt über den Token-Mechanismus),
      Test-Vorbehalt im HomePage-Kommentar entfernt; Optik unverändert verifiziert
      (Desktop im Browser: Kante/Karten/Kapitelende; Mobil 390 via iframe: Karten-Box
      bleibt aufgelöst, gleiche Computed Styles; tsc sauber)
- [x] Folge-Fix (22.08.2026, Freigabe Sinan): Tag-Trennlinie der Karten unter 1024 px
      (`.svc-card-tags` border-top) von `--line` auf `--line-dark` – die Tinten-Haarlinie
      stammte noch aus der hellen Karten-Ära und ging auf dem dunklen Kartengrund unter;
      via iframe auf 390 + 800 verifiziert (Desktop ≥1024 hat dort keine Trennlinie,
      unverändert)
- [x] Dot-Lupe („Kreisel“) je Leistungs-Karte (Wunsch Sinan, exakt wie Portrait): Canvas pro Karte (`.svc-card-dots`, z-index -1 hinter dem Inhalt via `isolation: isolate`), gleiche Parameter wie die Portrait-Lupe (26px-Raster, Radius 260, Ring `0.06+0.14e`, Lerp amt 0.12 / Position 0.25), nur feine Pointer + `pointerType === 'mouse'` → mobil/Touch bewusst ohne Effekt (wie Portrait); Karten-Punktraster (bg-dots-dark-Werte) liegt aktuell im TESTBLOCK – bei Rückbau auf hell braucht die Lupe eine Ink-Farbvariante + helles Raster (Canvas-Farbe kommt aus `--paper`)
- [x] Unteres Ende des dunklen Kapitels (Sinan: „nicht plötzlich gerade Linie zu weiß“): erst Probe nach Referenz-Übergang harrisoncarloss.com (`BrushEdge`, SVG-Ink-Riss mit Trockenpinsel-Fragmenten) – Entscheidung Sinan 19.08.2026: „einheitlich mit den Stufen“ → BrushEdge komplett entfernt (Komponente, Barrel, CSS), stattdessen `<StepEdge from="var(--dark)" to="var(--paper)" />` in HomePage zwischen Services und Projekte (ohne Ref, nicht in `stepEdgeRefs` der Nav)
- [x] Folge-Punkt aus dem dunklen Test (gefixt 19.08.2026, gemeldet von Sinan: Nav war hell über den dunklen Leistungen): `edgeToPaperRef` (Hell-Messpunkt der Nav) von der Kante Statement→Services an die Kante Services→Projekte verschoben – Nav bleibt jetzt bis zum Ende des dunklen Kapitels invertiert und kippt über „Zuletzt gebaut“ zurück (beide Richtungen im Browser geprüft); bei Rückbau des Tests wandert das Ref zurück (Kommentar in HomePage.tsx)
- [x] Leistungen dezent heller als das Statement (Wunsch Sinan 19.08.2026): Testblock-Variable `--dark-soft` (erst #1B1B1A, Sinan: „passt farblich nicht, dunkler“ → #161615; Statement bleibt `--dark` #121212) für Sektion, Karten, oberes Kontur-::after und die Grundfläche der unteren Kante (`.services + .step-edge`) – die obere Treppe liest sich dadurch als subtiler Zweiton + Konturlinie; bei Übernahme des Tests wird `--dark-soft` ein echter Token in tokens.css
- [x] Look bewertet (22.08.2026): Sinan – Design gefällt „extremst", Sektion gilt bis
      „Zuletzt gebaut" inkl. Karten als fertig; keine neue Richtung mehr nötig (die
      Rückbau-/„aktuell im TESTBLOCK"-Vorbehalte in den Einträgen oben sind damit
      hinfällig, siehe „Dunkles Kapitel ABGENOMMEN")

## Fertig (Leistungen-Texte menschlicher, 21.08.2026)

- [x] Alle drei Kartentexte überarbeitet (Ziel Sinan: nicht nach Roboter klingen, Besucher
      versteht den Nutzen; Vorgehen: je Karte Varianten → Auswahl durch Sinan):
      01 „Kein Baukasten, kein gekauftes Theme. Ich entwerfe und baue Ihre Website eigens für
      Ihre Firma. Sie sieht aus wie Ihr Betrieb, lädt schnell und macht aus Besuchern Anfragen."
      · 02 „Manche Abläufe passen in kein fertiges Programm. Ich baue Ihnen dafür eine eigene
      Anwendung, die genau Ihrem Ablauf folgt. …" · 03 „Hinter jeder Website und jeder Anwendung
      liegt ein Fundament. …" (Supabase/„Backend" aus dem Text entfernt, „die Sie schon nutzen"
      → „mit denen Sie schon arbeiten")
- [x] Neue Copy-Regel Sinan (21.08.2026): KEIN Doppelpunkt mitten im Satz – zusätzlich zu den
      bestehenden Regeln (keine Gedankenstriche, keine Tool-Namen im Web-Text); Aufzählungen
      stattdessen als eigener Satz
- [x] Titel und Pills aller drei Karten bleiben unverändert (Entscheidung Sinan; „Backend"-Pill
      trotz Jargon-Frage behalten)
- [x] Desktop-Apps (Tauri/Electron, React-Basis) bewusst NICHT auf Karte 02 – „Browser"-Wording
      bleibt als Kundennutzen; als FAQ-Rohidee in `.webdiv/faq.md` notiert („Geht so eine
      Anwendung auch als installierbares Programm?")

## Fertig (Über-mich-Text, 22.08.2026)

- [x] Profiltext final (Sektionen-Textrunde, viele Feedback-Schleifen): „Ich bin Sinan
      Yilmaz, Webentwickler aus Günzburg. Seit über zehn Jahren entwickle ich fürs Web,
      vom One-Pager bis zur ausgewachsenen Web-Anwendung. Die beste Lösung ist oft die
      einfachste. Weniger, dafür zu Ende gedacht. Von mir kommt nichts, was ich
      nicht unterschreiben würde." – Kern von Sinan selbst („weniger, und dieses Weniger
      mit mehr Detail; so optimiert, dass es Komplexität spart"); wörtliches „Weniger ist
      mehr" bewusst vermieden; Schlusssatz = Integritäts-Idee Sinans („nichts, womit ich
      selbst nicht einverstanden wäre"), über „unterschreiben" formuliert, weil sich
      direkt darunter die echte Unterschrift zeichnet (Text beglaubigt das Element);
      Alternative lag vor: „Fertig ist es für mich erst, wenn es sich selbstverständlich
      anfühlt." (Produkt-Gefühl statt persönlicher Haftung)
- [x] Verworfene Anläufe dieser Runde (nicht wiederholen): „Das meiste im Netz ist mir zu
      laut und zu voll" · „Ob etwas gut ist, entscheidet sich an den Stellen, die niemandem
      auffallen. Man merkt sie trotzdem." · Varianten-Ritual-Satz („Bruchteil aus dem, was
      ich mache, plump ausgewählt" – Prozess nie als Einzelritual verkürzen) ·
      „auf meiner Seite wie auf Ihrer" · „Das zahlt sich im Alltag aus, in der Bedienung
      wie in der Pflege." (Abschluss „zu plump", Nutzwert-Liste statt Gefühl)
- [x] Entscheidungen auf dem Weg: React/Next.js/Supabase raus (Kompetenzbeleg tragen die
      Case Studies) · „webdiv ist bewusst klein" verworfen (unehrlich: „hätte ich Geld,
      hätte ich Mitarbeiter") · „webdiv, das bin ich." verworfen · Skizze-bis-Livegang-Satz
      raus (Prozess-Botschaft, wohnt im Ablauf) · „Ich mag X"-Form abgelehnt („Klischee")
      → Präferenz als Urteil über die Sache · Qualitätssatz von Zeit-Form („am längsten
      sitze ich") auf Maßstab-Form gedreht (Missdeutung „ineffizient") · „eine Seite" →
      „etwas" (gilt für Websites UND Anwendungen)
- [x] Zahlform bestätigt: im Fließtext ausgeschrieben („über zehn Jahren"), Ziffern-Form
      „10+" bleibt exklusiv dem Display-Statement

## Projekte-Sektionstitel (entschieden 21.08.2026)

- [x] „Zuletzt gebaut” bleibt (Entscheidung Sinan 21.08.2026, Textrunde): schließt das
      „ich baue”-Motiv der neuen Leistungen-Texte ab; Alternativen („Woran Sie mich messen
      können.”, „Echte Aufträge.”) verworfen, „Arbeit, die …” wegen Arbeit-Aversion raus

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
- [x] Tag-Labels abgesegnet (21.08.2026, Leistungen-Textrunde): alle Pills bleiben wie sie sind – Design & Entwicklung / SEO / Hosting & Pflege · Kundenportale / Verwaltung / Buchung & Abwicklung · Backend / Nutzer & Rechte / Datenübernahme („Backend” bewusst behalten)
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
- [ ] **Beschlossen 21.08.2026:** Ablauf-Sektion bleibt endgültig (De-Risking = Kernargument);
      ZUSÄTZLICH FAQ-Kurzsektion auf der Startseite – drei Fragen voll ausgeschrieben (kein
      Akkordeon), Position zwischen „Über mich“ und Kontakt (nach dem Profil antwortet Sinan
      persönlich auf Fragen), je Q&A großzügige Höhe (~70–80vh statt starrer 100vh);
      volle FAQ-Unterseite bleibt Nach-Livegang-Thema. Fragen-Auswahl: seriös/abheben ·
      „selbst mit KI bauen?“ · „wissen noch nicht, was wir brauchen“ (Brücke zu Kontakt).
      Sinans Feedback: bisherige Formulierungen „zu maschinell“ → menschlichere Fassungen
      als [Vorschlag] im Lab; Design-Wunsch Sinan: große Chat-Bubbles, seine Antwort-Bubble
      in anderer Farbe
- [ ] FAQ-Sektion-Lab erstellt (21.08.2026): `public/lab/faq.html` (+ Fonts kopiert,
      Lab nach Entscheidung löschen), Varianten-Umschalter A–D: A Chat-Bubbles mit dunkler
      Antwort (Punktraster, Kobalt-Punkt am Absender-Label) · B Chat mit Kobalt-Tint-Antwort
      (Footer behält den einzigen großen Kobalt-Block) · C Antwort monumental (Frage klein
      mono, Antwort als Display-Typo mit Kobalt-Akzentwort, Statement-Duktus) ·
      D Gesprächsfaden (gezeichnete Kobalt-Linie verbindet die drei Paare, Chat-Versatz ohne
      Flächen); alle im Browser verifiziert; Entscheidung Sinan steht aus → danach Profiltext
      („Über mich“ passt ihm nicht ganz), dann Footer
- [x] Feedback-Runde 2 (21.08.2026): Sinan wählt A, aber „noch keine Chat-Blasen" → A umgebaut
      zur **Chat-App-Anmutung** (Fenster + Kopfzeile, WhatsApp-Tail nur am Gegenüber, Labels
      raus) und **von Sinan freigegeben → auf die Website übernommen, Lab gelöscht**
- [x] Inhalts-Runde 3 (22.08.2026) – **Richtung „Prinzipien" probiert und verworfen.**
      Ausgangssorge Sinan: „vier Schritte" hat jeder (nicht nur Web-Agenturen), Prozess-Rahmen
      wirkt website-lastig (Web-Anwendungen laufen iterativ/anders). Auf dem Weg verworfen:
      Zusagen-Rahmen (Titel-Kandidaten „krampfhaft gekürzt") · „Kunde gibt Tempo vor,
      Zusagen als Gerüst" · Website/App-Gabelung im Ablauf (verwirrend) · Titel „Vier
      Schritte, ein Ansprechpartner" (Klischee, fliegt in jedem Fall). Prinzipien-Kandidaten
      waren: Direkter Draht · Erst verstehen, dann bauen · Der Preis steht vorher · Echter
      Stand statt Folien · Über den Launch hinaus. Lab `public/lab/prinzipien.html` mit
      4 Layout-Varianten (A Editorial · B Monument · C Raster 3+2 · D Statement mit
      Kobalt-Akzentwort): „alle sehr schlecht, passt nicht zum aktuellen Design" → Lab samt
      Iframe-Harness/Fonts gelöscht. Danach auch inhaltlich verworfen: fünf passen nicht ins
      4-Spalten-Design, Prinzipien wirken als Selbstbeschreibung ohne Leserfrage schwach
- [ ] **Offener Vorschlag (Sessionende 22.08.2026, unentschieden):** Diagnose Claude –
      generisch sind nur Sektionstitel + die vier Phasenwörter (Erstgespräch/Konzept/
      Umsetzung/Livegang), nicht der Inhalt; die Schritt-Texte sind bereits app-neutral
      (04 sagt „Seite oder Anwendung"), das Besondere (Festpreis der gilt, Browser statt
      Folien, kostenlos) steckt im Fließtext. Zweistufiger Minimal-Eingriff, Design/
      Chronologie unangetastet: **(1)** nur Sektionstitel tauschen – Favorit „Sie wissen
      vorher, woran Sie sind.", Alternative „Vom ersten Gespräch bis nach dem Livegang.";
      **(2)** optional Schritt-Titel von Phasenwörtern auf Zusagen umstellen (01 „Reden
      kostet nichts" · 02 „Der Preis steht, bevor ich anfange" · 03 „Zwischenstände im
      Browser" · 04 „Live – und danach erreichbar"). Entscheidung Sinan steht aus;
      Fortsetzung in neuer Session geplant → 22.08.2026: umgesetzt, siehe Folgeeintrag
- [x] **Zusagen-Swap eingebaut und ABGELEHNT (22.08.2026, Sinan: „gefällt mir inhaltlich
      nicht") – `content.ts` wieder auf den alten Stand zurückgedreht, nichts davon
      wiederverwenden; der verworfene Stand war:**
      Stufe 1+2 direkt in `content.ts` (bewusst kein Lab mehr – Lab-Varianten wirkten
      isoliert dreimal „nicht wie die Website"; Bewertung jetzt im echten Scroll-Fluss):
      Sektionstitel „Sie wissen vorher, woran Sie sind." · Schritt-Titel 01 „Reden kostet
      nichts" / 02 „Der Preis steht, bevor ich anfange" / 03 „Zwischenstände im Browser" /
      04 „Live und danach erreichbar" (Gedankenstrich der Skizze entfernt – Copy-Regel).
      Fließtexte minimal mitgezogen: 01 beginnt mit „Unverbindlich." (Titel trägt schon
      „kostet nichts", wörtliche Dopplung raus; „Und ob ich der Richtige dafür bin." als
      eigener Satz) · 02/04 Gedankenstrich bzw. Doppelpunkt gemäß Copy-Regel 21.08.
      aufgelöst („. Und einen Festpreis, der gilt." / „bleibe dran. Änderungen, …") ·
      03 „Sie sehen den echten Stand, keine Folien." (wörtliche Titel-Dopplung
      „Zwischenstände … im Browser" raus, Folien-Pointe bleibt). Unangetastet: Eyebrow +
      Nav-Link „Ablauf", Chronologie/Design/Nummern-Zählung, Mono-Schlusszeile samt
      Gedankenstrich (wortgleiches Echo im Kontakt-Text – wenn ändern, dann beide).
      Ausweich-Titel, falls 01 im Browser zu locker wirkt: „Das erste Gespräch kostet
      nichts"; falls 02 zu lang bricht: „Der Preis steht vorher"
- [ ] **Lab-Runde 4 – vier INHALTLICHE Varianten (22.08.2026, Entscheidung Sinan steht aus):**
      `public/lab/ablauf.html` (+ tokens-/main.css- und Font-Kopien in `public/lab/`, Lab nach
      Entscheidung löschen): echtes Sektionsdesign, Umschalter A–D + Desktop/Mobil-390-
      Telefonrahmen (iframe, Tasten 1–4 · d/m), Eyebrow „Ablauf" und Mono-Schlusszeile überall
      unverändert. A „Was Sie in der Hand haben." (Artefakte je Schritt: Eine ehrliche
      Antwort / Ein Angebot mit Festpreis / Ein Link, keine Folien / Eine Anlaufstelle, die
      bleibt) · B „Wer was macht." (Rollen-Paare: Sie erzählen, ich höre zu / Ich rechne,
      Sie entscheiden / Ich baue, Sie schauen rein / Es läuft, ich bleibe dran) · C „Kein
      Schritt ins Ungewisse." (ohne Schritt-Titel, Zeitwörter im Text führen: Am Anfang /
      Danach / Während der Umsetzung / Am Ende) · D „So läuft ein Projekt bei mir."
      (Phasenwörter bleiben, Mono-Zusagenzeile darunter differenziert: kostenlos und
      unverbindlich / Festpreis, schriftlich / Zwischenstände im Browser / und danach
      erreichbar); alle vier im Browser verifiziert (Desktop A–D + Mobil-Stichproben C/D)
- [ ] **Lab-Feedback Sinan (22.08.2026 spät): D ist Favorit** – zwei Punkte dazu, beide
      im Lab umgesetzt: (1) Design-Bruch: ungleich lange Mono-Zusagen (1- vs. 2-zeilig)
      verschoben die Textanfänge der Spalten (Screenshot Sinan) → Registerhaltung
      eingebaut (CSS-Subgrid ≥ 1024: `.process-col` teilt die Zeilenhöhen Nummer/Titel/
      Zusage/Text über alle Spalten, gilt im Lab für alle Varianten; bei Übernahme in
      `main.css` mitnehmen; Tablet-2×2 verschiebt noch minimal → Feinschliff nach der
      Entscheidung). (2) Inhalt: linearer Ablauf „gilt gefühlt nur für Websites,
      eigentlich iteriert man – ich kooperiere gerne, statt Aufgabe anzunehmen und wie
      am Fließband umzusetzen" → **Variante E** ergänzt (D-Form, kooperativ erzählt,
      bewusst KEINE Website/App-Gabelung): Titel „Wir entwickeln das zusammen." ·
      02-Text „Aus dem Gespräch wird ein Konzept mit Umfang und Zeitplan. Was dort
      steht, gilt." · 03-Text „Sie sehen jeden Stand im Browser und sagen, was passt
      und was fehlt. Das fließt direkt in die nächste Runde ein." (Iteration lebt IN
      Schritt 03, Chronologie bleibt Gerüst, Festpreis unangetastet; 01/04 wie D);
      Sinans Frage „hilft die Mono-Zeile dem Besucher?" mit Ja beantwortet (Scanner
      lesen Titel + Mono-Zeile, nicht Fließtext; Analogie Projekte-Kicker) –
      Entscheidung D vs. E steht aus
- [x] Feinschliff-Runde 2 im Lab (22.08.2026 spät, Feedback Sinan): Sub-Zeile von Mono
      auf Sans gedreht (--fs-small 14px, weight 500, ink-2 – „mono passt mir dort
      nicht"), dadurch alle vier einzeilig, Register hält (Subgrid bleibt als Netz) ·
      „und Zeitplan" aus 02 raus (D+E, jetzt „Konzept mit klarem Umfang") · E-03
      gekürzt auf „Sie sehen jeden Stand live. Ihr Feedback fließt laufend ein."
      („iterativ" bewusst vermieden, Kundenwort „laufend") · 04 in D+E neu, Sub-Zeile
      „Betreuung auf Wunsch", Text „Ich bringe Ihre Seite oder Anwendung live. Wenn
      Sie wollen, bleibe ich Ihr Partner für Pflege und Weiterentwicklung." (Wunsch
      Sinan: auf Wunsch Partner, supportiv/administrativ, statt „und danach
      erreichbar"; „Pflege" = etabliertes Vokabular aus den Leistungen-Tags;
      „Ansprechpartner" bewusst vermieden); im Browser verifiziert (D+E Desktop);
      Nachtrag: Text auf Wunsch Sinan „Wenn Sie wollen" → „Auf Wunsch bleibe ich …"
      (Hinweis gegeben: doppelt sich wörtlich mit der Sub-Zeile „Betreuung auf
      Wunsch" direkt darüber – Auflösung offen, Optionen notiert)
- [ ] Geschäftlicher Folge-Punkt aus der Runde (Angebots-Vorlage, nicht Website):
      „Feedback fließt laufend ein" + Festpreis → im schriftlichen Angebot den Rahmen
      der Runden regeln (z. B. „Anpassungen im Rahmen des Konzepts"), damit die
      Website-Erzählung keinen unbegrenzten Änderungsanspruch suggeriert; Kandidat
      für Akquise-Plan Abschnitt 9 (Preise/Angebot)
- [x] **Übernahme auf die Website (22.08.2026 spät, Auftrag Sinan; Texte weiter
      [Vorschlag]):** Variante E in `content.ts` (Titel „Wir entwickeln das zusammen.",
      Stationen + neues `zusage`-Feld + Texte), `ProcessSection` rendert die Zusagenzeile
      (`.process-promise` zwischen h3 und Text), `main.css`: Promise-Stil (fs-small /
      500 / ink-2 über die bestehende `.process-col p`-Farbe), h3-margin 14→10px,
      Registerhaltung via `@supports (grid-template-rows: subgrid)` (Ableitung < 1024
      setzt `display: block; grid-row: auto` zurück); 03 neu nach Sinans Exklusiv-Idee:
      „Jeder neue Stand geht exklusiv an Sie und bleibt jederzeit erreichbar. Ihr
      Feedback fließt laufend ein." (ersetzt die „live"-Fassung, löst zugleich die
      live/Livegang-Dopplung); **„Livegang" bleibt** (Empfehlung Claude gegen „Go-live":
      Duden-Wort, deutscher Duktus der Seite, „Go-live" ist Konzern-/IT-Jargon);
      Lab `public/lab/` komplett gelöscht; tsc sauber, im Browser verifiziert
      (Desktop: Register hält, Zusagen einzeilig)
- [x] **Ablauf-Sektion ABGENOMMEN (Sinan 22.08.2026 spät: „passt, wir sind durch")** –
      E-Fassung ist final, [Vorschlag]-Status aufgehoben (Kommentar in content.ts
      aktualisiert); die folgenden Feinschliff-Punkte sind damit hinfällig, bleiben
      nur als Randnotiz: Titel-Alternative D „So läuft ein
      Projekt bei mir." (Ein-Zeilen-Swap in content.ts) · „auf Wunsch"-Dopplung
      Sub-Zeile ↔ 04-Text (Optionen: Text „Danach bleibe ich Ihr Partner …, wenn Sie
      das möchten." oder andere Sub-Zeile) · „exklusiv" ggf. → „nur an Sie", falls zu
      werblich · Tablet 2×2 ohne Registerhaltung (Subgrid dort bewusst aus wegen
      row-gap, Feinschliff bei Bedarf) · Durchsicht Sinan auf der echten Seite
      (Desktop-Scrollfluss + Mobil 390/Tablet 768)
- [x] FAQ-Sektion eingebaut (21.08.2026): `FaqSection` (views/home/HomePage) zwischen
      AboutSection und Kobalt-StepEdge, id `#faq`; Texte als `faq`-Export in `content.ts`
      (Startseiten-Fassungen; Antworten 2+3, Status „online" und Composer-Zeile weiter
      [Vorschlag]); Styles in main.css (Block „FAQ (Chat-Fenster)" + Mobile-Ableitung <768);
      Bubbles erscheinen einzeln via [data-reveal], Antwort mit --ri-Stagger; Tail neu als
      Inline-SVG bündig aus der Bubble-Oberkante (nach WhatsApp-Referenz-Screenshots,
      Vorgänger-„Knubbel" verworfen); Composer klickt via scrollToAnchor zu `#kontakt`
      (im Browser verifiziert: Desktop-Screens Kopf/Verlauf/Composer + Klicktest)
- [x] FAQ-Seitentausch (21.08.2026, Feedback Sinan): Perspektive korrigiert – die Frage ist
      die Nachricht des Besuchers (rechts, ohne Tail), Sinans dunkle Antwort kommt als
      Gegenüber-Bubble (links, MIT Tail, border-top-left-radius 0); Tail-SVG nur noch
      Füllpfad in `--dark` (Haarlinien-Pfad entfallen, dunkle Bubble hat keinen Rahmen);
      im Browser verifiziert (Desktop), tsc sauber
- [x] FAQ-Composer entschieden & umgesetzt (21.08.2026): Lab mit 4 Varianten (A Eingabe
      mit Formular-Übergabe · B Quick Replies · C Tipp-Geist · D ohne Composer) →
      **Sinan wählt C**, aber ohne den ↑-Send-Kreis („Pfeil nach oben passt nicht") →
      auf der Website: Beispiel-Fragen (`faq.composer.beispiele` in content.ts, 3 Stück,
      [Vorschlag]) tippen sich zeichenweise in die Leiste (Effekt in FaqSection, startet
      bei inView, direkt am DOM), ruhender Cursor-Strich, Send-Kreis jetzt mit „→"
      (Duktus der Nav-CTA); ganze Leiste bleibt Link/Fahrt zu #kontakt (Klick im Browser
      verifiziert); Lab gelöscht; Nachtrag: überlaufende Beispiel-Frage endet auf
      schmalen Viewports in Ellipsis statt hart abzuschneiden (text-overflow, 390er geprüft)
- [x] FAQ-Sticky entschieden & umgesetzt (21.08.2026): Lab (3 Telefonrahmen + Desktop-
      Probe) → Sinan: ja, ABER Nav-Logik (hide-on-scroll) unangetastet lassen und die
      Nav über der FAQ auf dunkel stellen statt sie zu verstecken → umgesetzt: Kopf-Band
      `position: sticky; top: 0`, Composer-Band `bottom: 0` (z-index 5, unter der Nav),
      gilt Desktop UND Mobile; SiteNav-Prop `stepEdgeRefs` → `themeZones` verallgemeinert
      (kind 'edge' = Treppenkante kippt auf Kantenmitte · 'band' = kippt bei Berührung
      der Pille, Messpunkt top − 36), HomePage reicht `faqHeadRef` an FaqSection
      (headBandRef auf dem Kopf-Band) und als dunkle Zone zwischen edgeToPaper und
      edgeToCobalt; im Browser verifiziert (Desktop + 390er-iframe: Kopf/Composer kleben,
      Composer-Fahrt zu #kontakt, Übergang zum Kobalt-Footer löst sauber); Labs gelöscht
- [x] Nav-Pille ab FAQ ausgeblendet (Revision Sinan 21.08.2026, ersetzt „dunkel
      stellen"): Die on-dark-Pille über dem klebenden Kopf verdeckte Avatar/Name →
      Entscheidung: ab Berührung des Chat-Kopfs bis zum SEITENENDE (inkl. Kobalt-Footer)
      wird die Pille komplett ausgeblendet – im Chat ist der Kopf die Kopfzeile, im
      Footer steht der Kontakt selbst; Umsetzung: `hideNav`-Flag je themeZone
      (FAQ-Band + Kobalt-Kante), eigener `suppressed`-State nutzt die nav-hidden-Optik,
      die hide-on-scroll-Logik läuft intern unverändert weiter und übernimmt beim
      Verlassen der Zone nach oben nahtlos; im Browser verifiziert (in FAQ + Footer
      hochscrollen: keine Pille · oberhalb der FAQ: Pille kommt hell zurück)
- [x] Bugfix Zonen-Messung (Meldung Sinan 21.08.2026: Pille blitzte beim Hochscrollen
      zwischen Footer und FAQ-Composer auf): Der Nav-Messpunkt lag auf dem Kopf-Band
      selbst – das ist sticky, ein Remeasure (Resize etc.) während es klebt/unten in
      der Sektion geparkt ist maß die Zonengrenze auf die verschobene Position, der
      Streifen darunter fiel aus der Hide-Zone → jetzt unsichtbarer 0-Hoehen-Messanker
      an der Flussposition vor dem Band (`headAnchorRef`, positionsunabhängig);
      verifiziert per MutationObserver-Log: Rad-Scroll ganz runter, resize (Remeasure)
      erzwungen, Rad hoch durch den kritischen Streifen – kein einziger Klassenwechsel,
      Pille bleibt durchgehend weg
- [x] Rail-Fix (Feedback Sinan 21.08.2026, Screenshot): Kopf-/Composer-Band verdeckten
      mit ihrem Sticky-z-index die Sektion-Rails ([data-rails]::before, z-index 0) –
      beide Bänder führen die Haarlinien jetzt mit eigenem ::before auf --rail-inset
      selbst weiter (klebt mit); im Browser links+rechts im Klebezustand verifiziert
- [x] FAQ-Fragen value-first umgesetzt (21.08.2026, alles [Vorschlag] – absegnen):
      Sinans Feedback „Antworten zu lang, Frage 1 anders formulieren, Akzentwörter
      schlecht gewählt (oder weglassen)" → alle drei Antworten gekürzt, Frage 1 neu:
      „Ist unsere Website eigentlich noch gut genug?" mit 3-Punkte-Selbst-Check;
      KI-Antwort mit ehrlicher Weichenstellung (Visitenkarten-Fall reicht Selbstbau);
      Akzent-Prinzip neu: statt Begriffen ist jetzt der eine MERKSATZ der Antwort Kobalt
      („Behalten Sie Ihre Seite" · „Das Gute wird dadurch sichtbarer" · „Sie brauchen
      noch keine neue Website" – jeweils die Anti-Verkaufs-Kernaussage); komplettes
      Weglassen bleibt Ein-Zeilen-Option (akzent-Rendering in FaqSection); Details in
      `.webdiv/faq.md` („Value-first-Umbau")
- [x] Composer erst ab „Chat betreten" (21.08.2026, Wunsch Sinan: FAQ-Footer erst
      bei voll sichtbarer Sektion, nicht schon ab „— FAQ"): vorher klemmte sticky
      das Band beim Sektionseintritt an die Sektions-Oberkante (ritt ~100 px auf
      der Überschrift) und klebte dann unten; jetzt bleibt es verborgen
      (translateY(100%) + opacity/visibility, ohne Fokus/Pointer) und gleitet
      erst ein, wenn der Chat-Kopf oben andockt – gleiche Schwelle wie die
      Nav-Zone, gemessen am headAnchorRef (useRemeasure + useFrame in FaqSection,
      Klasse .in am Band, data-reveal am Band entfällt); beide Richtungen
      symmetrisch, am Sektionsende unverändert Flussposition; im Browser
      verifiziert (5 Scroll-Positionen + Screenshots, inkl. Remeasure-Probe:
      svh-Reflow nach Viewport-Resize verschiebt die Schwelle korrekt mit),
      tsc sauber
- [x] Kopf-Abgang am Chat-Ende (21.08.2026, Wunsch Sinan: Kopf soll nicht bis zum
      Seitenende mitkommen): vorher klebte der Kopf bis zum Schluss über dem
      Kobalt-Footer und schob sich bei der nativen Rausschiebung sichtbar hinter
      das Composer-Band (gleicher z-index, Composer später im DOM); jetzt
      verabschiedet er sich nach oben (translateY(-100%) + Fade, Klasse .out),
      sobald der Composer am Chat-Ende in seine Flussposition einparkt –
      Schwelle über zweiten 0-Höhen-Fluss-Anker nach dem Composer-Band
      (endAnchorRef in FaqSection, scrollY + vh ≥ Anker-Top im selben
      useRemeasure/useFrame wie die Andock-Schwelle); Hochscrollen symmetrisch
      (Kopf dockt wieder an, sobald der Composer wieder klebt); CSS-Regel als
      .faq .faq-band-head.out (Spezifität über [data-reveal].in, Transition aus
      der Reveal-Basisregel); im Browser verifiziert (5 Scroll-Positionen +
      Screenshots, beide Richtungen, Seitenende ohne Kopf), tsc sauber
- [x] Bugfix dazu (Meldung Sinan 21.08.2026: Kopf kam nach dem Abgang beim
      Hochscrollen nicht wieder): useRevealChildren setzt die Reveal-Klasse
      „in" einmalig per classList direkt am DOM – der out-Toggle ließ React
      das className des Kopf-Bands neu schreiben und warf das DOM-„in" weg,
      danach galt [data-reveal] ohne .in = opacity 0 (nur das Kopf-Band
      betroffen: einziges data-reveal-Element mit React-verwaltetem
      className; Bubbles/Composer unberührt) → Fix: „in" rendert React am
      Kopf-Band selbst aus dem vorhandenen inView (gleiche Once-Semantik);
      verifiziert mit zwei vollen Runter-hoch-Zyklen inkl. Endzustands-Reads
      (Klasse „in out" beim Abgang, „in" + opacity 1 + top 0 nach Rückkehr)
- [ ] FAQ-Feinschliff (weiter offen, mit Sinan): Tail-Kurve final abnehmen, Motion-Idee
      Tipp-Indikator (··· bevor die Antwort-Bubble poppt), Tablet-Durchgang, Mobile-Pass
      für die vergrößerte Desktop-Typo (Minima bewusst unangetastet), offene Frage
      „FAQ" in die Nav?, Copy-Freigaben nur noch Status-Zeile + Tipp-Geist-
      Beispielfragen (Fragen/Antworten alle abgesegnet: 02 + 01/03 am 22.08.);
      beim Draufschauen offen: Antwort-Bubble-Breite (720 px ≈ 53 Zeichen bei 24 px –
      ggf. auf ~860 px mitziehen) und Chip-Größe (11 px Mono neben 32-px-Frage); danach
      als Sektionen noch Ablauf und Kontakt (Profiltext ist seit 22.08. final)
- [x] FAQ Antworten 01+03 neu gefasst + abgesegnet, Akzent-Prinzip = Scan-Test,
      Desktop-Typo vergrößert (22.08.2026): Anlass Sinan – Kobalt-Stellen werden
      beim Überfliegen als Botschaft gelesen (markiertes „Behalten Sie Ihre Seite" =
      „kein Bedarf"-Signal), dazu 01/03 „low quality, zu viele Doppelpunkte".
      Prinzip neu: Akzent = Kurzantwort auf die Frage, Scan-Reihe „Drei Prüfungen ·
      Expertise · Erstgespräch", Anti-Verkaufs-Sätze bleiben unmarkiert im Fließtext;
      Ton an Antwort 02 angeglichen (kurze Aussagesätze, 0 Doppelpunkte), Antwort 03
      endet gattungsneutral, Frage 01 bleibt bewusst website-konkret, Startseiten-Trio
      bestätigt (Details in .webdiv/faq.md). Typo: Frage/Antwort 32/24 px bei 1440
      (clamp-Steigung + Deckel in main.css angehoben, Minima unverändert →
      unter ~1000 px alles wie vorher, Mobile-Pass separat)
- [x] Feedback-Runde 3 umgesetzt (21.08.2026, direkt auf der Website): ✓✓-Häkchen entfernt;
      pro Antwort genau EIN Kobalt-Akzent (`faq.paare[].akzent` in content.ts, [Vorschlag]:
      „Präzision" / „Urteil, Geschmack, Verantwortung" / „das Erstgespräch"; Rendering via
      renderAntwortAbsatz, .faq-accent = Kobalt + weight 600 wie Statement-Akzente); Status
      „online" ersetzt durch „Websites & Web-Anwendungen" + Status-Punkt entfernt (nichts
      soll Live-Erreichbarkeit suggerieren)
- [x] FAQ-Flächen-Lab entschieden & übernommen (21.08.2026): 2×2-Matrix (Karte/Fläche ×
      Punkte/Doodles), **Sinan wählt D: Fläche full-bleed + Doodles** → auf der Website
      umgesetzt, Lab gelöscht. Umsetzung: `.bg-doodle` als neues Hintergrund-Raster in
      tokens.css (SVG-Tile 280px, Linien-Doodles „gute Vibes": Smiley ×2, Herz ×2, Funkel ×2,
      Blitz, Pizza, Sprechblase ×2, Kaffeetasse, Wolke, Sonne, Mond, Note + Füllpunkte;
      auf Sinans Wunsch dichter und sichtbarer als im Lab: ink 8 % statt 5,5 %);
      FaqSection als drei volle Bänder (Kopf/Composer = paper mit Haarlinien oben+unten,
      Verlauf = paper-2 + bg-doodle, Inhalt im Container); **Avatar + Composer sitzen
      bündig auf der Textkante** (Kopf-Padding-inline 0, Sinans Screenshot-Feedback);
      Bubbles q 72 % / a 76 % (mobil 94 %); Rails laufen durch die Bänder; Desktop im
      Browser verifiziert (Kopf-Bündigkeit, Doodles, Akzente, Composer → Treppenkante)
- [x] FAQ Frage 02 neu gedreht & abgesegnet (22.08.2026, Sektionen-Textrunde): Selbstbau-
      Frage („Kann ich meine Website nicht einfach selbst mit KI bauen?") verworfen –
      falsch gestellt, zwingt in die Rechtfertigung, und „Ich nutze KI selbst" fliegt
      (KI-Nutzung ist Normalität, kein Thema). Neu: „Heute kann doch jeder mit KI bauen.
      Wie heben wir uns da noch ab?" + Einordnungs-Antwort (Baukästen gab es vorher auch,
      Expertise dahinter entschied schon immer; beherrschen/bedienen-Paar; Abstands-These
      als hergeleitetes Fachurteil, Wahrheits-Check besprochen). Antwort ohne „ich",
      gattungsneutral („bauen"/„Arbeit" statt „Website"). Akzent entschieden (Sinan,
      gleiche Session): das einzelne Wort „Expertise" statt Merksatz – nur dieses
      eine Wort wird Kobalt. Alter 50-€-Einwand + Visitenkarten-Antwort →
      Kandidat FAQ-Unterseite; Details + verworfene Anläufe in `.webdiv/faq.md`
      („Frage 2 der Startseite neu gedreht")
- [x] **FAQ-Design-Lab (22.08.2026, ABGESCHLOSSEN – Lab gelöscht):** `public/lab/faq.html`
      (+ tokens-/main.css- und Font-Kopien in `public/lab/`, Lab nach Entscheidung löschen).
      Anlass Sinan: Kobalt-Akzent auf der dunklen Bubble schwer lesbar (gemessen: volles
      Kobalt #2A3CFF auf --dark nur ~2,8:1), Frage/Antwort-Größen zu weit auseinander
      (27/18 px), mobil muss es korrekt aussehen; Doodles gefallen sehr → bleiben überall.
      Harness: Tasten 0/1–4 = Ist/A–D, d/m = Desktop/Telefonrahmen 390 (iframe);
      Ansehen: http://localhost:3000/lab/faq.html. Alle Varianten: Typo enger (Frage
      clamp 18→22 px, Antwort clamp 17→20 px statt 27/18).
      **Runde 1 (hell) KOMPLETT VERWORFEN** (Sinan: „gar nichts davon" – A Haarlinien-
      Bubble + Kobalt-Tail „hässlich" · B Blatt-Schatten „nicht gut lesbar, auch nur mit
      Border" · C 7-%-Kobalt-Tint „Farbe passt nicht zur Website" · D offene Antwort mit
      Kobalt-Strich „ganz schlimm") – nichts davon wiederverwenden, auch den Kobalt-Tail
      nicht. Vorgabe danach: Antwort bleibt DUNKEL, Farbe aus den oberen Kapiteln
      (Statement --dark / Leistungen --dark-soft; die Ist-Bubble IST bereits --dark).
      **Runde 2 (dunkel): Sinan wählt C „Kobalt-Marker" → EINGEBAUT (22.08.2026):**
      in main.css übernommen – .faq-accent jetzt Marker (Text --on-dark auf
      --cobalt-Fläche, padding 0.08em/0.32em, radius 6px, box-decoration-break: clone
      für mehrzeilige Satz-Akzente; Begründung im CSS-Kommentar: volles Kobalt als
      Textfarbe läge auf --dark bei ~2,8:1) + engere Typo fest (Frage clamp 18→22 px,
      Antwort clamp 17→20 px, line-height 1.6); Bubble selbst unverändert --dark +
      Punktraster. Auf der Startseite im Browser verifiziert (Marker „Expertise" +
      Satz-Marker, Kopf/Composer kleben; mobil identische Regeln, im Lab-Telefonrahmen
      geprüft). Nicht gewählt: A Statement-Schwarz + helles Kobalt (color-mix 65/35,
      ~5,6:1) · B „Leistungs-Karte" (--dark-soft + Kontur + Raster) · D „Ruhige
      Fläche" (--dark-soft + Kontur ohne Raster). Offen aus C: Satzpunkt direkt nach
      dem Marker wirkt leicht abgesetzt (Fix-Optionen: Punkt in den Akzent ziehen oder
      padding rechts reduzieren – bei der Akzent-Runde mitentscheiden).
      **Runde 3 (Chat-Breite Desktop) – ENTSCHIEDEN 22.08.2026: bleibt volle Breite
      („wir lassen es so wie es ist"), Lab samt CSS-/Font-Kopien gelöscht, das
      FAQ-Design-Thema ist damit zu (offen nur noch Copy/Akzente, s. Feinschliff):** Sinans
      Befund „alles weit auseinander" + Sorge um die Flucht Avatar/H2/Bubbles →
      Konzept „Chat-Spur" = gemeinsame max-width für Kopf-Inhalt, Chips, Bubbles und
      Composer-Inhalt, LINKS an der Textkante verankert (nichts zentrieren → Flucht
      H2/Avatar/Antworten bleibt komplett erhalten; nur die Fragen und der Send-Kreis
      rücken ein; Bänder/Haarlinien weiter full-bleed; mobil wirkungslos, da
      max-width > Mobilbreite): Taste 0 wie eingebaut (volle Breite) · A nur Verlauf
      auf Spur 960 (Composer-Pfeil bleibt rechts außen) · B ganze Spur links 960
      (Empfehlung) · C ganze Spur zentriert 960 (zeigt den Flucht-Bruch: Avatar löst
      sich sichtbar von der H2-Kante) · D ganze Spur links 860 (engere Probe; die
      Antwort-Bubble wird dabei schmaler, 76 % von 860 liegt unter dem 720-px-Cap);
      alle 4 im Browser verifiziert
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
- [x] Zeilen-Formel für künftige Projekt-Einträge festgeschrieben (22.08.2026, als Kommentar
      über `projekte.eintraege` in content.ts): Kicker = Jahr · Gattung · Rolle (festes
      Gattungs-Vokabular: One-Pager/Website/Web-Anwendung/Online-Shop, Rolle im Muster „A & B")
      · Titel = stärkster nennbarer Identifikator (Kundenname; nur bei Vertraulichkeit die
      Sache) · Sub = Antwort auf „… und das ist?", darf Titel-Jargon übersetzen, wiederholt
      nie den Kicker; „One-Pager" im Bucan-Kicker bestätigt
- [x] ERP-Sub „Modulare B2B-Anwendung" → „Modulare B2B-Software" (22.08.2026): „Anwendung"
      doppelte den Kicker „Web-Anwendung"; Alternative „Betriebssoftware" verworfen –
      Korrektur Sinan: das Produkt soll lizenziert und verkauft werden
- [x] Projekt-Zeilen auf Touch ohne Hover-Effekte (22.08.2026, Wunsch Sinan „einfach nur
      klickbar"): alle :hover-Regeln (Paper-2-Flut, Kontur, Titel-Dehnung 115 %, Pfeil-Schub,
      weichende Trennlinien) in `@media (hover: hover) and (pointer: fine)` gewandert;
      Geräte-Emulations-Check im Browser steht noch aus

## Entschieden (22.08.2026, nach Außen-Feedback „2/10")

- [x] Preloader/Unterschrift-Intro bei jedem Laden BLEIBT (Entscheidung Sinan): bewusste
      Abgrenzung – der One-Pager zeigt, worauf webdiv achtet und was designtechnisch geht;
      wen das Intro nicht interessiert, der scrollt einfach direkt weiter (die echte
      Unterschrift als SVG bleibt als Asset-Todo unten offen)
- [x] Reveal-Einblendungen beim schnellen Scrollen BLEIBEN wie sie sind (Entscheidung
      Sinan): Inhalt kommt gefühlt sofort, wenn man irgendwo hinscrollt – kein
      Nachjustieren nötig
- Rest des Feedbacks: dunkles Kapitel abgenommen (siehe Leistungen-Abschnitt); die noch
  sichtbaren Baustellen ([E-Mail-Adresse] im Footer, Impressum/Datenschutz-Unterseiten,
  Bucan-Case-Study-Screenshot) sind als offene Todos erfasst und werden vor dem
  Livegang erledigt

## Fertig (Impressum & Datenschutz, 22.08.2026)

- [x] Unterseiten `/impressum/` + `/datenschutz/` im aktuellen Design (rein typografisch,
      Muster 404/Case-Study): gemeinsames Geruest `LegalPageShell` (core/components/shell –
      SubpageNav, Eyebrow „Rechtliches", H1, Fliesstext max 68ch, mono-Fusszeile mit
      Querlinks), Texte in `src/core/consts/legal.ts` (gemeinsame `anbieter`-Konstante:
      Anschrift/E-Mail EINMAL ersetzen, wirkt auf beide Seiten; Platzhalter rendern als
      Text, echte E-Mail wird automatisch mailto-Link), Styles als „Rechtsseiten"-Block
      in main.css (Titel fluid 30px@390–72px@1440, damit „Datenschutzerklärung" auf 390
      einzeilig bleibt – im 390er-iframe gefixt und verifiziert)
- [x] **Rechtslage gegen Primärquellen geprüft (22.08.2026):** § 5 DDG (gesetze-im-internet)
      → Pflicht: Name, Anschrift, E-Mail; USt-IdNr./W-IdNr. NUR „soweit vorhanden" (Nr. 6);
      kein Register, kein Kammerberuf → Angaben entfallen · EU-OS-Plattform zum 20.07.2025
      eingestellt (VO (EU) 2024/3228) → OS-Link WEGLASSEN ist Pflicht (toter Verweis wäre
      irreführend/abmahnbar, § 5 UWG) · § 36 Abs. 3 VSBG: ≤ 10 Beschäftigte → keine
      Streitbeilegungs-Info nötig, Satz bewusst weggelassen (wie Bucan) · § 2 Abs. 1 Nr. 11
      DL-InfoV: Berufshaftpflicht nur angeben, falls eine besteht → Frage an Sinan ·
      MStV-Verantwortlichen-Zeile nach Bucan-Blaupause · Kleinunternehmer-Satz (§ 19 UStG)
      bewusst NICHT im Impressum (Rechnungs-Thema, keine Impressumspflicht, Website nennt
      keine Preise)
- [x] Datenschutzerklärung deckt exakt die technische Realität (Bucan-Prinzip): Hosting/
      Server-Logfiles (Hoster = [Platzhalter] bis zur Hosting-Entscheidung, AVV-Satz),
      Kontaktformular/E-Mail (Art. 6 Abs. 1 lit. b, ohne Einwilligungs-Checkbox),
      keine Cookies/kein Tracking (per Grep verifiziert: kein localStorage/sessionStorage/
      Cookie im src), Fonts lokal, Betroffenenrechte, Stand-Datum; Ich-Form wie die
      restliche Site, Copy-Regeln eingehalten (keine Gedankenstriche/Satz-Doppelpunkte)
- [x] Kontaktformular: Datenschutz-Hinweiszeile unterm Absenden-Knopf ergänzt
      (`kontakt.formular.hinweis` in content.ts, `.form-hint` in main.css, Link auf
      `/datenschutz/`) – Checkliste Abschnitt 7, Bucan-Blaupause; im SSR-HTML verifiziert
- [x] `footer.rechtliches`-Hrefs auf Trailing-Slash-Form (`/impressum/`, `/datenschutz/`)
      wie der statische Export (erspart den Hoster-301); Sitemap um beide URLs ergänzt;
      Meta: Title/Description/Canonical je Seite (Descriptions sind **[Vorschlag]**)
- [x] Verifiziert: tsc sauber; Desktop im Browser (beide Seiten, Reveals, Fusszeilen-
      Klick Datenschutz→Impressum als Client-Navigation); Mobile 390 via iframe-Testseite
      mit Transition-Kill (danach gelöscht)
- [ ] **Fragen an Sinan (Platzhalter füllen, alle in `legal.ts`/`content.ts`):**
      (1) ladungsfähige Anschrift (Straße + Hausnummer, PLZ + Ort) ·
      (2) Impressums-/Kontakt-E-Mail (gmail oder erst mit Hosting eine @webdiv.de?) ·
      (3) Telefonnummer ins Impressum? (keine Pflicht – E-Mail + Formular genügen als
      zwei schnelle Kontaktwege, EuGH C-298/07) ·
      (4) USt-IdNr. oder schon zugeteilte W-IdNr. vorhanden? (nur dann Pflichtangabe) ·
      (5) Berufshaftpflichtversicherung vorhanden? (nur dann anzugeben: Versicherer +
      Anschrift + Geltungsbereich) ·
      (6) Hosting: bleibt es bei Strato nach Bucan-Blaupause? (dann Abschnitt 2 der
      Datenschutzerklärung konkretisieren: „STRATO GmbH, Otto-Ostrowski-Straße 7,
      10249 Berlin" + AVV abschließen/archivieren) ·
      (7) Falls Formular-Backend NICHT beim Hoster landet (z. B. Supabase Edge Function):
      Bescheid geben – dann braucht die Erklärung einen Abschnitt zum Drittanbieter
- [x] **Antworten Sinan zu (6)+(7) (22.08.2026): „wie bei Bucan"** – Hosting Strato,
      Formular als PHP-Handler auf dem eigenen Webspace (kein Drittanbieter):
      Abschnitt 2 der Datenschutzerklärung konkretisiert („bei der STRATO GmbH
      (Otto-Ostrowski-Straße 7, 10249 Berlin)"; Anschrift am 22.08.2026 gegen
      strato.de/impressum verifiziert), der bedingte Drittanbieter-Abschnitt entfällt
      planmäßig. Folge-Todos Sinan bei der Strato-Einrichtung: Paket für webdiv.de,
      AVV-PDF aus dem Kundenlogin archivieren (ab Vertragsdatum 18.07.2022 automatisch
      einbezogen, Bucan-Referenz Abschnitt 6), Postfach anlegen – das beantwortet
      zugleich Frage (2): mit Strato gibt es eine echte @webdiv.de-Adresse, die wie
      bei Bucan zugleich SMTP-Login des Formulars wird (nur Lokalteil wählen, z. B.
      info@/hallo@/kontakt@). **Formular-Backend nach Bucan-Muster ist damit als
      nächstes Arbeitspaket startklar** (kontakt.php mit Validierung/Honeypot/
      Ausfülldauer-Check/JSON, PHPMailer vendored, kontakt-config.php gitignored +
      example-Vorlage, .htaccess-Sperre, CI-Secret-Mechanik; smtp.strato.de:465);
      Fragen (1)–(5) bleiben offen
- [x] **Antwort Sinan zu (2) (22.08.2026): hallo@webdiv.de** („sympathisch"; Empfehlung
      sinan@ besprochen, hallo@ gewählt – sinan@/info@ können später Aliase werden):
      eingetragen in `anbieter.email` (legal.ts → Impressum + Datenschutz, rendert
      automatisch als mailto-Link), Footer-Adresszeile, Mail-Icon-mailto und
      Formular-Fehlertext (content.ts) sowie als `email` am LocalBusiness-JSON-LD
      (page.tsx); tsc sauber, per Grep verifiziert: kein [E-Mail-Adresse]-Platzhalter
      mehr in src/. Postfach hallo@webdiv.de bei der Strato-Einrichtung anlegen
      (zugleich SMTP-Login des Formulars); offen bleiben (1) Anschrift, (3) Telefon,
      (4) USt-IdNr., (5) Berufshaftpflicht

## Offen aus dem Bucan-Abgleich (für Deploy-Phase)

- [ ] SkipLink im Layout (a11y; Bucan hat einen) – 17.08.2026: bewusst weggelassen (Entscheidung Sinan)
- [ ] `.htaccess` (Caching für `_next/static`, Schutz der Formular-Config, `ErrorDocument 404 /404.html`) + GitHub-Actions-Deploy (`deploy.yml`) – erst wenn Hosting steht
- [ ] JSON-LD um E-Mail/Telefon ergänzen, sobald die [Platzhalter] ersetzt sind (Sitemap-Teil erledigt 22.08.2026: `/impressum/` + `/datenschutz/` sind in `public/sitemap.xml`)

## Offene Entscheidungen (Feedback nötig)

- [ ] Hero-Wortmarke: mit Token-Skala ~62 % der Inhaltsbreite statt ~80 % aus dem Briefing – Skala behalten oder auf ~22,5vw vergrößern?
- [ ] Logo Variante 2: Strichstärke 16/120 statt exakt Mona-Sans-800-Stamm (20/120) – bewusste Abweichung, ok so?
- [x] Logo-Favorit benannt (16.08.2026): Variante 3 (Icon, Kobalt-Quadrat) – bereits als Favicon/App-Icon im Einsatz; die Varianten haben laut Briefing feste Rollen (V1 Monoline = feine Kontexte, V2 Schwer = Nav/Lockups, V3 = Icon). Falls V3 auch im Nav-Lockup gewünscht: Bescheid geben
- [ ] Eyebrows in `--ink-3` (13 px) ≈ 3,2:1 Kontrast, unter AA – so lassen oder auf `--ink-2` heben?
- [x] Regler-Toggle unten links: obsolet (19.08.2026) – die Prototyp-Regler (DevControls) wurden nie in die Next.js-App portiert und bleiben bewusst draußen; CSS-Rest `.controls` in `main.css` mit entfernt
- [ ] Nav-Button „Erstgespräch“ springt zu `#kontakt` – gewünschtes Verhalten?
- [ ] Ergänzte [Vorschlag]-Texte absegnen: Seitentitel, Formular-Validierungstexte, Platzhalter-Labels, 404-Texte (`notFound` in `content.ts`) (Meta-Description: Variante A am 17.08.2026 abgesegnet)

## Meine Todos (Assets liefern)

- [x] Porträtfoto liegt vor (festgestellt 22.08.2026): `public/portrait.jpg` ist da, Porträt-Block und Über-mich zeigen es
- [ ] Echte Unterschrift als SVG-Einstrich-Pfad (ersetzt Mr-Dafoe-Platzhalter in `src/core/consts/signature.ts`)
- [ ] E-Mail-Adresse, Impressumsdaten (stehen als sichtbare `[Platzhalter]` in `src/core/consts/content.ts` und – Anschrift/E-Mail zentral – in der `anbieter`-Konstante in `src/core/consts/legal.ts`); Domain webdiv.de ist seit 17.08.2026 hinterlegt
- [x] Instagram-/LinkedIn-Profil-URLs für die Footer-Icons (19.08.2026): beide als direkte externe Links in `footer.soziale` (`content.ts`) – https://www.instagram.com/webdiv.de und https://www.linkedin.com/in/sinan-yilmaz-webdiv/ (Slug auf Empfehlung geändert); externe Footer-Links bekommen `target="_blank" rel="noopener"` (`ContactSection.tsx`); JSON-LD (`src/app/page.tsx`): Instagram als `sameAs` am LocalBusiness, LinkedIn als `sameAs` am `founder`-Person-Objekt. Social-Strategie-TODOs: `.webdiv/akquise-plan.md` Abschnitt 11
- [x] Bucan-Projekt-Vorschaubild liegt vor (festgestellt 22.08.2026): `public/projekte/bucan/thumb.webp` ist da, der Hover der Projekt-Zeile zeigt es (der Slot in den Leistungen ist seit dem Farbboxen-Redesign 18.08.2026 entfallen)
- [ ] Bucan-Case-Study: Startseiten-Screenshot als `public/projekte/bucan/screen-home.webp` ablegen → Browserrahmen auf `/projekte/bucan-eventservice` übernimmt ihn automatisch (bis dahin zeigt NUR diese Stelle „Screenshot folgt")

## Runde 2 (nächste Session)

- [ ] USP „performant + custom + zugeschnitten" belegt hervorheben: Satz-Ergänzung in Leistungen/Firmen-Websites ERLEDIGT 21.08.2026 („lädt schnell" im neuen Karte-01-Text); offen bleibt die Fakten-Leiste mit Messwerten im Technik-Kapitel der Case Study (PageSpeed/Ladezeit/Cookies der Bucan-Seite – erst messen, nichts behaupten)

- [x] Mobile-Ableitung bis 390 px (16.08.2026 – siehe „Fertig (Mobile/Tablet-Ableitung)“; Touch: nur Welle statt Lupe war schon im Port enthalten)
- [x] Unterseite `/projekte/bucan-eventservice` (16.08.2026 – siehe „Fertig (Case Study Bucan)“)
- [x] Unterseiten `/impressum`, `/datenschutz` (22.08.2026 – siehe „Fertig (Impressum & Datenschutz)“; Anschrift/E-Mail/Hoster noch [Platzhalter], Fragen an Sinan offen)
- [ ] Motion-Feinschliff mit GSAP/ScrollTrigger (Lenis ist seit 16.08.2026 drin; Design-Intent steht in `.website/HANDOFF.md`)
- [ ] Formular an echtes Backend anbinden (z. B. Supabase Edge Function)
