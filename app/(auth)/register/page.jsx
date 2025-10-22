"use client";

import { Eye, EyeOff, Lock, Mail, Phone } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Register = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [checkedItems, setCheckedItems] = useState(new Set());

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [focusedField, setFocusedField] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Auto-check items with staggered animation
  useEffect(() => {
    if (!isVisible) return;
    const programsOrder = [1, 2, 3, 4, 5, 6, 7, 8];
    programsOrder.forEach((id, index) => {
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
          ${isHovered ? (isLeft ? "translate-x-4" : "-translate-x-4") : "translate-x-0"}
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
            <div className={`relative w-6 h-6 mr-4 flex-shrink-0 transition-all duration-500 ${isHovered ? "scale-110" : "scale-100"}`}>
              <div
                className={`absolute inset-0 rounded-full transition-all duration-500 ${
                  isChecked ? "bg-gradient-to-r from-teal-400 to-teal-500 scale-100" : "bg-gray-200 scale-90"
                }`}
              >
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-500 ${
                    isChecked && isHovered ? "bg-teal-400 blur-md scale-150 opacity-30" : "opacity-0"
                  }`}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className={`w-3 h-3 text-white transition-all duration-300 ${
                    isChecked ? "opacity-100 scale-100" : "opacity-0 scale-50"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                    className={`${isChecked ? "animate-[checkmark_0.5s_ease-out_forwards]" : ""}`}
                  />
                </svg>
              </div>
            </div>

            {/* Program title */}
            <div className="relative overflow-hidden">
              <h3 className={`text-lg font-semibold text-gray-700 transition-all duration-300 ${isHovered ? "text-teal-600" : ""}`}>
                {program.title}
              </h3>
              <div
                className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-teal-400 to-teal-500 transition-all duration-300 ease-out ${
                  isHovered ? "w-full" : "w-0"
                }`}
              />
            </div>

            {/* Hover arrow */}
            <div className={`ml-3 transform transition-all duration-300 ${isHovered ? "translate-x-2 opacity-100" : "translate-x-0 opacity-0"}`}>
              <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </>
        )}

        {/* Right side content */}
        {!isLeft && (
          <>
            <div className={`mr-3 transform transition-all duration-300 ${isHovered ? "-translate-x-2 opacity-100" : "translate-x-0 opacity-0"}`}>
              <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>

            <div className="relative overflow-hidden">
              <h3
                className={`text-lg font-semibold text-gray-700 transition-all duration-300 text-right ${
                  isHovered ? "text-teal-600" : ""
                }`}
              >
                {program.title}
              </h3>
              <div
                className={`absolute bottom-0 right-0 h-0.5 bg-gradient-to-l from-teal-400 to-teal-500 transition-all duration-300 ease-out ${
                  isHovered ? "w-full" : "w-0"
                }`}
              />
            </div>

            <div className={`relative w-6 h-6 ml-4 flex-shrink-0 transition-all duration-500 ${isHovered ? "scale-110" : "scale-100"}`}>
              <div
                className={`absolute inset-0 rounded-full transition-all duration-500 ${
                  isChecked ? "bg-gradient-to-r from-teal-400 to-teal-500 scale-100" : "bg-gray-200 scale-90"
                }`}
              >
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-500 ${
                    isChecked && isHovered ? "bg-teal-400 blur-md scale-150 opacity-30" : "opacity-0"
                  }`}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className={`w-3 h-3 text-white transition-all duration-300 ${
                    isChecked ? "opacity-100 scale-100" : "opacity-0 scale-50"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                    className={`${isChecked ? "animate-[checkmark_0.5s_ease-out_forwards]" : ""}`}
                  />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  // Unified input handler
  const onInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Basic example validation (optional)
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    console.log("Register submitted:", formData);
  };

  return (
    <div className="relative py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-teal-200 rounded-full opacity-5 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-200 rounded-full opacity-5 blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-200 rounded-full opacity-30 blur-2xl animate-bounce"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className={`mb-16 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          {/* optional heading here */}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-16">
          {/* Left column */}
          <div className="flex flex-col gap-1">
            <div className="inline-block w-fit px-4 py-2 bg-teal-100 text-teal-600 rounded-full text-sm font-semibold uppercase tracking-wide">
                 Create Your Account
            </div>
            <p className="text-lg mt-3 font-bold text-gray-800 leading-tight max-w-4xl">
              Sign up to access your personalized Arabic learning dashboard and pick up where you left off
            </p>
            <img src="/images/logo.png" className="w-64 mx-auto" alt="logo image" />
          </div>

          {/* Right column — Registration form */}
          <div className="border border-primary rounded-2xl p-4 flex flex-col gap-2">
            <form className="flex flex-col p-5 gap-5" onSubmit={onSubmit}>
              {/* Row: First & Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-gray-800 font-semibold text-sm">First Name</label>
                  <div className="relative group">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={onInputChange}
                      onFocus={() => setFocusedField("firstName")}
                      onBlur={() => setFocusedField("")}
                      className={`w-full !text-primary focus:outline-none rounded-2xl bg-white/10 backdrop-blur-md border-2 transition-all duration-300 px-6 py-4  placeholder-slate-400 text-lg
                       bg-white/15 shadow-lg 
                       ${
                    focusedField === "firstName"
                      ? "border-teal-400 bg-white/15 shadow-lg "
                      : "border-white/20 hover:border-white/30"
                  }
                    `}
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-gray-800 font-semibold text-sm">Last Name</label>
                  <div className="relative group">
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={onInputChange}
                      onFocus={() => setFocusedField("lastName")}
                      onBlur={() => setFocusedField("")}
                      className={`w-full !text-primary focus:outline-none rounded-2xl bg-white/10 backdrop-blur-md border-2 transition-all duration-300 px-6 py-4  placeholder-slate-400 text-lg
                       bg-white/15 shadow-lg 
                       ${
                    focusedField === "lastName"
                      ? "border-teal-400 bg-white/15 shadow-lg "
                      : "border-white/20 hover:border-white/30"
                  }
                    `}
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                <label className="text-gray-800 font-semibold text-sm flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#02AAA0]" />
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={onInputChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField("")}
                   className={`w-full !text-primary focus:outline-none rounded-2xl bg-white/10 backdrop-blur-md border-2 transition-all duration-300 px-6 py-4  placeholder-slate-400 text-lg
                       bg-white/15 shadow-lg 
                       ${
                    focusedField === "email"
                      ? "border-teal-400 bg-white/15 shadow-lg "
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
                    <Phone className="w-4 h-4 text-[#02AAA0]"/>
                    Phone
                </label>
                <div className="relative group">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={onInputChange}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField("")}
                    className={`w-full !text-primary focus:outline-none rounded-2xl bg-white/10 backdrop-blur-md border-2 transition-all duration-300 px-6 py-4  placeholder-slate-400 text-lg
                       bg-white/15 shadow-lg 
                       ${
                    focusedField === "phone"
                      ? "border-teal-400 bg-white/15 shadow-lg "
                      : "border-white/20 hover:border-white/30"
                  }
                    `}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>
              </div>
              {/* Phone */}
             

              {/* Password */}
            <div className="grid grid-cols-2 gap-4">
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
                    onChange={onInputChange}
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
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-400 hover:text-teal-400 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-2">
                <label className="text-gray-800 font-semibold text-sm flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#02AAA0]" />
                  Confirm Password
                </label>
                <div className="relative group">
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={onInputChange}
                    onFocus={() => setFocusedField("confirmPassword")}
                    onBlur={() => setFocusedField("")}
                    className={`w-full !text-primary focus:outline-none rounded-2xl bg-white/10 backdrop-blur-md border-2 transition-all duration-300 px-6 py-4  placeholder-slate-400 text-lg
                       bg-white/15 shadow-lg 
                       ${
                    focusedField === "confirmPassword"
                      ? "border-teal-400 bg-white/15 shadow-lg "
                      : "border-white/20 hover:border-white/30"
                  }
                    `}
                    placeholder="Re-enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((p) => !p)}
                    className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-400 hover:text-teal-400 transition-colors duration-200"
                  >
                    {showConfirm ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                  </button>
                </div>
              </div>
            </div>

              {/* Terms */}
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={onInputChange}
                  className="peer sr-only"
                />
                <span className="w-6 h-6 rounded-md border-2 border-teal-400 grid place-items-center bg-white/70 peer-checked:bg-gradient-to-r from-teal-500 to-cyan-500 peer-checked:border-transparent transition-all">
                  <svg className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-gray-700">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary underline underline-offset-2">
                    Terms & Conditions
                  </Link>
                </span>
              </label>

              {/* CTA + switch to login */}
              <button
                type="submit"
                disabled={!formData.agree}
                className="group w-full relative overflow-hidden bg-gradient-to-r from-teal-600 to-cyan-600 text-sm md:text-base text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span className="hidden sm:inline">Register</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>

              <p className="text-center text-gray-700">
                Already have an account?{" "}
                <Link href="/login" className="underline font-medium text-primary">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Floating particles (optional) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" />

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

export default Register;
