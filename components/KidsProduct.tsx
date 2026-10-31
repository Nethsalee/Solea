"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { kidsProducts } from "@/data/kids";
import { useCart } from "@/hooks/useCart";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

export default function KidsProduct({ product }: { product: Product }) {
  const [size, setSize] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { addItem } = useCart();
  function addToBag() {
    if (!size) { setError("Please choose an EU size first."); return; }
    addItem({ productId: product.id, name: product.name, price: product.price, quantity: 1, size, color: product.colors[0], image: product.images[0] });
    setError(""); setMessage(`${product.name}, EU ${size}, added to your bag.`);
  }
  return <div className="catalog-page kids-page"><div className="container"><nav className="catalog-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/kids">Kids</Link><span>/</span><span aria-current="page">{product.name}</span></nav>
    <Reveal><div className="kids-product-layout"><div className="kids-product-image"><Image src={product.images[0]} alt={`${product.name} — ${product.description}`} fill priority sizes="(max-width: 800px) 100vw, 50vw" /></div><section className="kids-product-info"><p className="section-label">Kids / {product.category}</p><h1>{product.name}</h1><p className="kids-product-price">${product.price}</p><p>{product.description}</p><p>An everyday addition to their next adventure. Part of the SOLEA kids’ edit.</p><fieldset className="kids-sizes"><legend>Choose size (EU)</legend>{product.sizes.map(s => <button type="button" key={s} aria-pressed={size === s} onClick={() => { setSize(s); setMessage(""); setError(""); }}>{s}</button>)}</fieldset><a href="/kids#kids-fit" className="kids-fit-link">Help finding their fit ↗</a><button className="btn-primary kids-add" onClick={addToBag}>Add to bag — ${product.price} ↗</button>{error && <p role="alert">{error}</p>}{message && <p role="status">{message}</p>}<details><summary>Size & fit</summary><p>This style is available in EU sizes {product.sizes[0]}–{product.sizes.at(-1)}. Measure both feet before selecting a size and check their fit regularly as they grow.</p></details><details><summary>Care</summary><p>Wipe gently with a soft damp cloth and allow to air dry away from direct heat.</p></details><Link href="/kids" className="kids-fit-link">← Back to all kids’ styles</Link></section></div></Reveal>
    <section className="editorial-footwear"><h2 className="section-title">More little favourites.</h2><div className="catalog-products">{kidsProducts.filter(p => p.id !== product.id).map(p => <ProductCard key={p.id} id={p.id} name={p.name} category={p.category} description={p.description} price={p.price} colors={p.colors.map(c => c.hex)} image={p.images[0]} badge={p.badge} href={`/kids/${p.id}`} />)}</div></section>
  </div></div>;
}
