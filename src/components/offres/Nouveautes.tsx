"use client";

import Image from "next/image";
import ProductVisual from "@/components/carte/ProductVisual";
import SizePrices from "@/components/carte/SizePrices";
import TempTags from "@/components/carte/TempTags";
import TransitionLink from "@/components/transition/TransitionLink";
import LayerPill from "@/components/ui/LayerPill";
import { Arrow, FadeIn, InfuseImage, Magnetic, RevealText } from "@/components/ui/motion";
import { photos } from "@/data/images";
import type { Offer } from "@/data/offers";
import { categoryById, formatPrice, products, type Product } from "@/data/products";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export default function Nouveautes({ offers, drafts }: { offers: Offer[]; drafts: Offer[] }) {
  const news = products.filter((p) => p.isNew);
  const feature = news.find((p) => p.photo);
  const others = news.filter((p) => p !== feature);
  const shown = [...offers, ...drafts];
  return (
    <>
      <section aria-labelledby="news-title" data-tint="#fdf6ea" className="bg-papier pb-24 pt-14 lg:pb-36">
        <div className="wrap">
          <RevealText as="h2" id="news-title" className="font-display t-h2" lines={["Nouvelles", "sur la carte"]} lineClassName={["", "pl-[0.6em]"]} />
          {feature && (
            <TransitionLink
              href={`/la-carte?boisson=${feature.slug}`}
              theme="matcha"
              transitionLabel={feature.name}
              className="group mt-16 grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-12"
            >
              <div className="relative mx-auto w-[80%] max-w-[26rem] md:col-span-5 md:w-full">
                <span className="absolute -right-2 -top-3 z-10 rotate-[6deg] rounded-full bg-enseigne px-4 py-1.5 text-sm font-semibold text-encre shadow-sm transition-transform duration-500 group-hover:rotate-0">
                  Nouveau
                </span>
                <ProductVisual product={feature} sizes="(min-width: 768px) 30vw, 80vw" className="aspect-[3/4] w-full" />
              </div>
              <div className="md:col-span-6 md:col-start-7">
                <NewsText p={feature} big />
              </div>
            </TransitionLink>
          )}
          <ul className="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p, i) => (
              <li key={p.slug} className={cn(i % 3 === 1 && "lg:mt-16", i % 3 === 2 && "lg:mt-6")}>
                <TransitionLink href={`/la-carte?boisson=${p.slug}`} theme="matcha" transitionLabel={p.name} className="group block">
                  <div className="relative">
                    <span className="absolute -right-2 -top-3 z-10 rotate-[6deg] rounded-full bg-enseigne px-4 py-1.5 text-sm font-semibold text-encre shadow-sm transition-transform duration-500 group-hover:rotate-0">
                      Nouveau
                    </span>
                    <ProductVisual product={p} sizes="(min-width: 1024px) 28vw, (min-width: 640px) 44vw, 92vw" className="aspect-[4/5] w-full" />
                  </div>
                  <div className="mt-6">
                    <NewsText p={p} />
                  </div>
                </TransitionLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="offres-title" data-tint="#f1d29b" className="relative bg-ocre-clair py-24 lg:py-36">
        <div className="wrap">
          <RevealText as="h2" id="offres-title" className="font-display t-h2" lines={["Les offres", "du moment"]} lineClassName={["", "pl-[0.6em]"]} />
          {shown.length === 0 ? (
            <FadeIn className="mt-12 grid grid-cols-1 items-center gap-10 rounded-[2rem] bg-papier p-8 sm:p-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="font-display t-h3">Pas d&apos;offre en cours pour le moment.</p>
                <p className="mt-4 max-w-[32rem] text-brun">
                  Les offres et les nouvelles boissons sont annoncées en premier sur Instagram.
                </p>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn mt-8">
                  Suivre {site.instagram.handle} <Arrow dir="up-right" />
                </a>
              </div>
              <div className="relative mx-auto aspect-square w-48 lg:col-span-4 lg:col-start-9">
                <div className="absolute inset-0 rounded-full bg-sakura" />
                <Image src={photos.pEggTart.src} alt="" fill sizes="200px" className="rounded-full object-cover p-6" />
              </div>
            </FadeIn>
          ) : (
            <ul className="mt-12 flex flex-col gap-10">
              {shown.map((o) => {
                const draft = !o.active || drafts.includes(o);
                return (
                  <li key={o.id} className="relative grid grid-cols-1 items-center gap-8 overflow-hidden rounded-[2rem] bg-papier p-5 sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-10">
                    {draft && (
                      <p className="absolute right-4 top-4 z-10 rounded-full bg-encre px-3 py-1 text-xs font-semibold text-enseigne">
                        Brouillon, non publié
                      </p>
                    )}
                    {o.photo && (
                      <InfuseImage photo={photos[o.photo]} sizes="(min-width: 1024px) 40vw, 90vw" shape="soft" className="aspect-[4/5] lg:col-span-5" />
                    )}
                    <div className="lg:col-span-6 lg:col-start-7">
                      <h3 className="font-display t-h2">{o.title}</h3>
                      <p className="t-lead mt-5 text-brun">{o.description}</p>
                      {o.detail && <p className="mt-2 text-brun">{o.detail}</p>}
                      {o.price !== undefined && <p className="font-display mt-8 text-[clamp(3rem,7vw,6rem)] leading-none">{formatPrice(o.price)}</p>}
                      {(o.validFrom || o.validUntil) && (
                        <p className="mt-4 text-sm text-brun">
                          {o.validFrom && `Du ${new Date(o.validFrom).toLocaleDateString("fr-FR")} `}
                          {o.validUntil && `jusqu'au ${new Date(o.validUntil).toLocaleDateString("fr-FR")}`}
                        </p>
                      )}
                      <Magnetic className="mt-8">
                        <TransitionLink href="/nous-trouver" className="btn btn-sign">
                          En profiter en boutique <Arrow />
                        </TransitionLink>
                      </Magnetic>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}

function NewsText({ p, big }: { p: Product; big?: boolean }) {
  const cat = categoryById(p.category);
  return (
    <div className="flex items-start gap-3">
      <LayerPill layers={p.layers} className={cn("mt-1.5", big && "h-12 w-5")} />
      <div>
        <p className="text-sm font-semibold" style={{ color: cat.ink }}>
          {cat.label}
        </p>
        <h3 className={cn("font-display", big ? "t-h2" : "t-h3")}>{p.name}</h3>
        <p className={cn("mt-2 max-w-[28rem] text-brun", big && "t-lead mt-4")}>{p.description}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <TempTags temps={p.temps} />
          <SizePrices product={p} className="text-[0.95rem]" />
          <span className="inline-flex items-center gap-1 font-semibold">
            <span className="link-infuse group-hover:[background-size:100%_1.5px]">Voir la fiche</span> <Arrow />
          </span>
        </div>
      </div>
    </div>
  );
}
