import { z } from "zod";

/**
 * Base (required) schema for the Residence form.
 * A separate `.partial()` draft schema is exported for in-progress/draft saves.
 */

const MigrationSchema = z.object({
  hasMigrated: z.boolean(),
  previousDistrict: z.string(),
  previousMunicipality: z.string(),
  reasonForMigration: z.string(),
});

export const ResidenceSchema = z.object({
  ownershipStatus: z.string(),
  housingType: z.string(),
  roofMaterial: z.string(),
  floorMaterial: z.string(),
  waterSource: z.string(),
  toiletFacility: z.string(),
  electricityAccess: z.enum(["yes", "no"]),
  internetAccess: z.enum(["yes", "no"]),
  roomCount: z.number().int().min(0),
  remarks: z.string().nullable(),

  // Migration-related fields (optional in many forms; included on the base schema
  // so they can be required in stricter validations if needed)
  migration: MigrationSchema.optional(),
});

/**
 * Draft-friendly schema: all fields optional to allow partial saves.
 */
export type Residence = z.infer<typeof ResidenceSchema>;
