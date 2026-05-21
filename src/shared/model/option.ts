import { z } from "zod";

export const optionItemSchema = z.object({
  id: z.string(),
  labelNe: z.string(),
  labelEn: z.string(),
  value: z.string(),
  defaultValue: z.boolean().optional(),
});

export const optionListSchema = z.object({
  id: z.string(),
  labelNe: z.string(),
  labelEn: z.string(),
  items: z.array(optionItemSchema),
});

export type OptionItem = z.infer<typeof optionItemSchema>;
export type OptionList = z.infer<typeof optionListSchema>;
