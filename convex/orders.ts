// convex/orders.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createOrder = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const orderId = await ctx.db.insert("orders", {
      ...args,
      status: "confirmed",
    });
    return orderId;
  },
});

export const getOrderByNumber = query({
  args: { orderNumber: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .filter((q) => q.eq(q.field("orderNumber"), args.orderNumber))
      .first();
  },
});

export const getOrdersByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const allOrders = await ctx.db.query("orders").collect();
    return allOrders.filter((order) => order.shipping.email === args.email);
  },
});
