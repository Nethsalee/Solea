"use client";

import { useMemo, useSyncExternalStore } from "react";

const storageKey = "solea_wishlist";
const listeners = new Set<() => void>();
let temporarySnapshot: string | undefined;

function getSnapshot() {
  if (temporarySnapshot !== undefined) return temporarySnapshot;
  try {
    return window.localStorage.getItem(storageKey) ?? "[]";
  } catch {
    return "[]";
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

function parseWishlist(snapshot: string | null): string[] {
  try {
    const items: unknown = JSON.parse(snapshot ?? "[]");
    if (Array.isArray(items)) {
      return [...new Set(items.filter((id): id is string => typeof id === "string" && id.length > 0))];
    }
  } catch {
    // Ignore invalid saved data.
  }
  return [];
}

function updateWishlist(update: (items: string[]) => string[]) {
  const snapshot = JSON.stringify(update(parseWishlist(getSnapshot())));
  try {
    window.localStorage.setItem(storageKey, snapshot);
    temporarySnapshot = undefined;
  } catch {
    temporarySnapshot = snapshot;
  }
  listeners.forEach(listener => listener());
}

export function useWishlist() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => null);
  const wishlist = useMemo(() => parseWishlist(snapshot), [snapshot]);

  return {
    wishlist,
    ready: snapshot !== null,
    count: wishlist.length,
    isInWishlist: (id: string) => wishlist.includes(id),
    addToWishlist: (id: string) => updateWishlist(items => items.includes(id) ? items : [...items, id]),
    removeFromWishlist: (id: string) => updateWishlist(items => items.filter(item => item !== id)),
    toggleWishlist: (id: string) => updateWishlist(items =>
      items.includes(id) ? items.filter(item => item !== id) : [...items, id]
    ),
    clearWishlist: () => updateWishlist(() => []),
  };
}
