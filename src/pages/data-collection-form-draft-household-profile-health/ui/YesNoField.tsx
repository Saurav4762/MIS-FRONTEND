import cn from "@shared/lib";
import { Button } from "@shared/ui/Button";
import { FormField } from "@shared/ui/Input";

export type YesNoValue = "yes" | "no";

type YesNoFieldProps = {
  label: string;
  labelSuffix: string;
  value: YesNoValue;
  onChange: (value: YesNoValue) => void;
};

export default function YesNoField({
  label,
  labelSuffix,
  value,
  onChange,
}: YesNoFieldProps) {
  return (
    <FormField
      as="fieldset"
      label={label}
      labelSuffix={`(${labelSuffix})`}
      className="space-y-3"
      labelClassName="flex-col items-start gap-1 text-[10px] uppercase tracking-tight text-ink-500 md:min-h-10"
    >
      <div className="inline-grid w-full max-w-60 grid-cols-2 rounded-full border border-ink-200 bg-ink-50 p-1">
        {(["yes", "no"] as const).map((option) => (
          <Button
            key={option}
            variant="ghost"
            size="sm"
            isActive={value === option}
            aria-pressed={value === option}
            onClick={() => onChange(option)}
            className={cn(
              "rounded-full px-6 py-2 text-xs uppercase tracking-wider",
              value === option
                ? "font-bold"
                : "font-medium text-ink-500 hover:text-ink-900",
            )}
          >
            {option}
          </Button>
        ))}
      </div>
    </FormField>
  );
}
