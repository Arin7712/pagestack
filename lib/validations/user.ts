import * as z from "zod";

const MAX_NAME_LENGTH = 80;
const MAX_USERNAME_LENGTH = 30;

const optionalUrl = z
  .string()
  .trim()
  .url("Must be a valid URL")
  .optional()
  .or(z.literal(""));

export const editUserSchema = z.object({
  name: z
    .string()
    .trim() // Prevents unnecessary whitespace
    .min(2, "Name is too short")
    .max(MAX_NAME_LENGTH, "Name is too long"),

  username: z
    .string()
    .trim()
    .min(2, "Username is too short")
    .max(MAX_USERNAME_LENGTH, "Username is too long")
    .regex(
      /^[a-z0-9_]+$/,
      "Username can only contain lowercase letters, numbers, and underscores",
    ),

  profileImage: optionalUrl,
});
