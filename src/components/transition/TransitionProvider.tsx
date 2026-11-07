"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image, { type StaticImageData } from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { markCovered, markRevealed } from "@/lib/ready";
import { scrollToEl, scrollToTop } from "@/lib/scroll";
import { prefersReducedMotion } from "@/lib/utils";
import { navItem, type TransitionTheme } from "@/data/site";
import { useLocale } from "@/i18n/client";
import { routeOf } from "@/i18n/routes";
import { WaveEdge } from "@/components/ui/Strata";

type NavOpts = { theme?: TransitionTheme; label?: string; image?: StaticImageData };
type Ctx = { navigate: (href: string, opts?: NavOpts) => void };

const TransitionCtx = createContext<Ctx>({ navigate: () => {} });
export const usePageTransition = () => useContext(TransitionCtx);

/** Trois couches par thème : comme une boisson qui se superpose */
const palettes: Record<TransitionTheme, { layers: [string, string, string]; ink: string }> = {
  creme: { layers: ["#a9bd6e", "#ebbfc6", "#fdf6ea"], ink: "#201409" },
  matcha: { layers: ["#f3ebdd", "#dfe5c3", "#a9bd6e"], ink: "#263211" },
  sakura: { layers: ["#a9bd6e", "#f7e2e3", "#ebbfc6"], ink: "#4f121c" },
  ocre: { layers: ["#f8ebd3", "#f1d29b", "#e6b465"], ink: "#2a1606" },
  store: { layers: ["#e6b465", "#8a4a3c", "#4d2724"], ink: "#fdf6ea" },
  enseigne: { layers: ["#ebbfc6", "#fdf6ea", "#ffd21f"], ink: "#201409" },
};

