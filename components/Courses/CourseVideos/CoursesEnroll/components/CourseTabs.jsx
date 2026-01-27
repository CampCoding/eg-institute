"use client";

import { useState } from "react";
import {
  CheckCircle,
  FolderOpen,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import LevelCard from "./LevelCard"; // ✅ Local import

export default function CourseTabs({ course }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedUnits, setExpandedUnits] = useState(new Set());

  const toggleUnit = (unitId) => {
    const newExpandedUnits = new Set(expandedUnits);
    if (newExpandedUnits.has(unitId)) newExpandedUnits.delete(unitId);
    else newExpandedUnits.add(unitId);
    setExpandedUnits(newExpandedUnits);
  };

  const willLearnItems = course.wiil_learn?.split("**CAMP**") || [];
  const features = course.feature?.split("**CAMP**") || [];

  const levels = [
    {
      id: 1,
      level: "Level 1",
      title: course.course_name,
      duration: course.Duration,
      description: course.course_descreption,
      points: willLearnItems,
      link: `/courses/courseContent/${course.course_id}`,
      button: "Enroll in Level 1",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6 overflow-x-auto">
          {["overview", "units", "instructor"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                activeTab === tab
                  ? "border-[#023f4d] text-[#023f4d]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace("_", " ")}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {activeTab === "overview" && (
          <div>
            <h3 className="text-xl font-bold text-[#023f4d] mb-4">
              Course Overview
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              {course.overview}
            </p>

            <h4 className="text-lg font-bold text-[#023f4d] mb-4">
              What you'll learn:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {willLearnItems.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <h4 className="text-lg font-bold text-[#023f4d] mt-8 mb-4">
              Course Features:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "units" && (
          <div>
            <h3 className="text-xl font-bold text-[#023f4d] mb-6">
              Course Content
            </h3>
            <div className="space-y-4">
              {(course.course_content || []).map((unit) => (
                <div
                  key={unit.unit_id}
                  className="border border-gray-200 rounded-xl overflow-hidden hover:border-[#023f4d] transition-colors"
                >
                  <button
                    onClick={() => toggleUnit(unit.unit_id)}
                    className="w-full p-6 bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <FolderOpen className="w-6 h-6 text-[#023f4d]" />
                      <div className="text-left">
                        <h4 className="text-lg font-bold text-[#023f4d]">
                          {unit.unit_title}
                        </h4>
                      </div>
                    </div>
                    {expandedUnits.has(unit.unit_id) ? (
                      <ChevronDown className="w-5 h-5 text-[#023f4d]" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-[#023f4d]" />
                    )}
                  </button>

                  {expandedUnits.has(unit.unit_id) && (
                    <div className="border-t border-gray-200 bg-gray-50 p-6">
                      <p className="text-gray-600">
                        Click "Enroll" to access full content
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "instructor" && (
          <div>
            <h3 className="text-xl font-bold text-[#023f4d] mb-4">
              About the Instructors
            </h3>
            <div className="space-y-6">
              {(course.Instructors || []).map((instructor, idx) => (
                <div key={idx} className="grid grid-cols-[auto_1fr] gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                    {instructor.teacher_image ? (
                      <img
                        src={instructor.teacher_image}
                        alt={instructor.teacher_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#023f4d] text-white font-bold text-xl">
                        {instructor.teacher_name?.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#023f4d]">
                      {instructor.teacher_name}
                    </h4>
                    <p className="text-gray-600 mb-2">
                      Experience: {instructor.experience_hours} hours
                    </p>
                    <p className="text-gray-600 text-sm">
                      Certified Arabic language instructor
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "levels" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {levels.map((level) => (
              <LevelCard key={level.id} item={level} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
