"use client";
import { createContext, useContext, type ReactNode } from "react";
import type { CatalogProduct } from "@/lib/catalog-model";
const CatalogContext = createContext<CatalogProduct[]>([]);
export const useCatalog = () => useContext(CatalogContext);
export default function CatalogProvider({ products, children }: { products: CatalogProduct[]; children: ReactNode }) {
  return <CatalogContext.Provider value={products}>{children}</CatalogContext.Provider>;
}
