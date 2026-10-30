"use client";
import { useState } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import { EditorialHero, EditorialStory } from "./CatalogEditorial";
const departmentProducts = {
 men: ["aero-runner", "urban-flex", "motion-02", "nano-street"],
 women: ["cloud-one", "classic-low", "pace-knit", "sol-terra"],
};

export default function Catalog({ sale = false, initialCategory = "", department }: { sale?: boolean; initialCategory?: string; department?: "men" | "women" }) {
 const source = department ? products.filter(p => departmentProducts[department].includes(p.id)) : sale ? products.filter(p => p.salePrice !== undefined && p.salePrice < p.price) : products.slice(0, 4);
 const pageTitle = department === "men" ? "Men" : department === "women" ? "Women" : sale ? "Sale" : "New Arrivals";
 const label = department ? `${pageTitle}’s Footwear` : sale ? "The Archive Edit" : "Latest Drops · 2026";
 const heading = department === "men" ? <>Made to move.<br /><em>Designed for you.</em></> : department === "women" ? <>Everyday ease.<br /><em>Your own expression.</em></> : sale ? <>Good design.<br /><em>Even better prices.</em></> : <>New season.<br /><em>New possibilities.</em></>;
 const description = department === "men" ? "From the morning commute to the miles ahead. Discover men’s footwear that brings considered design, lasting comfort, and effortless style to every day." : department === "women" ? "Thoughtful details. Effortless comfort. Discover women’s footwear made for your everyday rhythm, wherever the day takes you." : sale ? "Considered styles, exceptional value. Discover our reduced favourites, crafted with the same attention to every step." : "A fresh perspective on everyday movement. Meet the latest additions to SOLEA — purposeful design, effortless comfort.";
 const categories = [...new Set(source.map(p => p.category))];
 const [category, setCategory] = useState(categories.includes(initialCategory) ? initialCategory : "");
 const [size, setSize] = useState("");
 const [sort, setSort] = useState("featured");
 const [showFilters, setShowFilters] = useState(false);
 const filtered = source.filter(p => (!category || p.category === category) && (!size || p.sizes.includes(size)));
 const displayed = [...filtered].sort((a, b) => sort === "price-low" ? (a.salePrice ?? a.price) - (b.salePrice ?? b.price) : sort === "price-high" ? (b.salePrice ?? b.price) - (a.salePrice ?? a.price) : 0);
 const reset = () => { setCategory(""); setSize(""); setSort("featured"); };
 return <div className="catalog-page"><div className="container">
  <nav className="catalog-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">{pageTitle}</span></nav>
  {sale ? <Reveal><header className="catalog-heading"><div><p className="section-label">{label}</p><h1 className="section-title">{heading}</h1></div><p>{description}</p></header></Reveal> : <EditorialHero edition={department ?? "arrivals"} />}
  <section id="footwear" className="editorial-footwear" aria-label={`${pageTitle} footwear`}>
   {!sale && <Reveal><div className="editorial-grid-heading"><div><p className="section-label">{department === "men" ? "The daily rotation" : department === "women" ? "Considered favourites" : "The latest line-up"}</p><h2 className="section-title">{department === "men" ? "Ready for your everyday." : department === "women" ? "Find your kind of comfort." : "New to the collection."}</h2></div><p>{department === "men" ? "From performance to pavement." : department === "women" ? "Four silhouettes. Endless ways to wear them." : "Meet the styles making their next move."}</p></div></Reveal>}
   <div className="catalog-toolbar"><div className="catalog-controls"><button className="catalog-control" onClick={() => setShowFilters(!showFilters)} aria-expanded={showFilters} aria-controls="catalog-filters">Filters {category || size ? `(${Number(!!category) + Number(!!size)})` : "+"}</button><span role="status">{displayed.length} {displayed.length === 1 ? "style" : "styles"}</span></div><label className="catalog-sort">Sort by<select value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label></div>
   {showFilters && <div id="catalog-filters" className="catalog-filters animate-fade-up"><label>Collection<select value={category} onChange={e => setCategory(e.target.value)}><option value="">All collections</option>{categories.map(c => <option key={c}>{c}</option>)}</select></label><label>Size (EU)<select value={size} onChange={e => setSize(e.target.value)}><option value="">All sizes</option>{[...new Set(source.flatMap(p => p.sizes))].sort().map(s => <option key={s}>{s}</option>)}</select></label><button className="catalog-control" onClick={reset}>Clear filters</button></div>}
   <div className="catalog-products">{displayed.map((p, i) => <Reveal key={p.id} delay={i * 80}><ProductCard id={p.id} name={p.name} category={p.category} description={p.description} price={p.price} salePrice={p.salePrice} colors={p.colors.map(c => c.hex)} image={p.images[0]} badge={sale ? `SAVE ${Math.round((1 - p.salePrice! / p.price) * 100)}%` : p.badge} /></Reveal>)}</div>
   {!displayed.length && <div className="catalog-empty"><h2>No styles match your selection.</h2><button className="catalog-control" onClick={reset}>Clear filters</button></div>}
  </section>{!sale && <EditorialStory edition={department ?? "arrivals"} />}<Reveal><div className="catalog-end"><p>{sale ? "Find your next everyday favourite." : "Your next chapter starts here."}</p><Link className="btn-ghost" href="/collections">Explore Collections <span aria-hidden="true">↗</span></Link></div></Reveal>
 </div></div>;
}

