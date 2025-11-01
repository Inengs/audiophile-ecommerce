import { mutation } from "./_generated/server";

export const seedProducts = mutation({
  handler: async (ctx) => {
    // Add your product data here
    await ctx.db.insert("products", {
      slug: "xx99-mark-two-headphones",
      name: "XX99 Mark II Headphones",
      category: "headphones",
      price: 2999,
      description: "The new XX99 Mark II headphones...",
      // ... rest of product data
    });

    // Add more products...
  },
});
