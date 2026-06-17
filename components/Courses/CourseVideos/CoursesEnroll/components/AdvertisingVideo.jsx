"use client";

import { useState, useMemo } from "react";
import { Video, Volume2, Users, Star, Play } from "lucide-react";

export default function AdvertisingVideo({ course }) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Detect video source type and extract ID/URL
  const videoSource = useMemo(() => {
    const url = course?.advertising_video;
    if (!url) return null;

    // YouTube detection
    const youtubeRegex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    if (youtubeMatch) {
      return {
        type: "youtube",
        id: youtubeMatch[1],
        embedUrl: `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=0&rel=0&modestbranding=1`,
      };
    }

    // Vimeo detection
    const vimeoRegex = /(?:vimeo\.com\/)(\d+)/;
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch) {
      return {
        type: "vimeo",
        id: vimeoMatch[1],
        embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?title=0&byline=0&portrait=0`,
      };
    }

    // Direct video link (mp4, webm, ogg, etc.)
    const videoExtensions = /\.(mp4|webm|ogg|mov|avi|mkv)(\?|$)/i;
    if (
      videoExtensions.test(url) ||
      url.includes("blob:") ||
      url.includes("http")
    ) {
      return {
        type: "direct",
        url: url,
      };
    }

    return null;
  }, [course?.advertising_video]);

  if (!videoSource) return null;

  return (
    <div className="mb-8">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#023f4d]">
                Course Preview
              </h2>
              <p className="text-gray-600 text-sm">
                Get a taste of what you'll learn in this course
              </p>
            </div>
          </div>
        </div>

        {/* Video Player */}
        <div className="relative bg-black aspect-video">
          {videoSource.type === "youtube" && (
            <iframe
              src={videoSource.embedUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Course Preview Video"
              onLoad={() => setIsVideoPlaying(false)}
            />
          )}

          {videoSource.type === "vimeo" && (
            <iframe
              src={videoSource.embedUrl}
              className="w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Course Preview Video"
              onLoad={() => setIsVideoPlaying(false)}
            />
          )}

          {videoSource.type === "direct" && (
            <video
              className="w-full h-full object-contain"
              controls
              preload="metadata"
              poster={course?.image}
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
              onEnded={() => setIsVideoPlaying(false)}
            >
              <source src={videoSource.url} type="video/mp4" />
              <source src={videoSource.url} type="video/webm" />
              <source src={videoSource.url} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-gradient-to-r from-teal-50 to-cyan-50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="font-semibold text-[#023f4d] mb-1">
                Why Choose This Course?
              </h3>
              <p className="text-gray-600 text-sm">
                Watch this preview to understand our teaching methodology and
                course quality
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4 text-teal-600" />
                <span>{course?.students || 0} students enrolled</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span>{course?.rating || 0} rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
