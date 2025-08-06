"use client";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
  });
  const [focusedField, setFocusedField] = useState("");



  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Auto-check items with staggered animation
  useEffect(() => {
    if (!isVisible) return;

    const programs = [1, 2, 3, 4, 5, 6, 7, 8];
    programs.forEach((id, index) => {
      setTimeout(() => {
        setCheckedItems((prev) => new Set([...prev, id]));
      }, 1000 + index * 200);
    });
  }, [isVisible]);

  const programs = [
    { id: 1, title: "Arabic for Business", side: "left" },
    { id: 2, title: "Arabic Conversation Skills", side: "left" },
    { id: 3, title: "Arabic Grammar Made Easy", side: "left" },
    { id: 4, title: "Cultural Insights Workshops", side: "left" },
    { id: 5, title: "Kids Arabic Classes", side: "right" },
    { id: 6, title: "Egyptian Arabic Dialect", side: "right" },
    { id: 7, title: "Modern Standard Arabic", side: "right" },
    { id: 8, title: "One-to-One Arabic Lessons", side: "right" },
  ];

  const ProgramItem = ({ program, index }) => {
    const isHovered = hoveredItem === program.id;
    const isChecked = checkedItems.has(program.id);
    const delay = index * 150;
    const isLeft = program.side === "left";

    return (
      <div
        className={`
          flex items-center group cursor-pointer transform transition-all duration-700 ease-out
          ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}
          ${
            isHovered
              ? isLeft
                ? "translate-x-4"
                : "-translate-x-4"
              : "translate-x-0"
          }
          ${isLeft ? "justify-start" : "justify-end"}
        `}
        style={{ transitionDelay: `${delay}ms` }}
        onMouseEnter={() => setHoveredItem(program.id)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        {/* Left side content */}
        {isLeft && (
          <>
            {/* Animated checkmark */}
            <div
              className={`
              relative w-6 h-6 mr-4 flex-shrink-0 transition-all duration-500
              ${isHovered ? "scale-110" : "scale-100"}
            `}
            >
              {/* Background circle */}
              <div
                className={`
                absolute inset-0 rounded-full transition-all duration-500
                ${
                  isChecked
                    ? "bg-gradient-to-r from-teal-400 to-teal-500 scale-100"
                    : "bg-gray-200 scale-90"
                }
              `}
              >
                {/* Glow effect */}
                <div
                  className={`
                  absolute inset-0 rounded-full transition-all duration-500
                  ${
                    isChecked && isHovered
                      ? "bg-teal-400 blur-md scale-150 opacity-30"
                      : "opacity-0"
                  }
                `}
                ></div>
              </div>

              {/* Checkmark icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className={`
                    w-3 h-3 text-white transition-all duration-300
                    ${
                      isChecked ? "opacity-100 scale-100" : "opacity-0 scale-50"
                    }
                  `}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                    className={`
                      ${
                        isChecked
                          ? "animate-[checkmark_0.5s_ease-out_forwards]"
                          : ""
                      }
                    `}
                  />
                </svg>
              </div>
            </div>

            {/* Program title */}
            <div className="relative overflow-hidden">
              <h3
                className={`
                text-lg font-semibold text-gray-700 transition-all duration-300
                ${isHovered ? "text-teal-600" : ""}
              `}
              >
                {program.title}
              </h3>

              {/* Animated underline */}
              <div
                className={`
                absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-teal-400 to-teal-500
                transition-all duration-300 ease-out
                ${isHovered ? "w-full" : "w-0"}
              `}
              ></div>
            </div>

            {/* Hover arrow */}
            <div
              className={`
              ml-3 transform transition-all duration-300
              ${
                isHovered
                  ? "translate-x-2 opacity-100"
                  : "translate-x-0 opacity-0"
              }
            `}
            >
              <svg
                className="w-4 h-4 text-teal-500"
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
            </div>
          </>
        )}

        {/* Right side content */}
        {!isLeft && (
          <>
            {/* Hover arrow */}
            <div
              className={`
              mr-3 transform transition-all duration-300
              ${
                isHovered
                  ? "-translate-x-2 opacity-100"
                  : "translate-x-0 opacity-0"
              }
            `}
            >
              <svg
                className="w-4 h-4 text-teal-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>

            {/* Program title */}
            <div className="relative overflow-hidden">
              <h3
                className={`
                text-lg font-semibold text-gray-700 transition-all duration-300 text-right
                ${isHovered ? "text-teal-600" : ""}
              `}
              >
                {program.title}
              </h3>

              {/* Animated underline */}
              <div
                className={`
                absolute bottom-0 right-0 h-0.5 bg-gradient-to-l from-teal-400 to-teal-500
                transition-all duration-300 ease-out
                ${isHovered ? "w-full" : "w-0"}
              `}
              ></div>
            </div>

            {/* Animated checkmark */}
            <div
              className={`
              relative w-6 h-6 ml-4 flex-shrink-0 transition-all duration-500
              ${isHovered ? "scale-110" : "scale-100"}
            `}
            >
              {/* Background circle */}
              <div
                className={`
                absolute inset-0 rounded-full transition-all duration-500
                ${
                  isChecked
                    ? "bg-gradient-to-r from-teal-400 to-teal-500 scale-100"
                    : "bg-gray-200 scale-90"
                }
              `}
              >
                {/* Glow effect */}
                <div
                  className={`
                  absolute inset-0 rounded-full transition-all duration-500
                  ${
                    isChecked && isHovered
                      ? "bg-teal-400 blur-md scale-150 opacity-30"
                      : "opacity-0"
                  }
                `}
                ></div>
              </div>

              {/* Checkmark icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className={`
                    w-3 h-3 text-white transition-all duration-300
                    ${
                      isChecked ? "opacity-100 scale-100" : "opacity-0 scale-50"
                    }
                  `}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                    className={`
                      ${
                        isChecked
                          ? "animate-[checkmark_0.5s_ease-out_forwards]"
                          : ""
                      }
                    `}
                  />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="relative py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-teal-200 rounded-full opacity-5 blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-80 h-80 bg-blue-200 rounded-full opacity-5 blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-200 rounded-full opacity-3 blur-2xl animate-bounce"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <div
          className={`
          mb-16 transform transition-all duration-1000
          ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
        `}
        >
          {/* <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight max-w-4xl">
            <span className="bg-gradient-to-r from-gray-800 via-teal-600 to-gray-800 bg-clip-text text-transparent">
              Unlock the World of Arabic Through
            </span>
            <br />
            <span className="text-gray-700">These Engaging Programs</span>
          </h2> */}
        </div>

        {/* Programs List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex flex-col gap-1">
            <div className="inline-block w-fit px-4 py-2 bg-teal-100 text-teal-600 rounded-full text-sm font-semibold uppercase tracking-wide">
              Welcom Back
            </div>
            <p className="text-lg  mt-3 font-bold text-gray-800leading-tight max-w-4xl">
              Sign in to access your personalized Arabic learning dashboard and
              pick up where you left off
            </p>

            <img
              src="/images/logo.png"
              className="w-64 mx-auto"
              alt="logo image"
            />
          </div>

          <div className="border  border-primary rounded-2xl p-4 flex flex-col gap-2">
            <form className="flex flex-col !p-5 !gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-gray-800 font-semibold text-sm flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#02AAA0]" />
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    className={`w-full !text-primary focus:outline-none rounded-2xl bg-white/10 backdrop-blur-md border-2 transition-all duration-300 px-6 py-4  placeholder-slate-400 text-lg
                       bg-white/15 shadow-lg 
                       ${
                    focusedField === "email"
                      ? "border-teal-400 bg-white/15 shadow-lg"
                      : "border-white/20 hover:border-white/30"
                  }
                    `}
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>
             
             <div className="flex flex-col gap-2">
                <label className="text-gray-800 font-semibold text-sm flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#02AAA0]" />
                  Password
                </label>

                <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField("")}
                   className={`w-full !text-primary focus:outline-none rounded-2xl bg-white/10 backdrop-blur-md border-2 transition-all duration-300 px-6 py-4  placeholder-slate-400 text-lg
                       bg-white/15 shadow-lg 
                       ${
                    focusedField === "password"
                      ? "border-teal-400 bg-white/15 shadow-lg "
                      : "border-white/20 hover:border-white/30"
                  }
                    `}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-400 hover:text-teal-400 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="w-6 h-6" />
                  ) : (
                    <Eye className="w-6 h-6" />
                  )}
                </button>
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-500/20 to-cyan-500/20 opacity-0 transition-opacity duration-300 pointer-events-none ${
                    focusedField === "password" ? "opacity-100" : ""
                  }`}
                ></div>
              </div>
             </div>
                
                <p className="text-center justify-center items-center flex gap-1">
                    <span>Don't have an account ? <Link href="/register" className="underline font-medium text-primary">Register</Link></span>
                </p>

              <button className="group w-full relative overflow-hidden bg-gradient-to-r from-teal-600 to-cyan-600 text-sm md:text-base text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
          <span className="relative justify-center  z-10 flex items-center gap-2">
            <span className="hidden sm:inline">Login</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </button>
            </form>
          </div>
        </div>
      </div>

      

      <style jsx>{`
        @keyframes checkmark {
          0% {
            stroke-dasharray: 0 24;
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dasharray: 24 24;
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
