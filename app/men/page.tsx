import Link from "next/link";
import ProductCard from "@/components/ProductCard";

const menProducts = [
  {
    id: "aero-runner",
    name: "Aero Runner",
    category: "PERFORMANCE SERIES",
    description: "Light Grey / Pure White",
    price: 129,
    colors: ["#e5e5e5", "#ffffff"],
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop",
    badge: "NEW DROP",
  },
  {
    id: "urban-flex",
    name: "Urban Flex",
    category: "EVERYDAY ATHLETIC",
    description: "Chalk White / Alabaster",
    price: 135,
    colors: ["#f8f8f8", "#e8e8e8"],
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop",
  },
  {
    id: "motion-02",
    name: "Motion 02",
    category: "CITY TECHNICAL",
    description: "Charcoal / Stealth Black",
    price: 119,
    colors: ["#36454f", "#000000"],
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop",
  },
  {
    id: "nano-street",
    name: "Nano Street",
    category: "URBAN SPORT",
    description: "Cream / Stone Grey",
    price: 115,
    colors: ["#fffdd0", "#8b8680"],
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&h=600&fit=crop",
  },
];

export default function MenPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-black">
              HOME
            </Link>
            <span>/</span>
            <span className="text-black">MEN</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">MEN'S COLLECTION</h1>
          <p className="text-gray-600 max-w-2xl">
            Engineered footwear designed for movement, performance, and everyday style. Explore our
            complete men's range.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {menProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
