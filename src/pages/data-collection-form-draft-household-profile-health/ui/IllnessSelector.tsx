import { ListChecks } from "lucide-react";
import cn from "@shared/lib";

type IllnessOption = {
  id: string;
  label: string;
  labelNe: string;
};

type IllnessSelectorProps = {
  options: IllnessOption[];
  selectedIds: string[];
  onToggle: (id: string) => void;
};

export default function IllnessSelector({
  options,
  selectedIds,
  onToggle,
}: IllnessSelectorProps) {
  return (
    <div className="mt-4 rounded-xl border border-error-100 bg-error-50/50 p-4 md:p-6">
      <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-ink-500">
        <ListChecks className="h-4 w-4 text-pri-600" />
        <span>Select Illness Types</span>
        <span className="font-normal normal-case text-ink-500">
          (रोगका प्रकारहरू)
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => {
          const checked = selectedIds.includes(option.id);

          return (
            <label
              key={option.id}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-lg border bg-white p-3 transition-all hover:border-pri-500",
                checked ? "border-pri-500 shadow-focus" : "border-ink-200",
              )}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(option.id)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink-300 text-pri-600 focus:ring-pri-500"
              />
              <span className="flex flex-col gap-0.5">
                <span className="text-sm font-medium leading-none text-ink-900">
                  {option.label}
                </span>
                <span className="text-[10px] italic leading-none text-ink-500">
                  {option.labelNe}
                </span>
              </span>
            </label>
          );
        })}
      </div>

      {selectedIds.length === 0 && (
        <p className="mt-4 text-[11px] font-medium italic text-error-600">
          Please select at least one illness type (कृपया कम्तीमा एउटा रोगको
          प्रकार चयन गर्नुहोस्)
        </p>
      )}
    </div>
  );
}
