// Type definitions for the application

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  salePrice?: number;
  colors: Color[];
  sizes: string[];
  images: string[];
  badge?: string;
  inStock: boolean;
  featured?: boolean;
  rating?: number;
  reviewCount?: number;
  details?: ProductDetails;
}

export interface Color {
  name: string;
  value: string;
  hex: string;
}

export interface ProductDetails {
  features: string[];
  materials: string[];
  careInstructions: string[];
  weight?: string;
  sustainabilityInfo?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: Color;
  image: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  addresses?: Address[];
  orders?: Order[];
}

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export interface PaymentMethod {
  type: "card" | "paypal" | "apple_pay" | "google_pay";
  last4?: string;
  brand?: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  createdAt: Date;
  helpful?: number;
}

export interface WishlistItem {
  id: string;
  productId: string;
  userId: string;
  addedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface Newsletter {
  email: string;
  subscribedAt: Date;
}

export interface FilterOptions {
  category?: string[];
  gender?: string[];
  size?: string[];
  color?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  inStock?: boolean;
}

export interface SortOption {
  value: string;
  label: string;
}
