'use client';

import type { CSSProperties } from 'react';
import { SubpageNav } from 'core/components/shell';
import { StepEdge } from 'core/components/transitions';
import { caseStudyErp } from 'core/consts/caseStudyErp';
import { useSmoothScroll } from 'lib/motion/hooks/useSmoothScroll';
import BriefSection from './BriefSection';
import CraftSection from './CraftSection';
import CtaSection from './CtaSection';
import FoundationSection from './FoundationSection';
import IntroSection from './IntroSection';
import QuoteSection from './QuoteSection';
import ScreenSection from './ScreenSection';

/* Case Study ERP fuer die Bauwirtschaft (cnyn, anonymisiert) –
   webdiv-Formensprache als Rahmen, die Produktfarben nur im dunklen
   Fundament-Kapitel (Tokens aus caseStudyErp, hier als CSS-Variablen). */
function ErpBauwirtschaftPage() {
  useSmoothScroll();

  const erpStyle = {
    '--erp-dark': caseStudyErp.farbTokens.dunkel,
    '--erp-sage': caseStudyErp.farbTokens.salbei,
    '--erp-light': caseStudyErp.farbTokens.hell,
  } as CSSProperties;

  return (
    <>
      <SubpageNav />
      <main className="case-erp" style={erpStyle}>
        <IntroSection />
        <ScreenSection />
        <BriefSection />
        <StepEdge from="var(--paper)" to="var(--erp-dark)" />
        <FoundationSection />
        <StepEdge from="var(--erp-dark)" to="var(--paper)" />
        <CraftSection />
        <QuoteSection />
        <StepEdge from="var(--paper)" to="var(--cobalt)" />
        <CtaSection />
      </main>
    </>
  );
}

export default ErpBauwirtschaftPage;
