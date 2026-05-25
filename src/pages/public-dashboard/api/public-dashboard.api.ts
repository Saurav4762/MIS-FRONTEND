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
    getStats: async (municipalityId: string, wardId?: string): Promise<DashboardResponse> => {
        const url = wardId
            ? `/reports/dashboard/stats?municipalityId=${municipalityId}&wardId=${wardId}`
            : `/reports/dashboard/stats?municipalityId=${municipalityId}`;
        const response = await http.get<DashboardResponse>(url);
        return response.data;
    },

    getWards: async (municipalityId: string) => {
        const response = await http.get(`/ward/municipality/${municipalityId}`);
        return response.data;
    },

    getMunicipality: async (municipalityId: string): Promise<MunicipalityInfo> => {
        const response = await http.get<MunicipalityInfo>(`/municipality/${municipalityId}`);
        return response.data;
    },
};