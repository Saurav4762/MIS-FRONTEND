import { http } from "@shared/api";
import type { Municipality, MunicipalitySeedResponse } from "../model";

export const getMunicipalities = async (): Promise<Municipality[]> => {
  try {
    const response = await http.get("/municipality");
    return response.data;
  } catch (error) {
    console.error("Error fetching municipalities:", error);
    throw error;
  }
};

export const createMunicipality = async (
  data: Omit<Municipality, "id">,
): Promise<Municipality> => {
  try {
    const response = await http.post("/municipality", data);
    return response.data;
  } catch (error) {
    console.error("Error creating municipality:", error);
    throw error;
  }
};

export const updateMunicipality = async (
  id: string,
  data: Partial<Omit<Municipality, "id">>,
): Promise<Municipality> => {
  try {
    const response = await http.patch(`/municipality/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating municipality:", error);
    throw error;
  }
};

export const deleteMunicipality = async (id: string): Promise<void> => {
  try {
    await http.delete(`/municipality/${id}`);
    return;
  } catch (error) {
    console.error("Error deleting municipality:", error);
    throw error;
  }
};

export const importMunicipalitySeed = async (
  file: File,
): Promise<MunicipalitySeedResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await http.post("/municipality/seed", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error importing municipality seed:", error);
    throw error;
  }
};
