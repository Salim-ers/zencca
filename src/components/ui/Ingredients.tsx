/* Petits éléments graphiques inspirés des ingrédients (SVG, aucune photo inventée). */
import { cn } from "@/lib/utils";

export function Pearl({ className, color = "#3a2216" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("block", className)} aria-hidden>
      <circle cx="20" cy="20" r="18" fill={color} />
      <ellipse cx="14" cy="13" rx="5" ry="3.5" fill="#fff" opacity="0.28" transform="rotate(-30 14 13)" />
    </svg>
  );
}

export function Petal({ className, color = "#ebbfc6" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={cn("block", className)} aria-hidden>
      <path
        d="M30 4c10 8 20 20 18 32-2 11-10 18-18 20-8-2-16-9-18-20C10 24 20 12 30 4zm0 0l-3 9 3 4 3-4z"
        fill={color}
        fillRule="evenodd"
      />
      <path d="M30 22v26" stroke="#fff" strokeOpacity=".45" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function Leaf({ className, color = "#a9bd6e" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("block", className)} aria-hidden>
      <path d="M8 56C10 30 26 10 58 6c-2 30-20 48-50 50z" fill={color} />
      <path d="M12 52C26 38 38 26 52 12" stroke="#fff" strokeOpacity=".45" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/** Nuage de poudre de matcha — forme organique */
export function Powder({ className, color = "#8fab47" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={cn("block", className)} aria-hidden>
      <path
        d="M14 58c-10-6-8-22 6-24 2-14 20-22 32-12 8-12 30-10 34 6 14-2 26 10 20 24-4 10-16 12-24 10-8 8-24 10-34 2-10 6-26 4-34-6z"
        fill={color}
      />
      <circle cx="102" cy="22" r="4" fill={color} />
      <circle cx="112" cy="34" r="2.5" fill={color} />
      <circle cx="8" cy="40" r="3" fill={color} />
    </svg>
  );
}

export function CocoChunk({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 70 50" className={cn("block", className)} aria-hidden>
      <path d="M6 30C8 14 26 4 44 6s22 14 20 26c-14 8-40 12-58-2z" fill="#6b3f2a" />
      <path d="M12 30c4-10 16-16 30-15s18 9 17 16c-12 5-32 7-47-1z" fill="#fbf6ec" />
    </svg>
  );
}

/** Contours d'arches concentriques (niches de la boutique) */
export function ArchLines({ className, color = "#201409" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 400 560" className={cn("block overflow-visible", className)} aria-hidden fill="none">
      {[0, 1, 2].map((i) => {
        const inset = i * 26;
        const w = 400 - inset * 2;
        const r = w / 2;
        return (
          <path
            key={i}
            data-arch-line
            d={`M${inset} 560 V${r + inset} A${r} ${r} 0 0 1 ${400 - inset} ${r + inset} V560`}
            stroke={color}
            strokeOpacity={0.5 - i * 0.14}
            strokeWidth="1.5"
            pathLength={1}
            strokeDasharray="1"
          />
        );
      })}
    </svg>
  );
}
