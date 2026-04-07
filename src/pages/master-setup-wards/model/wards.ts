import { z } from "zod";
export const wardSchema = z.object({
  id: z.guid(),
  number: z.number().min(1).max(999),
  municipalityId: z.guid(),
  representativeNameNe: z.string().max(255),
  representativeNameEn: z.string().max(255),
  phoneNo: z.string().max(20).optional(),
  email: z.string().email().max(255).optional(),
});

export type Ward = z.infer<typeof wardSchema>;

export type CreateWardPayload = Omit<Ward, "id">;
export type UpdateWardPayload = Partial<CreateWardPayload>;
