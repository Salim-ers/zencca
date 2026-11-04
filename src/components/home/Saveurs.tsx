"use client";

import Image from "next/image";
import { useRef } from "react";
import TransitionLink from "@/components/transition/TransitionLink";
import { Arrow } from "@/components/ui/motion";
import { photos, type PhotoKey } from "@/data/images";
import { gsap, useGSAP } from "@/lib/gsap";

type Chapter = {
  word: string;
  cjk?: string;
  line: string;
  bg: string;
  deep: string;
  ink: string;
  photo: PhotoKey;
  side: PhotoKey;
  layer: string;
  href: string;
};

const chapters: Chapter[] = [
  {
    word: "Matcha",
    cjk: "抹茶",
    line: "Un vert franc, battu puis posé en couche sur le lait ou l'eau de coco.",
    bg: "#c6d394",
    deep: "#b3c47c",
    ink: "#263211",
    photo: "eauCocoMatcha",
    side: "pMatchaLatte",
    layer: "#7f9a3a",
    href: "/la-carte?categorie=matcha",
  },
  {
    word: "Coco",
    cjk: "椰",
    line: "Lait de coco épais, mousse légère, café versé à la dernière seconde.",
    bg: "#f1e7d6",
    deep: "#e7d9c1",
    ink: "#3b2214",
    photo: "lacteMousse",
    side: "pCocoLatte",
    layer: "#f6f1e6",
    href: "/la-carte?categorie=coco-cafe",
  },
  {
    word: "Fruits",
    cjk: "鲜果",
    line: "Raisin, pêche, mangue : des fruits frais, en granité, en pulpe ou en morceaux.",
    bg: "#f4b9a8",
    deep: "#eda692",
    ink: "#4f121c",
    photo: "raisinDetail",
    side: "thesFruitsDuo",
    layer: "#b8344a",
    href: "/la-carte?categorie=fruits",
  },
];

