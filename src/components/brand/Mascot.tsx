"use client";

import { forwardRef, useCallback, useEffect, useId, useImperativeHandle, useRef } from "react";
import * as P from "./logo-paths";
import { cn, isLite, prefersReducedMotion } from "@/lib/utils";

export type MascotHandle = {
  blink: () => void;
  sip: (opts?: { duration?: number; refill?: boolean }) => Promise<void>;
  fill: (level: number, duration?: number) => Promise<void>;
  root: SVGSVGElement | null;
};

type Props = {
  /** "logo" : mascotte + logotype ; "mascot" : la mascotte seule */
  variant?: "logo" | "mascot";
  /** Couleur de la boisson dans le gobelet (absente du logo officiel → optionnelle) */
  liquid?: string;
  /** Niveau initial de la boisson 0–1 */
  level?: number;
  autoBlink?: boolean;
  /** Les yeux suivent légèrement le pointeur */
  followPointer?: boolean;
  /** Petite réaction au survol (sourcils, gorgée) */
  hoverReact?: boolean;
  className?: string;
  title?: string;
  decorative?: boolean;
  /** Masque le logotype (pour l'animer séparément) */
  hideLetters?: boolean;
};

const CUP_TOP = 786;
const CUP_BOTTOM = 932;

/** Suit la visibilité à l'écran d'un élément (les effets s'arrêtent quand la mascotte n'est pas vue) */
function useOnScreen(ref: React.RefObject<Element | null>) {
  const visible = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return visible;
}

