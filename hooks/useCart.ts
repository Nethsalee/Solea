"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { Cart, CartItem } from "@/types";
import { generateId } from "@/lib/utils";

const storageKey = "solea_cart";
const listeners = new Set<() => void>();
let temporarySnapshot: string | undefined;

function getSnapshot() {
  if (temporarySnapshot !== undefined) return temporarySnapshot;
  try {
    return window.localStorage.getItem(storageKey) ?? "{}";
  } catch {
    return "{}";
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === storageKey || event.key === null) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<CartItem>;
  return typeof item.id === "string" && typeof item.productId === "string"
    && typeof item.name === "string" && typeof item.image === "string"
    && typeof item.size === "string" && typeof item.price === "number"
    && Number.isFinite(item.price) && item.price >= 0
    && typeof item.quantity === "number" && Number.isSafeInteger(item.quantity) && item.quantity > 0
    && typeof item.color?.value === "string" && typeof item.color.name === "string";
}

function readItems(snapshot: string | null): CartItem[] {
  try {
    const saved = JSON.parse(snapshot ?? "{}");
    return Array.isArray(saved?.items) ? saved.items.filter(isCartItem) : [];
  } catch {
    return [];
  }
}

function calculateCart(items: CartItem[]): Cart {
  const subtotalCents = items.reduce((sum, item) => sum + Math.round(item.price * 100) * item.quantity, 0);
  const taxCents = Math.round(subtotalCents * 0.08);
  const shippingCents = items.length && subtotalCents < 15000 ? 1000 : 0;
  return {
    items,
    subtotal: subtotalCents / 100,
    tax: taxCents / 100,
    shipping: shippingCents / 100,
    total: (subtotalCents + taxCents + shippingCents) / 100,
  };
}

function updateItems(update: (items: CartItem[]) => CartItem[]) {
  const snapshot = JSON.stringify(calculateCart(update(readItems(getSnapshot()))));
  try {
    window.localStorage.setItem(storageKey, snapshot);
    temporarySnapshot = undefined;
  } catch {
    temporarySnapshot = snapshot;
  }
  listeners.forEach(listener => listener());
}

export function useCart() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => null);
  const cart = useMemo(() => calculateCart(readItems(snapshot)), [snapshot]);

  function addItem(item: Omit<CartItem, "id">) {
    if (!Number.isSafeInteger(item.quantity) || item.quantity < 1) return;
    updateItems(items => {
      const existing = items.find(line =>
        line.productId === item.productId && line.size === item.size && line.color.value === item.color.value
      );
      if (!existing) return [...items, { ...item, id: generateId() }];
      return items.map(line => line.id === existing.id
        ? { ...item, id: line.id, quantity: line.quantity + item.quantity }
        : line
      );
    });
  }

  function updateQuantity(id: string, quantity: number) {
    if (!Number.isSafeInteger(quantity)) return;
    updateItems(items => quantity <= 0
      ? items.filter(item => item.id !== id)
      : items.map(item => item.id === id ? { ...item, quantity } : item)
    );
  }

  return {
    cart,
    ready: snapshot !== null,
    itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
    addItem,
    removeItem: (id: string) => updateQuantity(id, 0),
    updateQuantity,
    clearCart: () => updateItems(() => []),
  };
}
