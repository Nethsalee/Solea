"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
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
    colors: ["#e5e5e5", "#d4c5b0"],
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
    colors: ["#f8f8f8", "#e8ddd0"],
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop",
  },
  {
    id: "motion-02",
    name: "Motion 02",
    category: "CITY TECHNICAL",
    description: "Charcoal / Stealth Black",
    price: 119,
    colors: ["#5c5248", "#2a2420"],
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
    colors: ["#918e85", "#c4b8a6"],
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&h=600&fit=crop",
  },
  {
    id: "sol-terra",
    name: "Sol Terra Court",
    category: "ATHLETIC DRAFT",
    description: "Ecru / Raw Canvas",
    price: 149,
    colors: ["#c2a87a", "#e8dcc8"],
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=600&fit=crop",
  },
];

const marqueeItems = [
  "Free Shipping Over $100",
  "New Collection 2025",
  "Designed in Stockholm",
  "Premium Materials",
  "30-Day Free Returns",
  "Handcrafted Quality",
];

// Scroll-reveal hook
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function RevealSection({
  children,
  className = "",
  animation = "animate-fade-up",
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  animation?: string;
  style?: React.CSSProperties;
}) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`${className} ${visible ? animation : ""}`}
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.7s ease, transform 0.7s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Animated counter
function Counter({ target, suffix = "" }: { target: number | string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useScrollReveal();
  const isHundredK = target === "100k";
  const targetNum = isHundredK ? 100 : (typeof target === "number" ? target : parseInt(String(target)));

  useEffect(() => {
    if (!visible) return;
    const duration = 1600;
    const steps = 55;
    const increment = targetNum / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetNum) {
        setCount(targetNum);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [visible, targetNum]);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="stat-number">
      {isHundredK ? `${count}k` : `${count}${suffix}`}
    </div>
  );
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("MEN");
  const filters = ["MEN", "WOMEN", "KIDS", "SALE"];

  return (
    <div style={{ paddingTop: "var(--nav-height)" }}>

      {/* ======================== MARQUEE TICKER ======================== */}
      <div
        style={{
          background: "var(--bg-espresso)",
          overflow: "hidden",
          padding: "10px 0",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
        aria-hidden="true"
      >
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "24px",
                padding: "0 32px",
                fontSize: "0.68rem",
                fontWeight: 500,
                letterSpacing: "0.2em",
                color: "rgba(245,240,232,0.6)",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {item}
              <span style={{ color: "var(--accent-sand)", fontSize: "0.5rem", opacity: 0.6 }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ======================== HERO SECTION ======================== */}
      <section className="hero-section" aria-label="Hero — Step Into Your Style">
        <div className="container" style={{ position: "relative", zIndex: 2, width: "100%" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "center",
              minHeight: "calc(100vh - var(--nav-height) - 40px)",
              paddingTop: "60px",
              paddingBottom: "60px",
            }}
            className="hero-grid"
          >
            {/* Left Content */}
            <div>
              <div className="hero-badge animate-fade-up">
                <span className="hero-badge-dot" />
                New Collection 2025
              </div>

              <h1 className="hero-title animate-fade-up delay-100">
                Step Into
                <br />
                <em>Your Style</em>
              </h1>

              <p className="hero-description animate-fade-up delay-200">
                Contemporary footwear designed for everyday movement and aesthetic
                clarity. Engineered in Stockholm — where form meets function.
              </p>

              <div
                className="animate-fade-up delay-300"
                style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}
              >
                <Link href="/shop" className="btn-primary">
                  Discover Collection
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/new-arrivals" className="btn-ghost">
                  New Arrivals
                </Link>
              </div>

              {/* Mini stats row */}
              <div
                className="animate-fade-up delay-400"
                style={{
                  display: "flex",
                  gap: "36px",
                  marginTop: "56px",
                  paddingTop: "32px",
                  borderTop: "1px solid var(--border-warm)",
                }}
              >
                {[
                  { value: "100k+", label: "Happy Customers" },
                  { value: "4.9★", label: "Average Rating" },
                  { value: "50+", label: "Global Stores" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "1.5rem",
                      fontWeight: 600,
                      color: "var(--text-dark)",
                      letterSpacing: "-0.01em",
                      lineHeight: 1,
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      marginTop: "5px",
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Hero Image */}
            <div className="animate-fade-right delay-200 hidden md:block" style={{ position: "relative" }}>
              <div
                style={{
                  position: "relative",
                  borderRadius: "12px",
                  overflow: "hidden",
                  aspectRatio: "4/5",
                  border: "1px solid var(--border-warm)",
                  boxShadow: "var(--shadow-lift)",
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&h=1100&fit=crop"
                  alt="Featured shoe — Premium collection"
                  fill
                  sizes="50vw"
                  style={{ objectFit: "cover", filter: "saturate(0.9)" }}
                  priority
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(28,24,20,0.5) 0%, transparent 55%)",
                  }}
                  aria-hidden="true"
                />
                {/* Floating product label */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "24px",
                    left: "24px",
                    right: "24px",
                    padding: "16px 20px",
                    borderRadius: "10px",
                    background: "rgba(245,240,232,0.92)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid var(--border-warm)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{
                      fontSize: "0.62rem",
                      fontWeight: 600,
                      letterSpacing: "0.18em",
                      color: "var(--accent-terra)",
                      textTransform: "uppercase",
                      marginBottom: "3px",
                    }}>
                      Featured Drop
                    </div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "var(--text-dark)",
                    }}>
                      Aero Runner X
                    </div>
                  </div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "var(--text-dark)",
                  }}>
                    $129
                  </div>
                </div>
              </div>

              {/* Small accent card floating beside */}
              <div
                style={{
                  position: "absolute",
                  top: "32px",
                  left: "-28px",
                  padding: "14px 18px",
                  borderRadius: "10px",
                  background: "var(--bg-light)",
                  border: "1px solid var(--border-medium)",
                  boxShadow: "var(--shadow-card)",
                }}
                className="hidden lg:block"
                aria-hidden="true"
              >
                <div style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "4px" }}>
                  Material
                </div>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-dark)", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  Full-grain Leather
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "28px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
          aria-hidden="true"
          className="hidden md:flex animate-fade-up delay-600"
        >
          <span style={{ fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", color: "var(--text-faint)", textTransform: "uppercase" }}>
            Scroll
          </span>
          <div
            style={{
              width: "22px",
              height: "36px",
              borderRadius: "11px",
              border: "1.5px solid var(--border-medium)",
              display: "flex",
              justifyContent: "center",
              paddingTop: "6px",
            }}
          >
            <div
              style={{
                width: "3px",
                height: "7px",
                borderRadius: "2px",
                background: "var(--accent-terra)",
                animation: "float 1.6s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </section>

      {/* Warm divider */}
      <div className="warm-divider" />

      {/* ======================== FEATURED CATEGORIES ======================== */}
      <section
        style={{ padding: "100px 0", background: "var(--bg-cream)" }}
        aria-labelledby="categories-heading"
      >
        <div className="container">
          <RevealSection>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <div className="section-label">Collections</div>
                <h2 id="categories-heading" className="section-title">Featured<br />Categories</h2>
              </div>
              <Link
                href="/collections"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  transition: "color 0.3s",
                  fontFamily: "'Inter', sans-serif",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-terra)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                View All
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </RevealSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "18px" }} className="categories-grid">
            {featuredCategories.map((category, i) => (
              <RevealSection key={category.title} animation="animate-scale-in" className={`delay-${(i + 1) * 100}`}>
                <Link href={category.link} className="category-card">
                  <Image
                    src={category.image}
                    alt={`${category.title} ${category.subtitle} Collection`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="category-card-content">
                    <p className="category-card-subtitle">{category.subtitle}</p>
                    <h3 className="category-card-title">{category.title}</h3>
                    <div className="category-card-arrow" aria-hidden="true">
                      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      <div className="warm-divider" />

      {/* ======================== NEW ARRIVALS ======================== */}
      <section
        style={{ padding: "100px 0", background: "var(--bg-warm)" }}
        aria-labelledby="new-arrivals-heading"
      >
        <div className="container">
          <RevealSection>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <div className="section-label">Latest Drops</div>
                <h2 id="new-arrivals-heading" className="section-title">New Arrivals</h2>
              </div>
              <Link
                href="/shop"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  transition: "color 0.3s",
                  fontFamily: "'Inter', sans-serif",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-terra)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                View All Styles
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </RevealSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "18px" }} className="products-grid">
            {newArrivals.map((product, i) => (
              <RevealSection key={product.id} animation="animate-fade-up" className={`delay-${i * 100}`}>
                <ProductCard {...product} />
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== CTA BANNER ======================== */}
      <section style={{ padding: "60px 0", background: "var(--bg-cream)" }} aria-labelledby="cta-heading">
        <div className="container">
          <RevealSection>
            <div className="cta-banner">
              <div style={{ position: "relative", zIndex: 1, maxWidth: "600px" }}>
                <div className="section-label" style={{ color: "var(--accent-sand)" }}>
                  Winter Collection
                </div>
                <h2
                  id="cta-heading"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "clamp(2.4rem, 4vw, 3.8rem)",
                    fontWeight: 300,
                    color: "var(--text-light)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.01em",
                    marginBottom: "20px",
                    marginTop: "16px",
                  }}
                >
                  New Season.{" "}
                  <em style={{ color: "var(--accent-sand)", fontStyle: "italic" }}>New Energy.</em>
                </h2>
                <p style={{
                  fontSize: "0.95rem",
                  color: "rgba(245,240,232,0.65)",
                  lineHeight: "1.85",
                  marginBottom: "36px",
                  maxWidth: "440px",
                }}>
                  A curated collection designed with purposeful minimalism. The perfect
                  balance between timeless design and modern functionality.
                </p>
                <Link
                  href="/shop"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "14px 32px",
                    borderRadius: "4px",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    background: "var(--accent-terra)",
                    color: "#fff",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--accent-clay)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--accent-terra)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  Explore Collection
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Decorative right-side image */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: "38%",
                  overflow: "hidden",
                  borderRadius: "0 16px 16px 0",
                }}
                className="hidden lg:block"
              >
                <Image
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&h=600&fit=crop"
                  alt=""
                  fill
                  sizes="38vw"
                  style={{ objectFit: "cover", opacity: 0.25, filter: "saturate(0.6)" }}
                />
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ======================== BEST SELLERS ======================== */}
      <section
        style={{ padding: "100px 0", background: "var(--bg-cream)" }}
        aria-labelledby="best-sellers-heading"
      >
        <div className="container">
          <RevealSection>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px", flexWrap: "wrap", gap: "20px" }}>
              <div>
                <div className="section-label">Fan Favorites</div>
                <h2 id="best-sellers-heading" className="section-title">Best Sellers</h2>
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {filters.map((filter) => (
                  <button
                    key={filter}
                    className={`tab-filter-btn${activeFilter === filter ? " active" : ""}`}
                    onClick={() => setActiveFilter(filter)}
                    aria-pressed={activeFilter === filter}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </RevealSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "18px" }} className="products-grid">
            {bestSellers.map((product, i) => (
              <RevealSection key={product.id} animation="animate-fade-up" className={`delay-${i * 100}`}>
                <ProductCard {...product} />
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      <div className="warm-divider" />

      {/* ======================== BRAND INFO + STATS ======================== */}
      <section
        style={{ padding: "100px 0", background: "var(--bg-light)" }}
        aria-labelledby="about-heading"
      >
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }} className="info-grid">
            {/* Image */}
            <RevealSection animation="animate-fade-left">
              <div className="info-image-wrapper" style={{ position: "relative" }}>
                <Image
                  src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&h=1000&fit=crop"
                  alt="SOLEA craftsmanship — Built for Everyday"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover", borderRadius: "12px", filter: "saturate(0.85)" }}
                />
                {/* Craft badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "24px",
                    left: "24px",
                    padding: "12px 18px",
                    borderRadius: "8px",
                    background: "rgba(245,240,232,0.92)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid var(--border-medium)",
                    zIndex: 10,
                  }}
                >
                  <div style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.18em", color: "var(--accent-terra)", textTransform: "uppercase", marginBottom: "3px" }}>
                    Craftsmanship
                  </div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-dark)", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                    Since 2010
                  </div>
                </div>
              </div>
            </RevealSection>

            {/* Content */}
            <RevealSection animation="animate-fade-right">
              <div>
                <div className="section-label">Our Story</div>
                <h2 id="about-heading" className="section-title" style={{ marginBottom: "24px" }}>
                  Built for<br />
                  <em style={{ fontStyle: "italic", color: "var(--accent-terra)" }}>Everyday</em>
                </h2>
                <p style={{ fontSize: "0.97rem", color: "var(--text-muted)", lineHeight: "1.95", marginBottom: "40px" }}>
                  At SOLEA ASICHIN, footwear is designed with purpose and built to last. We believe
                  in timeless design over fleeting trends. Each pair undergoes rigorous testing to
                  ensure comfort that lasts from morning to night. High-performance materials meet
                  aesthetic clarity.
                </p>

                {/* Stats */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "40px" }}>
                  {[
                    { value: 94, suffix: "%", label: "Customer Satisfaction" },
                    { value: "100k", suffix: "", label: "Pairs Sold Worldwide" },
                  ].map((stat) => (
                    <div key={stat.label} className="stat-card">
                      <Counter target={stat.value} suffix={stat.suffix} />
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <Link href="/about" className="btn-ghost" style={{ display: "inline-flex" }}>
                  Learn More About Us
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ======================== NEWSLETTER ======================== */}
      <section
        style={{ padding: "100px 0", background: "var(--bg-warm)", borderTop: "1px solid var(--border-warm)" }}
        aria-labelledby="newsletter-heading"
      >
        <div className="container">
          <RevealSection>
            <div style={{ textAlign: "center", maxWidth: "520px", margin: "0 auto" }}>
              <div className="section-label" style={{ justifyContent: "center", marginBottom: "16px" }}>
                Community
              </div>
              <h2 id="newsletter-heading" className="section-title" style={{ marginBottom: "14px" }}>
                Stay in the Loop
              </h2>
              <p style={{ fontSize: "0.97rem", color: "var(--text-muted)", lineHeight: "1.85", marginBottom: "36px" }}>
                Be the first to know about new drops, exclusive offers, and style inspiration.
              </p>

              <form
                style={{ display: "flex", maxWidth: "440px", margin: "0 auto" }}
                onSubmit={(e) => e.preventDefault()}
                aria-label="Newsletter subscription form"
              >
                <input
                  type="email"
                  placeholder="Your email address"
                  className="newsletter-input"
                  required
                  id="newsletter-email"
                  aria-label="Email address for newsletter"
                />
                <button type="submit" className="newsletter-btn" aria-label="Subscribe to newsletter">
                  Subscribe
                </button>
              </form>

              <p style={{ fontSize: "0.7rem", color: "var(--text-faint)", marginTop: "14px", letterSpacing: "0.04em" }}>
                No spam, ever. Unsubscribe at any time.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 1024px) {
          .categories-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .products-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .info-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        @media (max-width: 640px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .categories-grid { grid-template-columns: 1fr !important; }
          .products-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
