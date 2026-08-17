'use client';

import { useRef } from 'react';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { notFound } from 'core/consts/content';
import { useRevealChildren } from 'lib/motion/hooks/useRevealChildren';

/* 404-Inhalt: mono-Code als Eyebrow, grosse Zeile, Rueckweg zur Startseite –
   vertikal zentriert, Reveals wie auf der Case Study. */
function NotFoundSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useRevealChildren(sectionRef);

  return (
    <section className="notfound" data-theme="light" data-rails ref={sectionRef}>
      <div className="container">
        <p className="eyebrow" data-reveal>
          {notFound.code}
        </p>
        <h1 className="notfound-title" data-reveal style={{ '--ri': 1 } as CSSProperties}>
          {notFound.titel}
        </h1>
        <p className="notfound-text" data-reveal style={{ '--ri': 2 } as CSSProperties}>
          {notFound.text}
        </p>
        <p className="notfound-cta" data-reveal style={{ '--ri': 3 } as CSSProperties}>
          <Link className="btn btn-primary" href={notFound.cta.href}>
            {notFound.cta.label}
            <span className="btn-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </p>
      </div>
    </section>
  );
}

export default NotFoundSection;
