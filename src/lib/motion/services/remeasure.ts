/* Publish/Subscribe fuer "Layout hat sich geaendert – bitte neu messen"
   (z. B. nach Aenderung von CSS-Variablen, die Hoehen verschieben). */

const listeners = new Set<() => void>();

export function onRemeasure(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function requestRemeasure() {
  listeners.forEach((listener) => listener());
}
