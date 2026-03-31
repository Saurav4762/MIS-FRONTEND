import type { MasterSetupSummary } from "../model/types";
import { masterSetupQueries } from "./master-setup.queries";
import { useQuery } from "@tanstack/react-query";
import { setupCardDefinitions } from "../model/setup-card-definitions";
import type { MasterSetupCardId, MasterSetupCardVm } from "../model/types";

const loadingMetaByCard: Record<MasterSetupCardId, string> = {
  municipality: "Loading municipality count...",
  wards: "Loading ward count...",
  toles: "Loading tole count...",
  departments: "Loading department count...",
  programs: "Loading program count...",
  "fiscal-years": "Loading fiscal year...",
  "survey-options": "Loading options...",
};

const errorMetaByCard: Record<MasterSetupCardId, string> = {
  municipality: "Municipality data unavailable",
  wards: "Ward data unavailable",
  toles: "Tole data unavailable",
  departments: "Department data unavailable",
  programs: "Program data unavailable",
  "fiscal-years": "Fiscal year unavailable",
  "survey-options": "Survey options unavailable",
};

export const useMasterSetupCards = () => {
  const summaryQuery = useQuery(masterSetupQueries.summary());

  const cards: MasterSetupCardVm[] = setupCardDefinitions.map((card) => {
    if (summaryQuery.data) {
      return {
        ...card,
        meta: getMetaText(card.id, summaryQuery.data),
      };
    }

    return {
      ...card,
      meta: summaryQuery.isError
        ? errorMetaByCard[card.id]
        : loadingMetaByCard[card.id],
    };
  });

  return {
    cards,
    isLoading: summaryQuery.isLoading,
    isFetching: summaryQuery.isFetching,
    isError: summaryQuery.isError,
  };
};

function getMetaText(id: MasterSetupCardId, summary: MasterSetupSummary) {
  switch (id) {
    case "municipality":
      return `${summary.municipalityCount} Total Municipality`;
    case "wards":
      return `${summary.wardCount} Active Wards`;
    case "toles":
      return `${summary.toleCount} Toles`;
    case "departments":
      return `${summary.departmentCount} Departments`;
    case "programs":
      return `${summary.programCount} Active Programs`;
    case "fiscal-years":
      return `Current: ${summary.currentFiscalYear}`;
    case "survey-options":
      return `${summary.surveyOptionCount} Custom Fields & Lists`;
    default:
      return "Data unavailable";
  }
}
