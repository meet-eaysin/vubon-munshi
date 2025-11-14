import { z } from "zod";
import { Level, Subject } from "@prisma/client";

export const courseSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(200),
  slug: z
    .string()
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must contain only lowercase letters, numbers, and hyphens"
    ),
  description: z.string().min(20, "Description must be at least 20 characters"),
  introVideoUrl: z.string().url("Invalid video URL").optional(),
  thumbnail: z.string().url("Invalid thumbnail URL").optional(),
  teacherId: z.string().cuid(),
  price: z.number().min(0, "Price must be positive"),
  promoPrice: z.number().min(0, "Promo price must be positive").optional(),
  isFree: z.boolean(),
  level: z.nativeEnum(Level),
  language: z.string(),
  subject: z.nativeEnum(Subject),
  tags: z.array(z.string()),
  published: z.boolean(),
});

export const chapterSchema = z.object({
  courseId: z.string().cuid(),
  title: z.string().min(3, "Title must be at least 3 characters"),
  order: z.number().int().positive(),
});

export const lessonSchema = z.object({
  chapterId: z.string().cuid(),
  title: z.string().min(3, "Title must be at least 3 characters"),
  videoUrl: z.string().min(1, "Video URL is required"),
  duration: z.number().int().positive("Duration must be positive"),
  isFree: z.boolean().default(false),
  pdfUrl: z.string().url().optional(),
  order: z.number().int().positive(),
});

export const courseQuerySchema = z.object({
  subject: z.nativeEnum(Subject).optional(),
  level: z.nativeEnum(Level).optional(),
  search: z.string().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(50).default(20),
  published: z.boolean().optional(),
});

export type CourseInput = z.infer<typeof courseSchema>;
export type ChapterInput = z.infer<typeof chapterSchema>;
export type LessonInput = z.infer<typeof lessonSchema>;
export type CourseQuery = z.infer<typeof courseQuerySchema>;
