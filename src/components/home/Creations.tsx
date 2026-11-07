"use client";

import Image from "next/image";
import TransitionLink from "@/components/transition/TransitionLink";
import { Arrow, InfuseImage, Parallax, RevealText } from "@/components/ui/motion";
import { photos, type PhotoKey } from "@/data/images";
import { productBySlug } from "@/data/products";
import { cn } from "@/lib/utils";
import SizePrices from "@/components/carte/SizePrices";
import TempTags from "@/components/carte/TempTags";
import LayerPill from "@/components/ui/LayerPill";
import { useLocale, useT } from "@/i18n/client";

type Piece = {
  slug: string;
  photo: PhotoKey;
  shape: "tuile" | "tuile-d" | "soft";
  swatch: string;
  grid: string;
  ratio: string;
  speed: number;
  align?: "left" | "right";
};

const pieces: Piece[] = [
  {
    slug: "the-au-raisin-frais",
    photo: "raisinSalon",
    shape: "tuile",
    swatch: "#b8344a",
    grid: "lg:col-start-7 lg:col-span-5 lg:row-start-1 lg:row-span-2",
    ratio: "aspect-[4/5]",
    speed: 0.12,
  },
  {
    slug: "coco-latte",
    photo: "cocoLatteService",
    shape: "soft",
    swatch: "#d9c3a5",
    grid: "lg:col-start-1 lg:col-span-5 lg:row-start-2 lg:row-span-2 lg:mt-24",
    ratio: "aspect-[3/4]",
    speed: -0.08,
    align: "right",
  },
  {
    slug: "the-oolong-peche",
    photo: "oolongPecheRue",
    shape: "tuile-d",
    swatch: "#f3a983",
    grid: "lg:col-start-8 lg:col-span-4 lg:row-start-3 lg:row-span-2 lg:mt-40",
    ratio: "aspect-[3/4.4]",
    speed: 0.2,
  },
  {
    slug: "lait-perles-sucre-brun",
    photo: "gobeletIllustre",
    shape: "tuile",
    swatch: "#e6b465",
    grid: "lg:col-start-2 lg:col-span-4 lg:row-start-4 lg:row-span-2 lg:mt-16",
    ratio: "aspect-[3/4]",
    speed: 0.05,
    align: "right",
  },
];

export default function Creations() {
  const locale = useLocale();
  const t = useT().creations;
  return (
    <section aria-labelledby="creations-title" data-tint="#fdf6ea" className="relative bg-papier pb-28 pt-16 lg:pb-44 lg:pt-24">
      <div className="wrap grid grid-cols-1 gap-x-8 gap-y-20 lg:grid-cols-12 lg:gap-y-0">
        <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:pt-10">
          <RevealText as="h2" id="creations-title" className="font-display t-h1" lines={t.title} />
          <p className="t-lead measure mt-6 text-brun">
            {t.lead}
          </p>
          <TransitionLink href="/la-carte" className="btn btn-ghost mt-8">
            {t.seeAll} <Arrow />
          </TransitionLink>
        </div>

        {pieces.map((p) => {
          const prod = productBySlug(p.slug)!;
          return (
            <article key={p.slug} className={cn("relative", p.grid)}>
              <Parallax speed={p.speed} disableOnTouch>
                <TransitionLink
                  href={`/la-carte?boisson=${p.slug}`}
                  theme="matcha"
                  transitionLabel={prod.name[locale]}
                  className={cn("group block", p.align === "right" && "lg:text-right")}
                >
                  <div className={cn("relative mx-auto w-[86%] sm:w-[70%] lg:w-full", p.align === "right" ? "ml-auto mr-0" : "ml-0")}>
                    {/* pastille couleur de la boisson */}
                    <div
                      aria-hidden
                      className={cn(
                        "absolute -bottom-6 -right-6 h-[62%] w-[70%] rounded-[1.1rem] transition-transform duration-700 ease-[var(--ease-soft)] group-hover:-translate-x-3 group-hover:-translate-y-3",
                        p.align === "right" && "-left-6 right-auto group-hover:translate-x-3"
                      )}
                      style={{ background: p.swatch }}
                    />
                    <InfuseImage
                      photo={photos[p.photo]}
                      sizes="(min-width: 1024px) 34vw, 80vw"
                      shape={p.shape}
                      className={cn("relative", p.ratio)}
                      hoverZoom
                    />
                  </div>

                  <div className={cn("mt-10 max-w-[26rem]", p.align === "right" && "lg:ml-auto")}>
                    <div className={cn("flex items-center gap-3", p.align === "right" && "lg:flex-row-reverse")}>
                      <LayerPill layers={prod.layers} className="transition-transform duration-500 ease-[var(--ease-pop)] group-hover:-rotate-12" />
                      <div>
                        {prod.cjk && (
                          <p className="font-cjk text-sm text-brun/70" aria-hidden>
                            {prod.cjk}
                          </p>
                        )}
                        <h3 className="font-display t-h3 mt-0.5">{prod.name[locale]}</h3>
                      </div>
                    </div>
                    <p className="mt-3 text-brun">{prod.description[locale]}</p>
                    <div className={cn("mt-4 flex flex-wrap items-center gap-x-4 gap-y-2", p.align === "right" && "lg:justify-end")}>
                      <TempTags temps={prod.temps} />
                      <SizePrices product={prod} className="text-[0.95rem]" />
                      <span className="inline-flex items-center gap-1.5 font-semibold">
                        <span className="link-infuse group-hover:[background-size:100%_1.5px]">{t.seeDrink}</span>
                        <Arrow />
                      </span>
                    </div>
                  </div>
                </TransitionLink>
              </Parallax>
            </article>
          );
        })}

        {/* Clin d'œil : les suppléments, en perles */}
        <div className="relative hidden items-end lg:col-span-4 lg:col-start-8 lg:row-start-5 lg:flex">
          <figure className="flex items-center gap-5">
            <div className="tuile relative h-28 w-20 shrink-0 [--coin:1.4rem] [--tuile-r:0.6rem]">
              <Image src={photos.pMatchaLatte.src} alt="" fill sizes="80px" className="object-cover" />
            </div>
            <figcaption className="text-brun">
              {t.supplements}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
