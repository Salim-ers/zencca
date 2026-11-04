import type { MetadataRoute } from "next";
import { SITE_URL, nav } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return nav.map((n) => ({
    url: `${SITE_URL}${n.href === "/" ? "" : n.href}`,
    lastModified: now,
    changeFrequency: n.href === "/nouveautes" ? "weekly" : "monthly",
    priority: n.href === "/" ? 1 : n.href === "/la-carte" || n.href === "/nous-trouver" ? 0.9 : 0.7,
  }));
}
