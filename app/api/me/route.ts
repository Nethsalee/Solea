import { requireUser, apiFailure } from "@/lib/server/auth";
export const runtime = "nodejs";
export async function GET(request: Request) {
  try { const user = await requireUser(request); return Response.json({ uid: user.uid, email: user.email ?? null, admin: user.admin === true }, { headers: { "Cache-Control": "no-store" } }); }
  catch (error) { return apiFailure(error); }
}
