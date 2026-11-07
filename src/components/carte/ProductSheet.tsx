"use client";

import { AnimatePresence, motion, useDragControls, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import ProductVisual from "./ProductVisual";
import TempTags from "./TempTags";
import TransitionLink from "@/components/transition/TransitionLink";
import LayerPill from "@/components/ui/LayerPill";
import { Arrow } from "@/components/ui/motion";
import { altName, categoryById, formatPrice, otherLocale, supplements, type Product } from "@/data/products";
import { SHOW_PRICES } from "@/data/site";
import { useLocale, useT } from "@/i18n/client";
import { lockScroll } from "@/lib/scroll";

const reveal = { duration: 0.7, ease: [0.65, 0.05, 0.36, 1] as const };

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
  const locale = useLocale();
  const { carte: t, common } = useT();
  const controls = useDragControls();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const open = Boolean(product);

  // Dernières versions des actions, lues au moment de la touche : l'effet ci-dessous
  // ne se relance qu'à l'ouverture et à la fermeture (focus et défilement stables).
  const actions = useRef({ onClose, onPrev, onNext });
  useEffect(() => {
    actions.current = { onClose, onPrev, onNext };
  });

  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    lockScroll(true);
    const timer = setTimeout(() => closeRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") actions.current.onClose();
      if (e.key === "ArrowRight") actions.current.onNext();
      if (e.key === "ArrowLeft") actions.current.onPrev();
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
      clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
      lockScroll(false);
      prevFocus?.focus?.({ preventScroll: true });
    };
  }, [open]);

  const cat = product ? categoryById(product.category) : null;
  const sub = product ? altName(product, locale) : null;

  return (
    <AnimatePresence>
      {product && cat && (
        <motion.div className="fixed inset-0 z-[85]" initial={{ opacity: 1 }} exit={{ opacity: 1 }}>
          <motion.button
            type="button"
            aria-label={t.sheetClose}
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
            <div className="flex touch-none justify-center pb-1 pt-3 md:hidden" aria-hidden onPointerDown={(e) => controls.start(e)}>
              <span className="h-1.5 w-12 rounded-full bg-current opacity-25" />
            </div>
            <div className="flex items-center justify-between gap-3 px-5 pt-3 md:px-8 md:pt-6">
              <p className="text-sm font-semibold">
                {cat.label[locale]}
                {cat.cjk && <span className="font-cjk ml-2 opacity-70">{cat.cjk}</span>}
              </p>
              <div className="flex items-center gap-2">
                <button type="button" onClick={onPrev} aria-label={t.prev} className="grid h-11 w-11 place-items-center rounded-full bg-papier/70 hover:bg-papier">
                  <Arrow dir="left" />
                </button>
                <button type="button" onClick={onNext} aria-label={t.next} className="grid h-11 w-11 place-items-center rounded-full bg-papier/70 hover:bg-papier">
                  <Arrow />
                </button>
                <button ref={closeRef} type="button" onClick={onClose} className="ml-1 flex h-11 items-center gap-2 rounded-full bg-encre px-4 text-papier">
                  {common.close}
                  <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden>
                    <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="grid flex-1 grid-cols-1 gap-6 overflow-y-auto overscroll-contain px-5 pb-10 pt-5 md:grid-cols-2 md:gap-10 md:px-8 md:pb-8">
              {/* L'image se remplit de bas en haut : une fenêtre monte, son contenu redescend d'autant
                  (transformations seules, la photo n'est pas repeinte à chaque image) */}
              {/* (le masque est sur un calque interne : un élément de grille en overflow:hidden perdrait sa hauteur) */}
              <div className="relative mx-auto aspect-[3/4] w-full max-w-[24rem] md:aspect-auto md:min-h-[60vh] md:max-w-none md:self-stretch">
                <div className="absolute inset-0 overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={product.slug}
                      className="absolute inset-0 overflow-hidden"
                      initial={reduce ? false : { y: "100%" }}
                      animate={{ y: "0%" }}
                      exit={reduce ? undefined : { opacity: 0 }}
                      transition={reveal}
                    >
                      <motion.div className="absolute inset-0" initial={reduce ? false : { y: "-100%" }} animate={{ y: "0%" }} transition={reveal}>
                        <ProductVisual product={product} sizes="(min-width: 768px) 46vw, 90vw" className="absolute inset-0" eager />
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

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
                      {common.newBadge}
                    </span>
                  )}
                  {product.cjk && (
                    <p className="font-cjk text-xl opacity-75" aria-hidden>
                      {product.cjk}
                    </p>
                  )}
                  <h2 id="sheet-title" className="font-display t-h2 mt-1">
                    {product.name[locale]}
                  </h2>
                  {sub && (
                    <p className="mt-2 text-sm opacity-70" lang={otherLocale(locale)}>
                      {sub}
                    </p>
                  )}
                  <p className="t-lead mt-6 max-w-[28rem]">{product.description[locale]}</p>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <LayerPill layers={product.layers} className="h-12 w-5" />
                    <TempTags temps={product.temps} size="md" />
                  </div>

                  {product.sizes.length > 0 && (
                    <dl className="mt-8 flex flex-wrap gap-3">
                      {product.sizes.map((s) => (
                        <div key={s.ml} className="rounded-2xl bg-papier/70 px-5 py-3">
                          <dt className="text-sm opacity-70">{t.size}</dt>
                          <dd className="font-display text-2xl">
                            {s.ml} ml
                            {SHOW_PRICES && s.price !== undefined && <span className="ml-3">{formatPrice(s.price, locale)}</span>}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {product.category !== "gourmandises" && (
                    <p className="mt-6 max-w-[28rem] text-[0.95rem] opacity-85">
                      {t.addOns(supplements.items.map((s) => s[locale]).join(", "), SHOW_PRICES ? formatPrice(supplements.price, locale) : "")}
                    </p>
                  )}

                  <div className="mt-10 flex flex-wrap gap-3">
                    <TransitionLink href="/nous-trouver" className="btn" onClick={onClose}>
                      {t.taste} <Arrow />
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
