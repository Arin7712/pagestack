import * as z from "zod";

const MAX_NAME_LENGTH = 80;
const MAX_DESCRIPTION_LENGTH = 5000;

const optionalUrl = z
  .string()
  .trim()
  .url("Must be a valid URL")
  .optional()
  .or(z.literal(""));

export const startupsSchema = z.object({
  name: z
    .string()
    .trim() // Prevents unnecessary whitespace
    .min(2, "Startup name is too short")
    .max(MAX_NAME_LENGTH, "Startup name is too long"),

  description: z
    .string()
    .trim()
    .min(6, "Description is too short")
    .max(MAX_DESCRIPTION_LENGTH, "Description is too long"),

  favIcon: optionalUrl,

  navLink: optionalUrl,

  // Coerce - automatically converts values into the expected types before validation
  revenue: z
    .number()
    .min(0, "Revenue cannot be negative")
    .optional(),

  userCount: z
    .number()
    .min(0, "User count cannot be negative")
    .optional(),
});

export const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Page name is too short")
    .max(MAX_NAME_LENGTH, "Page name is too long"),

  description: z
    .string()
    .trim()
    .min(6, "Page description is too short")
    .max(MAX_DESCRIPTION_LENGTH, "Page description is too long"),

  favIcon: optionalUrl,

  markdown: z.string().trim().min(1, "Markdown is too short"),

  startups: z
    .array(startupsSchema)
    .min(1, "At least one startup is required")
    .max(20, "Too many startups"),
});
