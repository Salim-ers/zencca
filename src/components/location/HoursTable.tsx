"use client";

import { useEffect, useState } from "react";
import { hours } from "@/data/site";
import { useLocale, useT } from "@/i18n/client";
import { fmtTime, parisNow } from "@/lib/hours";
import { cn } from "@/lib/utils";

export default function HoursTable() {
  const locale = useLocale();
  const t = useT().visite;
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => setToday(parisNow().day), []);
  return (
    <table className="w-full max-w-md text-left">
      <caption className="sr-only">{t.hoursCaption}</caption>
      <tbody>
        {hours.map((h) => (
          <tr key={h.day} className={cn("border-b border-encre/10 last:border-0", today === h.day && "font-semibold")}>
            <th scope="row" className="py-2.5 pr-6 font-[inherit]">
              {h.label[locale]}
              {today === h.day && <span className="ml-2 rounded-full bg-enseigne px-2 py-0.5 text-xs">{t.today}</span>}
            </th>
            <td className="py-2.5 text-right tabular-nums">{h.open && h.close ? `${fmtTime(h.open, locale)} – ${fmtTime(h.close, locale)}` : t.closed}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
