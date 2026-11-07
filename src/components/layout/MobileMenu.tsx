"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Mascot from "@/components/brand/Mascot";
import TransitionLink from "@/components/transition/TransitionLink";
import { WaveEdge } from "@/components/ui/Strata";
import LangSwitch from "./LangSwitch";
import { nav, site } from "@/data/site";
import { photos, type PhotoKey } from "@/data/images";
import { useLocale, useT } from "@/i18n/client";
import type { RouteKey } from "@/i18n/routes";
import { lockScroll } from "@/lib/scroll";

const thumbs: Record<RouteKey, PhotoKey> = {
  home: "facadeTerrasse",
  carte: "pMatchaLatte",
  univers: "comptoirNeon",
  galerie: "raisinSalon",
  nouveautes: "pLattePistache",
  visite: "enseigne",
};

const ease = [0.65, 0.05, 0.36, 1] as const;

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const locale = useLocale();
  const t = useT().common;
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement as HTMLElement;
    lockScroll(true);
    const t = setTimeout(() => closeBtn.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      lockScroll(false);
      opener.current?.focus?.();
    };
  }, [open]);

  // Fermer si l'écran passe en desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const fn = () => mq.matches && onCloseRef.current();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="menu-mobile"
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label={t.menu}
          className="fixed inset-0 z-[90] flex flex-col overflow-y-auto overscroll-contain lg:hidden"
          initial="closed"
          animate="open"
          exit="closed"
        >
          {/* Couches qui descendent comme une boisson versée */}
          {["#f1d29b", "#dfe5c3", "#a9bd6e"].map((c, i) => (
            <motion.div
              key={c}
              aria-hidden
              className="fixed inset-x-0 top-0 h-[100lvh]"
              style={{ background: c, zIndex: i }}
              variants={{
                closed: { y: "-112%", transition: { duration: 0.55, ease, delay: (2 - i) * 0.05 } },
                open: { y: "0%", transition: { duration: 0.7, ease, delay: i * 0.07 } },
              }}
            >
              <WaveEdge color={c} variant={i} className="absolute inset-x-0 top-full h-12 w-full rotate-180" />
            </motion.div>
          ))}

          <div className="relative z-10 flex min-h-full flex-col px-5 pb-8 pt-4 sm:px-8">
            <div className="flex items-center justify-between">
              <motion.div
                variants={{ closed: { opacity: 0 }, open: { opacity: 1, transition: { delay: 0.35 } } }}
                className="font-cjk text-lg text-matcha-fonce"
                aria-hidden
              >
                {site.cjkName}
              </motion.div>
              <motion.button
                ref={closeBtn}
                type="button"
                onClick={onClose}
                variants={{ closed: { opacity: 0, scale: 0.8 }, open: { opacity: 1, scale: 1, transition: { delay: 0.3 } } }}
                className="flex h-12 items-center gap-3 rounded-full bg-encre pl-5 pr-4 text-papier"
              >
                <span className="text-[0.95rem] font-semibold">{t.close}</span>
                <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden>
                  <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </motion.button>
            </div>

            <nav aria-label={t.mobileNav} className="mt-8 flex-1">
              <ul className="flex flex-col">
                {nav.map((l, i) => (
                  <motion.li
                    key={l.href}
                    className="border-b border-encre/15"
                    variants={{
                      closed: { opacity: 0, y: 30, transition: { duration: 0.2 } },
                      open: { opacity: 1, y: 0, transition: { delay: 0.32 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                    }}
                  >
                    <TransitionLink
                      href={l.href}
                      markCurrent
                      onClick={onClose}
                      className="group flex items-center justify-between gap-4 py-3.5 aria-[current=page]:text-matcha-fonce"
                    >
                      <span className="font-display text-[clamp(2.1rem,9vw,3.4rem)] leading-none">{l.label[locale]}</span>
                      <span className="tuile relative h-14 w-11 shrink-0 [--coin:0.85rem] [--tuile-r:0.35rem] transition-transform duration-500 group-active:scale-95">
                        <Image src={photos[thumbs[l.key]].src} alt="" fill sizes="44px" className="object-cover" />
                      </span>
                    </TransitionLink>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              className="mt-8 flex items-end justify-between gap-4"
              variants={{ closed: { opacity: 0 }, open: { opacity: 1, transition: { delay: 0.7 } } }}
            >
              <div className="text-[0.95rem] leading-snug">
                <p className="font-semibold">{site.address.street}</p>
                <p>
                  {site.address.postalCode} {site.address.city}
                </p>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="link-infuse mt-2 inline-block">
                  Instagram {site.instagram.handle}
                </a>
                <LangSwitch long className="link-infuse mt-3 block w-max" />
              </div>
              <div className="w-24 shrink-0 translate-y-3">
                <Mascot variant="mascot" liquid="#ebbfc6" decorative />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
