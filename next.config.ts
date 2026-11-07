import type { NextConfig } from "next";
import { routes } from "./src/i18n/routes";

const pages = Object.values(routes).filter((r) => r.fr !== "/");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920, 2560],
    imageSizes: [96, 160, 240, 320, 400],
    qualities: [75, 85],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  /*
   * Langues : les pages vivent dans app/[lang]/<dossier français>.
   * Le français est servi à la racine (/la-carte → /fr/la-carte),
   * l'anglais sous /en avec ses propres adresses (/en/menu → /en/la-carte).
   */
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [
        ...pages.map((r) => ({ source: r.en, destination: `/en${r.fr}` })),
        { source: "/", destination: "/fr" },
        { source: "/:path((?!en(?:/|$)|fr(?:/|$)|_next/).+)", destination: "/fr/:path" },
      ],
      fallback: [],
    };
  },
  async redirects() {
    return [
      // Une seule adresse par page : /fr/… et /en/<dossier français> renvoient vers l'adresse publique
      { source: "/fr", destination: "/", permanent: true },
      { source: "/fr/:path*", destination: "/:path*", permanent: true },
      ...pages.filter((r) => `/en${r.fr}` !== r.en).map((r) => ({ source: `/en${r.fr}`, destination: r.en, permanent: true })),
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
        ],
      },
      {
        // Textures et visuels de partage : peu modifiés, mis en cache une semaine
        source: "/:dir(textures|og)/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
