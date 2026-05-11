// Use zod validation schema for validating the data from the backend

import { z } from "zod";

export const optionListSchema = z.object({
  id: z.string(),
  description: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z
      .string()
      .min(20, "Description must be at least 20 characters long")
      .optional(),
  ),
  labelEn: z.string().min(1, "English label is required"),
  labelNe: z.string().min(1, "Nepali label is required"),
});

export const createOptionListSchema = optionListSchema.omit({
  id: true,
});

export const updateOptionListSchema = createOptionListSchema.partial();

export type CreateOptionListPayload = z.infer<typeof createOptionListSchema>;
export type UpdateOptionListPayload = z.infer<typeof updateOptionListSchema>;

export const optionItemSchema = z.object({
  id: z.guid(),
  optionListId: z.guid({ message: "Invalid option list ID" }),
  labelEn: z.string().min(1, "English label is required"),
  labelNe: z.string().min(1, "Nepali label is required"),
  extra: z.record(z.string(), z.unknown()).optional(),
});
export const createOptionItemSchema = optionItemSchema.omit({
  id: true,
});

export const updateOptionItemSchema = optionItemSchema.partial().omit({
  id: true,
  optionListId: true,
});
export type CreateOptionItemPayload = z.infer<typeof createOptionItemSchema>;
export type UpdateOptionItemPayload = z.infer<typeof updateOptionItemSchema>;
export type OptionList = z.infer<typeof optionListSchema>;
export type OptionItem = z.infer<typeof optionItemSchema>;
