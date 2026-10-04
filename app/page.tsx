import Image from "next/image";
import Link from "next/link";

const newArrivals = [
  {
    id: "high-street",
    name: "High Street",
    brand: "SOLEA",
    description: "Minimalist design meets comfort",
    price: 145,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600",
    colors: ["#f5f5f5", "#1a1a1a", "#d4c4b0"],
    badge: "NEW",
  },
  {
    id: "beach-walk",
    name: "Beach Walk",
    brand: "SOLEA",
    description: "Casual comfort for every occasion",
    price: 89,
    originalPrice: 129,
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600",
    colors: ["#d4c4b0", "#1a1a1a"],
    badge: "SALE",
  },
  {
    id: "classic-low",
    name: "Classic Low",
    brand: "SOLEA",
    description: "Timeless silhouette, modern comfort",
    price: 135,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600",
    colors: ["#f5f5f5", "#d4c4b0"],
    badge: "NEW",
  },
  {
    id: "city-run",
    name: "City Run",
    brand: "SOLEA",
    description: "Urban performance footwear",
    price: 165,
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600",
    colors: ["#e0e0e0", "#1a1a1a", "#4a5568"],
  },
];

const bestSellers = [
  {
    id: "metro-02",
    name: "Metro 02",
    brand: "SOLEA",
    description: "All-day comfort sneaker",
    price: 149,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    colors: ["#f5f5f5", "#1a1a1a", "#8b7355", "#4a5568"],
    rating: 4.8,
  },
  {
    id: "cloud-walk",
    name: "Cloud Walk",
    brand: "SOLEA",
    description: "Ultra-cushioned slide",
    price: 79,
    image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=600",
    colors: ["#d4c4b0", "#1a1a1a"],
    rating: 5.0,
  },
  {
    id: "zen-walk",
    name: "Zen Walk",
    brand: "SOLEA",
    description: "Minimalist everyday sneaker",
    price: 125,
    image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600",
    colors: ["#d4c4b0", "#f5f5f5"],
    rating: 4.9,
    badge: "POPULAR",
  },
  {
    id: "sky-runner",
    name: "Sky Runner",
    brand: "SOLEA",
    description: "Performance running shoe",
    price: 175,
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600",
    colors: ["#e0e0e0", "#1a1a1a", "#4a7c59"],
    rating: 4.2,
  },
];

