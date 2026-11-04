"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import ProductVisual from "./ProductVisual";
import ProductSheet from "./ProductSheet";
import TempTags from "./TempTags";
import LayerPill from "@/components/ui/LayerPill";
import { Arrow } from "@/components/ui/motion";
import { categories, categoryById, formatPrice, productBySlug, products, type CategoryId, type Product } from "@/data/products";
import { SHOW_PRICES } from "@/data/site";
import { photos } from "@/data/images";
import { scrollToEl } from "@/lib/lenis";
import { cn } from "@/lib/utils";

type FilterId = "tout" | "nouveautes" | "signatures" | CategoryId;

const filters: { id: FilterId; label: string; cjk?: string; color: string }[] = [
  { id: "tout", label: "Toute la carte", color: "#201409" },
  { id: "nouveautes", label: "Nouveautés", color: "#ffd21f" },
  { id: "signatures", label: "Signatures", color: "#e6b465" },
  ...categories.map((c) => ({ id: c.id as FilterId, label: c.label, cjk: c.cjk, color: c.color })),
];

/** Chaque univers a son propre geste au survol */
const hoverByCat: Record<CategoryId, string> = {
  matcha: "group-hover:-translate-y-2",
  thes: "group-hover:rotate-[-2deg]",
  fruits: "group-hover:rotate-[2deg] group-hover:scale-[1.02]",
  lactees: "group-hover:scale-[0.98]",
  "coco-cafe": "group-hover:-translate-y-1.5 group-hover:rotate-[1deg]",
  smoothies: "group-hover:scale-y-[0.97] group-hover:scale-x-[1.02]",
  gourmandises: "group-hover:rotate-[-3deg]",
};

const sizesLabel = (p: Product) => {
  if (!p.sizes.length) return null;
  if (SHOW_PRICES && p.sizes.every((s) => s.price !== undefined))
    return p.sizes.map((s) => `${s.ml} ml ${formatPrice(s.price!)}`).join("   ");
  return p.sizes.map((s) => `${s.ml} ml`).join(" ou ");
};

