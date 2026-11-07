import type { Locale } from "./routes";

/** Texte rédigé dans les deux langues : { fr: "…", en: "…" } */
export type L = Record<Locale, string>;

export const tr = (text: L, locale: Locale) => text[locale];
