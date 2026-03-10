"use client";
import React from "react";
import {
  CheckCircle,
  ChevronRight,
  Clock,
  Eye,
  Flame,
  Lock,
  Play,
  Video,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { handleGetAllCourseVideos } from "../../../../../libs/features/profile";

export default function ProfileCourseUnits({ course, units, loading }) {
  const router = useRouter();

   const searchParams = useSearchParams()
    const group_id = searchParams.get("group_id");

  const dispatch = useDispatch();
    const {all_course_videos_loading , all_course_videos_list} = useSelector(state => state?.profile)
  
    useEffect(() => {
      dispatch(handleGetAllCourseVideos({
        data:  {
          group_id
        }
      }))
    } , [dispatch , group_id])
  

  if (all_course_videos_loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* {units?.map((unit, unitIndex) => (
        <div key={unit.unit_id} className="space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
            <h2 className="text-2xl font-black text-gray-800 bg-white px-6 py-2 rounded-2xl shadow-sm border border-gray-100">
              {unit.unit_title}
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
          </div>

          <div className="space-y-4">
            {unit.videos && unit.videos.length > 0 ? (
              unit.videos.map((video, videoIndex) => (
                <div
                  key={video.video_id}
                  className={`group bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-2 border-transparent hover:border-[#02AAA0]/20`}
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 flex-1 w-full">
                        <div className="relative">
                          {video.video_image ? (
                            <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                              <img src={video.video_image} alt={video.video_title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                <Play className="w-6 h-6 text-white fill-white shadow-lg" />
                              </div>
                            </div>
                          ) : (
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg bg-gradient-to-br from-[#02AAA0] to-[#02AAA0]/80">
                              <Play className="w-8 h-8" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#02AAA0] transition-colors duration-300">
                            {video.video_title}
                          </h3>
                          <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full group-hover:bg-[#02AAA0]/5 transition-colors">
                              <Clock className="w-4 h-4 text-[#02AAA0]" />
                              {video.duration || "0"} min
                            </div>
                            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full group-hover:bg-[#C9AE6C]/5 transition-colors">
                              <Video className="w-4 h-4 text-[#C9AE6C]" />
                              Video
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => router.push(`/courses/courseVideos/${course?.id}`)}
                        className={`w-full md:w-auto px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-md bg-gradient-to-r from-[#02AAA0] to-[#02AAA0]/90 text-white hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2`}
                      >
                        <Play className="w-4 h-4" />
                        Watch Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
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
