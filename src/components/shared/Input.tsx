// components/shared/Input.tsx
import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-2">
          <label htmlFor={props.id} className={cn(error && "text-[#CD2C2C]")}>
            {label}
          </label>
          {error && <span className="error-message">{error}</span>}
        </div>
        <input
          ref={ref}
          className={cn("input", error && "error", className)}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
