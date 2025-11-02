import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost"],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
