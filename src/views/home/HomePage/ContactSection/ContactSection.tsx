'use client';

import { Fragment, useRef } from 'react';
import { footer, kontakt, marke } from 'core/consts/content';
import { useInViewOnce } from 'lib/motion/hooks/useInViewOnce';
import FormArea from './FormArea';
import PixelPortraitArea from './PixelPortraitArea';

/* Kobalt-Kapitel: Sequenz ueber CSS-transition-delays nach dem Eintritt
   (Kante/Pixel-Portraet -> BG-Wortmarke -> Frage -> Intro -> Formular -> Credits). */
function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInViewOnce(sectionRef, 0.16);

  return (
    <section
      className={`contact bg-dots-cobalt${inView ? ' in' : ''}`}
      id="kontakt"
      data-theme="cobalt"
      data-rails
      ref={sectionRef}
    >
      <div className="contact-bg-mark wordmark" aria-hidden="true">
        {marke.wortmarke}
      </div>

      <div className="contact-head">
        <PixelPortraitArea />
      </div>

      <div className="container contact-grid">
        <div className="contact-intro">
          <h2 className="display2">{kontakt.titel}</h2>
          <p>{kontakt.text}</p>
        </div>
        <FormArea />
      </div>

      <footer className="contact-footer">
        <div className="container">
          <span className="cf-left">
            {footer.linksPrefix} <b>{footer.linksName}</b>
          </span>
          <span className="cf-mid">
            {footer.copyright}
            {footer.rechtliches.map((link) => (
              <Fragment key={link.href}>
                {' · '}
                <a href={link.href}>{link.label}</a>
              </Fragment>
            ))}
          </span>
          <span className="cf-right">
            {footer.rechtsPrefix} <b>{footer.rechtsName}</b>
          </span>
        </div>
      </footer>
    </section>
  );
}

export default ContactSection;
