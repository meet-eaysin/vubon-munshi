import { z } from "zod";

export const reviewSchema = z.object({
  courseId: z.string().cuid(),
  rating: z
    .number()
    .int()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  comment: z
    .string()
    .min(10, "Comment must be at least 10 characters")
    .optional(),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
