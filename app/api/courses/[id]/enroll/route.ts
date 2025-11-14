import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/api-response";
import { requireAuth } from "@/features/auth/services/auth-helpers";
import { PaymentService } from "@/lib/payment";
import { EmailService } from "@/lib/email";

// POST /api/courses/[id]/enroll - Enroll in course
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth();
    const { id: courseId } = await params;

    // Check if course exists and is published
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: { teacher: { select: { user: { select: { name: true } } } } },
    });

    if (!course) {
      return NextResponse.json(ApiResponse.error("Course not found"), {
        status: 404,
      });
    }

    if (!course.published) {
      return NextResponse.json(ApiResponse.error("Course is not available"), {
        status: 404,
      });
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId,
        },
      },
    });

    if (existingEnrollment) {
      return NextResponse.json(
        ApiResponse.error("Already enrolled in this course"),
        { status: 400 }
      );
    }

    // Handle free vs paid courses
    if (course.isFree) {
      // Create enrollment directly
      const enrollment = await prisma.enrollment.create({
        data: {
          userId: user.id,
          courseId,
        },
      });

      // Send confirmation email
      await EmailService.sendEnrollmentConfirmation(
        user.email,
        user.name,
        course.title
      );

      return NextResponse.json(
        ApiResponse.success(enrollment, "Successfully enrolled in course"),
        { status: 201 }
      );
    } else {
      // For paid courses, initiate payment
      const result = await PaymentService.initiatePayment({
        userId: user.id,
        amount: Number(course.price),
        itemType: "COURSE",
        itemId: courseId,
        itemName: course.title,
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
    }
  } catch (error) {
    console.error("Enrollment error:", error);
    return NextResponse.json(ApiResponse.error("Failed to enroll in course"), {
      status: 500,
    });
  }
}
