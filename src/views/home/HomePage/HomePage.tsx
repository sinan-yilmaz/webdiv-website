'use client';

import { useEffect, useRef, useState } from 'react';
import { StepEdge } from 'core/components/transitions';
import { useSmoothScroll } from 'lib/motion/hooks/useSmoothScroll';
import { scrollToAnchor } from 'lib/motion/services/smoothScroll';
import AboutSection from './AboutSection';
import ContactSection from './ContactSection';
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
            /* Deeplinks von Unterseiten (z. B. /#kontakt): der Preloader
               erzwingt Position 0, danach faehrt die Seite zum Ziel */
            if (window.location.hash) scrollToAnchor(window.location.hash);
          }}
        />
      )}
      <SiteNav
        markRef={navMarkRef}
        intro={navIntro}
        stepEdgeRefs={[edgeToDarkRef, edgeToPaperRef, edgeToCobaltRef]}
      />
      <main id="top">
        <HeroSection revealed={heroRevealed} sigRef={heroSigRef} />
        <StepEdge ref={edgeToDarkRef} from="var(--paper)" to="var(--dark-photo)" />
        <div className="stack" ref={stackRef}>
          <PortraitSection stackRef={stackRef} />
          <StatementSection />
        </div>
        <StepEdge ref={edgeToPaperRef} from="var(--dark)" to="var(--paper)" />
        <ServicesSection />
        <ProjectsSection />
        <ProcessSection />
        <AboutSection />
        <StepEdge ref={edgeToCobaltRef} from="var(--paper)" to="var(--cobalt)" />
        <ContactSection />
      </main>
    </>
  );
}

export default HomePage;
