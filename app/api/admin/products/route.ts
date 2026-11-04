import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/server/firebase-admin";
import { requireUser, ApiError, apiFailure } from "@/lib/server/auth";
import { readProduct } from "@/lib/server/product-input";
import { firestoreEnabled } from "@/lib/server/catalog";
export const runtime = "nodejs";
export async function GET(request: Request) {
  try {
    await requireUser(request, true);
    const snapshot = await adminDb().collection("products").limit(500).get();
    return Response.json({ products: snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, createdAt: undefined, updatedAt: undefined })), live: firestoreEnabled() }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return apiFailure(error); }
}
export async function POST(request: Request) {
  try {
    const user = await requireUser(request, true);
    const product = await readProduct(request);
    try { await adminDb().collection("products").doc(product.id).create({ ...product, updatedBy: user.uid, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() }); }
    catch (error) { if ((error as { code?: number }).code === 6) throw new ApiError(409, "That product ID already exists."); throw error; }
    return Response.json(product, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch (error) { return apiFailure(error); }
}
