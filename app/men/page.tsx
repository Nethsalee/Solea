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
    <div className="min-h-screen bg-white" style={{ paddingTop: "120px" }}>
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-olive-700 transition-colors">
              HOME
            </Link>
            <span>/</span>
            <span className="text-olive-700 font-medium">MEN</span>
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
              MEN'S FOOTWEAR
            </p>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] tracking-tight text-gray-900">
            Men's
            <br />
            <span className="bg-gradient-to-r from-olive-700 via-tan-600 to-stone-700 bg-clip-text text-transparent">
              Collection
            </span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-3xl font-light">
            Engineered footwear designed for{" "}
            <span className="text-olive-700 font-medium">movement</span>,{" "}
            <span className="text-olive-700 font-medium">performance</span>, and{" "}
            <span className="text-olive-700 font-medium">everyday style</span>. 
            Built with premium materials and contemporary design principles for the modern man.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {menProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
