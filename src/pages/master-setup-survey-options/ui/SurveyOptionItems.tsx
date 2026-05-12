import { Pencil, Plus, Trash2 } from "lucide-react";
import { useOptionItemsByOptionList } from "../api";
import type { OptionItem, OptionList } from "../model";
import { useState } from "react";
import { Button } from "@shared/ui/Button";
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
  const [selectedOptionItem, setSelectedOptionItem] = useState<OptionItem>();

  return (
    <section className="w-full overflow-hidden rounded-(--mis-card-radius) border border-(--mis-color-ink-200) bg-(--mis-color-white) shadow-md">
      <header className="flex items-start justify-between border-b border-(--mis-color-ink-200) px-6 py-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-(--mis-color-ink-900)">
            Data Registry: {selectedOptionList?.labelEn ?? "Select Category"}
          </h2>
          <p className="mt-1 text-sm text-(--mis-color-ink-600)">
            {selectedOptionList?.description ??
              "Select a category to view its registered option items"}
          </p>
        </div>

        <Button type="button" variant="primary" size="sm" onClick={() => setIsCreateModelOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Type
        </Button>
      </header>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-(--mis-color-ink-200) bg-(--mis-color-ink-50) text-left text-xs font-bold uppercase tracking-wide text-(--mis-color-ink-500)">
              <th className="w-16 whitespace-nowrap px-6 py-3">#</th>
              <th className="px-6 py-3">Name (EN)</th>
              <th className="px-6 py-3">Name (NE)</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-(--mis-color-ink-200)">
            {isLoading && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-8 text-center text-sm font-medium text-(--mis-color-ink-600)"
                >
                  Loading option items...
                </td>
              </tr>
            )}
            {isError && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-8 text-center text-sm font-semibold text-(--mis-color-error-600)"
                >
                  Unable to load option items.
                </td>
              </tr>
            )}
            {!isLoading && !isError && optionRows.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-8 text-center text-sm font-medium text-(--mis-color-ink-600)"
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
                  className="text-(--mis-color-ink-900) transition-colors hover:bg-(--mis-color-ink-50)"
                >
                  <td className="px-6 py-4 text-sm font-medium text-(--mis-color-ink-500)">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="px-6 py-4 text-base font-semibold text-(--mis-color-ink-900)">
                    {item.labelEn}
                  </td>
                  <td className="px-6 py-4 text-base font-medium text-(--mis-color-ink-700)">
                    {item.labelNe}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-3 text-(--mis-color-ink-500)">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedOptionItem(item);
                          setIsEditModelOpen(true);
                        }}
                        className="rounded-md p-1.5 transition-colors hover:bg-(--mis-color-pri-50) hover:text-(--mis-color-pri-700)"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedOptionItem(item);
                          setIsDeleteModelOpen(true);
                        }}
                        className="rounded-md p-1.5 transition-colors hover:bg-(--mis-color-error-50) hover:text-(--mis-color-error-600)"
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

      <footer className="flex items-center justify-between border-t border-(--mis-color-ink-200) bg-(--mis-color-white) px-6 py-3">
        <p className="text-sm font-medium text-(--mis-color-ink-600)">
          Showing {optionRows.length}{" "}
          {optionRows.length === 1 ? "entry" : "entries"}
        </p>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            className="inline-grid min-w-9 place-items-center"
          >
            1
          </Button>
          <Button
            type="button"
            size="sm"
            variant="secondary"
            className="inline-grid min-w-9 place-items-center"
          >
            2
          </Button>
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
