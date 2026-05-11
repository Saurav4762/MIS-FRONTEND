import { Trash2 } from "lucide-react";
import { useState } from "react";

import { useDeleteOptionList } from "../api";
import type { OptionList } from "../model";
import type { ApiError } from "@shared/api";
import { Button } from "@shared/ui/Button";
import { Modal } from "@shared/ui/Modal";

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
    <Modal
      isOpen={isOpen}
      title="Delete Survey Option"
      description="This will permanently remove the selected category."
      onClose={handleClose}
      disableClose={isDeleting}
    >
      <div className="mt-6 rounded-[--mis-card-radius] border border-[--mis-color-error-100] bg-[var--mis-color-error-50] px-4 py-4">
        <p className="text-sm text-[--mis-color-error-600]">
          <span className="font-bold">Category:</span>{" "}
          {optionList?.labelEn ?? "No category selected"}
        </p>
        <p className="mt-1 text-xs text-[--mis-color-ink-600]">
          {optionList?.labelNe ?? "Select a survey option before deleting."}
        </p>
      </div>

      {errorMessage ? (
        <p className="mt-4 rounded-[--mis-field-radius] border border-[--mis-color-error-100] bg-[--mis-color-error-50] px-4 py-3 text-sm font-semibold text-[--mis-color-error-600]">
          {errorMessage}
        </p>
      ) : null}

      <div className="mt-7 flex flex-wrap justify-end gap-3 border-t border-[--mis-color-ink-200] pt-5">
        <Button
          type="button"
          variant="ghost"
          onClick={handleClose}
          disabled={isDeleting}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="danger"
          onClick={handleDelete}
          disabled={normalizedId.length === 0 || isDeleting}
        >
          <Trash2 className="h-4 w-4" />
          {isDeleting ? "Deleting..." : "Delete Survey Option"}
        </Button>
      </div>
    </Modal>
  );
}
