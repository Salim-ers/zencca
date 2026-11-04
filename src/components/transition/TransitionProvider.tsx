"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image, { type StaticImageData } from "next/image";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { markCovered, markRevealed } from "@/lib/ready";
import { scrollToEl, scrollToTop } from "@/lib/lenis";
import { prefersReducedMotion } from "@/lib/utils";
import { labelFor, themeFor, type TransitionTheme } from "@/data/site";
import { WaveEdge } from "@/components/ui/Strata";

type NavOpts = { theme?: TransitionTheme; label?: string; image?: StaticImageData };
type Ctx = { navigate: (href: string, opts?: NavOpts) => void; busy: boolean };

const TransitionCtx = createContext<Ctx>({ navigate: () => {}, busy: false });
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
  const overlayRef = useRef<HTMLDivElement>(null);
  const pending = useRef<{ href: string; hash?: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [view, setView] = useState<{ theme: TransitionTheme; label: string; image?: StaticImageData }>({
    theme: "creme",
    label: "",
  });
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const fallback = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reveal = useCallback(() => {
    const el = overlayRef.current;
    const hash = pending.current?.hash;
    pending.current = null;
    if (fallback.current) clearTimeout(fallback.current);
    if (hash) requestAnimationFrame(() => scrollToEl(hash, -80));
    else scrollToTop();
    requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()));
    if (!el) {
      setBusy(false);
      markRevealed();
      return;
    }
    const bands = el.querySelectorAll<HTMLElement>("[data-band]");
    const label = el.querySelector<HTMLElement>("[data-label]");
    const tl = gsap.timeline({
      delay: 0.08,
      onComplete: () => {
        gsap.set(el, { visibility: "hidden" });
        gsap.set(bands, { yPercent: 115 });
        setBusy(false);
      },
    });
    tl.to(label, { yPercent: -40, autoAlpha: 0, duration: 0.35, ease: "power2.in" }, 0)
      .to([...bands].reverse(), { yPercent: -125, duration: 0.85, stagger: 0.07, ease: "power3.inOut" }, 0.1)
      .add(() => markRevealed(), 0.45);
    tlRef.current = tl;
  }, []);

  // Le chemin a changé : on révèle la nouvelle page
  useEffect(() => {
    if (pending.current && pending.current.href === pathname) reveal();
    else if (pending.current) {
      // Navigation vers un autre chemin (redirection) : on révèle quand même
      reveal();
    }
  }, [pathname, reveal]);

  const navigate = useCallback(
    (href: string, opts: NavOpts = {}) => {
      const [pathPart, hashPart] = href.split("#");
      const path = pathPart.split("?")[0] || pathname;
      const hash = hashPart ? `#${hashPart}` : undefined;

      if (path === pathname) {
        if (pathPart.includes("?")) router.push(href, { scroll: false });
        else if (hash) scrollToEl(hash, -80);
        else scrollToTop();
        return;
      }
      if (busy) return;

      if (prefersReducedMotion()) {
        router.push(href, { scroll: true });
        return;
      }

      const theme = opts.theme ?? themeFor(path);
      setView({ theme, label: opts.label ?? labelFor(path), image: opts.image });
      setBusy(true);
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
        const tl = gsap.timeline({
          onComplete: () => {
            pending.current = { href: path, hash };
            router.push(pathPart || "/", { scroll: false });
            // Garde-fou : jamais d'écran figé
            fallback.current = setTimeout(() => pending.current && reveal(), 2500);
          },
        });
        tl.to(bands, { yPercent: 0, duration: 0.7, stagger: 0.08, ease: "power3.inOut" }).to(
          label,
          { yPercent: 0, autoAlpha: 1, duration: 0.45, ease: "power3.out" },
          "-=0.3"
        );
        tlRef.current = tl;
      });
    },
    [busy, pathname, reveal, router]
  );

  // Position de départ des couches (hors écran, sous la page)
  useEffect(() => {
    const el = overlayRef.current;
    if (el) gsap.set(el.querySelectorAll("[data-band]"), { yPercent: 115 });
  }, []);

  const pal = palettes[view.theme];

  return (
    <TransitionCtx.Provider value={{ navigate, busy }}>
      {children}
      <div
        ref={overlayRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[95] overflow-hidden"
        style={{ visibility: "hidden" }}
      >
        {pal.layers.map((c, i) => (
          <div
            key={i}
            data-band
            className="absolute inset-x-0 top-0 h-[100lvh] will-change-transform"
            style={{ background: c }}
          >
            <WaveEdge color={c} className="absolute inset-x-0 bottom-full h-[9vh] min-h-12 w-full" variant={i} />
            <WaveEdge color={c} className="absolute inset-x-0 top-full h-[9vh] min-h-12 w-full rotate-180" variant={i + 1} />
            {i === 2 && (
              <div data-label className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center">
                {view.image && (
                  <div className="arch relative h-[34vh] w-[24vh] max-w-[60vw]">
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
