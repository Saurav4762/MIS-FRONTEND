import { http } from "@shared/api";

import type { CreateOptionItem, OptionItem, UpdateOptionItem } from "../model";
import type { ApiResponse } from "@shared/model";

export const getOptionItemsByOptionListId = async (
  optionListId: string,
): Promise<OptionItem[]> => {
  try {
    const response = await http.get(`/OptionItem/OptionList/${optionListId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching option items:", error);
    throw error;
  }
};

export const getOptionItemsByOptionListKey = async (
  optionListId: string,
): Promise<OptionItem[]> => {
  try {
    const response = (await http.get(`/OptionItem/OptionList/${optionListId}`))
      .data as ApiResponse<OptionItem[]>;
    if (response.data) return response.data;
    return [];
  } catch (error) {
    console.error("Error fetching option items:", error);
    throw error;
  }
};
export const getOptionItemById = async (id: string): Promise<OptionItem> => {
  try {
    const response = await http.get(`/OptionItem/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching option item:", error);
    throw error;
  }
};

export const createOptionItem = async (
  data: CreateOptionItem,
): Promise<OptionItem> => {
  try {
    const response = await http.post("/OptionItem", data);
    return response.data;
  } catch (error) {
    console.error("Error creating option item:", error);
    throw error;
  }
};

export const updateOptionItem = async (
  id: string,
  data: UpdateOptionItem,
): Promise<OptionItem> => {
  try {
    const response = await http.patch(`/OptionItem/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating option item:", error);
    throw error;
  }
};

export const deleteOptionItem = async (id: string): Promise<void> => {
  try {
    await http.delete(`/OptionItem/${id}`);
    return;
  } catch (error) {
    console.error("Error deleting option item:", error);
    throw error;
  }
};
