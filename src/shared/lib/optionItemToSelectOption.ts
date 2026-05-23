import type { OptionItem } from "@entities/option";
import type { SelectOption } from "@shared/ui/Input/Select";

export default function optionItemToSelectOption(
  optionItem: OptionItem,
): SelectOption {
  return {
    labelEn: optionItem.labelEn,
    labelNe: optionItem.labelNe,
    value: optionItem.id,
  };
}
