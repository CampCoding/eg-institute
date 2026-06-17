"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Clock,
  BookOpen,
  Users,
  Award,
  PlayCircle,
} from "lucide-react";
import ProfileCourseLessons from "@/components/Profile/ProfileCourses/ProfileCourseDetails/ProfileCourseLessons/ProfileCourseLessons";
import ProfileCoursesLives from "@/components/Profile/ProfileCourses/ProfileCourseDetails/ProfileCoursesLives/ProfileCoursesLives";
import ProfileCoursesBooks from "@/components/Profile/ProfileCourses/ProfileCourseDetails/ProfileCoursesBooks/ProfileCoursesBooks";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  handleGetCourseVideos,
  clearCourseVideos,
} from "../../../../../libs/features/coursesSlice";
import { Spin } from "antd";

export default function EnhancedCourseDetailPage() {
  const [activeTab, setActiveTab] = useState("Video");
  const [animateProgress, setAnimateProgress] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { id, course_id } = useParams();
  const searchParams = useSearchParams();

  // Get group_id from search params
  const groupId = searchParams.get("group_id");

  const {
    course_videos_data,
    course_videos_loading,
    course_videos_error,
    my_courses_data,
  } = useSelector((state) => state.courses);

  // Find current course from my_courses_data
  const currentCourse = my_courses_data?.find(
    (course) =>
      course.related_course_id === course_id || course.course_id === course_id
  );

  useEffect(() => {
    setAnimateProgress(true);

    const UserData =
      JSON.parse(localStorage.getItem("eg_user_data")) ??
      JSON.parse(sessionStorage.getItem("eg_user_data"));

    // Use groupId from search params
    const finalGroupId = groupId || currentCourse?.group_id;

    if (UserData?.student_id && finalGroupId && !course_videos_data) {
      dispatch(
        handleGetCourseVideos({
          data: {
            group_id: parseInt(finalGroupId),
            student_id: parseInt(UserData.student_id),
          },
        })
      );
    }

    return () => {
      dispatch(clearCourseVideos());
    };
  }, [dispatch, groupId, currentCourse?.group_id]);

  // Extract units from API response - Note: it's in 'data' not 'message'
  const units = course_videos_data?.data || [];

  // Calculate stats
  const totalVideos = Array.isArray(units)
    ? units.reduce((acc, unit) => acc + (unit.videos?.length || 0), 0)
    : 0;

  const completedVideos = Array.isArray(units)
    ? units.reduce((acc, unit) => {
        const completed =
          unit.videos?.filter((v) => v.watched === "1" || v.is_watched === true)
            .length || 0;
        return acc + completed;
      }, 0)
    : 0;

  const progressPercentage =
    totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;

  // Course info
  const course = {
    id: course_id,
    title: currentCourse?.course_name || "Course Details",
    subtitle: currentCourse?.course_descreption || "",
    description: currentCourse?.overview || "",
    image: currentCourse?.image,
    progress: progressPercentage,
    totalLessons: totalVideos,
    completedLessons: completedVideos,
    duration: currentCourse?.Duration || "8 weeks",
    level: currentCourse?.level || "Beginner",
    instructor: currentCourse?.teacher_name || "Instructor",
    group_id: groupId || currentCourse?.group_id,
  };

  // Mock data
  const liveClasses = [];
  const books = [];

  const tabs = [
    { id: "Video", label: "Videos", icon: PlayCircle, count: totalVideos },
    { id: "books", label: "Books", icon: BookOpen, count: books.length },
    { id: "lives", label: "Lives", icon: Users, count: liveClasses.length },
  ];

  const renderTabContent = () => {
    if (course_videos_loading) {
      return (
        <div className="flex justify-center items-center py-20">
          <Spin size="large" />
        </div>
      );
    }

    if (course_videos_error) {
      return (
        <div className="bg-white rounded-3xl p-12 text-center">
          <p className="text-red-500 mb-4">{course_videos_error}</p>
          <button
            onClick={() => {
              const UserData =
                JSON.parse(localStorage.getItem("eg_user_data")) ??
                JSON.parse(sessionStorage.getItem("eg_user_data"));
              const finalGroupId = groupId || currentCourse?.group_id;
              if (UserData?.student_id && finalGroupId) {
                dispatch(
                  handleGetCourseVideos({
                    data: {
                      group_id: parseInt(finalGroupId),
                      student_id: parseInt(UserData.student_id),
                    },
                  })
                );
              }
            }}
            className="px-6 py-3 bg-teal-600 text-white rounded-xl"
          >
            Try Again
          </button>
        </div>
      );
    }

    switch (activeTab) {
      case "Video":
        return (
          <ProfileCourseLessons
            units={Array.isArray(units) ? units : []}
            course={course}
            loading={course_videos_loading}
          />
        );
      case "lives":
        return <ProfileCoursesLives liveClasses={liveClasses} />;
      case "books":
        return (
          <ProfileCoursesBooks
            animateProgress={animateProgress}
            books={books}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#02AAA0]/5 via-white to-[#C9AE6C]/5">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#02AAA0]/90 via-[#02AAA0]/80 to-[#C9AE6C]/70"></div>

        <div className="absolute inset-0 flex flex-col justify-center px-6">
          <div className="max-w-7xl mx-auto w-full">
            <button
              onClick={() => router.push(`/profile/${id}`)}
              className="flex items-center gap-2 text-white/90 hover:text-white mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to My Courses</span>
            </button>

            <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
              <div className="flex-1">
                <span className="inline-block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-bold mb-6 capitalize">
                  {course.level} Level
                </span>

                <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                  {course.title}
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-6 line-clamp-2">
                  {course.subtitle}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-white/90">
                  <div className="flex items-center gap-2 bg-white/10 rounded-2xl px-4 py-2.5">
                    <Award className="w-5 h-5" />
                    <span className="text-sm">{course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 rounded-2xl px-4 py-2.5">
                    <Clock className="w-5 h-5" />
                    <span className="text-sm">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 rounded-2xl px-4 py-2.5">
                    <BookOpen className="w-5 h-5" />
                    <span className="text-sm">
                      {course.totalLessons} lessons
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Card */}
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl min-w-[250px]">
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <svg className="w-28 h-28 md:w-32 md:h-32 transform -rotate-90">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        stroke="#02AAA0"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        strokeDashoffset={`${
                          2 * Math.PI * 56 * (1 - course.progress / 100)
                        }`}
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl md:text-3xl font-black text-gray-900">
                        {course.progress}%
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {course.completedLessons} of {course.totalLessons} completed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-16 md:-mt-20 relative z-10">
        {/* Tabs */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl mb-8 md:mb-12 overflow-hidden">
          <div className="flex">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 md:gap-3 py-5 md:py-8 px-3 md:px-6 font-bold text-sm md:text-lg transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-[#02AAA0] to-[#02AAA0]/90 text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  {tab.count > 0 && (
                    <span
                      className={`px-2 py-0.5 md:py-1 rounded-full text-xs font-bold ${
                        activeTab === tab.id
                          ? "bg-white/20 text-white"
                          : "bg-[#02AAA0]/10 text-[#02AAA0]"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-16">{renderTabContent()}</div>
      </div>
    </div>
  );
}
