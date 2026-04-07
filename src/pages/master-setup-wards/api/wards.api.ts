import { http } from "@shared/api";

import type { Ward, CreateWardPayload, UpdateWardPayload } from "../model";

export const getWardsByMunicipality = async (municipalityId: string): Promise<Ward[]> => {
  try {
    const response = await http.get(`/ward?municipalityId=${municipalityId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching wards:", error);
    throw error;
  }
};

export const createWard = async (data: CreateWardPayload): Promise<Ward> => {
  try {
    const response = await http.post("/ward", data);
    return response.data;
  } catch (error) {
    console.error("Error creating ward:", error);
    throw error;
  }
};

export const updateWard = async (
  id: string,
  data: UpdateWardPayload,
): Promise<Ward> => {
  try {
    const response = await http.patch(`/ward/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating ward:", error);
    throw error;
  }
};

export const deleteWard = async (id: string): Promise<void> => {
  try {
    await http.delete(`/ward/${id}`);
    return;
  } catch (error) {
    console.error("Error deleting ward:", error);
    throw error;
  }
};
