/**
 * ─────────────────────────────────────────────────────────────
 *  ZENCCA — informations centralisées
 *  Tout ce qui est marqué `aValider` doit être confirmé par
 *  l'équipe Zencca avant la mise en ligne définitive.
 * ─────────────────────────────────────────────────────────────
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://zencca.vercel.app").replace(/\/$/, "");

export const site = {
  name: "Zencca",
  cjkName: "甄茶",
  tagline: "Une rencontre infusée dans le thé.",
  description:
    "Zencca, salon de thé au 20 rue Tiquetonne, Paris 2e : matcha, bubble teas, thés aux fruits frais, smoothies au yaourt et créations café & coco.",
  address: {
    street: "20 rue Tiquetonne",
    postalCode: "75002",
    city: "Paris",
    country: "France",
    countryCode: "FR",
    district: "Paris 2e",
  },
  /** Coordonnées approximatives (rue Tiquetonne) — à confirmer avec la fiche Google. */
  geo: { lat: 48.86498, lng: 2.34783, aValider: true },
  instagram: {
    handle: "@zencca_",
    url: "https://www.instagram.com/zencca_/",
  },
  /**
   * Site officiel existant (plateforme de compte client).
   * Mettre `enabled: false` pour retirer tous les liens.
   */
  existingSite: {
    enabled: true,
    url: "https://zencca.com/",
    label: "zencca.com",
    aValider: true,
  },
  maps: {
    query: "Zencca, 20 Rue Tiquetonne, 75002 Paris",
    get placeUrl() {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.query)}`;
    },
    get directionsUrl() {
      return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(this.query)}`;
    },
    get appleUrl() {
      return `https://maps.apple.com/?daddr=${encodeURIComponent("20 Rue Tiquetonne, 75002 Paris")}&q=Zencca`;
    },
    get embedUrl() {
      return `https://www.google.com/maps?q=${encodeURIComponent(this.query)}&z=17&output=embed`;
    },
  },
  /**
   * Accès — stations les plus proches de la rue Tiquetonne.
   * À vérifier par l'équipe avant publication.
   */
  access: [
    { label: "Étienne Marcel", lines: "Métro 4" },
    { label: "Sentier", lines: "Métro 3" },
    { label: "Châtelet – Les Halles", lines: "RER A, B, D · Métro 1, 4, 7, 11, 14" },
  ],
  accessAValider: true,
} as const;

/**
 * Horaires — relevés sur la fiche Google « Zencca – Tiquetonne » (capture du 04/11/2026).
 * 0 = dimanche … 6 = samedi. `null` = fermé.
 */
export const hours: { day: number; label: string; open: string | null; close: string | null }[] = [
  { day: 1, label: "Lundi", open: "10:30", close: "19:30" },
  { day: 2, label: "Mardi", open: "10:30", close: "19:30" },
  { day: 3, label: "Mercredi", open: "10:30", close: "19:30" },
  { day: 4, label: "Jeudi", open: "10:30", close: "19:30" },
  { day: 5, label: "Vendredi", open: "10:30", close: "19:30" },
  { day: 6, label: "Samedi", open: "10:30", close: "19:30" },
  { day: 0, label: "Dimanche", open: "12:00", close: "19:30" },
];
export const hoursSource = "Fiche Google, relevé du 04/11/2026 — à confirmer";

/** Affichage des prix : passer à `true` uniquement après validation de la carte officielle. */
export const SHOW_PRICES = false;

/** Afficher les offres en brouillon (aperçu interne) : NEXT_PUBLIC_PREVIEW_DRAFTS=true */
export const PREVIEW_DRAFTS = process.env.NEXT_PUBLIC_PREVIEW_DRAFTS === "true";

export type NavItem = {
  href: string;
  label: string;
  cjk?: string;
  theme: TransitionTheme;
};

export type TransitionTheme = "creme" | "matcha" | "sakura" | "ocre" | "store" | "enseigne";

export const nav: NavItem[] = [
  { href: "/", label: "Accueil", theme: "creme" },
  { href: "/la-carte", label: "La carte", theme: "matcha" },
  { href: "/notre-univers", label: "Notre univers", theme: "ocre" },
  { href: "/galerie", label: "Galerie", theme: "sakura" },
  { href: "/nouveautes", label: "Nouveautés", theme: "enseigne" },
  { href: "/nous-trouver", label: "Nous trouver", theme: "store" },
];

export function themeFor(href: string): TransitionTheme {
  const path = href.split(/[?#]/)[0] || "/";
  return nav.find((n) => n.href === path)?.theme ?? "creme";
}
export function labelFor(href: string): string {
  const path = href.split(/[?#]/)[0] || "/";
  return nav.find((n) => n.href === path)?.label ?? "Zencca";
}
