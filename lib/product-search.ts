import type { Product } from "@/types";

type SearchableProduct = Pick<Product, "name" | "category" | "description" | "colors" | "badge" | "price" | "salePrice"> & { audience: string };
const normalise = (value: string) => value.toLowerCase().normalize("NFKD").replace(/[’']/g, "").replace(/[^a-z0-9]+/g, " ").trim();
export function searchProducts<T extends SearchableProduct>(items: T[], query: string): T[] {
  const terms = normalise(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return items.filter(p => {
    const searchable = normalise([p.name, p.category, p.description, p.badge ?? "", p.audience, ...p.colors.map(c => c.name), p.salePrice !== undefined && p.salePrice < p.price ? "sale discount" : ""].join(" "));
    const words = searchable.split(" ");
    return terms.every(term => words.some(word => word.startsWith(term)));
  });
}
