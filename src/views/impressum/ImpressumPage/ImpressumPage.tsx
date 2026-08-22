import type { CSSProperties } from 'react';
import { LegalPageShell } from 'core/components/shell';
import { anbieter, impressum } from 'core/consts/legal';

/* Anbieterkennzeichnung nach § 5 DDG (Einzelunternehmen ohne Registereintrag:
   Name, Anschrift, E-Mail; USt-IdNr./W-IdNr. nur falls vorhanden – siehe
   core/consts/legal.ts). Solange die E-Mail [Platzhalter] ist, steht sie als
   Text; die echte Adresse wird zum mailto-Link. */
function ImpressumPage() {
  const emailIstPlatzhalter = anbieter.email.startsWith('[');

  return (
    <LegalPageShell titel={impressum.titel}>
      <div data-reveal style={{ '--ri': 2 } as CSSProperties}>
        <h2>{impressum.angabenTitel}</h2>
        <p>
          <span className="wordmark legal-brand">{anbieter.marke}</span>
          <br />
          {anbieter.name}
          <br />
          {anbieter.strasse}
          <br />
          {anbieter.ort}
        </p>
      </div>
      <div data-reveal style={{ '--ri': 3 } as CSSProperties}>
        <h2>{impressum.kontaktTitel}</h2>
        <p>
          {impressum.emailLabel}:{' '}
          {emailIstPlatzhalter ? (
            anbieter.email
          ) : (
            <a href={`mailto:${anbieter.email}`}>{anbieter.email}</a>
          )}
        </p>
      </div>
      <div data-reveal style={{ '--ri': 4 } as CSSProperties}>
        <h2>{impressum.verantwortlichTitel}</h2>
        <p>{impressum.verantwortlichText}</p>
      </div>
    </LegalPageShell>
  );
}

export default ImpressumPage;
