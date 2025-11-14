import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PaymentService } from "@/lib/payment";
import { ApiResponse } from "@/lib/api-response";
import { requireAuth } from "@/features/auth/services/auth-helpers";
import { ItemType } from "@prisma/client";

const initiatePaymentSchema = z.object({
  amount: z.number().positive(),
  itemType: z.enum(["COURSE", "NOTE"]),
  itemId: z.string(),
  itemName: z.string(),
});

// POST /api/payments - Initiate payment
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();

    const body = await request.json();
    const data = initiatePaymentSchema.parse(body);

    const result = await PaymentService.initiatePayment({
      userId: user.id,
      ...data,
    });

    if (result.success) {
      return NextResponse.json(
        ApiResponse.success({
          paymentId: result.paymentId,
          gatewayUrl: result.gatewayUrl,
        })
      );
    } else {
      return NextResponse.json(
        ApiResponse.error(result.error || "Payment initiation failed"),
        { status: 400 }
      );
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        ApiResponse.error("Validation failed", error.issues),
        { status: 400 }
      );
    }
    return NextResponse.json(ApiResponse.error("Failed to initiate payment"), {
      status: 500,
    });
  }
}
