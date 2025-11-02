// lib/constants.ts
export const SHIPPING_COST = 50;
export const VAT_RATE = 0.2; // 20%

export const CATEGORIES = [
  {
    name: "HEADPHONES",
    slug: "headphones",
    image: "/assets/shared/desktop/image-category-thumbnail-headphones.png",
  },
  {
    name: "SPEAKERS",
    slug: "speakers",
    image: "/assets/shared/desktop/image-category-thumbnail-speakers.png",
  },
  {
    name: "EARPHONES",
    slug: "earphones",
    image: "/assets/shared/desktop/image-category-thumbnail-earphones.png",
  },
];

export const NAVIGATION_LINKS = [
  { label: "HOME", href: "/" },
  { label: "HEADPHONES", href: "/headphones" },
  { label: "SPEAKERS", href: "/speakers" },
  { label: "EARPHONES", href: "/earphones" },
];
