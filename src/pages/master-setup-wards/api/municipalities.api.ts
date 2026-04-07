import { http } from "@shared/api";
import type { Municipality } from "../model";

export const searchMunicipalities = async (
	keyword: string,
): Promise<Municipality[]> => {
	const response = await http.get<Municipality[]>("/municipality/search", {
		params: { query: keyword },
	});

	return response.data;
};
