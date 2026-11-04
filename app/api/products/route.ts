import { getCatalog } from "@/lib/server/catalog";
import { apiFailure } from "@/lib/server/auth";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try {
    const params = new URL(request.url).searchParams;
    const items = (await getCatalog()).filter(p => (!params.get("category") || p.category.toLowerCase() === params.get("category")!.toLowerCase()) && (!params.get("department") || p.department === params.get("department")) && (params.get("featured") !== "true" || p.featured));
    return Response.json(items, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return apiFailure(error); }
}
