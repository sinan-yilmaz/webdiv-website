# webdiv – Akquise-Plan (nach Livegang der Website)

Stand: 19.08.2026 · Pläne für die Phase NACH Vervollständigung der Website.
Positionierung als Grundlage: nicht „ich baue Websites", sondern „Lösungen, die mehr
können als gut aussehen" – ein Ansprechpartner von der Skizze bis zum Betrieb.
KI-Tools (Lovable & Co.) bedienen Selbstbauer; webdiv verkauft Verantwortung,
Geschmack und Fertigmachen. Das Billigsegment wird billiger – dort nicht antreten.

## 1. Website-Analyse-Bot

Ursprungsidee: Bot findet veraltete Websites, analysiert sie und bewertet, ob der
Inhaber upgrade-willig wäre.

**Rechtlicher Rahmen (entscheidend):** Unaufgeforderte Werbe-E-Mails sind in
Deutschland auch im B2B ohne (mutmaßliche) Einwilligung unzulässig (§ 7 UWG) –
Massen-Cold-Mails sind Abmahnrisiko und beschädigen die Premium-Positionierung.
Erlaubt: Brief/Post; B2B-Telefonakquise bei mutmaßlichem Interesse.

**Variante A – internes Research-Tool:** Bot crawlt, erkennt veraltete Technik/
Design, priorisiert. Output: ~5 vielversprechendste Kandidaten pro Woche mit
Befund. Ansprache handverlesen und individuell: Brief (macht niemand mehr –
fällt auf), Telefon oder persönlich. Aufhänger nie „Ihre Website ist veraltet"
(Beleidigung des Babys), sondern konkreter Befund + Chance, idealerweise mit
einem Redesign-Screen als Artefakt (siehe Abschnitt 4).

**Variante B – öffentlicher „Website-Check" auf webdiv.de (bevorzugt):** URL
eingeben → Report bekommen. Leads kommen mit Einwilligung von selbst; das Tool
selbst demonstriert die Web-Anwendungs-Kompetenz und wird nebenbei die zweite
Case Study. Löst Rechts- und Positionierungsproblem gleichzeitig.
Messlatte (Hormozi: verschenken, wofür andere Geld nehmen): Der Gratis-Report
soll besser sein als das, was Agenturen als bezahltes Audit für mehrere Hundert
Euro verkaufen. Und bewusst nur eine Hürde: URL eingeben → Report bekommen
(Need-to-Believes, Abschnitt 4).

Kostenfrage geklärt (19.08.2026): kein gemietetes Backend nötig, 0 € laufend
machbar. Architektur: webdiv.de bleibt statisch (`output: 'export'`); Messwerte
liefert die Google-PageSpeed-Insights-API (kostenlos, Google führt Lighthouse
aus); eigene Checks (HTML/Header/Impressum/Fonts/Tracker) über eine einzelne
Serverless-Funktion (CORS-Proxy) auf Cloudflare Workers oder Netlify Free –
deren Free-Tiers erlauben kommerzielle Nutzung, Vercel-Hobby dagegen nicht.
Keine Datenbank, solange Reports live berechnet statt gespeichert werden
(später optional Supabase Free). Rate-Limiting gegen Missbrauch einplanen.
Vor Umsetzung Free-Tier-Konditionen und API-Quota gegen Primärquellen prüfen
(Stand der Angaben: Wissensstand 19.08.2026, nicht tagesaktuell verifiziert).

## 2. Websites verkaufen – Kanäle

- **Empfehlungskaskade:** Bucan aktiv nach 2–3 Intros fragen (Lieferanten,
  Locations, befreundete Unternehmer). Billigste und stärkste Akquise. Nach
  jedem Projekt wiederholen.
- **Physisches Netzwerk:** IHK-Veranstaltungen, Wirtschaftsjunioren,
  Unternehmerstammtische Günzburg/Ulm/Augsburg. In diesem Segment wird
  Vertrauen persönlich vergeben.
- **Branchen-Nischen statt Geografie (Skalierung über die Region hinaus):**
  Mit der Bucan-Case-Study bundesweit Caterer/Eventservices ansprechen –
  Branchen-Referenzen reisen besser als Orts-Referenzen. Ziel: 2–3 Branchen
  mit je einer starken Case Study.
