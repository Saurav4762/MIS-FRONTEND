import { http } from "@shared/api";
import type { DashboardResponse } from "../model";

export const dashboardApi = {
  getStats: async (): Promise<DashboardResponse> => {
    const response = await http.get<DashboardResponse>("/reports/dashboard/stats");
    return response.data;
  },

  getWards: async () => {
    const response = await http.get("/geography/ward");
    return response.data;
  },
};