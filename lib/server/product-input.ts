import "server-only";
import { ApiError } from "./auth";
import { InputError, validateProduct } from "@/lib/catalog-model";
export async function readProduct(request: Request, id?: string) {
  const size = Number(request.headers.get("content-length") ?? 0);
  if (size > 65536) throw new ApiError(413, "Product data is too large.");
  const raw = await request.text();
  if (Buffer.byteLength(raw) > 65536) throw new ApiError(413, "Product data is too large.");
  let body;
  try { body = JSON.parse(raw); } catch { throw new ApiError(400, "Invalid JSON."); }
  try { return validateProduct(body, id ?? body?.id ?? ""); }
  catch (error) { if (error instanceof InputError) throw new ApiError(400, error.message); throw error; }
}
