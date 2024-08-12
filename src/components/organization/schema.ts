import { z } from "zod";
// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const createOrganizationSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string(),
  // images: z.array(z.unknown())
  //   .refine(files => Array.from(files).every(file => file instanceof File), { message: "Expected a file" })
  //   .refine(files => Array.from(files).every(file => ACCEPTED_IMAGE_TYPES.includes(file.type)), "Only these types are allowed .jpg, .jpeg, .png and .webp")
});