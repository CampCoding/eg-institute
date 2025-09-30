"use client";
import React from "react";
import {
  ChevronDown,
  ChevronUp,
  PlayCircle,
  Clock,
  BookOpen,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Sample data (same as you provided)
export const courseUnitsData = [
  {
    id: 1,
    name: "Unit 1: Introduction & Greetings",
    desc: "Start your journey with basic Arabic greetings, self-introduction, and cultural etiquette.",
    image: "/images/student-connecting-with-his-smartphone.jpg",
    duration: "60 min",
    lessons: [
      { id: 1, title: "Welcome to Arabic", duration: "5 min", videoUrl: "" },
      {
        id: 2,
        title: "Arabic Alphabet Essentials",
        duration: "10 min",
        videoUrl: "",
      },
      {
        id: 3,
        title: "Greetings & Polite Phrases",
        duration: "12 min",
        videoUrl: "",
      },
      {
        id: 4,
        title: "Introducing Yourself",
        duration: "13 min",
        videoUrl: "",
      },
      {
        id: 5,
        title: "Mini Practice & Quiz",
        duration: "20 min",
        videoUrl: "",
      },
    ],
  },
  {
    id: 2,
    name: "Unit 2: Numbers & Time",
    desc: "Learn how to count, ask about time, and express dates and schedules in Arabic.",
    image:
      "/images/rear-view-young-college-student-paying-attention-listening-her-online-teacher-laptop-home-scaled.jpg",
    duration: "50 min",
    lessons: [
      { id: 6, title: "Numbers 1–10", duration: "8 min", videoUrl: "" },
      {
        id: 7,
        title: "Asking and Telling Time",
        duration: "10 min",
        videoUrl: "",
      },
      { id: 8, title: "Days of the Week", duration: "7 min", videoUrl: "" },
      { id: 9, title: "Calendar Talk", duration: "10 min", videoUrl: "" },
      {
        id: 10,
        title: "Practice with Dialogue",
        duration: "15 min",
        videoUrl: "",
      },
    ],
  },
  {
    id: 3,
    name: "Unit 3: Daily Life Vocabulary",
    desc: "Expand your vocabulary with essential words related to food, family, places, and routines.",
    image: "/images/virtual-classroom-study-space-1-scaled.jpg",
    duration: "55 min",
    lessons: [
      {
        id: 11,
        title: "Family Members & Relations",
        duration: "10 min",
        videoUrl: "",
      },
      { id: 12, title: "Around the House", duration: "9 min", videoUrl: "" },
      {
        id: 13,
        title: "Food & Drinks Vocabulary",
        duration: "12 min",
        videoUrl: "",
      },
      {
        id: 14,
        title: "Common Verbs in Daily Use",
        duration: "10 min",
        videoUrl: "",
      },
      { id: 15, title: "Roleplay + Quiz", duration: "14 min", videoUrl: "" },
    ],
  },
  {
    id: 4,
    name: "Unit 4: Asking Questions",
    desc: "Master the art of asking and answering questions in real-life conversations.",
    image:
      "/images/female-teacher-in-headphones-teaching-young-student-girl-online-.jpg",
    duration: "45 min",
    lessons: [
      {
        id: 16,
        title: "Question Words: Who, What, Where",
        duration: "7 min",
        videoUrl: "",
      },
      { id: 17, title: "Yes/No Questions", duration: "8 min", videoUrl: "" },
      {
        id: 18,
        title: "Asking for Directions",
        duration: "10 min",
        videoUrl: "",
      },
      { id: 19, title: "Mini Conversations", duration: "10 min", videoUrl: "" },
      {
        id: 20,
        title: "Quiz: Test Your Skills",
        duration: "10 min",
        videoUrl: "",
      },
    ],
  },
  {
    id: 5,
    name: "Unit 5: Basic Grammar",
    desc: "Learn the foundations of Arabic grammar including nouns, verbs, gender, and plurals.",
    image:
      "/images/young-student-wearing-headphones-studies-online-distance-learning-.jpg",
    duration: "65 min",
    lessons: [
      { id: 21, title: "Nouns and Gender", duration: "10 min", videoUrl: "" },
      {
        id: 22,
        title: "Verb Conjugation Basics",
        duration: "12 min",
        videoUrl: "",
      },
      {
        id: 23,
        title: "Singular & Plural Forms",
        duration: "10 min",
        videoUrl: "",
      },
      {
        id: 24,
        title: "Prepositions & Short Sentences",
        duration: "13 min",
        videoUrl: "",
      },
      { id: 25, title: "Grammar Practice", duration: "20 min", videoUrl: "" },
    ],
  },
];

// Color schemes for different units
const colorSchemes = [
  {
    bgGradient: "from-emerald-50 to-teal-50",
    borderColor: "border-emerald-200",
    accentColor: "#02AAA0",
    textColor: "text-emerald-800",
    iconBg: "bg-emerald-100",
    hoverShadow: "shadow-emerald-200",
  },
  {
    bgGradient: "from-blue-50 to-indigo-50",
    borderColor: "border-blue-200",
    accentColor: "#3B82F6",
    textColor: "text-blue-800",
    iconBg: "bg-blue-100",
    hoverShadow: "shadow-blue-200",
  },
  {
    bgGradient: "from-purple-50 to-pink-50",
    borderColor: "border-purple-200",
    accentColor: "#8B5CF6",
    textColor: "text-purple-800",
    iconBg: "bg-purple-100",
    hoverShadow: "shadow-purple-200",
  },
];

export default function ExamUnitCards() {
  const router = useRouter();

  return (
    <div className="m-5">
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Arabic Learning Units
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-blue-500 mx-auto rounded-full"></div>
        </div>
      </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
      {courseUnitsData?.map((course, index) => {
        const colorScheme = colorSchemes[index % colorSchemes.length];

        return (
          <div
            key={course.id}
            className={`
                   relative overflow-hidden rounded-2xl transition-all duration-500 ease-out transform
                   cursor-pointer  hover:scale-105 hover:shadow-xl group hover:border-[2px] border ${colorScheme.borderColor} bg-gradient-to-br ${colorScheme.bgGradient}
                 `}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            {/* Unit Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={course.image}
                alt={course.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center";
                }}
              />
              <div className="absolute top-4 left-4">
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: colorScheme.accentColor }}
                >
                  Unit {course.id}
                </span>
              </div>
              <div className="absolute bottom-4 right-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-white/90 text-gray-800">
                  <Clock size={14} />
                  {course.duration}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className={`text-xl font-bold mb-3 ${colorScheme.textColor}`}>
                {course.name}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {course.desc}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <BookOpen size={14} />
                    {course.lessons.length} lessons
                  </span>
                </div>
              </div>
            </div>

            <button 
             onClick={() => router.push(`/exams/exam-courses/exam-units/1/${course?.id}`)}
            className="m-4 border border-primary bg-primary text-white rounded-2xl p-2">View Details</button>
          </div>
        );
      })}
    </div>
    </div>
  );
}
