import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import type { OptionList } from "../model";
import { Button } from "@shared/ui/Button";
import { SurveyOptionEditModal } from "./SurveyOptionEditModel";
import { SurveyOptionDeleteModal } from "./SurveyOptionDeleteModel";

export function SurveyOption({
  optionList = [],
  selectedId,
  onSelect,
  onAddClick,
  onDeleted,
}: {
  optionList?: OptionList[];
  selectedId?: string;
  onSelect?: (id: string | undefined) => void;
  onAddClick?: () => void;
  onDeleted?: (deletedId: string) => void;
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedOptionList, setSelectedOptionList] = useState<OptionList>();

  const handleDeleteSuccess = async (deletedId: string) => {
    onDeleted?.(deletedId);

    const remainingOption = optionList.find((item) => item.id !== deletedId);
    onSelect?.(remainingOption?.id);
  };

  return (
    <aside className="w-full overflow-hidden rounded-card border border-ink-200 bg-(--mis-color-white) shadow-sm">
      <div className="flex items-center justify-between border-b border-(--mis-color-ink-200) px-4 py-4">
        <p className="text-normal font-bold uppercase tracking-widest text-(--mis-color-ink-900) text-center w-full">
          Master Categories
        </p>
      </div>

      <div className="space-y-1 px-4 py-3">
        {optionList?.map((item) => {
          // const Icon = Landmark;
          const active = selectedId === item.id;

          return (
            <div
              key={item.id}
              className={
                active
                  ? "flex items-stretch gap-2 rounded-(--mis-field-radius) bg-(--mis-color-pri-50) px-2 py-2 text-(--mis-color-pri-700)"
                  : "flex items-stretch gap-2 rounded-(--mis-field-radius) px-2 py-2 text-(--mis-color-ink-700) transition-colors hover:bg-(--mis-color-ink-50)"
              }
            >
              <button
                type="button"
                onClick={() => {
                  onSelect?.(item.id);
                }}
                className={
                  active
                    ? "flex min-w-0 flex-1 items-center gap-3 rounded-field-radius px-4 py-3 text-left text-pri-700 cursor-pointer"
                    : "flex min-w-0 flex-1 items-center gap-3 rounded-field-radius px-4 py-3 text-left text-ink-700 transition-colors hover:bg-ink-50 cursor-pointer"
                }
              >
                {/* <span
                  className={
                    active
                      ? "grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-(--mis-color-pri-100) text-(--mis-color-pri-700)"
                      : "grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-(--mis-color-ink-100) text-(--mis-color-ink-500)"
                  }
                >
                  <Icon className="h-4 w-4" />
                </span> */}
                <span className="min-w-0 flex-1 truncate text-base font-medium">
                  {item.labelEn}
                </span>
              </button>

              <div className="flex items-center gap-1 pr-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedOptionList(item);
                    setIsEditOpen(true);
                  }}
                  className="rounded-md p-2 text-(--mis-color-ink-500) transition-colors hover:bg-(--mis-color-pri-50) hover:text-(--mis-color-pri-700) cursor-pointer"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedOptionList(item);
                    setIsDeleteOpen(true);
                  }}
                  className="rounded-md p-2 text-ink-500 transition-colors hover:bg-error-50 hover:text-error-600 cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="border-t border-(--mis-color-ink-200) px-4 py-3">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="w-full border-2 border-dashed uppercase tracking-[0.08em]"
          onClick={() => {
            onAddClick?.();
          }}
        >
          <Plus className="h-4 w-4" />
          Add New Category
        </Button>
      </div>

      <SurveyOptionEditModal
        key={
          isEditOpen
            ? `survey-option-edit-open-${selectedOptionList?.id ?? "none"}`
            : "survey-option-edit-close"
        }
        isOpen={isEditOpen}
        optionList={selectedOptionList}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedOptionList(undefined);
        }}
        onSave={() => {
          setIsEditOpen(false);
          setSelectedOptionList(undefined);
        }}
      />

      <SurveyOptionDeleteModal
        key={
          isDeleteOpen
            ? `survey-option-delete-open-${selectedOptionList?.id ?? "none"}`
            : "survey-option-delete-close"
        }
        isOpen={isDeleteOpen}
        optionList={selectedOptionList}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedOptionList(undefined);
        }}
        onSave={handleDeleteSuccess}
      />
    </aside>
  );
}
