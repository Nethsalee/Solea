import { notFound } from "next/navigation";
import { getCatalog } from "@/lib/server/catalog";
import KidsProduct from "@/components/KidsProduct";
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = (await getCatalog()).find(p => p.id === id && p.department === "kids");
  return { title: product ? `${product.name} | SOLEA Kids` : "Style not found | SOLEA" };
}
export default async function KidsProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = (await getCatalog()).find(p => p.id === id && p.department === "kids");
  if (!product) notFound();
  return <KidsProduct key={product.id} product={product} />;
}
