"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/features/auth/hooks/use-auth";
import apiClient from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Play, Clock, Users, Star, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import Image from "next/image";

interface Course {
  id: string;
  title: string;
  description: string;
  introVideoUrl?: string;
  thumbnail?: string;
  price: number;
  promoPrice?: number;
  isFree: boolean;
  level: string;
  language: string;
  subject: string;
  tags: string[];
  published: boolean;
  teacher: {
    user: {
      name: string;
      image?: string;
    };
    bio?: string;
  };
  chapters: Array<{
    id: string;
    title: string;
    lessons: Array<{
      id: string;
      title: string;
      duration: number;
      isFree: boolean;
    }>;
  }>;
  reviews: Array<{
    rating: number;
    comment?: string;
    users: {
      name: string;
      image?: string;
    };
  }>;
  _count: {
    enrollments: number;
    reviews: number;
  };
  averageRating: number;
}

export default function CoursePage() {
  const params = useParams();
  const { user } = useAuth();
  const [isEnrolling, setIsEnrolling] = useState(false);

  const { data: course, isLoading } = useQuery({
    queryKey: ["course", params.slug],
    queryFn: async () => {
      const response = await apiClient.get(`/courses/slug/${params.slug}`);
      return response.data as Course;
    },
    enabled: !!params.slug,
  });

  const handleEnroll = async () => {
    if (!user) {
      toast.error("Please login to enroll");
      return;
    }

    setIsEnrolling(true);
    try {
      const response = await apiClient.post(`/courses/${course?.id}/enroll`);

      if (response.data.success) {
        if (response.data.data.gatewayUrl) {
          // Redirect to payment gateway
          window.location.href = response.data.data.gatewayUrl;
        } else {
          // Free course - enrolled successfully
          toast.success("Successfully enrolled!");
          // Refresh the page to show enrolled status
          window.location.reload();
        }
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to enroll");
    } finally {
      setIsEnrolling(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Course not found</h1>
        </div>
      </div>
    );
  }

  const totalDuration = course.chapters.reduce((total, chapter) => {
    return total + chapter.lessons.reduce((chapterTotal, lesson) => {
      return chapterTotal + lesson.duration;
    }, 0);
  }, 0);

  return (
    <div className="container py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Header */}
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">{course.subject}</Badge>
              <Badge variant="outline">{course.level}</Badge>
              <Badge variant="outline">{course.language}</Badge>
            </div>

            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{course.averageRating.toFixed(1)}</span>
                <span>({course._count.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{course._count.enrollments} students</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{Math.floor(totalDuration / 60)}h {totalDuration % 60}m</span>
              </div>
            </div>

            <p className="text-lg text-muted-foreground">{course.description}</p>
          </div>

          {/* Course Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Course Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {course.chapters.map((chapter, chapterIndex) => (
                <div key={chapter.id}>
                  <h3 className="font-semibold mb-2">
                    Chapter {chapterIndex + 1}: {chapter.title}
                  </h3>
                  <div className="space-y-2 ml-4">
                    {chapter.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between p-2 rounded border"
                      >
                        <div className="flex items-center gap-2">
                          <Play className="h-4 w-4" />
                          <span className="text-sm">
                            {lessonIndex + 1}. {lesson.title}
                          </span>
                          {lesson.isFree && (
                            <Badge variant="secondary" className="text-xs">
                              Free
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{Math.floor(lesson.duration / 60)}:{(lesson.duration % 60).toString().padStart(2, '0')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Teacher Info */}
          <Card>
            <CardHeader>
              <CardTitle>Instructor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden">
                  {course.teacher.user.image ? (
                    <Image
                      src={course.teacher.user.image}
                      alt={course.teacher.user.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-lg font-semibold">
                      {course.teacher.user.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{course.teacher.user.name}</h3>
                  {course.teacher.bio && (
                    <p className="text-sm text-muted-foreground">{course.teacher.bio}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          {course.reviews.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Student Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {course.reviews.map((review, index) => (
                  <div key={index} className="border-b last:border-b-0 pb-4 last:pb-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                              }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium">{review.users.name}</span>
                    </div>
                    {review.comment && (
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Course Preview */}
          <Card>
            <CardContent className="p-0">
              {course.thumbnail ? (
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  width={400}
                  height={192}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              ) : (
                <div className="w-full h-48 bg-muted rounded-t-lg flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
            </CardContent>
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div>
                  {course.isFree ? (
                    <div className="text-2xl font-bold text-green-600">Free</div>
                  ) : (
                    <div>
                      <div className="text-2xl font-bold">
                        ৳{course.promoPrice || course.price}
                      </div>
                      {course.promoPrice && (
                        <div className="text-sm text-muted-foreground line-through">
                          ৳{course.price}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleEnroll}
                  disabled={isEnrolling}
                  className="w-full"
                  size="lg"
                >
                  {isEnrolling ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : course.isFree ? (
                    "Enroll Now"
                  ) : (
                    "Buy Now"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Course Stats */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span>Duration</span>
                <span>{Math.floor(totalDuration / 60)}h {totalDuration % 60}m</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Lessons</span>
                <span>{course.chapters.reduce((total, chapter) => total + chapter.lessons.length, 0)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Language</span>
                <span>{course.language}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Level</span>
                <span>{course.level}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}