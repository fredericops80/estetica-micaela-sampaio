import { services } from "@/data/services";
import { clinic } from "@/data/clinic";
import type { BookrAdapter, BookrSlot, CreateAppointmentInput, BookrAppointment } from "./types";

/**
 * Deterministic mock used until the Bookr HTTP credentials are configured.
 * Generates slots inside opening hours, on a 30-minute grid, and hides a few
 * of them pseudo-randomly so the calendar feels real.
 */
function seeded(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export const mockAdapter: BookrAdapter = {
  mode: "mock",
  async listServices() {
    return services.map((s) => ({ id: s.bookrId, name: s.name, durationMin: s.durationMin, price: s.price }));
  },
  async findAvailableSlots(serviceId, dateISO) {
    const service = services.find((s) => s.bookrId === serviceId);
    if (!service) return [];
    const date = new Date(`${dateISO}T00:00:00`);
    const weekday = ((date.getDay() + 6) % 7) + 1; // ISO
    const rule = clinic.hours.find((h) => (h.days as readonly number[]).includes(weekday));
    if (!rule) return [];
    const rand = seeded(`${serviceId}:${dateISO}`);
    const slots: BookrSlot[] = [];
    const open = toMinutes(rule.open);
    const close = toMinutes(rule.close);
    for (let t = open; t + service.durationMin <= close; t += 30) {
      if (rand() < 0.42) continue;
      const sh = String(Math.floor(t / 60)).padStart(2, "0");
      const sm = String(t % 60).padStart(2, "0");
      const e = t + service.durationMin;
      const eh = String(Math.floor(e / 60)).padStart(2, "0");
      const em = String(e % 60).padStart(2, "0");
      slots.push({ start: `${dateISO}T${sh}:${sm}:00`, end: `${dateISO}T${eh}:${em}:00` });
    }
    return slots;
  },
  async createAppointment(input: CreateAppointmentInput): Promise<BookrAppointment> {
    const service = services.find((s) => s.bookrId === input.serviceId);
    if (!service) throw new Error("Unknown service");
    const start = new Date(input.start);
    const end = new Date(start.getTime() + service.durationMin * 60000);
    const ref = `MS-${start.toISOString().slice(2, 10).replace(/-/g, "")}-${Math.floor(Math.random() * 900 + 100)}`;
    return {
      id: crypto.randomUUID(),
      reference: ref,
      serviceId: input.serviceId,
      start: input.start,
      end: end.toISOString(),
      status: "pending",
    };
  },
};
