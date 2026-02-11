"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Users,
  BookOpen,
  Calendar,
  Globe,
  Award,
  Video,
  ArrowRight,
  Play,
  Sparkles,
  Target,
  Heart,
  Star,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { useRouter } from "next/navigation";

const CoursesContentSection = ({ data }) => {
  const [yearsCount, setYearsCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const sectionRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          // Animate years counter
          let start = 0;
          const end = 15;
          const timer = setInterval(() => {
            start += 1;
            setYearsCount(start);
            if (start === end) clearInterval(timer);
          }, 100);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Default image fallbacks based on index
  const defaultImages = [
    "/images/female-teacher-in-headphones-teaching-young-student-girl-online-.jpg",
    "/images/teacher-and-his-students.jpg",
  ];

  return (
    <div ref={sectionRef}>
      {data?.map((course, index) => {
        const isEven = index % 2 === 0; // Even = image right, Odd = image left

        return (
          <div
            key={course.course_id || index}
            className="bg-gradient-to-br from-slate-50 via-white to-gray-100 py-20 px-6 relative overflow-hidden"
          >
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-teal-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-200/15 to-indigo-200/15 rounded-full blur-3xl animate-pulse delay-1000"></div>

              {/* Floating Arabic Letters */}
              {["ع", "ر", "ب", "ي"].map((letter, i) => (
                <div
                  key={i}
                  className="absolute text-6xl font-bold text-teal-200/30 animate-float"
                  style={{
                    left: `${20 + i * 20}%`,
                    top: `${10 + i * 15}%`,
                    animationDelay: `${i * 1.5}s`,
                    animationDuration: `${4 + i}s`,
                  }}
                >
                  {letter}
                </div>
              ))}

              {/* Geometric Shapes */}
              <div className="absolute top-1/4 right-1/4 w-16 h-16 border-4 border-teal-300/40 rounded-lg animate-spin-slow"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
              <div
                className={`grid lg:grid-cols-2 gap-16 items-center ${
                  !isEven ? "lg:flex lg:flex-row-reverse" : ""
                }`}
              >
                {/* Text Content */}
                <div
                  className={`space-y-8 transform transition-all duration-1000 flex-1 ${
                    isVisible
                      ? "translate-x-0 opacity-100"
                      : isEven
                        ? "-translate-x-20 opacity-0"
                        : "translate-x-20 opacity-0"
                  }`}
                >
                  {/* Header */}
                  <div className="space-y-6">
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-100 to-cyan-100 rounded-full px-6 py-3 animate-fade-in">
                      <Sparkles className="w-5 h-5 text-teal-600 animate-pulse" />
                      <span className="text-teal-700 font-semibold tracking-wider uppercase">
                        {course?.course_name || "ARABIC COURSE"}
                      </span>
                    </div>

                    <h2
                      dangerouslySetInnerHTML={{
                        __html: course?.course_name,
                      }}
                      className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight"
                    />
                  </div>

                  {/* Description */}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: course?.course_descreption,
                    }}
                    className="space-y-6 text-gray-600 leading-relaxed"
                  />

                  {/* Overview (optional - if you want to show it) */}
                  {course?.overview && (
                    <div className="text-gray-600 leading-relaxed">
                      <p>{course.overview}</p>
                    </div>
                  )}

                  {/* CTA Button */}
                  <div
                    className={`pt-4 ${
                      isVisible ? "animate-fade-in" : "opacity-0"
                    }`}
                    style={{ animationDelay: "1s" }}
                  >
                    <button
                      onClick={() =>
                        router.push(
                          `/courses/courseVideos/${course?.course_id}?groupPrice=${course?.group_price}&private=${course?.private_price}`
                        )
                      }
                      className="group bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-500 relative overflow-hidden hover:scale-105"
                    >
                      <span className="relative z-10 flex items-center space-x-2">
                        <span>Join Now</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Button Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 transform scale-150"></div>
                    </button>
                  </div>
                </div>

                {/* Image Content */}
                <div
                  className={`relative transform transition-all duration-1000 delay-300 flex-1 ${
                    isVisible
                      ? "translate-x-0 opacity-100"
                      : isEven
                        ? "translate-x-20 opacity-0"
                        : "-translate-x-20 opacity-0"
                  }`}
                >
                  {/* Experience Badge */}
                  <div
                    className={`absolute -top-8 w-fit lg:block hidden ${
                      isEven ? "-left-8" : "-right-8 lg:-left-8"
                    } z-20 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-3xl p-6 shadow-2xl animate-bounce`}
                  >
                    <div className="text-center text-white">
                      <div className="text-4xl font-bold mb-2 flex items-center justify-center">
                        <span className="animate-count">{yearsCount}</span>
                        <span className="text-2xl ml-1">+</span>
                      </div>
                      <div className="text-sm font-medium opacity-90">
                        Hours of Experience
                      </div>
                    </div>

                    {/* Floating Stars */}
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute animate-ping"
                        style={{
                          top: `${-10 + i * 5}px`,
                          right: `${-5 + i * 8}px`,
                          animationDelay: `${i * 0.5}s`,
                        }}
                      >
                        <Star className="w-3 h-3 text-yellow-300" />
                      </div>
                    ))}
                  </div>

                  {/* Main Video Call Interface */}
                  <div className="relative bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl p-8 shadow-2xl">
                    {/* Decorative Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-4 right-4 grid grid-cols-6 gap-2">
                        {[...Array(24)].map((_, i) => (
                          <div
                            key={i}
                            className="w-2 h-2 bg-white rounded-full animate-pulse"
                            style={{ animationDelay: `${i * 100}ms` }}
                          ></div>
                        ))}
                      </div>
                    </div>

                    {/* Video Interface */}
                    <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl lg:h-auto max-h-[400px]">
                      <img
                        src={
                          course?.image ||
                          defaultImages[index % defaultImages.length]
                        }
                        alt={course?.course_name || "Course Image"}
                        className="w-full h-auto object-cover"
                      />
                    </div>

                    {/* Success Metrics */}
                    <div
                      className={`absolute -bottom-6 w-fit lg:block hidden  ${
                        isEven ? "-right-6 " : " lg:right-6"
                      } bg-white rounded-2xl p-4 shadow-xl border border-gray-100`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-lg font-bold text-gray-800">
                            98%
                          </div>
                          <div className="text-sm text-gray-500">
                            Success Rate
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* View More Button - Improved styling and positioning */}
      {data && data.length > 2 && (
        <div className="flex justify-center items-center py-16 px-6">
          <button
            onClick={() => router.push('/all-courses')}
            className="group relative inline-flex items-center justify-center px-10 py-5 overflow-hidden font-bold text-white rounded-2xl shadow-2xl transition-all duration-500 transform hover:scale-105"
          >
            {/* Animated gradient background */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-600 animate-gradient-x"></span>
            
            {/* Pulse effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-teal-400 to-cyan-400 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-700"></span>
            
            {/* Button content */}
            <span className="relative flex items-center space-x-3 text-lg">
              <span>View All Courses</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
            
            {/* Decorative dots */}
            {/* <span className="absolute top-2 right-2 w-2 h-2 bg-white/40 rounded-full animate-ping"></span>
            <span className="absolute bottom-2 left-2 w-2 h-2 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></span> */}
          </button>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-15px) rotate(5deg);
          }
          66% {
            transform: translateY(5px) rotate(-5deg);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 75%;
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }

        .animate-progress {
          animation: progress 2s ease-out 1s both;
        }

        .animate-count {
          display: inline-block;
          animation: countUp 1.5s ease-out;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out both;
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes countUp {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default CoursesContentSection;