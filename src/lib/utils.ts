export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isTouch = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: none), (pointer: coarse)").matches;

/** Appareil modeste : peu de cœurs ou mode économie de données */
export const isLowPower = () => {
  if (typeof navigator === "undefined") return false;
  const n = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  return Boolean(n.connection?.saveData) || (n.hardwareConcurrency ?? 8) <= 4 || (n.deviceMemory ?? 8) <= 3;
};
