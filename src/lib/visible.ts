"use client";

/**
 * Apparition « une seule fois » au défilement, via IntersectionObserver.
 * Contrairement à un ScrollTrigger, l'observateur ne lit pas la mise en page
 * sur le fil principal : créer des dizaines d'apparitions ne coûte rien au
 * chargement, et rien n'est recalculé pendant le défilement.
 */
type Cb = () => void;
const observers = new Map<string, IntersectionObserver>();
const callbacks = new Map<Element, Cb>();

function observerFor(margin: string) {
  let io = observers.get(margin);
  if (!io) {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          // Visible, ou déjà dépassé (page rouverte plus bas, retour arrière, ancre) : on joue
          if (!e.isIntersecting && e.boundingClientRect.bottom >= 0) continue;
          const cb = callbacks.get(e.target);
          obs.unobserve(e.target);
          callbacks.delete(e.target);
          cb?.();
        }
      },
      { rootMargin: margin }
    );
    observers.set(margin, obs);
    io = obs;
  }
  return io;
}

/**
 * Appelle `cb` une fois, quand le haut de l'élément passe au-dessus de la ligne
 * située à `fromBottom` (fraction de la hauteur d'écran) du bas — l'équivalent
 * de `start: "top 88%"` pour 0.12. Renvoie la fonction de nettoyage.
 */
export function onVisible(el: Element | null, cb: Cb, fromBottom = 0.12): () => void {
  if (!el) return () => {};
  const io = observerFor(`0px 0px -${Math.round(fromBottom * 100)}% 0px`);
  callbacks.set(el, cb);
  io.observe(el);
  return () => {
    io.unobserve(el);
    callbacks.delete(el);
  };
}
