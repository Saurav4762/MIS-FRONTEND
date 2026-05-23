import { z } from "zod";

export const optionItemSchema = z.object({
  id: z.guid(),
  optionListId: z.guid(),
  labelEn: z.string().max(255),
  labelNe: z.string().max(255),
  extra: z.record(z.string(), z.unknown()).optional(),
});

export const optionListSchema = z.object({
  id: z.guid(),
  labelEn: z.string().max(255),
  labelNe: z.string().max(255),
  description: z.string().max(255).optional(),
});

export type OptionItem = z.infer<typeof optionItemSchema>;
export type OptionList = z.infer<typeof optionListSchema>;

export type CreateOptionList = Omit<OptionList, "id">;
export type UpdateOptionList = Partial<Omit<OptionList, "id">>;

export type CreateOptionItem = Omit<OptionItem, "id">;
export type UpdateOptionItem = Partial<Omit<OptionItem, "id">>;
