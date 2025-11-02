// convex/products.ts
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAllProducts = query({
  handler: async (ctx) => {
    return await ctx.db.query("products").collect();
  },
});

export const getProductsByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("products")
      .filter((q) => q.eq(q.field("category"), args.category))
      .collect();
  },
});

export const getProductBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("products")
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .first();
  },
});

export const getRelatedProducts = query({
  args: { slugs: v.array(v.string()) },
  handler: async (ctx, args) => {
    const products = await Promise.all(
      args.slugs.map((slug) =>
        ctx.db
          .query("products")
          .filter((q) => q.eq(q.field("slug"), slug))
          .first()
      )
    );
    return products.filter((p) => p !== null);
  },
});

// Seed function to populate initial product data
export const seedProducts = mutation({
  handler: async (ctx) => {
    // This is where you'd add your product data
    // Example for one product:
    await ctx.db.insert("products", {
      slug: "xx99-mark-ii-headphones",
      name: "XX99 Mark II Headphones",
      category: "headphones",
      isNew: true,
      price: 2999,
      description:
        "The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.",
      features:
        "Featuring a genuine leather head strap and premium earcups, these headphones deliver superior comfort for those who like to enjoy endless listening. It includes intuitive controls designed for any situation. Whether you're taking a business call or just in your own personal space, the auto on/off and pause features ensure that you'll never miss a beat.\n\nThe advanced Active Noise Cancellation with built-in equalizer allow you to experience your audio world on your terms. It lets you enjoy your audio in peace, but quickly interact with your surroundings when you need to. Combined with Bluetooth 5. 0 compliant connectivity and 17 hour battery life, the XX99 Mark II headphones gives you superior sound, cutting-edge technology, and a modern design aesthetic.",
      includedItems: [
        { quantity: 1, item: "Headphone Unit" },
        { quantity: 2, item: "Replacement Earcups" },
        { quantity: 1, item: "User Manual" },
        { quantity: 1, item: "3.5mm 5m Audio Cable" },
        { quantity: 1, item: "Travel Bag" },
      ],
      gallery: {
        first:
          "/assets/product-xx99-mark-two-headphones/desktop/image-gallery-1.jpg",
        second:
          "/assets/product-xx99-mark-two-headphones/desktop/image-gallery-2.jpg",
        third:
          "/assets/product-xx99-mark-two-headphones/desktop/image-gallery-3.jpg",
      },
      images: {
        mobile:
          "/assets/product-xx99-mark-two-headphones/mobile/image-product.jpg",
        tablet:
          "/assets/product-xx99-mark-two-headphones/tablet/image-product.jpg",
        desktop:
          "/assets/product-xx99-mark-two-headphones/desktop/image-product.jpg",
      },
      categoryImage: {
        mobile:
          "/assets/product-xx99-mark-two-headphones/mobile/image-category-page-preview.jpg",
        tablet:
          "/assets/product-xx99-mark-two-headphones/tablet/image-category-page-preview.jpg",
        desktop:
          "/assets/product-xx99-mark-two-headphones/desktop/image-category-page-preview.jpg",
      },
      relatedProducts: [
        "xx99-mark-i-headphones",
        "xx59-headphones",
        "zx9-speaker",
      ],
    });

    // Add more products here following the same pattern
    console.log("Products seeded successfully");
  },
});
