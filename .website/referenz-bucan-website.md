# Projektdokumentation: bucan-eventservice.de

Website der **Bucan GmbH** – Premium Catering & Eventservice, Günzburg.
Konzept, Design & Umsetzung: **webdiv** · Stand: August 2026 (aktualisiert nach Livegang)

> Referenzdokument für das webdiv-Website-Projekt: Quelle für die Case Study
> `/projekte/bucan-eventservice` (Runde 2) und für übertragbare Entscheidungen
> (Hosting, Formular-Architektur, DSGVO, Deployment, gelernte Prinzipien).

---

## 1. Überblick

- One-Pager (`/`) plus `/impressum`, `/datenschutz` und gestaltete 404-Seite
- Ziele: Vertrauen aufbauen, Event-Anfragen erzeugen; zugleich Referenzprojekt für webdiv
- Live: `https://bucan-eventservice.de` · Hosting: Strato Hosting Starter (Vertrag läuft auf die Kundin)
- Festpreisprojekt. Nach der Abnahme galt Feature-Stopp; weitere Ideen sind als bezahlte v2 geparkt (siehe `todo-bucan-website.md`)

## 2. Stack- und Architektur-Entscheidungen (mit Begründung)

| Entscheidung | Begründung |
|---|---|
| Next.js (App Router, TypeScript) mit `output: 'export'` | Statisches HTML für SEO und Geschwindigkeit; Metadata-API; kein Server nötig |
| Hosting auf Strato statt Vercel | Vercel-Hobby-Plan ist nicht für kommerzielle Projekte gedacht; Strato = deutsches Rechenzentrum, einfache DSGVO-Kette, Vertrag existierte bereits |
| Kein CMS | Kunden ändern erfahrungsgemäß nichts selbst. Inhalte liegen zentral in `src/core/consts/content.ts`; Änderungen = Edit + Push. Stattdessen Pflege-Deal mit der Kundin |
| Kein WordPress/Webflow | Nicht der webdiv-Stack, nicht wartbar, kein Referenzwert, Template-Optik |
| `trailingSlash: true` | Statisches `ordner/index.html`-Routing, das Apache auf Strato sauber ausliefert |
| `images: { unoptimized: true }` | Bei Static Export bringt `next/image` keinen Mehrwert; Bilder werden vorab als WebP in Zielgrößen exportiert und mit festen Maßen eingebunden |
| PHP-Formular-Handler auf demselben Webspace | Kein Drittanbieter (Formspree & Co.), keine US-Dienste, ein Absatz in der Datenschutzerklärung, null laufende Kosten |

## 3. Design-System

- **Farben** (aus der Print-CI der Kundin): `#0E2318` Tannengrün · `#C2A25E` Gold (nur Akzente – nie Fließtext auf hellem Grund, Kontrast) · `#F7F3EA` Creme · Anthrazit für Text
- **Typografie:** Marcellus (Display), Jost (Fließtext), Great Vibes als Akzent-Handschrift an **exakt drei Stellen** – das definierte Signature-Element („goldene Handschrift")
- **Kapitel-Dramaturgie:** Catering erzählt den eleganten Abend (Dunkelgrün, Kerzenlicht), die Symirna-Foods-Section den frischen Tag (Salbei/Olive, Tageslicht). Geschwungene, goldgesäumte Übergänge aus der Print-CI markieren den Kapitelwechsel
- **Motion:** ein orchestrierter Hero-Moment, dezente Scroll-Reveals, Lightbox mit Zoom. Bei `prefers-reduced-motion` bleiben Fades erhalten, nur Bewegungs- und Zoom-Anteile entfallen
- **Browser-Chrome gehört zum Design:** einheitliches `theme-color` `#0E2318` für iOS und Android, `html`-Hintergrund in Tannengrün (Overscroll-Gummiband zeigt Markenfarbe), Burger-Menü-Overlay mit `100dvh`-Höhe plus `safe-area-inset-bottom`, Viewport-Meta mit `viewport-fit=cover`

## 4. Verbindliche Inhalts- und Bildregeln

- **Keine Preise. Nirgends** – auch nicht lesbar auf Fotos
- Keine erfundenen Testimonials; echte Kundenstimmen erst mit Namen in v2
- Symirna Foods wird **neutral** vorgestellt, ohne Firmierungs-Zuordnung zur GmbH; das Cartoon-Maskottchen ist kein Gestaltungselement (auf echten Fotos darf die Beschilderung erscheinen); Kaufland/NEO nur als Text-Ortsangabe (Markenrecht)
- Fotoauswahl: Establishing-Shots mit erkennbarer Beschilderung (Wiedererkennung), keine Aufbau-/Eröffnungsmotive, keine erkennbaren Personen ohne Einverständnis
- Grundsatz aus dem Projekt: **Amtliche und physische Quellen schlagen Entwurfsmaterial.** Firmierung „Bucan GmbH" kam aus der Handelsregister-Mitteilung (nicht aus der Mappe mit „Bucan Group"), die Schreibweise „Symirna" vom echten Standschild (nicht vom Flyer mit „Simirna" – und nicht vom NEO-Facebook-Post mit „Smyrna")

