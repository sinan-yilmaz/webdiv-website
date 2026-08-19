# webdiv – Prototyp Runde 1 · Handoff

Interaktiver Desktop-Prototyp (Referenzbreite 1440 px) für die webdiv-One-Page,
inklusive Design-System und Logo-Varianten. Alles gemäß Design-Briefing Runde 1.

## Ansehen

Statischer Server im Projektordner starten (Fonts und Canvas brauchen http, kein `file://`):

```
node serve.js        # → http://localhost:4173
```

- `index.html` – die One-Page (Preloader erscheint einmal pro Session; zum erneuten
  Ansehen in der Konsole `sessionStorage.removeItem('webdiv-seen')` und neu laden).
- `design-system.html` – Tokens, Typografie, Logo-Varianten, Raster/Kanten, Komponenten.
- Regler unten links: Akzent (Farbton/Sättigung), Hero-Gewichte/-Breiten,
  Stufenhöhe, Sektionsabstand, Raster-Sichtbarkeit, 12-Spalten-Overlay.

## Dateien

```
index.html            One-Page mit allen Sektionen (wörtliche Texte aus dem Briefing)
design-system.html    Schaufenster: Tokens · Typo · Logo · Raster · Komponenten
css/tokens.css        Design-Tokens (einzige Quelle für Farbe/Typo/Raster/Motion-Werte)
css/main.css          Layout, Komponenten, Sektionen
js/main.js            Motion & Interaktion (Vanilla, rAF + IntersectionObserver + WAAPI)
js/signature-data.js  Unterschrift-Pfade (Mr Dafoe, zur Buildzeit generiert)
assets/fonts/         Mona Sans VF (wght 200–900, wdth 75–125, opsz) · Geist Mono VF
assets/logo/          Zeichen-SVGs: monoline · heavy · icon (Kobalt-Fläche)
assets/img/           LEER – hier portrait.jpg ablegen (frontal, schwarzer Hintergrund)
serve.js              Mini-Server für die lokale Ansicht
.webdiv/tasklist.md   Aufgabenstand, offene Entscheidungen, Runde-2-Plan
.website/             Referenzdokumente: dieses Handoff · referenz-bucan-website.md
.claude/CLAUDE.md     Projektkontext für Claude Code, verweist auf .website/
```

**Porträt nachrüsten:** Datei als `assets/img/portrait.jpg` ablegen – Porträt-Block,
„Über mich“-Ausschnitt und das Pixel-Porträt im Footer (24×24-Downsample per Canvas,
dunkle Pixel < Luminanz 26 werden transparent gestellt) greifen automatisch.
Bis dahin zeigen alle drei Stellen markierte `[ Porträt folgt ]`-Platzhalter.

## Logo-Konstruktion

Drei exakt gleich lange Striche (Pythagoras-Tripel, Länge 65 Einheiten in 120er-Quadrat):
Slash Δ16/63 (16-63-65), Winkelstriche je Δ56/33 (33-56-65). Ober-/Unterkanten fluchten.

- Variante 1 Monoline: Strichstärke 9, eckige Enden (butt), Gehrungs-Scheitel.
- Variante 2 Schwer: gleiche Mittellinien, Strichstärke 16 (optisch an Mona Sans 700/800
  angeglichen) – Verwendung in Navigation und Lockups.
- Variante 3 Icon: Variante 2 auf 72 % in abgerundetem Quadrat (rx 30/120), Kobalt/Paper.
- Lockup-Abstand Zeichen–Wortmarke = Strichstärke × 2.
- Zeichnen-Animation: `stroke-dashoffset`; der Winkel läuft in zwei Phasen
  (42 % → Pause → 100 %), damit er sich als zwei Striche liest (siehe `drawMark()` in main.js).

## Motion – umgesetzt im Prototyp (Vanilla)

Alle scrollgebundenen Effekte laufen über einen zentralen rAF-Loop mit gelerptem
Scrollwert (Faktor 0.115) – das erzeugt das weiche Nachlauf-Gefühl ohne Scroll-Hijacking.
Easing-Standard `cubic-bezier(0.16, 1, 0.3, 1)`, Micro 240 ms, Reveals 850 ms, Stagger 80 ms.

- **Preloader** (~2,4 s, einmal pro Session): Unterschrift zeichnet sich glyphenweise
  (Kontur-Strich + Füllung, Dauer ∝ Pfadlänge), FLIP-Übergabe zur Nav-Position,
  Logo-Striche zeichnen sich, Nav blendet ein, direkt danach Hero-Reveal.
