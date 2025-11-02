// components/cart/CartSummary.tsx
import React from "react";
import { formatPrice } from "@/lib/utils";

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  vat: number;
  grandTotal: number;
}

export function CartSummary({
  subtotal,
  shipping,
  vat,
  grandTotal,
}: CartSummaryProps) {
  return (
    <div className="bg-white rounded-lg p-8">
      <h6 className="h6 mb-8">SUMMARY</h6>

      <div className="space-y-6 mb-6">
        <div className="flex justify-between items-center">
          <span className="body text-black/50 uppercase">Subtotal</span>
          <h6 className="h6">{formatPrice(subtotal)}</h6>
        </div>

        <div className="flex justify-between items-center">
          <span className="body text-black/50 uppercase">Shipping</span>
          <h6 className="h6">{formatPrice(shipping)}</h6>
        </div>

        <div className="flex justify-between items-center">
          <span className="body text-black/50 uppercase">VAT (Included)</span>
          <h6 className="h6">{formatPrice(vat)}</h6>
        </div>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-black/10">
        <span className="body text-black/50 uppercase">Grand Total</span>
        <h6 className="h6 text-primary">{formatPrice(grandTotal)}</h6>
      </div>
    </div>
  );
}
