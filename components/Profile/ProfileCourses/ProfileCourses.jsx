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
  Star,
  Award,
  Eye,
  Clock,
  Users,
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

  useEffect(() => {
    const UserData = JSON.parse(localStorage.getItem("eg_user_data"));
    if (UserData?.student_id) {
      dispatch(
        handleGetMyCourses({ data: { student_id: UserData?.student_id } })
      );
    }
  }, [dispatch]);

  // Handle data safely
  const courses = Array.isArray(my_courses_data) ? my_courses_data : [];
  
  // Calculate statistics based on actual data
  const calculateStats = () => {
    let totalCourses = 0;
    let completedCourses = 0;
    let inProgressCourses = 0;
    let totalProgress = 0;

    if (courses.length > 0) {
      totalCourses = courses.length;
      
      courses.forEach(course => {
        // Extract progress from the data - you might need to adjust based on actual API
        const progress = course.progress || course.completedLessons || 0;
        const totalLessons = course.lessons || 1;
        
        // Calculate percentage
        const progressPercentage = (progress / totalLessons) * 100;
        
        if (progressPercentage === 100) {
          completedCourses++;
        } else if (progressPercentage > 0 && progressPercentage < 100) {
          inProgressCourses++;
        }
        
        totalProgress += progressPercentage;
      });
    }

    const averageProgress = totalCourses > 0 ? totalProgress / totalCourses : 0;

    return {
      totalCourses,
      completedCourses,
      inProgressCourses,
      averageProgress: Math.round(averageProgress)
    };
  };

  const stats = calculateStats();

  const CourseCard = ({ course }) => {
    // Calculate progress based on available data
    const totalLessons = parseInt(course.lessons) || 1;
    const completedLessons = parseInt(course.completedLessons) || 0;
    const progressPercentage = (completedLessons / totalLessons) * 100;

    // Determine level color
    const getLevelColor = (level) => {
      switch(level?.toLowerCase()) {
        case 'beginner': return 'from-green-400 to-green-600';
        case 'intermediate': return 'from-blue-400 to-blue-600';
        case 'advanced': return 'from-purple-400 to-purple-600';
        default: return 'from-teal-400 to-teal-600';
      }
    };

    // Determine status color
    const getStatusColor = (status) => {
      switch(status?.toLowerCase()) {
        case 'accepted': return 'bg-green-100 text-green-800';
        case 'pending': return 'bg-yellow-100 text-yellow-800';
        case 'rejected': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    // Format subscription type
    const formatSubscriptionType = (type) => {
      return type === 'private' ? 'Private Course' : 
             type === 'group' ? 'Group Course' : 
             'Online Course';
    };

    return (
      <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-gray-100">
        {/* Course Image with Overlay */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={course.image || "/api/placeholder/400/200"}
            alt={course.course_name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={(e) => {
              e.target.src = "/api/placeholder/400/200";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={() => router.push(`/profile/2/${course?.course_id}`)}
              className="bg-white/20 backdrop-blur-md rounded-full p-4 hover:bg-white/30 transition-all duration-200 transform hover:scale-110"
            >
              <Play className="w-8 h-8 text-white fill-white" />
            </button>
          </div>

          {/* Course Level Badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getLevelColor(course.level)}`}>
              {course.level || "All Levels"}
            </span>
          </div>

          {/* Course Type Badge */}
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600`}>
              {formatSubscriptionType(course.subscription_type)}
            </span>
          </div>

          {/* Course Duration */}
          <div className="absolute bottom-4 left-4 flex items-center gap-1">
            <Clock className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">
              {course.Duration || "Flexible"}
            </span>
          </div>
        </div>

        {/* Course Content */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-teal-600 transition-colors duration-200 line-clamp-1">
              {course.course_name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {course.course_descreption || course.overview || "No description available"}
            </p>
          </div>

          {/* Status Badge */}
          <div className="mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
              {course.status?.toUpperCase() || "ACTIVE"}
            </span>
          </div>

          {/* Progress Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">
                Progress
              </span>
              <span className="text-sm font-bold text-teal-600">
                {progressPercentage.toFixed(0)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className={`bg-gradient-to-r from-teal-500 to-teal-600 h-2 rounded-full transition-all duration-500`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>
                {completedLessons} of {totalLessons} lessons completed
              </span>
              <span>{totalLessons - completedLessons} remaining</span>
            </div>
          </div>

          {/* Course Details */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
              <Users className="w-4 h-4 text-gray-500" />
              <div className="text-xs">
                <div className="text-gray-500">Group</div>
                <div className="font-semibold text-gray-800">
                  {course.group_name?.split("-")[1]?.trim() || "Private"}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
              <Award className="w-4 h-4 text-gray-500" />
              <div className="text-xs">
                <div className="text-gray-500">Price</div>
                <div className="font-semibold text-gray-800">
                  {course.subscription_type === 'private' 
                    ? `$${course.private_price}` 
                    : `$${course.group_price}`}
                </div>
              </div>
            </div>
          </div>

          {/* Instructor */}
          <div className="flex items-center gap-3 mb-6 p-3 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
              <img
                src={course?.teacher_image || "/api/placeholder/40/40"}
                className="w-full h-full object-cover"
                alt={course.teacher_name}
                onError={(e) => {
                  e.target.src = "/api/placeholder/40/40";
                }}
              />
            </div>
            <div>
              <div className="text-xs text-gray-500">Instructor</div>
              <div className="text-sm font-semibold text-gray-800">
                {course.teacher_name || "Not Assigned"}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => router.push(`/profile/2/${course?.course_id}`)}
              className={`flex-1 bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2`}
            >
              <Play className="w-4 h-4" />
              Continue Learning
            </button>
            <button
              onClick={() =>
                router.push(`/courses/courseVideos/${course?.course_id}`)
              }
              className={`flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2`}
            >
              <Eye className="w-4 h-4" />
              Details
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Tabs component
  const Tabs = () => (
    <div className="flex justify-center mb-8">
      <div className="bg-white rounded-full p-1 shadow-lg inline-flex">
        {["all", "in-progress", "completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
              activeTab === tab
                ? "bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-md"
                : "text-gray-600 hover:text-teal-600"
            }`}
          >
            {tab === "all" && "All Courses"}
            {tab === "in-progress" && "In Progress"}
            {tab === "completed" && "Completed"}
          </button>
        ))}
      </div>
    </div>
  );

  // Filter courses based on active tab
  const filteredCourses = courses.filter(course => {
    const totalLessons = parseInt(course.lessons) || 1;
    const completedLessons = parseInt(course.completedLessons) || 0;
    const progressPercentage = (completedLessons / totalLessons) * 100;

    switch(activeTab) {
      case "in-progress":
        return progressPercentage > 0 && progressPercentage < 100;
      case "completed":
        return progressPercentage === 100;
      default:
        return true;
    }
  });

  if(my_courses_loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spin size="large" spinning />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center px-6 py-3 mb-4 text-sm font-bold tracking-wider text-teal-700 uppercase transition-all duration-300 bg-gradient-to-r from-teal-100 to-teal-200 rounded-full shadow-lg hover:shadow-xl hover:scale-105">
            <LibraryBig className="w-4 h-4 mr-2" />
            My Learning Dashboard
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {stats.totalCourses}
                </div>
                <div className="text-sm text-gray-600">Total Courses</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {stats.completedCourses}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {stats.inProgressCourses}
                </div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {stats.averageProgress}%
                </div>
                <div className="text-sm text-gray-600">Avg Progress</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        {/* <Tabs /> */}

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course.course_id || course.subscription_id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No {activeTab !== "all" ? activeTab.replace("-", " ") : ""} Courses Found
            </h3>
            <p className="text-gray-500 mb-6">
              {activeTab === "all" 
                ? "You haven't enrolled in any courses yet." 
                : `You don't have any ${activeTab.replace("-", " ")} courses.`}
            </p>
            <button
              onClick={() => router.push("/courses")}
              className="px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
            >
              Browse Courses
            </button>
          </div>
        )}

        {/* Footer Stats */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500">
            <p className="mb-2">Showing {filteredCourses.length} of {stats.totalCourses} courses • 
              <span className="text-teal-600 font-medium mx-2">{stats.averageProgress}%</span>
              average completion rate
            </p>
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}