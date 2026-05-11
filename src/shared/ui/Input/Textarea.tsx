import { type TextareaHTMLAttributes, forwardRef } from "react";
import cn from "@shared/lib";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError = false, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "min-h-[110px] w-full rounded-(--mis-field-radius) border bg-(--mis-color-white) px-[14px] py-3 text-[15px] font-medium text-(--mis-color-ink-900) outline-none transition-colors placeholder:font-normal placeholder:text-(--mis-color-ink-400)",
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

Textarea.displayName = "Textarea";
