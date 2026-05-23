import { z } from "zod";

export const FacilitySchema = z.object({
  // Section 01: Water & Sanitation
  drinkingWater: z.string(),
  toiletType: z.string(),

  // Section 02: Energy & Cooking
  electricity: z.string(),
  altLight: z.string(),
  cookingFuel: z.string(),
  stoveType: z.string(),

  // Section 03: Amenities (dynamic list)
  amenities: z.array(z.string()),

  // Section 04: Vehicles (dynamic list)
  vehicles: z.array(z.string()),
});

export type Facility = z.infer<typeof FacilitySchema>;