import type { ReactNode } from "react";
import cn from "@shared/lib";

interface FormFieldProps {
  label: string;
  labelSuffix?: ReactNode;
  required?: boolean;
  optional?: boolean;
  helperText?: string;
  errorText?: string;
  successText?: string;
  children: ReactNode;
  as?: "label" | "fieldset" | "div";
  htmlFor?: string;
  className?: string;
  labelClassName?: string;
  contentClassName?: string;
  messageClassName?: string;
}

export function FormField({
  label,
  labelSuffix,
  required = false,
  optional = false,
  helperText,
  errorText,
  successText,
  children,
  as = "label",
  htmlFor,
  className,
  labelClassName,
  contentClassName,
  messageClassName,
}: FormFieldProps) {
  const labelContent = (
    <>
      {label}
      {labelSuffix && (
        <span className="ml-1 text-sm font-semibold text-(--mis-color-ink-500)">
          {labelSuffix}
        </span>
      )}
      {required && <span className="text-(--mis-color-error-500)">*</span>}
      {optional && (
        <span className="text-[12px] font-medium text-(--mis-color-ink-400)">
          (optional)
        </span>
      )}
    </>
  );

  const message = errorText ? (
    <span
      className={cn(
        "block text-xs font-semibold text-(--mis-color-error-600)",
        messageClassName,
      )}
    >
      {errorText}
    </span>
  ) : successText ? (
    <span
      className={cn(
        "block text-xs font-semibold text-(--mis-color-success-600)",
        messageClassName,
      )}
    >
      {successText}
    </span>
  ) : helperText ? (
    <span
      className={cn(
        "block text-xs text-(--mis-color-ink-500)",
        messageClassName,
      )}
    >
      {helperText}
    </span>
  ) : null;

  if (as === "fieldset") {
    return (
      <fieldset className={cn("block space-y-1.5", className)}>
        <legend
          className={cn(
            "flex items-center gap-1 text-[13px] font-bold text-(--mis-color-ink-800)",
            labelClassName,
          )}
        >
          {labelContent}
        </legend>

        <div className={contentClassName}>{children}</div>
        {message}
      </fieldset>
    );
  }

  if (as === "div") {
    return (
      <div className={cn("block space-y-1.5", className)}>
        <label
          htmlFor={htmlFor}
          className={cn(
            "flex items-center gap-1 text-[13px] font-bold text-(--mis-color-ink-800)",
            labelClassName,
          )}
        >
          {labelContent}
        </label>

        <div className={contentClassName}>{children}</div>
        {message}
      </div>
    );
  }

  return (
    <label htmlFor={htmlFor} className={cn("block space-y-1.5", className)}>
      <span
        className={cn(
          "flex items-center gap-1 text-[13px] font-bold text-(--mis-color-ink-800)",
          labelClassName,
        )}
      >
        {labelContent}
      </span>

      {contentClassName ? (
        <span className={cn("block", contentClassName)}>{children}</span>
      ) : (
        children
      )}
      {message}
    </label>
  );
}
