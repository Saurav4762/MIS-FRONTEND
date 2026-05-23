import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateOptionList } from "../api";
import type { ApiError } from "@shared/api";
import { Button } from "@shared/ui/Button";
import { FormField, Input, Textarea } from "@shared/ui/Input";
import { Modal } from "@shared/ui/Modal";
import {
  createOptionListSchema,
  type CreateOptionListPayload,
} from "../model/types";

interface SurveyOptionCreateModalProps {
  optionListId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function SurveyOptionCreateModal({
  optionListId,
  isOpen,
  onClose,
}: SurveyOptionCreateModalProps) {
  const { mutateAsync: createOptionList } = useCreateOptionList();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<CreateOptionListPayload>({
    resolver: zodResolver(createOptionListSchema),
    defaultValues: {
      labelEn: "",
      labelNe: "",
      description: "",
    },
  });

  const handleSave = async (data: CreateOptionListPayload) => {
    setApiError(null);

    const payload = {
      optionListId: optionListId ?? "",
      ...data,
      labelEn: data.labelEn.trim(),
      labelNe: data.labelNe.trim(),
      description: (data.description ?? "").trim(),
    };

    try {
      await createOptionList(payload);
      reset({
        labelEn: "",
        labelNe: "",
        description: "",
      });
      setApiError(null);
      onClose();
    } catch (error) {
      const apiErrorObj = error as ApiError;
      setApiError(apiErrorObj.message || "Failed to create survey option.");
      console.error("Error creating option list:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      eyebrow="Survey Option"
      title="Create New Survey Option"
      description="Add a new master survey option for the survey directory sidebar."
      onClose={() => {
        setApiError(null);
        onClose();
      }}
    >
      <form onSubmit={handleSubmit(handleSave)} className="mt-6 ">
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

        <FormField label="Description" errorText={errors.description?.message}>
          <Textarea
            {...register("description")}
            required
            placeholder="Optional description for this category"
            rows={4}
            hasError={Boolean(errors.description)}
          />
        </FormField>

        <div className="min-h-7">
          {apiError ? (
            <p className="rounded-field border border-error-100 bg-error-50 px-4 py-3 text-sm min-h-[1.3rem] font-semibold text-error-600">
              {apiError}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap justify-end gap-3 border-t border-[--mis-color-ink-200] pt-5">
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setApiError(null);
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            <Plus className="h-4 w-4" />
            {isSubmitting ? "Creating..." : "Create Survey Option"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
