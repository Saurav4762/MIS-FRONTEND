import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ApiError } from "@shared/api";
import { Button } from "@shared/ui/Button";
import { FormField, Input } from "@shared/ui/Input";
import { Modal } from "@shared/ui/Modal";
import { useCreateOptionItem } from "../api";
import {
  createOptionItemFormSchema,
} from "../model/types";

interface SurveyOptionItemCreateModalProps {
  isOpen: boolean;
  optionListId: string;
  optionListName?: string;
  onClose: () => void;
  onSave: () => void | Promise<void>;
}

type CreateOptionItemFormData = typeof createOptionItemFormSchema._input;

export function SurveyOptionItemCreateModal({
  isOpen,
  optionListId,
  optionListName,
  onClose,
  onSave,
}: SurveyOptionItemCreateModalProps) {
  const { mutateAsync: createOptionItemAsync } = useCreateOptionItem();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateOptionItemFormData>({
    resolver: zodResolver(createOptionItemFormSchema),
    defaultValues: {
      labelEn: "",
      labelNe: "",
    },
  });

  const handleClose = () => {
    if (isSubmitting) {
      return;
    }

    setApiError(null);
    onClose();
  };

  const handleSave = async (data: CreateOptionItemFormData) => {
    const normalizedPayload = {
      optionListId: optionListId.trim(),
      labelEn: data.labelEn.trim(),
      labelNe: data.labelNe.trim(),
    };

    setApiError(null);

    try {
      await createOptionItemAsync(normalizedPayload);

      reset({
        labelEn: "",
        labelNe: "",
      });

      await onSave();
      onClose();
    } catch (error) {
      const apiErrorObj = error as ApiError;
      setApiError(apiErrorObj.message || "Failed to create option item.");
      console.error("Error creating option item:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title={`Create New ${optionListName ?? "Survey Option Item"}`}
      description={`Add a new item${optionListName ? ` under ${optionListName}` : ""}.`}
      onClose={handleClose}
      disableClose={isSubmitting}
    >
      <form onSubmit={handleSubmit(handleSave)} className="mt-6 space-y-6">
        <FormField label="Name (EN)" required>
          <Input
            {...register("labelEn")}
            placeholder="Enter English item name"
          />
        </FormField>

        <FormField label="Name (NE)" required>
          <Input
            {...register("labelNe")}
            placeholder="Nepali item name"
          />
        </FormField>

        {!optionListId ? (
          <p className="rounded-[var(--mis-field-radius)] border border-[var(--mis-color-error-100)] bg-[var(--mis-color-error-50)] px-4 py-3 text-sm font-semibold text-[var(--mis-color-error-600)]">
            Select a survey option before creating an item.
          </p>
        ) : null}

        {apiError ? (
          <p className="rounded-[var(--mis-field-radius)] border border-[var(--mis-color-error-100)] bg-[var(--mis-color-error-50)] px-4 py-3 text-sm font-semibold text-[var(--mis-color-error-600)]">
            {apiError}
          </p>
        ) : null}

        <div className="flex flex-wrap justify-end gap-3 border-t border-[var(--mis-color-ink-200)] pt-5">
          <Button
            type="button"
            variant="ghost"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            <Plus className="h-4 w-4" />
            {isSubmitting ? "Creating..." : "Create Option Item"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
