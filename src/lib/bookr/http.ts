import type { BookrAdapter, BookrService, BookrSlot, CreateAppointmentInput, BookrAppointment } from "./types";

/**
 * Live adapter for the Bookr API.
 *
 * Bookr does not publish its API, so the endpoint paths and payload shapes
 * below are a best-guess contract kept in ONE place. When the clinic shares
 * the API documentation / token, adjust `paths` and the three `map*` helpers
 * and nothing else in the site needs to change.
 *
 * Required env:
 *   BOOKR_API_URL   e.g. https://api.bookr.pt/v1
 *   BOOKR_API_KEY   bearer token
 *   BOOKR_PROVIDER_ID (optional) professional id (Micaela)
 */
const paths = {
  services: "/services",
  slots: (serviceId: string, date: string, providerId?: string) =>
    `/availability?service_id=${encodeURIComponent(serviceId)}&date=${date}${providerId ? `&provider_id=${providerId}` : ""}`,
  appointments: "/appointments",
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const base = process.env.BOOKR_API_URL!;
  const res = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.BOOKR_API_KEY}`,
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Bookr ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json() as Promise<T>;
}

type RawService = { id: string; nome?: string; name?: string; duracao?: string; duration?: number; preco?: number; price?: number };
type RawSlot = { start?: string; inicio?: string; end?: string; fim?: string; provider_id?: string };
type RawAppointment = { id: string; reference?: string; referencia?: string; start?: string; inicio?: string; end?: string; fim?: string; status?: string };

function parseDuration(d?: string | number) {
  if (typeof d === "number") return d;
  if (!d) return 60;
  const [h, m] = d.split(":").map(Number);
  return h * 60 + (m || 0);
}

const mapService = (r: RawService): BookrService => ({
  id: r.id,
  name: (r.nome ?? r.name ?? "").trim(),
  durationMin: parseDuration(r.duracao ?? r.duration),
  price: Number(r.preco ?? r.price ?? 0),
});
const mapSlot = (r: RawSlot): BookrSlot => ({ start: r.start ?? r.inicio ?? "", end: r.end ?? r.fim ?? "", providerId: r.provider_id });
const mapAppointment = (r: RawAppointment): BookrAppointment => ({
  id: r.id,
  reference: r.reference ?? r.referencia ?? r.id.slice(0, 8).toUpperCase(),
  serviceId: "",
  start: r.start ?? r.inicio ?? "",
  end: r.end ?? r.fim ?? "",
  status: r.status === "confirmed" ? "confirmed" : "pending",
});

export const httpAdapter: BookrAdapter = {
  mode: "live",
  async listServices() {
    const data = await request<{ servicos?: RawService[]; services?: RawService[] } | RawService[]>(paths.services);
    const list = Array.isArray(data) ? data : (data.servicos ?? data.services ?? []);
    return list.map(mapService);
  },
  async findAvailableSlots(serviceId, dateISO) {
    const data = await request<{ slots?: RawSlot[]; horarios?: RawSlot[] } | RawSlot[]>(
      paths.slots(serviceId, dateISO, process.env.BOOKR_PROVIDER_ID)
    );
    const list = Array.isArray(data) ? data : (data.slots ?? data.horarios ?? []);
    return list.map(mapSlot);
  },
  async createAppointment(input: CreateAppointmentInput) {
    const body = {
      service_id: input.serviceId,
      provider_id: process.env.BOOKR_PROVIDER_ID,
      start: input.start,
      client: { name: input.client.name, phone: input.client.phone, email: input.client.email },
      notes: input.notes,
      source: "website",
    };
    const data = await request<RawAppointment>(paths.appointments, { method: "POST", body: JSON.stringify(body) });
    return { ...mapAppointment(data), serviceId: input.serviceId };
  },
};
