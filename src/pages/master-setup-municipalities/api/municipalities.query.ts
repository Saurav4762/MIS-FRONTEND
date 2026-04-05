import { queryClient } from "@shared/api";


import { useMutation, useQuery } from "@tanstack/react-query";
import { municipalitiesKeys } from "./municipalities.keys"; // Adjust path as needed
import { getMunicipalities, createMunicipality } from "./municipalities.api";
import type { Municipality } from "../model";

// 1. Hook to Fetch all Municipalities
export const useMunicipalities = () => {
  return useQuery<Municipality[]>({
    queryKey: municipalitiesKeys.list(),
    queryFn: getMunicipalities,
  });
};

// 2. Hook to Create a Municipality
export const useCreateMunicipality = () => {

  return useMutation<Municipality, unknown, Omit<Municipality, "id">>({
    mutationFn: (data: Omit<Municipality, "id">) => createMunicipality(data),
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: municipalitiesKeys.list() });
    },
    onError: (error) => {
      // You can handle global error notifications here
      console.error("Mutation failed:", error);
    }
  });
};
