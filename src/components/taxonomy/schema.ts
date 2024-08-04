import { z } from "zod";

export const createTaxonomySchema = z.object({
    name: z.string().min(1).max(100),
    slug: z.string().min(1).max(100),
});
