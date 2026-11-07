"use client";

import Link, { type LinkProps } from "next/link";
import type { StaticImageData } from "next/image";
import { forwardRef } from "react";
import { usePageTransition } from "./TransitionProvider";
import type { TransitionTheme } from "@/data/site";
import { useLocale, useRouteKey } from "@/i18n/client";
import { localizeHref, routeOf } from "@/i18n/routes";

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
  Omit<LinkProps, "href"> & {
    /** Adresse française (« /la-carte?boisson=x ») : elle est traduite selon la langue de la page */
    href: string;
    theme?: TransitionTheme;
    transitionLabel?: string;
    transitionImage?: StaticImageData;
    /** Ajoute aria-current si le lien correspond à la page */
    markCurrent?: boolean;
  };

/** Lien interne avec transition de page (garde cmd/ctrl-clic, clic molette, etc.) */
const TransitionLink = forwardRef<HTMLAnchorElement, Props>(function TransitionLink(
  { href, theme, transitionLabel, transitionImage, markCurrent, onClick, children, ...rest },
  ref
) {
  const { navigate } = usePageTransition();
  const locale = useLocale();
  const current = useRouteKey();
  const target = localizeHref(href, locale);
  const isCurrent = markCurrent && current !== null && routeOf(target).key === current;
  return (
    <Link
      ref={ref}
      href={target}
      aria-current={isCurrent ? "page" : undefined}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        if (rest.target === "_blank") return;
        e.preventDefault();
        navigate(target, { theme, label: transitionLabel, image: transitionImage });
      }}
      {...rest}
    >
      {children}
    </Link>
  );
});

export default TransitionLink;
