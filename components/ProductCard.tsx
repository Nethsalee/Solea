"use client";

import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  colors: string[];
  image: string;
  badge?: string;
}

export default function ProductCard({
  id,
  name,
  category,
  description,
  price,
  colors,
  image,
  badge,
}: ProductCardProps) {
  return (
    <Link href={`/product/${id}`} className="product-card" aria-label={`${name} - $${price}`}>
      {/* Image Container */}
      <div className="product-image-wrapper">
        {badge && (
          <span className="product-badge" aria-label={`Badge: ${badge}`}>
            {badge}
          </span>
        )}

        <button
          className="product-wishlist-btn"
          aria-label={`Add ${name} to wishlist`}
          onClick={(e) => { e.preventDefault(); }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="product-img"
        />

        <button
          className="product-quick-add"
          onClick={(e) => { e.preventDefault(); }}
          aria-label={`Quick add ${name} to cart`}
        >
          + Quick Add
        </button>
      </div>

      {/* Product Info */}
      <div className="product-info">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p className="product-category">{category}</p>
            <h3 className="product-name">{name}</h3>
            <p className="product-desc">{description}</p>
          </div>
          <p className="product-price">${price}</p>
        </div>

        <div className="product-colors" role="group" aria-label={`${name} color options`}>
          {colors.map((color, index) => (
            <button
              key={index}
              className="color-dot"
              style={{ backgroundColor: color }}
              aria-label={`Color option ${index + 1}`}
              onClick={(e) => { e.preventDefault(); }}
            />
          ))}
        </div>
      </div>
    </Link>
  );
}
