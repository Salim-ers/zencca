import type { Metadata } from "next";
import { SITE_URL, hours, site } from "@/data/site";

export function pageMeta({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const og = image ?? "/og/zencca-facade.jpg";
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: "Zencca",
      locale: "fr_FR",
      type: "website",
      images: [{ url: og, width: 1200, height: 630, alt: "Zencca, salon de thé rue Tiquetonne à Paris" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [og] },
  };
}

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "@id": `${SITE_URL}/#zencca`,
    name: "Zencca",
    alternateName: ["Zencca Tiquetonne", "甄茶"],
    description: site.description,
    url: SITE_URL,
    image: [`${SITE_URL}/og/zencca-facade.jpg`],
    logo: `${SITE_URL}/icon.png`,
    servesCuisine: ["Salon de thé", "Bubble tea", "Matcha"],
    hasMenu: `${SITE_URL}/la-carte`,
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
