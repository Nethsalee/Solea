import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "aero-runner",
    name: "Aero Runner",
    slug: "aero-runner",
    category: "PERFORMANCE SERIES",
    description: "Light Grey / Pure White",
    price: 129,
    colors: [
      { name: "Light Grey", value: "light-grey", hex: "#e5e5e5" },
      { name: "Pure White", value: "pure-white", hex: "#ffffff" },
      { name: "Charcoal", value: "charcoal", hex: "#36454f" },
    ],
    sizes: ["37", "38", "39", "40", "41", "42", "43", "44", "45"],
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop",
    ],
    badge: "NEW DROP",
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 24,
    details: {
      features: [
        "Responsive cushioning with 8mm heel-to-toe drop",
        "Breathable engineered mesh upper",
        "Durable rubber outsole for multi-surface traction",
        "Reflective details for low-light visibility",
      ],
      materials: ["50% recycled materials", "Vegan-friendly construction"],
      careInstructions: [
        "Clean with damp cloth",
        "Air dry away from direct heat",
        "Do not machine wash",
      ],
      weight: "240g (size 42)",
      sustainabilityInfo: "Made with 50% recycled materials in certified facilities",
    },
  },
  {
    id: "cloud-one",
    name: "Cloud One",
    slug: "cloud-one",
    category: "STREET LIFESTYLE",
    description: "Off-White / Sand Dunes",
    price: 145,
    colors: [
      { name: "Off-White", value: "off-white", hex: "#f5f5dc" },
      { name: "Sand Dunes", value: "sand-dunes", hex: "#c2b280" },
    ],
    sizes: ["37", "38", "39", "40", "41", "42", "43", "44"],
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop",
    ],
    inStock: true,
    featured: true,
    rating: 4.6,
    reviewCount: 18,
  },
  {
    id: "urban-flex",
    name: "Urban Flex",
    slug: "urban-flex",
    category: "EVERYDAY ATHLETIC",
    description: "Chalk White / Alabaster",
    price: 135,
    colors: [
      { name: "Chalk White", value: "chalk-white", hex: "#f8f8f8" },
      { name: "Alabaster", value: "alabaster", hex: "#e8e8e8" },
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=800&fit=crop",
    ],
    inStock: true,
    rating: 4.7,
    reviewCount: 32,
  },
  {
    id: "motion-02",
    name: "Motion 02",
    slug: "motion-02",
    category: "CITY TECHNICAL",
    description: "Charcoal / Stealth Black",
    price: 119,
    colors: [
      { name: "Charcoal", value: "charcoal", hex: "#36454f" },
      { name: "Stealth Black", value: "stealth-black", hex: "#000000" },
    ],
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop",
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 41,
  },
  {
    id: "classic-low",
    name: "Classic Low",
    slug: "classic-low",
    category: "HERITAGE COURT",
    description: "Natural Tanned Leather",
    price: 125,
    salePrice: 99,
    colors: [
      { name: "Natural Tan", value: "natural-tan", hex: "#d2b48c" },
      { name: "Brown", value: "brown", hex: "#8b7355" },
    ],
    sizes: ["37", "38", "39", "40", "41", "42", "43"],
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&h=800&fit=crop",
    ],
    badge: "BESTSELLER",
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 67,
  },
  {
    id: "pace-knit",
    name: "Pace Knit",
    slug: "pace-knit",
    category: "SEAMLESS KNIT",
    description: "Stone Grey / Ice Cred",
    price: 138,
    colors: [
      { name: "Stone Grey", value: "stone-grey", hex: "#918e85" },
      { name: "Ice Cred", value: "ice-cred", hex: "#b0c4de" },
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    images: [
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&h=800&fit=crop",
    ],
    inStock: true,
    rating: 4.5,
    reviewCount: 29,
  },
  {
    id: "sol-terra",
    name: "Sol Terra Court",
    slug: "sol-terra-court",
    category: "ATHLETIC DRAFT",
    description: "Ecru / Raw Canvas",
    price: 149,
    colors: [
      { name: "Ecru", value: "ecru", hex: "#c2b280" },
      { name: "Raw Canvas", value: "raw-canvas", hex: "#faf0e6" },
    ],
    sizes: ["37", "38", "39", "40", "41", "42", "43", "44", "45"],
    images: [
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=800&fit=crop",
    ],
    inStock: true,
    rating: 4.6,
    reviewCount: 15,
  },
  {
    id: "nano-street",
    name: "Nano Street",
    slug: "nano-street",
    category: "URBAN SPORT",
    description: "Cream / Stone Grey",
    price: 115,
    colors: [
      { name: "Cream", value: "cream", hex: "#fffdd0" },
      { name: "Stone Grey", value: "stone-grey", hex: "#8b8680" },
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    images: [
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&h=800&fit=crop",
    ],
    inStock: true,
    rating: 4.4,
    reviewCount: 22,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category);
}
