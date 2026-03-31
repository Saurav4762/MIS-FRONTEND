import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { masterSetupQueries } from "../api/master-setup.queries";

export function useMasterSetupSummary() {
  return useQuery(masterSetupQueries.summary());
}

export function useMasterSetupSummarySuspense() {
  return useSuspenseQuery(masterSetupQueries.summary());
}
