import type { CSSProperties } from 'react';
import { LegalPageShell } from 'core/components/shell';
import { anbieter, datenschutz } from 'core/consts/legal';

/* Datenschutzerklaerung nach Art. 13 DSGVO – deckt exakt die technische
   Realitaet der Site ab (statischer Export, keine Cookies, kein Tracking,
   Fonts lokal; Abschnittstexte in core/consts/legal.ts). Solange die E-Mail
   [Platzhalter] ist, steht sie als Text statt als mailto-Link. */
function DatenschutzPage() {
  const emailIstPlatzhalter = anbieter.email.startsWith('[');

  return (
    <LegalPageShell titel={datenschutz.titel} fussLinks={datenschutz.fussLinks}>
      <p data-reveal style={{ '--ri': 2 } as CSSProperties}>
        {datenschutz.intro}
      </p>
      <div data-reveal style={{ '--ri': 3 } as CSSProperties}>
        <h2>{datenschutz.verantwortlichTitel}</h2>
        <p>
          {datenschutz.verantwortlichText}
          <br />
          {anbieter.name}, {anbieter.marke}
          <br />
          {anbieter.strasse}, {anbieter.ort}
          <br />
          E-Mail:{' '}
          {emailIstPlatzhalter ? (
            anbieter.email
          ) : (
            <a href={`mailto:${anbieter.email}`}>{anbieter.email}</a>
          )}
        </p>
      </div>
      {datenschutz.abschnitte.map((abschnitt) => (
        <div key={abschnitt.titel} data-reveal>
          <h2>{abschnitt.titel}</h2>
          <p>{abschnitt.text}</p>
        </div>
      ))}
      <p className="legal-stand mono" data-reveal>
        {datenschutz.stand}
      </p>
    </LegalPageShell>
  );
}

export default DatenschutzPage;
