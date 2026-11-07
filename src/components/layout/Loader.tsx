"use client";

import { useEffect, useRef } from "react";
import Mascot from "@/components/brand/Mascot";
import { markRevealed } from "@/lib/ready";

const KEY = "zencca:intro";
/** Durée de la séquence CSS (apparition, gorgée, logotype) avant que l'écran se lève */
const INTRO_MS = 1250;
const LIFT_MS = 750;
const LIFT_EASE = "cubic-bezier(0.83, 0, 0.17, 1)";

/**
 * Écran d'intro : un écran blanc rendu côté serveur, joué une seule fois par session.
 * La séquence (la mascotte apparaît, cligne, boit une gorgée, le logotype monte) est
 * jouée en CSS dès le premier affichage, pendant que la page se charge : elle ne
 * s'ajoute plus au temps de chargement. Une fois la page prête, l'écran se lève
 * (animation gérée par le compositeur, fluide même si la page travaille encore).
 */
export default function Loader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const el = ref.current;
    const finish = () => {
      root.classList.add("intro-done", "intro-seen");
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
    };
    if (!el || root.classList.contains("intro-seen")) {
      root.classList.add("intro-done");
      markRevealed();
      return;
    }
    // Garde-fou déjà déclenché (page très lente) : l'écran a été effacé, on n'insiste pas
    if (root.classList.contains("intro-done")) {
      finish();
      markRevealed();
      return;
    }
    if (root.classList.contains("reduced") || typeof el.animate !== "function") {
      el.style.transition = "opacity .4s ease .3s, visibility 0s linear .7s";
      el.style.opacity = "0";
      el.style.visibility = "hidden";
      const t = setTimeout(finish, 700);
      markRevealed();
      return () => clearTimeout(t);
    }

    // Temps déjà écoulé dans la séquence CSS
    const svg = el.querySelector("svg");
    const anim = svg?.getAnimations?.()[0];
    const now = document.timeline?.currentTime;
    const elapsed = anim?.startTime != null && typeof now === "number" ? now - Number(anim.startTime) : 0;
    const wait = Math.max(0, INTRO_MS - elapsed);

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const animations: Animation[] = [];
    const lift = () => {
      if (cancelled) return;
      const opts: KeyframeAnimationOptions = { duration: LIFT_MS, easing: LIFT_EASE, fill: "forwards" };
      animations.push(
        el.animate([{ transform: "translateY(0)" }, { transform: "translateY(-100%)" }], opts),
        el.querySelector("[data-stage]")!.animate([{ transform: "translateY(0)" }, { transform: "translateY(30%)" }], opts)
      );
      timers.push(setTimeout(markRevealed, 200), setTimeout(finish, LIFT_MS));
    };
    // Si la page est prête avant la fin de la séquence, on attend ; sinon on lève dès que le navigateur respire
    let idle = 0;
    if (wait > 0) timers.push(setTimeout(lift, wait));
    else if (window.requestIdleCallback) idle = window.requestIdleCallback(lift, { timeout: 150 });
    else timers.push(setTimeout(lift, 16));

    return () => {
      cancelled = true;
      if (idle) window.cancelIdleCallback(idle);
      timers.forEach(clearTimeout);
      animations.forEach((a) => a.cancel());
    };
  }, []);

  return (
    <div id="zencca-intro" ref={ref} className="fixed inset-0 z-[100] bg-white will-change-transform" role="presentation" aria-hidden>
      <div data-stage className="absolute inset-0 flex items-center justify-center">
        <div className="w-[min(56vw,300px)] 3xl:w-[380px]">
          <Mascot variant="logo" liquid="#a9bd6e" level={0.9} autoBlink={false} decorative />
        </div>
      </div>
    </div>
  );
}
