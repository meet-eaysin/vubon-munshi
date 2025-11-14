import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/api-response";
import { NotFoundError } from "@/lib/api-error";

interface Params {
  slug: string;
}

// GET /api/courses/slug/[slug] - Get course details by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const { slug } = await params;

    const course = await prisma.course.findUnique({
      where: { slug },
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
      where: { courseId: course.id },
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
