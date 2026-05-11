import { Pencil, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useUpdateOptionList } from "../api";
import type { OptionList } from "../model";
import type { ApiError } from "@shared/api";
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

  if (!isOpen) {
    return null;
  }
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
    <div className="fixed inset-0 z-50 bg-[#020816]/75 p-4 backdrop-blur-[2px] md:p-8">
      <div className="mx-auto mt-8 w-full max-w-xl rounded-[22px] border border-[#242C3F] bg-[#171D2A] p-6 shadow-[0_24px_70px_rgba(2,8,22,0.5)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7E879A]">
              Survey Directory
            </p>
            <h3 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-[#E8ECF8]">
              Edit Survey Option
            </h3>
            <p className="mt-2 text-sm text-[#8D97AC]">
              Update the selected survey category.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="rounded-xl p-2 text-[#96A0B4] transition-colors hover:bg-[#21293A] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleSave)} className="mt-6 space-y-5">
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-[#DCE2ED]">
              Name (EN)
            </span>
            <input
              {...register("labelEn")}
              placeholder="Enter English category name"
              className={`h-13 w-full rounded-2xl border bg-[#1D2434] px-4 text-sm text-[#E4EAF6] outline-none transition-colors placeholder:text-[#70798D] focus:border-[#4562F3] ${
                errors.labelEn
                  ? "border-[#8E3650] focus:border-[#F16A8B]"
                  : "border-[#2A3348]"
              }`}
            />
            {errors.labelEn?.message && (
              <p className="text-xs font-medium text-[#F1A2B4]">
                {errors.labelEn.message}
              </p>
            )}
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-[#DCE2ED]">
              Name (NE)
            </span>
            <input
              {...register("labelNe")}
              placeholder="नेपाली नाम प्रविष्ट गर्नुहोस्"
              className={`h-13 w-full rounded-2xl border bg-[#1D2434] px-4 text-sm text-[#E4EAF6] outline-none transition-colors placeholder:text-[#70798D] focus:border-[#4562F3] ${
                errors.labelNe
                  ? "border-[#8E3650] focus:border-[#F16A8B]"
                  : "border-[#2A3348]"
              }`}
            />
            {errors.labelNe?.message && (
              <p className="text-xs font-medium text-[#F1A2B4]">
                {errors.labelNe.message}
              </p>
            )}
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-[#DCE2ED]">
              Description
            </span>
            <textarea
              {...register("description")}
              placeholder="Optional description for this category"
              rows={4}
              className={`w-full rounded-2xl border bg-[#1D2434] px-4 py-3 text-sm text-[#E4EAF6] outline-none transition-colors placeholder:text-[#70798D] focus:border-[#4562F3] ${
                errors.description
                  ? "border-[#8E3650] focus:border-[#F16A8B]"
                  : "border-[#2A3348]"
              }`}
            />
            {errors.description?.message && (
              <p className="text-xs font-medium text-[#F1A2B4]">
                {errors.description.message}
              </p>
            )}
          </label>

          {apiError && (
            <p className="rounded-2xl border border-[#513244] bg-[#2A1B2A] px-4 py-3 text-sm font-medium text-[#F1A2B4]">
              {apiError}
            </p>
          )}

          <div className="mt-7 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="rounded-2xl border border-[#2A3348] px-4 py-3 text-sm font-semibold text-[#AEB7CA] transition-colors hover:bg-[#20283A] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={normalizedId.length === 0 || isSubmitting}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#4562F3] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5470FF] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Pencil className="h-4 w-4" />
              {isSubmitting ? "Updating..." : "Update Survey Option"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
