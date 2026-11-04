// Each replacement keeps the previous photos available in the product gallery.
export const catalogImages: Record<string, string> = {
  "trail-form": "/images/trail-form-catalog-v2.png",
  "aria-knit": "/images/aria-knit-catalog-v2.png",
  "terra-light": "/images/terra-light-catalog-v2.png",
  "nova-street": "/images/nova-street-catalog-v2.png",
  "mini-runner": "/images/mini-runner-catalog-v2.png",
  "little-court": "/images/little-court-catalog-v2.png",
  "junior-pace": "/images/junior-pace-catalog-v2.png",
  "weekend-mini": "/images/weekend-mini-catalog-v2.png",
  "hop-mini-cream": "/images/hop-mini-cream-catalog-v2.png",
  "sunny-step-peach": "/images/sunny-step-peach-catalog-v2.png",
  "little-roamer": "/images/little-roamer-catalog-v2.png",
  "junior-sprint": "/images/junior-sprint-catalog-v2.png",
};

export function withCatalogImages<T extends { id: string; images: string[] }>(product: T): T {
  const image = catalogImages[product.id];
  return image ? { ...product, images: [image, ...product.images.filter(src => src !== image)] } : product;
}

