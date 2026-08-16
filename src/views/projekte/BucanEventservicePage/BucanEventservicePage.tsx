'use client';

import type { CSSProperties } from 'react';
import { SubpageNav } from 'core/components/shell';
import { StepEdge } from 'core/components/transitions';
import { caseStudyBucan } from 'core/consts/caseStudyBucan';
import { useSmoothScroll } from 'lib/motion/hooks/useSmoothScroll';
import BriefSection from './BriefSection';
import CraftSection from './CraftSection';
import CtaSection from './CtaSection';
import DesignSection from './DesignSection';
import IntroSection from './IntroSection';
import ScreenSection from './ScreenSection';

/* Case Study bucan-eventservice.de – webdiv-Formensprache als Rahmen,
   die Bucan-Kundenfarben nur im Design-Kapitel (Tokens aus caseStudyBucan,
   hier als CSS-Variablen fuer Flaechen und Treppenkanten gesetzt). */
function BucanEventservicePage() {
  useSmoothScroll();

  const bucanStyle = {
    '--bucan-green': caseStudyBucan.farbTokens.gruen,
    '--bucan-gold': caseStudyBucan.farbTokens.gold,
    '--bucan-cream': caseStudyBucan.farbTokens.creme,
  } as CSSProperties;

  return (
    <>
      <SubpageNav />
      <main className="case-bucan" style={bucanStyle}>
        <IntroSection />
        <ScreenSection />
        <BriefSection />
        <StepEdge from="var(--paper)" to="var(--bucan-green)" />
        <DesignSection />
        <StepEdge from="var(--bucan-green)" to="var(--paper)" />
        <CraftSection />
        <StepEdge from="var(--paper)" to="var(--cobalt)" />
        <CtaSection />
      </main>
    </>
  );
}

export default BucanEventservicePage;
