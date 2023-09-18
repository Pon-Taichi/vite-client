import { z } from "zod";

export const schema = {
  email: z.string().email(),
  password: z.string().min(8).max(32),
  projectName: z.string().min(2).max(12),
};
