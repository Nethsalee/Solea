import "./firebase-tools.mjs";
import { tools } from "./firebase-tools.mjs";
import { FieldValue } from "firebase-admin/firestore";
const { products } = await import("../data/products.ts");
const { kidsProducts } = await import("../data/kids.ts");
const { toCatalogRecord } = await import("../lib/catalog-model.ts");
const records = [...products, ...kidsProducts.map(p => ({ ...p, department: "kids" }))].map(toCatalogRecord);
if (new Set(records.map(p => p.id)).size !== records.length) throw new Error("Duplicate product IDs.");
if (!process.argv.includes("--write")) {
  console.log(`Dry run: ${records.length} products validated. No data was written. Use npm run db:seed -- --write after configuring Firebase.`);
} else {
  try {
    const { db, projectId } = tools();
    let created = 0;
    for (const product of records) {
      const ref = db.collection("products").doc(product.id);
      const added = await db.runTransaction(async tx => {
        if ((await tx.get(ref)).exists) return false;
        tx.create(ref, { ...product, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() });
        return true;
      });
      if (added) created++;
    }
    console.log(`Project ${projectId}: created ${created} products; kept ${records.length - created} existing products unchanged.`);
  } catch { console.error("Import failed. Check Firebase Admin credentials, the project ID, and that the default Firestore database exists. You can safely rerun this import."); process.exitCode = 1; }
}
