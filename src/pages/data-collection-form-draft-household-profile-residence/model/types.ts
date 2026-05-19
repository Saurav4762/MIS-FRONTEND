import { z } from "zod";

/**
 * Base (required) schema for the Residence form.
 * A separate `.partial()` draft schema is exported for in-progress/draft saves.
 */
export const ResidenceFormRequiredSchema = z.object({
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
	hasMigrated: z.boolean(),
	previousDistrict: z.string().optional(),
	previousMunicipality: z.string().optional(),
	reasonForMigration: z.string().optional(),
});

/**
 * Draft-friendly schema: all fields optional to allow partial saves.
 */
export const ResidenceFormSchema = ResidenceFormRequiredSchema.partial();

export type ResidenceFormRequiredValues = z.infer<typeof ResidenceFormRequiredSchema>;
export type ResidenceFormValues = z.infer<typeof ResidenceFormSchema>;

