import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useCreateOptionList } from "../api";
import type { ApiError } from "@shared/api";
import { createOptionListSchema } from "../model/types";

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

  const [optionItemData, setOptionItemData] = useState({
    optionListId: optionListId ?? "",
    labelEn: "",
    labelNe: "",
    description: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) {
    return null;
  }

  const handleSave = async () => {
    setIsSaving(true);
    setErrorMessage(null);

    const payload = {
      ...optionItemData,
      optionListId: optionListId?.trim() ?? optionItemData.optionListId.trim(),
      labelEn: optionItemData.labelEn.trim(),
      labelNe: optionItemData.labelNe.trim(),
      description: optionItemData.description.trim(),
    };

    try {
      const result = createOptionListSchema.safeParse(payload);
      if (!result.success) {
        const firstIssue = result.error.issues[0]?.message;
        setErrorMessage(firstIssue ?? "Please fix the highlighted form fields.");
        console.error("Validation error:", result.error.issues);
        return;
      }

      await createOptionList(payload);
      setOptionItemData({
        optionListId: optionListId ?? "",
        labelEn: "",
        labelNe: "",
        description: "",
      });
      setErrorMessage(null);
      onClose();
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(apiError.message || "Failed to create survey option.");
      console.error("Error creating option list:", error);
    } finally {
      setIsSaving(false);
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
              Create New Survey Option
            </h3>
            <p className="mt-2 text-sm text-[#8D97AC]">
              Add a new master survey option for the survey directory sidebar.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setErrorMessage(null);
              onClose();
            }}
            className="rounded-xl p-2 text-[#96A0B4] transition-colors hover:bg-[#21293A] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 space-y-5">
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-[#DCE2ED]">
              Name (EN)
            </span>
            <input
              value={optionItemData.labelEn}
              onChange={(event) => {
                setErrorMessage(null);
                setOptionItemData({
                  ...optionItemData,
                  labelEn: event.target.value,
                });
              }}
              placeholder="Enter English category name"
              className="h-13 w-full rounded-2xl border border-[#2A3348] bg-[#1D2434] px-4 text-sm text-[#E4EAF6] outline-none transition-colors placeholder:text-[#70798D] focus:border-[#4562F3]"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-[#DCE2ED]">
              Name (NE)
            </span>
            <input
              value={optionItemData.labelNe}
              onChange={(event) => {
                setErrorMessage(null);
                setOptionItemData({
                  ...optionItemData,
                  labelNe: event.target.value,
                });
              }}
              placeholder="नेपाली नाम प्रविष्ट गर्नुहोस्"
              className="h-13 w-full rounded-2xl border border-[#2A3348] bg-[#1D2434] px-4 text-sm text-[#E4EAF6] outline-none transition-colors placeholder:text-[#70798D] focus:border-[#4562F3]"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-[#DCE2ED]">
              Description
            </span>
            <textarea
              value={optionItemData.description}
              onChange={(event) => {
                setErrorMessage(null);
                setOptionItemData({
                  ...optionItemData,
                  description: event.target.value,
                });
              }}
              placeholder="Optional description for this category"
              rows={4}
              className="w-full rounded-2xl border border-[#2A3348] bg-[#1D2434] px-4 py-3 text-sm text-[#E4EAF6] outline-none transition-colors placeholder:text-[#70798D] focus:border-[#4562F3]"
            />
          </label>

          {errorMessage && (
            <p className="rounded-2xl border border-[#513244] bg-[#2A1B2A] px-4 py-3 text-sm font-medium text-[#F1A2B4]">
              {errorMessage}
            </p>
          )}
        </div>

        <div className="mt-7 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-[#2A3348] px-4 py-3 text-sm font-semibold text-[#AEB7CA] transition-colors hover:bg-[#20283A]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#4562F3] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5470FF] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Plus className="h-4 w-4" />
            {isSaving ? "Creating..." : "Create Survey Option"}
          </button>
        </div>
      </div>
    </div>
  );
}
