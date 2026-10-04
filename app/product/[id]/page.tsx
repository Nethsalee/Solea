"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

const relatedProducts = [
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
    id: "cloud-one-alt",
    name: "Cloud One",
    category: "ARCHIVE MOTION",
    description: "Midnight Black / Ecru Knit",
    price: 135,
    colors: ["#000000", "#c2b280"],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
    badge: "SALE $50",
  },
  {
    id: "motion-03",
    name: "Motion 03",
    category: "URBAN BREEZE",
    description: "Natural / Oat Neutral",
    price: 167,
    colors: ["#f5f5dc", "#d2b48c"],
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop",
  },
  {
    id: "classic-low-alt",
    name: "Classic Low",
    category: "ELITE CUSHION",
    description: "Bone White / Stone Washed",
    price: 155,
    colors: ["#f5f5f5", "#918e85"],
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&h=600&fit=crop",
  },
];

export default function ProductDetailPage() {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("light-grey");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const productImages = [
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&h=800&fit=crop",
  ];

  const sizes = ["37", "38", "39", "40", "41", "42", "43", "44", "45"];

  const colors = [
    { name: "Light Grey", value: "light-grey", hex: "#e5e5e5" },
    { name: "Pure White", value: "pure-white", hex: "#ffffff" },
    { name: "Charcoal", value: "charcoal", hex: "#36454f" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-black">
              HOME
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-black">
              SHOP
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-black">
              ALL FOOTWEAR
            </Link>
            <span>/</span>
            <span className="text-black">AERO RUNNER</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-neutral-100 aspect-square">
              <span className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1 z-10 uppercase tracking-wide">
                PERFORMANCE SERIES
              </span>
              <Image
                src={productImages[activeImage]}
                alt="Aero Runner"
                fill
                className="object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`relative aspect-square bg-neutral-100 border-2 ${
                    activeImage === index ? "border-black" : "border-transparent"
                  }`}
                >
                  <Image src={img} alt={`View ${index + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>

            {/* Additional Info */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-sm">
                  <strong>30-Day Returns:</strong> Full refund or exchange (excluding original
                  shipping)
                </span>
              </div>
              <div className="flex items-center gap-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-sm">
                  <strong>2-4 Business Days:</strong> Express shipping via FedEx or UPS available
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div>
            <div className="mb-6">
              <p className="text-sm uppercase tracking-wider text-gray-600 mb-2">
                PERFORMANCE SERIES / AERO RUNNER
              </p>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">AERO RUNNER</h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold">$129</span>
                <span className="text-gray-500 line-through">$159</span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-500">
                  {"★".repeat(5)}
                </div>
                <span className="text-sm text-gray-600">(24 verified reviews)</span>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                Designed for everyday movement and mid-mileage running. Responsive cushioning meets
                breathable upper mesh, delivering comfort from sunrise to sunset. Engineered with
                sustainable materials, ethically sourced, and responsibly produced, built for the
                everyday athlete.
              </p>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold uppercase tracking-wider">
                  SELECT COLOR: {colors.find((c) => c.value === selectedColor)?.name}
                </label>
                <span className="text-sm text-gray-600">3 COLORWAYS</span>
              </div>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-12 h-12 rounded-full border-2 ${
                      selectedColor === color.value ? "border-black" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold uppercase tracking-wider">
                  SELECT SIZE (EU)
                </label>
                <Link href="/size-guide" className="text-sm underline hover:text-gray-600">
                  SIZE GUIDE
                </Link>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 border text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "border-gray-300 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-semibold uppercase tracking-wider mb-3">
                QUANTITY
              </label>
              <div className="flex items-center border border-gray-300 w-32">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="flex-1 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Buttons */}
            <div className="space-y-3 mb-8">
              <button className="w-full bg-black text-white py-4 font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                ADD TO BAG — ${129 * quantity}
              </button>
              <button className="w-full border-2 border-black py-4 font-medium hover:bg-black hover:text-white transition-colors">
                BUY NOW WITH APPLE PAY
              </button>
            </div>

            {/* Accordion Sections */}
            <div className="space-y-4 border-t border-gray-200 pt-6">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer py-4 font-semibold uppercase tracking-wider text-sm">
                  PRODUCT DETAILS & FEATURES
                  <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="pb-4 text-sm text-gray-600 space-y-2">
                  <p>• Responsive cushioning with 8mm heel-to-toe drop</p>
                  <p>• Breathable engineered mesh upper</p>
                  <p>• Durable rubber outsole for multi-surface traction</p>
                  <p>• Reflective details for low-light visibility</p>
                  <p>• Weight: 240g (size 42)</p>
                </div>
              </details>

              <details className="group border-t border-gray-200">
                <summary className="flex items-center justify-between cursor-pointer py-4 font-semibold uppercase tracking-wider text-sm">
                  MATERIALS & SUSTAINABILITY
                  <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="pb-4 text-sm text-gray-600">
                  <p>
                    Made with 50% recycled materials. Vegan-friendly construction with no animal
                    products. Ethically sourced in certified facilities.
                  </p>
                </div>
              </details>

              <details className="group border-t border-gray-200">
                <summary className="flex items-center justify-between cursor-pointer py-4 font-semibold uppercase tracking-wider text-sm">
                  SHIPPING & EASY RETURN (90 DAYS)
                  <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="pb-4 text-sm text-gray-600">
                  <p>
                    Free shipping on orders over $150. Easy 90-day returns for unworn items in
                    original packaging. Customer pays return shipping.
                  </p>
                </div>
              </details>

              <details className="group border-t border-gray-200">
                <summary className="flex items-center justify-between cursor-pointer py-4 font-semibold uppercase tracking-wider text-sm">
                  SIZE & FIT GUIDE
                  <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="pb-4 text-sm text-gray-600">
                  <p>True to size. If between sizes, we recommend sizing up for wider feet.</p>
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* Product Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
          <div className="relative h-[500px] bg-neutral-100">
            <Image
              src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&h=1000&fit=crop"
              alt="Product Features"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm uppercase tracking-wider text-gray-600 mb-4">
              DESIGN PHILOSOPHY
            </p>
            <h2 className="text-3xl font-bold mb-6">
              Scoring the Balance Between Stillness & Propulsion.
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Every stride is an opportunity. The Aero Runner combines responsive energy return with
              lightweight construction and modern aesthetics. Every piece is engineered to help you
              move naturally—whether that's a morning run through the city or running your daily
              errands—all while respecting both style and impact on our planet, future.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">94%</div>
                <p className="text-sm text-gray-600 uppercase">IMPACT ABSORBENCY RATIO</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">0.8mm</div>
                <p className="text-sm text-gray-600 uppercase">ENGINEERED MESH LAYER</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="border-t border-gray-200 pt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">You May Also Like</h2>
            <Link
              href="/shop"
              className="text-sm hover:underline flex items-center gap-2"
            >
              VIEW FULL ARCHIVE COLLECTION →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
