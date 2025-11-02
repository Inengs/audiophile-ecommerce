// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    slug: v.string(),
    name: v.string(),
    category: v.union(
      v.literal("headphones"),
      v.literal("speakers"),
      v.literal("earphones")
    ),
    isNew: v.boolean(),
    price: v.number(),
    description: v.string(),
    features: v.string(),
    includedItems: v.array(
      v.object({
        quantity: v.number(),
        item: v.string(),
      })
    ),
    gallery: v.object({
      first: v.string(),
      second: v.string(),
      third: v.string(),
    }),
    images: v.object({
      mobile: v.string(),
      tablet: v.string(),
      desktop: v.string(),
    }),
    categoryImage: v.object({
      mobile: v.string(),
      tablet: v.string(),
      desktop: v.string(),
    }),
    relatedProducts: v.array(v.string()),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["category"]),

  orders: defineTable({
    orderNumber: v.string(),
    items: v.array(
      v.object({
        productId: v.string(),
        productName: v.string(),
        price: v.number(),
        quantity: v.number(),
        image: v.string(),
      })
    ),
    shipping: v.object({
      name: v.string(),
      email: v.string(),
      phone: v.string(),
      address: v.string(),
      zipCode: v.string(),
      city: v.string(),
      country: v.string(),
    }),
    payment: v.object({
      paymentMethod: v.union(v.literal("eMoney"), v.literal("cash")),
      eMoneyNumber: v.optional(v.string()),
      eMoneyPin: v.optional(v.string()),
    }),
    subtotal: v.number(),
    shipping_cost: v.number(),
    vat: v.number(),
    grandTotal: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("shipped"),
      v.literal("delivered")
    ),
  })
    .index("by_order_number", ["orderNumber"])
    .index("by_email", ["shipping.email"]),
});
