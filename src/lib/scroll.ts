"use client";

/** Défilement natif du navigateur : il reste fluide même quand la page travaille. */
export function lockScroll(lock: boolean) {
  document.documentElement.style.overflow = lock ? "hidden" : "";
}
export function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
}
export function scrollToEl(target: string | HTMLElement, offset = -90) {
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: "smooth" });
}
