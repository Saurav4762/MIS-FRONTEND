import { Pencil, Plus, Trash2 } from "lucide-react";
import { useOptionItemsByOptionList } from "../api";
import type { OptionItem, OptionList } from "../model";
import { useState } from "react";
import { SurveyOptionItemCreateModal } from "./SurveyOptionItemCreateModel";
import { SurveyOptionItemEditModal } from "./SurveyOptionItemEditModel";
import { SurveyOptionItemDeleteModal } from "./SurveyOptionItemDeleteModel";

type SurveyOptionsItemsProps = {
  selectedOptionList?: OptionList;
};

export function SurveyOptionItems({
  selectedOptionList,
}: SurveyOptionsItemsProps) {
  const optionListId = selectedOptionList?.id ?? "";
  const optionListName = selectedOptionList?.labelEn ?? "";
  const {
    data: optionRows = [],
    isError,
    isLoading,
  } = useOptionItemsByOptionList(optionListId, optionListName);

  const [isCreateModelOpen, setIsCreateModelOpen] = useState(false);
  const [isEditModelOpen, setIsEditModelOpen] = useState(false);
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
  const [selectedOptionItem, setSelectedOptionItem] =
    useState<OptionItem>();

  return (
    <section className="w-full overflow-hidden rounded-xl border border-[#242C3F] bg-[#171D2A] shadow-[0_24px_70px_rgba(2,8,22,0.28)]">
      <header className="flex items-start justify-between border-b border-[#242C3F] px-6 py-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-[#E8ECF8]">
            Data Registry: {selectedOptionList?.labelEn ?? "Select Category"}
          </h2>
          <p className="mt-1 text-sm text-[#8D97AC]">
            {selectedOptionList?.description ??
              "Select a category to view its registered option items"}
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-[#4562F3] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#5470FF]"
          onClick={() => setIsCreateModelOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Add Type
        </button>
      </header>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-[#242C3F] bg-[#1D2434] text-left text-xs font-bold uppercase tracking-wide text-[#8D97AC]">
              <th className="w-16 whitespace-nowrap px-6 py-3">#</th>
              <th className="px-6 py-3">Name (EN)</th>
              <th className="px-6 py-3">Name (NE)</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#242C3F]">
            {isLoading && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-8 text-center text-sm font-medium text-[#8D97AC]"
                >
                  Loading option items...
                </td>
              </tr>
            )}
            {isError && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-8 text-center text-sm font-medium text-[#F1A2B4]"
                >
                  Unable to load option items.
                </td>
              </tr>
            )}
            {!isLoading && !isError && optionRows.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-8 text-center text-sm font-medium text-[#8D97AC]"
                >
                  No option items found.
                </td>
              </tr>
            )}
            {!isLoading &&
              !isError &&
              optionRows.map((item, index) => (
                <tr
                  key={item.id}
                  className="text-[#E8ECF8] transition-colors hover:bg-[#1D2434]"
                >
                  <td className="px-6 py-4 text-sm font-medium text-[#8D97AC]">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="px-6 py-4 text-base font-semibold text-[#E8ECF8]">
                    {item.labelEn}
                  </td>
                  <td className="px-6 py-4 text-base font-medium text-[#BAC1D2]">
                    {item.labelNe}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-3 text-[#94A6C1]">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedOptionItem(item);
                          setIsEditModelOpen(true);
                        }}
                        className="rounded-md p-1.5 transition-colors hover:bg-[#21293A] hover:text-[#6E89FF]"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedOptionItem(item);
                          setIsDeleteModelOpen(true);
                        }}
                        className="rounded-md p-1.5 transition-colors hover:bg-[#2A1B2A] hover:text-[#F1A2B4]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <footer className="flex items-center justify-between border-t border-[#242C3F] bg-[#171D2A] px-6 py-3">
        <p className="text-sm font-medium text-[#8D97AC]">
          Showing {optionRows.length}{" "}
          {optionRows.length === 1 ? "entry" : "entries"}
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-grid h-8 min-w-9 place-items-center rounded-md bg-[#4562F3] px-3 text-sm font-semibold text-white"
          >
            1
          </button>
          <button
            type="button"
            className="inline-grid h-8 min-w-9 place-items-center rounded-md border border-[#2A3348] bg-[#1D2434] px-3 text-sm font-semibold text-[#8D97AC]"
          >
            2
          </button>
        </div>
      </footer>
      <SurveyOptionItemCreateModal
        key={
          isCreateModelOpen
            ? "survey-option-item-create-model-open"
            : "survey-option-item-create-model-close"
        }
        isOpen={isCreateModelOpen}
        onClose={() => setIsCreateModelOpen(false)}
        onSave={() => setIsCreateModelOpen(false)}
        optionListId={selectedOptionList?.id ?? ""}
        optionListName={selectedOptionList?.labelEn ?? ""}
      />
      <SurveyOptionItemEditModal
        key={
          isEditModelOpen
            ? `survey-option-item-edit-model-open-${selectedOptionItem?.id ?? "none"}`
            : "survey-option-item-edit-model-close"
        }
        isOpen={isEditModelOpen}
        onClose={() => {
          setIsEditModelOpen(false);
          setSelectedOptionItem(undefined);
        }}
        onSave={() => {
          setIsEditModelOpen(false);
          setSelectedOptionItem(undefined);
        }}
        optionItem={selectedOptionItem}
        optionListName={selectedOptionList?.labelEn ?? ""}
      />
      <SurveyOptionItemDeleteModal
        key={
          isDeleteModelOpen
            ? `survey-option-item-delete-model-open-${selectedOptionItem?.id ?? "none"}`
            : "survey-option-item-delete-model-close"
        }
        isOpen={isDeleteModelOpen}
        onClose={() => {
          setIsDeleteModelOpen(false);
          setSelectedOptionItem(undefined);
        }}
        onSave={() => {
          setIsDeleteModelOpen(false);
          setSelectedOptionItem(undefined);
        }}
        optionItem={selectedOptionItem}
        optionListName={selectedOptionList?.labelEn ?? ""}
      />
    </section>
  );
}
