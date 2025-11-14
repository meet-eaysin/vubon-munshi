import { NextRequest, NextResponse } from "next/server";

// GET /api/payments/fail - Payment failure callback
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const error = searchParams.get("error") || "Payment failed";

  // Redirect to failure page
  return NextResponse.redirect(
    new URL(`/payment/failed?error=${encodeURIComponent(error)}`, request.url)
  );
}
