// components/cart/CartItem.tsx
"use client";

import React from "react";
import Image from "next/image";
import { CartItem as CartItemType } from "@/lib/types";
import { useCart } from "@/hooks/useCart";
import { QuantitySelector } from "@/components/shared/QuantitySelector";
import { formatPrice } from "@/lib/utils";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity } = useCart();
  const { product, quantity } = item;

  // Extract short name (first word or two)
  const shortName = product.name.split(" ").slice(0, 2).join(" ");

  return (
    <div className="flex items-center gap-4">
      {/* Product Image */}
      <div className="relative w-16 h-16 bg-light-gray rounded-lg overflow-hidden flex-shrink-0">
        <Image
          src={product.images.mobile}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h6 className="subtitle text-black truncate">{shortName}</h6>
        <p className="body text-black/50">{formatPrice(product.price)}</p>
      </div>

      {/* Quantity Selector */}
      <QuantitySelector
        value={quantity}
        onChange={(newQuantity) => updateQuantity(product._id, newQuantity)}
      />
    </div>
  );
}
