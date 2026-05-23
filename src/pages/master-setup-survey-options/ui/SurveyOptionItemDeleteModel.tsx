import { Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@shared/ui/Button";
import { Modal } from "@shared/ui/Modal";
import { useDeleteOptionItem, type OptionItem } from "@entities/option";

// import { useDeleteOptionItem } from "../api";
// import type { OptionItem } from "../model";

interface SurveyOptionItemDeleteModalProps {
  isOpen: boolean;
  optionItem?: OptionItem;
  optionListName?: string;
  onClose: () => void;
  onSave: (deletedId: string) => void | Promise<void>;
}

export function SurveyOptionItemDeleteModal({
  isOpen,
  optionItem,
  optionListName,
  onClose,
  onSave,
}: SurveyOptionItemDeleteModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const { mutateAsync: deleteOptionItemAsync } = useDeleteOptionItem();

  const normalizedItemId = optionItem?.id?.trim() ?? "";
  const canDelete = normalizedItemId.length > 0;

  const handleClose = () => {
    if (isDeleting) {
      return;
    }

    onClose();
  };

  const handleDelete = () => {
    if (!canDelete) {
      return;
    }

    setIsDeleting(true);

    deleteOptionItemAsync({ id: normalizedItemId })
      .then(() => {
        onSave(normalizedItemId);
        onClose();
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      title={`Delete ${optionListName ?? "Survey Option Item"}`}
      description="This action will permanently remove this option item."
      onClose={handleClose}
      disableClose={isDeleting}
    >
      <div className="mt-6 rounded-(--mis-card-radius) border border-(--mis-color-error-100) bg-(--mis-color-error-50) px-4 py-4">
        <p className="text-sm text-(--mis-color-error-600)">
          <span className="font-bold">Item:</span>{" "}
          {optionItem?.labelEn ?? "No item selected"}
        </p>
        <p className="mt-1 text-xs text-(--mis-color-ink-600)">
          {optionItem?.labelNe ?? "Select an option item before deleting."}
        </p>
      </div>

      {!canDelete ? (
        <p className="mt-4 rounded-(--mis-field-radius) border border-(--mis-color-error-100) bg-(--mis-color-error-50) px-4 py-3 text-sm font-semibold text-(--mis-color-error-600)">
          Select an option item before deleting.
        </p>
      ) : null}

      <div className="mt-7 flex flex-wrap justify-end gap-3 border-t border-(--mis-color-ink-200) pt-5">
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
          disabled={!canDelete || isDeleting}
        >
          <Trash2 className="h-4 w-4" />
          {isDeleting ? "Deleting..." : "Delete Option Item"}
        </Button>
      </div>
    </Modal>
  );
}
