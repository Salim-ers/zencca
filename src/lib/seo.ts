import type { Metadata } from "next";
import { SITE_URL, hours, site } from "@/data/site";
import { getDict } from "@/i18n/dictionaries";
import { isLocale, locales, routes, type Locale, type RouteKey } from "@/i18n/routes";

/** Langue de la page depuis le segment [lang] (toujours fr ou en grâce aux réécritures). */
export const localeParam = async (params: Promise<{ lang: string }>): Promise<Locale> => {
  const { lang } = await params;
  return isLocale(lang) ? lang : "fr";
};

/** Adresses de la page dans chaque langue, pour hreflang et le sitemap. */
export function alternatesFor(key: RouteKey) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = routes[key][l];
  languages["x-default"] = routes[key].fr;
  return languages;
}

export function pageMeta({
  locale,
  page,
  image,
  absoluteTitle,
}: {
  locale: Locale;
  page: RouteKey;
  image?: string;
  absoluteTitle?: boolean;
}): Metadata {
  const t = getDict(locale).meta;
  const { title, description } = t.pages[page];
  const path = routes[page][locale];
  const og = image ?? "/og/zencca-facade.jpg";
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path, languages: alternatesFor(page) },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${path}`,
      siteName: "Zencca",
      locale: t.ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => getDict(l).meta.ogLocale),
      type: "website",
      images: [{ url: og, width: 1200, height: 630, alt: t.ogAlt }],
    },
    twitter: { card: "summary_large_image", title, description, images: [og] },
  };
}

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function localBusinessJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "@id": `${SITE_URL}/#zencca`,
    name: "Zencca",
    alternateName: ["Zencca Tiquetonne", "甄茶"],
    description: site.description[locale],
    url: `${SITE_URL}${routes.home[locale]}`,
    image: [`${SITE_URL}/og/zencca-facade.jpg`],
    logo: `${SITE_URL}/icon.png`,
    servesCuisine: locale === "fr" ? ["Salon de thé", "Bubble tea", "Matcha"] : ["Tea house", "Bubble tea", "Matcha"],
    hasMenu: `${SITE_URL}${routes.carte[locale]}`,
    knowsLanguage: ["fr", "en"],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: "Île-de-France",
      addressCountry: site.address.countryCode,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    openingHoursSpecification: hours
      .filter((h) => h.open && h.close)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${dayNames[h.day]}`,
        opens: h.open,
        closes: h.close,
      })),
    sameAs: [site.instagram.url, ...(site.existingSite.enabled ? [site.existingSite.url] : [])],
  };
}
