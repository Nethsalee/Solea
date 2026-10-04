"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

const allProducts = [
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

export default function ShopPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    size: "",
    priceRange: "",
  });

  const [showFilters, setShowFilters] = useState(false);

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
            <span className="text-black">ALL FOOTWEAR</span>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div>
            <p className="text-sm uppercase tracking-wider text-gray-600 mb-2">
              COMPLETE CATALOG • FREE SHIPPING NO.04
            </p>
            <h1 className="text-5xl md:text-6xl font-bold">SHOP ALL</h1>
          </div>
          <div className="max-w-md">
            <p className="text-gray-600">
              Explore the latest footwear from SOLEA. 24 styles engineered with responsive
              cushioning, architectural contouring, and Scandinavian minimalism.
            </p>
          </div>
        </div>

        {/* Filter and Sort Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-6 border-y border-gray-200">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:border-black transition-colors"
            >
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
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              FILTER BY (3)
            </button>
            <div className="flex items-center gap-2 text-sm">
              <button className="px-3 py-1 bg-black text-white text-xs">ACTIVE</button>
              <button className="px-3 py-1 border border-gray-300 text-xs hover:border-black">
                SNEAKERS ✕
              </button>
              <button className="px-3 py-1 border border-gray-300 text-xs hover:border-black">
                UNDER $150 ✕
              </button>
              <button className="px-3 py-1 border border-gray-300 text-xs hover:border-black">
                SIZE 42-43 ✕
              </button>
              <button className="text-xs text-gray-600 hover:text-black underline ml-2">
                CLEAR ALL
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${
                  viewMode === "grid" ? "bg-black text-white" : "border border-gray-300"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${
                  viewMode === "list" ? "bg-black text-white" : "border border-gray-300"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
                </svg>
              </button>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 text-sm focus:outline-none focus:border-black"
            >
              <option value="featured">SORT: FEATURED</option>
              <option value="price-low">PRICE: LOW TO HIGH</option>
              <option value="price-high">PRICE: HIGH TO LOW</option>
              <option value="newest">NEWEST FIRST</option>
              <option value="popular">MOST POPULAR</option>
            </select>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="py-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 uppercase tracking-wider">
                  Category
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 text-sm focus:outline-none focus:border-black">
                  <option>All Categories</option>
                  <option>Running</option>
                  <option>Lifestyle</option>
                  <option>Athletic</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 uppercase tracking-wider">
                  Gender
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 text-sm focus:outline-none focus:border-black">
                  <option>All</option>
                  <option>Men</option>
                  <option>Women</option>
                  <option>Unisex</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 uppercase tracking-wider">
                  Size (EU)
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 text-sm focus:outline-none focus:border-black">
                  <option>All Sizes</option>
                  <option>39-40</option>
                  <option>41-42</option>
                  <option>43-44</option>
                  <option>45-46</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 uppercase tracking-wider">
                  Price Range
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 text-sm focus:outline-none focus:border-black">
                  <option>All Prices</option>
                  <option>Under $100</option>
                  <option>$100 - $150</option>
                  <option>$150 - $200</option>
                  <option>Over $200</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="py-12">
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                : "flex flex-col gap-6"
            }
          >
            {allProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>

        {/* Load More Section */}
        <div className="text-center py-12 border-t border-gray-200">
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">INVENTORY STATUS</p>
            <p className="font-semibold">SHOWING 8 OF 24 STYLES</p>
          </div>
          <button className="border-2 border-black px-8 py-3 hover:bg-black hover:text-white transition-colors font-medium">
            LOAD MORE STYLES ↓
          </button>
          <p className="text-sm text-gray-600 mt-4">
            Worldwide complimentary shipping on orders over $150.
          </p>
        </div>
      </div>
    </div>
  );
}
