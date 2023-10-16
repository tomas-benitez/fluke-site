import { z } from "zod";

export const contactCreationDataSchema = z.object({
  first_name: z.string(),
  last_name: z.string().optional(),
  email: z.string().email(),
  message: z.string().optional(),
  company: z.string().optional(),
  phone: z.string().optional(),
  activity: z.string().optional(),
});

export type ContactCreationData = z.infer<typeof contactCreationDataSchema>;
