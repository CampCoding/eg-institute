"use client";
import {
  HelpCircle,
  FileText,
  Sparkles,
} from "lucide-react";
import React, { useState } from "react";
import ExamPdfQuestions from "../../../../../../../components/Exams/ExamQuestions/ExamPdfQuestions/ExamPdfQuestions";
import ExamOnlineQuestions from "../../../../../../../components/Exams/ExamQuestions/ExamOnlineQuestions/ExamOnlineQuestions";

const tabs = [
  {
    id: 1,
    name: "PDF Exam",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: 2,
    name: "Multiple Choice Online",
    icon: <HelpCircle className="w-5 h-5" />,
  },
];

export default function ExamSystem() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-100 overflow-hidden">
      {/* Decorative floating lights */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-teal-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-blue-200/15 to-indigo-200/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-gradient-to-r from-emerald-200/25 to-teal-200/25 rounded-full blur-2xl animate-bounce delay-500"></div>

        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Wrapper */}
      <div className="max-w-4xl mx-auto p-6 md:py-16 relative z-10">
        {/* Top banner message */}
        <div className="flex justify-center items-center space-x-2 bg-gradient-to-r from-teal-100 to-cyan-100 rounded-full px-6 py-3 mb-8 animate-fade-in shadow-md">
          <Sparkles className="w-5 h-5 text-teal-600 animate-spin-slow" />
          <span className="text-teal-700 font-semibold tracking-wide">
            Choose your preferred exam format
          </span>
          <Sparkles className="w-5 h-5 text-teal-600 animate-spin-slow" />
        </div>

        {/* Tab switcher */}
        <div className="flex bg-white rounded-2xl p-2 mb-8 shadow-xl border border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform text-sm md:text-base
              ${activeTab === tab.id
                  ? "bg-gradient-to-r from-[#02AAA0] to-cyan-500 text-white shadow-md scale-105"
                  : "text-gray-600 hover:text-[#02AAA0]"
                }`}
            >
              <div className={`transition-transform duration-300 ${activeTab === tab.id ? "rotate-12" : ""}`}>
                {tab.icon}
              </div>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden p-6 md:p-10 transition-all duration-500">
          <div className="transition-opacity duration-500 ease-in-out">
            <ExamPdfQuestions activeTab={activeTab} />
            <ExamOnlineQuestions activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>
      </div>
    </div>
  );
}
