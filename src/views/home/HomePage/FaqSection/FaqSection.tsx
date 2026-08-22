'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import type { CSSProperties, MouseEvent, RefObject } from 'react';
import { faq } from 'core/consts/content';
import { useFrame } from 'lib/motion/hooks/useFrame';
import { useInViewOnce } from 'lib/motion/hooks/useInViewOnce';
import { useRemeasure } from 'lib/motion/hooks/useRemeasure';
import { useRevealChildren } from 'lib/motion/hooks/useRevealChildren';
import { scrollToAnchor } from 'lib/motion/services/smoothScroll';

type FaqSectionProps = {
  /* Messanker an der Flussposition des Chat-Kopf-Bands (Nav-Zone ab hier).
     Bewusst NICHT das Band selbst: das ist sticky – ein Remeasure, waehrend
     es klebt, wuerde die Zonengrenze mitten in den Chat verschieben */
  headAnchorRef: RefObject<HTMLDivElement | null>;
};

/* Antwort-Eintraege sind Absaetze (string) oder eine getippte Aufzaehlung
   ({ liste }) – wie eine Liste in einer Chat-Nachricht */
type AntwortTeil = string | { readonly liste: readonly string[] };

/* Genau eine Kobalt-Stelle pro Antwort (faq.paare[].akzent, muss woertlich
   im Absatz stehen) */
function renderAntwortAbsatz(absatz: string, akzent: string) {
  const start = absatz.indexOf(akzent);
  if (start === -1) return absatz;
  return (
    <>
      {absatz.slice(0, start)}
      <span className="faq-accent">{akzent}</span>
      {absatz.slice(start + akzent.length)}
    </>
  );
}

/* Chat-Fenster: Bubbles erscheinen einzeln beim Scrollen ([data-reveal]),
   die Antwort folgt der Frage mit einem Stagger-Schritt (--ri). Perspektive
   des Besuchers: die eigene Frage rechts ohne Tail, Sinans dunkle Antwort
   kommt links als Gegenueber-Bubble mit Tail (ohne Absender-Label).
   Kopf und Composer kleben beim Scrollen oben/unten (Chat-App-Effekt),
   im Composer tippen sich Beispiel-Fragen ein (Tipp-Geist). Der Composer
   erscheint erst, wenn der Kopf oben andockt (die Sektion fuellt dann den
   Viewport) – vorher wuerde sticky ihn schon beim Sektionseintritt ueber
   der Ueberschrift zeigen. Der Kopf verabschiedet sich nach oben, sobald
   der Composer am Chat-Ende in seine Flussposition einparkt – sonst
   klebte er bis zum Seitenende ueber dem Kobalt-Footer. */
