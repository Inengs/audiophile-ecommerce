// components/layout/MobileMenu.tsx
"use client";

import React from "react";
import { CategoryCard } from "@/components/shared/CategoryCard";
import { CATEGORIES } from "@/lib/constants";

interface MobileMenuProps {
  onClose: () => void;
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  return (
    <div className="fixed inset-0 z-40 desktop:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Menu Content */}
      <div className="relative bg-white rounded-b-lg pt-8 pb-8 px-6 tablet:px-10">
        <div className="grid grid-cols-1 tablet:grid-cols-3 gap-16 tablet:gap-3">
          {CATEGORIES.map((category) => (
            <CategoryCard
              key={category.slug}
              name={category.name}
              slug={category.slug}
              image={category.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
