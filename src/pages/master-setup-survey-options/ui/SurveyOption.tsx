import { Landmark, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import type { OptionList } from "../model";
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
    <aside className="w-full overflow-hidden rounded-xl border border-[#252D40] bg-[#171D2A] shadow-sm">
      <div className="flex items-center justify-between border-b border-[#252D3F] px-6 py-3">
        <p className="text-xs font-bold uppercase tracking-widest text-[#E7EBF6]">
          Master Categories
        </p>
        <span className="h-7 w-7 rounded-full bg-[#212A3D]" />
      </div>

      <div className="space-y-1 px-4 py-3">
        {optionList?.map((item) => {
          const Icon = Landmark;
          const active = selectedId === item.id;

          return (
            <div
              key={item.id}
              className={active
                ? "flex items-stretch gap-2 rounded-xl bg-[#222C42] px-2 py-2 text-[#EAF0FF]"
                : "flex items-stretch gap-2 rounded-xl px-2 py-2 text-[#BAC1D2] transition-colors hover:bg-[#1C2434]"
              }
            >
              <button
                type="button"
                onClick={() => {
                  onSelect?.(item.id);
                }}
                className={
                  active
                    ? "flex min-w-0 flex-1 items-center gap-3 rounded-xl px-4 py-3 text-left text-[#EAF0FF]"
                    : "flex min-w-0 flex-1 items-center gap-3 rounded-xl px-4 py-3 text-left text-[#BAC1D2] transition-colors hover:bg-[#1C2434]"
                }
              >
                <span
                  className={
                    active
                      ? "grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#3051EF]/20 text-[#6E89FF]"
                      : "grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#20283A] text-[#8D95AA]"
                  }
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1 truncate text-base font-medium">{item.labelEn}</span>
              </button>

              <div className="flex items-center gap-1 pr-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedOptionList(item);
                    setIsEditOpen(true);
                  }}
                  className="rounded-md p-2 text-[#94A6C1] transition-colors hover:bg-[#EDF3FE] hover:text-[#2E67D8]"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedOptionList(item);
                    setIsDeleteOpen(true);
                  }}
                  className="rounded-md p-2 text-[#94A6C1] transition-colors hover:bg-[#FDEEEF] hover:text-[#D44D62]"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="border-t border-[#252D3F] px-4 py-3">
        <button
          type="button"
          onClick={() => {
            onAddClick?.();
          }}
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#39445E] bg-[#1A2131] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#A9B3C8] transition-colors hover:border-[#4B62FF] hover:text-white"
        >
          <Plus className="h-4 w-4" />
          Add New Category
        </button>
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
