import { http } from "@shared/api";
import type { DashboardResponse } from "@pages/dashboard/model";

export const dashboardApi = {
  getStats: async (): Promise<DashboardResponse> => {
    const response = await http.get<DashboardResponse>("/reports/dashboard/stats");
    return response.data;
  },
};

export const publicDashboardApi = dashboardApi;
