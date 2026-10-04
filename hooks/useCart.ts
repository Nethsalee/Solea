"use client";

import { useState, useEffect } from "react";
import { CartItem, Cart } from "@/types";

const CART_STORAGE_KEY = "solea_cart";
const TAX_RATE = 0.08;
const FREE_SHIPPING_THRESHOLD = 150;
const SHIPPING_COST = 10;

export function useCart() {
  const [cart, setCart] = useState<Cart>({
    items: [],
    subtotal: 0,
    tax: 0,
    shipping: 0,
    total: 0,
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(calculateCartTotals(parsedCart.items));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const calculateCartTotals = (items: CartItem[]): Cart => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * TAX_RATE;
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const total = subtotal + tax + shipping;

    return {
      items,
      subtotal,
      tax,
      shipping,
      total,
    };
  };

  const addItem = (item: Omit<CartItem, "id">) => {
    const existingItemIndex = cart.items.findIndex(
      (i) => i.productId === item.productId && i.size === item.size && i.color.value === item.color.value
    );

    let newItems: CartItem[];
    if (existingItemIndex > -1) {
      newItems = [...cart.items];
      newItems[existingItemIndex].quantity += item.quantity;
    } else {
      const newItem: CartItem = {
        ...item,
        id: `${item.productId}-${item.size}-${item.color.value}-${Date.now()}`,
      };
      newItems = [...cart.items, newItem];
    }

    setCart(calculateCartTotals(newItems));
  };

  const removeItem = (itemId: string) => {
    const newItems = cart.items.filter((item) => item.id !== itemId);
    setCart(calculateCartTotals(newItems));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    const newItems = cart.items.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    );
    setCart(calculateCartTotals(newItems));
  };

  const clearCart = () => {
    setCart({
      items: [],
      subtotal: 0,
      tax: 0,
      shipping: 0,
      total: 0,
    });
  };

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    cart,
    itemCount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
}
