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
          <div style={{ display: "flex", gap: "10px" }} aria-label="Social media links">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="social-icon"
                aria-label={social.label}
                title={social.label}
              >
                {social.short}
              </a>
            ))}
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
