"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";

export default function Header() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/men", label: "Men" },
    { href: "/women", label: "Women" },
    { href: "/shop", label: "New Arrivals" },
    { href: "/collections", label: "Collections" },
    { href: "/sale", label: "Sale" },
  ];

  return (
    <>
      <header className={`floating-nav${scrolled ? " scrolled" : ""}`} role="banner">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px" }}>

          {/* Logo */}
          <Link href="/" className="nav-logo" aria-label="SOLEA Home">
            SOLEA
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex" style={{ gap: "28px", alignItems: "center" }} aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action Icons */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {/* Search */}
            <button className="nav-icon-btn" aria-label="Search">
              <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Wishlist */}
            <button className="nav-icon-btn hidden md:flex" aria-label="Wishlist">
              <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="nav-badge">0</span>
            </button>

            {/* Cart */}
            <button className="nav-icon-btn" aria-label="Shopping cart">
              <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="nav-badge">0</span>
            </button>

            {/* Account */}
            <Link href="/login" className="nav-icon-btn hidden md:flex" aria-label={user ? "My account, signed in" : "Sign in"}>
              <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="nav-icon-btn md:hidden"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="mobile-nav-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          {/* Close */}
          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              width: "42px",
              height: "42px",
              borderRadius: "10px",
              border: "1px solid var(--border-medium)",
              background: "rgba(255,255,255,0.6)",
              color: "var(--text-muted)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Logo */}
          <div
            style={{
              position: "absolute",
              top: "28px",
              left: "28px",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "1.4rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: "var(--text-dark)",
              textTransform: "uppercase",
            }}
          >
            SOLEA
          </div>

          {/* Links */}
          <nav style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "28px" }}>
            {[...navLinks, { href: "/login", label: user ? "My Account" : "Sign In" }].map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="mobile-nav-link"
                onClick={() => setIsMenuOpen(false)}
                style={{ animationDelay: `${i * 0.06}s`, animation: "fadeInUp 0.45s ease both" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Bottom socials */}
          <div style={{ position: "absolute", bottom: "40px", display: "flex", gap: "12px" }}>
            {["Instagram", "TikTok", "Pinterest"].map((platform) => (
              <a
                key={platform}
                href="#"
                className="social-icon"
                aria-label={platform}
                style={{
                  border: "1px solid var(--border-medium)",
                  background: "rgba(255,255,255,0.6)",
                  color: "var(--text-muted)",
                }}
              >
                {platform.slice(0, 2)}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
