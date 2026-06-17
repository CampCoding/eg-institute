"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

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

  // features can be an array (new API) or a plain string (old API)
  const featureRaw = Array.isArray(c?.features) ? c.features[0] : (c?.feature ?? "");

  return {
    id,
    title,
    description,
    img: c?.image ?? c?.img ?? "/images/EgyArabic.png",
    type: c?.type,
    level: c?.level,
    duration: c?.Duration ?? c?.duration,
    lessons: c?.lessons_count ?? c?.lessons,
    groupPrice: c?.group_price,
    privatePrice: c?.private_price,
    willLearn: parseCamp(c?.wiil_learn),
    features: parseCamp(featureRaw),
    video: c?.video,
    advertisingVideo: c?.advertising_video,
    createdAt: c?.created_at,
    hidden: c?.hidden,
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
        cursor-pointer h-full flex flex-col
      `}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
      onMouseEnter={() => setHoveredCard(course.id)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      {/* Image Container with fixed height */}
      <div className="relative h-48 flex-shrink-0 overflow-hidden">
        <img
          src={course?.img}
          alt={course?.title || "course"}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

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
          className={`absolute top-4 left-4 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-lg transition-transform duration-500 ${
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

      {/* Content - flex-grow to fill remaining space with consistent height */}
      <div className="p-6 flex-grow flex flex-col">
        {/* Title with fixed height for 2 lines */}
        <div className="min-h-[56px] mb-3">
          <h3
            className={`text-xl font-bold text-gray-800 line-clamp-2 transition-all duration-300 group-hover:text-teal-600`}
          >
            {course.title}
          </h3>
        </div>

        {/* Description with fixed height for 2 lines */}
        <div className="min-h-[42px] mb-4">
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
            {course.description}
          </p>
        </div>

        {/* Will Learn Preview - fixed height for 2 items */}
        {Array.isArray(course.willLearn) && course.willLearn.length > 0 && (
          <div className="mb-4 space-y-2 min-h-[56px]">
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
            {/* Placeholder if no willLearn items to maintain height */}
            {course.willLearn.length === 0 && (
              <div className="h-[56px] invisible">Placeholder</div>
            )}
          </div>
        )}

        {/* Spacer to push content to bottom */}
        <div className="flex-grow"></div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4 flex-shrink-0" />

        {/* Price Section - fixed height */}
        <div className="flex items-center justify-between mb-5 flex-shrink-0 min-h-[60px]">
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
            {/* Placeholder if no prices to maintain height */}
            {!course.groupPrice && !course.privatePrice && (
              <div className="w-full invisible">No pricing</div>
            )}
          </div>
          {course.lessons && (
            <div className="flex items-center gap-1.5 text-gray-500 text-sm flex-shrink-0">
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

        {/* CTA Button - fixed at bottom */}
        <button
          onClick={() => router.push(`/courses/courseVideos/${course.id}`)}
          className={`
            w-full py-3.5 rounded-xl font-semibold text-sm uppercase tracking-wide
            transition-all duration-300 transform flex items-center justify-center gap-2
            bg-gradient-to-r from-teal-500 to-teal-600 text-white
            hover:from-teal-600 hover:to-teal-700 hover:shadow-lg hover:shadow-teal-200
            ${isHovered ? "scale-[1.02]" : "scale-100"}
            flex-shrink-0
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
      {uiCourses?.map((course, index) => {
        const offsetClass =
          "";

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
  const { home_data, home_loading } = useSelector((state) => state.home);

  const section = home_data?.message?.sections?.courses;
  const coursesData = home_data?.message?.courses ?? [];

  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 transition-all duration-1000 transform translate-y-0 opacity-100">
          <div className="inline-block px-4 py-2 bg-teal-100 text-teal-600 rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
            {section?.badge ?? "Our Courses"}
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-gray-800 via-teal-600 to-gray-800 bg-clip-text text-transparent">
            {section?.title ?? "Our Courses"}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {section?.subtitle ??
              "Our programs aren’t just lessons — they’re a real experience that helps you speak and live Arabic every day, from your first word to full fluency."}
          </p>
        </div>

        {/* Grid */}
        <CoursesGrid
          coursesFromApi={coursesData.slice(0, 3)}
          loading={home_loading}
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
