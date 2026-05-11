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
          "h-(--mis-field-height) w-full rounded-(--mis-field-radius) border bg-(--mis-color-white) px-[14px] text-[15px] font-medium text-(--mis-color-ink-900) outline-none transition-colors placeholder:font-normal placeholder:text-(--mis-color-ink-400)",
          hasError
            ? "border-(--mis-color-error-500) focus:border-(--mis-color-error-500) focus:shadow-(--mis-shadow-error)"
            : "border-(--mis-color-ink-300) hover:border-(--mis-color-ink-400) focus:border-(--mis-color-pri-500) focus:shadow-(--mis-shadow-focus)",
          "disabled:cursor-not-allowed disabled:border-(--mis-color-ink-200) disabled:bg-(--mis-color-ink-100) disabled:text-(--mis-color-ink-400)",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
