import { CartItem } from "./types";
import { SHIPPING_COST, VAT_RATE } from "./constants";

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
}

export function calculateVAT(subtotal: number): number {
  return Math.round(subtotal * VAT_RATE);
}

export function calculateGrandTotal(
  subtotal: number,
  shipping: number,
  vat: number
): number {
  return subtotal + shipping + vat;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${timestamp}${random}`;
}

export function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
