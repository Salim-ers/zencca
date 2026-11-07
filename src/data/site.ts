/**
 * ─────────────────────────────────────────────────────────────
 *  ZENCCA — informations centralisées
 *  Tout ce qui est marqué `aValider` doit être confirmé par
 *  l'équipe Zencca avant la mise en ligne définitive.
 *  Les textes visibles sont écrits en français (fr) et en anglais (en).
 * ─────────────────────────────────────────────────────────────
 */
import type { L } from "@/i18n/text";
import type { RouteKey } from "@/i18n/routes";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://zencca.vercel.app").replace(/\/$/, "");

export const site = {
  name: "Zencca",
  cjkName: "甄茶",
  description: {
    fr: "Zencca, salon de thé au 20 rue Tiquetonne, Paris 2e : matcha, bubble teas, thés aux fruits frais, smoothies au yaourt et créations café & coco.",
    en: "Zencca, a tea house at 20 rue Tiquetonne, Paris 2nd: matcha, bubble tea, fresh fruit teas, yogurt smoothies and coffee & coconut creations.",
  } satisfies L,
  address: {
    street: "20 rue Tiquetonne",
    postalCode: "75002",
    city: "Paris",
    country: { fr: "France", en: "France" } satisfies L,
    countryCode: "FR",
    district: { fr: "Paris 2e", en: "Paris 2nd" } satisfies L,
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
    embedUrl(locale: "fr" | "en") {
      return `https://www.google.com/maps?q=${encodeURIComponent(this.query)}&z=17&hl=${locale}&output=embed`;
    },
  },
  /**
   * Accès — stations les plus proches de la rue Tiquetonne.
   * À vérifier par l'équipe avant publication.
   */
  access: [
    { label: "Étienne Marcel", lines: { fr: "Métro 4", en: "Metro line 4" } satisfies L },
    { label: "Sentier", lines: { fr: "Métro 3", en: "Metro line 3" } satisfies L },
    {
      label: "Châtelet – Les Halles",
      lines: { fr: "RER A, B, D · Métro 1, 4, 7, 11, 14", en: "RER A, B, D · Metro lines 1, 4, 7, 11, 14" } satisfies L,
    },
  ],
  accessAValider: true,
} as const;

/**
 * Horaires — relevés sur la fiche Google « Zencca – Tiquetonne » (capture du 04/11/2026).
 * 0 = dimanche … 6 = samedi. `null` = fermé.
 */
export const hours: { day: number; label: L; open: string | null; close: string | null }[] = [
  { day: 1, label: { fr: "Lundi", en: "Monday" }, open: "10:30", close: "19:30" },
  { day: 2, label: { fr: "Mardi", en: "Tuesday" }, open: "10:30", close: "19:30" },
  { day: 3, label: { fr: "Mercredi", en: "Wednesday" }, open: "10:30", close: "19:30" },
  { day: 4, label: { fr: "Jeudi", en: "Thursday" }, open: "10:30", close: "19:30" },
  { day: 5, label: { fr: "Vendredi", en: "Friday" }, open: "10:30", close: "19:30" },
  { day: 6, label: { fr: "Samedi", en: "Saturday" }, open: "10:30", close: "19:30" },
  { day: 0, label: { fr: "Dimanche", en: "Sunday" }, open: "12:00", close: "19:30" },
];
export const hoursSource = "Fiche Google, relevé du 04/11/2026 — à confirmer";

/** Affichage des prix, recopiés du menu. Une boisson sans prix lisible n'affiche que ses formats. */
export const SHOW_PRICES = true;

/** Afficher les offres en brouillon (aperçu interne) : NEXT_PUBLIC_PREVIEW_DRAFTS=true */
export const PREVIEW_DRAFTS = process.env.NEXT_PUBLIC_PREVIEW_DRAFTS === "true";

export type TransitionTheme = "creme" | "matcha" | "sakura" | "ocre" | "store" | "enseigne";

export type NavItem = {
  key: RouteKey;
  /** Adresse française ; les liens la traduisent selon la langue de la page */
  href: string;
  label: L;
  theme: TransitionTheme;
};

export const nav: NavItem[] = [
  { key: "home", href: "/", label: { fr: "Accueil", en: "Home" }, theme: "creme" },
  { key: "carte", href: "/la-carte", label: { fr: "La carte", en: "Menu" }, theme: "matcha" },
  { key: "univers", href: "/notre-univers", label: { fr: "Notre univers", en: "Our world" }, theme: "ocre" },
  { key: "galerie", href: "/galerie", label: { fr: "Galerie", en: "Gallery" }, theme: "sakura" },
  { key: "nouveautes", href: "/nouveautes", label: { fr: "Nouveautés", en: "What's new" }, theme: "enseigne" },
  { key: "visite", href: "/nous-trouver", label: { fr: "Nous trouver", en: "Find us" }, theme: "store" },
];

export const navItem = (key: RouteKey | null) => nav.find((n) => n.key === key);
