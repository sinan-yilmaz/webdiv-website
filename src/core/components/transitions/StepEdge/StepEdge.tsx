import type { CSSProperties, Ref } from 'react';

type StepEdgeProps = {
  /* Ausgangs- und Zielflaeche als CSS-Farbwert (z. B. "var(--paper)") */
  from: string;
  to: string;
  ref?: Ref<HTMLDivElement>;
};

/* Treppenkante: das eine Uebergangs-Motiv zwischen den Farbflaechen
   (Geometrie und Stufenhoehe in tokens.css, .step-edge). */
function StepEdge({ from, to, ref = undefined }: StepEdgeProps) {
  return (
    <div
      ref={ref}
      className="step-edge"
      style={{ '--edge-from': from, '--edge-to': to } as CSSProperties}
      aria-hidden="true"
    />
  );
}

export default StepEdge;
