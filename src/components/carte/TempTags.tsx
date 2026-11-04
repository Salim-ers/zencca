import type { Temp } from "@/data/products";
import { cn } from "@/lib/utils";

export function Flame({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} aria-hidden>
      <path d="M12 2c1 4 5 6 5 11a5 5 0 01-10 0c0-2 1-3.5 2-4.5 0 2 1 3 2 3-1-3 0-6 1-9.5z" fill="currentColor" />
    </svg>
  );
}
export function Snow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7M9 4l3 2 3-2M9 20l3-2 3 2" />
    </svg>
  );
}

/** Pastilles chaud / froid (uniquement quand l'information figure sur la carte) */
export default function TempTags({ temps, className, size = "sm" }: { temps?: Temp[]; className?: string; size?: "sm" | "md" }) {
  if (!temps?.length) return null;
  return (
    <ul className={cn("flex items-center gap-1.5", className)} aria-label="Températures">
      {temps.map((t) => (
        <li
          key={t}
          className={cn(
            "inline-flex items-center gap-1 rounded-full font-semibold",
            size === "md" ? "px-3 py-1.5 text-sm" : "px-2.5 py-1 text-xs",
            t === "chaud" ? "bg-[#f6d7c4] text-[#7a2d0f]" : "bg-[#d8e8f0] text-[#1d4a60]"
          )}
        >
          {t === "chaud" ? <Flame className="h-3.5 w-3.5" /> : <Snow className="h-3.5 w-3.5" />}
          {t === "chaud" ? "Chaud" : "Froid"}
        </li>
      ))}
    </ul>
  );
}
