"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn, prefersReducedMotion } from "@/lib/utils";

const WAVES = [
  "M0,60 C120,20 240,20 360,48 C480,76 600,92 720,70 C840,48 960,10 1080,22 C1200,34 1320,70 1440,56 L1440,120 L0,120 Z",
  "M0,72 C160,96 300,40 460,36 C620,32 700,84 860,82 C1020,80 1140,30 1280,34 C1360,36 1410,52 1440,60 L1440,120 L0,120 Z",
  "M0,44 C140,64 260,92 420,80 C580,68 640,26 800,26 C960,26 1060,74 1200,78 C1320,82 1390,60 1440,48 L1440,120 L0,120 Z",
  "M0,80 C200,40 340,30 520,52 C700,74 820,96 1000,70 C1160,46 1300,40 1440,64 L1440,120 L0,120 Z",
];

/** Bord ondulé — surface d'un liquide */
export function WaveEdge({
  color,
  className,
  variant = 0,
}: {
  color: string;
  className?: string;
  variant?: number;
}) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={cn("pointer-events-none block", className)}
      aria-hidden
    >
      <path d={WAVES[variant % WAVES.length]} fill={color} />
    </svg>
  );
}

/**
 * Séparateur « couches de saveurs » : trois couches ondulées qui
 * glissent à des vitesses différentes au défilement.
 * `from` = couleur de la section au-dessus, `to` = section en dessous.
 */
export function StrataDivider({
  layers,
  to,
  className,
  flip = false,
}: {
  layers: string[];
  to: string;
  className?: string;
  flip?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const els = gsap.utils.toArray<HTMLElement>("[data-layer]", ref.current);
      // Une seule timeline (et un seul déclencheur) pour toutes les couches
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom 40%", scrub: 0.6 },
      });
      els.forEach((el, i) => {
        tl.fromTo(
          el,
          { xPercent: i % 2 ? -6 : 0, yPercent: 30 + i * 18 },
          { xPercent: i % 2 ? 0 : -6, yPercent: 0, ease: "none" },
          0
        );
      });
    },
    { scope: ref }
  );
  const all = [...layers, to];
  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none relative z-[2] -mb-px h-[clamp(70px,11vw,190px)] overflow-hidden", flip && "rotate-180", className)}
    >
      {all.map((c, i) => (
        <div
          key={i}
          data-layer
          className="absolute inset-x-0 bottom-0 w-[112%]"
          style={{ height: `${100 - i * (60 / all.length)}%`, zIndex: i }}
        >
          <WaveEdge color={c} variant={i} className="absolute inset-x-0 top-0 h-[38%] w-full" />
          <div className="absolute inset-x-0 bottom-0 top-[37%]" style={{ background: c }} />
        </div>
      ))}
    </div>
  );
}
