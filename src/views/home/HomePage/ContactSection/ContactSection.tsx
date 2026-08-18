'use client';

import { Fragment, useRef } from 'react';
import { footer, kontakt, marke } from 'core/consts/content';
import { useInViewOnce } from 'lib/motion/hooks/useInViewOnce';
import { InstagramIcon, LinkedInIcon, MailIcon } from 'lib/primitives/components';
import FormArea from './FormArea';

const socialIcons = {
  mail: MailIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
} as const;

/* Kobalt-Kapitel: Sequenz ueber CSS-transition-delays nach dem Eintritt
   (Frage -> Intro -> Formular -> Band -> Credits). */
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
      <div className="container contact-grid">
        <div className="contact-intro">
          <h2 className="display2">{kontakt.titel}</h2>
          <p>{kontakt.text}</p>
        </div>
        <FormArea />
      </div>

      <div className="contact-band">
        <div className="container">
          <div className="cb-brand">
            <span className="wordmark">{marke.wortmarke}</span>
            <span className="cb-line">{footer.adresse}</span>
          </div>
          <div className="cb-icons">
            {footer.soziale.map((eintrag) => {
              const Icon = socialIcons[eintrag.id];
              return (
                <a key={eintrag.id} className="icon-btn" href={eintrag.href} aria-label={eintrag.label}>
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
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
