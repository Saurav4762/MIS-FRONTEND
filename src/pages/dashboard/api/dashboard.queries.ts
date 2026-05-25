import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "./dashboard.api";
import { dashboardKeys } from "./dashboard.keys";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: () => dashboardApi.getStats(),
  });
};

export const useDashboardWards = () => {
  return useQuery({
    queryKey: dashboardKeys.wards(),
    queryFn: dashboardApi.getWards,
  });
};