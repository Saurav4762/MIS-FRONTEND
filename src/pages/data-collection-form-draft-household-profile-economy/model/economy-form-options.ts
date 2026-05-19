import type { EconomyOption, ExpenditureField } from "./types";

export const CLASSIFICATION_OPTIONS: EconomyOption[] = [
  { label: "Rich (धनी)", value: "rich" },
  { label: "Medium (मध्यम)", value: "medium" },
  { label: "Poor (गरिब)", value: "poor" },
  { label: "Very Poor (अति गरिब)", value: "very_poor" },
];

export const INCOME_SOURCE_OPTIONS: EconomyOption[] = [
  { label: "Agriculture (कृषि)", value: "agriculture" },
  { label: "Employment (रोजगारी)", value: "employment" },
  { label: "Business (व्यापार)", value: "business" },
  { label: "Remittance (रेमिट्यान्स)", value: "remittance" },
];

export const LOAN_SOURCE_OPTIONS: EconomyOption[] = [
  { label: "Bank (बैंक)", value: "bank" },
  { label: "Cooperative (सहकारी)", value: "cooperative" },
  { label: "Personal (व्यक्तिगत)", value: "personal" },
];

export const EXPENDITURE_FIELDS: ExpenditureField[] = [
  { key: "food", label: "Food Items", labelNe: "खाद्यान्न सामग्री" },
  { key: "education", label: "Education", labelNe: "शिक्षा" },
  { key: "health", label: "Health", labelNe: "स्वास्थ्य" },
  { key: "clothing", label: "Clothing/Festival", labelNe: "लत्ताकपडा/चाडपर्व" },
  {
    key: "agriculture",
    label: "Agriculture/Livestock",
    labelNe: "कृषि र पशुपालन",
  },
  { key: "others", label: "Others", labelNe: "अन्य" },
];

export const createInitialExpenditure = () =>
  EXPENDITURE_FIELDS.reduce<Record<string, string>>((values, field) => {
    values[field.key] = "";
    return values;
  }, {});
