"use client";

import { useRouteKey, useT } from "@/i18n/client";
import { routes } from "@/i18n/routes";
import { cn } from "@/lib/utils";

/**
 * Bascule FR / EN : la même page dans l'autre langue (paramètres et ancre conservés).
 * Navigation complète : la page est rechargée avec la bonne langue (balise <html lang>,
 * métadonnées), sans dépendre de l'état de la transition en cours.
 */
export default function LangSwitch({ className, long = false }: { className?: string; long?: boolean }) {
  const t = useT().common.lang;
  const key = useRouteKey();
  const href = routes[key ?? "home"][t.target];
  return (
    <a
      href={href}
      hrefLang={t.target}
      lang={t.target}
      aria-label={long ? undefined : t.aria}
      className={cn("inline-flex items-center justify-center font-semibold", className)}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        window.location.assign(href + window.location.search + window.location.hash);
      }}
    >
      {long ? t.name : t.label}
    </a>
  );
}
