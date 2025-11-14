import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/api-response";
import { requireAuth } from "@/features/auth/services/auth-helpers";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();

    // Get user's enrollments with course details
    const enrollments = await prisma.enrollment.findMany({
      where: { userId: user.id },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            slug: true,
            thumbnail: true,
            subject: true,
            level: true,
          },
        },
      },
      orderBy: { enrolledAt: "desc" },
      take: 6, // Recent enrollments
    });

    // Calculate stats
    const totalEnrollments = await prisma.enrollment.count({
      where: { userId: user.id },
    });

    const completedCourses = await prisma.enrollment.count({
      where: {
        userId: user.id,
        completedAt: { not: null },
      },
    });

    // Calculate total hours watched (from progress)
    const progressRecords = await prisma.progress.findMany({
      where: {
        enrollment: { userId: user.id },
      },
      select: { watchedSeconds: true },
    });

    const totalHoursWatched = Math.floor(
      progressRecords.reduce(
        (total, record) => total + record.watchedSeconds,
        0
      ) / 3600
    );

    // Count certificates
    const certificatesEarned = await prisma.certificate.count({
      where: { userId: user.id },
    });

    return NextResponse.json(
      ApiResponse.success({
        totalEnrollments,
        completedCourses,
        totalHoursWatched,
        certificatesEarned,
        recentEnrollments: enrollments,
      })
    );
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json(ApiResponse.error("Failed to load dashboard"), {
      status: 500,
    });
  }
}
