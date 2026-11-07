"use client";

import { useEffect, useState } from "react";
import { hours } from "@/data/site";
import { useLocale, useT } from "@/i18n/client";
import { fmtTime, openState, type OpenState } from "@/lib/hours";
import { cn } from "@/lib/utils";

/** « Ouvert jusqu'à 19 h 30 » — calculé à l'heure de Paris, côté navigateur. */
export default function OpenStatus({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const locale = useLocale();
  const t = useT().visite;
  const [s, setS] = useState<OpenState | null>(null);
  useEffect(() => {
    const update = () => setS(openState());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  let text = "";
  if (s?.open) text = t.openUntil(fmtTime(s.closesAt, locale));
  else if (s?.next) {
    const { kind, day, time } = s.next;
    const when = kind === "today" ? t.whenToday : kind === "tomorrow" ? t.whenTomorrow : t.whenDay(hours.find((h) => h.day === day)!.label[locale]);
    text = t.closedOpens(when, fmtTime(time, locale));
  }

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
          {text}
        </>
      )}
    </p>
  );
}
