"use client";
import type Lenis from "lenis";
let instance: Lenis | null = null;
export const setLenis = (l: Lenis | null) => (instance = l);
export const getLenis = () => instance;

export function lockScroll(lock: boolean) {
  const l = getLenis();
  if (lock) {
    l?.stop();
    document.documentElement.style.overflow = "hidden";
  } else {
    l?.start();
    document.documentElement.style.overflow = "";
  }
}
export function scrollToTop() {
  const l = getLenis();
  if (l) l.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
}
export function scrollToEl(target: string | HTMLElement, offset = -90) {
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (!el) return;
  const l = getLenis();
  if (l) l.scrollTo(el, { offset, duration: 1.2 });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: "smooth" });
}
