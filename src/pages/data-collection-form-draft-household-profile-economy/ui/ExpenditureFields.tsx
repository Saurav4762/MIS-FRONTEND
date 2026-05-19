import { FormField, Input } from "@shared/ui/Input";
import type { ExpenditureFieldsProps } from "../model";

export default function ExpenditureFields({
  fields,
  values,
  onChange,
}: ExpenditureFieldsProps) {
  return (
    <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
      {fields.map((field) => (
        <FormField
          key={field.key}
          as="div"
          label={field.label}
          labelSuffix={`(${field.labelNe})`}
          className="space-y-2"
        >
          <Input
            min={0}
            type="number"
            inputMode="decimal"
            placeholder="0.00"
            value={values[field.key] ?? ""}
            onChange={(event) => onChange(field.key, event.target.value)}
            className="h-12 border bg-ink-50 px-4 text-sm placeholder:text-ink-300"
          />
        </FormField>
      ))}
    </div>
  );
}