- **Grundrauschen:** Local SEO („Webdesign Günzburg/Ulm" ist gewinnbar,
  generisch „Webdesign" nicht) + Google Business Profile.
- **Nicht am Anfang:** Google Ads (frühestens später auf lokale Keywords, mit
  Referenzen), breites Content-Marketing. AdSense ist ohnehin das falsche
  Produkt (zeigt fremde Werbung auf der eigenen Seite).

## 3. B2B-Anwendungen – werden nicht kalt verkauft, sie entstehen

- **Aus Website-Kunden (Trojanisches Pferd):** Standardfrage in jedem Briefing:
  „Was verwalten Sie heute in Excel oder auf Zetteln?" Die Website öffnet die
  Tür, im Projekt zeigt sich der Prozessbedarf.
- **Über Multiplikatoren:** Steuerberater, Unternehmensberater, IT-Systemhäuser
  und Werbeagenturen ohne eigene Entwickler sitzen täglich in Betrieben und
  sehen Prozessprobleme. 2–3 solcher Partnerbeziehungen > 100 Cold Mails.
- **Partner-Mechanik „100 % statt 20 %" (Hormozi):** Provisionsmodelle ändern
  kein Verhalten – kein Steuerberater riskiert Mandantenvertrauen für 20 %
  Anteil. Stattdessen ein abgeschlossenes Teilprodukt herausschälen (z. B.
  „Digital-Audit": Website-Check-Report + Prozessfrage „Was läuft noch über
  Excel/Zettel?", Wert ~500 €, Aufwand 2–3 Std) und dem Partner zu 100 %
  überlassen: Er verkauft es unter eigenem Namen oder legt es seiner Beratung
  bei und behält den Erlös komplett; Mindestpreis vorgeben (filtert
  Schnäppchenjäger). webdiv liefert das Audit ohne Marge und bekommt dafür
  zahlende, vorqualifizierte, warm vorgestellte Kunden – verdient wird am
  Folgeprojekt. Keine Kaltansprache, kein UWG-Thema. Bedingung: Das Teilprodukt
  muss in der Lieferung billig sein (Website-Check als Motor), sonst
  Timebox-Falle wie bei den Pitch-Demos (Abschnitt 4).
- **Ggf. Subunternehmer für Agenturen:** am Anfang für Cashflow und
  App-Referenzen (z. B. freelancermap, Uplink, regionale Agenturen).

## 4. Pitch-Demo: Redesign vorab bauen

Idee: für einen priorisierten Kandidaten vorab ein sauberes Redesign nur der
Startseite bauen (ohne Mail-Logik, 404 etc.) – als Türöffner.

Ja, aber **gestaffelt dosieren**, sonst verbrennt man Wochen an Leads, die nie
antworten:

1. **Stufe 1 (Standard, < 1 Std):** ein statischer Screen/Mockup der neuen
   Startseite – reicht für Brief/Erstkontakt fast immer.
2. **Stufe 2 (bei Reaktion, halber Tag mit KI):** klickbare Startseite als
   unlisted Live-Demo (noindex, nicht verlinkt).
3. **Stufe 3 (erst nach Erstgespräch):** alles Weitere – gehört ins bezahlte
   Projekt, nie in den Pitch.

Wirkprinzip dahinter – **Need-to-Believes minimieren** (Hormozi): Je weniger
ein Kunde glauben muss, bevor er kauft, desto eher kauft er. Der Stufe-1-Screen
ersetzt „glauben, dass er es kann" durch „sehen, dass es besser aussieht".
Als Prüffrage für jeden Pitch und jedes Angebot: Wie viele Überzeugungs-Hürden
stecken drin, und welche lassen sich durch Zeigen statt Behaupten beseitigen?

Regeln: festes Zeitbudget pro Pitch; fremde Fotos/Texte/Logos nur in der
privaten Demo verwenden, nie öffentlich hosten oder bewerben (Urheberrecht);
Demo nach Entscheidung offline nehmen.

**Konkreter Kandidat (19.08.2026): aysenskitchen.com** – Ayşe Şen („Ayşen's
Kitchen®", Ebersbach BW), Food-Creatorin mit laut Sinan über 1 Mio
Instagram-Followern; gewünscht war eine Rezept-Website. Stand 19.08.2026 zeigt
die Domain nur ein Impressum (WordPress; Ex-Dienstleister „Website Stuttgart"/
Mehmet Soysal steht noch drin). Vorgeschichte laut Sinan: an unseriöse Anbieter
geraten, Projekt gescheitert, liegt seitdem brach – Vertrauen ist verbrannt,
Need-to-Believes entsprechend hoch → zeigen statt versprechen. Warmer Intro
über einen Freund Sinans möglich.

Vorgehen: erst webdiv.de live (sie wird googeln), dann Intro mit genau einem
Stufe-1-Screen (Timebox; ihre Fotos nur privat teilen). Ton: Chance statt
Befund, Ex-Dienstleister nicht schlechtreden. Pitch-Winkel: 1 Mio geliehene
Reichweite auf einer fremden Plattform → eigene Rezept-Plattform (Rezept-
Suche/Filter, Recipe-Strukturdaten für Google-Traffic, Newsletter, später
Shop/Kochbuch). Gegenleistung explizit als Dealbestandteil verhandeln
(Namensnennung/„created by webdiv", Testimonial, ggf. Story-Erwähnung –
das ist Geld wert; Muster „Projektwert X, Referenzpreis Y" aus Abschnitt 9),
nicht gratis auf vage Exposure-Hoffnung arbeiten. Nebeneffekt: wäre die zweite
Case Study mit Anwendungs-Charakter (Rezept-Datenbank + Pflege-CMS).

## 5. Zeit-Ökonomie (Beobachtung aus dem eigenen Projekt)

Auch mit KI stecken in der eigenen Seite bereits ~20 Std bei gefühlt 40 %
Fortschritt – der Feinschliff ist der Aufwand. Einordnung: genau dieser
Feinschliff ist das Produkt und der Grund, warum Selbstbau-Tools das Segment
nicht ersetzen. Ein großer Teil der 20 Std ist zudem Einmal-Investition
(Designsystem, Motion-Framework, Blaupausen, Checkliste) – Kundenprojekte
werden mit jedem Projekt schneller. Für die Preisgestaltung heißt das:
Festpreis trägt die Einmal-Investitionen nicht mit, sie sind schon bezahlt.

Zweiter Preis-Hebel: **LTV statt Lead-Kosten** (Hormozi). „Leads sind zu teuer"
ist selten das echte Problem – zu wenig Umsatz pro Kunde ist es; Akquise- und
Werbekosten steigen langfristig nur. Gegenkraft: Wartungs-, Hosting- und
Betreuungsverträge als festen Angebotsbestandteil denken (passt exakt zur
Positionierung „von der Skizze bis zum Betrieb"), nicht nur Projekt-Festpreise.
Wer pro Kunde mehr verdient, kann sich teurere Akquise leisten als jeder
Wettbewerber – das ist der eigentliche Wachstums-Spielraum.

## 6. Potenzielle Referenz: cnyn (contract-copilot-frontend)

„cnyn" – modulares B2B-SaaS/ERP für die Bau-/Immobilienwirtschaft (deutsch,
mandantenfähig, AWS Cognito). Sinan hat das Frontend als Hauptautor gebaut
(201 von ~320 Commits): ~243 eigene Komponenten, TanStack Query + Zod,
Feature-Sliced-Architektur, Dark Mode; Highlight: Standardschreiben-Builder
(DOCX-Upload, Bookmark-Mapping, IF/ELSEIF/ELSE-Logik, Berechnungen, PDF/ZIP).
Aus dem Projekt einvernehmlich ausgestiegen (Reviewer-Rolle abgelehnt).

Wert für webdiv: belegt die Leistungen „Web-Anwendungen" und „Schnittstellen &
Datenbanken" – die fehlende Hälfte neben Bucan (Websites).

Vor Verwendung von Stefan Eitel einholen (keine LICENSE/NDA im Repo – Rechte
formal ungeklärt, Freigabe ist Voraussetzung):
1. Testimonial mit Namensnennung als Auftraggeber
2. Nennung von Produkt/Marke „cnyn" (Fallback: anonym „B2B-SaaS für die Bauwirtschaft")
3. Screenshots – anonymisiert, am besten frisch mit Dummy-Daten; Endkunden
   (Fides Gruppe, Tenant-URLs) nicht zeigen/nennen ohne separate Freigabe

Nebenbei ihm melden: `.env.local` (reale Cognito-IDs, API-URL) ist nicht
gitignored und liegt im Repo-Verlauf.

Einbau: zweiter Eintrag in der Projekte-Sektion (Meta „Web-Anwendung ·
Frontend-Entwicklung", ohne Live-Link, da Login-App); Case Study optional
später mit Fakten-Doku analog `.website/referenz-bucan-website.md`.

## 7. Zertifizierungen & Partnerprogramme

Grundregel: Bei der Kernzielgruppe (Geschäftsführer Mittelstand) schlägt eine
Referenz jedes Zertifikat. Zertifikate wirken indirekt – bei Multiplikatoren,
Systemhäusern, Plattformen und Partnern. Zeit primär in Referenzen, Zertifikate
nur dort, wo sie einen Kanal öffnen.

**Lohnt sich:**
- **AWS-Zertifizierung** (Developer Associate oder Solutions Architect
  Associate): einziges klassisches Zertifikat mit Marktgewicht hier – wirkt bei
  Systemhäusern/Multiplikatoren, größeren Mittelständlern und auf
  Freelancer-Plattformen. Praxisgrundlage durch cnyn (Cognito/Amplify) da.
- **Partnerprogramme mit Verzeichnis-Listing** (Supabase, Vercel): weniger
  Zertifikat als Inbound-Kanal – Agentur-Verzeichnisse leiten echte Anfragen,
  passen exakt zum Stack. Kriterien/Konditionen vor Bewerbung aktuell prüfen.

**Lohnt sich nicht:**
- Framer/Webflow Expert – falsches Ökosystem, widerspricht der
  „kein Baukasten"-Positionierung
- Coursera-/Meta-React-Zertifikate – praktisch gewichtslos; GitHub + Case
  Studies beweisen mehr
- Google-Ads/Analytics-Zertifikate – nur falls Marketing je Leistung wird
- ISO & Co. – Unternehmens-Zertifizierungen, falsche Größenordnung

## 8. Wettbewerb regional (Beobachtung 18.08.2026)

**Webwavers** (webwavers.de) – Einzelunternehmen Edip Kilinc, Marktplatz 31,
Günzburg. Webdesign/UI/UX/Branding/Motion/Shopify + Performance Marketing über
Tochtermarken (nextpercent.de, peakbid.de); German Web Award / German Design
Award; **Webflow Premium Partner + Framer Expert**. Referenzen überregional
(Startups/Marken), kein regionaler Mittelstand erkennbar, keine Preise.

Einordnung: anderes Spielfeld – Design-Agentur auf Plattformen (Webflow/
Framer), keine Individual-Entwicklung, keine Web-Anwendungen/Datenbanken/
Schnittstellen. Zielgruppe „ambitionierte Marken" mit Branding-Budget, Du-Form/
Denglisch – nicht der Bucan-Typ Kunde. Validiert den regionalen Markt (wenn das
in Günzburg trägt, gibt es Nachfrage). Nicht frontal im Segment „schöne
Marken-Website" positionieren, sondern über Anwendungs-/Code-Kompetenz.
Perspektivisch eher Multiplikator-Kandidat (Design-Agentur ohne Devs,
Abschnitt 3) als Bedrohung. Abschauen: Auftritt skaliert Wahrnehmung;
Partnerschaften/Auszeichnungen sichtbar machen.

Deren Multi-Brand-Strategie (Webwavers = Design, nextpercent.de = Shopify/
E-Commerce „gegründet aus der Expertise von Webwavers", peakbid.de = Ads):
pro Marke ein enges Spezialisten-Versprechen + mehrere Suchintentionen
besetzen. Für webdiv NICHT nachmachen – Ein-Mann-Authentizität („der es auch
baut") ist das Gegen-Asset, Multi-Brand wäre Overhead + Verwässerung.
Einzige spätere Ausnahme: ein Produkt (z. B. Website-Check) als eigene Marke.

## 9. Referenz-Pflege: Bucan aufwerten (Timebox 4–6 Std)

Bewusstes Marketing-Investment in die wichtigste Referenz (bezahlt war sie mit
1.500 € / 10–12 Std ≈ 125–150 €/Std – gesunder Satz, aber unter Marktpreis der
Leistung; künftig Listenpreis 3.500–6.000 € für Custom-One-Pager und
Referenz-Rabatte explizit ausweisen: „Projektwert X, Referenzpreis Y").

1. Performance-Audit + Feinschliff, bis Messwerte vorzeigbar sind (PageSpeed,
   Ladezeit, Cookies/Tracker) → liefert zugleich die Belege für den
   „performant + custom"-USP auf webdiv.de (Fakten-Leiste im Technik-Kapitel
   der Case Study; Zahlen statt Adjektive)
2. Screenshots erzeugen (Leistungs-Karte, Projekt-Vorschaubild,
   Case-Study-Browserrahmen – fehlen laut tasklist ohnehin)
3. Optische Upgrades nur, wenn Timebox es hergibt
4. Als Beziehungsanlass nutzen: Update melden → Testimonial, Google-Bewertung
   und 2–3 Intros erbitten (Empfehlungskaskade, Abschnitt 2)

## 10. Reihenfolge

1. Website live bringen (Voraussetzung für alles).
2. Bucan-Empfehlungen einsammeln.
3. Website-Check (Variante B) konzipieren und bauen → zweite Case Study.
4. Eine Branchen-Nische mit der Bucan-Referenz gezielt beackern (Stufe-1-Pitches).
5. Zwei Multiplikatoren-Beziehungen für den Anwendungsteil aufbauen.

Alles andere erst, wenn diese fünf laufen.
