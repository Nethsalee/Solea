"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              SOLEA
            </Link>
            <span className="hidden md:block text-sm text-gray-600">▼ SOLEA</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <Link href="/" className="hover:text-gray-600">
              HOME
            </Link>
            <Link href="/men" className="hover:text-gray-600">
              MEN
            </Link>
            <Link href="/women" className="hover:text-gray-600">
              WOMEN
            </Link>
            <Link href="/shop" className="hover:text-gray-600">
              NEW ARRIVALS
            </Link>
            <Link href="/collections" className="hover:text-gray-600">
              COLLECTIONS
            </Link>
            <Link href="/sale" className="hover:text-gray-600">
              SALE ▼
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-6">
            <button className="hover:text-gray-600">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button className="hover:text-gray-600 relative">
              <svg
                className="w-5 h-5"
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
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </button>
            <button className="hover:text-gray-600 relative">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </button>
            <button className="hover:text-gray-600">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4 text-sm">
              <Link href="/" className="hover:text-gray-600">
                HOME
              </Link>
              <Link href="/men" className="hover:text-gray-600">
                MEN
              </Link>
              <Link href="/women" className="hover:text-gray-600">
                WOMEN
              </Link>
              <Link href="/shop" className="hover:text-gray-600">
                NEW ARRIVALS
              </Link>
              <Link href="/collections" className="hover:text-gray-600">
                COLLECTIONS
              </Link>
              <Link href="/sale" className="hover:text-gray-600">
                SALE
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
