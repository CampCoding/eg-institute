"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleGetMyCourses } from "../../../libs/features/coursesSlice";
import {
  LibraryBig,
  Play,
  CheckCircle,
  BookOpen,
  TrendingUp,
  Globe,
  Clock,
  Users,
  GraduationCap,
  Layers,
  Eye,
  ArrowRight,
  Sparkles,
  Calendar,
  CheckCircle2,
  Circle,
  PlayCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Spin, Progress } from "antd";

export default function ProfileCourses() {
  const [activeTab, setActiveTab] = useState("all");
  const dispatch = useDispatch();
  const router = useRouter();

  const { my_courses_loading, my_courses_data } = useSelector(
    (state) => state?.courses
  );
  const UserData =
    typeof window !== "undefined"
      ? (JSON.parse(localStorage.getItem("eg_user_data")) ??
        JSON.parse(sessionStorage.getItem("eg_user_data")))
      : null;

  useEffect(() => {
    const UserData =
      JSON.parse(localStorage.getItem("eg_user_data")) ??
      JSON.parse(sessionStorage.getItem("eg_user_data"));
    if (UserData?.student_id) {
      dispatch(
        handleGetMyCourses({ data: { student_id: UserData?.student_id } })
      );
    }
  }, [dispatch]);

  const courses = Array.isArray(my_courses_data) ? my_courses_data : [];

  const calculateStats = () => {
    let totalCourses = courses.length;
    let completedCourses = 0;
    let inProgressCourses = 0;
    let totalProgress = 0;

    courses.forEach((course) => {
      const completedLessons = parseInt(course.completedLessons) || 0;
      const totalLessons = parseInt(course.lessons) || 1;
      const progressPercentage = (completedLessons / totalLessons) * 100;

      if (progressPercentage === 100) {
        completedCourses++;
      } else if (progressPercentage > 0) {
        inProgressCourses++;
      }
      totalProgress += progressPercentage;
    });

    return {
      totalCourses,
      completedCourses,
      inProgressCourses,
      averageProgress:
        totalCourses > 0 ? Math.round(totalProgress / totalCourses) : 0,
    };
  };

  const stats = calculateStats();

  const CourseCard = ({ course }) => {
    const totalLessons = parseInt(course.lessons) || 1;
    const completedLessons = parseInt(course.completedLessons) || 0;
    const progressPercentage = Math.round(
      (completedLessons / totalLessons) * 100
    );

    const getLevelConfig = (level) => {
      switch (level?.toLowerCase()) {
        case "beginner":
          return {
            color: "bg-emerald-500",
            lightBg: "bg-emerald-50",
            text: "text-emerald-700",
            icon: "🌱",
          };
        case "intermediate":
          return {
            color: "bg-blue-500",
            lightBg: "bg-blue-50",
            text: "text-blue-700",
            icon: "📚",
          };
        case "advanced":
          return {
            color: "bg-purple-500",
            lightBg: "bg-purple-50",
            text: "text-purple-700",
            icon: "🎯",
          };
        default:
          return {
            color: "bg-gray-500",
            lightBg: "bg-gray-50",
            text: "text-gray-700",
            icon: "📖",
          };
      }
    };

    const getStatusConfig = (status) => {
      switch (status?.toLowerCase()) {
        case "accepted":
          return {
            bg: "bg-gradient-to-r from-green-500 to-emerald-500",
            text: "Active",
            icon: <CheckCircle2 className="w-3 h-3" />,
          };
        case "pending":
          return {
            bg: "bg-gradient-to-r from-amber-500 to-orange-500",
            text: "Pending",
            icon: <Circle className="w-3 h-3" />,
          };
        case "rejected":
          return {
            bg: "bg-gradient-to-r from-red-500 to-rose-500",
            text: "Rejected",
            icon: <Circle className="w-3 h-3" />,
          };
        default:
          return {
            bg: "bg-gradient-to-r from-gray-500 to-gray-600",
            text: "Unknown",
            icon: <Circle className="w-3 h-3" />,
          };
      }
    };

    const getTypeConfig = (type) => {
      switch (type?.toLowerCase()) {
        case "private":
          return {
            bg: "bg-gradient-to-r from-violet-500 to-purple-600",
            icon: <GraduationCap className="w-3.5 h-3.5" />,
            text: "1-on-1 Private",
          };
        case "group":
          return {
            bg: "bg-gradient-to-r from-blue-500 to-cyan-500",
            icon: <Users className="w-3.5 h-3.5" />,
            text: "Group Class",
          };
        default:
          return {
            bg: "bg-gradient-to-r from-teal-500 to-teal-600",
            icon: <Globe className="w-3.5 h-3.5" />,
            text: "Online",
          };
      }
    };

    const levelConfig = getLevelConfig(course.level);
    const statusConfig = getStatusConfig(course.status);
    const typeConfig = getTypeConfig(course.subscription_type);

    const price =
      course.subscription_type === "private"
        ? course.private_price
        : course.group_price;

    return (
      <div className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100/80 hover:border-teal-200">
        {/* Top Section - Image */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={course.image || "/api/placeholder/400/200"}
            alt={course.course_name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.target.src = "/api/placeholder/400/200";
            }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          {/* Top Badges Row */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            {/* Status Badge */}
            <div
              className={`${statusConfig.bg} px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg`}
            >
              {statusConfig.icon}
              <span className="text-white text-xs font-semibold">
                {statusConfig.text}
              </span>
            </div>

            {/* Course Type Badge
            <div
              className={`${typeConfig.bg} px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg`}
            >
              {typeConfig.icon}
              <span className="text-white text-xs font-semibold">
                {typeConfig.text}
              </span>
            </div> */}
          </div>

          {/* Play Button - Center */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button
              onClick={() =>
                router.push(
                  `/profile/${UserData?.student_id}/${course?.related_course_id}`
                )
              }
              className="bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-2xl hover:bg-white transition-all duration-200 transform hover:scale-110 group/btn"
            >
              <PlayCircle className="w-10 h-10 text-teal-600 group-hover/btn:text-teal-700" />
            </button>
          </div>

          {/* Bottom Info Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center justify-between">
              {/* Duration & Lessons */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-white" />
                  <span className="text-white text-xs font-medium">
                    {course.Duration || "Flexible"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                  <Layers className="w-3.5 h-3.5 text-white" />
                  <span className="text-white text-xs font-medium">
                    {course.lessons} Lessons
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-lg">
                <span className="text-teal-700 font-bold text-sm">
                  ${price}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Course Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-teal-700 transition-colors">
            {course.course_name}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">
            {course.course_descreption ||
              course.overview ||
              "No description available"}
          </p>

          {/* Progress Section */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-700">
                Course Progress
              </span>
              <span className="text-xs font-bold text-teal-600">
                {completedLessons}/{totalLessons} lessons
              </span>
            </div>
            <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-xs text-gray-400">
                {progressPercentage === 0
                  ? "Not started"
                  : progressPercentage === 100
                    ? "Completed! 🎉"
                    : "In progress"}
              </span>
              <span className="text-xs font-semibold text-gray-600">
                {progressPercentage}%
              </span>
            </div>
          </div>

          {/* Instructor & Group Info */}
          <div className="flex items-center gap-3 mb-5 p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-100">
            {/* Instructor */}
            <div className="flex items-center gap-2.5 flex-1">
              <div className="relative">
                <img
                  src={course.teacher_image || "/api/placeholder/40/40"}
                  alt={course.teacher_name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                  onError={(e) => {
                    e.target.src = "/api/placeholder/40/40";
                  }}
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                  Instructor
                </p>
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {course.teacher_name || "TBA"}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-10 bg-gray-200"></div>

            {/* Group */}
            <div className="flex items-center gap-2.5 flex-1">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                  Group
                </p>
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {course.group_name || "Private Session"}
                </p>
              </div>
            </div>
          </div>

          {/* Start Date */}
          {course.subscription_start_date && (
            <div className="flex items-center gap-2 mb-5 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>
                Started:{" "}
                {new Date(course.subscription_start_date).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }
                )}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() =>
                router.push(
                  `/profile/${UserData?.student_id}/${course?.related_course_id}`
                )
              }
              className="flex-1 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-3 px-4 rounded-xl font-semibold shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
            >
              <Play className="w-4 h-4" />
              {progressPercentage === 0 ? "Start Learning" : "Continue"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() =>
                router.push(
                  `/courses/courseVideos/${course?.related_course_id}`
                )
              }
              className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const filteredCourses = courses.filter((course) => {
    const totalLessons = parseInt(course.lessons) || 1;
    const completedLessons = parseInt(course.completedLessons) || 0;
    const progressPercentage = (completedLessons / totalLessons) * 100;

    switch (activeTab) {
      case "in-progress":
        return progressPercentage > 0 && progressPercentage < 100;
      case "completed":
        return progressPercentage === 100;
      default:
        return true;
    }
  });

  if (my_courses_loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-gradient-to-br from-teal-50 via-white to-blue-50">
        <div className="text-center">
          <Spin size="large" />
          <p className="mt-4 text-gray-500 font-medium">
            Loading your courses...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center px-5 py-2.5 mb-4 text-sm font-bold tracking-wider text-teal-700 bg-gradient-to-r from-teal-100 to-emerald-100 rounded-full shadow-md">
            <Sparkles className="w-4 h-4 mr-2" />
            My Learning Journey
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Your Enrolled Courses
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Track your progress, continue learning, and achieve your Arabic
            language goals
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Courses",
              value: stats.totalCourses,
              icon: BookOpen,
              gradient: "from-blue-500 to-indigo-600",
              lightBg: "bg-blue-50",
            },
            {
              label: "Completed",
              value: stats.completedCourses,
              icon: CheckCircle,
              gradient: "from-emerald-500 to-green-600",
              lightBg: "bg-emerald-50",
            },
            {
              label: "In Progress",
              value: stats.inProgressCourses,
              icon: TrendingUp,
              gradient: "from-amber-500 to-orange-600",
              lightBg: "bg-amber-50",
            },
            {
              label: "Avg Progress",
              value: `${stats.averageProgress}%`,
              icon: Globe,
              gradient: "from-violet-500 to-purple-600",
              lightBg: "bg-violet-50",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100/80"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.subscription_id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No Courses Found
            </h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              {activeTab === "all"
                ? "You haven't enrolled in any courses yet. Start your learning journey today!"
                : `You don't have any ${activeTab.replace("-", " ")} courses.`}
            </p>
            <button
              onClick={() => router.push("/courses")}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-full font-semibold shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Explore Courses
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
