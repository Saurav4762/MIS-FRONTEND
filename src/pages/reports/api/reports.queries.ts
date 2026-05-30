import { useQuery } from "@tanstack/react-query";
import { reportsApi } from "./reports.api";
import { reportsKeys } from "./reports.keys";

export const useAllReports = () => {
    return useQuery({
        queryKey: reportsKeys.all(),
        queryFn: () => reportsApi.getAll(),
    });
};
