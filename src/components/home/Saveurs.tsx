"use client";

import Image from "next/image";
import { useRef } from "react";
import TransitionLink from "@/components/transition/TransitionLink";
import { Arrow } from "@/components/ui/motion";
import { photos, type PhotoKey } from "@/data/images";
import { gsap, useGSAP } from "@/lib/gsap";
import { previewOf } from "@/lib/utils";
import { useLocale, useT } from "@/i18n/client";

type Chapter = {
  cjk?: string;
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
    cjk: "抹茶",
    bg: "#c6d394",
    deep: "#b3c47c",
    ink: "#263211",
    photo: "eauCocoMatcha",
    side: "pMatchaLatte",
    layer: "#7f9a3a",
    href: "/la-carte?categorie=matcha",
  },
  {
    cjk: "椰",
    bg: "#f1e7d6",
    deep: "#e7d9c1",
    ink: "#3b2214",
    photo: "lacteMousse",
    side: "pCocoLatte",
    layer: "#f6f1e6",
    href: "/la-carte?categorie=coco-cafe",
  },
  {
    cjk: "鲜果",
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
  const locale = useLocale();
  const t = useT().saveurs;
  // Textes de chaque chapitre dans la langue de la page
  const copy = t.chapters;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);
        const stage = q("[data-stage]")[0] as HTMLElement;
        const words = q("[data-word]");
        const lines = q("[data-line]");
        const imgs = q("[data-photo]");
        const bgs = q("[data-bg]");
        const sides = q("[data-side]");
        const fills = q("[data-fill]");
        const ctas = q("[data-cta]");

        gsap.set(words.slice(1), { yPercent: 100 });
        gsap.set(lines.slice(1), { autoAlpha: 0, y: 30 });
        gsap.set(ctas.slice(1), { autoAlpha: 0 });
        // La fenêtre monte et la photo redescend d'autant : elle se remplit sur place, sans être repeinte
        gsap.set(imgs.slice(1), { yPercent: 100 });
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
          tl.to(bgs[i - 1], { opacity: 1, duration: 1 }, at)
            .to(words[i - 1], { yPercent: -100, duration: 1 }, at)
            .to(words[i], { yPercent: 0, duration: 1 }, at)
            .to(lines[i - 1], { autoAlpha: 0, y: -30, duration: 0.4 }, at)
            .to(lines[i], { autoAlpha: 1, y: 0, duration: 0.5 }, at + 0.5)
            .to(ctas[i - 1], { autoAlpha: 0, duration: 0.3 }, at)
            .to(ctas[i], { autoAlpha: 1, duration: 0.4 }, at + 0.6)
            .to(imgs[i], { yPercent: 0, duration: 1, ease: "power3.inOut" }, at)
            .fromTo(imgs[i].querySelector("img"), { yPercent: -100, scale: 1.25 }, { yPercent: 0, scale: 1, duration: 1, ease: "power3.inOut" }, at)
            .to(sides[i - 1], { autoAlpha: 0, y: -60, rotate: -6, duration: 0.6 }, at)
            .to(sides[i], { autoAlpha: 1, y: 0, rotate: i % 2 ? -4 : 5, duration: 0.8 }, at + 0.3)
            .to(fills[i], { scaleY: 1, duration: 1 }, at)
            .set(q("[data-ink]"), { color: c.ink }, at + 0.5);
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
        {t.srTitle}
      </h2>

      {/* ── Desktop : séquence épinglée */}
      <div data-stage className="relative hidden h-[100svh] overflow-hidden motion-safe:lg:block" style={{ backgroundColor: chapters[0].bg }}>
        {/* Les fonds se fondent par opacité : une simple couche de couleur à recomposer */}
        {chapters.slice(1).map((c) => (
          <div key={c.bg} data-bg aria-hidden className="absolute inset-0 opacity-0 will-change-[opacity]" style={{ backgroundColor: c.bg }} />
        ))}
        <div data-ink className="wrap relative grid h-full grid-cols-12 items-center gap-8" style={{ color: chapters[0].ink }}>
          {/* Mot géant */}
          <div className="pointer-events-none absolute inset-x-0 top-[9%]" aria-hidden>
            <div className="relative h-[0.9em] overflow-hidden font-display t-mega opacity-[0.16]">
              {chapters.map((c, i) => (
                <span key={c.bg} data-word className="absolute inset-x-0 top-0 text-center leading-[0.86]">
                  {copy[i].word}
                </span>
              ))}
            </div>
          </div>

          <div className="relative z-10 col-span-4 self-end pb-[12vh]">
            <div className="relative min-h-[15rem]">
              {chapters.map((c, i) => (
                <div key={c.bg} data-line className="absolute inset-x-0 top-0">
                  <p className="font-cjk text-2xl" aria-hidden>
                    {c.cjk}
                  </p>
                  <p className="font-display t-h2 mt-2">{copy[i].word}</p>
                  <p className="t-lead mt-4 max-w-[22rem]">{copy[i].line}</p>
                </div>
              ))}
            </div>
            <div className="relative mt-6 h-14">
              {chapters.map((c, i) => (
                <div key={c.bg} data-cta className="absolute left-0 top-0">
                  <TransitionLink href={c.href} className="btn">
                    {copy[i].cta} <Arrow />
                  </TransitionLink>
                </div>
              ))}
            </div>
          </div>

          {/* Tuile centrale : les photos se remplissent comme un gobelet */}
          <div className="relative col-span-4 col-start-5 h-[74vh] self-end">
            <div className="tuile absolute inset-0">
              {chapters.map((c, i) => (
                <div key={c.bg} data-photo className="absolute inset-0 overflow-hidden" style={{ zIndex: i }}>
                  <Image
                    src={photos[c.photo].src}
                    alt={photos[c.photo].alt[locale]}
                    fill
                    sizes="34vw"
                    placeholder={previewOf(photos[c.photo].src)}
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
                  key={c.bg}
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
                <div key={c.bg} className="relative flex-1 overflow-hidden rounded-sm">
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
            key={c.bg}
            className="sticky top-0 flex min-h-[100svh] flex-col justify-center overflow-hidden py-24"
            style={{ backgroundColor: c.bg, color: c.ink, zIndex: i }}
          >
            <div className="wrap">
              <p aria-hidden className="font-display t-mega pointer-events-none absolute -right-4 top-14 opacity-[0.16]">
                {copy[i].word}
              </p>
              <div className="relative mx-auto aspect-[3/4] w-[72%] max-w-sm sm:w-[56%]">
                <div className="tuile absolute inset-0">
                  <Image
                    src={photos[c.photo].src}
                    alt={photos[c.photo].alt[locale]}
                    fill
                    sizes="(min-width: 640px) 56vw, 72vw"
                    placeholder={previewOf(photos[c.photo].src)}
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
                <p className="font-display t-h2 mt-1">{copy[i].word}</p>
                <p className="t-lead mt-3 max-w-[26rem]">{copy[i].line}</p>
                <TransitionLink href={c.href} className="btn mt-6">
                  {copy[i].cta} <Arrow />
                </TransitionLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
