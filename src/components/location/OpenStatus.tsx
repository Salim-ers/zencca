"use client";

import { useEffect, useState } from "react";
import { openState, type OpenState } from "@/lib/hours";
import { cn } from "@/lib/utils";

/** « Ouvert jusqu'à 19 h 30 » — calculé à l'heure de Paris, côté navigateur. */
export default function OpenStatus({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const [s, setS] = useState<OpenState | null>(null);
  useEffect(() => {
    const update = () => setS(openState());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);
  return (
    <p className={cn("flex min-h-6 items-center gap-2 text-[0.95rem] font-medium", className)} aria-live="polite">
      {s && (
        <>
          <span
            aria-hidden
            className={cn("relative inline-flex h-2.5 w-2.5 rounded-full", s.open ? "bg-matcha-fonce" : tone === "light" ? "bg-papier/50" : "bg-encre/40")}
          >
            {s.open && <span className="absolute inset-0 animate-ping rounded-full bg-matcha-fonce/60" />}
          </span>
          {s.open ? `Ouvert jusqu'à ${s.closesAt}` : `Fermé, ouvre ${s.nextLabel} à ${s.nextTime}`}
        </>
      )}
    </p>
  );
}
