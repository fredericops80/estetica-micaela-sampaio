import type { NextRequest } from "next/server";
import { getBookr } from "@/lib/bookr";

export async function GET(req: NextRequest) {
  const serviceId = req.nextUrl.searchParams.get("serviceId");
  const date = req.nextUrl.searchParams.get("date");
  if (!serviceId || !date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return Response.json({ error: "serviceId and date (YYYY-MM-DD) are required" }, { status: 400 });
  }
  try {
    const bookr = getBookr();
    const slots = await bookr.findAvailableSlots(serviceId, date);
    return Response.json({ mode: bookr.mode, slots });
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 502 });
  }
}
