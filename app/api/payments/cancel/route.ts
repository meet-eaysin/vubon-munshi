import { NextRequest, NextResponse } from "next/server";

// GET /api/payments/cancel - Payment cancellation callback
export async function GET(request: NextRequest) {
  // Redirect to cancellation page
  return NextResponse.redirect(new URL("/payment/cancelled", request.url));
}
