// components/shared/CategoryCard.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";

interface CategoryCardProps {
  name: string;
  slug: string;
  image: string;
}

export function CategoryCard({ name, slug, image }: CategoryCardProps) {
  return (
    <Link
      href={`/${slug}`}
      className="relative bg-light-gray rounded-lg pt-[88px] pb-[22px] px-6 flex flex-col items-center group hover:bg-light-gray/80 transition-colors"
    >
      <div className="absolute top-0 -translate-y-1/3 w-[160px] h-[160px] tablet:w-[200px] tablet:h-[200px]">
        <Image src={image} alt={name} fill className="object-contain" />
      </div>
      <h6 className="h6 mt-4 mb-4 text-black">{name}</h6>
      <div className="flex items-center gap-3 group-hover:gap-4 transition-all">
        <span className="subtitle text-black/50 group-hover:text-primary transition-colors">
          SHOP
        </span>
        <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.322 1l5 5-5 5"
            stroke="#D87D4A"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
      </div>
    </Link>
  );
}
