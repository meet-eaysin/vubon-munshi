"use client";

import { useCourses } from "@/features/courses/hooks/use-courses";
import { Course } from "@prisma/client";
import { Loader2 } from "lucide-react";

export default function CoursesPage() {
  const { data, isLoading } = useCourses({ page: 1, limit: 20, published: true });

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">All Courses</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.data?.courses?.map((course: Course) => (
          // <CourseCard key={course.id} course={course} />
          <div key={course.id}>{course.title}</div>
        ))}
      </div>
    </div>
  );
}