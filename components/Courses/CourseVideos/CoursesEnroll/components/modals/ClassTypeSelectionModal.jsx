"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { X, ArrowLeft, Users, UserCheck, CheckCircle } from "lucide-react";
import { handleGetAllCourseTeacherGroups } from "@/libs/features/coursesSlice";

export default function ClassTypeSelectionModal({
  isOpen,
  onClose,
  onSelectType,
  onBack,
  teacherId,
  isAbsoluteBeginner,
  groupPrice,
  privatePrice,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!teacherId || !isOpen) return;
    dispatch(
      handleGetAllCourseTeacherGroups({ data: { teacher_id: teacherId } })
    );
  }, [isOpen, teacherId, dispatch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000] p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-cyan-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#023f4d]">
                Choose Your Learning Path
              </h2>
              <p className="text-gray-600 text-sm">
                Select the type of classes that works best for you
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Group Classes */}
            <button
              onClick={() => onSelectType("group")}
              className="group p-8 rounded-2xl border-2 border-gray-200 hover:border-teal-500 hover:bg-teal-50 transition-all duration-300 text-left"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-[#023f4d] mb-3">
                Group Classes
              </h3>

              <p className="text-gray-600 mb-6">
                Learn with other students in an interactive and engaging
                environment
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-teal-600" />
                  <span>4-8 students per class</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-teal-600" />
                  <span>Fixed schedule</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-teal-600" />
                  <span>Interactive activities</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-teal-600" />
                  <span>More affordable</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-3xl font-bold text-teal-600">
                  ${groupPrice}
                </div>
                <div className="text-sm text-gray-500">per month</div>
              </div>
            </button>

            {/* Private Classes */}
            <button
              onClick={() => onSelectType("private")}
              className="group p-8 rounded-2xl border-2 border-gray-200 hover:border-cyan-500 hover:bg-cyan-50 transition-all duration-300 text-left relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </div>

              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <UserCheck className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-[#023f4d] mb-3">
                Private Classes
              </h3>

              <p className="text-gray-600 mb-6">
                One-on-one personalized lessons tailored to your goals and pace
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-cyan-600" />
                  <span>Individual attention</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-cyan-600" />
                  <span>Flexible schedule</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-cyan-600" />
                  <span>Customized curriculum</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-cyan-600" />
                  <span>Faster progress</span>
                </div>
                {!isAbsoluteBeginner && (
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle className="w-5 h-5 text-cyan-600" />
                    <span>Includes placement test & trial</span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-3xl font-bold text-cyan-600">
                  ${privatePrice}
                </div>
                <div className="text-sm text-gray-500">per month</div>
              </div>
            </button>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Teacher Selection
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
