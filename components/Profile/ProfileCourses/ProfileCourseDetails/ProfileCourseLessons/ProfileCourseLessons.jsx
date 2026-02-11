"use client";
import {
  CheckCircle,
  ChevronRight,
  Clock,
  Eye,
  Flame,
  Lock,
  PenTool,
  Play,
  Users,
  Video,
  Volume2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

import { Spin } from "antd";

export default function ProfileCourseLessons({ course, units, loading }) {
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl p-6 border border-emerald-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center">
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

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-500 rounded-2xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-blue-800">Study Time</span>
          </div>
          <div className="text-2xl font-black text-blue-900">42h</div>
          <div className="text-sm text-blue-600">total learning time</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-6 border border-purple-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-500 rounded-2xl flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-purple-800">Study Streak</span>
          </div>
          <div className="text-2xl font-black text-purple-900">
            {course?.studyStreak || 0} days
          </div>
          <div className="text-sm text-purple-600">keep it going!</div>
        </div>
      </div>

      {/* {units?.map((unit) => (
        <div key={unit.unit_id} className="space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
            <h2 className="text-2xl font-black text-gray-800 bg-white px-6 py-2 rounded-2xl shadow-sm border border-gray-100">
              {unit.unit_title}
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
          </div>

          <div className="space-y-6">
            {unit.videos && unit.videos.length > 0 ? (
              unit.videos.map((video, index) => {
                const isCompleted = false; 
                const isCurrent = index === 0 && !isCompleted; 

                return (
                  <div
                    key={video.video_id}
                    className={`group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 ${
                      isCurrent
                        ? "border-[#02AAA0] bg-gradient-to-br from-[#02AAA0]/5 via-white to-[#C9AE6C]/5"
                        : "border-transparent hover:border-[#02AAA0]/30"
                    }`}
                  >
                    <div className="p-8">
                      <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 flex-1 w-full text-center sm:text-left">
                          <div className="relative">
                            <div
                              className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg transition-all duration-300 ${
                                isCompleted
                                  ? "bg-gradient-to-br from-emerald-400 to-emerald-600 group-hover:scale-110"
                                  : isCurrent
                                  ? "bg-gradient-to-br from-[#02AAA0] to-[#02AAA0]/80 group-hover:scale-110 animate-pulse"
                                  : "bg-gradient-to-br from-gray-300 to-gray-400"
                              }`}
                            >
                              {isCompleted ? (
                                <CheckCircle className="w-8 h-8" />
                              ) : isCurrent ? (
                                <Play className="w-8 h-8" />
                              ) : (
                                <Lock className="w-8 h-8" />
                              )}
                            </div>
                            {isCurrent && (
                              <div className="absolute -inset-2 bg-gradient-to-r from-[#02AAA0] to-[#C9AE6C] rounded-3xl opacity-20 animate-ping"></div>
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#02AAA0] transition-colors duration-300">
                                {video.video_title}
                              </h3>
                            </div>
                            <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">
                              {video.video_title} - Master this lesson to progress in your path.
                            </p>
                            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 text-sm">
                              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full group-hover:bg-[#02AAA0]/10 transition-colors">
                                <Clock className="w-4 h-4 text-[#02AAA0]" />
                                {video.duration || "0"} min
                              </div>
                              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full capitalize group-hover:bg-[#C9AE6C]/10 transition-colors">
                                <Video className="w-4 h-4 text-[#02AAA0]" />
                                Video
                              </div>
                            </div>
                          </div>
                        </div>

                        <button
                          className={`w-full md:w-auto px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg flex items-center justify-center gap-3 ${
                            isCompleted
                              ? "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 hover:from-emerald-100 hover:to-emerald-200 hover:text-emerald-700 hover:shadow-xl"
                              : isCurrent
                              ? "bg-gradient-to-r from-[#02AAA0] to-[#02AAA0]/90 text-white hover:from-[#02AAA0]/90 hover:to-[#02AAA0] hover:shadow-2xl transform hover:scale-105"
                              : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-400 cursor-not-allowed"
                          }`}
                          disabled={!isCompleted && !isCurrent}
                          onClick={() =>
                            (isCompleted || isCurrent) &&
                            router.push(`/courses/courseVideos/${course?.id}`)
                          }
                        >
                          {isCompleted ? (
                            <div className="flex gap-2 items-center">
                              <Eye className="w-5 h-5" />
                              Review
                            </div>
                          ) : isCurrent ? (
                            <div className="flex gap-2 items-center">
                              <Play className="w-5 h-5" />
                              Start Lesson
                              <ChevronRight className="w-4 h-4" />
                            </div>
                          ) : (
                            <>
                              <Lock className="w-5 h-5" />
                              Locked
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-3xl p-10 text-center">
                <Video className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-400 font-medium italic">No videos in this unit yet</p>
              </div>
            )}
          </div>
        </div>
      ))} */}
    </div>
  );
}

