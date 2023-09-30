import { z } from "zod";

export const schema = {
  email: z.string().email(),
  userName: z.string().max(32),
  password: z.string().min(8).max(32),
  projectName: z.string().min(2).max(12),
};
