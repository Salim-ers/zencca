"use client";

import Image from "next/image";
import { useRef } from "react";
import TransitionLink from "@/components/transition/TransitionLink";
import { Arrow, Magnetic, RevealText } from "@/components/ui/motion";
import { photos, type PhotoKey } from "@/data/images";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const frames: { photo: PhotoKey; caption: string; w: string; h: string; shape: string; offset: string }[] = [
  { photo: "facadeTerrasse", caption: "La façade ocre et ses chaises de terrasse", w: "lg:w-[34vw]", h: "lg:h-[72vh]", shape: "tuile", offset: "lg:self-end" },
  { photo: "enseigne", caption: "L'enseigne jaune, repère de la rue", w: "lg:w-[22vw]", h: "lg:h-[46vh]", shape: "rounded-[2rem]", offset: "lg:self-start lg:mt-[8vh]" },
  { photo: "salonFresque", caption: "Plafond lumineux, banc en bois et fresque fleurie", w: "lg:w-[30vw]", h: "lg:h-[62vh]", shape: "tuile-d", offset: "lg:self-center" },
  { photo: "facadeJour", caption: "Portes en bois grandes ouvertes sur le comptoir", w: "lg:w-[26vw]", h: "lg:h-[52vh]", shape: "rounded-[2rem]", offset: "lg:self-end lg:mb-[4vh]" },
];

export default function Salon() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = root.current!.querySelector<HTMLElement>("[data-track]")!;
        const pin = root.current!.querySelector<HTMLElement>("[data-pin]")!;
        const dist = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 0.7,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        gsap.utils.toArray<HTMLElement>("[data-frame-img]", track).forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: "none",
              scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
            }
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} aria-labelledby="salon-title" data-tint="#fdf6ea" className="relative bg-creme">
      <div data-pin className="relative overflow-hidden lg:h-[100svh]">
        <div
          data-track
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] py-24 lg:h-full lg:snap-none lg:items-stretch lg:gap-[5vw] lg:overflow-visible lg:py-[12vh] motion-reduce:lg:overflow-x-auto"
        >
          <div className="flex w-[82vw] shrink-0 snap-start flex-col justify-center sm:w-[60vw] lg:w-[36vw]">
            <p className="font-cjk text-xl text-store" aria-hidden>
              甄茶
            </p>
            <RevealText as="h2" id="salon-title" className="font-display t-h1 mt-3" lines={["Le salon", "de thé"]} />
            <p className="t-lead mt-6 max-w-[24rem] text-brun">
              Au 20 rue Tiquetonne : une façade ocre, des arches, un sol en terrazzo et une grande fresque bleue.
            </p>
            <Magnetic className="mt-8 self-start">
              <TransitionLink href="/notre-univers" className="btn">
                Découvrir notre univers <Arrow />
              </TransitionLink>
            </Magnetic>
          </div>

          {frames.map((f) => (
            <figure
              key={f.photo}
              className={cn("flex shrink-0 snap-center flex-col", "w-[74vw] sm:w-[48vw]", f.w, f.offset)}
            >
              <div
                className={cn(
                  "relative aspect-[3/4] w-full overflow-hidden lg:aspect-auto",
                  f.h,
                  f.shape
                )}
              >
                <div data-frame-img className="absolute -inset-x-[10%] inset-y-0">
                  <Image
                    src={photos[f.photo].src}
                    alt={photos[f.photo].alt}
                    fill
                    sizes="(min-width: 1024px) 36vw, 74vw"
                    placeholder="blur"
                    className="object-cover"
                    style={{ objectPosition: photos[f.photo].focus }}
                  />
                </div>
              </div>
              <figcaption className="mt-4 max-w-[22rem] text-[0.95rem] text-brun">{f.caption}</figcaption>
            </figure>
          ))}
          <div aria-hidden className="w-[2vw] shrink-0" />
        </div>
      </div>
    </section>
  );
}
