"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { handleGetAllCourses } from "../../libs/features/coursesSlice";

// ---------- helpers ----------
const parseCamp = (s = "") =>
  String(s)
    .split("**CAMP**")
    .map((x) => x.trim())
    .filter(Boolean);

const THEMES = [
  {
    accent: "from-teal-500 to-teal-600",
    hoverAccent: "hover:from-teal-600 hover:to-teal-700",
    glow: "shadow-teal-200",
  },
  {
    accent: "from-indigo-500 to-indigo-600",
    hoverAccent: "hover:from-indigo-600 hover:to-indigo-700",
    glow: "shadow-indigo-200",
  },
];

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
    id,
    title,
    description,
    img: c?.image ?? c?.img ?? "/images/EgyArabic.png",

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

    ...theme,
  };
};

// ---------- Skeleton Card ----------
function SkeletonCard() {
  return (
    <div className="rounded-3xl overflow-hidden bg-white/60 backdrop-blur-md shadow-xl animate-pulse border border-white/40">
      <div className="aspect-[16/10] bg-gray-200" />
      <div className="p-6 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-10 bg-gray-200 rounded-xl mt-6" />
      </div>
    </div>
  );
}

// ---------- CourseCard ----------
function CourseCard({ course, index, isVisible, hoveredCard, setHoveredCard }) {
  const router = useRouter();
  const isHovered = hoveredCard === course.id;
  const delay = index * 120;

  const badgeTypeClass =
    course.type !== "online"
      ? "bg-rose-500/80 text-white"
      : "bg-emerald-500/80 text-white";

  return (
    <div
      className={`
        group relative overflow-hidden rounded-3xl
        border border-white/50 bg-white/70 backdrop-blur-xl
        shadow-xl hover:shadow-2xl transition-all duration-500 ease-out transform
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
        ${isHovered ? "scale-[1.03] -translate-y-2" : "scale-100"}
        cursor-pointer
      `}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
      onMouseEnter={() => setHoveredCard(course.id)}
      onMouseLeave={() => setHoveredCard(null)}
      onClick={() => router.push(`/courses/courseVideos/${course.id}`)}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
        <img
          src={course.img}
          alt={course.title}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />

        {/* Overlay */}
        <div
          className={`
            absolute inset-0 transition-opacity duration-500
            bg-gradient-to-t from-black/70 via-black/25 to-transparent
            ${isHovered ? "opacity-100" : "opacity-90"}
          `}
        />

        {/* Type Badge */}
        {course.type && (
          <div
            className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide
            shadow-lg backdrop-blur-md border border-white/20 ${badgeTypeClass}`}
          >
            {course.type}
          </div>
        )}

        {/* Number Badge */}
        <div
          className={`
            absolute top-4 left-4 w-10 h-10 rounded-xl
            flex items-center justify-center border border-white/30 shadow-lg
           backdrop-blur-md transition-transform duration-500 
            ${
              isHovered
                ? "rotate-12 scale-110 bg-teal-600 transition-all "
                : "  bg-white/20 transition-all"
            }
          `}
        >
          <span className="text-white font-bold text-sm">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Info Strip */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2 text-white">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md border border-white/20">
            {course.level || "All Levels"}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md border border-white/20">
            {course.duration || "Flexible"}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md border border-white/20">
            {course.lessons ? `${course.lessons} lessons` : "Lessons"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-teal-600 transition-colors">
          {course.title}
        </h3>

        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Will Learn Preview */}
        {Array.isArray(course.willLearn) && course.willLearn.length > 0 && (
          <div className="mb-4 space-y-2">
            {course.willLearn.slice(0, 2).map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-sm text-gray-700"
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

        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-5" />

        {/* Price Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-5">
            {(course.groupPrice || course.groupPrice === 0) && (
              <div>
                <p className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">
                  Group
                </p>
                <p className="text-lg font-bold text-gray-900">
                  ${course.groupPrice}
                </p>
              </div>
            )}
            {(course.privatePrice || course.privatePrice === 0) && (
              <div className="pl-5 border-l border-gray-200">
                <p className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">
                  Private
                </p>
                <p className="text-lg font-bold text-gray-900">
                  ${course.privatePrice}
                </p>
              </div>
            )}
          </div>

          {course.lessons && (
            <div className="text-gray-600 text-sm font-medium">
              {course.lessons} lessons
            </div>
          )}
        </div>

        {/* CTA (shows on hover) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/courses/courseVideos/${course.id}`);
          }}
          className={`
            w-full py-3.5 rounded-xl font-semibold text-sm uppercase tracking-wide
            transition-all duration-300 transform flex items-center justify-center gap-2
            bg-gradient-to-r ${course.accent} text-white
            ${course.hoverAccent}
            shadow-md hover:shadow-lg hover:${course.glow}
            ${
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3"
            }
          `}
        >
          <span>Explore Course</span>
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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

      {/* Glow ring */}
      <div
        className={`absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 rounded-3xl ring-2 ring-teal-400/20" />
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!uiCourses.length) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600 text-lg font-semibold">No courses found.</p>
        <p className="text-gray-500 text-sm mt-2">
          Try changing search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {uiCourses.slice(0, 3).map((course, index) => {
        const offsetClass =
          index % 3 === 1
            ? "xl:translate-y-6"
            : index % 3 === 2
            ? "xl:translate-y-0"
            : "";

        return (
          <div
            key={course.id}
            className={`transform transition-all duration-300 ${offsetClass} hover:translate-y-0 hover:z-10`}
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

  // fallback demo data (same as you)
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
      wiil_learn:
        "Understand common Egyptian idioms and slang**CAMP**Follow fast conversations in cafés and streets**CAMP**Talk about opinions, feelings, and plans**CAMP**Improve pronunciation and intonation**CAMP**Understand cultural references in media**CAMP**Speak more naturally in real situations",
      feature:
        "Story-Based Lessons**CAMP**Listening Drills**CAMP**Cultural Notes**CAMP**Speaking Prompts",
      created_at: "2025-12-25 18:05:44",
      hidden: "0",
    },
  ];

  // ✅ Search + Filter
  const [filterType, setFilterType] = useState("all");
  const [query, setQuery] = useState("");

  const filteredData = useMemo(() => {
    return allData
      .filter((c) => String(c?.hidden ?? "0") !== "1")
      .filter((c) => (filterType === "all" ? true : c?.type === filterType))
      .filter((c) =>
        String(c?.course_name || "")
          .toLowerCase()
          .includes(query.toLowerCase())
      );
  }, [allData, filterType, query]);

  useEffect(() => {
    dispatch(handleGetAllCourses());
  }, [dispatch]);

  return (
    <section className="relative overflow-hidden py-16 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-md border border-white/40 text-teal-700 rounded-full text-sm font-semibold uppercase tracking-wide shadow-sm">
            <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
            Our Courses
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold text-gray-900">
            Learn Arabic{" "}
            <span className="bg-gradient-to-r from-teal-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent">
              the Right Way
            </span>
          </h1>

          <p className="mt-5 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Our programs aren’t just lessons — they’re a real experience that
            helps you speak and live Arabic every day, from your first word to
            full fluency.
          </p>

          {/* fancy underline */}
          <div className="mt-8 flex justify-center">
            <div className="h-[3px] w-32 rounded-full bg-gradient-to-r from-teal-500 via-sky-500 to-indigo-500" />
          </div>
        </div>

        {/* Search + Filters */}

        {/* Grid */}
        <CoursesGrid
          coursesFromApi={filteredData}
          loading={all_courses_loading}
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-24 left-8 w-3 h-3 bg-teal-300 rounded-full animate-pulse" />
        <div className="absolute top-36 right-12 w-2 h-2 bg-blue-300 rounded-full animate-ping" />
        <div className="absolute bottom-28 left-1/4 w-2.5 h-2.5 bg-indigo-300 rounded-full animate-bounce" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />
      </div>
    </section>
  );
}
