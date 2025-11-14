"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useState } from "react";
import { Level, Subject } from "@prisma/client";
import apiClient from "@/lib/api-client";
import { CourseInput, courseSchema } from "@/schemas/course";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { Checkbox } from "@/components/ui/checkbox";

interface CourseFormProps {
  initialData?: Partial<CourseInput> & { id?: string };
  onSuccess?: () => void;
}

export function CourseForm({ initialData, onSuccess }: CourseFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CourseInput>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      ...initialData,
      teacherId: initialData?.teacherId || user?.id || '',
      isFree: initialData?.isFree ?? false,
      published: initialData?.published ?? false,
      language: initialData?.language || 'Bangla',
      tags: initialData?.tags || [],
    },
  });

  const onSubmit = async (data: CourseInput) => {
    setIsLoading(true);

    try {
      if (initialData?.id) {
        await apiClient.put(`/courses/${initialData.id}`, data);
        toast.success("Course updated successfully!");
      } else {
        await apiClient.post("/courses", data);
        toast.success("Course created successfully!");
      }

      onSuccess?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save course");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Course Title</Label>
          <Input
            id="title"
            placeholder="Introduction to Algebra"
            {...register("title")}
            disabled={isLoading}
          />
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            placeholder="introduction-to-algebra"
            {...register("slug")}
            disabled={isLoading}
          />
          {errors.slug && (
            <p className="text-sm text-destructive">{errors.slug.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Course description..."
          rows={4}
          {...register("description")}
          disabled={isLoading}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Select
            value={watch("subject")}
            onValueChange={(value) => setValue("subject", value as Subject)}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(Subject).map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.subject && (
            <p className="text-sm text-destructive">{errors.subject.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="level">Level</Label>
          <Select
            value={watch("level")}
            onValueChange={(value) => setValue("level", value as Level)}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(Level).map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.level && (
            <p className="text-sm text-destructive">{errors.level.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Input
            id="language"
            placeholder="Bangla"
            {...register("language")}
            disabled={isLoading}
          />
          {errors.language && (
            <p className="text-sm text-destructive">{errors.language.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="price">Price (BDT)</Label>
          <Input
            id="price"
            type="number"
            placeholder="500"
            {...register("price", { valueAsNumber: true })}
            disabled={isLoading}
          />
          {errors.price && (
            <p className="text-sm text-destructive">{errors.price.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="promoPrice">Promo Price (Optional)</Label>
          <Input
            id="promoPrice"
            type="number"
            placeholder="400"
            {...register("promoPrice", { valueAsNumber: true })}
            disabled={isLoading}
          />
          {errors.promoPrice && (
            <p className="text-sm text-destructive">{errors.promoPrice.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="thumbnail">Thumbnail URL</Label>
        <Input
          id="thumbnail"
          placeholder="https://example.com/image.jpg"
          {...register("thumbnail")}
          disabled={isLoading}
        />
        {errors.thumbnail && (
          <p className="text-sm text-destructive">{errors.thumbnail.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="introVideoUrl">Intro Video URL</Label>
        <Input
          id="introVideoUrl"
          placeholder="https://youtube.com/watch?v=..."
          {...register("introVideoUrl")}
          disabled={isLoading}
        />
        {errors.introVideoUrl && (
          <p className="text-sm text-destructive">{errors.introVideoUrl.message}</p>
        )}
      </div>

      <input type="hidden" {...register("teacherId")} />

      <div className="flex items-center space-x-2">
        <Checkbox
          id="isFree"
          checked={watch("isFree")}
          onCheckedChange={(checked) => setValue("isFree", !!checked)}
          disabled={isLoading}
        />
        <Label htmlFor="isFree">Is Free</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="published"
          checked={watch("published")}
          onCheckedChange={(checked) => setValue("published", !!checked)}
          disabled={isLoading}
        />
        <Label htmlFor="published">Published</Label>
      </div>

      <input type="hidden" {...register("isFree")} />
      <input type="hidden" {...register("published")} />

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : initialData ? "Update Course" : "Create Course"}
        </Button>

        <Button type="button" variant="outline" onClick={() => onSuccess?.()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}