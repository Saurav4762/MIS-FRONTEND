import { type InputHTMLAttributes, forwardRef } from "react";
import cn from "@shared/lib";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasError = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-field bg-white px-3 py-2.5 text-normal font-medium text-ink-900 outline-none transition-colors placeholder:font-normal placeholder:text-ink-400",
          hasError
            ? "border-error-500 focus:border-error-500 focus:shadow-error"
            : "border-ink-300 hover:border-ink-400 focus:border-pri-500 focus:shadow-focus",
          "disabled:cursor-not-allowed disabled:border-(--mis-color-ink-200) disabled:bg-(--mis-color-ink-100) disabled:text-(--mis-color-ink-400)",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