function FaqSection({ headAnchorRef }: FaqSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const ghostRef = useRef<HTMLSpanElement | null>(null);
  const endAnchorRef = useRef<HTMLDivElement | null>(null);
  const dockYRef = useRef(Number.POSITIVE_INFINITY);
  const endYRef = useRef(Number.POSITIVE_INFINITY);
  const [composerIn, setComposerIn] = useState(false);
  const [headOut, setHeadOut] = useState(false);
  const inView = useInViewOnce(sectionRef, 0.1);
  useRevealChildren(sectionRef);

  /* Beide Schwellen an 0-Hoehen-Fluss-Ankern gemessen (wie die Nav-Zone –
     die Baender selbst sind sticky und messen sich beim Kleben falsch):
     der Kopf dockt an, sobald sein Anker die Viewport-Oberkante erreicht;
     er verabschiedet sich, sobald die Fluss-Unterkante des Composer-Bands
     (End-Anker) die Viewport-Unterkante erreicht – der Moment, in dem der
     Composer einparkt und das Chat-Fenster seine untere Klammer verliert */
  useRemeasure(() => {
    const anchor = headAnchorRef.current;
    if (anchor) dockYRef.current = anchor.getBoundingClientRect().top + window.scrollY;
    const endAnchor = endAnchorRef.current;
    if (endAnchor) endYRef.current = endAnchor.getBoundingClientRect().top + window.scrollY;
  });
  useFrame(({ scrollY, vh }) => {
    setComposerIn(scrollY >= dockYRef.current);
    setHeadOut(scrollY + vh >= endYRef.current);
  });

  /* Tipp-Geist: startet erst, wenn die Sektion im Bild ist; tippt die
     Beispiel-Fragen zeichenweise, loescht schneller wieder und wechselt
     zur naechsten (direkt am DOM – ein Re-Render pro Zeichen lohnt nicht) */
  useEffect(() => {
    if (!inView) return undefined;
    const ghost = ghostRef.current;
    if (!ghost) return undefined;
    let index = 0;
    let pos = 0;
    let deleting = false;
    let timer = 0;
    const tick = () => {
      const frage = faq.composer.beispiele[index];
      if (!deleting) {
        pos += 1;
        ghost.textContent = frage.slice(0, pos);
        if (pos >= frage.length) {
          deleting = true;
          timer = window.setTimeout(tick, 2400);
        } else {
          timer = window.setTimeout(tick, 55 + Math.random() * 60);
        }
        return;
      }
      pos = Math.max(0, pos - 2);
      ghost.textContent = frage.slice(0, pos);
      if (pos === 0) {
        deleting = false;
        index = (index + 1) % faq.composer.beispiele.length;
      }
      timer = window.setTimeout(tick, 24);
    };
    timer = window.setTimeout(tick, 600);
    return () => window.clearTimeout(timer);
  }, [inView]);

  const handleComposerClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToAnchor(faq.composer.href);
  };

  return (
    <section className={`faq${inView ? ' in' : ''}`} id="faq" data-rails ref={sectionRef}>
      <div className="container">
        <p className="eyebrow" data-reveal>
          {faq.eyebrow}
        </p>
        <h2 className="h2" data-reveal style={{ '--ri': 1 } as CSSProperties}>
          {faq.titel}
        </h2>
      </div>
      <div ref={headAnchorRef} aria-hidden="true" />
      {/* 'in' rendert React hier selbst (aus inView): der Reveal-Hook setzt
          Klassen am DOM, und Reacts className-Writes beim out-Toggle wuerden
          sie verwerfen – der Kopf bliebe nach dem ersten Abgang unsichtbar */}
      <div className={`faq-band-head${inView ? ' in' : ''}${headOut ? ' out' : ''}`} data-reveal>
        <div className="container">
          <header className="faq-head">
            <span className="faq-avatar wordmark" aria-hidden="true">
              {faq.chat.avatar}
            </span>
            <div>
              <p className="faq-name">{faq.chat.name}</p>
              <p className="faq-status">{faq.chat.status}</p>
            </div>
          </header>
        </div>
      </div>
      <div className="faq-band-log bg-doodle">
        <div className="container">
          <div className="faq-log">
            {faq.paare.map((paar) => (
              <Fragment key={paar.chip}>
                <p className="faq-chip" data-reveal>
                  {paar.chip}
                </p>
                <div className="faq-msg faq-msg-q" data-reveal>
                  <p>{paar.frage}</p>
                </div>
                <div className="faq-msg faq-msg-a" data-reveal style={{ '--ri': 1 } as CSSProperties}>
                  {/* Tail buendig aus der Oberkante der Antwort-Bubble */}
                  <svg className="faq-tail" viewBox="0 0 12 14" aria-hidden="true">
                    <path className="faq-tail-fill" d="M12 0 L0.7 0 C0.25 0.3 0.15 0.85 0.45 1.35 C2.7 5.6 6.9 10.2 12 14 Z" />
                  </svg>
                  {/* Die Tupel der drei Paare weiten sich hier zum gemeinsamen
                      Array-Typ – .map auf der Tupel-Union waere nicht aufrufbar */}
                  {(paar.antwort as readonly AntwortTeil[]).map((teil) =>
                    typeof teil === 'string' ? (
                      <p key={teil}>{renderAntwortAbsatz(teil, paar.akzent)}</p>
                    ) : (
                      <ul key={teil.liste[0]}>
                        {teil.liste.map((punkt) => (
                          <li key={punkt}>{renderAntwortAbsatz(punkt, paar.akzent)}</li>
                        ))}
                      </ul>
                    ),
                  )}
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className={`faq-band-composer${composerIn ? ' in' : ''}`}>
        <div className="container">
          <a
            className="faq-composer"
            href={faq.composer.href}
            aria-label={faq.composer.sendenLabel}
            onClick={handleComposerClick}
          >
            {/* Tipp-Geist ist Dekor – Screenreader bekommen das aria-label */}
            <span className="faq-ghost" aria-hidden="true">
              <span className="faq-ghost-text" ref={ghostRef} />
            </span>
            <span className="faq-send" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      {/* End-Anker: Fluss-Unterkante des Composer-Bands (sticky verschiebt
          nachfolgende Flusspositionen nicht) */}
      <div ref={endAnchorRef} aria-hidden="true" />
    </section>
  );
}

export default FaqSection;
