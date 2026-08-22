'use client';

import { useEffect, useRef, useState } from 'react';
import { StepEdge } from 'core/components/transitions';
import { useSmoothScroll } from 'lib/motion/hooks/useSmoothScroll';
import { scrollToAnchor } from 'lib/motion/services/smoothScroll';
import AboutSection from './AboutSection';
import ContactSection from './ContactSection';
import FaqSection from './FaqSection';
import HeroSection from './HeroSection';
import PortraitSection from './PortraitSection';
import Preloader from './Preloader';
import ProcessSection from './ProcessSection';
import ProjectsSection from './ProjectsSection';
import ServicesSection from './ServicesSection';
import SiteNav from './SiteNav';
import StatementSection from './StatementSection';

type IntroPhase = 'pending' | 'running' | 'done';

/* Einmal pro Seiten-Load: Bei Client-Navigation innerhalb der Site bleibt das
   Modul geladen – die Rundreise (z. B. Case Study und zurueck) zeigt das
   Unterschrift-Intro nicht erneut. Ein frischer Aufruf von aussen (Full-Load)
   laedt das Modul neu und spielt es wieder. */
let introPlayed = false;

function HomePage() {
  useSmoothScroll();
  const [introPhase, setIntroPhase] = useState<IntroPhase>(introPlayed ? 'done' : 'pending');
  const [navEnter, setNavEnter] = useState(false);
  const [heroRevealed, setHeroRevealed] = useState(introPlayed);
  const navMarkRef = useRef<SVGSVGElement | null>(null);
  const heroSigRef = useRef<HTMLDivElement | null>(null);
  const stackRef = useRef<HTMLDivElement | null>(null);
  const edgeToDarkRef = useRef<HTMLDivElement | null>(null);
  const edgeToPaperRef = useRef<HTMLDivElement | null>(null);
  const faqHeadRef = useRef<HTMLDivElement | null>(null);
  const edgeToCobaltRef = useRef<HTMLDivElement | null>(null);

  /* Preloader bei jedem vollen Aufruf – die Unterschrift gehoert zum Auftritt. */
  useEffect(() => {
    if (introPlayed) return;
    introPlayed = true;
    setIntroPhase('running');
  }, []);

  const navIntro = introPhase === 'running' ? (navEnter ? 'enter' : 'waiting') : 'none';

  return (
    <>
      {introPhase === 'running' && (
        <Preloader
          heroSigRef={heroSigRef}
          onHandoff={() => setNavEnter(true)}
          onReveal={() => setHeroRevealed(true)}
          onDone={() => {
            setIntroPhase('done');
            /* Deeplinks (z. B. /#kontakt): der Load beginnt am Seitenanfang,
               nach dem Intro faehrt die Seite zum Ziel – ausser der Nutzer
               hat waehrend des Intros selbst gescrollt, dann gewinnt er */
            if (window.location.hash && window.scrollY <= 1) {
              scrollToAnchor(window.location.hash);
            }
          }}
        />
      )}
      <SiteNav
        markRef={navMarkRef}
        intro={navIntro}
        themeZones={[
          { ref: edgeToDarkRef, dark: true, kind: 'edge' },
          { ref: edgeToPaperRef, dark: false, kind: 'edge' },
          /* Ab dem FAQ-Chat bis zum Seitenende bleibt die Pille komplett
             ausgeblendet: im Chat ist der klebende Kopf die Kopfzeile, im
             Kobalt-Footer steht der Kontakt selbst (Entscheidung Sinan
             21.08.2026); dark greift nur, falls die Pille beim Uebergang
             kurz sichtbar ist */
          { ref: faqHeadRef, dark: true, kind: 'band', hideNav: true },
          { ref: edgeToCobaltRef, dark: true, kind: 'edge', hideNav: true },
        ]}
      />
      <main id="top">
        <HeroSection revealed={heroRevealed} sigRef={heroSigRef} />
        <StepEdge ref={edgeToDarkRef} from="var(--paper)" to="var(--dark-photo)" dots />
        <div className="stack" ref={stackRef}>
          <PortraitSection stackRef={stackRef} />
          <StatementSection />
        </div>
        <StepEdge from="var(--dark)" to="var(--paper)" />
        <ServicesSection />
        {/* Das dunkle Kapitel (Statement + Leistungen) endet mit derselben
            Treppenkante, mit der es beginnt – die Nav misst ihre Hell-Grenze
            deshalb hier (edgeToPaperRef), nicht an der Kante vor den Services. */}
        <StepEdge ref={edgeToPaperRef} from="var(--dark)" to="var(--paper)" />
        <ProjectsSection />
        <ProcessSection />
        <AboutSection />
        <FaqSection headAnchorRef={faqHeadRef} />
        <StepEdge ref={edgeToCobaltRef} from="var(--paper)" to="var(--cobalt)" />
        <ContactSection />
      </main>
    </>
  );
}

export default HomePage;
