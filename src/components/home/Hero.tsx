"use client";

import { useRef } from "react";
import Mascot from "@/components/brand/Mascot";
import TransitionLink from "@/components/transition/TransitionLink";
import { Arrow, InfuseImage, Magnetic, RevealText } from "@/components/ui/motion";
import { ArchLines, CocoChunk, Leaf, Pearl, Petal, Powder } from "@/components/ui/Ingredients";
import { StrataDivider } from "@/components/ui/Strata";
import { photos } from "@/data/images";
import { site } from "@/data/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { onReveal } from "@/lib/ready";
import { isTouch, prefersReducedMotion } from "@/lib/utils";

/**
 * HERO — « tableau éditorial vivant »
 * Le titre s'enroule autour d'une grande arche (les niches de la boutique),
 * qui se remplit de bas en haut comme un gobelet. Les ingrédients flottent
 * en profondeur et répondent au pointeur.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const reduced = prefersReducedMotion();
      if (reduced) return;

      gsap.set(q("[data-arch-line]"), { strokeDashoffset: 1 });
      gsap.set(q("[data-float]"), { scale: 0, rotate: -40 });
      gsap.set(q("[data-peek]"), { yPercent: 70 });
      gsap.set(q("[data-fade]"), { autoAlpha: 0, y: 18 });

      const off = onReveal(() => {
        gsap.set(q("[data-enter]"), { visibility: "visible" });
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.to(q("[data-arch-line]"), { strokeDashoffset: 0, duration: 2, stagger: 0.12, ease: "power2.inOut" }, 0.2)
          .to(q("[data-float]"), { scale: 1, rotate: 0, duration: 1.2, stagger: 0.07, ease: "back.out(1.8)" }, 0.75)
          .to(q("[data-peek]"), { yPercent: 0, duration: 1.1, ease: "back.out(1.5)" }, 1.05)
          .to(q("[data-fade]"), { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 }, 0.7);
      });

      // Profondeur au pointeur (desktop)
      let cleanupPointer = () => {};
      if (!isTouch()) {
        const layers = q("[data-depth]").map((el) => ({
          d: Number((el as HTMLElement).dataset.depth),
          x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" }),
        }));
        const move = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          layers.forEach((l) => {
            l.x(nx * l.d * 60);
            l.y(ny * l.d * 40);
          });
        };
        root.current!.addEventListener("pointermove", move);
        cleanupPointer = () => root.current?.removeEventListener("pointermove", move);
      }

      // Sortie au défilement : l'arche s'éloigne, le titre glisse
      gsap.to(q("[data-scroll-title]"), {
        yPercent: -18,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(q("[data-scroll-arch]"), {
        yPercent: 10,
        scale: 0.94,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(q("[data-scroll-small]"), {
        yPercent: -40,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });

      return () => {
        off();
        cleanupPointer();
      };
    },
    { scope: root }
  );

  return (
    <section ref={root} data-tint="#fdf6ea" aria-labelledby="hero-title" className="relative overflow-hidden bg-creme">
      <div className="wrap relative grid min-h-[100svh] grid-cols-1 items-center gap-y-10 pb-28 pt-28 lg:grid-cols-12 lg:gap-x-8 lg:pb-32 lg:pt-32">
        {/* Colonne texte */}
        <div data-scroll-title className="relative z-10 lg:col-span-7 lg:pr-4">
          <RevealText
            as="h1"
            id="hero-title"
            trigger="reveal"
            delay={0.15}
            className="font-display t-hero text-encre"
            lines={["Une rencontre", "infusée", "dans le thé."]}
            lineClassName={["", "pl-[0.9em]", "pl-[0.25em]"]}
          />
          <p className="t-lead measure mt-8 text-brun lg:mt-10">
            Des créations gourmandes, colorées et pleines de douceur, au cœur de Paris.
          </p>
          <div data-fade data-enter className="mt-8 flex flex-wrap gap-3">
            <Magnetic>
              <TransitionLink href="/la-carte" className="btn">
                Découvrir la carte <Arrow />
              </TransitionLink>
            </Magnetic>
            <Magnetic>
              <TransitionLink href="/nous-trouver" className="btn btn-ghost" style={{ ["--btn-fill" as string]: "#ffd21f" }}>
                Nous rendre visite
              </TransitionLink>
            </Magnetic>
          </div>
          <p data-fade data-enter className="mt-8 flex items-center gap-2.5 text-[0.95rem] text-brun">
            <Pearl className="h-3 w-3" />
            {site.address.street}, {site.address.district}
          </p>
        </div>

        {/* Composition photographique */}
        <div className="relative mx-auto w-full max-w-[34rem] lg:col-span-5 lg:max-w-none">
          <div data-scroll-arch className="relative mx-auto mt-14 aspect-[3/4.1] w-[78%] sm:w-[66%] lg:mt-16 lg:w-[94%] 3xl:w-[88%]">
            <div className="absolute -inset-x-[9%] -top-[6%] bottom-[-3%]" data-depth="0.25">
              <ArchLines className="h-full w-full" color="#5f7232" />
            </div>
            {/* La mascotte jette un œil par-dessus l'arche */}
            <div className="absolute -top-[12.5%] left-[8%] z-20 w-[28%] overflow-hidden" aria-hidden>
              <div data-peek data-enter>
                <Mascot variant="mascot" liquid="#ebbfc6" decorative followPointer />
              </div>
            </div>
            <InfuseImage
              photo={photos.heroSakuraRue}
              sizes="(min-width: 1024px) 38vw, 80vw"
              priority
              trigger="reveal"
              delay={0.05}
              className="absolute inset-0 z-10 shadow-[0_50px_80px_-50px_rgba(77,39,36,0.55)]"
              shape="arch"
            />
          </div>

          {/* Petite arche : eau coco matcha */}
          <div
            data-scroll-small
            className="absolute -bottom-[4%] -left-[2%] z-20 aspect-[3/4] w-[36%] sm:left-[4%] lg:-left-[16%] lg:w-[40%]"
          >
            <div data-depth="0.7" className="h-full w-full">
              <InfuseImage
                photo={photos.eauCocoMatcha}
                sizes="(min-width: 1024px) 16vw, 36vw"
                trigger="reveal"
                delay={0.45}
                shape="arch"
                className="h-full w-full ring-[6px] ring-creme"
              />
            </div>
          </div>

          {/* Ingrédients flottants */}
          <div className="pointer-events-none absolute inset-0 z-30" aria-hidden>
            <div data-depth="1.2" className="absolute left-[2%] top-[6%] w-[13%]">
              <div data-float data-enter>
                <Petal className="w-full rotate-[-20deg]" />
              </div>
            </div>
            <div data-depth="0.9" className="absolute -right-[2%] top-[40%] w-[16%]">
              <div data-float data-enter>
                <Leaf className="w-full" />
              </div>
            </div>
            <div data-depth="1.6" className="absolute bottom-[18%] right-[8%] w-[6%]">
              <div data-float data-enter>
                <Pearl className="w-full" />
              </div>
            </div>
            <div data-depth="1.3" className="absolute bottom-[26%] right-[1%] w-[3.5%]">
              <div data-float data-enter>
                <Pearl className="w-full" />
              </div>
            </div>
            <div data-depth="0.6" className="absolute -bottom-[3%] right-[22%] w-[24%]">
              <div data-float data-enter>
                <Powder className="w-full" />
              </div>
            </div>
            <div data-depth="1.1" className="absolute left-[30%] top-[-4%] w-[11%] max-lg:hidden">
              <div data-float data-enter>
                <CocoChunk className="w-full rotate-12" />
              </div>
            </div>
          </div>
        </div>

        <p
          aria-hidden
          data-fade
          data-enter
          className="font-cjk vertical-cjk absolute right-[max(0.5rem,calc(var(--gutter)*0.35))] top-28 hidden text-xl text-matcha-fonce/80 md:block lg:top-36 lg:text-2xl"
        >
          {site.cjkName}
        </p>
      </div>
      <StrataDivider layers={["#ebbfc6", "#a9bd6e"]} to="#fdf6ea" className="absolute inset-x-0 bottom-0" />
    </section>
  );
}
