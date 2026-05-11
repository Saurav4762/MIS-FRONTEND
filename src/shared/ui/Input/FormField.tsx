import type { ReactNode } from "react";
import cn from "@shared/lib";

interface FormFieldProps {
  label: string;
  required?: boolean;
  optional?: boolean;
  helperText?: string;
  errorText?: string;
  successText?: string;
  children: ReactNode;
  className?: string;
}

export function FormField({
  label,
  required = false,
  optional = false,
  helperText,
  errorText,
  successText,
  children,
  className,
}: FormFieldProps) {
  return (
    <label className={cn("block space-y-1.5", className)}>
      <span className="flex items-center gap-1 text-[13px] font-bold text-(--mis-color-ink-800)">
        {label}
        {required && <span className="text-(--mis-color-error-500)">*</span>}
        {optional && (
          <span className="text-[12px] font-medium text-(--mis-color-ink-400)">
            (optional)
          </span>
        )}
      </span>

      {children}

      {errorText ? (
        <span className="block text-xs font-semibold text-(--mis-color-error-600)">
          {errorText}
        </span>
      ) : successText ? (
        <span className="block text-xs font-semibold text-(--mis-color-success-600)">
          {successText}
        </span>
      ) : helperText ? (
        <span className="block text-xs text-(--mis-color-ink-500)">
          {helperText}
        </span>
      ) : null}
    </label>
  );
}
