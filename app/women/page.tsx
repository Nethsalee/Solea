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
    <div className="min-h-screen bg-white" style={{ paddingTop: "120px" }}>
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-olive-700 transition-colors">
              HOME
            </Link>
            <span>/</span>
            <span className="text-olive-700 font-medium">WOMEN</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 md:py-20">
        {/* Header Section */}
        <div className="mb-20 max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-olive-600"></div>
            <p className="text-xs uppercase tracking-[0.2em] text-olive-600 font-bold">
              WOMEN'S FOOTWEAR
            </p>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] tracking-tight text-gray-900">
            Women's
            <br />
            <span className="bg-gradient-to-r from-olive-700 via-tan-600 to-stone-700 bg-clip-text text-transparent">
              Collection
            </span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-3xl font-light">
            Thoughtfully crafted footwear that blends{" "}
            <span className="text-olive-700 font-medium">style</span>,{" "}
            <span className="text-olive-700 font-medium">comfort</span>, and{" "}
            <span className="text-olive-700 font-medium">sustainability</span>. 
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
