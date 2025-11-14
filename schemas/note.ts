import { z } from "zod";
import { Subject } from "@prisma/client";

export const noteSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(200),
  slug: z
    .string()
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must contain only lowercase letters, numbers, and hyphens"
    ),
  description: z.string().min(20, "Description must be at least 20 characters"),
  subject: z.nativeEnum(Subject),
  teacherId: z.string().cuid(),
  pdfUrl: z.string().min(1, "PDF URL is required"),
  previewImages: z
    .array(z.string().url())
    .min(1, "At least one preview image is required"),
  pageCount: z.number().int().positive("Page count must be positive"),
  price: z.number().min(0, "Price must be positive"),
  promoPrice: z.number().min(0, "Promo price must be positive").optional(),
  published: z.boolean().default(false),
});

export type NoteInput = z.infer<typeof noteSchema>;
