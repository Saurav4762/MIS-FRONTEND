import { cva, type VariantProps } from "class-variance-authority";
import { Link, type LinkProps } from "@tanstack/react-router";
import { type ReactNode } from "react";
import cn from "@shared/lib";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-(--mis-field-radius) text-[15px] font-bold tracking-[-0.01em] transition-all disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "h-11 bg-(--mis-color-pri-500) px-5 text-white shadow-(--mis-shadow-sm) hover:bg-(--mis-color-pri-600) hover:shadow-(--mis-shadow-md)",
        secondary:
          "h-11 border border-(--mis-color-ink-300) bg-(--mis-color-white) px-5 text-(--mis-color-ink-800) hover:bg-(--mis-color-ink-50)",
        ghost:
          "h-11 px-5 text-(--mis-color-ink-700) hover:bg-(--mis-color-ink-100)",
        danger:
          "h-11 bg-(--mis-color-error-500) px-5 text-white hover:bg-(--mis-color-error-600)",
        text: "font-medium text-sm text-black hover:text-pri-700",
      },
      size: {
        sm: "h-8 px-3 text-[13px]",
        md: "h-11 px-5",
        text: "h-min-content px-5",
      },
      align: {
        left: "justify-start",
        center: "justify-center",
        right: "justify-end",
      },
      block: {
        true: "w-full",
        false: "",
      },
      isActive: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        isActive: true,
        className: "bg-(--mis-color-pri-600) shadow-(--mis-shadow-md)",
      },
      {
        variant: "primary",
        isActive: false,
        className: "bg-(--mis-color-pri-500)",
      },
      {
        variant: "secondary",
        isActive: true,
        className:
          "bg-(--mis-color-ink-100) border-(--mis-color-ink-400) text-(--mis-color-ink-900)",
      },
      {
        variant: "secondary",
        isActive: false,
        className: "bg-(--mis-color-white) text-(--mis-color-ink-800)",
      },
      {
        variant: "ghost",
        isActive: true,
        className: "bg-(--mis-color-ink-200) text-(--mis-color-ink-900)",
      },
      {
        variant: "ghost",
        isActive: false,
        className: "text-(--mis-color-ink-700)",
      },
      {
        variant: "danger",
        isActive: true,
        className: "bg-(--mis-color-error-600)",
      },
      {
        variant: "danger",
        isActive: false,
        className: "bg-(--mis-color-error-500)",
      },
      {
        variant: "text",
        isActive: true,
        className: "text-pri-700 underlined bg-transparent"
      },
      {
        variant: "text",
        isActive: false,
        className:"text-ink-400"
      }
    ],
    defaultVariants: {
      variant: "primary",
      align: "center",
      size: "md",
      block: false,
      isActive: false,
    },
  },
);

type ButtonLinkProps = LinkProps &
  VariantProps<typeof buttonVariants> & {
    className?: string;
    icon?: ReactNode;
  };

export function ButtonLink({
  className,
  variant,
  size,
  block,
  align,
  icon,

  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      {...(props as LinkProps)}
      className={cn(
        buttonVariants({ variant, size, block, isActive: false, align }),
        className,
      )}
      activeProps={{
        className: cn(
          buttonVariants({ variant, size, block, isActive: true, align }),
          className,
        ),
      }}
    >
      {(state) => {
        return (
          <>
            {icon && <span className="flex items-center">{icon}</span>}

            {typeof children === "function" ? children(state) : children}
          </>
        );
      }}
    </Link>
  );
}
