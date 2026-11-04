"use client";

import { useEffect, useRef } from "react";
import Mascot, { type MascotHandle } from "@/components/brand/Mascot";
import { WaveEdge } from "@/components/ui/Strata";
import { gsap } from "@/lib/gsap";
import { markRevealed } from "@/lib/ready";

const KEY = "zencca:intro";

/**
 * Écran d'intro : rendu côté serveur (pas de flash), joué une seule fois
 * par session. La mascotte boit une gorgée, le logotype apparaît,
 * une vague d'infusion monte puis dévoile la page.
 */
export default function Loader() {
  const ref = useRef<HTMLDivElement>(null);
  const mascot = useRef<MascotHandle>(null);

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
    if (root.classList.contains("reduced")) {
      gsap.to(el, { autoAlpha: 0, duration: 0.4, delay: 0.3, onComplete: finish });
      markRevealed();
      return;
    }

    const letters = el.querySelectorAll<SVGPathElement>("[data-letters] path");
    const waves = el.querySelectorAll<HTMLElement>("[data-wave]");
    const svg = mascot.current?.root;
    gsap.set(letters, { yPercent: 60, opacity: 0, transformBox: "fill-box" });
    gsap.set(el.querySelector("[data-letters]"), { opacity: 1 });
    gsap.set(waves, { yPercent: 100 });

    let started = false;
    const run = () => {
      if (started) return;
      started = true;
      const tl = gsap.timeline();
      tl.fromTo(svg!, { scale: 0.86, autoAlpha: 0, y: 20 }, { scale: 1, autoAlpha: 1, y: 0, duration: 0.7, ease: "back.out(1.6)" })
        .add(() => mascot.current?.blink(), 0.5)
        .add(() => void mascot.current?.sip({ duration: 800, refill: false }), 0.6)
        .to(letters, { yPercent: 0, opacity: 1, duration: 0.55, stagger: 0.05, ease: "back.out(2)" }, 0.75)
        .to(waves, { yPercent: 0, duration: 0.9, stagger: 0.08, ease: "power3.inOut" }, 1.3)
        .to(el, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, 1.85)
        .to(el.querySelector("[data-stage]"), { yPercent: 30, duration: 0.9, ease: "power4.inOut" }, 1.85)
        .add(() => markRevealed(), 2.1)
        .add(finish);
    };
    // On attend les polices (au plus 700 ms) pour éviter tout saut
    const t = setTimeout(run, 700);
    document.fonts?.ready.then(() => {
      clearTimeout(t);
      run();
    });
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      id="zencca-intro"
      ref={ref}
      className="fixed inset-0 z-[100] bg-creme will-change-transform"
      role="presentation"
      aria-hidden
    >
      <div data-stage className="absolute inset-0 flex items-center justify-center">
        <div className="w-[min(56vw,300px)] 3xl:w-[380px]">
          <Mascot ref={mascot} variant="logo" liquid="#a9bd6e" level={0.9} autoBlink={false} hideLetters decorative />
        </div>
      </div>
      {/* Vague d'infusion */}
      {["#dfe5c3", "#a9bd6e", "#e6b465"].map((c, i) => (
        <div key={c} data-wave className="absolute inset-x-0 bottom-0 h-[38vh]" style={{ zIndex: 1 + i, height: `${34 - i * 9}vh` }}>
          <WaveEdge color={c} variant={i + 1} className="absolute inset-x-0 bottom-full h-14 w-full md:h-20" />
          <div className="absolute inset-0" style={{ background: c }} />
        </div>
      ))}
      {/* Bord inférieur ondulé lorsque l'écran se lève */}
      <WaveEdge color="#e6b465" variant={2} className="absolute inset-x-0 top-full h-16 w-full rotate-180 md:h-24" />
    </div>
  );
}
