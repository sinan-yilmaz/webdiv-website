/* Warten auf geladene Schriften, aber nie laenger als maxWaitMs. */
export function whenFontsReady(maxWaitMs = 1000): Promise<void> {
  const ready =
    typeof document !== 'undefined' && document.fonts
      ? document.fonts.ready.then(() => undefined)
      : Promise.resolve();
  return Promise.race([
    ready,
    new Promise<void>((resolve) => {
      setTimeout(resolve, maxWaitMs);
    }),
  ]);
}
