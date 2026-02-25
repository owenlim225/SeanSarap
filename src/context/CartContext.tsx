"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getItemById } from "@/data/inventory";

export interface CartLineItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  serving: string;
}

interface CartState {
  items: CartLineItem[];
  sessionId: string | null;
  isLoading: boolean;
}

interface CartContextValue extends CartState {
  addItem: (itemId: string, quantity?: number) => void;
  updateItem: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CartState>({
    items: [],
    sessionId: null,
    isLoading: true,
  });

  const fetchCart = useCallback(async () => {
    const res = await fetch("/api/cart", { credentials: "include" });
    if (!res.ok) return;
    const data = await res.json();
    setState((s) => ({
      ...s,
      items: data.items ?? [],
      sessionId: data.sessionId ?? s.sessionId,
      isLoading: false,
    }));
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const syncWithServer = useCallback(
    async (action: "add" | "update" | "remove", itemId: string, quantity?: number) => {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ action, itemId, quantity }),
      });
      if (!res.ok) {
        fetchCart();
        return;
      }
      const data = await res.json();
      setState((s) => ({
        ...s,
        items: data.items ?? s.items,
        sessionId: data.sessionId ?? s.sessionId,
      }));
    },
    [fetchCart]
  );

  const addItem = useCallback(
    (itemId: string, quantity = 1) => {
      const product = getItemById(itemId);
      setState((s) => {
        const existing = s.items.find((i) => i.id === itemId);
        const nextItems = existing
          ? s.items.map((i) =>
              i.id === itemId ? { ...i, quantity: i.quantity + quantity } : i
            )
          : product
            ? [
                ...s.items,
                {
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  quantity,
                  serving: product.serving,
                },
              ]
            : s.items;
        syncWithServer("add", itemId, quantity);
        return { ...s, items: nextItems };
      });
    },
    [syncWithServer]
  );

  const updateItem = useCallback(
    (itemId: string, quantity: number) => {
      setState((s) => {
        const nextItems =
          quantity <= 0
            ? s.items.filter((i) => i.id !== itemId)
            : s.items.map((i) => (i.id === itemId ? { ...i, quantity } : i));
        syncWithServer("update", itemId, quantity);
        return { ...s, items: nextItems };
      });
    },
    [syncWithServer]
  );

  const removeItem = useCallback(
    (itemId: string) => {
      setState((s) => ({
        ...s,
        items: s.items.filter((i) => i.id !== itemId),
      }));
      syncWithServer("remove", itemId);
    },
    [syncWithServer]
  );

  const cartCount = state.items.reduce((n, i) => n + i.quantity, 0);

  const value: CartContextValue = {
    ...state,
    addItem,
    updateItem,
    removeItem,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
