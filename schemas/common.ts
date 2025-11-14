import { z } from "zod";

export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
});

export const searchSchema = z.object({
  q: z.string().min(1, "Search query is required"),
  ...paginationSchema.shape,
});

export const idParamSchema = z.object({
  id: z.string().cuid(),
});

export const slugParamSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
});

export type PaginationInput = z.infer<typeof paginationSchema>;
export type SearchInput = z.infer<typeof searchSchema>;
export type IdParam = z.infer<typeof idParamSchema>;
export type SlugParam = z.infer<typeof slugParamSchema>;
