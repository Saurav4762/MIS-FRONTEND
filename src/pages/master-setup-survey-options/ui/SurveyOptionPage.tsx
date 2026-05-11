import { useState } from "react";
import { SurveyOptionCreateModal } from "./SurveyOptionCreateModel";
import { SurveyOptionItems } from "./SurveyOptionItems";
import { SurveyOption } from "./SurveyOption";
import { useOptionList } from "../api";

export function SurveyOptionPage() {
  const { data: optionList } = useOptionList();

  const [selectedId, setSelectedId] = useState<string | undefined>(
    optionList?.[0]?.id,
  );
  const effectiveSelectedId = selectedId || optionList?.[0]?.id;
  const selectedOptionList = optionList?.find((item) => item.id === effectiveSelectedId);

  const [isCategoryCreateOpen, setIsCategoryCreateOpen] = useState(false);

  return (
    <section className="w-full space-y-5 pb-6 xl:pr-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#E7EBF6]">
          Survey Directory
        </h1>
        <p className="text-sm font-medium text-[#8F98AD]">
          Manage global master data and survey category registrations.
        </p>
      </header>

      <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-[340px_minmax(0,1fr)] xl:gap-5">
        <div className="min-w-0">
          <SurveyOption
            optionList={optionList}
            selectedId={effectiveSelectedId}
            onSelect={setSelectedId}
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

        <div className="min-w-0">
          <SurveyOptionItems selectedOptionList={selectedOptionList} />
        </div>
      </div>
    </section>
  );
}
