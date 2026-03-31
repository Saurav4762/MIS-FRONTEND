import { z } from "zod";
/**
 * Valid master setup section values for dynamic routing
 */

export const masterSetupSectionSchema = z.enum([
  "wards",
  "toles",
  "departments",
  "programs",
  "fiscal-years",
  "survey-options",
]);

export type MasterSetupSection = z.infer<typeof masterSetupSectionSchema>;


/**
 * Helper to build dynamic section routes
 * Usage: buildMasterSetupRoute("wards") -> navigation path to wards section
 */
export function buildMasterSetupRoute(section: MasterSetupSection): string {
  return `/master-setup/${section}`;
}

