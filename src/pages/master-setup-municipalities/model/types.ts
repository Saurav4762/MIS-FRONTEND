import { z } from "zod";

export const municipalitySchema = z.object({
  id: z.guid(),

  nameNe: z.string().max(100),
  nameEn: z.string().max(100),
  code: z.string().max(10),
  headExecutiveNameEn: z.string().max(100),
  headExecutiveNameNe: z.string().max(100),
  email: z.email(),
  phoneNo: z.string().max(20),
  website: z.url().max(200).optional(),
});

export type Municipality = z.infer<typeof municipalitySchema>;
