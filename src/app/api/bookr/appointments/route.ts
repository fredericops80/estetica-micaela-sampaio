import type { NextRequest } from "next/server";
import { getBookr } from "@/lib/bookr";

const phoneRe = /^\+?[0-9 ]{9,16}$/;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const b = body as Record<string, unknown>;
  const client = (b.client ?? {}) as Record<string, unknown>;
  const name = String(client.name ?? "").trim();
  const phone = String(client.phone ?? "").trim();
  const email = String(client.email ?? "").trim();
  const serviceId = String(b.serviceId ?? "");
  const start = String(b.start ?? "");

  if (!serviceId || !start || Number.isNaN(Date.parse(start))) {
    return Response.json({ error: "serviceId and start are required" }, { status: 400 });
  }
  if (name.length < 3 || !phoneRe.test(phone) || (email && !emailRe.test(email))) {
    return Response.json({ error: "Invalid client details" }, { status: 400 });
  }
  if (b.consent !== true) {
    return Response.json({ error: "Consent required" }, { status: 400 });
  }

  try {
    const bookr = getBookr();
    const appointment = await bookr.createAppointment({
      serviceId,
      start,
      client: { name, phone, email: email || undefined },
      notes: typeof b.notes === "string" ? b.notes.slice(0, 500) : undefined,
      locale: b.locale === "en" ? "en" : "pt",
    });
    return Response.json({ mode: bookr.mode, appointment }, { status: 201 });
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 502 });
  }
}
