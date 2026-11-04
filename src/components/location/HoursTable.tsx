"use client";

import { useEffect, useState } from "react";
import { hours } from "@/data/site";
import { fmt, parisNow } from "@/lib/hours";
import { cn } from "@/lib/utils";

export default function HoursTable() {
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => setToday(parisNow().day), []);
  return (
    <table className="w-full max-w-md text-left">
      <caption className="sr-only">Horaires d&apos;ouverture</caption>
      <tbody>
        {hours.map((h) => (
          <tr key={h.day} className={cn("border-b border-encre/10 last:border-0", today === h.day && "font-semibold")}>
            <th scope="row" className="py-2.5 pr-6 font-[inherit]">
              {h.label}
              {today === h.day && <span className="ml-2 rounded-full bg-enseigne px-2 py-0.5 text-xs">Aujourd&apos;hui</span>}
            </th>
            <td className="py-2.5 text-right tabular-nums">{h.open && h.close ? `${fmt(h.open)} – ${fmt(h.close)}` : "Fermé"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
