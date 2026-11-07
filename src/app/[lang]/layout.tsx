import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "../globals.css";
import { SITE_URL, site } from "@/data/site";
import { getDict } from "@/i18n/dictionaries";
import { LocaleProvider } from "@/i18n/client";
import { isLocale, locales } from "@/i18n/routes";
import { localBusinessJsonLd, localeParam } from "@/lib/seo";
import Shell from "@/components/layout/Shell";
import { InlineScript } from "@/components/layout/InlineScript";

const fraunces = localFont({
  src: [{ path: "../../fonts/fraunces-latin-full-normal.woff2", style: "normal", weight: "100 900" }],
  variable: "--font-fraunces",
  display: "swap",
  preload: true,
  fallback: ["Georgia", "serif"],
});
// L'italique ne sert qu'au néon, plus bas dans l'accueil : il ne doit pas concurrencer le premier affichage
const frauncesItalic = localFont({
  src: [{ path: "../../fonts/fraunces-latin-full-italic.woff2", style: "italic", weight: "100 900" }],
  variable: "--font-fraunces-italic",
  display: "swap",
  preload: false,
  fallback: ["Georgia", "serif"],
});
const figtree = localFont({
  src: [{ path: "../../fonts/figtree-latin-wght-normal.woff2", style: "normal", weight: "300 900" }],
  variable: "--font-figtree",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
const notoSc = localFont({
  src: [{ path: "../../fonts/noto-serif-sc-zencca.woff2", weight: "500" }],
  variable: "--font-noto-sc",
  display: "swap",
  preload: false,
  fallback: ["Songti SC", "serif"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = await localeParam(params);
  const t = getDict(locale).meta;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.siteTitle, template: t.titleTemplate },
    description: site.description[locale],
    applicationName: "Zencca",
    keywords: t.keywords,
    formatDetection: { telephone: false },
    robots: { index: true, follow: true },
    // verification: { google: "À_COMPLÉTER_DEPUIS_SEARCH_CONSOLE" },
  };
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/*
 * Avant la première peinture : classes de préférence (mouvement réduit, mode allégé, intro déjà vue)
 * et garde-fou — si le JavaScript n'a pas pris la main au bout de 6 s, l'écran d'intro s'efface
 * (voir globals.css) au lieu de rester affiché.
 */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var n=navigator,c=n.connection;if(matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('reduced');if((c&&c.saveData)||(n.deviceMemory&&n.deviceMemory<=2)||(n.hardwareConcurrency&&n.hardwareConcurrency<=2))d.classList.add('lite');if(sessionStorage.getItem('zencca:intro'))d.classList.add('intro-seen')}catch(e){}setTimeout(function(){d.classList.add('intro-done')},6000)})();`;

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html
      lang={lang}
      className={`${fraunces.variable} ${frauncesItalic.variable} ${figtree.variable} ${notoSc.variable}`}
      suppressHydrationWarning
    >
      <head>
        <InlineScript html={bootScript} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd(lang)).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="flex min-h-dvh flex-col antialiased">
        <LocaleProvider locale={lang}>
          <Shell>{children}</Shell>
        </LocaleProvider>
      </body>
    </html>
  );
}
