"use client";
import { Modal } from "antd";
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  Lock,
  PenTool,
  Star,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ProfileCoursesExams({ exams, getDifficultyColor }) {
  const router = useRouter();
  const [viewResultModal, setViewResultModal] = useState(false);

  return (
    <div className="space-y-8">
      {/* Exam Performance Overview */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-200">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              Exam Performance
            </h3>
            <p className="text-gray-600">
              Your assessment results and upcoming tests
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-black text-indigo-600 mb-1">
              88.5%
            </div>
            <div className="text-sm text-gray-600">Average Score</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-purple-600 mb-1">2</div>
            <div className="text-sm text-gray-600">Completed Exams</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-green-600 mb-1">1</div>
            <div className="text-sm text-gray-600">Available Now</div>
          </div>
        </div>
      </div>
      
      {/* Cards arranged horizontally */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-transparent hover:border-[#02AAA0]/30 overflow-hidden"
          >
            <div className="p-6">
              {/* Header Section */}
              <div className="flex flex-col gap-4 mb-6">
                <div className="relative">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 ${
                      exam.status === "completed"
                        ? "bg-gradient-to-br from-emerald-400 to-emerald-600"
                        : exam.status === "available"
                        ? "bg-gradient-to-br from-[#02AAA0] to-[#02AAA0]/80"
                        : "bg-gradient-to-br from-gray-300 to-gray-400"
                    }`}
                  >
                    {exam.status === "completed" ? (
                      <Trophy className="w-8 h-8 text-white" />
                    ) : exam.status === "available" ? (
                      <Target className="w-8 h-8 text-white" />
                    ) : (
                      <Lock className="w-8 h-8 text-white" />
                    )}
                  </div>
                  {exam.status === "available" && (
                    <div className="absolute -inset-2 bg-gradient-to-r from-[#02AAA0] to-[#C9AE6C] rounded-3xl opacity-20 animate-ping"></div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#02AAA0] transition-colors duration-300">
                      {exam.title}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(
                        exam.difficulty
                      )}`}
                    >
                      {exam.difficulty}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold inline-block w-fit ${
                        exam.status === "completed"
                          ? "bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-700 border border-emerald-300"
                          : exam.status === "available"
                          ? "bg-gradient-to-r from-[#02AAA0]/10 to-[#02AAA0]/20 text-[#02AAA0] border border-[#02AAA0]/30"
                          : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 border border-gray-300"
                      }`}
                    >
                      {exam.type}
                    </span>
                    <span className="text-sm text-gray-500 capitalize font-semibold">
                      Status: {exam.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 gap-3 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 text-center border border-blue-200">
                  <PenTool className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <div className="font-bold text-blue-900 text-sm">
                    {exam.questions} Questions
                  </div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-3 text-center border border-amber-200">
                  <Clock className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                  <div className="font-bold text-amber-900 text-sm">
                    {exam.duration}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 text-center border border-purple-200">
                  <Calendar className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                  <div className="font-bold text-purple-900 text-sm">
                    Due: {exam.dueDate}
                  </div>
                </div>
              </div>

              {/* Topics */}
              <div className="mb-6">
                <div className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#02AAA0]" />
                  Topics Covered
                </div>
                <div className="flex flex-wrap gap-2">
                  {exam.topics?.map((topic, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-[#02AAA0]/10 to-[#C9AE6C]/10 text-gray-700 rounded-lg text-xs font-medium border border-[#02AAA0]/20 hover:border-[#02AAA0]/40 transition-colors"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-auto">
                {exam.status === "available" ? (
                  <button
                    onClick={() => router.push(`/exams/exam-courses/exam-units/1/1/2`)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-[#02AAA0] to-[#02AAA0]/90 text-white rounded-2xl font-bold shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 justify-center hover:shadow-2xl"
                  >
                    <Zap className="w-5 h-5" />
                    Start Exam
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : exam.status === "completed" ? (
                  <button
                    onClick={() => setViewResultModal(true)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-[#C9AE6C] to-[#C9AE6C]/90 text-white rounded-2xl font-bold shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 justify-center hover:shadow-xl"
                  >
                    <Eye className="w-5 h-5" />
                    View Results
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-400 rounded-2xl font-bold cursor-not-allowed flex items-center gap-2 justify-center"
                  >
                    <Lock className="w-5 h-5" />
                    Locked
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={viewResultModal} onCancel={() => setViewResultModal(false)} footer={null}>
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Quiz Completed!
          </h2>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl border border-green-100 mb-6">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {1/3}
            </div>
            <p className="text-green-700">
              You scored 33%
            </p>
          </div>
          <button
            onClick={() => setViewResultModal(false)}
            className="px-6 py-3 bg-gradient-to-r from-[#02AAA0] to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </Modal>
    </div>
  );
}