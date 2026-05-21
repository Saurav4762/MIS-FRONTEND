import type { ToggleOptions } from "@shared/model/toggle";
import { FormField } from "./FormField";
import cn from "@shared/lib/cn";
import { Input2 } from "./Input2";

type ToggleFieldProps = {
  label: string;
  labelSuffix?: string;
  value: string | number | undefined;
  onChange: (value: string) => void;
  options: ToggleOptions;
  name: string;
};

export default function ToggleField({
  label,
  labelSuffix,
  value,
  onChange,
  options,
  name,
}: ToggleFieldProps) {
  return (
    <FormField
      as="fieldset"
      label={label}
      labelSuffix={`(${labelSuffix})`}
      className="space-y-3"
      labelClassName="flex-col items-start gap-1 text-[10px] uppercase tracking-tight text-ink-500 md:min-h-9"
    >
      <div
        role="radiogroup"
        className="inline-grid w-full max-w-60 grid-cols-2 rounded-full border border-ink-200 bg-ink-50 p-1"
      >
        {options.map((option) => (
          <label
            key={option.id}
            className={cn(
              "cursor-pointer rounded-full px-6 py-2 text-center text-xs uppercase tracking-wider transition-colors",
              value === option.value
                ? "bg-pri-400 font-bold text-ink-900 shadow-sm"
                : "font-medium text-ink-500 hover:text-ink-900",
            )}
          >
            <Input2
              type="radio"
              name={name}
              id={option.id}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              block
            />

            {option.labelEn}
          </label>
        ))}
      </div>
    </FormField>
  );
}
