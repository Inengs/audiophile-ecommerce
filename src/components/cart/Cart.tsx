// components/cart/Cart.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { Modal } from "@/components/ui/Modal";
import { CartItem } from "./CartItem";
import { Button } from "@/components/shared/Button";
import { formatPrice } from "@/lib/utils";

export function Cart() {
  const router = useRouter();
  const { items, isOpen, closeCart, clearCart, getSubtotal } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = getSubtotal();

  const handleCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <Modal isOpen={isOpen} onClose={closeCart} className="p-8">
      {items.length === 0 ? (
        <div className="text-center py-8">
          <h6 className="h6 mb-4">Your cart is empty</h6>
          <p className="body text-black/50">Add some products to get started</p>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h6 className="h6">CART ({itemCount})</h6>
            <button
              onClick={clearCart}
              className="body text-black/50 underline hover:text-primary transition-colors"
            >
              Remove all
            </button>
          </div>

          {/* Cart Items */}
          <div className="space-y-6 mb-8">
            {items.map((item) => (
              <CartItem key={item.product._id} item={item} />
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center mb-6">
            <span className="body text-black/50 uppercase">Total</span>
            <h6 className="h6">{formatPrice(subtotal)}</h6>
          </div>

          {/* Checkout Button */}
          <Button onClick={handleCheckout} fullWidth>
            Checkout
          </Button>
        </>
      )}
    </Modal>
  );
}
