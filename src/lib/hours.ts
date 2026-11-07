import { hours } from "@/data/site";
import type { Locale } from "@/i18n/routes";

/** Heure courante à Paris, quel que soit le fuseau du visiteur. */
export function parisNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Paris",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const wd = parts.find((p) => p.type === "weekday")!.value;
  const h = Number(parts.find((p) => p.type === "hour")!.value) % 24;
  const m = Number(parts.find((p) => p.type === "minute")!.value);
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(wd);
  return { day, minutes: h * 60 + m };
}

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** « 10 h 30 » en français, « 10:30 am » en anglais. */
export function fmtTime(t: string, locale: Locale) {
  if (locale === "fr") return t.replace(":", " h ").replace(" h 00", " h");
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = h % 12 || 12;
  return m ? `${h12}:${String(m).padStart(2, "0")} ${suffix}` : `${h12} ${suffix}`;
}

export type OpenState =
  | { open: true; closesAt: string }
  | { open: false; next: { kind: "today" | "tomorrow" | "day"; day: number; time: string } | null };

export function openState(date = new Date()): OpenState {
  const { day, minutes } = parisNow(date);
  const today = hours.find((h) => h.day === day);
  if (today?.open && today.close) {
    if (minutes >= toMin(today.open) && minutes < toMin(today.close)) return { open: true, closesAt: today.close };
    if (minutes < toMin(today.open)) return { open: false, next: { kind: "today", day, time: today.open } };
  }
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    const h = hours.find((x) => x.day === d);
    if (h?.open) return { open: false, next: { kind: i === 1 ? "tomorrow" : "day", day: d, time: h.open } };
  }
  return { open: false, next: null };
}
