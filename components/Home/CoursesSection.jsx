"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { handleGetAllCourses } from "../../libs/features/coursesSlice";

// ---------- helpers ----------
const THEMES = [
  {
    bgColor: "bg-white",
    hoverBg: "hover:bg-gray-50",
    accent: "bg-teal-500",
    textColor: "text-gray-800",
  },
  {
    bgColor: "bg-white",
    hoverBg: "hover:bg-gray-50",
    accent: "bg-indigo-500",
    textColor: "text-gray-800",
  },
];

const parseCamp = (s = "") =>
  String(s)
    .split("**CAMP**")
    .map((x) => x.trim())
    .filter(Boolean);

const normalizeCourse = (c, index) => {
  const theme = THEMES[index % THEMES.length];

  const id = String(c?.course_id ?? c?.id ?? index + 1);
  const title = c?.course_name ?? c?.title ?? "Untitled Course";
  const description = (
    c?.course_descreption ||
    c?.overview ||
    c?.description ||
    ""
  )
    .trim()
    .replace(/\s+/g, " ");

  return {
    // fields used by card
    id,
    title,
    description,
    img: c?.image ?? c?.img ?? "/images/EgyArabic.png",

    // extra API fields
    type: c?.type,
    level: c?.level,
    duration: c?.Duration ?? c?.duration,
    lessons: c?.lessons,
    groupPrice: c?.group_price,
    privatePrice: c?.private_price,
    willLearn: parseCamp(c?.wiil_learn),
    features: parseCamp(c?.feature),
    video: c?.video,
    advertisingVideo: c?.advertising_video,
    createdAt: c?.created_at,
    hidden: c?.hidden,

    // theme
    ...theme,
  };
};

// ---------- CourseCard ----------
function CourseCard({ course, index, isVisible, hoveredCard, setHoveredCard }) {
  const router = useRouter();
  const isHovered = hoveredCard === course.id;
  const delay = index * 150;

  return (
    <div
      className={`
        group relative overflow-hidden rounded-3xl bg-white border border-gray-100
        shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
        ${isHovered ? "scale-[1.02] bg-teal-200 -translate-y-2" : "scale-100"}
        cursor-pointer
      `}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
      onMouseEnter={() => setHoveredCard(course.id)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      {/* Image Container with Overlay */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course?.img}
          alt={course?.title || "course"}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        {/* Gradient Overlay */}
        {
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        }

        {/* Type Badge */}
        {course.type && (
          <div
            className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide backdrop-blur-md shadow-lg ${
              course.type !== "online"
                ? "bg-rose-500/90 text-white"
                : "bg-emerald-500/90 text-white"
            }`}
          >
            {course.type}
          </div>
        )}

        {/* Course Number Badge */}
        <div
          className={`absolute top-4 left-4 w-10 bg-teal-200 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-lg transition-transform duration-500 ${
            isHovered ? "rotate-12 scale-110" : ""
          }`}
        >
          <span className="text-white font-bold text-sm">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Meta Badges on Image */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          {course.level && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/20">
              {course.level}
            </span>
          )}
          {course.duration && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/20">
              {course.duration}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3
          className={`text-xl font-bold text-gray-800 mb-3 line-clamp-2 transition-all duration-300 group-hover:text-teal-600`}
        >
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Will Learn Preview */}
        {Array.isArray(course.willLearn) && course.willLearn.length > 0 && (
          <div className="mb-4 space-y-2">
            {course.willLearn.slice(0, 2).map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-sm text-gray-600"
              >
                <svg
                  className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="line-clamp-1">{item}</span>
              </div>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4" />

        {/* Price Section */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-4">
            {(course.groupPrice || course.groupPrice === 0) && (
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-wide text-gray-400 font-medium">
                  Group
                </p>
                <p className="text-lg font-bold text-gray-800">
                  ${course.groupPrice}
                </p>
              </div>
            )}
            {(course.privatePrice || course.privatePrice === 0) && (
              <div className="text-center pl-4 border-l border-gray-100">
                <p className="text-[10px] uppercase tracking-wide text-gray-400 font-medium">
                  Private
                </p>
                <p className="text-lg font-bold text-gray-800">
                  ${course.privatePrice}
                </p>
              </div>
            )}
          </div>
          {course.lessons && (
            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>{course.lessons} lessons</span>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => router.push(`/courses/courseVideos/${course.id}`)}
          className={`
            w-full py-3.5 rounded-xl font-semibold text-sm uppercase tracking-wide
            transition-all duration-300 transform flex items-center justify-center gap-2
            bg-gradient-to-r from-teal-500 to-teal-600 text-white
            hover:from-teal-600 hover:to-teal-700 hover:shadow-lg hover:shadow-teal-200
            ${isHovered ? "scale-[1.02]" : "scale-100"}
          `}
        >
          <span>Explore Course</span>
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${
              isHovered ? "translate-x-1" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>

      {/* Hover Glow Effect */}
      <div
        className={`absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 rounded-3xl ring-2 ring-teal-400/30" />
      </div>
    </div>
  );
}

// ---------- CoursesGrid ----------
function CoursesGrid({ coursesFromApi = [], loading }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => setIsVisible(true), []);

  const uiCourses = useMemo(() => {
    return (Array.isArray(coursesFromApi) ? coursesFromApi : [])
      .filter((c) => String(c?.hidden ?? "0") !== "1")
      .map((c, i) => normalizeCourse(c, i));
  }, [coursesFromApi]);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-16">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {uiCourses.map((course, index) => {
        const offsetClass =
          index % 3 === 1
            ? "xl:translate-y-6" // التاني ينزل أكتر
            : index % 3 === 2
            ? "xl:translate-y-0" // التالت ينزل بسيط
            : "";

        return (
          <div
            key={course.id}
            className={`
            transform transition-all duration-300
            ${offsetClass}
            hover:translate-y-0 hover:z-10
          `}
          >
            <CourseCard
              course={course}
              index={index}
              isVisible={isVisible}
              hoveredCard={hoveredCard}
              setHoveredCard={setHoveredCard}
            />
          </div>
        );
      })}
    </div>
  );
}

