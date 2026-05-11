import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useUpdateOptionList } from "../api";
import type { OptionList } from "../model";
import type { ApiError } from "@shared/api";
import { Button } from "@shared/ui/Button";
import { FormField, Input, Textarea } from "@shared/ui/Input";
import { Modal } from "@shared/ui/Modal";
import { updateOptionListSchema, type UpdateOptionListPayload } from "../model/types";

interface SurveyOptionEditModalProps {
  isOpen: boolean;
  optionList?: OptionList;
  onClose: () => void;
  onSave: (item: OptionList) => void | Promise<void>;
}

type UpdateOptionListFormData = z.infer<typeof updateOptionListSchema>;

export function SurveyOptionEditModal({
  isOpen,
  optionList,
  onClose,
  onSave,
}: SurveyOptionEditModalProps) {
  const [apiError, setApiError] = useState<string | null>(null);
  const { mutateAsync: updateOptionListAsync } = useUpdateOptionList();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<UpdateOptionListFormData>({
    resolver: zodResolver(updateOptionListSchema),
    defaultValues: {
      labelEn: optionList?.labelEn ?? "",
      labelNe: optionList?.labelNe ?? "",
      description: optionList?.description ?? "",
    },
    values: {
      labelEn: optionList?.labelEn ?? "",
      labelNe: optionList?.labelNe ?? "",
      description: optionList?.description ?? "",
    },
  });

  const normalizedId = optionList?.id?.trim() ?? "";

  const handleClose = () => {
    if (isSubmitting) {
      return;
    }

    setApiError(null);
    onClose();
  };

  const handleSave = async (data: UpdateOptionListPayload) => {
    if (!normalizedId) {
      return;
    }

    const payload = {
      labelEn: (data.labelEn ?? "").trim(),
      labelNe: (data.labelNe ?? "").trim(),
      description: (data.description ?? "").trim(),
    };

    setApiError(null);

    try {
      const updatedItem = await updateOptionListAsync({
        id: normalizedId,
        data: payload,
      });

      await onSave(updatedItem);
      onClose();
    } catch (error) {
      const apiErrorObj = error as ApiError;
      setApiError(apiErrorObj.message || "Failed to update survey option.");
      console.error("Error updating option list:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Edit Survey Option"
      description="Update the selected survey category."
      onClose={handleClose}
      disableClose={isSubmitting}
    >
      <form onSubmit={handleSubmit(handleSave)} className="mt-6 space-y-6">
        <FormField
          label="Name (EN)"
          required
          errorText={errors.labelEn?.message}
        >
          <Input
            {...register("labelEn")}
            placeholder="Enter English category name"
            hasError={Boolean(errors.labelEn)}
          />
        </FormField>

        <FormField
          label="Name (NE)"
          required
          errorText={errors.labelNe?.message}
        >
          <Input
            {...register("labelNe")}
            placeholder="Nepali category name"
            hasError={Boolean(errors.labelNe)}
          />
        </FormField>

        <FormField
          label="Description"
          optional
          errorText={errors.description?.message}
        >
          <Textarea
            {...register("description")}
            placeholder="Optional description for this category"
            rows={4}
            hasError={Boolean(errors.description)}
          />
        </FormField>

        {apiError ? (
          <p className="rounded-[--mis-field-radius] border border-[--mis-color-error-100] bg-[--mis-color-error-50] px-4 py-3 text-sm font-semibold text-[--mis-color-error-600]">
            {apiError}
          </p>
        ) : null}

        <div className="flex flex-wrap justify-end gap-3 border-t border-[--mis-color-ink-200] pt-5">
          <Button
            type="button"
            variant="ghost"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={normalizedId.length === 0 || isSubmitting}>
            <Pencil className="h-4 w-4" />
            {isSubmitting ? "Updating..." : "Update Survey Option"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
