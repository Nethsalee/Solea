import Link from "next/link";
import { products } from "@/data/products";
import { kidsProducts } from "@/data/kids";
import { searchProducts } from "@/lib/product-search";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";

export const metadata = { title: "Search Footwear | SOLEA", description: "Find your next favourite pair. Search SOLEA footwear by name, collection, or colour.", robots: { index: false, follow: true } };
const womenIds = new Set(["cloud-one", "classic-low", "pace-knit", "sol-terra"]);
const catalog = [
  ...products.map(p => ({ ...p, audience: womenIds.has(p.id) ? "women womens" : "men mens", href: `/product/${p.id}` })),
  ...kidsProducts.map(p => ({ ...p, audience: "kids children junior", href: `/kids/${p.id}` })),
];
export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const params = await searchParams;
  const query = (typeof params.q === "string" ? params.q : params.q?.[0] ?? "").trim().slice(0, 150);
  const results = searchProducts(catalog, query);
  return <div className="catalog-page search-page"><div className="container">
    <nav className="catalog-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">Search</span></nav>
    <Reveal><header className="search-heading"><p className="section-label">A pair for every direction</p><h1 className="section-title">Find your next<br /><em>favourite.</em></h1><p>Search by style, collection, or colour.</p></header></Reveal>
    <form action="/search" method="get" role="search" className="product-search-form"><label htmlFor="product-search">Search footwear</label><div><input key={query} id="product-search" name="q" type="search" defaultValue={query} placeholder="Try Aero Runner, Play Club, or mint…" maxLength={150} autoFocus /><button className="btn-primary" type="submit">Search <span aria-hidden="true">↗</span></button></div></form>
    <div className="search-suggestions"><span>Explore:</span>{["Aero Runner", "Play Club", "Kids", "Sale"].map(term => <Link key={term} href={`/search?q=${encodeURIComponent(term)}`}>{term}</Link>)}</div>
    {query ? <section aria-labelledby="search-results-title"><div className="search-result-heading"><h2 id="search-results-title">Results for “{query}”</h2><span>{results.length} {results.length === 1 ? "style" : "styles"}</span></div>{results.length ? <div className="catalog-products">{results.map((p, i) => <Reveal key={p.id} delay={Math.min(i, 3) * 70}><ProductCard id={p.id} name={p.name} category={p.category} description={p.description} price={p.price} salePrice={p.salePrice} colors={p.colors.map(c => c.hex)} image={p.images[0]} badge={p.badge} href={p.href} /></Reveal>)}</div> : <div className="catalog-empty"><h3>No matching styles yet.</h3><p>Try a shorter name, another colour, or browse our collections.</p><Link href="/collections" className="btn-ghost">Explore Collections ↗</Link></div>}</section> : <div className="search-start"><p>Start with a name you know, or discover something new.</p><Link href="/collections" className="btn-ghost">Browse all collections ↗</Link></div>}
  </div></div>;
}
