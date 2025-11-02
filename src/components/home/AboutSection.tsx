// components/home/AboutSection.tsx
"use client";

import React from "react";
import Image from "next/image";
import { useBreakpoint } from "../../hooks/useMediaquery";

export function AboutSection() {
  const { currentBreakpoint } = useBreakpoint();

  const getAboutImage = () => {
    switch (currentBreakpoint) {
      case "desktop":
        return "/assets/shared/desktop/image-best-gear.jpg";
      case "tablet":
        return "/assets/shared/tablet/image-best-gear.jpg";
      default:
        return "/assets/shared/mobile/image-best-gear.jpg";
    }
  };

  return (
    <section className="container pb-32 desktop:pb-40">
      <div className="flex flex-col desktop:flex-row-reverse gap-10 tablet:gap-16 desktop:gap-32 items-center">
        {/* Image */}
        <div className="relative w-full h-[300px] tablet:h-[300px] desktop:h-[588px] desktop:flex-1 rounded-lg overflow-hidden">
          <Image
            src={getAboutImage()}
            alt="Person wearing headphones"
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="text-center desktop:text-left desktop:flex-1">
          <h2 className="h2 text-black mb-8 max-w-[445px] mx-auto desktop:mx-0">
            Bringing you the <span className="text-primary">best</span> audio
            gear
          </h2>
          <p className="body text-black/50 max-w-[573px] mx-auto desktop:mx-0">
            Located at the heart of New York City, Audiophile is the premier
            store for high end headphones, earphones, speakers, and audio
            accessories. We have a large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our
            products. Stop by our store to meet some of the fantastic people who
            make Audiophile the best place to buy your portable audio equipment.
          </p>
        </div>
      </div>
    </section>
  );
}