export default function Saveurs() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);
        const stage = q("[data-stage]")[0] as HTMLElement;
        const words = q("[data-word]");
        const lines = q("[data-line]");
        const imgs = q("[data-photo]");
        const sides = q("[data-side]");
        const fills = q("[data-fill]");
        const ctas = q("[data-cta]");

        gsap.set(words.slice(1), { yPercent: 100 });
        gsap.set(lines.slice(1), { autoAlpha: 0, y: 30 });
        gsap.set(ctas.slice(1), { autoAlpha: 0 });
        gsap.set(imgs.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(sides[0], { rotate: 5 });
        gsap.set(sides.slice(1), { autoAlpha: 0, y: 80, rotate: 6 });
        gsap.set(fills, { scaleY: 0 });
        gsap.set(fills[0], { scaleY: 1 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${window.innerHeight * 2.6}`,
            pin: stage,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        chapters.forEach((c, i) => {
          if (i === 0) return;
          const at = i * 1.2 - 0.6;
          tl.to(stage, { backgroundColor: c.bg, duration: 1 }, at)
            .to(words[i - 1], { yPercent: -100, duration: 1 }, at)
            .to(words[i], { yPercent: 0, duration: 1 }, at)
            .to(lines[i - 1], { autoAlpha: 0, y: -30, duration: 0.4 }, at)
            .to(lines[i], { autoAlpha: 1, y: 0, duration: 0.5 }, at + 0.5)
            .to(ctas[i - 1], { autoAlpha: 0, duration: 0.3 }, at)
            .to(ctas[i], { autoAlpha: 1, duration: 0.4 }, at + 0.6)
            .to(imgs[i], { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power3.inOut" }, at)
            .fromTo(imgs[i].querySelector("img"), { scale: 1.25 }, { scale: 1, duration: 1.2 }, at)
            .to(sides[i - 1], { autoAlpha: 0, y: -60, rotate: -6, duration: 0.6 }, at)
            .to(sides[i], { autoAlpha: 1, y: 0, rotate: i % 2 ? -4 : 5, duration: 0.8 }, at + 0.3)
            .to(fills[i], { scaleY: 1, duration: 1 }, at)
            .to(q("[data-ink]"), { color: c.ink, duration: 1 }, at);
        });
        tl.to({}, { duration: 0.5 });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} aria-labelledby="saveurs-title" data-tint="#dfe5c3" className="relative">
      <h2 id="saveurs-title" className="sr-only">
        Les saveurs Zencca : matcha, coco et fruits
      </h2>

      {/* ── Desktop : séquence épinglée */}
      <div data-stage className="relative hidden h-[100svh] overflow-hidden motion-safe:lg:block" style={{ backgroundColor: chapters[0].bg }}>
        <div data-ink className="wrap relative grid h-full grid-cols-12 items-center gap-8" style={{ color: chapters[0].ink }}>
          {/* Mot géant */}
          <div className="pointer-events-none absolute inset-x-0 top-[9%]" aria-hidden>
            <div className="relative h-[0.9em] overflow-hidden font-display t-mega opacity-[0.16]">
              {chapters.map((c) => (
                <span key={c.word} data-word className="absolute inset-x-0 top-0 text-center leading-[0.86]">
                  {c.word}
                </span>
              ))}
            </div>
          </div>

          <div className="relative z-10 col-span-4 self-end pb-[12vh]">
            <div className="relative min-h-[15rem]">
              {chapters.map((c) => (
                <div key={c.word} data-line className="absolute inset-x-0 top-0">
                  <p className="font-cjk text-2xl" aria-hidden>
                    {c.cjk}
                  </p>
                  <p className="font-display t-h2 mt-2">{c.word}</p>
                  <p className="t-lead mt-4 max-w-[22rem]">{c.line}</p>
                </div>
              ))}
            </div>
            <div className="relative mt-6 h-14">
              {chapters.map((c) => (
                <div key={c.word} data-cta className="absolute left-0 top-0">
                  <TransitionLink href={c.href} className="btn">
                    Les boissons {c.word.toLowerCase()} <Arrow />
                  </TransitionLink>
                </div>
              ))}
            </div>
          </div>

          {/* Arche centrale : les photos se remplissent comme un gobelet */}
          <div className="relative col-span-4 col-start-5 h-[74vh] self-end">
            <div className="arch-full absolute inset-0">
              {chapters.map((c, i) => (
                <div key={c.word} data-photo className="absolute inset-0 overflow-hidden" style={{ zIndex: i }}>
                  <Image
                    src={photos[c.photo].src}
                    alt={photos[c.photo].alt}
                    fill
                    sizes="34vw"
                    placeholder="blur"
                    className="object-cover"
                    style={{ objectPosition: photos[c.photo].focus }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Photo satellite + jauge de couches */}
          <div className="relative col-span-3 col-start-10 flex h-full items-center justify-between">
            <div className="relative h-[30vh] w-[70%]">
              {chapters.map((c, i) => (
                <div
                  key={c.word}
                  data-side
                  className="absolute inset-0 overflow-hidden rounded-[1.5rem] shadow-[0_30px_60px_-30px_rgba(32,20,9,0.5)]"
                  style={{ zIndex: i }}
                >
                  <Image src={photos[c.side].src} alt="" fill sizes="18vw" className="object-cover" />
                </div>
              ))}
            </div>
            <div className="flex h-[46vh] w-10 flex-col-reverse overflow-hidden rounded-b-[1.2rem] rounded-t-md border-2 border-current p-1" aria-hidden>
              {chapters.map((c) => (
                <div key={c.word} className="relative flex-1 overflow-hidden rounded-sm">
                  <div data-fill className="absolute inset-0 origin-bottom" style={{ background: c.layer }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile / tablette / mouvement réduit : panneaux empilés */}
      <div className="motion-safe:lg:hidden">
        {chapters.map((c, i) => (
          <div
            key={c.word}
            className="sticky top-0 flex min-h-[100svh] flex-col justify-center overflow-hidden py-24"
            style={{ backgroundColor: c.bg, color: c.ink, zIndex: i }}
          >
            <div className="wrap">
              <p aria-hidden className="font-display t-mega pointer-events-none absolute -right-4 top-14 opacity-[0.16]">
                {c.word}
              </p>
              <div className="relative mx-auto aspect-[3/4] w-[72%] max-w-sm sm:w-[56%]">
                <div className="arch-full absolute inset-0">
                  <Image
                    src={photos[c.photo].src}
                    alt={photos[c.photo].alt}
                    fill
                    sizes="(min-width: 640px) 56vw, 72vw"
                    placeholder="blur"
                    className="object-cover"
                    style={{ objectPosition: photos[c.photo].focus }}
                  />
                </div>
                <div className="absolute -bottom-6 -right-8 h-28 w-20 rotate-6 overflow-hidden rounded-2xl ring-4 sm:h-36 sm:w-28" style={{ ["--tw-ring-color" as string]: c.bg }}>
                  <Image src={photos[c.side].src} alt="" fill sizes="112px" className="object-cover" />
                </div>
              </div>
              <div className="relative mt-12">
                <p className="font-cjk text-xl" aria-hidden>
                  {c.cjk}
                </p>
                <p className="font-display t-h2 mt-1">{c.word}</p>
                <p className="t-lead mt-3 max-w-[26rem]">{c.line}</p>
                <TransitionLink href={c.href} className="btn mt-6">
                  Les boissons {c.word.toLowerCase()} <Arrow />
                </TransitionLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
