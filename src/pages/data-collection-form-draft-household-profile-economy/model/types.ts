import type { ReactNode } from "react";

export type YesNoValue = "yes" | "no";

export interface EconomyOption {
  label: string;
  value: string;
}

export interface ExpenditureField {
  key: string;
  label: string;
  labelNe: string;
}

export interface EconomyFormValues {
  classification: string;
  incomeSource: string;
  hasLoan: YesNoValue;
  loanSource: string;
  expenditure: Record<string, string>;
}

export interface EconomyFormSectionProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export interface LoanToggleProps {
  value: YesNoValue;
  onChange: (value: YesNoValue) => void;
}

export interface ExpenditureFieldsProps {
  fields: ExpenditureField[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
}

export interface ExpenditureSummaryProps {
  total: number;
}

export interface EconomyFormFooterProps {
  onPrevious: () => void;
  onNext: () => void;
}
