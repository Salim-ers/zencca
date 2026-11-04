import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE_URL, site } from "@/data/site";
import { localBusinessJsonLd } from "@/lib/seo";
import Shell from "@/components/layout/Shell";
import { InlineScript } from "@/components/layout/InlineScript";

const fraunces = localFont({
  src: [
    { path: "../fonts/fraunces-latin-full-normal.woff2", style: "normal", weight: "100 900" },
    { path: "../fonts/fraunces-latin-full-italic.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--font-fraunces",
  display: "swap",
  preload: true,
  fallback: ["Georgia", "serif"],
});
const figtree = localFont({
  src: [{ path: "../fonts/figtree-latin-wght-normal.woff2", style: "normal", weight: "300 900" }],
  variable: "--font-figtree",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
const notoSc = localFont({
  src: [{ path: "../fonts/noto-serif-sc-zencca.woff2", weight: "500" }],
  variable: "--font-noto-sc",
  display: "swap",
  preload: false,
  fallback: ["Songti SC", "serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Zencca — Salon de thé, matcha & bubble tea, rue Tiquetonne, Paris 2e",
    template: "%s — Zencca, salon de thé Paris 2e",
  },
  description: site.description,
  applicationName: "Zencca",
  keywords: ["Zencca", "salon de thé Paris 2", "bubble tea Paris 2", "matcha Paris 2", "rue Tiquetonne", "Châtelet", "Étienne Marcel"],
  formatDetection: { telephone: false },
  robots: { index: true, follow: true },
  // verification: { google: "À_COMPLÉTER_DEPUIS_SEARCH_CONSOLE" },
};

export const viewport: Viewport = {
  themeColor: "#f8ebd3",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('reduced');if(sessionStorage.getItem('zencca:intro'))d.classList.add('intro-seen')}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${figtree.variable} ${notoSc.variable}`} suppressHydrationWarning>
      <head>
        <InlineScript html={bootScript} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="flex min-h-dvh flex-col antialiased">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
