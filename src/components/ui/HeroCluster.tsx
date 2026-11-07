"use client";

import { InfuseImage, Parallax } from "@/components/ui/motion";
import { photos, type PhotoKey } from "@/data/images";

/** Trois tuiles photographiques décalées, pour les en-têtes de pages. */
export default function HeroCluster({ items }: { items: [PhotoKey, PhotoKey, PhotoKey] }) {
  return (
    <div className="relative mx-auto grid h-full max-w-[30rem] grid-cols-3 items-end gap-3 sm:gap-4 lg:max-w-none" aria-hidden>
      {items.map((k, i) => (
        <Parallax key={k} speed={[0.05, -0.12, 0.1][i]} disableOnTouch className={["", "-translate-y-[18%]", "translate-y-[6%]"][i]}>
          <InfuseImage
            photo={photos[k]}
            sizes="(min-width: 1024px) 12vw, 30vw"
            shape={i === 1 ? "tuile-d" : "tuile"}
            trigger="reveal"
            delay={0.15 + i * 0.12}
            eager={i === 1}
            className="aspect-[3/4.4] w-full [--coin:1.6rem] [--tuile-r:0.7rem]"
          />
        </Parallax>
      ))}
    </div>
  );
}
