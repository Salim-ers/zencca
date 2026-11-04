"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";
import Mascot from "@/components/brand/Mascot";
import TransitionLink from "@/components/transition/TransitionLink";
import { Arrow, Magnetic, RevealText } from "@/components/ui/motion";
import { productBySlug } from "@/data/products";
import { site } from "@/data/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { onReveal } from "@/lib/ready";
import { cn, isTouch, prefersReducedMotion } from "@/lib/utils";

import avocat from "@/assets/photos/comptoir/smoothie-avocat-yaourt.webp";
import taro from "@/assets/photos/comptoir/taro-coco-creme.webp";
import americano from "@/assets/photos/comptoir/coco-americano.webp";
import raisin from "@/assets/photos/comptoir/the-au-raisin-frais.webp";
import bleu from "@/assets/photos/comptoir/mango-coco-bleu.webp";
import cocoLatte from "@/assets/photos/comptoir/coco-latte.webp";
import sakura from "@/assets/photos/comptoir/sakura-matcha.webp";

const CUPS: { slug: string; src: StaticImageData }[] = [
  { slug: "smoothie-avocat-yaourt", src: avocat },
  { slug: "taro-coco-creme", src: taro },
  { slug: "coco-americano", src: americano },
  { slug: "the-au-raisin-frais", src: raisin },
  { slug: "mango-coco-bleu", src: bleu },
  { slug: "coco-latte", src: cocoLatte },
  { slug: "sakura-matcha", src: sakura },
];
const MID = (CUPS.length - 1) / 2;

