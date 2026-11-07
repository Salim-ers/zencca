"use client";

import { useRef } from "react";
import { InfuseImage, Parallax } from "@/components/ui/motion";
import { WaveEdge } from "@/components/ui/Strata";
import { photos } from "@/data/images";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";
import { onVisible } from "@/lib/visible";
import { useT } from "@/i18n/client";

/** La phrase du néon reste en français dans les deux langues : c'est celle de l'enseigne. */
const NEON = "Une rencontre infusée dans le thé.";

/**
 * LA SIGNATURE — la phrase du néon de la boutique, rallumée à l'écran.
 * Fond ocre des murs, sol terrazzo, détails de la boutique.
 */
export default function Signature() {
  const root = useRef<HTMLElement>(null);
  const t = useT().signature;

  useGSAP(
    (_ctx, contextSafe) => {
      if (prefersReducedMotion()) return;
      const neon = root.current!.querySelector<HTMLElement>("[data-neon]");
      const glow = root.current!.querySelector<HTMLElement>("[data-neon-glow]");
      gsap.set(neon, { opacity: 0.18 });
      // Le néon s'allume quand la phrase atteint les trois quarts de l'écran
      return onVisible(
        neon,
        contextSafe!(() => {
          gsap
            .timeline()
            .to(neon, { opacity: 1, duration: 0.06 })
            .to(neon, { opacity: 0.3, duration: 0.08 })
            .to(neon, { opacity: 1, duration: 0.05 })
            .to(neon, { opacity: 0.55, duration: 0.12, delay: 0.1 })
            .to(neon, { opacity: 1, duration: 0.3 })
            .to(glow, { opacity: 1, duration: 0.6, ease: "power2.out" }, "<");
        }),
        0.25
      );
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
            {t.srTitle}
          </h2>
          <div className="relative">
            <p
              data-neon
              lang="fr"
              className="font-display font-display-wonk t-h1 italic text-encre [text-wrap:balance]"
              style={{ fontWeight: 420 }}
            >
              {NEON}
            </p>
            <p
              data-neon-glow
              aria-hidden
              className="font-display font-display-wonk t-h1 pointer-events-none absolute inset-0 italic text-encre opacity-0 will-change-[opacity] [text-wrap:balance]"
              style={{ fontWeight: 420, textShadow: "0 0 22px rgba(255,240,190,0.95), 0 0 60px rgba(255,226,140,0.7)" }}
            >
              {NEON}
            </p>
          </div>
          <p className="t-lead measure mt-8 text-store">{t.lead}</p>

          <div className="mt-14 grid grid-cols-2 gap-5 sm:gap-8">
            <Parallax speed={-0.12} disableOnTouch>
              <figure>
                <InfuseImage photo={photos.toteBag} sizes="(min-width: 1024px) 20vw, 45vw" shape="soft" className="aspect-[3/4]" />
                <figcaption className="mt-3 text-[0.95rem] text-store">{t.bag}</figcaption>
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
                <figcaption className="mt-3 text-[0.95rem] text-store">{t.mural}</figcaption>
              </figure>
            </Parallax>
          </div>
        </div>
      </div>
      <div aria-hidden className="terrazzo h-16 w-full opacity-90 lg:h-24" style={{ ["--terrazzo-bg" as string]: "#8f8a83" }} />
    </section>
  );
}
