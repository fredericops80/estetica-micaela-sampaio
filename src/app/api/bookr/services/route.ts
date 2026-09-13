import { getBookr } from "@/lib/bookr";

export async function GET() {
  try {
    const bookr = getBookr();
    const services = await bookr.listServices();
    return Response.json({ mode: bookr.mode, services });
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 502 });
  }
}
