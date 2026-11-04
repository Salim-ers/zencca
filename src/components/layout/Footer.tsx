"use client";

import { useRef } from "react";
import Mascot, { type MascotHandle } from "@/components/brand/Mascot";
import TransitionLink from "@/components/transition/TransitionLink";
import { WaveEdge } from "@/components/ui/Strata";
import { Arrow, Magnetic } from "@/components/ui/motion";
import OpenStatus from "@/components/location/OpenStatus";
import { nav, site } from "@/data/site";

/** Le pied de page reprend l'enseigne jaune et le store prune de la façade. */
export default function Footer() {
  const mascot = useRef<MascotHandle>(null);
  return (
    <footer className="relative mt-auto" data-footer>
      <WaveEdge color="#ffd21f" variant={3} className="absolute inset-x-0 bottom-full h-[clamp(40px,6vw,96px)] w-full" />
      <div className="bg-enseigne text-encre">
        <div className="wrap grid gap-12 pb-14 pt-6 md:grid-cols-12 md:gap-8 lg:pb-20">
          <div className="md:col-span-5 lg:col-span-4">
            <button
              type="button"
              onClick={() => mascot.current?.sip()}
              onPointerEnter={() => mascot.current?.sip({ duration: 700 })}
              className="block w-[min(68vw,300px)] cursor-pointer rounded-3xl lg:w-[340px] 3xl:w-[420px]"
              aria-label="Faire boire la mascotte Zencca"
            >
              <Mascot ref={mascot} variant="logo" liquid="#a9bd6e" level={0.85} followPointer decorative />
            </button>
          </div>

          <div className="md:col-span-7 lg:col-span-8">
            <p className="font-display t-h2 max-w-[14ch]">Passez nous voir rue Tiquetonne.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <a href={site.maps.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn">
                  Itinéraire <Arrow dir="up-right" />
                </a>
              </Magnetic>
              <Magnetic>
                <TransitionLink href="/nous-trouver" className="btn btn-ghost">
                  Nous trouver
                </TransitionLink>
              </Magnetic>
            </div>

            <div className="mt-14 grid gap-10 sm:grid-cols-3">
              <div>
                <h2 className="mb-3 font-semibold">Adresse</h2>
                <address className="not-italic leading-relaxed">
                  Zencca
                  <br />
                  {site.address.street}
                  <br />
                  {site.address.postalCode} {site.address.city}
                </address>
                <OpenStatus className="mt-3" />
              </div>
              <nav aria-label="Pied de page">
                <h2 className="mb-3 font-semibold">Explorer</h2>
                <ul className="space-y-1.5">
                  {nav.map((n) => (
                    <li key={n.href}>
                      <TransitionLink href={n.href} className="link-infuse">
                        {n.label}
                      </TransitionLink>
                    </li>
                  ))}
                </ul>
              </nav>
              <div>
                <h2 className="mb-3 font-semibold">Suivre</h2>
                <ul className="space-y-1.5">
                  <li>
                    <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="link-infuse">
                      Instagram {site.instagram.handle}
                    </a>
                  </li>
                  {site.existingSite.enabled && (
                    <li>
                      <a href={site.existingSite.url} target="_blank" rel="noopener noreferrer" className="link-infuse">
                        Site officiel {site.existingSite.label}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Le store */}
      <div className="relative overflow-hidden bg-store text-papier">
        <div className="wrap flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-2xl tracking-tight sm:text-3xl">
            Salon de Thé <span className="font-cjk ml-3">{site.cjkName}</span>
          </p>
          <p className="t-small text-papier/75">© {new Date().getFullYear()} Zencca, 20 rue Tiquetonne, 75002 Paris</p>
        </div>
      </div>
    </footer>
  );
}
