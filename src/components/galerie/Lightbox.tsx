"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { photos } from "@/data/images";
import type { gallery as G } from "@/data/gallery";
import { useLocale, useT } from "@/i18n/client";
import { lockScroll } from "@/lib/scroll";
import { Arrow } from "@/components/ui/motion";
import { previewOf } from "@/lib/utils";

export default function Lightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: typeof G;
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const reduce = useReducedMotion();
  const locale = useLocale();
  const { galerie: t, common } = useT();
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dir = useRef(1);
  const open = index !== null;
  const go = (d: 1 | -1) => {
    if (index === null) return;
    dir.current = d;
    onIndex((index + d + items.length) % items.length);
  };
  // Dernières versions des actions, lues au moment de la touche (écouteur posé une seule fois)
  const actions = useRef({ go, onClose });
  useEffect(() => {
    actions.current = { go, onClose };
  });

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    lockScroll(true);
    const timer = setTimeout(() => closeRef.current?.focus(), 40);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") actions.current.onClose();
      else if (e.key === "ArrowRight") actions.current.go(1);
      else if (e.key === "ArrowLeft") actions.current.go(-1);
      else if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>("button");
        if (e.shiftKey && document.activeElement === f[0]) {
          e.preventDefault();
          f[f.length - 1].focus();
        } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
          e.preventDefault();
          f[0].focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
      lockScroll(false);
      prev?.focus?.({ preventScroll: true });
    };
  }, [open]);

  const item = index !== null ? items[index] : null;
  const ph = item ? photos[item.photo] : null;
  const neighbours = index !== null ? [items[(index + 1) % items.length], items[(index - 1 + items.length) % items.length]] : [];

  return (
    <AnimatePresence>
      {item && ph && (
        <motion.div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label={t.lightbox}
          className="fixed inset-0 z-[88] flex flex-col bg-[#1d130c]/96 text-papier"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="flex items-center justify-between gap-4 px-4 pt-4 sm:px-8 sm:pt-6">
            <p className="text-sm tabular-nums text-papier/70" aria-live="polite">
              {index! + 1} / {items.length}
            </p>
            <button ref={closeRef} type="button" onClick={onClose} className="on-dark flex h-11 items-center gap-2 rounded-full bg-papier px-4 font-semibold text-encre">
              {common.close}
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden>
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence initial={false} custom={dir.current} mode="popLayout">
              <motion.div
                key={item.photo}
                custom={dir.current}
                className="absolute inset-0 flex items-center justify-center px-4 py-6 sm:px-24"
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir.current * 80, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir.current * -80, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                drag={reduce ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.5}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) go(1);
                  else if (info.offset.x > 70) go(-1);
                }}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={ph.src}
                    alt={ph.alt[locale]}
                    fill
                    sizes="(min-width: 1024px) 70vw, 100vw"
                    quality={85}
                    placeholder={previewOf(ph.src)}
                    className="pointer-events-none select-none object-contain"
                    draggable={false}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
            {/* préchargement des voisines */}
            <div className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0" aria-hidden>
              {neighbours.map((n) => (
                <Image key={n.photo} src={photos[n.photo].src} alt="" fill sizes="(min-width: 1024px) 70vw, 100vw" quality={85} />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={t.prev}
              className="on-dark absolute left-3 top-1/2 hidden h-14 w-14 -translate-y-1/2 place-items-center rounded-full bg-papier/10 text-papier transition hover:bg-papier hover:text-encre sm:grid"
            >
              <Arrow dir="left" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={t.next}
              className="on-dark absolute right-3 top-1/2 hidden h-14 w-14 -translate-y-1/2 place-items-center rounded-full bg-papier/10 text-papier transition hover:bg-papier hover:text-encre sm:grid"
            >
              <Arrow />
            </button>
          </div>

          <div className="flex items-center justify-between gap-4 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-2 sm:px-8 sm:pb-8">
            <p className="font-display text-xl sm:text-2xl">{item.caption[locale]}</p>
            <div className="flex gap-2 sm:hidden">
              <button type="button" onClick={() => go(-1)} aria-label={t.prev} className="grid h-12 w-12 place-items-center rounded-full bg-papier/10">
                <Arrow dir="left" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label={t.next} className="grid h-12 w-12 place-items-center rounded-full bg-papier/10">
                <Arrow />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
