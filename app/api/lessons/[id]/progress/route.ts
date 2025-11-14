import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/api-response";
import { updateProgressSchema } from "@/schemas/progress";
import { requireAuth } from "@/features/auth/services/auth-helpers";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const data = updateProgressSchema.parse(body);
    const { id } = await params;

    // Get lesson and course info
    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        chapter: {
          select: { courseId: true },
        },
      },
    });

    if (!lesson) {
      return NextResponse.json(ApiResponse.error("Lesson not found"), {
        status: 404,
      });
    }

    // Check enrollment
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: lesson.chapter.courseId,
        },
      },
    });

    if (!enrollment) {
      return NextResponse.json(
        ApiResponse.error("Not enrolled in this course"),
        { status: 403 }
      );
    }

    // Update or create progress
    const progress = await prisma.progress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollment.id,
          lessonId: id,
        },
      },
      update: {
        watchedSeconds: data.watchedSeconds,
        completed: data.completed,
        lastWatchedAt: new Date(),
      },
      create: {
        enrollmentId: enrollment.id,
        lessonId: id,
        watchedSeconds: data.watchedSeconds,
        completed: data.completed,
      },
    });

    // Update enrollment progress percentage
    const totalLessons = await prisma.lesson.count({
      where: {
        chapter: {
          courseId: lesson.chapter.courseId,
        },
      },
    });

    const completedLessons = await prisma.progress.count({
      where: {
        enrollmentId: enrollment.id,
        completed: true,
      },
    });

    const progressPercent = Math.round((completedLessons / totalLessons) * 100);

    await prisma.enrollment.update({
      where: { id: enrollment.id },
      data: {
        progressPercent,
        ...(progressPercent === 100 && { completedAt: new Date() }),
      },
    });

    return NextResponse.json(
      ApiResponse.success({ progress, progressPercent })
    );
  } catch (error) {
    return NextResponse.json(ApiResponse.error("Failed to update progress"), {
      status: 500,
    });
  }
}
