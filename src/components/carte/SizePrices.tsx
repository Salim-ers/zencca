"use client";

import { formatPrice, type Product } from "@/data/products";
import { SHOW_PRICES } from "@/data/site";
import { useLocale, useT } from "@/i18n/client";
import { cn } from "@/lib/utils";

/** Formats et prix d'une boisson, comme sur le menu : la contenance en retrait, le prix en gras. */
export default function SizePrices({ product, className }: { product: Product; className?: string }) {
  const locale = useLocale();
  const t = useT().carte;
  if (!product.sizes.length) return null;
  return (
    <ul className={cn("flex flex-wrap items-baseline gap-x-3 gap-y-0.5", className)} aria-label={t.sizesAria}>
      {product.sizes.map((s) => (
        <li key={s.ml} className="whitespace-nowrap">
          <span className="text-brun/75">{s.ml} ml</span>
          {SHOW_PRICES && s.price !== undefined && <strong className="ml-1.5 font-semibold">{formatPrice(s.price, locale)}</strong>}
        </li>
      ))}
    </ul>
  );
}
