"use client";

import { RevealText } from "@/components/ui/motion";
import { StrataDivider } from "@/components/ui/Strata";
import { cn } from "@/lib/utils";

/** En-tête de page secondaire : grand titre, ligne courte, couches de couleur. */
export default function PageHero({
  title,
  cjk,
  lead,
  bg,
  ink = "#201409",
  layers,
  next,
  tint,
  children,
  className,
  solidHeader,
}: {
  title: string[];
  cjk?: string;
  lead?: string;
  bg: string;
  ink?: string;
  layers: string[];
  next: string;
  tint?: string;
  children?: React.ReactNode;
  className?: string;
  /** Force un header plein (fond foncé ou très saturé) */
  solidHeader?: boolean;
}) {
  return (
    <section className={cn("relative overflow-hidden", className)} style={{ background: bg, color: ink }} data-tint={tint ?? bg} data-header-solid={solidHeader ? "" : undefined}>
      <div className="wrap relative grid grid-cols-1 gap-10 pb-[clamp(5rem,12vw,11rem)] pt-36 lg:grid-cols-12 lg:pt-44">
        <div className="lg:col-span-8">
          {cjk && (
            <p className="font-cjk mb-4 text-xl opacity-75" aria-hidden>
              {cjk}
            </p>
          )}
          <RevealText as="h1" trigger="reveal" className="font-display t-h1" lines={title} lineClassName={["", "pl-[0.6em]"]} />
          {lead && <p className="t-lead measure mt-7 opacity-90">{lead}</p>}
        </div>
        {children && <div className="relative lg:col-span-4">{children}</div>}
      </div>
      <StrataDivider layers={layers} to={next} className="absolute inset-x-0 bottom-0" />
    </section>
  );
}
