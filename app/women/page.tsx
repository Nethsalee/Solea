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
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-black">
              HOME
            </Link>
            <span>/</span>
            <span className="text-black">WOMEN</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">WOMEN'S COLLECTION</h1>
          <p className="text-gray-600 max-w-2xl">
            Thoughtfully crafted footwear that blends style, comfort, and sustainability. Discover our
            women's range.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {womenProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
