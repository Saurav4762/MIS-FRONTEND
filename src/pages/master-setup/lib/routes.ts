import { z } from "zod";
/**
 * Valid master setup section values for dynamic routing
 */

export const masterSetupSectionSchema = z.enum([
  "municipalities",
  "wards",
  "toles",
  "departments",
  "programs",
  "fiscal-years",
  "survey-options",
]);

export type MasterSetupSection = z.infer<typeof masterSetupSectionSchema>;