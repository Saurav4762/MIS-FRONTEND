import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import cn from "@shared/lib";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--mis-field-radius)] text-[15px] font-bold tracking-[-0.01em] transition-all disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "h-11 bg-[var(--mis-color-pri-500)] px-5 text-white shadow-[var(--mis-shadow-sm)] hover:bg-[var(--mis-color-pri-600)] hover:shadow-[var(--mis-shadow-md)]",
        secondary:
          "h-11 border border-[var(--mis-color-ink-300)] bg-[var(--mis-color-white)] px-5 text-[var(--mis-color-ink-800)] hover:bg-[var(--mis-color-ink-50)]",
        ghost:
          "h-11 px-5 text-[var(--mis-color-ink-700)] hover:bg-[var(--mis-color-ink-100)]",
        danger:
          "h-11 bg-[var(--mis-color-error-500)] px-5 text-white hover:bg-[var(--mis-color-error-600)]",
      },
      size: {
        sm: "h-8 px-3 text-[13px]",
        md: "h-11 px-5",
      },
      block: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      block: false,
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, block, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(buttonVariants({ variant, size, block }), className)}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