const Mascot = forwardRef<MascotHandle, Props>(function Mascot(
  {
    variant = "logo",
    liquid,
    level = 0.82,
    autoBlink = true,
    followPointer = false,
    hoverReact = false,
    className,
    title = "Zencca",
    decorative = false,
    hideLetters = false,
  },
  ref
) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const svgRef = useRef<SVGSVGElement>(null);
  const eyesRef = useRef<SVGGElement>(null);
  const browsRef = useRef<SVGGElement>(null);
  const mouthRef = useRef<SVGGElement>(null);
  const liquidRef = useRef<SVGRectElement>(null);
  const levelRef = useRef(level);
  const fillRaf = useRef(0);
  const onScreen = useOnScreen(svgRef);

  const yFor = (l: number) => CUP_TOP + (1 - Math.max(0, Math.min(1, l))) * (CUP_BOTTOM - CUP_TOP);

  const blink = useCallback(() => {
    const eyes = eyesRef.current?.querySelectorAll("path");
    if (!eyes || prefersReducedMotion()) return;
    eyes.forEach((e) =>
      e.animate([{ transform: "scaleY(1)" }, { transform: "scaleY(0.08)" }, { transform: "scaleY(1)" }], { duration: 170, easing: "ease-in-out" })
    );
  }, []);

  const fill = useCallback((l: number, duration = 700) => {
    const rect = liquidRef.current;
    const from = yFor(levelRef.current);
    const to = yFor(l);
    levelRef.current = l;
    cancelAnimationFrame(fillRaf.current);
    if (!rect) return Promise.resolve();
    if (prefersReducedMotion() || duration === 0) {
      rect.setAttribute("y", String(to));
      return Promise.resolve();
    }
    return new Promise<void>((resolve) => {
      const start = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - start) / duration);
        const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
        rect.setAttribute("y", String(from + (to - from) * e));
        if (k < 1) fillRaf.current = requestAnimationFrame(tick);
        else resolve();
      };
      fillRaf.current = requestAnimationFrame(tick);
    });
  }, []);

  const sip = useCallback(
    async ({ duration = 900, refill = true }: { duration?: number; refill?: boolean } = {}) => {
      if (prefersReducedMotion()) return;
      const mouth = mouthRef.current;
      const brows = browsRef.current;
      mouth?.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(0.86, 1.08)" },
          { transform: "scale(1.04, 0.95)" },
          { transform: "scale(0.88, 1.06)" },
          { transform: "scale(1)" },
        ],
        { duration, easing: "ease-in-out" }
      );
      brows?.animate([{ transform: "translateY(0)" }, { transform: "translateY(-10px)" }, { transform: "translateY(0)" }], {
        duration,
        easing: "ease-in-out",
      });
      const before = levelRef.current;
      await fill(Math.max(0.12, before - 0.45), duration);
      blink();
      if (refill) await fill(before, 900);
    },
    [fill, blink]
  );

  useImperativeHandle(ref, () => ({ blink, sip, fill, root: svgRef.current }), [blink, sip, fill]);

  useEffect(() => () => cancelAnimationFrame(fillRaf.current), []);

  // Clignements aléatoires, seulement quand la mascotte est à l'écran et l'onglet visible
  useEffect(() => {
    if (!autoBlink || prefersReducedMotion()) return;
    let t: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    const loop = () => {
      t = setTimeout(() => {
        if (onScreen.current && !document.hidden) {
          blink();
          if (Math.random() < 0.25) t2 = setTimeout(blink, 260);
        }
        loop();
      }, 2600 + Math.random() * 3800);
    };
    loop();
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [autoBlink, blink, onScreen]);

  // Regard qui suit le pointeur (desktop uniquement). La position du visage est lue une fois
  // par image, et seulement quand la mascotte est à l'écran.
  useEffect(() => {
    if (!followPointer || prefersReducedMotion() || isLite()) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    const svg = svgRef.current;
    const eyes = eyesRef.current;
    if (!svg || !eyes) return;
    let raf = 0;
    let px = 0,
      py = 0,
      tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;
    const step = () => {
      const r = svg.getBoundingClientRect();
      const dx = px - (r.left + r.width * 0.5);
      const dy = py - (r.top + r.height * 0.42);
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 500);
      tx = (dx / d) * 9 * k;
      ty = (dy / d) * 7 * k;
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      eyes.setAttribute("transform", `translate(${cx.toFixed(2)} ${cy.toFixed(2)})`);
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.05 ? requestAnimationFrame(step) : 0;
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!raf && onScreen.current) raf = requestAnimationFrame(step);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [followPointer, onScreen]);

  const vbH = variant === "mascot" ? P.MASCOT_BOTTOM : P.LOGO_VIEWBOX.h;
  const hoverProps = hoverReact
    ? {
        onPointerEnter: () => {
          browsRef.current?.animate(
            [{ transform: "translateY(0)" }, { transform: "translateY(-12px)" }, { transform: "translateY(0)" }],
            { duration: 520, easing: "cubic-bezier(.34,1.56,.64,1)" }
          );
          blink();
        },
      }
    : {};

  const partStyle = { transformBox: "fill-box", transformOrigin: "center" } as const;

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${P.LOGO_VIEWBOX.w} ${vbH}`}
      className={cn("block overflow-visible", className)}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : title}
      {...hoverProps}
    >
      {liquid && (
        <>
          <defs>
            <clipPath id={`cup-${uid}`}>
              <path d={P.cup} />
            </clipPath>
          </defs>
          <g clipPath={`url(#cup-${uid})`}>
            <rect ref={liquidRef} data-part="liquid" x={540} y={yFor(level)} width={200} height={200} fill={liquid} />
          </g>
        </>
      )}
      <g fill={P.LOGO_COLOR}>
        <path d={P.body} fillRule="evenodd" />
        <g ref={browsRef} data-part="brows">
          <path d={P.browL} />
          <path d={P.browR} />
        </g>
        <g ref={eyesRef} data-part="eyes">
          <path d={P.eyeL} style={partStyle} />
          <path d={P.eyeR} style={partStyle} />
        </g>
        <g ref={mouthRef} data-part="mouth" style={{ transformBox: "fill-box", transformOrigin: "50% 15%" }}>
          <path d={P.mouth} />
        </g>
        {variant === "logo" && (
          <g data-letters style={hideLetters ? { opacity: 0 } : undefined}>
            <path d={P.l1} />
            <path d={P.l2} />
            <path d={P.l3} />
            <path d={P.l4} />
            <path d={P.l5} />
            <path d={P.l6} />
          </g>
        )}
      </g>
    </svg>
  );
});

export default Mascot;
