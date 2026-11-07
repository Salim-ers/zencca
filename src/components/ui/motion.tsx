"use client";

import Image from "next/image";
import { createElement, useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { onReveal } from "@/lib/ready";
import { onVisible } from "@/lib/visible";
import { cn, isLite, isTouch, prefersReducedMotion, previewOf } from "@/lib/utils";
import { useLocale } from "@/i18n/client";
import type { Photo } from "@/data/images";

/* ──────────────────────────────────────────────────────────────
   InfuseImage — l'image se remplit de bas en haut,
   comme une boisson versée dans un gobelet.
────────────────────────────────────────────────────────────── */
export function InfuseImage({
  photo,
  sizes,
  className,
  shape = "tuile",
  eager,
  parallax = 0,
  trigger = "scroll",
  delay = 0,
  zoom = true,
  hoverZoom = false,
  children,
}: {
  photo: Photo;
  sizes: string;
  className?: string;
  shape?: "tuile" | "tuile-d" | "soft" | "none";
  /** Image du premier écran : chargée tout de suite, en priorité */
  eager?: boolean;
  /** amplitude du parallaxe interne en % (0 = aucun) */
  parallax?: number;
  /** "scroll" : au défilement ; "reveal" : avec l'entrée de page */
  trigger?: "scroll" | "reveal" | "none";
  delay?: number;
  zoom?: boolean;
  hoverZoom?: boolean;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  useGSAP(
    (_ctx, contextSafe) => {
      const el = ref.current!;
      const inner = el.querySelector<HTMLElement>("[data-inner]")!;
      const counter = el.querySelector<HTMLElement>("[data-counter]")!;
      const img = el.querySelector<HTMLElement>("[data-img]")!;
      if (prefersReducedMotion() || trigger === "none") return;
      // Une fenêtre monte et son contenu redescend d'autant : l'image semble se remplir sur place,
      // avec de simples transformations, sans repeindre la photo à chaque image.
      gsap.set(inner, { yPercent: 100 });
      gsap.set(counter, { yPercent: -100 });
      if (zoom) gsap.set(img, { scale: 1.22 });
      const play = contextSafe!(() => {
        gsap
          .timeline({
            delay,
            onStart: () => gsap.set(el, { visibility: "visible" }),
            onComplete: () => gsap.set([inner, counter, img], { clearProps: "transform" }),
          })
          .to(inner, { yPercent: 0, duration: 1.1, ease: "expo.inOut" }, 0)
          .to(counter, { yPercent: 0, duration: 1.1, ease: "expo.inOut" }, 0)
          .to(img, { scale: 1, duration: 1.5, ease: "expo.out" }, 0.1);
      });
      const off = trigger === "reveal" ? onReveal(play) : onVisible(el, play);
      if (parallax && !isLite()) {
        gsap.fromTo(
          img.parentElement!,
          { yPercent: -parallax },
          {
            yPercent: parallax,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      }
      return off;
    },
    { scope: ref }
  );
  const shapeCls = shape === "soft" ? "rounded-[1.75rem] overflow-hidden" : shape === "none" ? "overflow-hidden" : shape;
  return (
    <div ref={ref} className={cn(!className?.includes("absolute") && "relative", className)} data-enter={trigger === "reveal" ? "" : undefined}>
      <div className={cn("absolute inset-0", shapeCls)}>
        <div data-inner className="absolute inset-0 overflow-hidden">
          <div data-counter className="absolute inset-0">
            <div className={cn("absolute", parallax ? "-inset-y-[12%] inset-x-0" : "inset-0")}>
              <div data-img className="absolute inset-0">
                <div
                  className={cn(
                    "absolute inset-0",
                    hoverZoom && "transition-transform duration-[1.4s] ease-[var(--ease-soft)] group-hover:scale-[1.06]"
                  )}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt[locale]}
                    fill
                    sizes={sizes}
                    loading={eager ? "eager" : undefined}
                    fetchPriority={eager ? "high" : undefined}
                    placeholder={previewOf(photo.src)}
                    className="object-cover"
                    style={{ objectPosition: photo.focus ?? "50% 50%" }}
                  />
                </div>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   RevealText — titres révélés mot par mot depuis un masque
────────────────────────────────────────────────────────────── */
export function RevealText({
  as = "h2",
  lines,
  className,
  trigger = "scroll",
  delay = 0,
  stagger = 0.06,
  lineClassName,
  id,
}: {
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  /** Chaque entrée est une ligne (retour à la ligne volontaire) */
  lines: string[];
  className?: string;
  trigger?: "scroll" | "reveal";
  delay?: number;
  stagger?: number;
  /** Une classe par ligne (tableau) ou une classe commune */
  lineClassName?: string | string[];
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    (_ctx, contextSafe) => {
      const words = gsap.utils.toArray<HTMLElement>("[data-w]", ref.current);
      if (prefersReducedMotion()) return;
      gsap.set(words, { yPercent: 110, rotate: 4 });
      const play = contextSafe!(() => {
        gsap.set(ref.current, { visibility: "visible" });
        gsap.to(words, { yPercent: 0, rotate: 0, duration: 1.1, stagger, ease: "expo.out", delay });
      });
      return trigger === "reveal" ? onReveal(play) : onVisible(ref.current, play, 0.15);
    },
    { scope: ref }
  );
  return createElement(
    as,
    { ref, className, id, "aria-label": lines.join(" "), "data-enter": trigger === "reveal" ? "" : undefined },
    lines.map((line, li) => {
      const words = line.split(" ");
      return (
        <span key={li} aria-hidden className={cn("block", Array.isArray(lineClassName) ? lineClassName[li] : lineClassName)}>
          {words.map((w, wi) => (
            <span key={wi} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
              <span data-w className="inline-block">
                {w}
                {/* Espace insécable : une espace normale serait supprimée en fin de bloc inline-block */}
                {wi < words.length - 1 ? " " : ""}
              </span>
            </span>
          ))}
        </span>
      );
    })
  );
}

/* ──────────────────────────────────────────────────────────────
   Parallax — déplace un calque au défilement
────────────────────────────────────────────────────────────── */
export function Parallax({
  speed = 0.2,
  className,
  children,
  disableOnTouch = false,
}: {
  speed?: number;
  className?: string;
  children: React.ReactNode;
  disableOnTouch?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion() || isLite() || (disableOnTouch && isTouch())) return;
      gsap.fromTo(
        ref.current,
        { y: () => -speed * 180 },
        {
          y: () => speed * 180,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
        }
      );
    },
    { scope: ref }
  );
  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   FadeIn — apparition simple (utilisée avec parcimonie)
────────────────────────────────────────────────────────────── */
export function FadeIn({
  className,
  children,
  delay = 0,
  y = 24,
  as = "div",
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
  y?: number;
  as?: "div" | "p" | "ul" | "li";
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    (_ctx, contextSafe) => {
      if (prefersReducedMotion()) return;
      gsap.set(ref.current, { autoAlpha: 0, y });
      const play = contextSafe!(() => {
        gsap.to(ref.current, { autoAlpha: 1, y: 0, duration: 1, delay, ease: "power3.out" });
      });
      return onVisible(ref.current, play, 0.1);
    },
    { scope: ref }
  );
  return createElement(as, { ref, className }, children);
}

/* ──────────────────────────────────────────────────────────────
   Magnetic — attire subtilement le bouton vers le pointeur
────────────────────────────────────────────────────────────── */
export function Magnetic({ children, strength = 0.28, className }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.45)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.45)" });
    // Centre mesuré à l'entrée du pointeur (et non à chaque mouvement) : pas de lecture de mise en page en continu
    let cx = 0;
    let cy = 0;
    const enter = () => {
      const r = el.getBoundingClientRect();
      const x = Number(gsap.getProperty(el, "x")) || 0;
      const y = Number(gsap.getProperty(el, "y")) || 0;
      cx = r.left - x + r.width / 2;
      cy = r.top - y + r.height / 2;
    };
    const move = (e: PointerEvent) => {
      xTo((e.clientX - cx) * strength);
      yTo((e.clientY - cy) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      // quickTo garde une animation en pause dans la timeline globale de GSAP :
      // sans la détruire, elle retient l'élément — et toute l'ancienne page — après navigation.
      (xTo as unknown as { tween: gsap.core.Tween }).tween.kill();
      (yTo as unknown as { tween: gsap.core.Tween }).tween.kill();
    };
  }, [strength]);
  return (
    <span ref={ref} className={cn("inline-block", className)}>
      {children}
    </span>
  );
}

/* Flèche maison (pas de caractère « → ») */
export function Arrow({ className, dir = "right" }: { className?: string; dir?: "right" | "left" | "up-right" | "down" }) {
  const rot = { right: 0, left: 180, "up-right": -45, down: 90 }[dir];
  return (
    <svg viewBox="0 0 24 24" className={cn("btn-arrow h-[1.05em] w-[1.05em] shrink-0", className)} aria-hidden style={rot ? { rotate: `${rot}deg` } : undefined}>
      <path d="M4 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