export default function MenuExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const reduce = useReducedMotion();

  const active = (params.get("categorie") as FilterId) || "tout";
  const validActive: FilterId = filters.some((f) => f.id === active) ? active : "tout";
  const openSlug = params.get("boisson");
  const openProduct = openSlug ? productBySlug(openSlug) ?? null : null;

  const setParams = useCallback(
    (next: Record<string, string | null>) => {
      const sp = new URLSearchParams(params.toString());
      Object.entries(next).forEach(([k, v]) => (v ? sp.set(k, v) : sp.delete(k)));
      const qs = sp.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [params, pathname, router]
  );

  const chapters = useMemo(() => {
    if (validActive === "tout") return categories.map((c) => ({ key: c.id, cat: c, items: products.filter((p) => p.category === c.id) }));
    if (validActive === "nouveautes")
      return [{ key: "nouveautes", cat: null, title: "Nouveautés", intro: "Les dernières arrivées sur la carte.", items: products.filter((p) => p.isNew) }];
    if (validActive === "signatures")
      return [{ key: "signatures", cat: null, title: "Signatures", intro: "Les créations qui racontent Zencca.", items: products.filter((p) => p.signature) }];
    const c = categoryById(validActive as CategoryId);
    return [{ key: c.id, cat: c, items: products.filter((p) => p.category === c.id) }];
  }, [validActive]);

  // Garde le filtre actif visible dans la barre horizontale (mobile)
  useEffect(() => {
    const el = document.querySelector<HTMLElement>(`[data-filter="${validActive}"]`);
    const bar = el?.closest("ul");
    if (!el || !bar || bar.scrollWidth <= bar.clientWidth) return;
    bar.scrollTo({ left: el.offsetLeft - 16, behavior: "smooth" });
  }, [validActive]);

  const flat = useMemo(() => chapters.flatMap((c) => c.items), [chapters]);
  const step = (dir: 1 | -1) => {
    if (!openProduct) return;
    const list = flat.some((p) => p.slug === openProduct.slug) ? flat : products;
    const i = list.findIndex((p) => p.slug === openProduct.slug);
    const n = list[(i + dir + list.length) % list.length];
    setParams({ boisson: n.slug });
  };

  const choose = (id: FilterId) => {
    setParams({ categorie: id === "tout" ? null : id, boisson: null });
    requestAnimationFrame(() => scrollToEl("#carte-liste", -150));
  };

  const count = (id: FilterId) =>
    id === "tout"
      ? products.length
      : id === "nouveautes"
        ? products.filter((p) => p.isNew).length
        : id === "signatures"
          ? products.filter((p) => p.signature).length
          : products.filter((p) => p.category === id).length;

  return (
    <div className="wrap relative grid grid-cols-1 gap-8 pb-28 lg:grid-cols-12 lg:gap-10">
      {/* ── Filtres */}
      
        <nav
          aria-label="Catégories de la carte"
          className="sticky top-[4.4rem] z-30 -mx-[var(--gutter)] bg-papier px-[var(--gutter)] shadow-[0_12px_20px_-18px_rgba(32,20,9,0.4)] lg:shadow-none py-3 lg:top-28 lg:col-span-3 lg:mx-0 lg:self-start lg:bg-transparent lg:p-0"
        >
          <ul className="no-scrollbar flex gap-2 overflow-x-auto lg:flex-col lg:gap-0.5 lg:overflow-visible">
            {filters.map((f) => {
              const on = f.id === validActive;
              return (
                <li key={f.id} className="shrink-0">
                  <button
                    type="button"
                    data-filter={f.id}
                    onClick={() => choose(f.id)}
                    aria-pressed={on}
                    className={cn(
                      "relative flex min-h-11 w-full items-center gap-3 rounded-full px-4 py-2 text-left text-[0.95rem] font-medium transition-colors lg:py-2.5",
                      on ? "text-papier" : "text-encre hover:bg-encre/5"
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-0 rounded-full bg-encre transition-[transform,opacity] duration-500 ease-[var(--ease-pop)]",
                        on ? "scale-100 opacity-100" : "scale-75 opacity-0"
                      )}
                    />
                    <span aria-hidden className="relative h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: f.color, boxShadow: on ? "0 0 0 2px #fdf6ea" : undefined }} />
                    <span className="relative whitespace-nowrap">{f.label}</span>
                    {f.cjk && <span className="font-cjk relative ml-auto hidden text-xs opacity-60 xl:inline" aria-hidden>{f.cjk}</span>}
                    <span className={cn("relative text-xs opacity-60", !f.cjk && "lg:ml-auto", f.cjk && "xl:ml-0 lg:ml-auto")}>{count(f.id)}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

      {/* ── Liste */}
      <div id="carte-liste" className="lg:col-span-9" aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          {chapters.map((ch) => {
            const cat = ch.cat;
            const title = cat ? cat.label : (ch as { title: string }).title;
            const intro = cat ? cat.intro : (ch as { intro: string }).intro;
            const [feature, ...rest] = (() => {
              let withPhoto = ch.items.findIndex((p) => p.photo && photos[p.photo].src.width >= 900);
              if (withPhoto < 0) withPhoto = ch.items.findIndex((p) => p.photo);
              if (withPhoto < 0 || ch.items.length < 3) return ch.items;
              const arr = [...ch.items];
              const [f] = arr.splice(withPhoto, 1);
              return [f, ...arr];
            })();
            const featureMode = ch.items.length >= 3 && feature?.photo;
            return (
              <motion.section
                key={ch.key + validActive}
                initial={reduce ? false : { opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -20, transition: { duration: 0.25 } }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                aria-labelledby={`ch-${ch.key}`}
                className="mb-20 last:mb-0 lg:mb-28"
              >
                <header
                  className="relative mb-8 flex flex-wrap items-end justify-between gap-4 overflow-hidden rounded-[2rem] px-6 pb-7 pt-10 sm:px-9"
                  style={{ background: cat?.tint ?? "#fbecc6", color: cat?.ink ?? "#201409" }}
                >
                  <div>
                    {cat?.cjk && (
                      <p className="font-cjk text-lg opacity-75" aria-hidden>
                        {cat.cjk}
                      </p>
                    )}
                    <h2 id={`ch-${ch.key}`} className="font-display t-h2">
                      {title}
                    </h2>
                    <p className="mt-3 max-w-[30rem]">{intro}</p>
                  </div>
                  {/* bandes de couleur : les couches de l'univers */}
                  <div aria-hidden className="flex h-16 items-end gap-1.5">
                    {Array.from(new Set(ch.items.flatMap((p) => p.layers))).slice(0, 7).map((c, i) => (
                      <span key={c + i} className="w-3 rounded-full" style={{ background: c, height: `${40 + ((i * 37) % 60)}%` }} />
                    ))}
                  </div>
                </header>

                {featureMode && feature && (
                  <motion.button
                    type="button"
                    onClick={() => setParams({ boisson: feature.slug })}
                    className="group mb-6 grid w-full grid-cols-1 items-center gap-6 rounded-[2rem] text-left sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] sm:gap-10"
                  >
                    <div className={cn("transition-transform duration-700 ease-[var(--ease-soft)]", hoverByCat[feature.category])}>
                      <ProductVisual product={feature} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 40vw, 90vw" shape="arch" className="aspect-[3/4] w-full" />
                    </div>
                    <ProductText p={feature} big />
                  </motion.button>
                )}

                <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 xl:grid-cols-3">
                  {(featureMode ? rest : ch.items).map((p, i) => (
                    <motion.li
                      key={p.slug}
                        initial={reduce ? false : { opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, delay: Math.min(i, 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                      className={cn(i % 3 === 1 && "xl:mt-12", i % 2 === 1 && "max-xl:mt-10")}
                    >
                      <button
                        type="button"
                        onClick={() => setParams({ boisson: p.slug })}
                        className="group block w-full text-left"
                      >
                        <div className={cn("transition-transform duration-700 ease-[var(--ease-soft)]", hoverByCat[p.category])}>
                          <ProductVisual
                            product={p}
                            sizes="(min-width: 1280px) 22vw, (min-width: 640px) 40vw, 90vw"
                            shape={i % 2 ? "soft" : "pill"}
                            className={cn("w-full", i % 2 ? "aspect-[4/5]" : "aspect-[3/4]")}
                          />
                        </div>
                        <div className="mt-4 sm:mt-5">
                          <ProductText p={p} />
                        </div>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </motion.section>
            );
          })}
        </AnimatePresence>
      </div>

      <ProductSheet product={openProduct} onClose={() => setParams({ boisson: null })} onPrev={() => step(-1)} onNext={() => step(1)} />
    </div>
  );
}

function ProductText({ p, big }: { p: Product; big?: boolean }) {
  const sz = sizesLabel(p);
  return (
    <div>
      <div className="flex items-start gap-3">
        <LayerPill layers={p.layers} className={cn("mt-1", big ? "h-12 w-5" : "max-sm:hidden")} />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            {p.cjk && (
              <span className="font-cjk text-sm text-brun/70" aria-hidden>
                {p.cjk}
              </span>
            )}
            {p.isNew && <span className="rounded-full bg-enseigne px-2 py-0.5 text-xs font-semibold">Nouveau</span>}
          </div>
          <h3 className={cn("font-display mt-0.5 [text-wrap:balance]", big ? "t-h2" : "text-[1.2rem] leading-[1.08] tracking-tight sm:text-[1.6rem] sm:leading-[1.05]")}>{p.name}</h3>
        </div>
      </div>
      <p className={cn("mt-2 text-brun sm:mt-3", big ? "t-lead max-w-[28rem]" : "text-[0.9rem] leading-snug sm:text-base sm:leading-relaxed")}>{p.description}</p>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <TempTags temps={p.temps} />
        {sz && <span className="text-[0.8rem] text-brun/80 sm:text-sm">{sz}</span>}
        <span className="ml-auto inline-flex items-center gap-1 text-sm font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 max-md:hidden">
          Voir la fiche <Arrow />
        </span>
      </div>
    </div>
  );
}
