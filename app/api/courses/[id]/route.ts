import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  requireAuth,
  requireRole,
} from "@/features/auth/services/auth-helpers";
import { ApiResponse } from "@/lib/api-response";
import { Role } from "@prisma/client";
import { idParamSchema } from "@/schemas/common";
import { NotFoundError } from "@/lib/api-error";
import { courseSchema } from "@/schemas/course";

// GET /api/courses/[id] - Get course details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = idParamSchema.parse(await params);

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        teacher: {
          select: {
            id: true,
            bio: true,
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
        chapters: {
          include: {
            lessons: {
              select: {
                id: true,
                title: true,
                duration: true,
                isFree: true,
                order: true,
              },
              orderBy: { order: "asc" },
            },
          },
          orderBy: { order: "asc" },
        },
        reviews: {
          include: {
            users: {
              select: {
                name: true,
                image: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
          take: 5,
        },
        _count: {
          select: {
            enrollments: true,
            reviews: true,
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundError("Course not found");
    }

    // Calculate average rating
    const avgRating = await prisma.review.aggregate({
      where: { courseId: id },
      _avg: { rating: true },
    });

    return NextResponse.json(
      ApiResponse.success({
        ...course,
        averageRating: avgRating._avg.rating || 0,
      })
    );
  } catch (error) {
    if (error instanceof NotFoundError) {
      return NextResponse.json(ApiResponse.error(error.message), {
        status: 404,
      });
    }
    return NextResponse.json(ApiResponse.error("Failed to fetch course"), {
      status: 500,
    });
  }
}

// PUT /api/courses/[id] - Update course
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireRole(Role.ADMIN);

    const { id } = idParamSchema.parse(await params);
    const body = await request.json();
    const data = courseSchema.partial().parse(body);

    const course = await prisma.course.update({
      where: { id },
      data,
    });

    return NextResponse.json(
      ApiResponse.success(course, "Course updated successfully")
    );
  } catch (error) {
    if (error instanceof NotFoundError) {
      return NextResponse.json(ApiResponse.error(error.message), {
        status: 404,
      });
    }
    return NextResponse.json(ApiResponse.error("Failed to update course"), {
      status: 500,
    });
  }
}

// DELETE /api/courses/[id] - Delete course
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireRole(Role.ADMIN);

    const { id } = idParamSchema.parse(await params);

    await prisma.course.delete({
      where: { id },
    });

    return NextResponse.json(
      ApiResponse.success(null, "Course deleted successfully")
    );
  } catch (error) {
    return NextResponse.json(ApiResponse.error("Failed to delete course"), {
      status: 500,
    });
  }
}