export default function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const overlayRef = useRef<HTMLDivElement>(null);
  /** Navigation en cours ; `uncovered` : le masque a déjà été levé par le garde-fou */
  const pending = useRef<{ hash?: string; uncovered?: boolean } | null>(null);
  // En références : changer de page ne doit pas re-rendre tous les liens du site
  const busy = useRef(false);
  const currentPath = useRef(pathname);
  const [view, setView] = useState<{ theme: TransitionTheme; label: string; image?: StaticImageData }>({
    theme: "creme",
    label: "",
  });
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const fallback = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** Lève le masque et signale que la page est visible */
  const uncover = useCallback(() => {
    const el = overlayRef.current;
    if (!el) {
      busy.current = false;
      ScrollTrigger.refresh();
      markRevealed();
      return;
    }
    gsap.killTweensOf(el.querySelector("[data-label]"));
    // Le travail lourd de la nouvelle page se fait encore sous le masque : les bandes ne partent qu'après
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        requestAnimationFrame(() => {
          const bands = el.querySelectorAll<HTMLElement>("[data-band]");
          const label = el.querySelector<HTMLElement>("[data-label]");
          tlRef.current?.kill();
          tlRef.current = gsap
            .timeline({
              onComplete: () => {
                gsap.set(el, { visibility: "hidden" });
                gsap.set(bands, { yPercent: 115 });
                busy.current = false;
              },
            })
            .to(label, { yPercent: -40, autoAlpha: 0, duration: 0.25, ease: "power2.in" }, 0)
            .to([...bands].reverse(), { yPercent: -125, duration: 0.6, stagger: 0.05, ease: "power3.inOut" }, 0.05)
            .add(() => markRevealed(), 0.3);
        });
      })
    );
  }, []);

  /** La nouvelle page est arrivée */
  const settle = useCallback(() => {
    const p = pending.current;
    pending.current = null;
    if (fallback.current) clearTimeout(fallback.current);
    if (p?.hash) requestAnimationFrame(() => scrollToEl(p.hash!, -80));
    else scrollToTop();
    if (p?.uncovered) {
      ScrollTrigger.refresh();
      return;
    }
    uncover();
  }, [uncover]);

  // Le chemin a changé : on révèle la nouvelle page (y compris après une redirection)
  useEffect(() => {
    currentPath.current = pathname;
    if (pending.current) settle();
  }, [pathname, settle]);

  const navigate = useCallback(
    (href: string, opts: NavOpts = {}) => {
      const [pathPart, hashPart] = href.split("#");
      const path = pathPart.split("?")[0] || currentPath.current;
      const hash = hashPart ? `#${hashPart}` : undefined;
      const to = routeOf(path);
      const here = routeOf(currentPath.current);
      const samePage = to.locale === here.locale && (to.key !== null ? to.key === here.key : path === currentPath.current);

      if (samePage) {
        // Même page : seuls les paramètres changent, sans aller-retour serveur
        if (pathPart.includes("?")) window.history.pushState(null, "", pathPart + (hash ?? ""));
        else if (hash) scrollToEl(hash, -80);
        else scrollToTop();
        return;
      }
      if (busy.current) return;

      if (prefersReducedMotion()) {
        router.push(href, { scroll: true });
        return;
      }

      const item = navItem(to.key);
      setView({ theme: opts.theme ?? item?.theme ?? "creme", label: opts.label ?? item?.label[locale] ?? "Zencca", image: opts.image });
      busy.current = true;
      markCovered();
      router.prefetch(pathPart);

      const el = overlayRef.current!;
      requestAnimationFrame(() => {
        const bands = el.querySelectorAll<HTMLElement>("[data-band]");
        const label = el.querySelector<HTMLElement>("[data-label]");
        tlRef.current?.kill();
        gsap.set(el, { visibility: "visible" });
        gsap.set(bands, { yPercent: 115 });
        gsap.set(label, { yPercent: 40, autoAlpha: 0 });
        tlRef.current = gsap
          .timeline({
            onComplete: () => {
              pending.current = { hash };
              router.push(pathPart || "/", { scroll: false });
              // Si la page tarde à arriver, le titre respire : l'écran ne paraît pas figé
              gsap.to(label, { autoAlpha: 0.55, duration: 0.7, delay: 0.4, repeat: -1, yoyo: true, ease: "sine.inOut" });
              // Garde-fou : jamais d'écran figé, même sur une connexion lente. La page restera
              // remise en haut à son arrivée.
              fallback.current = setTimeout(() => {
                if (!pending.current) return;
                pending.current.uncovered = true;
                uncover();
              }, 4000);
            },
          })
          .to(bands, { yPercent: 0, duration: 0.5, stagger: 0.05, ease: "power3.inOut" })
          .to(label, { yPercent: 0, autoAlpha: 1, duration: 0.3, ease: "power3.out" }, "-=0.25");
      });
    },
    [locale, router, uncover]
  );

  const ctx = useMemo(() => ({ navigate }), [navigate]);

  // Position de départ des couches (hors écran, sous la page)
  useEffect(() => {
    const el = overlayRef.current;
    if (el) gsap.set(el.querySelectorAll("[data-band]"), { yPercent: 115 });
    return () => {
      if (fallback.current) clearTimeout(fallback.current);
      tlRef.current?.kill();
    };
  }, []);

  const pal = palettes[view.theme];

  return (
    <TransitionCtx.Provider value={ctx}>
      {children}
      <div ref={overlayRef} aria-hidden className="pointer-events-none fixed inset-0 z-[95] overflow-hidden" style={{ visibility: "hidden" }}>
        {pal.layers.map((c, i) => (
          <div key={i} data-band className="absolute inset-x-0 top-0 h-[100lvh] will-change-transform" style={{ background: c }}>
            <WaveEdge color={c} className="absolute inset-x-0 bottom-full h-[9vh] min-h-12 w-full" variant={i} />
            <WaveEdge color={c} className="absolute inset-x-0 top-full h-[9vh] min-h-12 w-full rotate-180" variant={i + 1} />
            {i === 2 && (
              <div data-label className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center">
                {view.image && (
                  <div className="tuile relative h-[34vh] w-[24vh] max-w-[60vw]">
                    <Image src={view.image} alt="" fill sizes="30vh" className="object-cover" />
                  </div>
                )}
                <span className="font-display t-h1" style={{ color: pal.ink }}>
                  {view.label}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </TransitionCtx.Provider>
  );
}
