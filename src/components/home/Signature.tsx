"use client";

import { useRef } from "react";
import { InfuseImage, Parallax } from "@/components/ui/motion";
import { WaveEdge } from "@/components/ui/Strata";
import { photos } from "@/data/images";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

/**
 * LA SIGNATURE — la phrase du néon de la boutique, rallumée à l'écran.
 * Fond ocre des murs, sol terrazzo, détails de la boutique.
 */
export default function Signature() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const neon = root.current!.querySelector<HTMLElement>("[data-neon]");
      gsap.set(neon, { opacity: 0.18, textShadow: "0 0 0 rgba(255,236,190,0)" });
      ScrollTrigger.create({
        trigger: neon,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap
            .timeline()
            .to(neon, { opacity: 1, duration: 0.06 })
            .to(neon, { opacity: 0.3, duration: 0.08 })
            .to(neon, { opacity: 1, duration: 0.05 })
            .to(neon, { opacity: 0.55, duration: 0.12, delay: 0.1 })
            .to(neon, {
              opacity: 1,
              textShadow: "0 0 22px rgba(255,240,190,0.95), 0 0 60px rgba(255,226,140,0.7)",
              duration: 0.6,
              ease: "power2.out",
            });
        },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} aria-labelledby="signature-title" data-tint="#f1d29b" className="relative bg-ocre text-encre">
      <WaveEdge color="#e6b465" variant={2} className="absolute inset-x-0 bottom-full z-[3] h-[clamp(40px,6vw,96px)] w-full" />
      <div className="wrap grid grid-cols-1 gap-12 pb-24 pt-24 lg:grid-cols-12 lg:gap-8 lg:pb-36 lg:pt-36">
        <div className="relative overflow-x-clip lg:col-span-5 lg:overflow-visible">
          <InfuseImage
            photo={photos.comptoirNeon}
            sizes="(min-width: 1024px) 40vw, 92vw"
            shape="tuile"
            parallax={8}
            className="aspect-[3/4]"
          />
          <p aria-hidden className="font-cjk vertical-cjk absolute -right-3 top-10 text-3xl text-store lg:-right-10 lg:text-4xl">
            甄茶
          </p>
        </div>

        <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
          <h2 id="signature-title" className="sr-only">
            La signature Zencca
          </h2>
          <p
            data-neon
            className="font-display font-display-wonk t-h1 italic text-encre [text-wrap:balance]"
            style={{ fontWeight: 420 }}
          >
            Une rencontre infusée dans le thé.
          </p>
          <p className="t-lead measure mt-8 text-store">
            La phrase brille au-dessus du comptoir. Ici, le thé sert de point de rencontre : entre une pause et une
            gourmandise, entre la rue Tiquetonne et des saveurs venues d&apos;Asie.
          </p>

          <div className="mt-14 grid grid-cols-2 gap-5 sm:gap-8">
            <Parallax speed={-0.12} disableOnTouch>
              <figure>
                <InfuseImage photo={photos.toteBag} sizes="(min-width: 1024px) 20vw, 45vw" shape="soft" className="aspect-[3/4]" />
                <figcaption className="mt-3 text-[0.95rem] text-store">Le sac illustré</figcaption>
              </figure>
            </Parallax>
            <Parallax speed={0.14} disableOnTouch className="mt-16">
              <figure>
                <InfuseImage
                  photo={{ ...photos.salonFresque, focus: "92% 55%" }}
                  sizes="(min-width: 1024px) 20vw, 45vw"
                  shape="tuile-d"
                  className="aspect-[3/4]"
                />
                <figcaption className="mt-3 text-[0.95rem] text-store">La fresque du salon</figcaption>
              </figure>
            </Parallax>
          </div>
        </div>
      </div>
      <div aria-hidden className="terrazzo h-16 w-full opacity-90 lg:h-24" style={{ ["--terrazzo-bg" as string]: "#8f8a83" }} />
    </section>
  );
}
