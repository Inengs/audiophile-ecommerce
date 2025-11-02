// components/shared/QuantitySelector.tsx
"use client";

import React from "react";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className="flex items-center bg-light-gray">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        className="px-4 py-4 text-black/25 hover:text-primary transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
        aria-label="Decrease quantity"
      >
        <span className="subtitle">-</span>
      </button>
      <span className="px-6 py-4 subtitle text-center min-w-[40px]">
        {value}
      </span>
      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        className="px-4 py-4 text-black/25 hover:text-primary transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
        aria-label="Increase quantity"
      >
        <span className="subtitle">+</span>
      </button>
    </div>
  );
}
