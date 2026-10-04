import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

const featuredCategories = [
  {
    title: "Men's",
    subtitle: "New Arrivals",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&h=1000&fit=crop",
    link: "/men",
  },
  {
    title: "Women's",
    subtitle: "Collection",
    image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&h=1000&fit=crop",
    link: "/women",
  },
  {
    title: "Athletics",
    subtitle: "Performance",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=1000&fit=crop",
    link: "/athletics",
  },
];

const newArrivals = [
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
    id: "cloud-one",
    name: "Cloud One",
    category: "STREET LIFESTYLE",
    description: "Off-White / Sand Dunes",
    price: 145,
    colors: ["#f5f5dc", "#c2b280"],
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop",
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
];

const bestSellers = [
  {
    id: "nano-street",
    name: "Nano Street",
    category: "URBAN SPORT",
    description: "Cream / Stone Grey",
    price: 115,
    colors: ["#fffdd0", "#8b8680"],
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&h=600&fit=crop",
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

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] bg-neutral-100">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=1920&h=1080&fit=crop"
            alt="Hero Background"
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-xl">
            <p className="text-sm uppercase tracking-wider text-gray-600 mb-4">
              NEW COLLECTION 2025
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              STEP INTO
              <br />
              YOUR STYLE
            </h1>
            <p className="text-gray-600 mb-8 text-lg max-w-md">
              Contemporary footwear designed for everyday movement and aesthetic
              clarity. Engineered in Stockholm.
            </p>
            <div className="flex gap-4">
              <Link
                href="/shop"
                className="bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors font-medium"
              >
                DISCOVER COLLECTION
              </Link>
              <Link
                href="/new-arrivals"
                className="border border-black px-8 py-3 hover:bg-black hover:text-white transition-colors font-medium"
              >
                EXPLORE NEW ARRIVALS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold">FEATURED CATEGORIES</h2>
          <Link
            href="/collections"
            className="text-sm hover:underline flex items-center gap-2"
          >
            VIEW ALL COLLECTIONS
            <span>→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCategories.map((category) => (
            <Link
              key={category.title}
              href={category.link}
              className="group relative h-[400px] overflow-hidden bg-neutral-100"
            >
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm uppercase tracking-wider mb-1">
                  {category.subtitle}
                </p>
                <h3 className="text-2xl font-bold">{category.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold">NEW ARRIVALS</h2>
            <Link
              href="/shop"
              className="text-sm hover:underline flex items-center gap-2"
            >
              VIEW ALL STYLES →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm uppercase tracking-wider mb-4 text-gray-400">
            WINTER COLLECTION
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            NEW SEASON. NEW ENERGY.
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Explore a curated collection designed with purposeful minimalism. The perfect
            balance between timeless design and modern functionality. Every piece is a
            testament to quality and craftsmanship.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 transition-colors font-medium"
          >
            EXPLORE COLLECTION
          </Link>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold">BEST SELLERS</h2>
            <div className="flex gap-4">
              <button className="px-4 py-2 border border-gray-300 text-sm hover:bg-black hover:text-white transition-colors">
                MEN
              </button>
              <button className="px-4 py-2 border border-gray-300 text-sm hover:bg-black hover:text-white transition-colors">
                WOMEN
              </button>
              <button className="px-4 py-2 border border-gray-300 text-sm hover:bg-black hover:text-white transition-colors">
                KIDS
              </button>
              <button className="px-4 py-2 border border-gray-300 text-sm hover:bg-black hover:text-white transition-colors">
                SALE
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] bg-neutral-100">
              <Image
                src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&h=1000&fit=crop"
                alt="Built for Everyday"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm uppercase tracking-wider text-gray-600 mb-4">
                CRAFTSMANSHIP
              </p>
              <h2 className="text-4xl font-bold mb-6">BUILT FOR EVERYDAY</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                At SOLEA ASICHIN, footwear is designed with purpose and built to last. We
                believe in timeless design over fleeting trends. Each pair undergoes rigorous
                testing to ensure comfort that lasts from morning to night. High-performance
                materials meet aesthetic clarity.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="text-4xl font-bold mb-2">94%</div>
                  <p className="text-sm text-gray-600">CUSTOMER SATISFACTION</p>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">100k</div>
                  <p className="text-sm text-gray-600">PAIRS SOLD WORLDWIDE</p>
                </div>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
              >
                LEARN MORE ABOUT US →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-neutral-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm uppercase tracking-wider text-gray-600 mb-4">
            JOIN OUR COMMUNITY
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">STAY IN THE LOOP</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Be the first to know about new drops, exclusive offers, and style inspiration.
          </p>
          <form className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors font-medium"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
