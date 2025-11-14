import { z } from "zod";
import { ItemType } from "@prisma/client";

export const initiatePaymentSchema = z.object({
  itemType: z.nativeEnum(ItemType),
  itemId: z.string().cuid(),
  amount: z.number().positive("Amount must be positive"),
  currency: z.string().default("BDT"),
});

export const paymentCallbackSchema = z.object({
  transactionId: z.string(),
  status: z.enum(["SUCCESS", "FAILED", "CANCELLED"]),
  amount: z.number(),
  paymentId: z.string().cuid(),
});

export type InitiatePaymentInput = z.infer<typeof initiatePaymentSchema>;
export type PaymentCallbackInput = z.infer<typeof paymentCallbackSchema>;
