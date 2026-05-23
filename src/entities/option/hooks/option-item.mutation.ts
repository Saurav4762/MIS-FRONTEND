import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@shared/api";
import type { OptionItem } from "../model";
import type { CreateOptionItem, UpdateOptionItem } from "../model";

import { createOptionItem, deleteOptionItem, updateOptionItem } from "../api";
import { optionItemKeys } from "../model";

export const useCreateOptionItem = () => {
  return useMutation<OptionItem, unknown, CreateOptionItem>({
    mutationFn: (data) => createOptionItem(data),
    onSuccess: (createdOptionItem) => {
      queryClient.invalidateQueries({
        queryKey: optionItemKeys.byOptionList(createdOptionItem.optionListId),
      });
      queryClient.invalidateQueries({
        queryKey: optionItemKeys.detail(createdOptionItem.id),
      });
    },
    onError: (error) => {
      console.error("Create option item mutation failed:", error);
    },
  });
};

export const useUpdateOptionItem = () => {
  return useMutation<
    OptionItem,
    unknown,
    { id: string; data: UpdateOptionItem }
  >({
    mutationFn: ({ id, data }) => updateOptionItem(id, data),
    onSuccess: (updatedOptionItem) => {
      queryClient.invalidateQueries({ queryKey: optionItemKeys.all });
      queryClient.invalidateQueries({
        queryKey: optionItemKeys.detail(updatedOptionItem.id),
      });
    },
    onError: (error) => {
      console.error("Update option item mutation failed:", error);
    },
  });
};

export const useDeleteOptionItem = () => {
  return useMutation<void, unknown, { id: string }>({
    mutationFn: (optionItem) => deleteOptionItem(String(optionItem.id)),
    onSuccess: (_deletedOptionItem, variables) => {
      queryClient.invalidateQueries({ queryKey: optionItemKeys.all });
      queryClient.invalidateQueries({
        queryKey: optionItemKeys.detail(variables.id),
      });
    },
    onError: (error) => {
      console.error("Delete option item mutation failed:", error);
    },
  });
};
