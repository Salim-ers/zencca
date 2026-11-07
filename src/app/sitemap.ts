import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";
import { locales, routeKeys, routes } from "@/i18n/routes";
import { alternatesFor } from "@/lib/seo";

/** Chaque page dans chaque langue, avec ses équivalents (hreflang). */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const abs = (p: string) => `${SITE_URL}${p === "/" ? "" : p}`;
  return routeKeys.flatMap((key) => {
    const languages = Object.fromEntries(Object.entries(alternatesFor(key)).map(([l, p]) => [l, abs(p)]));
    return locales.map((locale) => ({
      url: abs(routes[key][locale]),
      lastModified: now,
      changeFrequency: key === "nouveautes" ? ("weekly" as const) : ("monthly" as const),
      priority: key === "home" ? 1 : key === "carte" || key === "visite" ? 0.9 : 0.7,
      alternates: { languages },
    }));
  });
}