## 5. Rechtliches & DSGVO

- **Impressum nach § 5 DDG:** Firmierung, Geschäftsführerin, Anschrift, Kontakt, Registergericht Amtsgericht Memmingen, HRB 22414; Verantwortliche nach § 18 Abs. 2 MStV; webdiv-Credit als dezente Textzeile. Die USt-IdNr. ist **bewusst weggelassen** (Pflicht nur „soweit vorhanden") und wird bei Erteilung nachgetragen
- **Datenschutzerklärung deckt exakt die technische Realität:** Strato-Hosting inkl. AVV-Satz, Kontaktwege, keine Cookies/Tracker/externen Einbindungen, Betroffenenrechte, Stand-Datum
- **Kontaktformular ohne Pflicht-Einwilligung:** Die Verarbeitung stützt sich auf Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Anfrage). Statt Checkbox steht eine Hinweiszeile mit Link auf die Datenschutzerklärung – eine erzwungene Einwilligung wäre weder freiwillig noch nötig gewesen und widersprach der eigenen Erklärung
- **Kein Cookie-Banner nötig** – das ist Architektur, kein Zufall: keine Tracker, keine Analyse-Tools, keine Consent-pflichtigen Einbindungen, keine Maps-iframes (nur externe Links)
- **Fonts self-hosted** über `next/font` (Google-Fonts-CDN wäre in Deutschland abmahnfähig). Im Build verifiziert: null Requests an `fonts.googleapis.com`/`fonts.gstatic.com`
- **AVV mit Strato** (Art. 28 DSGVO): bei Verträgen ab 18.07.2022 automatisch einbezogen; das PDF wurde aus dem Kundenlogin (Ihre Kundendaten → Auftragsverarbeitung) archiviert

## 6. Sicherheit

