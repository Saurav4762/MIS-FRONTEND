import type { MasterSetupSummary } from "../model/types";

const mockSummaryDb: MasterSetupSummary = {
  municipalityCount: 20,
  wardCount: 12,
  toleCount: 43,
  departmentCount: 8,
  programCount: 24,
  currentFiscalYear: "FY 2082/83",
  surveyOptionCount: 37,
  updatedAt: new Date().toISOString(),
};

const sleep = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

export const masterSetupApi = {
  getSummary: async () => {
    // Mock backend roundtrip until the real endpoint is available.
    await sleep(500);
    return structuredClone(mockSummaryDb);
  },
};
