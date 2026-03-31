import type { LucideIcon } from "lucide-react";
export type MasterSetupSummary = {
  municipalityCount: number;
  wardCount: number;
  toleCount: number;
  departmentCount: number;
  programCount: number;
  currentFiscalYear: string;
  surveyOptionCount: number;
  updatedAt: string;
};


export type MasterSetupCardId =
  | "municipality"
  | "wards"
  | "toles"
  | "departments"
  | "programs"
  | "fiscal-years"
  | "survey-options";

export type MasterSetupCardDefinition = {
  id: MasterSetupCardId;
  title: string;
  description: string;
  action: string;
  href: string;
  icon: LucideIcon;
};

export type MasterSetupCardVm = MasterSetupCardDefinition & {
  meta: string;
};
