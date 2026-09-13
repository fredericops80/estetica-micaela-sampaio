import { clinic } from "@/data/clinic";

/** Returns whether the clinic is open right now (Europe/Lisbon) and the next opening. */
export function openStatus(now = new Date()) {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: clinic.timezone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = Object.fromEntries(fmt.formatToParts(now).map((p) => [p.type, p.value]));
  const dayMap: Record<string, number> = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 };
  const day = dayMap[parts.weekday] ?? 1;
  const minutes = Number(parts.hour) * 60 + Number(parts.minute);
  const toMin = (s: string) => Number(s.slice(0, 2)) * 60 + Number(s.slice(3, 5));

  const today = clinic.hours.find((h) => (h.days as readonly number[]).includes(day));
  if (today && minutes >= toMin(today.open) && minutes < toMin(today.close)) {
    return { open: true as const, closes: today.close };
  }
  // next opening
  for (let i = 0; i < 8; i++) {
    const d = ((day - 1 + i) % 7) + 1;
    const rule = clinic.hours.find((h) => (h.days as readonly number[]).includes(d));
    if (!rule) continue;
    if (i === 0 && minutes >= toMin(rule.open)) continue;
    return { open: false as const, nextDay: d, nextOpen: rule.open, isToday: i === 0 };
  }
  return { open: false as const, nextDay: 2, nextOpen: "09:30", isToday: false };
}
