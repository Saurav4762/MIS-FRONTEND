import type { LinkProps } from "@tanstack/react-router";

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

// Generate me a type that is key value pair that tells specific section mapped to its correspondent url
export type MasterSetupSectionPageId =
  | "municipalities"
  | "wards"
  | "toles"
  | "departments"
  | "programs"
  | "fiscal-years"
  | "survey-options";

export type MasterSetupSectionUrlMap = {
  [key in MasterSetupSectionPageId]: LinkProps["to"];
};

export const masterSetupSectionUrlMap: MasterSetupSectionUrlMap = {
  municipalities: "/master-setup/municipalities",
  wards: "/master-setup/wards",
  toles: "/master-setup/toles",
  departments: "/master-setup/departments",
  programs: "/master-setup/programs",
  "fiscal-years": "/master-setup/fiscal-years",
  "survey-options": "/master-setup/survey-options",
} as const;
