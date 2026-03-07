import z from "zod";

export const signupSchema = z.object({
  firstName: z.string().min(3).max(20),
  lastName: z.string().min(3).max(20),
  address: z.string().min(3).max(50),
  email: z.string().email(),
  mobile: z.string().min(11).max(11),
  password: z.string().min(8),
  role: z.enum(["Admin", "Resident"]).default("Resident"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(16),
});
