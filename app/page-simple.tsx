import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-neutral-100 flex items-center">
        <div className="container mx-auto px-4">
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
            </div>
          </div>
        </div>
      </section>

      {/* Simple Test Section */}
      <section className="py-20 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Welcome to SOLEA</h2>
        <p className="text-gray-600 mb-4">
          If you can see this text with proper styling, the application is working correctly.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black text-white p-6">
            <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
            <p>Crafted with care and attention to detail.</p>
          </div>
          <div className="bg-neutral-100 p-6">
            <h3 className="text-xl font-bold mb-2">Modern Design</h3>
            <p>Clean, minimalist aesthetic for everyday wear.</p>
          </div>
          <div className="bg-neutral-200 p-6">
            <h3 className="text-xl font-bold mb-2">Sustainable</h3>
            <p>Made with eco-friendly materials.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
