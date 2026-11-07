"use client";

import { useEffect, useState } from "react";
import TransitionLink from "@/components/transition/TransitionLink";
import { site } from "@/data/site";
import { useRouteKey, useT } from "@/i18n/client";
import { scrollToEl } from "@/lib/scroll";
import { cn } from "@/lib/utils";

/** Barre d'action mobile et tablette : itinéraire + accès à la carte, toujours à portée de pouce. */
export default function MobileActionBar() {
  const key = useRouteKey();
  const t = useT().common;
  const [visible, setVisible] = useState(false);
  const onLocation = key === "visite";
  const onMenu = key === "carte";

  useEffect(() => {
    let footerVisible = false;
    let raf = 0;
    let shown = false;
    const check = () => {
      raf = 0;
      const v = window.scrollY > window.innerHeight * (onLocation ? 0.15 : 0.6) && !footerVisible;
      if (v !== shown) setVisible((shown = v));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    const footer = document.querySelector("[data-footer]");
    const io = new IntersectionObserver(([e]) => {
      footerVisible = e.isIntersecting;
      check();
    });
    if (footer) io.observe(footer);
    setVisible(false);
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [onLocation, key]);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-[70] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[transform,opacity] duration-500 ease-[var(--ease-soft)] lg:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      )}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex max-w-md gap-2 rounded-full bg-encre p-1.5 shadow-[0_20px_50px_-12px_rgba(32,20,9,0.55)]">
        <a
          href={site.maps.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? 0 : -1}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-enseigne font-semibold text-encre active:scale-[0.97]"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
            <path d="M12 2l8 19-8-4-8 4 8-19z" fill="currentColor" />
          </svg>
          {t.directions}
        </a>
        {onLocation ? (
          <button
            type="button"
            tabIndex={visible ? 0 : -1}
            onClick={() => scrollToEl("#carte")}
            className="flex h-12 flex-1 items-center justify-center rounded-full font-semibold text-papier active:scale-[0.97]"
          >
            {t.seeMap}
          </button>
        ) : (
          <TransitionLink
            href={onMenu ? "/nous-trouver" : "/la-carte"}
            tabIndex={visible ? 0 : -1}
            className="flex h-12 flex-1 items-center justify-center rounded-full font-semibold text-papier active:scale-[0.97]"
          >
            {onMenu ? t.findUs : t.theMenu}
          </TransitionLink>
        )}
      </div>
    </div>
  );
}
