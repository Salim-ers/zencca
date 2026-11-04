"use client";
/**
 * Signal « la page est révélée » : fin de l'intro au premier chargement,
 * ou fin du masque de transition lors d'une navigation.
 * Les animations d'entrée s'y abonnent pour rester synchronisées.
 */
type Fn = () => void;
let revealed = false;
const listeners = new Set<Fn>();

export function markRevealed() {
  revealed = true;
  listeners.forEach((fn) => fn());
  listeners.clear();
}
export function markCovered() {
  revealed = false;
}
export function isRevealed() {
  return revealed;
}
/** Appelle `fn` dès que la page est visible (immédiatement si déjà le cas). */
export function onReveal(fn: Fn): () => void {
  if (revealed) {
    const id = requestAnimationFrame(fn);
    return () => cancelAnimationFrame(id);
  }
  listeners.add(fn);
  return () => listeners.delete(fn);
}