// ---------- main section ----------
export default function CoursesSection() {
  const dispatch = useDispatch();
  const { all_courses_data, all_courses_loading } = useSelector(
    (state) => state.courses
  );

  const allData = all_courses_data?.message ?? [
    {
      course_id: "7",
      type: "online",
      course_name: "Egyptian Arabic Conversation Bootcamp",
      course_descreption:
        "Practice real-life Egyptian Arabic conversations with guided dialogues, listening drills, and speaking tasks.\r\n\r\nPerfect for learners who want to sound natural and confident.\r\n\r\n",
      overview:
        "This hands-on course focuses on speaking Egyptian Arabic in everyday situations. You’ll learn how to start conversations, ask for help, bargain politely, and express opinions using common Egyptian phrases. Each module includes videos, audio practice, and role-play exercises to boost fluency and comprehension.",
      level: "beginner",
      Duration: "8 weeks",
      lessons: "24",
      group_price: "99",
      private_price: "160",
      image: "/4.png",
      video:
        "https://res.cloudinary.com/demo/video/upload/v1690000000/courses/egyptian_arabic_intro.mp4",
      advertising_video:
        "https://res.cloudinary.com/demo/video/upload/v1690000000/courses/egyptian_arabic_ad.mp4",
      wiil_learn:
        "Introduce yourself confidently**CAMP**Use greetings and polite phrases naturally**CAMP**Order food and drinks in cafés**CAMP**Ask for directions and transportation**CAMP**Handle shopping and bargaining**CAMP**Talk about daily routines and plans",
      feature:
        "Live Speaking Sessions**CAMP**Downloadable PDFs**CAMP**Audio Pronunciation Practice**CAMP**Quizzes & Feedback",
      created_at: "2025-12-20 11:45:10",
      hidden: "0",
    },
    {
      course_id: "8",
      type: "offline",
      course_name: "Modern Standard Arabic Foundations",
      course_descreption:
        "Learn the Arabic alphabet, pronunciation, basic grammar, and everyday phrases in Modern Standard Arabic.\r\n\r\nIncludes writing practice and reading drills.\r\n\r\n",
      overview:
        "A structured beginner-friendly course that builds strong foundations in Modern Standard Arabic (الفصحى). You’ll master letters and sounds, learn essential grammar patterns, and practice reading and writing with short texts. Ideal for learners preparing for formal study, travel, or Arabic media.",
      level: "beginner",
      Duration: "10 weeks",
      lessons: "30",
      group_price: "129",
      private_price: "210",
      image: "/images/EgyArabic.png",
      video:
        "https://res.cloudinary.com/demo/video/upload/v1690000000/courses/msa_foundations_intro.mp4",
      advertising_video:
        "https://res.cloudinary.com/demo/video/upload/v1690000000/courses/msa_foundations_ad.mp4",
      wiil_learn:
        "Read Arabic letters with correct vowel sounds**CAMP**Write Arabic words and sentences clearly**CAMP**Use common greetings and introductions**CAMP**Understand basic sentence structure**CAMP**Build vocabulary for daily topics**CAMP**Read short texts with confidence",
      feature:
        "Alphabet Workbook**CAMP**Guided Writing Practice**CAMP**Weekly Assessments",
      created_at: "2025-12-12 09:20:05",
      hidden: "0",
    },
    {
      course_id: "9",
      type: "online",
      course_name: "Intermediate Egyptian Arabic: Stories & Culture",
      course_descreption:
        "Improve listening and speaking through Egyptian stories, short scenes, and cultural notes.\r\n\r\nGreat for learners who already know the basics.\r\n\r\n",
      overview:
        "Level up your Egyptian Arabic using authentic content: mini-stories, TV-style dialogues, and cultural deep-dives. Each lesson includes vocabulary, pronunciation tips, and speaking prompts. You’ll learn to understand fast speech, idioms, and natural rhythm—just like Egyptians speak.",
      level: "intermediate",
      Duration: "12 weeks",
      lessons: "36",
      group_price: "149",
      private_price: "230",
      image: "/images/MSA.png",
      video:
        "https://res.cloudinary.com/demo/video/upload/v1690000000/courses/egyptian_stories_intro.mp4",
      advertising_video:
        "https://res.cloudinary.com/demo/video/upload/v1690000000/courses/egyptian_stories_ad.mp4",
      wiil_learn:
        "Understand common Egyptian idioms and slang**CAMP**Follow fast conversations in cafés and streets**CAMP**Talk about opinions, feelings, and plans**CAMP**Improve pronunciation and intonation**CAMP**Understand cultural references in media**CAMP**Speak more naturally in real situations",
      feature:
        "Story-Based Lessons**CAMP**Listening Drills**CAMP**Cultural Notes**CAMP**Speaking Prompts",
      created_at: "2025-12-25 18:05:44",
      hidden: "0",
    },
  ];

  console.log(all_courses_data?.message);

  useEffect(() => {
    dispatch(handleGetAllCourses());
  }, [dispatch]);

  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 transition-all duration-1000 transform translate-y-0 opacity-100">
          <div className="inline-block px-4 py-2 bg-teal-100 text-teal-600 rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
            Our Courses
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-gray-800 via-teal-600 to-gray-800 bg-clip-text text-transparent">
            Our Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Our programs aren’t just lessons — they’re a real experience that
            helps you speak and live Arabic every day, from your first word to
            full fluency.
          </p>
        </div>

        {/* Grid */}
        <CoursesGrid
          coursesFromApi={allData.slice(0, 3)}
          loading={all_courses_loading}
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-teal-300 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-20 w-1 h-1 bg-blue-300 rounded-full animate-ping" />
        <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" />
      </div>
    </div>
  );
}
