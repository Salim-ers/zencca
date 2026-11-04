import type { PhotoKey } from "./images";

/**
 * ─────────────────────────────────────────────────────────────
 *  OFFRES & ÉVÉNEMENTS — modifier uniquement ce fichier.
 *  - `active: false` retire l'offre du site sans toucher au reste.
 *  - `validFrom` / `validUntil` (AAAA-MM-JJ) : l'offre disparaît
 *    automatiquement en dehors de la période (dates incluses).
 *  - `price` : laisser vide si aucun prix n'est confirmé.
 * ─────────────────────────────────────────────────────────────
 */
export type Offer = {
  id: string;
  title: string;
  description: string;
  detail?: string;
  photo?: PhotoKey;
  price?: number;
  validFrom?: string;
  validUntil?: string;
  active: boolean;
  /** Note interne, jamais affichée en production */
  note?: string;
};

export const offers: Offer[] = [
  {
    id: "offre-du-matin",
    title: "L'offre du matin",
    description: "Une boisson 500 ml au choix et un egg tart.",
    detail: "Jusqu'à 13 h.",
    photo: "offreMatin",
    price: 8.9,
    active: false,
    note: "Vue sur un visuel promotionnel. Publier seulement après confirmation de sa validité actuelle.",
  },
];

export function isOfferLive(o: Offer, now = new Date()): boolean {
  if (!o.active) return false;
  const day = now.toISOString().slice(0, 10);
  if (o.validFrom && day < o.validFrom) return false;
  if (o.validUntil && day > o.validUntil) return false;
  return true;
}
