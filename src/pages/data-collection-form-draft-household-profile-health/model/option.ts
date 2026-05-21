import {
  optionItemSchema,
  optionListSchema,
  type OptionList,
} from "@shared/model";
// import { Health } from "./types";
// import type { OptionItem } from "@pages/master-setup-survey-options/model";
import z from "zod";

export const ILLNESS_OPTIONS: OptionList = {
  id: "Illness",
  labelEn: "Illness Types",
  labelNe: "बीमारी का प्रकारहरू",
  items: [
    {
      id: "diabetes",
      labelEn: "Diabetes",
      labelNe: "मधुमेह",
      value: "diabetes",
    },
    {
      id: "hypertension",
      labelEn: "Hypertension",
      labelNe: "उच्च रक्तचाप",
      value: "hypertension",
    },
    {
      id: "heart-disease",
      labelEn: "Heart Disease",
      labelNe: "मुटुको रोग",
      value: "heart-disease",
    },
    {
      id: "respiratory",
      labelEn: "Respiratory",
      labelNe: "श्वासप्रश्वास",
      value: "respiratory",
    },
    {
      id: "disability",
      labelEn: "Disability",
      labelNe: "अपाङ्गता",
      value: "disability",
    },
    {
      id: "mental-health",
      labelEn: "Mental Health",
      labelNe: "मानसिक स्वास्थ्य",
      value: "mental-health",
    },
  ],
};

export const illnessSchema = optionItemSchema.extend({
  value: z.enum([
    "diabetes",
    "hypertension",
    "heart_disease",
    "respiratory",
    "disability",
    "mental_health",
  ]),
});

export const illnessListSchema = optionListSchema.extend({
  id: z.literal("Illness"),
  labelEn: z.literal("Illness Types"),
  labelNe: z.literal("बीमारी का प्रकारहरू"),
  items: z.array(illnessSchema),
});

export type Illness = z.infer<typeof illnessSchema>;
export type IllnessList = z.infer<typeof illnessListSchema>;
