"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PagesBanner from '../../components/layout/PagesBanner';
import { handleGetAllCourses } from '../../libs/features/coursesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  
  const { all_courses_loading, all_courses_data } = useSelector(
    (state) => state?.courses
  );

  useEffect(() => {
    dispatch(handleGetAllCourses());
  }, [dispatch]);

  if (all_courses_loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" spinning={all_courses_loading} />
      </div>
    );
  }

  // CourseCard Component
  const CourseCard = ({ course, index }) => {
    const isHovered = hoveredCard === course?.id || hoveredCard === course?.course_id;
    const delay = index * 150;
    const courseId = course?.id || course?.course_id;
    const courseImg = course?.img || course?.image || course?.thumbnail || '/default-course-image.jpg';
    const courseTitle = course?.title || course?.course_name || 'Course Title';
    const courseDescription = course?.description || course?.course_descreption || 'No description available';
    const courseType = course?.type || course?.course_type || 'online';
    const courseLevel = course?.level || course?.course_level || 'Beginner';
    const courseDuration = course?.duration || course?.course_duration || '8 weeks';
    const courseLessons = course?.lessons || course?.number_of_lessons || 0;
    const groupPrice = course?.groupPrice || course?.group_price || 0;
    const privatePrice = course?.privatePrice || course?.private_price || 0;
    const willLearn = course?.willLearn || course?.learning_outcomes || [];

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
        onMouseEnter={() => setHoveredCard(courseId)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        {/* Image Container with fixed height */}
        <div className="relative h-48 flex-shrink-0 overflow-hidden">
          <img
            src={courseImg}
            alt={courseTitle}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Type Badge */}
          {courseType && (
            <div
              className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide backdrop-blur-md shadow-lg ${
                courseType !== "online"
                  ? "bg-rose-500/90 text-white"
                  : "bg-emerald-500/90 text-white"
              }`}
            >
              {courseType}
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
            {courseLevel && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/20">
                {courseLevel}
              </span>
            )}
            {courseDuration && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/20">
                {courseDuration}
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
              {courseTitle}
            </h3>
          </div>

          {/* Description with fixed height for 2 lines */}
          <div className="min-h-[42px] mb-4">
            <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
              {courseDescription}
            </p>
          </div>

          {/* Will Learn Preview - fixed height for 2 items */}
          {Array.isArray(willLearn) && willLearn.length > 0 && (
            <div className="mb-4 space-y-2 min-h-[56px]">
              {willLearn.slice(0, 2).map((item, i) => (
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

          {/* Placeholder if no willLearn items to maintain height */}
          {(!Array.isArray(willLearn) || willLearn.length === 0) && (
            <div className="mb-4 min-h-[56px]"></div>
          )}

          {/* Spacer to push content to bottom */}
          <div className="flex-grow"></div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4 flex-shrink-0" />

          {/* Price Section - fixed height */}
          <div className="flex items-center justify-between mb-5 flex-shrink-0 min-h-[60px]">
            <div className="flex items-center gap-4">
              {(groupPrice || groupPrice === 0) && (
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-wide text-gray-400 font-medium">
                    Group
                  </p>
                  <p className="text-lg font-bold text-gray-800">
                    ${groupPrice}
                  </p>
                </div>
              )}
              {(privatePrice || privatePrice === 0) && (
                <div className="text-center pl-4 border-l border-gray-100">
                  <p className="text-[10px] uppercase tracking-wide text-gray-400 font-medium">
                    Private
                  </p>
                  <p className="text-lg font-bold text-gray-800">
                    ${privatePrice}
                  </p>
                </div>
              )}
            </div>
            {courseLessons > 0 && (
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
                <span>{courseLessons} lessons</span>
              </div>
            )}
          </div>

          {/* CTA Button - fixed at bottom */}
          <button
            onClick={() => router.push(`/courses/courseVideos/${courseId}`)}
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
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PagesBanner
        title={"All Courses"}
        subTitle={"Providing the best learning experience."}
      />

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {all_courses_data?.message && all_courses_data.message.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {all_courses_data.message.map((course, index) => (
                <CourseCard 
                  key={course?.id || course?.course_id || index} 
                  course={course} 
                  index={index} 
                />
              ))}
            </div>

            {/* View More Button - Only shows if there are more courses to load */}
            {all_courses_data?.total_pages > 1 && (
              <div className="flex justify-center items-center mt-16">
                <button
                  onClick={() => {
                    // Add pagination logic here
                    console.log('Load more courses');
                  }}
                  className="group relative inline-flex items-center justify-center px-10 py-5 overflow-hidden font-bold text-white rounded-2xl shadow-2xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-r from-teal-500 to-cyan-600"
                >
                  <span className="relative flex items-center space-x-3 text-lg">
                    <span>Load More Courses</span>
                    <svg
                      className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No courses available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}