const categories = [
  {
    title: "FOOTWEAR",
    description: "Designed for everyday movement and aesthetics",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800",
  },
  {
    title: "SUMMER COLLECTION",
    description: "Light, breathable designs for warmer days",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
  },
  {
    title: "RUNNERS",
    description: "Performance meets style in motion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
  },
];

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-1 mb-2">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-3 h-3 ${
            i < fullStars
              ? "text-yellow-400"
              : i === fullStars && hasHalf
              ? "text-yellow-400"
              : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-gray-500 ml-1">{rating}</span>
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-[600px] flex items-center justify-center text-white text-center bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1600')",
        }}
      >
        <div className="max-w-2xl px-5">
          <h1 className="text-5xl md:text-6xl font-bold tracking-wide leading-tight mb-5">
            STEP INTO
            <br />
            YOUR STYLE
          </h1>
          <p className="text-base mb-9 leading-relaxed text-white/95">
            Discover the perfect blend of comfort and elegance with our curated
            collection of contemporary footwear. Each piece designed to elevate
            your everyday.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/shop"
              className="bg-black text-white px-8 py-3.5 text-xs font-semibold tracking-widest uppercase hover:bg-neutral-800 transition-colors"
            >
              SHOP COLLECTION
            </Link>
            <Link
              href="/about"
              className="border-2 border-white text-white px-8 py-3.5 text-xs font-semibold tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
            >
              LEARN MORE
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-widest text-gray-500 uppercase mb-2">
              EXPLORE
            </p>
            <h2 className="text-3xl font-bold tracking-wide">
              FEATURED CATEGORIES
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.title}
                className="relative overflow-hidden rounded group h-[450px]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url('${cat.image}')` }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
                  <h3 className="text-2xl font-bold tracking-wide mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-sm opacity-90 mb-3">{cat.description}</p>
                  <Link
                    href="/shop"
                    className="text-xs font-semibold tracking-wide"
                  >
                    SHOP NOW →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold tracking-wide">NEW ARRIVALS</h2>
            <Link
              href="/shop"
              className="text-xs font-semibold tracking-wide uppercase"
            >
              VIEW ALL 24 STYLES →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product) => (
              <div
                key={product.id}
                className="group cursor-pointer transition-transform hover:-translate-y-1"
              >
                <div className="relative bg-neutral-100 aspect-square overflow-hidden rounded mb-4">
                  {product.badge && (
                    <span
                      className={`absolute top-3 left-3 z-10 px-3 py-1 text-[10px] font-semibold tracking-wide text-white ${
                        product.badge === "SALE" ? "bg-red-700" : "bg-black"
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}
                  <button className="absolute top-3 right-3 z-10 w-9 h-9 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-600">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-[11px] tracking-wide text-gray-500 uppercase mb-1">
                  {product.brand}
                </p>
                <h3 className="text-base font-semibold mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  {product.description}
                </p>
                <div className="mb-3">
                  <span className="text-lg font-bold">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  {product.colors.map((color, i) => (
                    <span
                      key={i}
                      className="w-5 h-5 rounded-full border border-gray-300 cursor-pointer hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white py-24 px-5 text-center my-20">
        <h2 className="text-4xl font-bold tracking-wide mb-5">
          NEW SEASON. NEW ENERGY.
        </h2>
        <p className="text-base opacity-90 max-w-xl mx-auto mb-9">
          Step into spring with our latest collection. Fresh designs that bring
          comfort and style together.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-white text-black px-8 py-3.5 text-xs font-semibold tracking-widest uppercase hover:bg-gray-100 transition-colors"
        >
          EXPLORE NEW ARRIVALS
        </Link>
      </section>

      {/* Best Sellers */}
      <section className="py-20 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <h2 className="text-3xl font-bold tracking-wide">BEST SELLERS</h2>
            <div className="flex gap-3 flex-wrap">
              {["ALL", "MEN", "WOMEN", "KIDS", "UNISEX"].map((tab, i) => (
                <button
                  key={tab}
                  className={`px-5 py-2 text-[11px] font-semibold tracking-wide uppercase rounded-full border transition-colors ${
                    i === 0
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-black hover:text-white hover:border-black"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product) => (
              <div
                key={product.id}
                className="group cursor-pointer transition-transform hover:-translate-y-1"
              >
                <div className="relative bg-neutral-100 aspect-square overflow-hidden rounded mb-4">
                  {product.badge && (
                    <span className="absolute top-3 left-3 z-10 bg-black text-white px-3 py-1 text-[10px] font-semibold tracking-wide">
                      {product.badge}
                    </span>
                  )}
                  <button className="absolute top-3 right-3 z-10 w-9 h-9 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-600">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {product.rating && <StarRating rating={product.rating} />}
                <p className="text-[11px] tracking-wide text-gray-500 uppercase mb-1">
                  {product.brand}
                </p>
                <h3 className="text-base font-semibold mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  {product.description}
                </p>
                <div className="mb-3">
                  <span className="text-lg font-bold">${product.price}</span>
                </div>
                <div className="flex gap-2">
                  {product.colors.map((color, i) => (
                    <span
                      key={i}
                      className="w-5 h-5 rounded-full border border-gray-300 cursor-pointer hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built for Everyday */}
      <section className="py-20 px-5 bg-neutral-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="rounded overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800"
                alt="Craftsmanship"
                className="w-full h-[550px] object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-wide mb-6">
                BUILT FOR EVERYDAY
              </h2>
              <p className="text-sm leading-relaxed text-gray-500 mb-8">
                Every pair is meticulously crafted using premium materials and
                traditional techniques. Our commitment to quality ensures
                durability that stands the test of time.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-5xl font-bold mb-2">96%</h3>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">
                    Recycled Materials
                  </p>
                </div>
                <div>
                  <h3 className="text-5xl font-bold mb-2">100%</h3>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">
                    Handcrafted Quality
                  </p>
                </div>
              </div>
              <Link
                href="/about"
                className="text-xs font-semibold tracking-wide uppercase"
              >
                LEARN ABOUT OUR PROCESS →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-5 text-center bg-neutral-50">
        <h2 className="text-3xl font-bold tracking-wide mb-4">
          STAY IN THE LOOP
        </h2>
        <p className="text-sm text-gray-500 mb-9">
          Get the latest updates on new products and exclusive offers delivered
          to your inbox.
        </p>
        <form className="max-w-lg mx-auto flex gap-2 mb-5">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-5 py-3.5 border border-gray-300 text-sm focus:outline-none focus:border-black"
            required
          />
          <button
            type="submit"
            className="bg-black text-white px-8 py-3.5 text-xs font-semibold tracking-widest uppercase hover:bg-neutral-800 transition-colors"
          >
            JOIN
          </button>
        </form>
        <p className="text-xs text-gray-500">
          By subscribing, you agree to our Privacy Policy and consent to receive
          updates.
        </p>
      </section>
    </div>
  );
}
