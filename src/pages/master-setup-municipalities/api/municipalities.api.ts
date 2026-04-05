import { http } from "@shared/api";
import type { Municipality } from "../model";

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

export const deleteMunicipality = async (id: string): Promise<void> => {
  try {
    await http.delete(`/municipality/${id}`);
    return;
  } catch (error) {
    console.log("Error deleting municipality", error);
    throw error;
  }
};
