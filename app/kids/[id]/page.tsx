import { notFound } from "next/navigation";
import { kidsProducts } from "@/data/kids";
import KidsProduct from "@/components/KidsProduct";

export function generateStaticParams() { return kidsProducts.map(p => ({ id: p.id })); }
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = kidsProducts.find(p => p.id === id);
  return { title: product ? `${product.name} | SOLEA Kids` : "Style not found | SOLEA" };
}
export default async function KidsProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = kidsProducts.find(p => p.id === id);
  if (!product) notFound();
  return <KidsProduct product={product} />;
}
