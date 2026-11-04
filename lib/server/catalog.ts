import "server-only";
import { cache } from "react";
import { connection } from "next/server";
import { products } from "@/data/products";
import { kidsProducts } from "@/data/kids";
import { toCatalogRecord, validateProduct } from "@/lib/catalog-model";
import { adminDb } from "./firebase-admin";
export const firestoreEnabled = () => process.env.CATALOG_SOURCE === "firestore";
export const getCatalog = cache(async () => {
  if (!firestoreEnabled()) {
    if (process.env.CATALOG_SOURCE && process.env.CATALOG_SOURCE !== "local") throw new Error("Invalid CATALOG_SOURCE.");
    return [...products, ...kidsProducts.map(p => ({ ...p, department: "kids" as const }))].map(toCatalogRecord);
  }
  await connection();
  const snapshot = await adminDb().collection("products").where("status", "==", "active").limit(500).get();
  return snapshot.docs.map(doc => validateProduct(doc.data(), doc.id)).sort((a, b) => a.name.localeCompare(b.name));
});
