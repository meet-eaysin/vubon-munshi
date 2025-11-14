"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  url: string;
  lessonId: string;
  enrollmentId: string;
  onProgress?: (progress: { played: number; playedSeconds: number }) => void;
  className?: string;
}

export function VideoPlayer({
  url,
  lessonId,
  enrollmentId,
  onProgress,
  className,
}: VideoPlayerProps) {
  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeVideoId(url);

  if (!videoId) {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <div className="aspect-video flex items-center justify-center bg-muted">
          <p className="text-muted-foreground">Invalid video URL</p>
        </div>
      </Card>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`;

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="aspect-video">
        <iframe
          src={embedUrl}
          title="Course Video"
          className="w-full h-full"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </Card>
  );
}