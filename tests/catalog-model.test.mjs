import test from "node:test";
import assert from "node:assert/strict";
import { validateProduct, toCatalogRecord } from "../lib/catalog-model.ts";
const example = { id: "test-shoe", name: "Test Shoe", department: "men", category: "COURT", description: "Cream", currency: "USD", priceMinor: 12900, status: "active", images: ["/images/test.png"], colors: [{ name: "Cream", value: "cream", hex: "#f5f0e8" }], sizes: ["40", "41"], inStock: true };
test("server derives display prices from integer cents, ignoring submitted prices and IDs", () => {
  const result = validateProduct({ ...example, id: "attacker-id", price: 1, salePrice: 2, salePriceMinor: 9900, admin: true }, "test-shoe");
  assert.equal(result.price, 129); assert.equal(result.salePrice, 99); assert.equal(result.id, "test-shoe"); assert.equal(result.admin, undefined);
});
test("rejects malformed price, sale price, path, and image URL", () => {
  for (const patch of [{ priceMinor: 1.5 }, { priceMinor: -100 }, { salePriceMinor: 12900 }, { images: ["javascript:alert(1)"] }, { images: ["https://unapproved.example/shoe.jpg"] }, { images: ["/images/../private"] }]) assert.throws(() => validateProduct({ ...example, ...patch }, example.id));
  assert.throws(() => validateProduct(example, "../users/admin"));
  assert.throws(() => validateProduct(example, null));
});
test("rejects malformed document bodies and missing options", () => {
  for (const patch of [{ department: "owner" }, { status: "published" }, { colors: [] }, { sizes: [] }, { currency: "EUR" }, { images: [] }]) assert.throws(() => validateProduct({ ...example, ...patch }, example.id));
  assert.throws(() => validateProduct(null, example.id));
});
test("validates kids records and preserves useful details", () => {
  const p = validateProduct({ ...example, department: "kids", sizes: ["24", "25", "24"], details: { features: ["Canvas upper"], materials: ["Canvas"], careInstructions: ["Wipe clean"], extra: "ignored" } }, example.id);
  assert.deepEqual(p.sizes, ["24", "25"]); assert.equal(p.details.extra, undefined);
});
test("converts existing local product prices to storage representation", () => {
  const p = toCatalogRecord({ ...example, price: 129, salePrice: 99 });
  assert.equal(p.priceMinor, 12900); assert.equal(p.salePriceMinor, 9900);
});