- **Hero:** maskierter Reveal von unten (1,1 s), Sublines mit Versatz. Lupe: pro Buchstabe
  2D-Abstand zum Zeiger (y × 0,6 gewichtet), Radius 220 px, smoothstep-Falloff,
  Lerp 0.2/Frame auf `font-variation-settings`. Idle-Welle alle 3,5 s (1,6 s Durchlauf,
  Cosinus-Easing), pausiert bei echtem Hover; Touch erhält nur die Welle.
- **Porträt:** sticky; Parallax ±6 % svh (≈ −12 % über die Sichtspanne); Kobalt-Strich
  (1,5 px) zeichnet sich über den Einfahr-Fortschritt; Pills gestaggert (80 ms).
- **Statement:** 320 vh Strecke, Inhalt sticky. Wortweise Füllung 0.28 → 1 über
  Scroll-Fenster p 0.06–0.66 (pro Wort ±1 Überlappung). Kobalt-Linie zeichnet sich
  p 0.5–0.92 und ragt unten in die Treppenkante/Leistungen. Vier Objekte:
  24 s/Umdrehung (Sinus-Pendel ±24° statt Vollrotation, bleibt lesbar), ±6° Zeiger-
  Reaktion (Lerp 0.04), leichtes Floaten.
- **Leistungen:** Pin über 200 vh (Wrapper 300 vh), aktiver Eintrag = floor(p × 3),
  kein Snap; Beschreibung via grid-template-rows 0fr→1fr (550 ms); Medien-Crossfade
  500 ms; Hover/Fokus übersteuert den Scroll-Zustand.
- **Projekte:** Vorschaubild folgt mit Lerp 0.14 (+210 px Versatz, Rotation ∝ vx, max ±6°),
  Cursor-Pill mit Lerp 0.26 direkt am Zeiger; Pfeil +6 px; Zeile → paper-2.
- **Ablauf:** Spalten gestaggert, Nummern zählen 00→NN (520 ms, 90 ms Versatz).
- **Footer-Sequenz** über transition-delays nach IO: Kante/Pixel-Porträt 0 ms →
  BG-Wortmarke 150 ms → Frage 320 ms → Intro 440 ms → Formular 580 ms → Credits 850 ms.
- **Navigation:** ab 120 px beim Runterscrollen raus (350 ms), beim Hochscrollen rein;
  Theme-Invertierung je Sektion (Wechselpunkt: Mitte der jeweiligen Treppenkante).
- Bewusst KEINE Reduced-Motion-Variante (Vorgabe Briefing).

## Design-Intent für die Umsetzung (Runde 2 / Claude Code)

- **Lenis + GSAP/ScrollTrigger** ersetzen den rAF-Lerp: Scrub 0,5–1 für Statement-Füllung,
  Kobalt-Linien, Leistungs-Pin; Porträt-Stacking als pin/pinSpacing-Setup.
- **Statement-Objekte:** echte flache 3D-Rotation (durchlaufend 24 s) statt Sinus-Pendel,
  wenn die Zeichnungen als beidseitige Flächen aufgebaut werden.
- **Footer-Pixel-Porträt:** Partikel-Aufbau (Pixel fliegen ein) statt Canvas-Standbild;
  der Canvas-Downsample aus dem Prototyp liefert die Zielfarben.
- **Formular:** echter Endpoint (z. B. Supabase Edge Function / Resend). Zustände und
  Texte sind fertig: Erfolg „Danke – Ihre Nachricht ist angekommen. Ich melde mich.“ /
  Fehler „Das hat nicht geklappt. Schreiben Sie mir direkt an [E-Mail-Adresse].“
- **Preloader:** echte SVG-Unterschrift (Einstrich-Pfad) ersetzt die Mr-Dafoe-Pfade;
  `buildSignature()`/`writeSignature()` erwarten dann einen einzelnen Pfad mit
  `stroke-dashoffset` (Struktur in js/signature-data.js dokumentiert).
- **Smooth-Anchor-Scroll** aktuell nativ (`scroll-behavior: smooth`), später über Lenis.
- Mobile (ab 390 px), Unterseiten (`/projekte/bucan-eventservice`, `/impressum`,
  `/datenschutz`) und Motion-Feinschliff: Runde 2. Navigation verlinkt die Ziele bereits.

## Bekannte Punkte / Annahmen (Kurzfassung – Details in der Abgabe-Nachricht)

- Hero-Wortmarke erreicht mit der Token-Skala `clamp(5rem, 18vw, 17rem)` bei 1440 px
  ca. 62 % der Inhaltsbreite, nicht die genannten ~80 % – Token wurde nicht angetastet.
- `--ink-3` auf `--paper` liegt bei ≈ 3,2:1 – für 13-px-Eyebrows unter AA-Fließtext-Niveau.
- Porträtfoto lag nicht im Projektordner; alle drei Verwendungen laufen über
  dokumentierte Platzhalter mit automatischem Umschalten, sobald die Datei da ist.
