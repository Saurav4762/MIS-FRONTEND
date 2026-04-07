import { useMutation, useQuery } from "@tanstack/react-query";

import { queryClient } from "@shared/api";
import type { Ward, CreateWardPayload, UpdateWardPayload } from "../model";

import {
  createWard,
  deleteWard,
  getWardsByMunicipality,
  updateWard,
} from "./wards.api";
import { wardsKeys } from "./wards.keys";

export const useWardsByMunicipality = (municipalityId: string) => {
  const normalizedMunicipalityId = municipalityId.trim();

  return useQuery<Ward[]>({
    queryKey: wardsKeys.byMunicipality(normalizedMunicipalityId),
    queryFn: () => getWardsByMunicipality(normalizedMunicipalityId),
    enabled: normalizedMunicipalityId.length > 0,
  });
};

export const useCreateWard = () => {
  return useMutation<Ward, unknown, CreateWardPayload>({
    mutationFn: (data) => createWard(data),
    onSuccess: (_createdWard, variables) => {
      queryClient.invalidateQueries({ queryKey: wardsKeys.all });
      queryClient.invalidateQueries({
        queryKey: wardsKeys.byMunicipality(variables.municipalityId),
      });
    },
    onError: (error) => {
      console.error("Create ward mutation failed:", error);
    },
  });
};

export const useUpdateWard = () => {
  return useMutation<
    Ward,
    unknown,
    { id: string; municipalityId: string; data: UpdateWardPayload }
  >({
    mutationFn: ({ id, data }) => updateWard(id, data),
    onSuccess: (_updatedWard, variables) => {
      queryClient.invalidateQueries({ queryKey: wardsKeys.all });
      queryClient.invalidateQueries({
        queryKey: wardsKeys.byMunicipality(variables.municipalityId),
      });
    },
    onError: (error) => {
      console.error("Update ward mutation failed:", error);
    },
  });
};

export const useDeleteWard = () => {
  return useMutation<void, unknown, { id: string; municipalityId: string }>({
    mutationFn: (ward) => deleteWard(String(ward.id)),
    onSuccess: (_deletedWard, variables) => {
      queryClient.invalidateQueries({ queryKey: wardsKeys.all });
      queryClient.invalidateQueries({
        queryKey: wardsKeys.byMunicipality(variables.municipalityId),
      });
    },
    onError: (error) => {
      console.error("Delete ward mutation failed:", error);
    },
  });
};
