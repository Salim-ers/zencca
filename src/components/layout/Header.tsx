"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Mascot from "@/components/brand/Mascot";
import TransitionLink from "@/components/transition/TransitionLink";
import { Magnetic } from "@/components/ui/motion";
import dynamic from "next/dynamic";

// Le menu mobile (et Motion) ne se charge qu'au premier besoin
const loadMenu = () => import("./MobileMenu");
const MobileMenu = dynamic(loadMenu, { ssr: false });
import { nav } from "@/data/site";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const [tint, setTint] = useState<string | null>(null);
  const [solid, setSolid] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const goingDown = y > last.current + 4;
      const goingUp = y < last.current - 4;
      if (goingDown && y > 520) setHidden(true);
      else if (goingUp || y < 520) setHidden(false);
      last.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Le fond du header prend la teinte de la section qu'il survole
  useEffect(() => {
    setTint(null);
    setSolid(Boolean(document.querySelector("[data-header-solid]")));
    const els = document.querySelectorAll<HTMLElement>("[data-tint]");
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setTint((e.target as HTMLElement).dataset.tint || null);
        });
      },
      { rootMargin: "0px 0px -94% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  const links = nav.filter((n) => n.href !== "/");

  return (
    <>
      <a href="#contenu" className="sr-only-focusable fixed left-4 top-4 z-[120] rounded-full bg-encre px-5 py-3 text-papier">
        Aller au contenu
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] transition-transform duration-500 ease-[var(--ease-soft)]",
          hidden && !menuOpen && "-translate-y-[110%]"
        )}
      >
        <div className="wrap">
          <div
            className={cn(
              "mt-2 flex items-center justify-between gap-4 rounded-full px-3 transition-[background-color,box-shadow,padding,margin] duration-500 sm:mt-3 lg:px-4",
              scrolled ? "py-1.5 shadow-[0_10px_40px_-18px_rgba(32,20,9,0.35)]" : "py-2.5",
              solid && !scrolled && "shadow-[0_10px_40px_-22px_rgba(32,20,9,0.4)]"
            )}
            style={{
              backgroundColor: scrolled ? (tint ?? "var(--color-papier)") : solid ? "var(--color-papier)" : "transparent",
            }}
          >
            <TransitionLink
              href="/"
              aria-label="Zencca, retour à l'accueil"
              className="relative block shrink-0 rounded-xl px-1"
            >
              <Mascot
                variant="logo"
                className={cn("w-auto transition-[height] duration-500", scrolled ? "h-11 lg:h-12" : "h-12 lg:h-[3.75rem]")}
                hoverReact
                decorative
              />
            </TransitionLink>

            <nav aria-label="Navigation principale" className="hidden lg:block">
              <ul className="flex items-center gap-1 xl:gap-2">
                {links.map((l) => (
                  <li key={l.href}>
                    <TransitionLink
                      href={l.href}
                      markCurrent
                      className="group relative block rounded-full px-3 py-2 text-[0.97rem] font-medium text-encre xl:px-4"
                    >
                      <span className="link-infuse">{l.label}</span>
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <div className="hidden lg:block">
                <Magnetic>
                  <TransitionLink href="/nous-trouver" className="btn btn-sign !min-h-11 !px-5 !text-[0.95rem]">
                    Nous rendre visite
                  </TransitionLink>
                </Magnetic>
              </div>
              <button
                type="button"
                onPointerEnter={() => void loadMenu()}
                onTouchStart={() => void loadMenu()}
                onFocus={() => void loadMenu()}
                onClick={() => {
                  setMenuMounted(true);
                  setMenuOpen(true);
                }}
                aria-expanded={menuOpen}
                aria-controls="menu-mobile"
                className="group flex h-12 items-center gap-3 rounded-full bg-encre pl-5 pr-4 text-papier lg:hidden"
              >
                <span className="text-[0.95rem] font-semibold">Menu</span>
                <span aria-hidden className="relative block h-3 w-5">
                  <span className="absolute left-0 top-0 h-[2px] w-5 rounded bg-current transition-transform duration-300 group-active:translate-y-0.5" />
                  <span className="absolute bottom-0 right-0 h-[2px] w-3.5 rounded bg-current transition-all duration-300 group-hover:w-5" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>
      {menuMounted && <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />}
    </>
  );
}
