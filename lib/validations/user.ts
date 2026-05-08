import * as z from "zod";

export const editUserSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    profileImage: z.string().url().or(z.literal(""))
})
