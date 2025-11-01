// convex/orders.ts
import { defineTable } from "convex/server";
import { v } from "convex/values";

export const ordersTable = defineTable({
  customerName: v.string(),
  customerEmail: v.string(),
  customerPhone: v.string(),
  shippingAddress: v.string(),
  shippingCity: v.string(),
  shippingPostcode: v.string(),
  shippingCountry: v.string(),

  items: v.array(
    v.object({
      id: v.id("products"), // or v.string() if no products table
      name: v.string(),
      price: v.number(),
      quantity: v.number(),
    })
  ),

  subtotal: v.number(),
  shipping: v.number(),
  tax: v.number(),
  grandTotal: v.number(),

  status: v.union(
    v.literal("pending"),
    v.literal("confirmed"),
    v.literal("shipped")
  ),
  createdAt: v.number(),
})
  .index("by_email", ["customerEmail"])
  .index("by_created", ["createdAt"]);
