import { z } from "zod";

export const questionSchema = z.object({
  question: z.string().min(10, "Question must be at least 10 characters"),
  options: z
    .array(z.string())
    .min(2, "At least 2 options required")
    .max(6, "Maximum 6 options allowed"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
  explanation: z.string().optional(),
  order: z.number().int().positive(),
});

export const quizSchema = z.object({
  courseId: z.string().cuid(),
  title: z.string().min(5, "Title must be at least 5 characters"),
  duration: z.number().int().positive("Duration must be positive"),
  passingScore: z.number().int().min(0).max(100).default(70),
  randomize: z.boolean().default(true),
  questions: z
    .array(questionSchema)
    .min(1, "At least one question is required"),
});

export const submitQuizSchema = z.object({
  quizId: z.string().cuid(),
  answers: z.record(z.string(), z.string()),
});

export type QuizInput = z.infer<typeof quizSchema>;
export type QuestionInput = z.infer<typeof questionSchema>;
export type SubmitQuizInput = z.infer<typeof submitQuizSchema>;
