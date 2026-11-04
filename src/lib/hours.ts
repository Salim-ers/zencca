import { hours } from "@/data/site";

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
export const fmt = (t: string) => t.replace(":", " h ").replace(" h 00", " h");

export type OpenState =
  | { open: true; closesAt: string }
  | { open: false; nextLabel: string; nextTime: string; today: boolean };

export function openState(date = new Date()): OpenState {
  const { day, minutes } = parisNow(date);
  const today = hours.find((h) => h.day === day);
  if (today?.open && today.close) {
    if (minutes >= toMin(today.open) && minutes < toMin(today.close)) return { open: true, closesAt: fmt(today.close) };
    if (minutes < toMin(today.open)) return { open: false, nextLabel: "aujourd'hui", nextTime: fmt(today.open), today: true };
  }
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    const h = hours.find((x) => x.day === d);
    if (h?.open) return { open: false, nextLabel: i === 1 ? "demain" : h.label.toLowerCase(), nextTime: fmt(h.open), today: false };
  }
  return { open: false, nextLabel: "", nextTime: "", today: false };
}
