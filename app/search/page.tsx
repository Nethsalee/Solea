import Link from "next/link";
import { products } from "@/data/products";
import { kidsProducts } from "@/data/kids";
import { searchProducts } from "@/lib/product-search";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";

export const metadata = { title: "Search Footwear | SOLEA", description: "Search SOLEA footwear by name, collection, or colour.", robots: { index: false, follow: true } };
const womenIds = new Set(["cloud-one", "classic-low", "pace-knit", "sol-terra"]);
const catalog = [
  ...products.map(p => ({ ...p, audience: womenIds.has(p.id) ? "women womens" : "men mens", href: `/product/${p.id}` })),
  ...kidsProducts.map(p => ({ ...p, audience: "kids children junior", href: `/kids/${p.id}` })),
];
const suggestedIds = ["aero-runner", "cloud-one", "hop-mini", "sunny-step"];

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const params = await searchParams;
  const query = (typeof params.q === "string" ? params.q : params.q?.[0] ?? "").trim().slice(0, 150);
  const results = searchProducts(catalog, query);
  const displayed = query ? results : suggestedIds.flatMap(id => catalog.filter(p => p.id === id));
  return <div className="catalog-page search-page"><div className="container">
    <div className="search-topline"><nav className="catalog-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">Search</span></nav><Link href="/collections" className="search-browse">Browse collections <span aria-hidden="true">↗</span></Link></div>
    <section className="search-workspace" aria-labelledby="search-page-title">
      <header className="search-heading"><h1 id="search-page-title">Search</h1><p>Your next pair is a search away.</p></header>
      <form action="/search" method="get" role="search" className="product-search-form"><label htmlFor="product-search" className="sr-only">Search footwear by name, collection, or colour</label><div className="search-field"><svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg><input key={query} id="product-search" name="q" type="search" defaultValue={query} placeholder="Search styles, collections, colours…" maxLength={150} autoFocus />{query && <Link href="/search" className="search-clear" aria-label="Clear search">×</Link>}<button className="search-submit" type="submit" aria-label="Submit search"><span className="search-submit-label">Search</span><span aria-hidden="true">↗</span></button></div></form>
      <div className="search-suggestions"><span>Try searching</span>{["Aero Runner", "Play Club", "Mint", "Sale"].map(term => <Link key={term} href={`/search?q=${encodeURIComponent(term)}`}>{term}<span aria-hidden="true">↗</span></Link>)}</div>
    </section>
    {!query && <Reveal><nav className="search-collection-links" aria-label="Shop by collection">{[{ name: "Men", subtitle: "Everyday essentials", href: "/men", number: "01" }, { name: "Women", subtitle: "Your everyday edit", href: "/women", number: "02" }, { name: "Kids", subtitle: "Small steps, big fun", href: "/kids", number: "03" }].map(c => <Link key={c.name} href={c.href}><span className="search-collection-number">{c.number}</span><span><strong>{c.name}</strong><small>{c.subtitle}</small></span><span className="search-collection-arrow" aria-hidden="true">↗</span></Link>)}</nav></Reveal>}
    <section aria-labelledby="search-results-title"><div className="search-result-heading"><div><p>{query ? "THE SEARCH EDIT" : "A LITTLE INSPIRATION"}</p><h2 id="search-results-title">{query ? <>Results for “{query}”</> : "Worth a look"}</h2></div><span>{query ? `${results.length} ${results.length === 1 ? "style" : "styles"} found` : "Selected for your everyday"}</span></div>
      {displayed.length ? <div className="catalog-products">{displayed.map((p, i) => <Reveal key={p.id} delay={Math.min(i, 3) * 70}><ProductCard id={p.id} name={p.name} category={p.category} description={p.description} price={p.price} salePrice={p.salePrice} colors={p.colors.map(c => c.hex)} image={p.images[0]} badge={p.badge} href={p.href} /></Reveal>)}</div> : <div className="search-empty"><span className="search-empty-symbol" aria-hidden="true">⌕</span><h3>No matches this time.</h3><p>Try a different name, a simpler phrase, or a colour you love.</p><div><Link href="/search" className="btn-primary">Start a new search ↗</Link><Link href="/collections" className="btn-ghost">Explore collections</Link></div></div>}
    </section>
  </div></div>;
}
