import { useState } from "react";
import { SurveyOptionCreateModal } from "./SurveyOptionCreateModel";
import { SurveyOptionItems } from "./SurveyOptionItems";
import { SurveyOption } from "./SurveyOption";
import { useOptionList, type OptionList } from "@entities/option";

export function SurveyOptionPage() {
  const { data: optionList } = useOptionList();

  const [selectedOptionList, setSelectedOptionList] = useState<
    OptionList | undefined
  >(optionList?.[0]);

  const [isCategoryCreateOpen, setIsCategoryCreateOpen] = useState(false);

  return (
    <section className="w-full space-y-5 h-full flex flex-col pb-6 xl:pr-6 max-h-full overflow-hidden">
      <header className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-[--mis-color-ink-900]">
          Survey Directory
        </h1>
        <p className="text-sm font-medium text-[--mis-color-ink-600]">
          Manage global master data and survey category registrations.
        </p>
      </header>

      <div className="flex min-h-0 items-start gap-4 flex-1 xl:gap-5">
        <div className="min-w-0 h-full flex flex-col max-w-90 w-full">
          <SurveyOption
            optionList={optionList}
            selectedId={selectedOptionList?.id}
            onSelect={(id) =>
              setSelectedOptionList(optionList?.find((item) => item.id === id))
            }
            onAddClick={() => setIsCategoryCreateOpen(true)}
          />

          <SurveyOptionCreateModal
            key={
              isCategoryCreateOpen
                ? "survey-option-create-open"
                : "survey-option-create-closed"
            }
            isOpen={isCategoryCreateOpen}
            onClose={() => setIsCategoryCreateOpen(false)}
          />
        </div>

        <div className="min-w-0 flex-1">
          <SurveyOptionItems selectedOptionList={selectedOptionList} />
        </div>
      </div>
    </section>
  );
}
