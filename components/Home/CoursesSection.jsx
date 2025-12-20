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

  const badgeBg =
    course.textColor === "text-white" ? "bg-white/10" : "bg-black/5";

  return (
    <div
      className={`
        relative overflow-hidden h-full rounded-2xl shadow-lg transition-all duration-700 ease-out transform
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
        ${course.bgColor} ${course.hoverBg}
        ${isHovered ? "scale-105 shadow-2xl -translate-y-2" : "scale-100"}
        group cursor-pointer
      `}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
        backgroundImage: course.bgColor?.includes("gradient")
          ? ""
          : "radial-gradient(circle at 20% 80%, rgba(20, 184, 166, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(20, 184, 166, 0.08) 0%, transparent 50%)",
      }}
      onMouseEnter={() => setHoveredCard(course.id)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      {/* Animated background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div
          className={`absolute top-4 right-4 w-20 h-20 rounded-full ${
            course.accent
          }
          transform transition-transform duration-700
          ${isHovered ? "scale-150 rotate-180" : "scale-100"}`}
        />
        <div
          className={`absolute bottom-8 left-8 w-12 h-12 rounded-full ${
            course.accent
          }
          transform transition-transform duration-500
          ${isHovered ? "scale-125 -rotate-90" : "scale-100"}`}
        />
        <div
          className={`absolute top-1/2 left-4 w-6 h-6 rounded-full ${
            course.accent
          }
          transform transition-transform duration-600
          ${isHovered ? "scale-110 rotate-45" : "scale-100"}`}
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col">
        {course.type && (
          <div
            className={`px-2 absolute py-1 rounded-full text-xs top-3 right-2  text-white font-semibold ${
              course.type !== "online" ? "bg-red-500" : "bg-emerald-500"
            }`}
          >
            {course.type}
          </div>
        )}
        <img
          src={course?.img}
          alt={course?.title || "course"}
          className="w-full max-h-[150px] overflow-hidden object-cover"
        />

        <div className="relative p-8 h-full flex flex-col">
          {/* Course number */}
          <div
            className={`
              w-12 h-12 rounded-full flex items-center justify-center mb-6 transition-all duration-500
              ${course.accent} text-white
              ${isHovered ? "scale-110 rotate-12" : "scale-100"}
            `}
          >
            <span className="text-lg font-bold">{course.id}</span>
          </div>

          {/* Title */}
          <h3
            className={`
              text-2xl font-bold mb-3 transition-all duration-300
              ${course.textColor}
              ${isHovered ? "transform translate-x-2" : ""}
            `}
          >
            {course.title}
          </h3>

          {/* meta badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {course.level && (
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeBg}`}
              >
                {course.level}
              </span>
            )}
            {course.duration && (
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeBg}`}
              >
                {course.duration}
              </span>
            )}
            {course.lessons && (
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeBg}`}
              >
                {course.lessons} lessons
              </span>
            )}
          </div>

          {/* Description */}
          <p
            className={`
              text-sm leading-relaxed mb-5 flex-grow transition-all duration-300
              ${course.textColor}
              ${course.textColor === "text-white" ? "opacity-90" : "opacity-75"}
              ${isHovered ? "opacity-100" : ""}
            `}
          >
            {course.description}
          </p>

          {/* Will learn (first 3) */}
          {Array.isArray(course.willLearn) && course.willLearn.length > 0 && (
            <ul
              className={`
                mb-5 text-sm space-y-2
                ${course.textColor}
                ${
                  course.textColor === "text-white"
                    ? "opacity-90"
                    : "opacity-80"
                }
              `}
            >
              {course.willLearn.slice(0, 3).map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Prices */}
          <div
            className={`
              mb-6 text-sm flex flex-col justify-between items-start
              ${course.textColor}
              ${course.textColor === "text-white" ? "opacity-90" : "opacity-80"}
            `}
          >
            <span className="my-4">Prices</span>
            <div className="flex justify-between items-center w-full ">
              {(course.groupPrice || course.groupPrice === 0) && (
                <div className="flex items-center justify-between gap-3">
                  <span>Group</span>
                  <span className="font-bold">${course.groupPrice}</span>
                </div>
              )}
              {(course.privatePrice || course.privatePrice === 0) && (
                <div className="flex items-center justify-between gap-3">
                  <span>Private</span>
                  <span className="font-bold">${course.privatePrice}</span>
                </div>
              )}
            </div>
          </div>

          {/* Learn More Button */}
          <button
            onClick={() => router.push(`/courses/courseVideos/${course.id}`)}
            className={`
              px-6 py-3 rounded-lg font-semibold text-sm uppercase tracking-wide
              transition-all duration-300 transform
              bg-teal-500 text-white hover:bg-teal-600
              ${isHovered ? "scale-105 shadow-lg" : "scale-100"}
              backdrop-blur-sm
            `}
          >
            <span className="flex items-center justify-center">
              Learn More
              <svg
                className={`ml-2 w-4 h-4 transition-transform duration-300 ${
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </button>
        </div>
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
      {uiCourses.map((course, index) => (
        <CourseCard
          key={course.id}
          course={course}
          index={index}
          isVisible={isVisible}
          hoveredCard={hoveredCard}
          setHoveredCard={setHoveredCard}
        />
      ))}
    </div>
  );
}

// ---------- main section ----------
export default function CoursesSection() {
  const dispatch = useDispatch();
  const { all_courses_data, all_courses_loading } = useSelector(
    (state) => state.courses
  );

  const allData = all_courses_data?.data?.message ?? [];

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
        <CoursesGrid coursesFromApi={allData.slice(0,3)} loading={all_courses_loading} />
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
