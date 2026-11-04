import { cn } from "@/lib/utils";

/** Petite capsule qui montre les couches d'une boisson (du haut vers le bas). */
export default function LayerPill({ layers, className, label }: { layers: string[]; className?: string; label?: string }) {
  return (
    <span
      className={cn("inline-flex h-9 w-4 shrink-0 flex-col overflow-hidden rounded-full ring-1 ring-encre/15", className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {layers.map((c, i) => (
        <span key={i} className="block flex-1" style={{ background: c }} />
      ))}
    </span>
  );
}
