import { type InputHTMLAttributes, forwardRef } from "react";
import cn from "@shared/lib";
import { cva } from "class-variance-authority";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  block?: boolean;
}

const inputVariants = cva(
  "rounded-field bg-white px-3 py-2.5 text-normal font-medium text-ink-900 outline-none transition-colors placeholder:font-normal placeholder:text-ink-400 disabled:cursor-not-allowed disabled:border-ink-200 disabled:bg-100 disabled:text-ink-400",
  {
    variants: {
      error: {
        true: "border-error-500 focus:border-error-500 focus:shadow-error",
        false:
          "border-ink-300 hover:border-ink-400 focus:border-pri-500 focus:shadow-focus",
      },
      block: {
        true: "w-full",
        false: "",
      },
      radio: {
        true: "peer sr-only bg-black",
        false: "",
      },
    },
    defaultVariants: {
      error: false,
      block: false,
      radio: false,
    },
  },
);

export const Input2 = forwardRef<HTMLInputElement, InputProps>(
  ({ className, block, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          ref={ref}
          className={cn(
            inputVariants({
              error: props.hasError,
              block: block,
              radio: props.type === "radio",
            }),
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);

Input2.displayName = "Input2";
