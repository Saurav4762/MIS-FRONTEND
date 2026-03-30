// Option 2: Using Zod (Highly Recommended for form validation)
import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["admin", "user"]),
});

// Automatically generate the TypeScript type from the Zod schema!
export type User = z.infer<typeof userSchema>;
