"use client";

import { AnimatePresence, motion, useDragControls, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import ProductVisual from "./ProductVisual";
import TempTags from "./TempTags";
import TransitionLink from "@/components/transition/TransitionLink";
import LayerPill from "@/components/ui/LayerPill";
import { Arrow } from "@/components/ui/motion";
import { categoryById, formatPrice, supplements, type Product } from "@/data/products";
import { SHOW_PRICES } from "@/data/site";
import { lockScroll } from "@/lib/lenis";

export default function ProductSheet({
  product,
  onClose,
  onPrev,
  onNext,
}: {
  product: Product | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const reduce = useReducedMotion();
  const controls = useDragControls();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const open = Boolean(product);

  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    lockScroll(true);
    const t = setTimeout(() => closeRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>("a[href], button");
        if (!f.length) return;
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
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      lockScroll(false);
      prevFocus?.focus?.({ preventScroll: true });
    };
  }, [open, onClose, onNext, onPrev]);

  const cat = product ? categoryById(product.category) : null;

  return (
    <AnimatePresence>
      {product && cat && (
        <motion.div className="fixed inset-0 z-[85]" initial={{ opacity: 1 }} exit={{ opacity: 1 }}>
          <motion.button
            type="button"
            aria-label="Fermer la fiche"
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-encre/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sheet-title"
            className="absolute inset-x-0 bottom-0 top-[6svh] flex flex-col overflow-hidden rounded-t-[2rem] md:inset-y-3 md:left-auto md:right-3 md:top-3 md:w-[min(92vw,1100px)] md:rounded-[2rem]"
            style={{ background: cat.tint, color: cat.ink }}
            initial={reduce ? { opacity: 0 } : { y: "100%", x: 0 }}
            animate={reduce ? { opacity: 1 } : { y: 0, x: 0 }}
            exit={reduce ? { opacity: 0 } : { y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 260 }}
            drag={reduce ? false : "y"}
            dragControls={controls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 140 || info.velocity.y > 600) onClose();
            }}
          >
            <div
              className="flex touch-none justify-center pb-1 pt-3 md:hidden"
              aria-hidden
              onPointerDown={(e) => controls.start(e)}
            >
              <span className="h-1.5 w-12 rounded-full bg-current opacity-25" />
            </div>
            <div className="flex items-center justify-between gap-3 px-5 pt-3 md:px-8 md:pt-6">
              <p className="text-sm font-semibold">
                {cat.label}
                {cat.cjk && <span className="font-cjk ml-2 opacity-70">{cat.cjk}</span>}
              </p>
              <div className="flex items-center gap-2">
                <button type="button" onClick={onPrev} aria-label="Boisson précédente" className="grid h-11 w-11 place-items-center rounded-full bg-papier/70 hover:bg-papier">
                  <Arrow className="rotate-180" />
                </button>
                <button type="button" onClick={onNext} aria-label="Boisson suivante" className="grid h-11 w-11 place-items-center rounded-full bg-papier/70 hover:bg-papier">
                  <Arrow />
                </button>
                <button ref={closeRef} type="button" onClick={onClose} className="ml-1 flex h-11 items-center gap-2 rounded-full bg-encre px-4 text-papier">
                  Fermer
                  <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden>
                    <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="grid flex-1 grid-cols-1 gap-6 overflow-y-auto overscroll-contain px-5 pb-10 pt-5 md:grid-cols-2 md:gap-10 md:px-8 md:pb-8" data-lenis-prevent>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={product.slug}
                  className="relative mx-auto aspect-[3/4] w-full max-w-[24rem] md:max-w-none md:self-stretch md:aspect-auto md:min-h-[60vh]"
                  initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.65, 0.05, 0.36, 1] }}
                >
                  <ProductVisual product={product} sizes="(min-width: 768px) 46vw, 90vw" shape="arch" className="absolute inset-0" priority />
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={product.slug}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col justify-center md:py-6"
                >
                  {product.isNew && (
                    <span className="mb-4 inline-flex w-max items-center rounded-full bg-enseigne px-3 py-1 text-sm font-semibold text-encre">
                      Nouveau
                    </span>
                  )}
                  {product.cjk && (
                    <p className="font-cjk text-xl opacity-75" aria-hidden>
                      {product.cjk}
                    </p>
                  )}
                  <h2 id="sheet-title" className="font-display t-h2 mt-1">
                    {product.name}
                  </h2>
                  {product.en && <p className="mt-2 text-sm opacity-70" lang="en">{product.en}</p>}
                  <p className="t-lead mt-6 max-w-[28rem]">{product.description}</p>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <LayerPill layers={product.layers} className="h-12 w-5" />
                    <TempTags temps={product.temps} size="md" />
                  </div>

                  {product.sizes.length > 0 && (
                    <dl className="mt-8 flex flex-wrap gap-3">
                      {product.sizes.map((s) => (
                        <div key={s.ml} className="rounded-2xl bg-papier/70 px-5 py-3">
                          <dt className="text-sm opacity-70">Format</dt>
                          <dd className="font-display text-2xl">
                            {s.ml} ml
                            {SHOW_PRICES && s.price !== undefined && <span className="ml-3">{formatPrice(s.price)}</span>}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {product.category !== "gourmandises" && (
                    <p className="mt-6 max-w-[28rem] text-[0.95rem] opacity-85">
                      À ajouter : {supplements.items.join(", ").toLowerCase()}
                      {SHOW_PRICES && ` (${formatPrice(supplements.price)})`}.
                    </p>
                  )}

                  <div className="mt-10 flex flex-wrap gap-3">
                    <TransitionLink href="/nous-trouver" className="btn" onClick={onClose}>
                      Venir la goûter <Arrow />
                    </TransitionLink>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
