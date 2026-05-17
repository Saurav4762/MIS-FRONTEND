import { ChevronDown } from "lucide-react";
import { type SelectHTMLAttributes, forwardRef } from "react";
import cn from "@shared/lib";

type SelectOption = {
  label: string;
  value: string;
};

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
  options?: Array<string | SelectOption>;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      hasError = false,
      options,
      placeholder,
      children,
      value,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          value={value}
          className={cn(
            "h-12 w-full appearance-none rounded-lg border bg-ink-50 px-4 pr-11 text-sm font-semibold outline-none transition-colors",
            hasError
              ? "border-error-500 focus:border-error-500 focus:shadow-error"
              : "border-ink-300 hover:border-ink-400 focus:border-pri-500 focus:bg-white focus:shadow-focus",
            value ? "text-ink-900" : "text-ink-700",
            "disabled:cursor-not-allowed disabled:border-ink-200 disabled:bg-ink-100 disabled:text-ink-400",
            className,
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}

          {options?.map((option) => {
            const normalized =
              typeof option === "string"
                ? { label: option, value: option }
                : option;

            return (
              <option key={normalized.value} value={normalized.value}>
                {normalized.label}
              </option>
            );
          })}
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
      </div>
    );
  },
);

Select.displayName = "Select";
