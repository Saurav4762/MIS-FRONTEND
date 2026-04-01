import { queryOptions } from "@tanstack/react-query";
import { masterSetupApi } from "./master-setup.api";
import { masterSetupKeys } from "./master-setup.keys";

export const masterSetupQueries = {
  summary: () =>
    queryOptions({
      queryKey: masterSetupKeys.summary(),
      queryFn: () => masterSetupApi.getSummary(),
    }),
};
