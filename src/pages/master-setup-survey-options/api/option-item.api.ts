import { http } from "@shared/api";

import type { OptionItem } from "../model";

export type CreateOptionItemPayload = Omit<OptionItem, "id">;
export type UpdateOptionItemPayload = Partial<Omit<OptionItem, "id">>;

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
	data: CreateOptionItemPayload,
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
	data: UpdateOptionItemPayload,
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