/**
 * HERO — « le comptoir »
 * La boutique en coupe : le mur ocre et le néon en titre, la gamme alignée sur
 * le comptoir en terrazzo, et le store prune de la façade comme socle.
 * Les gobelets se lèvent au passage du pointeur et s'enfoncent derrière le
 * comptoir au défilement. Chacun ouvre la fiche de sa boisson.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      if (prefersReducedMotion()) return;

      gsap.set(q("[data-rise]"), { yPercent: 115 });
      gsap.set(q("[data-peek]"), { yPercent: 60 });
      gsap.set(q("[data-counter]"), { yPercent: 100 });
      gsap.set(q("[data-fade]"), { autoAlpha: 0, y: 14 });

      const off = onReveal(() => {
        gsap.set(q("[data-enter]"), { visibility: "visible" });
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .to(q("[data-counter]"), { yPercent: 0, duration: 1.1 }, 0)
          .to(q("[data-rise]"), { yPercent: 0, duration: 1.15, stagger: { each: 0.06, from: "center" }, ease: "back.out(1.25)" }, 0.25)
          .to(q("[data-peek]"), { yPercent: 0, duration: 0.9, ease: "back.out(1.6)" }, 1.15)
          .to(q("[data-fade]"), { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.07 }, 0.75);
      });

      // Les gobelets proches du pointeur se soulèvent, comme une vague le long du comptoir
      let cleanupPointer = () => {};
      const row = q<HTMLElement>("[data-row]")[0];
      if (!isTouch() && row) {
        const lifts = q<HTMLElement>("[data-lift]").map((el) => ({
          el,
          to: gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" }),
        }));
        const move = (e: PointerEvent) => {
          lifts.forEach(({ el, to }) => {
            const r = el.getBoundingClientRect();
            const d = (e.clientX - (r.left + r.width / 2)) / (r.width * 1.05);
            to(-Math.exp(-d * d) * r.height * 0.075);
          });
        };
        const leave = () => lifts.forEach(({ to }) => to(0));
        row.addEventListener("pointermove", move);
        row.addEventListener("pointerleave", leave);
        cleanupPointer = () => {
          row.removeEventListener("pointermove", move);
          row.removeEventListener("pointerleave", leave);
        };
      }

      // Au défilement : le titre s'éloigne, les gobelets s'enfoncent derrière le comptoir
      gsap.to(q("[data-scroll-title]"), {
        yPercent: -22,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      q<HTMLElement>("[data-sink]").forEach((el) => {
        gsap.to(el, {
          yPercent: 16 + Number(el.dataset.sink) * 9,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });

      return () => {
        off();
        cleanupPointer();
      };
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      data-tint="#f1d29b"
      aria-labelledby="hero-title"
      className="comptoir relative flex min-h-[100svh] flex-col overflow-hidden bg-ocre"
    >
      {/* Le mur et le néon */}
      <div className="wrap relative z-10 flex flex-1 items-center justify-center pb-4 pt-[5.25rem] lg:pt-[5.5rem]">
        <div data-scroll-title>
          <RevealText
            as="h1"
            id="hero-title"
            trigger="reveal"
            delay={0.15}
            className="font-display t-comptoir text-center text-encre"
            lines={["Une rencontre infusée", "dans le thé."]}
          />
        </div>
      </div>

      {/* La gamme, alignée sur le comptoir */}
      <ul
        data-row
        aria-label="Quelques boissons de la carte"
        className="relative z-20 -mb-[clamp(1.1rem,3.4svh,2.4rem)] flex w-full items-end justify-center pb-2"
        style={{ clipPath: "inset(-100vh -100vw 0 -100vw)" }}
      >
        {CUPS.map((c, i) => {
          const dist = Math.abs(i - MID);
          const scale = 1 - dist * 0.065;
          const product = productBySlug(c.slug)!;
          return (
            <li
              key={c.slug}
              className={cn("relative shrink-0", dist === 3 && "comptoir-far")}
              style={{
                height: `calc(var(--cup-h) * ${scale})`,
                marginBottom: `${dist * 0.5}svh`,
                zIndex: 10 - dist,
              }}
            >
              <div data-sink={dist} className="relative h-full">
                {/* La mascotte passe la tête derrière le dernier gobelet */}
                {i === CUPS.length - 1 && (
                  <div className="pointer-events-none absolute bottom-[83%] left-1/2 w-[86%] -translate-x-1/2" aria-hidden>
                    <div data-peek data-enter>
                      <Mascot variant="mascot" liquid="#ebbfc6" decorative followPointer />
                    </div>
                  </div>
                )}
                <div data-rise data-enter className="relative h-full">
                  <span aria-hidden className="absolute -bottom-[1%] -right-[9%] left-[13%] h-[7%] rounded-[50%] bg-encre/50 blur-[10px]" />
                  <div data-lift className="relative h-full">
                    <TransitionLink
                      href={`/la-carte?boisson=${c.slug}`}
                      aria-label={`${product.name} : voir la fiche`}
                      className="group relative block h-full rounded-2xl"
                    >
                      <Image
                        src={c.src}
                        alt=""
                        sizes="(min-width: 640px) 18vw, 38vw"
                        loading="eager"
                        fetchPriority={dist === 0 ? "high" : "auto"}
                        draggable={false}
                        className="block h-full w-auto max-w-none select-none"
                      />
                      <span
                        aria-hidden
                        className="absolute left-1/2 top-[11%] -translate-x-1/2 whitespace-nowrap rounded-full bg-encre px-3 py-1 text-[0.8rem] font-semibold text-papier opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                      >
                        {product.name}
                      </span>
                    </TransitionLink>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div data-counter className="relative z-10">
        {/* Le plateau en terrazzo */}
        <div
          aria-hidden
          className="terrazzo h-[clamp(2.5rem,6.2svh,4.25rem)] border-t border-white/30 shadow-[inset_0_-12px_16px_-14px_rgba(32,20,9,0.7)]"
          style={{ ["--terrazzo-bg" as string]: "#74685c", backgroundSize: "260px 260px" }}
        />

        {/* Le store prune de la façade */}
        <div className="on-dark bg-store text-papier">
          <div className="wrap grid grid-cols-1 items-center gap-x-8 gap-y-3 py-5 lg:grid-cols-12 lg:gap-y-0 lg:py-3.5">
            <div data-fade data-enter className="lg:col-span-4">
              <p className="flex items-baseline justify-between gap-4">
                <span className="font-display text-[clamp(1.6rem,2.2vw,2.25rem)] leading-[1.05] tracking-tight">Salon de Thé</span>
                <span className="font-cjk text-xl lg:hidden" aria-hidden>
                  {site.cjkName}
                </span>
              </p>
              <TransitionLink href="/nous-trouver" className="link-infuse inline-block text-[0.95rem] text-papier/85 max-lg:mt-1">
                {site.address.street}, {site.address.district}
              </TransitionLink>
            </div>
            <p data-fade data-enter className="text-[1.0625rem] leading-snug text-papier/90 lg:col-span-4 lg:text-center">
              Des créations gourmandes, colorées et pleines de douceur, au cœur de Paris.
            </p>
            <div data-fade data-enter className="flex items-center gap-6 max-lg:mt-2 lg:col-span-4 lg:justify-end">
              <span className="font-cjk text-3xl max-lg:hidden" aria-hidden>
                {site.cjkName}
              </span>
              <Magnetic className="max-lg:w-full">
                <TransitionLink href="/la-carte" className="btn btn-sign max-lg:w-full" style={{ ["--btn-fill" as string]: "#fdf6ea", ["--btn-fg-hover" as string]: "#201409" }}>
                  Découvrir la carte <Arrow />
                </TransitionLink>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
