import { Trash2, X } from "lucide-react";
import { useState } from "react";

import { useDeleteOptionList } from "../api";
import type { OptionList } from "../model";
import type { ApiError } from "@shared/api";

interface SurveyOptionDeleteModalProps {
  isOpen: boolean;
  optionList?: OptionList;
  onClose: () => void;
  onSave: (deletedId: string) => void | Promise<void>;
}

export function SurveyOptionDeleteModal({
  isOpen,
  optionList,
  onClose,
  onSave,
}: SurveyOptionDeleteModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutateAsync: deleteOptionListAsync } = useDeleteOptionList();

  if (!isOpen) {
    return null;
  }

  const normalizedId = optionList?.id?.trim() ?? "";

  const handleClose = () => {
    if (isDeleting) {
      return;
    }

    setErrorMessage(null);
    onClose();
  };

  const handleDelete = async () => {
    if (!normalizedId) {
      return;
    }

    setIsDeleting(true);
    setErrorMessage(null);

    try {
      await deleteOptionListAsync({ id: normalizedId });
      await onSave(normalizedId);
      onClose();
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(apiError.message || "Failed to delete survey option.");
      console.error("Error deleting option list:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#020816]/75 p-4 backdrop-blur-[2px] md:p-8">
      <div className="mx-auto mt-8 w-full max-w-xl rounded-[22px] border border-[#242C3F] bg-[#171D2A] p-6 shadow-[0_24px_70px_rgba(2,8,22,0.5)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7E879A]">
              Survey Directory
            </p>
            <h3 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-[#E8ECF8]">
              Delete Survey Option
            </h3>
            <p className="mt-2 text-sm text-[#8D97AC]">
              This will permanently remove the selected category.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isDeleting}
            className="rounded-xl p-2 text-[#96A0B4] transition-colors hover:bg-[#21293A] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-[#513244] bg-[#2A1B2A] px-4 py-4">
          <p className="text-sm text-[#F1A2B4]">
            <span className="font-semibold">Category:</span> {optionList?.labelEn ?? "No category selected"}
          </p>
          <p className="mt-1 text-xs text-[#C690A0]">
            {optionList?.labelNe ?? "Select a survey option before deleting."}
          </p>
        </div>

        {errorMessage && (
          <p className="mt-4 rounded-2xl border border-[#513244] bg-[#2A1B2A] px-4 py-3 text-sm font-medium text-[#F1A2B4]">
            {errorMessage}
          </p>
        )}

        <div className="mt-7 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            disabled={isDeleting}
            className="rounded-2xl border border-[#2A3348] px-4 py-3 text-sm font-semibold text-[#AEB7CA] transition-colors hover:bg-[#20283A] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={normalizedId.length === 0 || isDeleting}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#D44D62] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#E55E73] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Trash2 className="h-4 w-4" />
            {isDeleting ? "Deleting..." : "Delete Survey Option"}
          </button>
        </div>
      </div>
    </div>
  );
}