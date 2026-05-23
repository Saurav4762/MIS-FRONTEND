import { queryClient } from "@shared/api";
import type { OptionList } from "../model";
import { createOptionList, deleteOptionList, updateOptionList } from "../api";
import { optionListKeys } from "../model";
import { useMutation } from "@tanstack/react-query";
import type { CreateOptionList, UpdateOptionList } from "../model/types";

export const useCreateOptionList = () => {
  return useMutation<OptionList, unknown, CreateOptionList>({
    mutationFn: (optionList) => createOptionList(optionList),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: optionListKeys.all });
    },
    onError: (error) => {
      console.error("Create option list mutation failed:", error);
    },
  });
};

export const useUpdateOptionList = () => {
  return useMutation<
    OptionList,
    unknown,
    { id: string; data: UpdateOptionList }
  >({
    mutationFn: ({ id, data }) => updateOptionList(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: optionListKeys.all });
    },
    onError: (error) => {
      console.error("Update option list mutation failed:", error);
    },
  });
};

export const useDeleteOptionList = () => {
  return useMutation<void, unknown, { id: string }>({
    mutationFn: ({ id }) => deleteOptionList(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: optionListKeys.all });
    },
    onError: (error) => {
      console.error("Delete option list mutation failed:", error);
    },
  });
};
