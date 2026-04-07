import { cva } from "class-variance-authority";
import { AlertTriangle, Trash2, X } from "lucide-react";

import cn from "@shared/lib";
import { useDeleteWard } from "../api";
import type { Ward } from "../model";

const actionButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition-colors",
  {
    variants: {
      variant: {
        ghost: "text-[#B1B7C7] hover:text-white",
        danger:
          "bg-[#D84A64] text-white shadow-[0_0_20px_rgba(216,74,100,0.35)] hover:bg-[#E05E77]",
      },
    },
    defaultVariants: {
      variant: "ghost",
    },
  },
);

interface WardDeleteConfirmBoxProps {
  ward: Pick<Ward, "id" | "number"> | null;
  municipalityId: string;
  onClose: () => void;
  onConfirm: () => void;
  onDismiss: () => void;
}

export function WardDeleteConfirmBox({
  ward,
  municipalityId,
  onClose,
  onConfirm,
  onDismiss,
}: WardDeleteConfirmBoxProps) {
  const deleteWardMutation = useDeleteWard();

  if (!ward?.id) {
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
      await deleteWardMutation.mutateAsync({ id: ward.id, municipalityId });
      onConfirm?.();
    } catch {
      alert("Failed to delete ward.");
    }
  };

  return (
    <section className="min-h-screen h-dvh overflow-hidden bg-transparent p-0">
      <div className="mx-auto mt-[18vh] w-full max-w-xl overflow-hidden rounded-3xl border border-[#242C3E] bg-[#1A1F2B] shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
        <header className="flex items-start justify-between border-b border-[#232B3E] px-8 py-7 md:px-10">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl border border-[#A73953] bg-[#3A1F2B] text-[#E66A84]">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold leading-none tracking-[-0.02em] text-[#E8EBF3]">
                Delete Ward
              </h2>
              <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#A1A8BA]">
                This action cannot be undone
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close"
            onClick={handleClose}
            className="rounded-lg p-2 text-[#C5CBD8] transition-colors hover:bg-[#2B3245] hover:text-white"
          >
            <X className="h-7 w-7" />
          </button>
        </header>

        <div className="space-y-3 px-8 py-8 md:px-10">
          <p className="text-sm leading-7 text-[#C7CDDA]">
            You are about to permanently delete this ward record.
          </p>
          <div className="rounded-xl border border-[#3B4254] bg-[#2A3040] px-4 py-3 text-[#E2E6F1]">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#9EA6BA]">
              Selected Ward
            </p>
            <p className="mt-2 text-base font-medium">Ward No. {ward.number}</p>
          </div>
        </div>

        <footer className="flex flex-wrap items-center justify-end gap-4 border-t border-[#232B3E] px-8 py-7 md:px-10">
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
            disabled={deleteWardMutation.isPending}
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
            {deleteWardMutation.isPending ? "Deleting..." : "Confirm Delete"}
          </button>
        </footer>
      </div>
    </section>
  );
}

export default WardDeleteConfirmBox;
