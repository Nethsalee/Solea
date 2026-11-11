"use client";

import Link from "next/link";
import { useWishlist } from "@/hooks/useWishlist";
import { useCatalog } from "./CatalogProvider";
import ProductCard from "./ProductCard";

export default function Favorites() {
  const { wishlist, ready, removeFromWishlist } = useWishlist();
  const catalog = useCatalog();
  const productsById = new Map(catalog.map(product => [product.id, product]));
  const available = wishlist.flatMap(id => {
    const product = productsById.get(id);
    return product ? [product] : [];
  });
  const unavailable = wishlist.filter(id => !productsById.has(id));

  return (
    <div className="catalog-page favorites-page">
      <div className="container">
        <nav className="catalog-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Favorites</span>
        </nav>
        <h1 className="section-title">My favorites</h1>
        {!ready && <p role="status">Loading favorites…</p>}
        {ready && wishlist.length === 0 && (
          <div className="catalog-empty">
            <h2>No favorites yet</h2>
            <p>Tap the heart on a style to save it here.</p>
            <Link href="/collections" className="btn-primary">Browse collections ↗</Link>
          </div>
        )}
        {available.length > 0 && (
          <div className="catalog-products">
            {available.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                category={product.category}
                description={product.description}
                price={product.price}
                salePrice={product.salePrice}
                colors={product.colors.map(color => color.hex)}
                image={product.images[0]}
                badge={product.badge}
                href={product.department === "kids" ? `/kids/${product.id}` : undefined}
              />
            ))}
          </div>
        )}
        {unavailable.length > 0 && (
          <ul className="favorites-unavailable" aria-label="Unavailable favorites">
            {unavailable.map(id => (
              <li key={id}>
                <span>This style is no longer available.</span>
                <button type="button" className="auth-text-button" onClick={() => removeFromWishlist(id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