- **Zugangsdaten nie im Repository:** `public/kontakt-config.php` ist per `.gitignore` ausgeschlossen (mit `git check-ignore` verifiziert). Im Repo liegt nur die Vorlage `kontakt-config.example.php` (Projekt-Root, wird nicht deployt)
- **CI erzeugt die Config aus dem GitHub Secret** `SMTP_PASSWORD` – inklusive Escaping für den PHP-Single-Quote-String, damit beliebige Passwörter funktionieren
- **`.htaccess`-Sperre:** `<Files "kontakt-config.php"> Require all denied </Files>` – schützt das Passwort selbst für den Fall, dass PHP auf dem Server einmal nicht ausgeführt würde
- **Formular-Handler:** nur POST; serverseitige Validierung (Name, E-Mail, Nachricht); Honeypot-Feld; Ausfülldauer-Check; JSON-Antworten; Erfolg nur bei echtem `{ok:true}` – ein 200er ohne gültiges JSON gilt als Fehler (Bug in der Abnahme gefunden und gefixt). Fallback-Meldung mit Direktkontakten, Eingaben bleiben erhalten
- **Mailversand authentifiziert** über `smtp.strato.de:465` mit dem eigenen Postfach (Zustellbarkeit; kein nacktes `mail()`); `Reply-To` = Adresse der anfragenden Person
- **Least Privilege beim Deploy:** dedizierter SFTP-Benutzer, per Startverzeichnis auf `/website` eingesperrt – kann außerhalb des Docroots nichts anfassen
- **lftp mit `--env-password`** – das Passwort erscheint nie in Prozessliste oder Logs; GitHub maskiert Secrets zusätzlich
- **HTTPS erzwungen** per 301 (Strato-Einstellung „SSL erzwingen"), Zertifikat im Paket enthalten
- Drei getrennte Passwörter im System: Strato-Kundenlogin, Postfach (= SMTP), SFTP-Deploy-Benutzer
- Eskalationsstufe bei Spam (bisher nicht nötig): Cloudflare Turnstile

## 7. Formular-Architektur

1. React-Formular sendet per `fetch` ein POST an `/kontakt.php` (gleiche Origin, kein CORS)
2. `kontakt.php`: Validierung → Spam-Checks → PHPMailer (als Dateien vendored, ohne Composer) → SMTP → Postfach `info@bucan-eventservice.de`
3. JSON-Antwort; UI zeigt Erfolgs-/Fehlerzustand im Seitendesign. Kundin antwortet dank Reply-To direkt aus dem Postfach

## 8. Build & Deployment

**Lokal:** `yarn build` erzeugt `out/` als vollständiges Upload-Artefakt – inklusive `kontakt-config.php`, weil die echte Datei lokal in `public/` liegt (gitignored) und Next alles aus `public/` mitnimmt.

**Automatisch:** `.github/workflows/deploy.yml`
- Trigger: Push auf `master` sowie manuell (`workflow_dispatch`); Concurrency-Gruppe mit `cancel-in-progress`
- Ablauf: Checkout → Node 22 + Yarn-Cache → `yarn install --frozen-lockfile` → Config aus Secret erzeugen → `yarn build` → Sanity-Check (`out/index.html` und `out/kontakt-config.php` müssen existieren) → `lftp` `mirror -R --delete` nach `.` (Chroot = `/website`)
- `--delete` ist bewusst und sicher: Der Server enthält ausschließlich Build-Ergebnisse, die Config wird in jedem Lauf frisch erzeugt. **Konsequenz: Nichts manuell auf den Server legen** – es würde beim nächsten Deploy entfernt (deshalb lief auch die Search-Console-Verifizierung über DNS statt HTML-Datei)
- Secrets (nur Namen, Werte liegen ausschließlich in GitHub Secrets bzw. im Strato-Kundenbereich): `SFTP_HOST`, `SFTP_USER`, `SFTP_PASSWORD`, `SMTP_PASSWORD`
- Kosten: öffentliche Repos unbegrenzt kostenlos; private Repos 2.000 Actions-Minuten/Monat im Free-Plan – ein Deploy braucht ~1–2 Minuten

**Merkregel: `master` = live.** Jeder Push deployt. Experimente laufen auf einem Branch oder einem Preview-Deployment (liefert `noindex` aus), der Merge ist der Release. Nach jedem Deploy mit Formular-Bezug: eine Testanfrage senden.

## 9. Strato-Einrichtung (einmalig erledigt)

- Postfach `info@bucan-eventservice.de` angelegt (zugleich SMTP-Login des Formulars; die Kundin bindet es in ihre Mail-App ein)
- AVV verifiziert und als PDF archiviert
- Domain-Umleitung „Intern" auf das Verzeichnis `/website`
- SSL aktiviert und „SSL erzwingen" (permanente 301-Weiterleitung auf HTTPS)
- Dedizierter SFTP-Benutzer mit Startverzeichnis `/website`
- DNS: TXT-Eintrag `google-site-verification=…` für die Search Console – bestehende TXT-Einträge (z. B. SPF) blieben unangetastet

## 10. SEO

- Metadata-API mit Canonical (`https://bucan-eventservice.de`), Open Graph + Twitter Card, `og-image` 1200×630
- **Title mit Keywords vorn:** „Premium Catering & Eventservice in Günzburg – Bucan GmbH" – bei einer unbekannten Marke sucht niemand den Firmennamen, alle suchen die Leistung
- **Lektorat nach Livegang:** Kern-Keywords in eine sichtbare H2 gehoben („Catering, Feinkost & Eventservice."), Wortdopplungen und Pleonasmen bereinigt – Claim-Echos („Qualität. Frische. Leidenschaft.") blieben als bewusste Markenklammer stehen
- `robots.txt` und `sitemap.xml` als statische Dateien
- **Search Console:** Domain-Property, Verifizierung per DNS-TXT (überlebt jeden Deploy), Sitemap mit vollständiger URL eingereicht, Indexierung der Startseite aktiv beantragt
- JSON-LD `LocalBusiness` **nur für die Bucan GmbH** – bewusst ohne die Symirna-Standorte, konsistent zur neutralen Markendarstellung
- Sämtliche Inhalte stehen im ausgelieferten HTML (kein Lade-Overlay, keine Client-only-Inhalte); lokale Relevanz über die Orts-Nennungen im Text
- Bilder: WebP, feste Maße (kein Layout-Shift), Lazy Loading unterhalb des Folds, deutsche Alt-Texte zentral in `content.ts`

## 11. Betrieb: häufige Aufgaben

| Aufgabe | Vorgehen |
|---|---|
| Text ändern | `content.ts` editieren → Commit → Push auf `master` → Action deployt automatisch |
| Bild tauschen | WebP in Zielgröße erzeugen, Pfad/Maße/Alt-Text in `content.ts` anpassen, pushen |
| Postfach-Passwort geändert | GitHub Secret `SMTP_PASSWORD` aktualisieren **und** lokale `public/kontakt-config.php` anpassen → Deploy → Testanfrage |
| Nach jedem Deploy mit Formular-Bezug | Eine Testanfrage senden und Eingang im Postfach prüfen |
| Neue rechtliche Angaben (z. B. USt-IdNr.) | Impressum in der jeweiligen View ergänzen, pushen – erster Anwendungsfall des Pflege-Deals |

## 12. Offene Punkte & v2

Siehe `todo-bucan-website.md`. Erledigt seit Erstfassung: GitHub-Pages-Staging deaktiviert, Formular-Rechtsgrundlage bereinigt, Mobile-Chrome-Fixes, Lektorats-Durchgang.
Noch offen: USt-IdNr. nachtragen sobald erteilt · Instagram-Link aktivieren, sobald der Account live ist („bald verfügbar"-Hinweis entfernen) · mit der Kundin: Einzugsgebiet „Raum Augsburg" für Description und Hero freigeben, falschen „Smyrna"-Post beim NEO-Marketing korrigieren lassen, Zwei-Satz-Zitat für die webdiv-Referenz einholen · Pflege-Deal fixieren · v2-Kandidaten: Full-Width-Marquee-Galerie (Prompt liegt fertig vor), echte Catering-Fotos statt Stock, Testimonials mit Namen, Logo als SVG.

## 13. Gelernte Prinzipien (für kommende Projekte)

1. **Prompts an KI-Agenten müssen entscheidungsfertig sein** – keine Optionen, keine TODOs, kein „oder". Offene Wahlmöglichkeiten führen zu Rückfragen oder Raterei
2. **Werkzeug-Routing:** Claude Design nur, solange offen ist, *wie* etwas aussehen soll. Steht der Look, geht Verhalten und Umbau direkt an Claude Code – kein Dreiecks-Workflow
3. **Kein Kunden-Review ohne echte Bilder** – Kunden können „hier kommt ein schönes Foto hin" nicht abstrahieren und bewerten sonst das Wireframe
4. **Amtliche und physische Quellen vor Entwurfsmaterial** – Handelsregister und Standschild haben in diesem Projekt viermal Sekundärmaterial korrigiert (Mappe zweimal, Flyer, Partner-Post)
5. **Festpreis heißt Feature-Stopp bei Abnahme** – neue Ideen sterben nicht, sie wandern bepreist in die v2-Liste
6. **Abnahme-Checklisten in den Auftrag schreiben** – die selbst durchzuführende Checkliste hat den einzigen echten Formular-Bug vor dem Go-live gefunden
7. **Die Datenschutzerklärung ist ein technisches Versprechen** – jeder Satz darin („keine Cookies", „Schriften lokal", „AVV besteht") wurde im Build oder auf dem Server verifiziert
8. **Externe Gegen-Checks triagieren** – ein KI-DSGVO-Scan lieferte genau einen validen Punkt (Formular-Checkbox) neben viel bereits Verifiziertem und einem Fehlalarm aus einer Suchlücke. Ohne eigene, dokumentierte Faktenlage hätte der Fehlalarm die Agenda bestimmt
9. **Einwilligung nur, wo keine bessere Rechtsgrundlage trägt** – Art. 6 Abs. 1 lit. b deckt die Anfrage; weniger Pflichtfelder senken zugleich die Formular-Hürde
10. **Browser-Chrome gehört zur Abnahme** – `theme-color`, Overscroll-Hintergrund und der echte iOS-Viewport (`dvh` statt `vh`, Safe-Area) auf beiden Plattformen testen, nicht nur auf einer
