import { http } from "@shared/api";
import type { AllReportsResponse } from "../model/types";

export const reportsApi = {
    getAll: async (): Promise<AllReportsResponse> => {
        const response = await http.get<AllReportsResponse>("/reports/all");
        return response.data;
    },
};
