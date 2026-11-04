import Image from "next/image";
import { photos } from "@/data/images";
import { categoryById, type Product } from "@/data/products";
import { cn } from "@/lib/utils";

/**
 * Visuel produit : le visuel de la carte s'il existe, sinon une composition
 * graphique des couches de couleur de la boisson.
 */
export default function ProductVisual({
  product,
  sizes,
  className,
  shape = "pill",
  priority,
}: {
  product: Product;
  sizes: string;
  className?: string;
  shape?: "pill" | "arch" | "soft";
  priority?: boolean;
}) {
  const cat = categoryById(product.category);
  const shapeCls = shape === "arch" ? "arch" : shape === "soft" ? "rounded-[1.6rem] overflow-hidden" : "rounded-[1.6rem] overflow-hidden";
  if (product.photo) {
    const ph = photos[product.photo];
    return (
      <div className={cn(!className?.includes("absolute") && "relative", shapeCls, className)} style={{ background: cat.tint }}>
        <Image
          src={ph.src}
          alt={ph.alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-soft)] group-hover:scale-[1.05]"
          style={{ objectPosition: ph.focus }}
        />
      </div>
    );
  }
  return (
    <div
      className={cn(!className?.includes("absolute") && "relative", "flex items-center justify-center", shapeCls, className)}
      style={{ background: cat.tint }}
      role="img"
      aria-label={`Couleurs de la boisson ${product.name}`}
    >
      <svg viewBox="0 0 200 260" className="h-[78%] w-auto" aria-hidden>
        <defs>
          <clipPath id={`cup-${product.slug}`}>
            <path d="M40 30 H160 L146 238 Q144 250 132 250 H68 Q56 250 54 238 Z" />
          </clipPath>
        </defs>
        <g clipPath={`url(#cup-${product.slug})`}>
          {product.layers.map((c, i) => {
            const n = product.layers.length;
            const y = 30 + (i * 220) / n;
            return (
              <path
                key={i}
                d={`M0 ${y + 8} C 50 ${y - 6}, 90 ${y + 18}, 140 ${y + 2} S 190 ${y - 4}, 200 ${y + 6} V 260 H0 Z`}
                fill={c}
                className="transition-transform duration-700 ease-[var(--ease-soft)] group-hover:-translate-y-2"
                style={{ transitionDelay: `${i * 70}ms` }}
              />
            );
          })}
        </g>
        <path
          d="M40 30 H160 L146 238 Q144 250 132 250 H68 Q56 250 54 238 Z"
          fill="none"
          stroke={cat.ink}
          strokeOpacity="0.35"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <rect x="30" y="18" width="140" height="16" rx="8" fill="#fdf6ea" stroke={cat.ink} strokeOpacity="0.35" strokeWidth="3" />
      </svg>
    </div>
  );
}
