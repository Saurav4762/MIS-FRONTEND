import { http } from "@shared/api";
import type { DashboardResponse } from "@pages/dashboard/model";

export type MunicipalityInfo = {
    id: string;
    nameEn: string;
    nameNe: string;
    code: string;
    email: string;
    phoneNo: string;
    website: string;
};

export const publicDashboardApi = {
    getStats: async (wardId?: string): Promise<DashboardResponse> => {
        const url = wardId
            ? `/reports/dashboard/stats?wardId=${wardId}`
            : `/reports/dashboard/stats`;
        const response = await http.get<DashboardResponse>(url);
        return response.data;
    },

    getWards: async () => {
        const response = await http.get(`/ward`);
        return response.data;
    },

    getMunicipality: async (): Promise<MunicipalityInfo> => {
        const response = await http.get<MunicipalityInfo>(`/municipality`);
        return response.data;
    },
};