import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "./dashboard.api";
import { dashboardKeys } from "./dashboard.keys";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: () => dashboardApi.getStats(),
  });
};