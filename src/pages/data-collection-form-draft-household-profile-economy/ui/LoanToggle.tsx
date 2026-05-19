import cn from "@shared/lib";
import { Button } from "@shared/ui/Button";
import { FormField } from "@shared/ui/Input";
import type { LoanToggleProps } from "../model";

export default function LoanToggle({ value, onChange }: LoanToggleProps) {
  return (
    <FormField
      as="fieldset"
      label="Financial Loan?"
      labelSuffix="(वित्तीय ऋण छ?)"
      className="space-y-3"
    >
      <div className="inline-grid grid-cols-2 rounded-full border border-ink-200 bg-ink-100 p-1">
        {(["no", "yes"] as const).map((option) => (
          <Button
            key={option}
            variant="ghost"
            size="sm"
            isActive={value === option}
            aria-pressed={value === option}
            onClick={() => onChange(option)}
            className={cn(
              "rounded-full px-6 py-3 text-xs uppercase tracking-wider",
              value === option ? "font-bold" : "font-bold text-ink-400",
            )}
          >
            {option}
          </Button>
        ))}
      </div>
    </FormField>
  );
}
