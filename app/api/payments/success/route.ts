import { NextRequest, NextResponse } from "next/server";
import { PaymentService } from "@/lib/payment";
import { ApiResponse } from "@/lib/api-response";

// GET /api/payments/success - Payment success callback
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tranId = searchParams.get("tran_id");
    const valId = searchParams.get("val_id");

    if (!tranId || !valId) {
      return NextResponse.redirect(
        new URL("/payment/failed?error=Invalid payment parameters", request.url)
      );
    }

    const result = await PaymentService.verifyPayment(tranId, valId);

    if (result.success) {
      // Redirect to success page with payment details
      return NextResponse.redirect(
        new URL(`/payment/success?paymentId=${tranId}`, request.url)
      );
    } else {
      return NextResponse.redirect(
        new URL(
          "/payment/failed?error=Payment verification failed",
          request.url
        )
      );
    }
  } catch (error) {
    console.error("Payment success callback error:", error);
    return NextResponse.redirect(
      new URL("/payment/failed?error=Internal server error", request.url)
    );
  }
}
