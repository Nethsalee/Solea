import { notFound } from "next/navigation";
import { getCatalog } from "@/lib/server/catalog";
import ProductDetails from "@/components/ProductDetails";
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = (await getCatalog()).find(p => p.id === id && p.department !== "kids");
  return { title: p ? `${p.name} | SOLEA` : "Style not found | SOLEA" };
}
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = (await getCatalog()).find(p => p.id === id && p.department !== "kids");
  if (!product) notFound();
  return <ProductDetails key={product.id} product={product} />;
}
