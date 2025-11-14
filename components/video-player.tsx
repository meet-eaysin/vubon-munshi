"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import apiClient from "@/lib/api-client";

interface VideoPlayerProps {
  url: string;
  lessonId: string;
  enrollmentId: string;
  onProgress?: (progress: { played: number; playedSeconds: number }) => void;
  className?: string;
}

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        options: {
          height: string;
          width: string;
          videoId: string;
          playerVars?: Record<string, unknown>;
          events?: {
            onReady?: (event: { target: unknown }) => void;
            onStateChange?: (event: { data: number; target: unknown }) => void;
          };
        }
      ) => {
        destroy: () => void;
        getCurrentTime: () => number;
        getDuration: () => number;
      };
      PlayerState: {
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
        UNSTARTED: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

export function VideoPlayer({
  url,
  lessonId,
  enrollmentId,
  onProgress,
  className,
}: VideoPlayerProps) {
  const playerRef = useRef<InstanceType<typeof window.YT.Player> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAPIReady, setIsAPIReady] = useState(false);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const apiInitializedRef = useRef(false);

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeVideoId(url);

  const updateProgress = useCallback(async (watchedSeconds: number, completed: boolean) => {
    try {
      await apiClient.post(`/lessons/${lessonId}/progress`, {
        watchedSeconds: Math.floor(watchedSeconds),
        completed,
      });
    } catch (error) {
      console.error("Failed to update progress:", error);
      // Don't show toast for progress updates to avoid spam
    }
  }, [lessonId]);

  const startProgressTracking = useCallback(() => {
    progressIntervalRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const currentTime = playerRef.current.getCurrentTime();
        const duration = playerRef.current.getDuration();

        if (duration > 0) {
          updateProgress(currentTime, false);
          onProgress?.({
            played: currentTime / duration,
            playedSeconds: currentTime,
          });
        }
      }
    }, 5000); // Update every 5 seconds
  }, [updateProgress, onProgress]);

  const onPlayerReady = useCallback(() => {
    setIsLoading(false);
    // Start progress tracking
    startProgressTracking();
  }, [startProgressTracking]);

  const onPlayerStateChange = useCallback((event: { data: number; target: unknown }) => {
    // YouTube player states: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (cued)
    if (event.data === window.YT.PlayerState.ENDED && playerRef.current) {
      // Mark lesson as completed
      updateProgress(playerRef.current.getDuration(), true);
    }
  }, [updateProgress]);

  // Load YouTube API
  useEffect(() => {
    // If API is already loaded, set ready state
    if (window.YT && window.YT.Player && !apiInitializedRef.current) {
      apiInitializedRef.current = true;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setIsAPIReady(true);
      return;
    }

    // If already initialized, don't do anything
    if (apiInitializedRef.current) {
      return;
    }

    // Load YouTube API script
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Set up callback for when API loads
    window.onYouTubeIframeAPIReady = () => {
      apiInitializedRef.current = true;
      setIsAPIReady(true);
    };
  }, []);

  // Initialize player when API is ready
  useEffect(() => {
    if (!isAPIReady || !videoId) return;

    const playerElement = document.getElementById(`youtube-player-${lessonId}`);
    if (!playerElement) return;

    playerRef.current = new window.YT.Player(`youtube-player-${lessonId}`, {
      height: '100%',
      width: '100%',
      videoId: videoId,
      playerVars: {
        modestbranding: 1,
        rel: 0,
        enablejsapi: 1,
        origin: window.location.origin,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [isAPIReady, videoId, lessonId, onPlayerReady, onPlayerStateChange]);

  if (!videoId) {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <div className="aspect-video flex items-center justify-center bg-muted">
          <p className="text-muted-foreground">Invalid video URL</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="aspect-video relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        )}
        <div
          id={`youtube-player-${lessonId}`}
          className="w-full h-full"
        />
      </div>
    </Card>
  );
}