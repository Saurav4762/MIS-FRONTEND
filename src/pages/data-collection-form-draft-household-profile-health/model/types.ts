import {
  optionItemSchema,
  optionListSchema,
} from "@pages/master-setup-survey-options/model/types";
import { z } from "zod";

// export const optionSchema = z.object({
//   id: z.string(),
//   labelNe: z.string(),
//   labelEn: z.string(),
//   value: z.string(),
// });

const illnessValues = [
  "diabetes",
  "hypertension",
  "heart_disease",
  "respiratory",
  "disability",
  "mental_health",
] as const;

export const illnessEnumSchema = z.enum(illnessValues);

export const healthSchema = z.object({
  insuranceProvider: z
    .enum([
      "Government Health Insurance",
      "Private Insurance",
      "Community Fund",
      "Other",
    ])
    .optional(),
  awarness: z.object({
    handwashing: z.boolean(),
    nutrition: z.boolean(),
    care: z.boolean(),
    checkups: z.boolean(),
    supplements: z.boolean(),
    vaccination: z.boolean(),
  }),
  illnesses: z.array(illnessEnumSchema).optional(),
});

export const illnessSchema = optionItemSchema.extend({
  value: z.array(illnessEnumSchema),
});

export const illnessListSchema = optionListSchema.extend({
  id: z.literal("Illness"),
  labelEn: z.literal("Illness Types"),
  labelNe: z.literal("बीमारी का प्रकारहरू"),
  items: z.array(illnessSchema),
});

export type Illness = z.infer<typeof illnessSchema>;
export type IllnessList = z.infer<typeof illnessListSchema>;

export type Health = z.infer<typeof healthSchema>;
// export type Option = z.infer<typeof optionSchema>;
