import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

// Automatically generate the TypeScript type from the Zod schema!
export type CreateUser = z.infer<typeof createUserSchema>;
