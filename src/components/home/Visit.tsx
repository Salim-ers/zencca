"use client";

import TransitionLink from "@/components/transition/TransitionLink";
import { Arrow, InfuseImage, Magnetic, RevealText } from "@/components/ui/motion";
import { WaveEdge } from "@/components/ui/Strata";
import OpenStatus from "@/components/location/OpenStatus";
import { photos } from "@/data/images";
import { site } from "@/data/site";

export default function Visit() {
  return (
    <section aria-labelledby="visit-title" data-tint="#f1d29b" className="on-dark relative bg-store text-papier">
      <WaveEdge color="#4d2724" variant={1} className="absolute inset-x-0 bottom-full h-[clamp(40px,6vw,90px)] w-full" />
      <div className="wrap grid grid-cols-1 items-center gap-14 py-20 lg:grid-cols-12 lg:gap-8 lg:py-32">
        <div className="lg:col-span-6">
          <p className="font-cjk text-lg text-ocre-clair" aria-hidden>
            Salon de Thé {site.cjkName}
          </p>
          <RevealText as="h2" id="visit-title" className="font-display t-h1 mt-4" lines={["20 rue", "Tiquetonne"]} />
          <p className="t-lead mt-6 text-papier/85">
            {site.address.postalCode} {site.address.city}, à deux pas d&apos;Étienne Marcel et de Châtelet.
          </p>
          <OpenStatus tone="light" className="mt-5 text-papier [&_.bg-matcha-fonce]:bg-[#c6d394]" />
          <div className="mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <a href={site.maps.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sign">
                Itinéraire <Arrow dir="up-right" />
              </a>
            </Magnetic>
            <Magnetic>
              <TransitionLink href="/nous-trouver" theme="store" transitionImage={photos.facadeSoir.src} className="btn btn-ghost-light">
                Nous trouver
              </TransitionLink>
            </Magnetic>
          </div>
        </div>
        <div className="relative lg:col-span-5 lg:col-start-8">
          <InfuseImage photo={photos.facadeSoir} sizes="(min-width: 1024px) 38vw, 90vw" shape="tuile" parallax={6} className="aspect-[3/4]" />
        </div>
      </div>
    </section>
  );
}
