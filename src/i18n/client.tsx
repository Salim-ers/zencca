"use client";

import { createContext, useContext, useMemo } from "react";
import { usePathname } from "next/navigation";
import { dictionaries } from "./dictionaries";
import { routeOf, type Locale } from "./routes";

const LocaleCtx = createContext<Locale>("fr");

/** Langue de la page, fournie par le layout serveur (identique au rendu serveur et au navigateur). */
export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <LocaleCtx.Provider value={locale}>{children}</LocaleCtx.Provider>;
}

export const useLocale = () => useContext(LocaleCtx);
export const useT = () => dictionaries[useContext(LocaleCtx)];

/** Page courante (clé stable, quelle que soit la langue ou la réécriture d'adresse). */
export function useRouteKey() {
  const pathname = usePathname();
  return useMemo(() => routeOf(pathname).key, [pathname]);
}
