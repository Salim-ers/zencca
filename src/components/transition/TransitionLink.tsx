"use client";

import Link, { type LinkProps } from "next/link";
import type { StaticImageData } from "next/image";
import { forwardRef } from "react";
import { usePathname } from "next/navigation";
import { usePageTransition } from "./TransitionProvider";
import type { TransitionTheme } from "@/data/site";

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
  Omit<LinkProps, "href"> & {
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
  const pathname = usePathname();
  const isCurrent = markCurrent && (href === "/" ? pathname === "/" : pathname.startsWith(href.split(/[?#]/)[0]));
  return (
    <Link
      ref={ref}
      href={href}
      aria-current={isCurrent ? "page" : undefined}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        if (rest.target === "_blank") return;
        e.preventDefault();
        navigate(href, { theme, label: transitionLabel, image: transitionImage });
      }}
      {...rest}
    >
      {children}
    </Link>
  );
});

export default TransitionLink;
