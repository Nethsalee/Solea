import { notFound } from "next/navigation";
import { getProductById, products } from "@/data/products";
import ProductDetails from "@/components/ProductDetails";
export function generateStaticParams() { return products.map(p => ({ id: p.id })); }
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = getProductById(id);
  return { title: p ? `${p.name} | SOLEA` : "Style not found | SOLEA" };
}
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();
  return <ProductDetails key={product.id} product={product} />;
}
