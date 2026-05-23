import { useQuery } from "@tanstack/react-query";

import type { OptionItem } from "../model";

import {
  getOptionItemById,
  getOptionItemsByOptionListId,
  getOptionItemsByOptionListKey,
} from "../api";
import { optionItemKeys } from "../model";

export const useOptionItemsByOptionList = (
  optionListId: string,
  optionListName: string,
) => {
  const normalizedOptionListId = optionListId.trim();
  const normalizedOptionListName = optionListName.trim();

  return useQuery<OptionItem[]>({
    queryKey: optionItemKeys.byOptionList(normalizedOptionListId),
    queryFn: () => getOptionItemsByOptionListId(normalizedOptionListId),
    enabled:
      normalizedOptionListId.length > 0 && normalizedOptionListName.length > 0,
  });
};

export const useOptionItemByOptionListKey = (optionListKey: string) => {
  const normalizedOptionListKey = optionListKey.trim();

  return useQuery<OptionItem[]>({
    queryKey: optionItemKeys.byOptionListKey(optionListKey),
    staleTime: 0, // 1000,
    queryFn: () => getOptionItemsByOptionListKey(optionListKey),
    enabled: normalizedOptionListKey.length > 0,
    placeholderData: [],
    meta: {
      // persist: false,
    },
  });
};

export const useOptionItemById = (id: string) => {
  const normalizedId = id.trim();

  return useQuery<OptionItem>({
    queryKey: optionItemKeys.detail(normalizedId),
    queryFn: () => getOptionItemById(normalizedId),
    enabled: normalizedId.length > 0,
  });
};
