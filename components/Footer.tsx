"use client";

import Link from "next/link";
import { useState } from "react";

const footerLinks = {
  shop: [
    { href: "/men", label: "Men" },
    { href: "/women", label: "Women" },
    { href: "/new-arrivals", label: "New Arrivals" },
    { href: "/collections", label: "Collections" },
    { href: "/archived", label: "Archived" },
    { href: "/sale", label: "Sale" },
  ],
  about: [
    { href: "/our-story", label: "Our Story" },
    { href: "/sustainability", label: "Sustainability" },
    { href: "/materials", label: "Materials" },
    { href: "/press", label: "Press" },
  ],
  support: [
    { href: "/shipping", label: "Shipping & Returns" },
    { href: "/order-tracking", label: "Order Tracking" },
    { href: "/size-guide", label: "Size Guide" },
    { href: "/contact", label: "Contact Us" },
  ],
};

const socialLinks = [
  { href: "#", label: "Instagram", short: "Ig" },
  { href: "#", label: "TikTok", short: "Tk" },
  { href: "#", label: "Pinterest", short: "Pt" },
  { href: "#", label: "Spotify", short: "Sp" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        {/* Top Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "48px",
            marginBottom: "64px",
          }}
          className="footer-grid"
        >
          {/* Brand Column */}
          <div>
            {/* Logo */}
            <div
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1.8rem",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                background: "linear-gradient(135deg, #fff 0%, #6c63ff 60%, #43e8ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "16px",
              }}
            >
              SOLEA
            </div>

            <p
              style={{
                fontSize: "0.88rem",
                color: "var(--text-muted)",
                lineHeight: "1.8",
                maxWidth: "300px",
                marginBottom: "32px",
              }}
            >
              Contemporary footwear engineered for everyday movement and aesthetic
              clarity. Designed for those who embrace both form and function.
            </p>

            {/* Newsletter in footer */}
            <div>
              <h4
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#ffffff",
                  marginBottom: "12px",
                }}
              >
                Newsletter
              </h4>
              <form
                onSubmit={handleSubscribe}
                style={{ display: "flex", gap: "0" }}
                aria-label="Footer newsletter subscription"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  style={{
                    flex: 1,
                    padding: "11px 18px",
                    borderRadius: "10px 0 0 10px",
                    border: "1px solid var(--glass-border)",
                    background: "rgba(255,255,255,0.04)",
                    color: "var(--text-primary)",
                    fontSize: "0.83rem",
                    outline: "none",
                    fontFamily: "inherit",
                    transition: "border-color 0.3s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(108,99,255,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--glass-border)")}
                  required
                  id="footer-newsletter-email"
                  aria-label="Email address for newsletter"
                />
                <button
                  type="submit"
                  style={{
                    padding: "11px 20px",
                    borderRadius: "0 10px 10px 0",
                    border: "none",
                    background: "linear-gradient(135deg, #6c63ff, #43e8ff)",
                    color: "#fff",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "opacity 0.3s",
                    whiteSpace: "nowrap",
                  }}
                  aria-label="Subscribe to newsletter"
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  {subscribed ? "✓ Joined!" : "Join"}
                </button>
              </form>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#ffffff",
                marginBottom: "20px",
              }}
            >
              Shop
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h4
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#ffffff",
                marginBottom: "20px",
              }}
            >
              About
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#ffffff",
                marginBottom: "20px",
              }}
            >
              Support
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="glow-divider" style={{ marginBottom: "32px" }} />

        {/* Bottom Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          {/* Copyright */}
          <p
            style={{
              fontSize: "0.78rem",
              color: "var(--text-muted)",
              letterSpacing: "0.03em",
            }}
          >
            © 2026 SOLEA FOOTWEAR LLC. ALL RIGHTS RESERVED.
          </p>

          {/* Social icons */}
          <div style={{ display: "flex", gap: "12px" }} aria-label="Social media links">
            {/* Instagram */}
            <a
              href="#"
              className="social-icon"
              aria-label="Instagram"
              title="Instagram"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px",
                transition: "all 0.3s",
                color: "#fff",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#E4405F";
                e.currentTarget.style.backgroundColor = "rgba(228,64,95,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="#"
              className="social-icon"
              aria-label="TikTok"
              title="TikTok"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px",
                transition: "all 0.3s",
                color: "#fff",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#000000";
                e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>

            {/* Pinterest */}
            <a
              href="#"
              className="social-icon"
              aria-label="Pinterest"
              title="Pinterest"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px",
                transition: "all 0.3s",
                color: "#fff",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#E60023";
                e.currentTarget.style.backgroundColor = "rgba(230,0,35,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
              </svg>
            </a>

            {/* Spotify */}
            <a
              href="#"
              className="social-icon"
              aria-label="Spotify"
              title="Spotify"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px",
                transition: "all 0.3s",
                color: "#fff",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#1DB954";
                e.currentTarget.style.backgroundColor = "rgba(29,185,84,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
            </a>
          </div>

          {/* Legal links */}
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {[
              { href: "/privacy", label: "Privacy" },
              { href: "/terms", label: "Terms" },
              { href: "/cookies", label: "Cookies" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: "0.78rem",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
