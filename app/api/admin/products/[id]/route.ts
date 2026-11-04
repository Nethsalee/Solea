import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/server/firebase-admin";
import { requireUser, ApiError, apiFailure } from "@/lib/server/auth";
import { readProduct } from "@/lib/server/product-input";
import { validProductId } from "@/lib/catalog-model";
export const runtime = "nodejs";
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser(request, true);
    const { id } = await params;
    if (!validProductId(id)) throw new ApiError(400, "Invalid product ID.");
    const product = await readProduct(request, id);
    const ref = adminDb().collection("products").doc(id);
    await adminDb().runTransaction(async transaction => {
      const existing = await transaction.get(ref);
      if (!existing.exists) throw new ApiError(404, "Product not found.");
      transaction.set(ref, { ...product, createdAt: existing.get("createdAt") ?? FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp(), updatedBy: user.uid });
    });
    return Response.json(product, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return apiFailure(error); }
}
