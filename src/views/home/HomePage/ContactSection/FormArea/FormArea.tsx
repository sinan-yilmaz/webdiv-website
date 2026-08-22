'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import Link from 'next/link';
import { kontakt } from 'core/consts/content';

type FieldName = 'name' | 'email' | 'message';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Prototyp-Verhalten ohne Backend: Validierung beim Absenden, danach
   Erfolgszustand. Echter Endpoint (z. B. Supabase Edge Function) folgt in
   Runde 2 – Zustaende und Texte stehen bereits (siehe .website/HANDOFF.md). */
function FormArea() {
  const [errors, setErrors] = useState({ name: false, email: false, message: false });
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const next = {
      name: !name,
      email: !email || !EMAIL_PATTERN.test(email),
      message: !message,
    };
    setErrors(next);
    if (next.name || next.email || next.message) return;
    setSent(true);
  };

  const handleInput = (field: FieldName) =>
    setErrors((prev) => (prev[field] ? { ...prev, [field]: false } : prev));

  return (
    <div className="contact-form-wrap">
      <form className={`contact-form${sent ? ' sent' : ''}`} noValidate onSubmit={handleSubmit}>
        <div className={`field${errors.name ? ' has-error' : ''}`}>
          <label htmlFor="fName">{kontakt.formular.name.label}</label>
          <input
            type="text"
            id="fName"
            name="name"
            autoComplete="name"
            required
            onInput={() => handleInput('name')}
          />
          <span className="field-error">{kontakt.formular.name.fehler}</span>
        </div>
        <div className={`field${errors.email ? ' has-error' : ''}`}>
          <label htmlFor="fMail">{kontakt.formular.email.label}</label>
          <input
            type="email"
            id="fMail"
            name="email"
            autoComplete="email"
            required
            onInput={() => handleInput('email')}
          />
          <span className="field-error">{kontakt.formular.email.fehler}</span>
        </div>
        <div className={`field${errors.message ? ' has-error' : ''}`}>
          <label htmlFor="fMsg">{kontakt.formular.nachricht.label}</label>
          <textarea
            id="fMsg"
            name="message"
            rows={4}
            required
            onInput={() => handleInput('message')}
          />
          <span className="field-error">{kontakt.formular.nachricht.fehler}</span>
        </div>
        <button className="btn btn-invert" type="submit" disabled={sent}>
          {kontakt.formular.absenden}
          <span className="btn-arrow" aria-hidden="true">
            →
          </span>
        </button>
        <p className="form-hint">
          {kontakt.formular.hinweis.vor}
          <Link href={kontakt.formular.hinweis.href}>{kontakt.formular.hinweis.linkLabel}</Link>
          {kontakt.formular.hinweis.nach}
        </p>
        <p className="form-message ok" role="status">
          {kontakt.formular.erfolg}
        </p>
        <p className="form-message err" role="alert">
          {kontakt.formular.fehlerServer}
        </p>
      </form>
    </div>
  );
}

export default FormArea;
