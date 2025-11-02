// hooks/useCart.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, CartItem } from "@/lib/types";
import {
  calculateSubtotal,
  calculateVAT,
  calculateGrandTotal,
} from "@/lib/utils";
import { SHIPPING_COST } from "@/lib/constants";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  getVAT: () => number;
  getGrandTotal: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { product, quantity }],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product._id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product._id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [], isOpen: false });
      },

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getSubtotal: () => {
        return calculateSubtotal(get().items);
      },

      getVAT: () => {
        const subtotal = get().getSubtotal();
        return calculateVAT(subtotal);
      },

      getGrandTotal: () => {
        const subtotal = get().getSubtotal();
        const vat = get().getVAT();
        return calculateGrandTotal(subtotal, SHIPPING_COST, vat);
      },
    }),
    {
      name: "audiophile-cart",
    }
  )
);
