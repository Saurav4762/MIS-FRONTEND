import cn from "@shared/lib/cn";
import type { SelectOption } from "@shared/ui/Input/Select";
import { Check } from "lucide-react";

type Props = {
  options: SelectOption[];
  value: string[];
  onChange: (values: string[]) => void;
  error?: string | null;
};

export default function Transportation({ options, value, onChange, error }: Props) {
  const toggle = (v: string, checked: boolean) => {
    if (checked) onChange([...value, v]);
    else onChange(value.filter((x) => x !== v));
  };

  return (
    <div>
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {options.map((opt) => {
          const selected = value?.includes(opt.value);

          return (
            <label
              key={opt.value}
              className={cn(
                "relative cursor-pointer select-none",
                "block rounded-md border p-3 transition-shadow",
                selected
                  ? "border-pri-300 bg-white shadow-sm"
                  : "border-ink-200 bg-ink-50 hover:shadow-sm",
              )}
            >
              <input
                type="checkbox"
                className="sr-only peer"
                checked={selected}
                onChange={(e) => toggle(opt.value, e.target.checked)}
              />

              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-sm",
                    selected
                      ? "bg-pri-500 text-white"
                      : "bg-white border border-ink-200 text-ink-400",
                  )}
                >
                  <Check className="h-3 w-3" />
                </span>

                <div className="flex-1">
                  <div className="text-sm font-semibold text-ink-900">
                    {opt.labelEn}
                  </div>
                  {opt.labelNe && (
                    <div className="text-xs text-ink-400">{opt.labelNe}</div>
                  )}
                </div>
              </div>
            </label>
          );
        })}
      </div>

      {error ? (
        <div className="mt-3 text-sm text-(--mis-color-error-600)">{error}</div>
      ) : null}
    </div>
  );
}
