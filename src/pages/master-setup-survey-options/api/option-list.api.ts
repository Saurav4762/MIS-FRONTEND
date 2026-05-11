import { http } from "@shared/api";
import type { OptionList } from "../model";
import type { UpdateOptionListPayload } from "../model/types";

export const getOptionList = async (): Promise<OptionList[]> => {
  try {
    const response = await http.get("/optionList");
    return response.data as OptionList[];
  } catch (error) {
    console.error("Error fetching option list:", error);
    return [];
  }
};

export const createOptionList = async (optionList: Omit<OptionList, "id">): Promise<OptionList> => {
  try {
    const response = await http.post("/optionList", optionList);
    return response.data as OptionList;
  } catch (error) {
    console.error("Error creating option list:", error);
    throw error;
  }
};

export const updateOptionList = async (
  id: string,
  optionList: UpdateOptionListPayload,
): Promise<OptionList> => {
  try {
    const response = await http.patch(`/optionList/${id}`, optionList);
    return response.data as OptionList;
  } catch (error) {
    console.error("Error updating option list:", error);
    throw error;
  }
};

export const deleteOptionList = async (id: string): Promise<void> => {
  try {
    await http.delete(`/optionList/${id}`);
  } catch (error) {
    console.error("Error deleting option list:", error);
    throw error;
  }
};