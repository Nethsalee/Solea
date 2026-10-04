// Application constants

export const APP_NAME = "SOLEA";
export const APP_DESCRIPTION = "Premium footwear e-commerce platform";

export const NAVIGATION_LINKS = [
  { name: "HOME", href: "/" },
  { name: "MEN", href: "/men" },
  { name: "WOMEN", href: "/women" },
  { name: "NEW ARRIVALS", href: "/shop" },
  { name: "COLLECTIONS", href: "/collections" },
  { name: "SALE", href: "/sale" },
];

export const FOOTER_LINKS = {
  shop: [
    { name: "Men", href: "/men" },
    { name: "Women", href: "/women" },
    { name: "New Arrivals", href: "/new-arrivals" },
    { name: "Collections", href: "/collections" },
    { name: "Archived", href: "/archived" },
    { name: "Sale", href: "/sale" },
  ],
  about: [
    { name: "Our Story", href: "/our-story" },
    { name: "Sustainability", href: "/sustainability" },
    { name: "Materials", href: "/materials" },
    { name: "Press", href: "/press" },
  ],
  customerService: [
    { name: "Shipping & Returns", href: "/shipping" },
    { name: "Order Tracking", href: "/order-tracking" },
    { name: "Size Guide", href: "/size-guide" },
    { name: "Contact Us", href: "/contact" },
  ],
  connect: [
    { name: "Instagram", href: "#" },
    { name: "TikTok", href: "#" },
    { name: "Pinterest", href: "#" },
    { name: "Spotify Music", href: "#" },
  ],
};

export const PRODUCT_CATEGORIES = [
  "Performance Series",
  "Street Lifestyle",
  "Everyday Athletic",
  "City Technical",
  "Heritage Court",
  "Seamless Knit",
  "Urban Sport",
];

export const SIZES = {
  EU: ["37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
  US_MEN: ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
  US_WOMEN: ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10"],
};

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "popular", label: "Most Popular" },
];

export const SHIPPING_THRESHOLD = 150; // Free shipping above this amount
export const TAX_RATE = 0.08; // 8% tax rate
export const CURRENCY = "USD";

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/solea",
  tiktok: "https://tiktok.com/@solea",
  pinterest: "https://pinterest.com/solea",
  spotify: "https://open.spotify.com/user/solea",
};
