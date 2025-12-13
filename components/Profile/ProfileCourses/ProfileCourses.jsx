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
} from "lucide-react";
import { useRouter } from "next/navigation";

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

  const courses = Array.isArray(my_courses_data) ? my_courses_data : [];
  console.log(my_courses_data);

  const CourseCard = ({ course }) => {
    const progressPercentage = (course.completedLessons / course.lessons) * 100;
    return (
      <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
        {/* Course Image with Overlay */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={course.image}
            alt={course.course_name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t ${course.color} opacity-80`}
          ></div>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-white/20 backdrop-blur-md rounded-full p-4 hover:bg-white/30 transition-colors duration-200">
              <Play className="w-8 h-8 text-white fill-white" />
            </button>
          </div>

          {/* Course Level Badge */}
          <div className="absolute top-4 left-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-white/20 backdrop-blur-sm`}
            >
              {course.level}
            </span>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white text-sm font-semibold">
              {course.rating}
            </span>
          </div>
        </div>

        {/* Course Content */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-teal-600 transition-colors duration-200">
              {course.course_name}
            </h3>
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
                className={`bg-teal-600 h-2 rounded-full transition-all duration-500`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>
                {course.completedLessons} of {course.lessons} lessons completed
              </span>
              <span>{course.lessons - course.completedLessons} remaining</span>
            </div>
          </div>

          {/* Instructor */}
          <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50 rounded-xl">
            <div
              className={`w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center`}
            >
              {/* <Award className="w-5 h-5 text-white" /> */}
              <img
                src={course?.teacher_image}
                className="w-10 h-10 rounded-xl"
                alt=""
              />
            </div>
            <div>
              <div className="text-xs text-gray-500">Instructor</div>
              <div className="text-sm font-semibold text-gray-800">
                {course.teacher_name}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => router.push(`/profile/2/${course?.course_id}`)}
              className={`flex-1 bg-teal-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2`}
            >
              <Play className="w-4 h-4" />
              Continue Learning
            </button>
            <button
              onClick={() =>
                router.push(`/courses/courseVideos/${course?.course_id}`)
              }
              className={`flex-1 bg-teal-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2`}
            >
              <Eye className="w-4 h-4" />
              Details
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render course stats dynamically from Redux data
  const totalCourses = courses.length;
  const completedCourses = courses.filter(
    (course) => course.progress === 100
  ).length;
  const inProgressCourses = courses.filter(
    (course) => course.progress > 0 && course.progress < 100
  ).length;
  const averageProgress =
    courses.reduce((sum, course) => sum + course.progress, 0) / courses.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-3 text-center">
          <div className="inline-flex items-center px-6 py-3 mb-4 text-sm font-bold tracking-wider text-teal-700 uppercase transition-all duration-300 bg-gradient-to-r from-teal-100 to-teal-200 rounded-full shadow-lg hover:shadow-xl hover:scale-105">
            <LibraryBig className="w-4 h-4 mr-2" />
            My Courses
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {totalCourses}
            </div>
            <div className="text-sm text-gray-600">Total Courses</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {completedCourses}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {inProgressCourses}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {Math.round(averageProgress)}%
            </div>
            <div className="text-sm text-gray-600">Avg Progress</div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.course_id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}
