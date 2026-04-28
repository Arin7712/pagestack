import * as z from "zod";

export const startupsSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(6),
  favIcon: z.string().url().or(z.literal("")),
  navLink: z.string().url().or(z.literal("")),
  revenue: z.number().min(0),
  userCount: z.number().min(0),
});
export const formSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(6),
  favIcon: z.string().url().or(z.literal("")),
  startups: z.array(startupsSchema).min(1),
});
