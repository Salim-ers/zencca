"use client";

import { useRef } from "react";
import Mascot, { type MascotHandle } from "@/components/brand/Mascot";
import TransitionLink from "@/components/transition/TransitionLink";
import { Arrow, FadeIn, InfuseImage, Magnetic, Parallax, RevealText } from "@/components/ui/motion";
import { WaveEdge } from "@/components/ui/Strata";
import { photos } from "@/data/images";
import { categories } from "@/data/products";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

const strata = [
  { label: "Thé", note: "oolong, jasmin, thé vert", color: "#c88a3a" },
  { label: "Matcha", note: "battu, en couche", color: "#8fab47" },
  { label: "Fruits frais", note: "raisin, pêche, mangue", color: "#e5707d" },
  { label: "Coco", note: "lait, eau, gelée", color: "#f6f1e6" },
  { label: "Lait & mousse", note: "pour finir en douceur", color: "#efe2cf" },
];

/** Le gobelet se remplit couche après couche au défilement. */
function StrataCup() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const layers = gsap.utils.toArray<SVGRectElement>("[data-l]", root.current);
      const labels = gsap.utils.toArray<HTMLElement>("[data-lab]", root.current);
      if (prefersReducedMotion()) return;
      gsap.set(layers, { scaleY: 0 });
      gsap.set(labels, { autoAlpha: 0.25, x: 0 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 45%", scrub: 0.6 },
      });
      // la couche du bas d'abord
      [...layers].reverse().forEach((l, i) => {
        const lab = labels[labels.length - 1 - i];
        tl.to(l, { scaleY: 1, duration: 1, ease: "power2.out" }, i * 0.8).to(lab, { autoAlpha: 1, x: 8, duration: 0.6 }, i * 0.8 + 0.2);
      });
    },
    { scope: root }
  );
  return (
    <div ref={root} className="grid grid-cols-[auto_1fr] items-stretch gap-5 sm:gap-10">
      <svg viewBox="0 0 220 440" className="h-[min(70vh,560px)] w-auto overflow-visible" aria-hidden>
        <defs>
          <clipPath id="strata-cup">
            <path d="M20 30 H200 L178 420 Q176 432 164 432 H56 Q44 432 42 420 Z" />
          </clipPath>
        </defs>
        <g clipPath="url(#strata-cup)">
          <rect x="0" y="0" width="220" height="440" fill="#fdf6ea" opacity="0.6" />
          {strata.map((s, i) => (
            <rect
              key={s.label}
              data-l
              x="0"
              y={30 + i * 80.4}
              width="220"
              height="81"
              fill={s.color}
              style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
            />
          ))}
        </g>
        <path d="M20 30 H200 L178 420 Q176 432 164 432 H56 Q44 432 42 420 Z" fill="none" stroke="#201409" strokeWidth="4" strokeLinejoin="round" />
        <rect x="8" y="14" width="204" height="20" rx="10" fill="#fdf6ea" stroke="#201409" strokeWidth="4" />
      </svg>
      <ul className="flex h-[min(70vh,560px)] flex-col">
        {strata.map((s) => (
          <li key={s.label} data-lab className="flex flex-1 flex-col justify-center border-t border-encre/15 first:border-t-0">
            <p className="font-display text-[clamp(1.6rem,3.4vw,3rem)] leading-none">{s.label}</p>
            <p className="mt-1 text-brun">{s.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MascotStage() {
  const m = useRef<MascotHandle>(null);
  return (
    <section aria-labelledby="mascotte-title" data-tint="#f7e2e3" className="relative bg-sakura-pale py-24 lg:py-36">
      <div className="wrap grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div className="order-2 lg:order-1 lg:col-span-5">
          <RevealText as="h2" id="mascotte-title" className="font-display t-h1" lines={["La", "mascotte"]} lineClassName={["", "pl-[0.6em]"]} />
          <p className="t-lead measure mt-6 text-brun">
            Une petite fille aux couettes, une boisson à la paille. On la retrouve sur l&apos;enseigne jaune, sur chaque
            gobelet, sur la plaque de la porte et sur le rideau du comptoir.
          </p>
          <Magnetic className="mt-8">
            <button type="button" className="btn" onClick={() => m.current?.sip({ duration: 1100 })}>
              Lui offrir une gorgée
            </button>
          </Magnetic>
        </div>
        <div className="relative order-1 mx-auto w-[min(80vw,520px)] lg:order-2 lg:col-span-6 lg:col-start-7 lg:w-full">
          <div aria-hidden className="absolute inset-[6%] rounded-full bg-sakura" />
          <button
            type="button"
            className="relative block w-full cursor-pointer rounded-full p-[8%]"
            onClick={() => m.current?.sip({ duration: 1100 })}
            aria-label="Faire boire la mascotte"
          >
            <Mascot ref={m} variant="logo" liquid="#a9bd6e" level={0.85} followPointer hoverReact decorative />
          </button>
        </div>
      </div>
    </section>
  );
}

export default function Univers() {
  return (
    <>
      {/* Le concept */}
      <section aria-labelledby="concept-title" data-tint="#fdf6ea" className="relative bg-papier py-24 lg:py-36">
        <div className="wrap grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <RevealText as="h2" id="concept-title" className="font-display t-h2" lines={["Un salon de thé,", "tout en couleurs"]} />
            <p className="t-lead measure mt-6 text-brun">
              Matcha, bubble teas, thés aux fruits frais, smoothies au yaourt et créations coco & café. On passe pour une
              boisson à emporter, on reste pour la pause.
            </p>
            <FadeIn className="mt-10 hidden lg:block">
              <InfuseImage photo={photos.cocoLatteService} sizes="30vw" shape="soft" className="aspect-[4/5] w-[70%]" />
            </FadeIn>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <StrataCup />
          </div>
        </div>
      </section>

      <WaveEdge color="#f7e2e3" variant={2} className="-mb-px h-[clamp(40px,6vw,90px)] w-full bg-papier" />
      <MascotStage />

      {/* Les saveurs */}
      <section aria-labelledby="saveurs-u-title" data-tint="#fdf6ea" className="relative bg-papier py-24 lg:py-32">
        <div className="wrap">
          <RevealText as="h2" id="saveurs-u-title" className="font-display t-h2 max-w-[18ch]" lines={["Sept univers,", "une même douceur"]} />
          <ul className="mt-14 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-7">
            {categories.map((c, i) => (
              <li key={c.id}>
                <TransitionLink href={`/la-carte?categorie=${c.id}`} className="group block" theme="matcha" transitionLabel={c.label}>
                  <span
                    aria-hidden
                    className="block aspect-square w-full rounded-full transition-[border-radius,transform] duration-700 ease-[var(--ease-pop)] group-hover:scale-105 group-hover:rounded-[42%_58%_60%_40%/48%_40%_60%_52%]"
                    style={{ background: c.color, transitionDelay: `${i * 20}ms` }}
                  />
                  <span className="mt-4 block font-display text-xl leading-tight">{c.label}</span>
                  {c.cjk && (
                    <span className="font-cjk mt-1 block text-sm text-brun/70" aria-hidden>
                      {c.cjk}
                    </span>
                  )}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* La boutique */}
      <section aria-labelledby="boutique-title" data-tint="#f1d29b" className="relative bg-ocre py-24 lg:py-36">
        <WaveEdge color="#e6b465" variant={0} className="absolute inset-x-0 bottom-full h-[clamp(40px,6vw,90px)] w-full" />
        <div className="wrap grid grid-cols-1 gap-x-8 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:pt-10">
            <RevealText as="h2" id="boutique-title" className="font-display t-h1" lines={["La", "boutique"]} lineClassName={["", "pl-[0.6em]"]} />
            <p className="t-lead measure mt-6 text-store">
              Une façade ocre et un store prune, des portes en bois, des arches à l&apos;intérieur, un sol en terrazzo et
              une grande fresque fleurie derrière une grille de métal.
            </p>
          </div>
          <figure className="lg:col-span-6 lg:col-start-7">
            <InfuseImage photo={photos.salonFresque} sizes="(min-width: 1024px) 46vw, 92vw" shape="arch" parallax={8} className="aspect-[4/5]" />
            <figcaption className="mt-3 text-store">Le comptoir, le banc en bois et la fresque</figcaption>
          </figure>
          <Parallax speed={-0.15} disableOnTouch className="lg:col-span-4 lg:col-start-2 lg:-mt-64">
            <figure>
              <InfuseImage photo={photos.facadeJour} sizes="(min-width: 1024px) 30vw, 92vw" shape="soft" className="aspect-[3/4]" />
              <figcaption className="mt-3 text-store">L&apos;entrée, rue Tiquetonne</figcaption>
            </figure>
          </Parallax>
          <figure className="lg:col-span-3 lg:col-start-8 lg:mt-10">
            <InfuseImage photo={photos.enseigne} sizes="(min-width: 1024px) 22vw, 92vw" shape="arch-full" className="aspect-[3/4]" />
            <figcaption className="mt-3 text-store">L&apos;enseigne jaune</figcaption>
          </figure>
        </div>
      </section>
      <div aria-hidden className="terrazzo h-20 w-full lg:h-28" />

      {/* Sur place */}
      <section aria-labelledby="surplace-title" data-tint="#fdf6ea" className="relative bg-creme pb-40 pt-24 lg:pb-48 lg:pt-36">
        <div className="wrap grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <InfuseImage photo={photos.facadeTerrasse} sizes="(min-width: 1024px) 56vw, 92vw" shape="soft" className="aspect-[4/5] sm:aspect-[5/4]" parallax={6} />
          </div>
          <div className="flex flex-col justify-end lg:col-span-4 lg:col-start-9">
            <RevealText as="h2" id="surplace-title" className="font-display t-h2" lines={["Sur place", "ou à emporter"]} />
            <p className="t-lead mt-6 text-brun">
              Quelques chaises en terrasse aux beaux jours, des gobelets illustrés pour les boissons chaudes et un sac
              Zencca pour repartir les mains pleines.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-4">
              <InfuseImage photo={photos.gobeletIllustre} sizes="20vw" shape="arch-full" className="aspect-[3/4]" />
              <InfuseImage photo={photos.toteBag} sizes="20vw" shape="soft" className="mt-10 aspect-[3/4]" />
            </div>
            <Magnetic className="mt-10">
              <TransitionLink href="/nous-trouver" className="btn btn-sign" theme="store" transitionImage={photos.facadeSoir.src}>
                Nous rendre visite <Arrow />
              </TransitionLink>
            </Magnetic>
          </div>
        </div>
      </section>
    </>
  );
}
