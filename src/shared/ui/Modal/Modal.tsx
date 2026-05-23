import type { ReactNode } from "react";
import { X } from "lucide-react";
import cn from "@shared/lib";

interface ModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  eyebrow?: string;
  onClose: () => void;
  disableClose?: boolean;
  children: ReactNode;
  className?: string;
}

export function Modal({
  isOpen,
  title,
  description,
  eyebrow = "Model Title",
  onClose,
  disableClose = false,
  children,
  className,
}: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 p-4 backdrop-blur-sm md:p-8">
      <div
        className={cn(
          "mis-modal-shell mx-auto mt-8 w-full max-w-7xl p-6",
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-(--mis-color-ink-500)">
              {eyebrow}
            </p>
            <h3 className="mt-2 text-2xl uppercase font-extrabold leading-[1.1] tracking-[-0.015em] text-ink-700">
              {title}
            </h3>
            {description ? (
              <p className="mt-2 text-sm text-(--mis-color-ink-600)">
                {description}
              </p>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={disableClose}
            className="rounded-(--mis-field-radius) p-2 text-(--mis-color-ink-500) transition-colors hover:bg-(--mis-color-ink-100) hover:text-(--mis-color-ink-900) disabled:cursor-not-allowed disabled:opacity-60"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
