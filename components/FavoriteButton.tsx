"use client";

import { useWishlist } from "@/hooks/useWishlist";

export default function FavoriteButton({ id, name, compact = false }: {
  id: string;
  name: string;
  compact?: boolean;
}) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const saved = isInWishlist(id);

  return (
    <button
      type="button"
      className={compact ? "product-wishlist-btn" : "btn-ghost detail-favorite"}
      aria-label={`Favorite ${name}`}
      aria-pressed={saved}
      onClick={() => toggleWishlist(id)}
    >
      <svg width="16" height="16" fill={saved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      {!compact && (saved ? "Saved to favorites" : "Add to favorites")}
    </button>
  );
}
