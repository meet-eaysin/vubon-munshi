import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/features/auth/services/auth-helpers";
import { ApiResponse } from "@/lib/api-response";
import { ConflictError, NotFoundError } from "@/lib/api-error";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth();
    const { id: courseId } = await params;

    // Check if course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundError("Course not found");
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
      throw new ConflictError("Already enrolled in this course");
    }

    // For paid courses, verify payment
    if (!course.isFree) {
      const payment = await prisma.payment.findFirst({
        where: {
          userId: user.id,
          itemType: "COURSE",
          itemId: courseId,
          status: "COMPLETED",
        },
      });

      if (!payment) {
        return NextResponse.json(ApiResponse.error("Payment required"), {
          status: 402,
        });
      }
    }

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: user.id,
        courseId,
      },
    });

    return NextResponse.json(
      ApiResponse.success(enrollment, "Successfully enrolled in course"),
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof ConflictError) {
      return NextResponse.json(ApiResponse.error(error.message), {
        status: error.statusCode,
      });
    }
    return NextResponse.json(ApiResponse.error("Failed to enroll in course"), {
      status: 500,
    });
  }
}
