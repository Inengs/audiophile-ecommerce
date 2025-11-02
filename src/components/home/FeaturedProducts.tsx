// components/home/FeaturedProducts.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/shared/Button";
import { useBreakpoint } from "../../hooks/useMediaquery";

export function FeaturedProducts() {
  const { currentBreakpoint } = useBreakpoint();

  return (
    <section className="container pb-32 space-y-8 tablet:space-y-12 desktop:space-y-12">
      {/* ZX9 Speaker - Large Featured */}
      <div className="bg-primary rounded-lg overflow-hidden relative pt-14 pb-14 tablet:pt-16 tablet:pb-16 desktop:pt-24 desktop:pb-0 desktop:flex desktop:items-end desktop:gap-8">
        {/* Pattern Circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 desktop:translate-x-0 desktop:translate-y-0 desktop:left-[-150px] desktop:top-[-40px]">
            <Image
              src="/assets/home/desktop/pattern-circles.svg"
              alt=""
              width={944}
              height={944}
              className="scale-[0.95] tablet:scale-100"
            />
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center desktop:items-start desktop:flex-1 desktop:pl-24">
          {/* Speaker Image */}
          <div className="relative w-[172px] h-[207px] tablet:w-[197px] tablet:h-[237px] desktop:w-[410px] desktop:h-[493px] mb-8 desktop:mb-0">
            <Image
              src={
                currentBreakpoint === "desktop"
                  ? "/assets/home/desktop/image-speaker-zx9.png"
                  : "/assets/home/tablet/image-speaker-zx9.png"
              }
              alt="ZX9 Speaker"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="relative z-10 text-center desktop:text-left desktop:flex-1 desktop:pb-32 desktop:pr-24">
          <h2 className="h1 text-white mb-6 desktop:max-w-[261px]">
            ZX9 SPEAKER
          </h2>
          <p className="body text-white/75 mb-6 tablet:mb-10 max-w-[349px] mx-auto desktop:mx-0">
            Upgrade to premium speakers that are phenomenally built to deliver
            truly remarkable sound.
          </p>
          <Link href="/speakers/zx9-speaker">
            <Button
              variant="secondary"
              className="bg-dark hover:bg-[#4C4C4C] text-white border-none"
            >
              See Product
            </Button>
          </Link>
        </div>
      </div>

      {/* ZX7 Speaker - Medium Featured */}
      <div className="relative rounded-lg overflow-hidden h-[320px]">
        <Image
          src={
            currentBreakpoint === "mobile"
              ? "/assets/home/mobile/image-speaker-zx7.jpg"
              : currentBreakpoint === "tablet"
                ? "/assets/home/tablet/image-speaker-zx7.jpg"
                : "/assets/home/desktop/image-speaker-zx7.jpg"
          }
          alt="ZX7 Speaker"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center pl-6 tablet:pl-16 desktop:pl-24">
          <h4 className="h4 text-black mb-8">ZX7 SPEAKER</h4>
          <Link href="/speakers/zx7-speaker">
            <Button variant="secondary">See Product</Button>
          </Link>
        </div>
      </div>

      {/* YX1 Earphones - Grid Featured */}
      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6 tablet:gap-3 desktop:gap-8">
        <div className="relative rounded-lg overflow-hidden h-[200px] tablet:h-[320px]">
          <Image
            src={
              currentBreakpoint === "mobile"
                ? "/assets/home/mobile/image-earphones-yx1.jpg"
                : currentBreakpoint === "tablet"
                  ? "/assets/home/tablet/image-earphones-yx1.jpg"
                  : "/assets/home/desktop/image-earphones-yx1.jpg"
            }
            alt="YX1 Earphones"
            fill
            className="object-cover"
          />
        </div>
        <div className="bg-light-gray rounded-lg h-[200px] tablet:h-[320px] flex flex-col justify-center pl-6 tablet:pl-10 desktop:pl-24">
          <h4 className="h4 text-black mb-8">YX1 EARPHONES</h4>
          <Link href="/earphones/yx1-earphones">
            <Button variant="secondary">See Product</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
