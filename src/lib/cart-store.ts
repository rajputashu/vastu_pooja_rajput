import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getProduct } from "@/data/products";
import { sanitizeCartItems, type CartLine } from "@/lib/cart-math";

type CartState = {
  items: CartLine[];
  isOpen: boolean;
  hydrated: boolean;
  setHydrated: (value: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  addItem: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  removeItem: (slug: string) => void;
  clear: () => void;
};

const memory = new Map<string, string>();

function browserStorage(): Storage {
  const local = window.localStorage;
  return {
    get length() {
      return local.length;
    },
    clear() {
      try {
        local.clear();
      } catch {
        memory.clear();
      }
    },
    key(index: number) {
      try {
        return local.key(index);
      } catch {
        return [...memory.keys()][index] ?? null;
      }
    },
    getItem(name: string) {
      try {
        return local.getItem(name);
      } catch {
        return memory.get(name) ?? null;
      }
    },
    setItem(name: string, value: string) {
      try {
        local.setItem(name, value);
      } catch {
        memory.set(name, value);
      }
    },
    removeItem(name: string) {
      try {
        local.removeItem(name);
      } catch {
        memory.delete(name);
      }
    },
  };
}

function known(slug: string) {
  return Boolean(getProduct(slug));
}

function maxFor(slug: string) {
  return getProduct(slug)?.stock ?? 0;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      hydrated: false,
      setHydrated: (value) => set({ hydrated: value }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      addItem: (slug, qty = 1) =>
        set((state) => {
          const product = getProduct(slug);
          if (!product || qty < 1) return state;
          const existing = state.items.find((line) => line.slug === slug);
          const nextQty = Math.min(product.stock, (existing?.qty ?? 0) + qty);
          if (nextQty < 1) return state;
          const items = existing
            ? state.items.map((line) => (line.slug === slug ? { slug, qty: nextQty } : line))
            : [...state.items, { slug, qty: nextQty }];
          return { items, isOpen: true };
        }),
      setQty: (slug, qty) =>
        set((state) => {
          const product = getProduct(slug);
          if (!product) return { items: state.items.filter((line) => line.slug !== slug) };
          if (qty < 1) return { items: state.items.filter((line) => line.slug !== slug) };
          const bounded = Math.min(product.stock, Math.floor(qty));
          return {
            items: state.items.map((line) => (line.slug === slug ? { slug, qty: bounded } : line)),
          };
        }),
      removeItem: (slug) => set((state) => ({ items: state.items.filter((line) => line.slug !== slug) })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "pooja-rajput-cart",
      storage: createJSONStorage(() => browserStorage()),
      skipHydration: true,
      partialize: (state) => ({ items: state.items }),
      merge: (persisted, current) => {
        const raw = persisted && typeof persisted === "object" ? (persisted as { items?: unknown }).items : [];
        const stored = sanitizeCartItems(raw, known, maxFor);
        const live = sanitizeCartItems(current.items, known, maxFor);
        return { ...current, items: live.length > 0 ? live : stored };
      },
    },
  ),
);

export function useCartCount() {
  return useCart((state) => state.items.reduce((count, line) => count + line.qty, 0));
}
