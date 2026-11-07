"use client";

import Image from "next/image";
import { useRef } from "react";
import { Arrow, Magnetic } from "@/components/ui/motion";
import { photos, type PhotoKey } from "@/data/images";
import { site } from "@/data/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { useLocale, useT } from "@/i18n/client";

const fan: { photo: PhotoKey; rot: number; x: number; y: number }[] = [
  { photo: "thesFruitsDuo", rot: -16, x: -118, y: 18 },
  { photo: "heroSakuraRue", rot: -7, x: -58, y: -4 },
  { photo: "enseigne", rot: 0, x: 0, y: -14 },
  { photo: "raisinSalon", rot: 8, x: 58, y: -2 },
  { photo: "toteBag", rot: 17, x: 118, y: 20 },
];

/** Les photos du salon s'ouvrent en éventail, comme un jeu de cartes posé sur la table. */
export default function InstagramWall() {
  const root = useRef<HTMLElement>(null);
  const locale = useLocale();
  const t = useT().instagram;
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-card]", root.current);
        // Une seule timeline (et un seul déclencheur) pour les cinq cartes
        const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 85%", end: "center 55%", scrub: 0.8 } });
        cards.forEach((c, i) => {
          const f = fan[i];
          tl.fromTo(c, { xPercent: 0, yPercent: 30, rotate: 0 }, { xPercent: f.x, yPercent: f.y, rotate: f.rot, ease: "power2.out" }, 0);
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.utils.toArray<HTMLElement>("[data-card]", root.current).forEach((c, i) => {
          gsap.set(c, { xPercent: fan[i].x, yPercent: fan[i].y, rotate: fan[i].rot });
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} aria-labelledby="insta-title" data-tint="#f7e2e3" className="relative overflow-hidden bg-sakura-pale py-24 lg:py-36">
      <div className="wrap text-center">
        <h2 id="insta-title" className="font-display t-h2 mx-auto max-w-[16ch]">
          {t.title}
        </h2>
        <p className="t-lead mx-auto mt-5 max-w-[30rem] text-brun">{t.lead}</p>
      </div>

      <a
        href={site.instagram.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative mx-auto mt-16 block h-[clamp(260px,42vw,560px)] w-[clamp(150px,22vw,300px)]"
        aria-label={t.aria(site.instagram.handle)}
      >
        {fan.map((f, i) => (
          <div
            key={f.photo}
            data-card
            className="absolute inset-0 overflow-hidden rounded-[1.4rem] bg-papier p-2 shadow-[0_30px_60px_-30px_rgba(79,18,28,0.55)]"
            style={{ zIndex: i === 2 ? 5 : i < 2 ? i + 1 : 5 - (i - 2) }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-[1rem]">
              <Image
                src={photos[f.photo].src}
                alt={photos[f.photo].alt[locale]}
                fill
                sizes="(min-width: 1024px) 22vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: photos[f.photo].focus }}
              />
            </div>
          </div>
        ))}
      </a>

      <div className="wrap mt-16 flex flex-col items-center gap-4 text-center sm:mt-20">
        <p className="font-display text-[clamp(2.2rem,6vw,5rem)] leading-none tracking-tight">{site.instagram.handle}</p>
        <Magnetic>
          <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn mt-2">
            {t.follow} <Arrow dir="up-right" />
          </a>
        </Magnetic>
      </div>
    </section>
  );
}
