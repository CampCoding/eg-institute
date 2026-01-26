"use client";
import { PlayCircle, Video, X } from "lucide-react";
import React, { useState } from "react";

export default function TeacherProfileVideoIntroduction({ teacher }) {
  const [showVideo, setShowVideo] = useState(false);

  // Extract YouTube ID helper
  const getYouTubeId = (url) => {
    if (!url) return null;
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\n?#]+)/
    );
    return match ? match[1] : null;
  };

  // Check if URL is YouTube
  const isYouTubeUrl = (url) => {
    if (!url) return false;
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  // Get video URL from multiple possible sources
  const videoUrl =
    teacher?.video ||
    teacher?.introVideo ||
    teacher?.videoUrl ||
    teacher?.rawData?.video ||
    "";

  const youtubeId = getYouTubeId(videoUrl);
  const isYouTube = isYouTubeUrl(videoUrl);

  console.log("Video URL:", videoUrl);
  console.log("Is YouTube:", isYouTube);
  console.log("YouTube ID:", youtubeId);

  return (
    <>
      {/* Introduction Video Card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
            <Video className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            Introduction Video
          </h3>
        </div>

        <div
          className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden group cursor-pointer transform hover:scale-[1.02] transition-all duration-500 shadow-2xl flex-1 min-h-[200px]"
          onClick={() => videoUrl && setShowVideo(true)}
        >
          {/* Thumbnail */}
          <img
            src={teacher?.image || teacher?.teacher_image || ""}
            alt="Video thumbnail"
            className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity duration-300"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop";
            }}
          />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-2xl">
                <PlayCircle className="w-12 h-12 sm:w-16 sm:h-16 text-white group-hover:text-teal-200 transition-colors duration-300" />
              </div>
              <div className="absolute inset-0 bg-white/10 rounded-full animate-ping"></div>
            </div>
          </div>

          {/* Video info overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6">
            <div className="flex items-center justify-between text-white">
              <div>
                <p className="font-bold text-base sm:text-lg">
                  Meet {teacher?.name?.split(" ")?.[0] || teacher?.name}
                </p>
                <p className="text-xs sm:text-sm opacity-90">
                  {videoUrl ? "Personal Introduction" : "No video available"}
                </p>
              </div>
              {videoUrl && (
                <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-xs sm:text-sm font-medium">
                    {isYouTube ? "YouTube" : "Video"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && videoUrl && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[9999] !m-0 p-4"
          onClick={() => setShowVideo(false)}
          style={{ animation: "fadeIn 0.3s ease-out" }}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-5xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "scaleIn 0.3s ease-out" }}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Meet Your Teacher
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Personal introduction from {teacher?.name}
                </p>
              </div>
              <button
                onClick={() => setShowVideo(false)}
                className="text-gray-500 hover:text-gray-700 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="Close video"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Video Player Area */}
            <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-inner">
              {isYouTube && youtubeId ? (
                // YouTube Video
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                  title="Teacher Introduction"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : videoUrl ? (
                // Direct Video URL
                <video
                  src={videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error("Video failed to load:", videoUrl);
                  }}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                // Fallback
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-white">
                    <PlayCircle className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 opacity-50" />
                    <p className="text-lg sm:text-xl font-semibold">
                      Video Player
                    </p>
                    <p className="text-gray-400 text-sm sm:text-base">
                      No introduction video available
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
