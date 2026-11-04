import type { Product } from "@/types";
export type CatalogProduct = Product & { currency: string; priceMinor: number; salePriceMinor?: number; status: "active" | "draft" };
export class InputError extends Error {}
const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export function validProductId(id: string) { return typeof id === "string" && id.length <= 100 && idPattern.test(id); }
function text(value: unknown, key: string, max = 200): string {
  if (typeof value !== "string" || !value.trim() || value.trim().length > max) throw new InputError(`Invalid ${key}.`);
  return value.trim();
}
export function validateProduct(input: unknown, id: string): CatalogProduct {
  if (!validProductId(id)) throw new InputError("Use a lowercase product ID with letters, numbers, and hyphens.");
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new InputError("A product object is required.");
  const p = input as Record<string, unknown>;
  const department = p.department;
  if (!["men", "women", "kids"].includes(String(department))) throw new InputError("Choose a department.");
  if (p.status !== "active" && p.status !== "draft") throw new InputError("Choose active or draft.");
  if (p.currency !== "USD") throw new InputError("This storefront currently uses USD.");
  if (!Number.isSafeInteger(p.priceMinor) || Number(p.priceMinor) < 1 || Number(p.priceMinor) > 100000000) throw new InputError("Price must be a positive integer in cents.");
  const priceMinor = Number(p.priceMinor);
  const sale = p.salePriceMinor;
  if (sale !== undefined && sale !== null && (!Number.isSafeInteger(sale) || Number(sale) < 1 || Number(sale) >= priceMinor)) throw new InputError("Sale price must be below the regular price.");
  if (!Array.isArray(p.images) || p.images.length < 1 || p.images.length > 12) throw new InputError("Provide between 1 and 12 images.");
  const images = p.images.map(src => {
    const image = text(src, "image URL", 2000);
    if (image.startsWith("/images/") && !image.includes("..") && !image.includes("\\") && !image.includes("?")) return image;
    try { const u = new URL(image); if (u.protocol === "https:" && u.hostname === "images.unsplash.com" && !u.username && !u.password && !u.port) return image; } catch {}
    throw new InputError("Images must use /images/ files or https://images.unsplash.com URLs.");
  });
  if (!Array.isArray(p.sizes) || p.sizes.length < 1 || p.sizes.length > 30) throw new InputError("Provide available EU sizes.");
  const sizes = [...new Set(p.sizes.map(s => { const size = text(s, "size", 5); if (!/^\d{2}(?:\.5)?$/.test(size) || Number(size) < 15 || Number(size) > 50) throw new InputError("Invalid EU size."); return size; }))];
  if (!Array.isArray(p.colors) || p.colors.length < 1 || p.colors.length > 12) throw new InputError("Provide between 1 and 12 colours.");
  const colors = p.colors.map(c => { if (!c || typeof c !== "object") throw new InputError("Invalid colour."); const color = c as Record<string, unknown>; const hex = text(color.hex, "colour hex", 7); if (!/^#[a-f\d]{6}$/i.test(hex)) throw new InputError("Use a six-digit hex colour."); return { name: text(color.name, "colour name", 80), value: text(color.value, "colour value", 80), hex }; });
  const result: CatalogProduct = { id, slug: id, department: department as Product["department"], name: text(p.name, "name", 120), category: text(p.category, "category", 80), description: text(p.description, "description", 2000), images: [...new Set(images)], sizes, colors, priceMinor, price: priceMinor / 100, currency: "USD", status: p.status, inStock: p.inStock === true, featured: p.featured === true, newArrival: p.newArrival === true };
  if (sale !== undefined && sale !== null) { result.salePriceMinor = Number(sale); result.salePrice = Number(sale) / 100; }
  if (p.badge) result.badge = text(p.badge, "badge", 40);
  // Preserve supported product information, without accepting arbitrary fields.
  if (p.details && typeof p.details === "object") {
    const d = p.details as Record<string, unknown>;
    const list = (value: unknown) => Array.isArray(value) ? value.slice(0, 20).map(v => text(v, "detail", 500)) : [];
    result.details = { features: list(d.features), materials: list(d.materials), careInstructions: list(d.careInstructions) };
    if (d.weight) result.details.weight = text(d.weight, "weight", 80);
    if (d.sustainabilityInfo) result.details.sustainabilityInfo = text(d.sustainabilityInfo, "sustainability information", 1000);
  }
  return result;
}
export function toCatalogRecord(product: Product): CatalogProduct {
  return validateProduct({ ...product, currency: "USD", status: "active", priceMinor: Math.round(product.price * 100), ...(product.salePrice !== undefined ? { salePriceMinor: Math.round(product.salePrice * 100) } : {}) }, product.id);
}
