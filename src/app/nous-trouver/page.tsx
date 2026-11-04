import type { Metadata } from "next";
import MapConsent from "@/components/location/MapConsent";
import HoursTable from "@/components/location/HoursTable";
import OpenStatus from "@/components/location/OpenStatus";
import { Arrow, InfuseImage, Parallax, RevealText } from "@/components/ui/motion";
import { StrataDivider } from "@/components/ui/Strata";
import { photos } from "@/data/images";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Nous trouver : 20 rue Tiquetonne, Paris 2e",
  description:
    "Zencca, salon de thé au 20 rue Tiquetonne, 75002 Paris, près des métros Étienne Marcel et Sentier et de Châtelet – Les Halles. Horaires, itinéraire et carte.",
  path: "/nous-trouver",
  image: "/og/zencca-facade.jpg",
});

export default function NousTrouverPage() {
  return (
    <>
      <section data-tint="#f1d29b" data-header-solid className="on-dark relative overflow-hidden bg-store text-papier">
        <div className="wrap grid grid-cols-1 items-center gap-12 pb-[clamp(6rem,12vw,11rem)] pt-32 lg:grid-cols-12 lg:pt-40">
          <div className="lg:col-span-7">
            <p className="font-cjk text-lg text-ocre-clair" aria-hidden>
              Salon de Thé {site.cjkName}
            </p>
            <RevealText as="h1" trigger="reveal" className="font-display t-h1 mt-4" lines={["20 rue", "Tiquetonne"]} lineClassName={["", "pl-[0.6em]"]} />
            <p className="t-lead mt-6 text-papier/85">
              {site.address.postalCode} {site.address.city}, {site.address.country}
            </p>
            <OpenStatus tone="light" className="mt-4 text-papier [&_.bg-matcha-fonce]:bg-[#c6d394]" />
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={site.maps.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sign">
                Itinéraire Google Maps <Arrow dir="up-right" />
              </a>
              <a href={site.maps.appleUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">
                Ouvrir dans Plans
              </a>
              <a href="#carte" className="btn btn-ghost-light">
                Voir la carte
              </a>
            </div>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <InfuseImage photo={photos.facadeSoir} sizes="(min-width: 1024px) 32vw, 80vw" shape="tuile" trigger="reveal" priority className="mx-auto aspect-[3/4] w-[78%] sm:w-[60%] lg:w-full" />
          </div>
        </div>
        <StrataDivider layers={["#8a4a3c", "#e6b465"]} to="#f8ebd3" className="absolute inset-x-0 bottom-0" />
      </section>

      <section id="carte" aria-labelledby="carte-title" data-tint="#fdf6ea" className="relative scroll-mt-24 bg-creme pb-40 pt-16 lg:pb-48 lg:pt-24">
        <div className="wrap grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="relative lg:col-span-7">
            <h2 id="carte-title" className="sr-only">
              Carte et accès
            </h2>
            <MapConsent />
            <Parallax speed={0.18} disableOnTouch className="absolute -bottom-12 -left-2 z-10 w-[34%] max-w-[220px] -rotate-[5deg] sm:-left-8">
              <InfuseImage photo={photos.enseigne} sizes="220px" shape="soft" className="aspect-[3/4] shadow-[0_30px_50px_-25px_rgba(32,20,9,0.6)] ring-[6px] ring-creme" />
            </Parallax>
          </div>

          <div className="flex flex-col gap-12 lg:col-span-5 lg:pl-6">
            <div>
              <h2 className="font-display t-h3">Horaires</h2>
              <div className="mt-5">
                <HoursTable />
              </div>
            </div>
            <div>
              <h2 className="font-display t-h3">Accès</h2>
              <ul className="mt-5 space-y-3">
                {site.access.map((a) => (
                  <li key={a.label} className="flex items-baseline justify-between gap-4 border-b border-encre/10 pb-3">
                    <span className="font-semibold">{a.label}</span>
                    <span className="text-right text-sm text-brun">{a.lines}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display t-h3">Nous suivre</h2>
              <ul className="mt-5 space-y-2">
                <li>
                  <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="link-infuse font-semibold">
                    Instagram {site.instagram.handle}
                  </a>
                </li>
                {site.existingSite.enabled && (
                  <li>
                    <a href={site.existingSite.url} target="_blank" rel="noopener noreferrer" className="link-infuse">
                      Site officiel et compte client : {site.existingSite.label}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
