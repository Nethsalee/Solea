import "server-only";
import { adminAuth } from "./firebase-admin";
export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) { super(message); this.status = status; }
}
export async function requireUser(request: Request, admin = false) {
  const match = /^Bearer (\S+)$/i.exec(request.headers.get("authorization") ?? "");
  if (!match || match[1].length > 16384) throw new ApiError(401, "Please sign in to continue.");
  let decoded;
  try { decoded = await adminAuth().verifyIdToken(match[1], true); }
  catch (error) {
    const code = (error as { code?: string }).code ?? "";
    if (["auth/id-token-expired", "auth/id-token-revoked", "auth/argument-error", "auth/invalid-id-token", "auth/user-disabled", "auth/user-not-found"].includes(code)) throw new ApiError(401, "Your session is invalid. Please sign in again.");
    throw new ApiError(503, "Account verification is temporarily unavailable.");
  }
  if (admin && decoded.admin !== true) throw new ApiError(403, "Administrator access is required.");
  return decoded;
}
export function apiFailure(error: unknown) {
  if (error instanceof ApiError) return Response.json({ error: error.message }, { status: error.status, headers: { "Cache-Control": "no-store" } });
  return Response.json({ error: "The service is temporarily unavailable. Please try again." }, { status: 503, headers: { "Cache-Control": "no-store" } });
}
