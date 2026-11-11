"use client";

import Link from "next/link";
import Image from "next/image";
import FavoriteButton from "./FavoriteButton";

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  salePrice?: number;
  colors: string[];
  image: string;
  badge?: string;
  href?: string;
}

export default function ProductCard({
  id,
  name,
  category,
  description,
  price,
  salePrice,
  colors,
  image,
  badge,
  href,
}: ProductCardProps) {
  return (
    <div className="product-card">
      <Link href={href ?? `/product/${id}`} className="product-card-link" aria-label={`${name} - $${salePrice ?? price}`} />
      {/* Image Container */}
      <div className="product-image-wrapper">
        {badge && (
          <span className="product-badge" aria-label={`Badge: ${badge}`}>
            {badge}
          </span>
        )}

        <FavoriteButton id={id} name={name} compact />

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
          <p className="product-price">{salePrice !== undefined ? <><del className="catalog-original-price">${price}</del><span className="catalog-sale-price">${salePrice}</span></> : <>${price}</>}</p>
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
    </div>
  );
}
