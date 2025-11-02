// components/home/CategoryCards.tsx
import React from "react";
import { CategoryCard } from "@/components/shared/CategoryCard";
import { CATEGORIES } from "@/lib/constants";

export function CategoryCards() {
  return (
    <section className="container py-16 tablet:py-24 desktop:py-40">
      <div className="grid grid-cols-1 tablet:grid-cols-3 gap-16 tablet:gap-3 desktop:gap-8">
        {CATEGORIES.map((category) => (
          <CategoryCard
            key={category.slug}
            name={category.name}
            slug={category.slug}
            image={category.image}
          />
        ))}
      </div>
    </section>
  );
}
