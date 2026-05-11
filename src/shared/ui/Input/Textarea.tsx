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
          "min-h-[110px] w-full rounded-[var(--mis-field-radius)] border bg-[var(--mis-color-white)] px-[14px] py-3 text-[15px] font-medium text-[var(--mis-color-ink-900)] outline-none transition-colors placeholder:font-normal placeholder:text-[var(--mis-color-ink-400)]",
          hasError
            ? "border-[var(--mis-color-error-500)] focus:border-[var(--mis-color-error-500)] focus:shadow-[var(--mis-shadow-error)]"
            : "border-[var(--mis-color-ink-300)] hover:border-[var(--mis-color-ink-400)] focus:border-[var(--mis-color-pri-500)] focus:shadow-[var(--mis-shadow-focus)]",
          "disabled:cursor-not-allowed disabled:border-[var(--mis-color-ink-200)] disabled:bg-[var(--mis-color-ink-100)] disabled:text-[var(--mis-color-ink-400)]",
          className,
        )}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";
