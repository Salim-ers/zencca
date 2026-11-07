import type { PhotoKey } from "./images";
import type { L } from "@/i18n/text";

/**
 * ─────────────────────────────────────────────────────────────
 *  OFFRES & ÉVÉNEMENTS — modifier uniquement ce fichier.
 *  - `active: false` retire l'offre du site sans toucher au reste.
 *  - `validFrom` / `validUntil` (AAAA-MM-JJ, heure de Paris) : l'offre
 *    disparaît automatiquement en dehors de la période (dates incluses).
 *  - `price` : laisser vide si aucun prix n'est confirmé.
 *  - Textes en français (fr) et en anglais (en).
 * ─────────────────────────────────────────────────────────────
 */
export type Offer = {
  id: string;
  title: L;
  description: L;
  detail?: L;
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
    title: { fr: "L'offre du matin", en: "The morning deal" },
    description: { fr: "Une boisson 500 ml au choix et un egg tart.", en: "A 500 ml drink of your choice and an egg tart." },
    detail: { fr: "Jusqu'à 13 h.", en: "Until 1 pm." },
    photo: "offreMatin",
    price: 8.9,
    active: false,
    note: "Vue sur un visuel promotionnel. Publier seulement après confirmation de sa validité actuelle.",
  },
];

/** Date du jour à Paris (AAAA-MM-JJ) : une offre commence et finit à minuit, heure de Paris. */
const parisDay = (now: Date) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);

export function isOfferLive(o: Offer, now = new Date()): boolean {
  if (!o.active) return false;
  const day = parisDay(now);
  if (o.validFrom && day < o.validFrom) return false;
  if (o.validUntil && day > o.validUntil) return false;
  return true;
}
