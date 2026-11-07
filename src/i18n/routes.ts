/**
 * Langues et adresses du site.
 * Le français est servi à la racine (/la-carte), l'anglais sous /en (/en/menu).
 * Les pages vivent dans app/[lang]/<dossier français> : next.config.ts réécrit
 * les adresses publiques vers ces dossiers. Fichier sans dépendance : il est
 * aussi lu par next.config.ts.
 */
export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";
export const isLocale = (v: unknown): v is Locale => v === "fr" || v === "en";

/** Chaque page : son adresse française (= son dossier) et son adresse anglaise publique. */
export const routes = {
  home: { fr: "/", en: "/en" },
  carte: { fr: "/la-carte", en: "/en/menu" },
  univers: { fr: "/notre-univers", en: "/en/our-world" },
  galerie: { fr: "/galerie", en: "/en/gallery" },
  nouveautes: { fr: "/nouveautes", en: "/en/whats-new" },
  visite: { fr: "/nous-trouver", en: "/en/find-us" },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof routes;
export const routeKeys = Object.keys(routes) as RouteKey[];

const trimSlash = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);

/**
 * Page et langue d'un chemin, qu'il soit public (/la-carte, /en/menu) ou interne
 * (/fr/la-carte, /en/la-carte, tel que vu pendant le rendu serveur) : les deux
 * donnent le même résultat, ce qui évite tout écart à l'hydratation.
 */
export function routeOf(pathname: string | null | undefined): { locale: Locale; key: RouteKey | null } {
  const p = trimSlash(pathname || "/");
  const m = /^\/(fr|en)(?=\/|$)/.exec(p);
  const locale: Locale = m ? (m[1] as Locale) : "fr";
  const rest = m ? p.slice(3) || "/" : p;
  const key = routeKeys.find((k) => routes[k].fr === rest || routes[k][locale] === p) ?? null;
  return { locale, key };
}

/** Adresse publique d'un lien écrit en français (« /la-carte?boisson=x ») dans la langue voulue. */
export function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith("/")) return href;
  const cut = href.search(/[?#]/);
  const path = trimSlash(cut < 0 ? href : href.slice(0, cut));
  const tail = cut < 0 ? "" : href.slice(cut);
  const key = routeKeys.find((k) => routes[k].fr === path);
  if (key) return routes[key][locale] + tail;
  return locale === "fr" ? href : `/en${path === "/" ? "" : path}${tail}`;
}

export const pathFor = (key: RouteKey, locale: Locale) => routes[key][locale];
