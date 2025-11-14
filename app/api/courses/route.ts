import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/api-response";
import { Role } from "@prisma/client";
import { courseQuerySchema, courseSchema } from "@/schemas/course";
import { UnauthorizedError, ValidationError } from "@/lib/api-error";
import { requireRole } from "@/features/auth/services/auth-helpers";

// GET /api/courses - List courses with filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const query = courseQuerySchema.parse({
      subject: searchParams.get("subject") || undefined,
      level: searchParams.get("level") || undefined,
      search: searchParams.get("search") || undefined,
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 20,
      published: searchParams.get("published") === "true" ? true : undefined,
    });

    const skip = (query.page - 1) * query.limit;

    const where = {
      ...(query.subject && { subject: query.subject }),
      ...(query.level && { level: query.level }),
      ...(query.published !== undefined && { published: query.published }),
      ...(query.search && {
        OR: [
          { title: { contains: query.search, mode: "insensitive" as const } },
          {
            description: {
              contains: query.search,
              mode: "insensitive" as const,
            },
          },
        ],
      }),
    };

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        skip,
        take: query.limit,
        include: {
          teacher: {
            select: {
              id: true,
              user: {
                select: {
                  name: true,
                  image: true,
                },
              },
            },
          },
          _count: {
            select: {
              enrollments: true,
              reviews: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.course.count({ where }),
    ]);

    return NextResponse.json(
      ApiResponse.success({
        courses,
        pagination: {
          page: query.page,
          limit: query.limit,
          total,
          totalPages: Math.ceil(total / query.limit),
        },
      })
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        ApiResponse.error("Validation failed", error.issues),
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(ApiResponse.error("Failed to fetch courses"), {
      status: 500,
    });
  }
}

// POST /api/courses - Create new course (Admin/Teacher only)
export async function POST(request: NextRequest) {
  try {
    const user = await requireRole(Role.ADMIN);

    const body = await request.json();
    const data = courseSchema.parse(body);

    const course = await prisma.course.create({
      data,
      include: {
        teacher: {
          select: {
            id: true,
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(
      ApiResponse.success(course, "Course created successfully"),
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json(ApiResponse.error(error.message), {
        status: 401,
      });
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        ApiResponse.error("Validation failed", error.issues),
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(ApiResponse.error("Failed to create course"), {
      status: 500,
    });
  }
}
