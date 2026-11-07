import type { StaticImageData } from "next/image";

export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isTouch = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: none), (pointer: coarse)").matches;

/**
 * Mode allégé : économie de données, très peu de mémoire ou de cœurs.
 * Détecté avant la première peinture (classe `lite` sur <html>) : l'intro est
 * écourtée et les effets de parallaxe et de regard qui suit le pointeur sont coupés.
 */
export const isLite = () => typeof document !== "undefined" && document.documentElement.classList.contains("lite");

/**
 * Aperçu pendant le chargement d'une photo : sa mini-version, affichée telle quelle.
 * `placeholder="blur"` passe par un filtre SVG que Firefox dessine sur le fil principal,
 * ce qui figeait la page au défilement et aux changements de page.
 */
export const previewOf = (src: StaticImageData) => (src.blurDataURL ?? "empty") as `data:image/${string}` | "empty";
