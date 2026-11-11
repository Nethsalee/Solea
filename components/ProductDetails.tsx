"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { useCatalog } from "./CatalogProvider";
import { useCart } from "@/hooks/useCart";
import ProductCard from "./ProductCard";
import FavoriteButton from "./FavoriteButton";
import Reveal from "./Reveal";

export default function ProductDetails({ product }: { product: Product }) {
  const [size, setSize] = useState("");
  const [colour, setColour] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { addItem } = useCart();
  const price = product.salePrice ?? product.price;
  const department = product.department ?? "men";
  const products = useCatalog();
  const related = products.filter(p => p.id !== product.id && p.department === department).slice(0, 4);
  function add() {
    if (!size) { setError("Please choose an EU size first."); return; }
    addItem({ productId: product.id, name: product.name, price, quantity, size, color: colour, image: product.images[0] });
    setError(""); setMessage(`${quantity} × ${product.name}, EU ${size}, added to your bag.`);
  }
  return <div className="catalog-page product-detail-page"><div className="container">
    <nav className="catalog-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href={`/${department}`}>{department === "women" ? "Women" : "Men"}</Link><span>/</span><span aria-current="page">{product.name}</span></nav>
    <Reveal><div className="kids-product-layout"><div><div className="kids-product-image"><Image src={product.images[image]} alt={`${product.name} — ${product.description}`} fill priority sizes="(max-width: 800px) 100vw, 50vw" />{product.badge && <span className="product-badge">{product.badge}</span>}</div>{product.images.length > 1 && <div className="detail-thumbnails">{product.images.map((src, i) => <button key={src} onClick={() => setImage(i)} aria-label={`View ${i + 1} of ${product.name}`} aria-pressed={image === i}><Image src={src} alt="" fill sizes="90px" /></button>)}</div>}</div>
    <section className="kids-product-info"><p className="section-label">{product.category}</p><h1>{product.name}</h1><p className="kids-product-price">${price}{product.salePrice !== undefined && <del className="detail-original">${product.price}</del>}</p><p>{product.description}</p>
    <fieldset className="detail-colours"><legend>Colour: {colour.name}</legend>{product.colors.map(c => <button key={c.value} style={{ backgroundColor: c.hex }} aria-label={c.name} aria-pressed={colour.value === c.value} onClick={() => { setColour(c); setMessage(""); }} />)}</fieldset>
    <fieldset className="kids-sizes"><legend>Choose size (EU)</legend>{product.sizes.map(s => <button key={s} aria-pressed={size === s} onClick={() => { setSize(s); setError(""); setMessage(""); }}>{s}</button>)}</fieldset>
    <label className="detail-quantity">Quantity<select value={quantity} onChange={e => { setQuantity(Number(e.target.value)); setMessage(""); }}>{Array.from({ length: 10 }, (_, i) => <option key={i + 1}>{i + 1}</option>)}</select></label><button className="btn-primary kids-add" onClick={add}>Add to bag — ${price * quantity} ↗</button><FavoriteButton id={product.id} name={product.name} />{error && <p role="alert">{error}</p>}{message && <p role="status">{message}</p>}
    <details open><summary>About this style</summary>{product.details?.features?.length ? <ul className="detail-features">{product.details.features.map(f => <li key={f}>{f}</li>)}</ul> : <p>{product.name} is part of the SOLEA {product.category.toLowerCase()} edit. Available in EU sizes {product.sizes[0]}–{product.sizes.at(-1)}.</p>}</details>
    <details><summary>Materials & care</summary>{product.details?.materials.map(m => <p key={m}>{m}</p>)}{(product.details?.careInstructions ?? ["Gently wipe away surface dirt and air dry away from direct heat."]).map(c => <p key={c}>{c}</p>)}<Link href="/materials" className="kids-fit-link">Explore the materials guide ↗</Link></details>
    <Link href={`/${department}`} className="kids-fit-link">← Back to the {department === "women" ? "women’s" : "men’s"} edit</Link></section></div></Reveal>
    <section className="editorial-footwear"><h2 className="section-title">More for your everyday.</h2><div className="catalog-products">{related.map(p => <ProductCard key={p.id} id={p.id} name={p.name} category={p.category} description={p.description} price={p.price} salePrice={p.salePrice} colors={p.colors.map(c => c.hex)} image={p.images[0]} badge={p.badge} />)}</div></section>
  </div></div>;
}
