"use client";

import { Clock, Users, Star, Brain } from "lucide-react";

export default function CourseHeader({ course }) {
  return (
    <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3">
          <div className="relative">
            <img
              src={course.image}
              alt={course.course_name}
              className="w-full h-48 object-cover rounded-xl"
            />
            <button className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors rounded-xl">
              <Brain className="w-12 h-12 text-white" />
            </button>
          </div>
        </div>

        <div className="lg:w-2/3">
          <h1 className="text-3xl font-bold text-[#023f4d] mb-4">
            {course.course_name}
          </h1>
          <p className="text-gray-600 mb-6">{course.course_descreption}</p>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-teal-600" />
              <span className="text-sm text-gray-600">
                {course.Duration || "N/A"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-teal-600" />
              <span className="text-sm text-gray-600">
                {course.lessons || 0} lessons
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-gray-600">
                {course.level || "All Levels"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
