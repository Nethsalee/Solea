import Link from "next/link";
import ProductCard from "@/components/ProductCard";

const womenProducts = [
  {
    id: "cloud-one",
    name: "Cloud One",
    category: "STREET LIFESTYLE",
    description: "Off-White / Sand Dunes",
    price: 145,
    colors: ["#f5f5dc", "#c2b280"],
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop",
  },
  {
    id: "classic-low",
    name: "Classic Low",
    category: "HERITAGE COURT",
    description: "Natural Tanned Leather",
    price: 125,
    colors: ["#d2b48c", "#8b7355"],
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&h=600&fit=crop",
    badge: "BESTSELLER",
  },
  {
    id: "pace-knit",
    name: "Pace Knit",
    category: "SEAMLESS KNIT",
    description: "Stone Grey / Ice Cred",
    price: 138,
    colors: ["#918e85", "#b0c4de"],
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&h=600&fit=crop",
  },
  {
    id: "sol-terra",
    name: "Sol Terra Court",
    category: "ATHLETIC DRAFT",
    description: "Ecru / Raw Canvas",
    price: 149,
    colors: ["#c2b280", "#faf0e6"],
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=600&fit=crop",
  },
];

export default function WomenPage() {
  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: "90px" }}>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Header Section */}
        <div className="mb-16 max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-olive-600"></div>
            <p className="text-xs uppercase tracking-[0.2em] text-olive-600 font-bold">
              WOMEN'S FOOTWEAR
            </p>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-[1.1] tracking-tight text-gray-900">
            Women's
            <br />
            <span className="bg-gradient-to-r from-olive-700 via-tan-600 to-stone-700 bg-clip-text text-transparent">
              Collection
            </span>
          </h1>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-2xl" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Thoughtfully crafted footwear that blends{" "}
            <span className="text-olive-700 font-semibold">style</span>,{" "}
            <span className="text-olive-700 font-semibold">comfort</span>, and{" "}
            <span className="text-olive-700 font-semibold">sustainability</span>. 
            Every design is engineered for the modern woman who values both aesthetics and functionality.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {womenProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
