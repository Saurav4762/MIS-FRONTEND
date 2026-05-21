export type ToggleOption = {
  id: string;
  labelEn: string;
  labelNe: string;
  value: string;
  default?: boolean;
};

export type ToggleOptions = readonly ToggleOption[];
