"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { photos } from "@/data/images";
import { site } from "@/data/site";
import { Arrow } from "@/components/ui/motion";

const KEY = "zencca:maps-consent";

/**
 * Carte Google Maps chargée uniquement après accord du visiteur
 * (service tiers déposant des cookies). Aperçu soigné avant activation.
 */
export default function MapConsent() {
  const [ok, setOk] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) === "1") setOk(true);
    } catch {}
  }, []);
  const accept = () => {
    setOk(true);
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
  };

  return (
    <div className="relative isolate h-full min-h-[440px] w-full overflow-hidden rounded-[1.1rem] bg-[#e9e1d2] lg:min-h-[640px]">
      {ok ? (
        <>
          {!loaded && <div className="absolute inset-0 animate-pulse bg-[#e9e1d2]" aria-hidden />}
          <iframe
            title="Carte Google Maps : Zencca, 20 rue Tiquetonne, 75002 Paris"
            src={site.maps.embedUrl}
            className="absolute inset-0 h-full w-full border-0 [filter:sepia(0.18)_saturate(0.9)]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            onLoad={() => setLoaded(true)}
          />
        </>
      ) : (
        <div className="absolute inset-0">
          <Image src={photos.facadeJour.src} alt="" fill sizes="(min-width: 1024px) 50vw, 92vw" className="object-cover opacity-60 blur-[2px]" />
          <div className="absolute inset-0 bg-creme/55" />
          <div className="relative flex h-full flex-col items-center justify-center gap-5 px-8 pt-24 text-center">
            <svg viewBox="0 0 48 64" className="h-16 w-12 drop-shadow-md" aria-hidden>
              <path d="M24 2C12 2 3 11 3 23c0 16 21 38 21 38s21-22 21-38C45 11 36 2 24 2z" fill="#4d2724" />
              <circle cx="24" cy="23" r="8" fill="#ffd21f" />
            </svg>
            <p className="font-display t-h3 max-w-[16ch]">Zencca, 20 rue Tiquetonne</p>
            <p className="max-w-[26rem] text-[0.95rem] text-brun">
              La carte interactive est fournie par Google Maps, qui peut déposer des cookies. Elle ne se charge qu&apos;après votre accord.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button type="button" onClick={accept} className="btn">
                Afficher la carte
              </button>
              <a href={site.maps.placeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                Ouvrir Google Maps <Arrow dir="up-right" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
