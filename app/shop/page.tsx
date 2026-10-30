import Catalog from "@/components/Catalog";
export const metadata = { title: "New Arrivals | SOLEA" };
export default async function ShopPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
 const { category } = await searchParams;
 return <Catalog key={category ?? "all"} initialCategory={category} />;
}
