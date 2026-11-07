"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import Lightbox from "./Lightbox";
import { gallery, galleryCategories, type GalleryCategory } from "@/data/gallery";
import { photos } from "@/data/images";
import { useLocale, useT } from "@/i18n/client";
import { cn, previewOf } from "@/lib/utils";

const shapes = ["rounded-[1.1rem]", "tuile", "rounded-[1.1rem]", "tuile-d", "tuile", "rounded-[1.1rem]"];

export default function Gallery() {
  const locale = useLocale();
  const t = useT().galerie;
  const [filter, setFilter] = useState<GalleryCategory | "tout">("tout");
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const items = useMemo(() => (filter === "tout" ? gallery : gallery.filter((g) => g.category === filter)), [filter]);
  const close = useCallback(() => setOpen(null), []);
  const tabs = [{ id: "tout" as const, label: t.all }, ...galleryCategories.map((c) => ({ id: c.id, label: c.label[locale] }))];

  return (
    <div className="wrap pb-32">
      <div role="group" aria-label={t.filterAria} className="no-scrollbar -mx-[var(--gutter)] mb-10 flex gap-2 overflow-x-auto px-[var(--gutter)]">
        {tabs.map((c) => {
          const on = filter === c.id;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(c.id)}
              className={cn(
                "min-h-11 shrink-0 rounded-full px-5 py-2 font-medium transition-colors duration-300",
                on ? "bg-encre text-papier" : "bg-papier text-encre ring-1 ring-encre/15 hover:ring-encre/40"
              )}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <motion.ul
        layout={!reduce}
        className="grid grid-flow-dense auto-rows-[clamp(150px,30vw,260px)] grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 md:auto-rows-[clamp(180px,22vw,330px)] xl:grid-cols-4 3xl:auto-rows-[360px]"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((g, i) => {
            const ph = photos[g.photo];
            return (
              <motion.li
                key={g.photo}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.92, y: 30 }}
                whileInView={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
                animate={reduce ? { opacity: 1 } : undefined}
                viewport={{ once: true, margin: "-8% 0px" }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
                transition={{ duration: 0.7, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className={cn(g.span === "tall" && "row-span-2", g.span === "wide" && "col-span-2")}
              >
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className={cn("group relative block h-full w-full overflow-hidden", shapes[i % shapes.length])}
                  aria-label={t.enlarge(g.caption[locale])}
                >
                  <Image
                    src={ph.src}
                    alt={ph.alt[locale]}
                    fill
                    placeholder={previewOf(ph.src)}
                    sizes={g.span === "wide" ? "(min-width: 1280px) 50vw, (min-width: 768px) 66vw, 100vw" : "(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"}
                    className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-soft)] group-hover:scale-[1.06]"
                    style={{ objectPosition: ph.focus }}
                  />
                  <span className="pointer-events-none absolute bottom-3 left-3 right-3 translate-y-3 rounded-full bg-papier/95 px-4 py-2 text-left text-sm font-medium text-encre opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 max-md:hidden">
                    {g.caption[locale]}
                  </span>
                </button>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>

      <Lightbox items={items} index={open} onClose={close} onIndex={setOpen} />
    </div>
  );
}
