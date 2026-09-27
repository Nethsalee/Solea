"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed with email: ${email}`);
    setEmail("");
  };

  return (
    <footer className="bg-neutral-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4">SOLEA ASICHIN</h3>
            <p className="text-sm text-gray-600 mb-6 max-w-md">
              Contemporary footwear engineered for everyday movement and aesthetic clarity. Designed for
              those who embrace both form and function in Stockholm.
            </p>
            <div>
              <h4 className="text-xs font-semibold mb-3 uppercase tracking-wider">
                Newsletter Subscription
              </h4>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-2 border border-gray-300 text-sm focus:outline-none focus:border-black"
                  required
                />
                <button
                  type="submit"
                  className="bg-black text-white px-6 py-2 text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  JOIN
                </button>
              </form>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">Shop</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link href="/men" className="hover:text-black">
                  Men
                </Link>
              </li>
              <li>
                <Link href="/women" className="hover:text-black">
                  Women
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="hover:text-black">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-black">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/archived" className="hover:text-black">
                  Archived
                </Link>
              </li>
              <li>
                <Link href="/sale" className="hover:text-black">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">About</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link href="/our-story" className="hover:text-black">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="hover:text-black">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/materials" className="hover:text-black">
                  Materials
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-black">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">
              Customer Service
            </h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link href="/shipping" className="hover:text-black">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/order-tracking" className="hover:text-black">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-black">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-black">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-300 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <Link href="#" className="hover:opacity-70">
                <span className="text-sm">Instagram</span>
              </Link>
              <Link href="#" className="hover:opacity-70">
                <span className="text-sm">TikTok</span>
              </Link>
              <Link href="#" className="hover:opacity-70">
                <span className="text-sm">Pinterest</span>
              </Link>
              <Link href="#" className="hover:opacity-70">
                <span className="text-sm">Spotify Music</span>
              </Link>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <Link href="/privacy" className="hover:text-black">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-black">
                Terms
              </Link>
              <Link href="/cookies" className="hover:text-black">
                Cookies
              </Link>
              <span>UNITED STATES (USD $)</span>
            </div>
          </div>

          <div className="text-center md:text-left mt-6 text-xs text-gray-500">
            © 2025 SOLEA FOOTWEAR LLC. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
}
