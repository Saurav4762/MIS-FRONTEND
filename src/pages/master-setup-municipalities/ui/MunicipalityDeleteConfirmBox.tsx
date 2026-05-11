import { cva } from "class-variance-authority";
import { useDeleteMunicipality } from "../api";
import type { Municipality } from "../model";
import { AlertTriangle, Trash2, X } from "lucide-react";

import cn from "@shared/lib";

const actionButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition-colors",
  {
    variants: {
      variant: {
        ghost: "text-[var(--mis-color-ink-700)] hover:text-[var(--mis-color-ink-900)]",
        danger:
          "bg-[var(--mis-color-error-500)] text-white shadow-[var(--mis-shadow-error)] hover:bg-[var(--mis-color-error-600)]",
      },
    },
    defaultVariants: {
      variant: "ghost",
    },
  },
);

interface MunicipalityDeleteConfirmBoxProps {
  municipality: Pick<Municipality, "id" | "nameEn" | "nameNe"> | null;
  onClose: () => void;
  onConfirm: () => void;
  onDismiss: () => void;
}

export default function MunicipalityDeleteConfirmBox({
  municipality,
  onClose,
  onConfirm,
  onDismiss,
}: MunicipalityDeleteConfirmBoxProps) {
  const deleteMunicipalityMutation = useDeleteMunicipality();

  if (!municipality?.id) {
    onClose();
    return null;
  }

  const handleClose = () => {
    onClose?.();
  };
  const handleDismiss = () => {
    onDismiss?.();
    onClose?.();
  };

  const handleDelete = async () => {
    try {
      await deleteMunicipalityMutation.mutateAsync(municipality);
      onConfirm?.();
    } catch {
      alert("Something went wrong");
    }
  };

  return (
    <section className="min-h-screen h-dvh overflow-hidden bg-transparent p-0">
      <div className="mx-auto mt-[18vh] w-full max-w-xl overflow-hidden rounded-3xl border border-[var(--mis-color-ink-200)] bg-[var(--mis-color-white)] shadow-[var(--mis-shadow-lg)]">
        <header className="flex items-start justify-between border-b border-[var(--mis-color-ink-200)] px-8 py-7 md:px-10">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl border border-[var(--mis-color-error-500)] bg-[var(--mis-color-error-50)] text-[var(--mis-color-error-600)]">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold leading-none tracking-[-0.02em] text-[var(--mis-color-ink-900)]">
                Delete Municipality
              </h2>
              <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--mis-color-ink-500)]">
                This action cannot be undone
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close"
            onClick={handleClose}
            className="rounded-lg p-2 text-[var(--mis-color-ink-600)] transition-colors hover:bg-[var(--mis-color-ink-100)] hover:text-[var(--mis-color-ink-900)]"
          >
            <X className="h-7 w-7" />
          </button>
        </header>

        <div className="space-y-3 px-8 py-8 md:px-10">
          <p className="text-sm leading-7 text-[var(--mis-color-ink-700)]">
            You are about to permanently delete this municipality record.
          </p>
          <div className="rounded-xl border border-[var(--mis-color-ink-200)] bg-[var(--mis-color-ink-50)] px-4 py-3 text-[var(--mis-color-ink-800)]">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--mis-color-ink-500)]">
              Selected Municipality
            </p>
            <p className="mt-2 text-base font-medium">
              {municipality.nameNe} ({municipality.nameEn})
            </p>
          </div>
        </div>

        <footer className="flex flex-wrap items-center justify-end gap-4 border-t border-[var(--mis-color-ink-200)] px-8 py-7 md:px-10">
          <button
            type="button"
            className={cn(actionButtonVariants({ variant: "ghost" }))}
            onClick={handleDismiss}
          >
            Dismiss
          </button>
          <button
            type="button"
            className={cn(
              actionButtonVariants({ variant: "danger" }),
              "min-w-52 disabled:cursor-not-allowed disabled:opacity-70",
            )}
            disabled={deleteMunicipalityMutation.isPending}
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
            {deleteMunicipalityMutation.isPending ? "Deleting..." : "Confirm Delete"}
          </button>
        </footer>
      </div>
    </section>
  );
}

