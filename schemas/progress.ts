import { z } from "zod";

export const updateProgressSchema = z.object({
  lessonId: z.string().cuid(),
  watchedSeconds: z.number().int().min(0),
  completed: z.boolean().default(false),
});

export type UpdateProgressInput = z.infer<typeof updateProgressSchema>;
