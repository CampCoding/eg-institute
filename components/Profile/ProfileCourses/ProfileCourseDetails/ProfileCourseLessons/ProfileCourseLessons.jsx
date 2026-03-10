"use client";
import {
  CheckCircle,
  ChevronRight,
  Clock,
  Eye,
  Flame,
  Lock,
  Play,
  Video,
  BookOpen,
  Trophy,
  Target,
  PlayCircle,
  Layers,
} from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Spin } from "antd";

export default function ProfileCourseLessons({ course, units, loading }) {
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const groupId = searchParams.get("group_id") || course?.group_id;

  const [expandedUnits, setExpandedUnits] = useState({});

  const toggleUnit = (unitId) => {
    setExpandedUnits((prev) => ({
      ...prev,
      [unitId]: !prev[unitId],
    }));
  };

  // Check if unit should be expanded (default: first unit expanded)
  const isUnitExpanded = (unitId, index) => {
    if (expandedUnits[unitId] !== undefined) {
      return expandedUnits[unitId];
    }
    return index === 0; // First unit expanded by default
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <Spin size="large" />
          <p className="mt-4 text-gray-500">Loading lessons...</p>
        </div>
      </div>
    );
  }

  if (!units || units.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Video className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">No Lessons Yet</h3>
        <p className="text-gray-500">
          This course doesn't have any lessons available yet.
        </p>
      </div>
    );
  }

  // Calculate total duration
  const calculateTotalDuration = () => {
    let total = 0;
    units.forEach((unit) => {
      unit.videos?.forEach((video) => {
        total += parseInt(video.video_duration) || 0;
      });
    });
    return total;
  };

  const totalDuration = calculateTotalDuration();
  const hours = Math.floor(totalDuration / 60);
  const minutes = totalDuration % 60;

  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl md:rounded-3xl p-5 md:p-6 border border-emerald-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl md:rounded-2xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-emerald-800">Completed</span>
          </div>
          <div className="text-2xl font-black text-emerald-900">
            {course?.completedLessons || 0}
          </div>
          <div className="text-sm text-emerald-600">
            out of {course?.totalLessons || 0} lessons
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl md:rounded-3xl p-5 md:p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-500 rounded-xl md:rounded-2xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-blue-800">Duration</span>
          </div>
          <div className="text-2xl font-black text-blue-900">
            {hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`}
          </div>
          <div className="text-sm text-blue-600">total learning time</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl md:rounded-3xl p-5 md:p-6 border border-purple-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-500 rounded-xl md:rounded-2xl flex items-center justify-center">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-purple-800">Units</span>
          </div>
          <div className="text-2xl font-black text-purple-900">
            {units.length}
          </div>
          <div className="text-sm text-purple-600">course sections</div>
        </div>
      </div>

      {/* Units List */}
      <div className="space-y-6">
        {units.map((unit, unitIndex) => {
          const unitVideosCount = unit.videos?.length || 0;
          const completedInUnit =
            unit.videos?.filter(
              (v) => v.watched === "1" || v.is_watched === true
            ).length || 0;
          const unitProgress =
            unitVideosCount > 0
              ? Math.round((completedInUnit / unitVideosCount) * 100)
              : 0;
          const isExpanded = isUnitExpanded(unit.unit_id, unitIndex);
          const isUnitComplete = unitProgress === 100;

          // Find first unwatched video in this unit
          let foundFirstUnwatched = false;

          return (
            <div
              key={unit.unit_id}
              className="bg-white rounded-2xl md:rounded-3xl shadow-lg overflow-hidden border border-gray-100"
            >
              {/* Unit Header */}
              <button
                onClick={() => toggleUnit(unit.unit_id)}
                className={`w-full p-5 md:p-6 flex items-center justify-between gap-4 transition-colors ${
                  isUnitComplete
                    ? "bg-gradient-to-r from-emerald-50 to-green-50"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Unit Icon */}
                  <div
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0 ${
                      isUnitComplete
                        ? "bg-gradient-to-br from-emerald-400 to-emerald-600"
                        : "bg-gradient-to-br from-[#02AAA0] to-[#02AAA0]/80"
                    }`}
                  >
                    {isUnitComplete ? (
                      <Trophy className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    ) : (
                      <Target className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    )}
                  </div>

                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-[#02AAA0] uppercase tracking-wider">
                        Unit {unitIndex + 1}
                      </span>
                      {isUnitComplete && (
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                          ✓ Complete
                        </span>
                      )}
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-gray-900 line-clamp-1">
                      {unit.unit_title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 mt-0.5">
                      {completedInUnit} of {unitVideosCount} lessons completed
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
                  {/* Progress Circle */}
                  <div className="hidden sm:block relative w-12 h-12">
                    <svg className="w-12 h-12 transform -rotate-90">
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="#e5e7eb"
                        strokeWidth="3"
                        fill="none"
                      />
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke={isUnitComplete ? "#10b981" : "#02AAA0"}
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 20}`}
                        strokeDashoffset={`${
                          2 * Math.PI * 20 * (1 - unitProgress / 100)
                        }`}
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className={`text-xs font-bold ${
                          isUnitComplete ? "text-emerald-600" : "text-[#02AAA0]"
                        }`}
                      >
                        {unitProgress}%
                      </span>
                    </div>
                  </div>

                  {/* Chevron */}
                  <ChevronRight
                    className={`w-5 h-5 md:w-6 md:h-6 text-gray-400 transition-transform duration-300 ${
                      isExpanded ? "rotate-90" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Videos List */}
              {isExpanded && (
                <div className="border-t border-gray-100">
                  {unit.videos && unit.videos.length > 0 ? (
                    <div className="divide-y divide-gray-50">
                      {unit.videos.map((video, videoIndex) => {
                        const isWatched =
                          video.watched === "1" || video.is_watched === true;
                        const isCurrent = !isWatched && !foundFirstUnwatched;

                        if (isCurrent) {
                          foundFirstUnwatched = true;
                        }

                        const isLocked = !isWatched && !isCurrent;

                        return (
                          <div
                            key={video.video_id}
                            className={`p-4 md:p-5 flex items-center gap-4 transition-all duration-200 ${
                              isCurrent
                                ? "bg-gradient-to-r from-[#02AAA0]/5 to-[#C9AE6C]/5"
                                : "hover:bg-gray-50"
                            }`}
                          >
                            {/* Video Status Icon */}
                            <div className="relative flex-shrink-0">
                              <div
                                className={`w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${
                                  isWatched
                                    ? "bg-gradient-to-br from-emerald-400 to-emerald-600"
                                    : isCurrent
                                      ? "bg-gradient-to-br from-[#02AAA0] to-[#02AAA0]/80"
                                      : "bg-gray-200"
                                }`}
                              >
                                {isWatched ? (
                                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                ) : isCurrent ? (
                                  <PlayCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                ) : (
                                  <Lock className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                                )}
                              </div>

                              {/* Lesson Number */}
                              <span
                                className={`absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                                  isWatched
                                    ? "bg-emerald-600 text-white"
                                    : isCurrent
                                      ? "bg-[#02AAA0] text-white"
                                      : "bg-gray-300 text-gray-600"
                                }`}
                              >
                                {videoIndex + 1}
                              </span>

                              {/* Current Indicator */}
                              {isCurrent && (
                                <span className="absolute -inset-1 rounded-xl bg-[#02AAA0]/20 animate-ping"></span>
                              )}
                            </div>

                            {/* Video Info */}
                            <div className="flex-1 min-w-0">
                              <h4
                                className={`font-semibold text-sm md:text-base line-clamp-1 ${
                                  isWatched
                                    ? "text-emerald-800"
                                    : isCurrent
                                      ? "text-gray-900"
                                      : "text-gray-400"
                                }`}
                              >
                                {video.video_title}
                              </h4>

                              {video.video_description && (
                                <p className="text-xs md:text-sm text-gray-500 line-clamp-1 mt-0.5">
                                  {video.video_description}
                                </p>
                              )}

                              <div className="flex items-center gap-3 mt-2">
                                {video.video_duration && (
                                  <span
                                    className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                                      isWatched
                                        ? "bg-emerald-50 text-emerald-600"
                                        : isCurrent
                                          ? "bg-[#02AAA0]/10 text-[#02AAA0]"
                                          : "bg-gray-100 text-gray-400"
                                    }`}
                                  >
                                    <Clock className="w-3 h-3" />
                                    {video.video_duration} min
                                  </span>
                                )}
                                <span
                                  className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                                    isWatched
                                      ? "bg-emerald-50 text-emerald-600"
                                      : isCurrent
                                        ? "bg-[#02AAA0]/10 text-[#02AAA0]"
                                        : "bg-gray-100 text-gray-400"
                                  }`}
                                >
                                  <Video className="w-3 h-3" />
                                  Video
                                </span>
                              </div>
                            </div>

                            {/* Action Button */}
                            <div className="flex-shrink-0">
                              {isWatched ? (
                                <button
                                  onClick={() =>
                                    router.push(
                                      `/courses/courseVideos/${course?.id}?group_id=${groupId}&video_id=${video.video_id}`
                                    )
                                  }
                                  className="flex items-center gap-1.5 px-3 md:px-4 py-2 md:py-2.5 bg-gray-100 hover:bg-emerald-100 text-gray-600 hover:text-emerald-700 rounded-xl font-semibold text-xs md:text-sm transition-all"
                                >
                                  <Eye className="w-4 h-4" />
                                  <span className="hidden sm:inline">
                                    Review
                                  </span>
                                </button>
                              ) : isCurrent ? (
                                <button
                                  onClick={() =>
                                    router.push(
                                      `/courses/courseVideos/${course?.id}?group_id=${groupId}&video_id=${video.video_id}`
                                    )
                                  }
                                  className="flex items-center gap-1.5 px-4 md:px-5 py-2 md:py-2.5 bg-gradient-to-r from-[#02AAA0] to-[#02AAA0]/90 hover:from-[#02AAA0]/90 hover:to-[#02AAA0] text-white rounded-xl font-semibold text-xs md:text-sm shadow-lg shadow-[#02AAA0]/25 hover:shadow-xl transition-all hover:scale-105"
                                >
                                  <Play className="w-4 h-4" />
                                  <span>Start</span>
                                  <ChevronRight className="w-4 h-4 hidden sm:block" />
                                </button>
                              ) : (
                                <button
                                  disabled
                                  className="flex items-center gap-1.5 px-3 md:px-4 py-2 md:py-2.5 bg-gray-100 text-gray-400 rounded-xl font-semibold text-xs md:text-sm cursor-not-allowed"
                                >
                                  <Lock className="w-4 h-4" />
                                  <span className="hidden sm:inline">
                                    Locked
                                  </span>
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <Video className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-400 font-medium">
                        No videos in this unit yet
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
