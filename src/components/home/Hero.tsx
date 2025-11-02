// components/home/Hero.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/shared/Button";
import { useBreakpoint } from "../../hooks/useMediaquery";

export function Hero() {
  const { currentBreakpoint } = useBreakpoint();

  const getHeroImage = () => {
    switch (currentBreakpoint) {
      case "desktop":
        return "/assets/home/desktop/image-hero.jpg";
      case "tablet":
        return "/assets/home/tablet/image-header.jpg";
      default:
        return "/assets/home/mobile/image-header.jpg";
    }
  };

  return (
    <section className="bg-dark relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-30">
        <Image
          src={getHeroImage()}
          alt="XX99 Mark II Headphones"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="container relative">
        <div className="flex flex-col items-center text-center desktop:items-start desktop:text-left py-28 tablet:py-32 desktop:py-36 max-w-[398px] mx-auto desktop:mx-0">
          <p className="overline text-white/50 mb-6">NEW PRODUCT</p>
          <h1 className="h1 text-white mb-6">XX99 Mark II Headphones</h1>
          <p className="body text-white/75 mb-10 max-w-[349px]">
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>
          <Link href="/headphones/xx99-mark-ii-headphones">
            <Button>See Product</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
