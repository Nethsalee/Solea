"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { useCatalog } from "./CatalogProvider";

export default function ShoppingCart() {
  const { cart, ready, removeItem, updateQuantity } = useCart();
  const catalog = useCatalog();
  const products = new Map(catalog.map(product => [product.id, product]));
  const lines = cart.items.map(item => {
    const product = products.get(item.productId);
    const color = product?.colors.find(option => option.value === item.color.value);
    const available = !!product?.inStock && !!color && product.sizes.includes(item.size);
    const priceCents = product ? product.salePriceMinor ?? product.priceMinor : 0;
    return { item, product, color, available, priceCents };
  });
  const subtotalCents = lines.reduce(
    (sum, line) => line.available ? sum + line.priceCents * line.item.quantity : sum, 0
  );

  return (
    <div className="catalog-page shopping-cart">
      <div className="container">
        <nav className="catalog-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Shopping bag</span>
        </nav>
        <h1 className="section-title">Shopping bag</h1>
        {!ready && <p role="status">Loading your bag…</p>}
        {ready && lines.length === 0 && (
          <div className="catalog-empty">
            <h2>Your bag is empty</h2>
            <Link href="/collections" className="btn-primary">Browse collections ↗</Link>
          </div>
        )}
        {lines.length > 0 && (
          <div className="shopping-cart-layout">
            <ul className="shopping-cart-items" aria-label="Items in your bag">
              {lines.map(({ item, product, color, available, priceCents }) => {
                const name = product?.name ?? item.name;
                const href = product?.department === "kids" ? `/kids/${item.productId}` : `/product/${item.productId}`;
                return (
                  <li key={item.id} className="shopping-cart-line">
                    <div className="shopping-cart-photo">
                      {product && <Link href={href} aria-label={name}>
                        <Image src={product.images[0]} alt="" fill sizes="100px" />
                      </Link>}
                    </div>
                    <div className="shopping-cart-details">
                      <h2>{product ? <Link href={href}>{name}</Link> : name}</h2>
                      <p>{color?.name ?? item.color.name} · EU {item.size}</p>
                      {available ? (
                        <div className="shopping-cart-quantity" role="group" aria-label={`Quantity for ${name}, EU ${item.size}`}>
                          <button type="button" disabled={item.quantity === 1} aria-label={`Decrease quantity of ${name}`} onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                          <span aria-live="polite">{item.quantity}</span>
                          <button type="button" aria-label={`Increase quantity of ${name}`} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>
                      ) : <p className="shopping-cart-unavailable">This selection is unavailable.</p>}
                    </div>
                    <div className="shopping-cart-line-end">
                      {available && <strong>{formatPrice(priceCents * item.quantity / 100)}</strong>}
                      <button type="button" className="auth-text-button" aria-label={`Remove ${name}, EU ${item.size}`} onClick={() => removeItem(item.id)}>Remove</button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <aside className="shopping-cart-summary" aria-labelledby="bag-summary">
              <h2 id="bag-summary">Order summary</h2>
              <p><span>Subtotal</span><strong aria-live="polite">{formatPrice(subtotalCents / 100)}</strong></p>
              {lines.some(line => !line.available) && <small>The subtotal includes available items.</small>}
              <Link href="/collections" className="btn-ghost">Continue shopping ↗</Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
