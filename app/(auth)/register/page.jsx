"use client";

import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  ArrowRight,
  User,
  BookOpen,
  Users,
  Award,
  Globe,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Register = () => {
  const [isVisible, setIsVisible] = useState(false);
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: "5000+ Lessons",
      description: "Comprehensive curriculum",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "Expert Teachers",
      description: "Native Arabic speakers",
      color: "from-teal-500 to-green-500",
    },
  ];

  // const benefits = [
  //   "Personalized learning dashboard",
  //   "Track your progress in real-time",
  //   "Access to exclusive content",
  //   "Join our global community",
  //   "Get certified upon completion",
  // ];

  const onInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Register submitted:", formData);
      setIsLoading(false);
      // Redirect or show success message
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-40 -right-20 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div> */}

      {/* Main Container */}
      <div
        className={`
          relative z-10 w-full max-w-md lg:max-w-6xl bg-white/40 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden
          transform transition-all duration-1000
          ${
            isVisible
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-12 opacity-0 scale-95"
          }
        `}
      >
        <div className="grid lg:grid-cols-2 min-h-[700px]">
          {/* Left Side - Branding & Features */}
          <div className="relative bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 p-8 lg:p-12 hidden lg:flex flex-col justify-between overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full translate-y-48 -translate-x-48"></div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Logo */}
              <div
                className={`
                  transform transition-all duration-700 delay-200
                  ${
                    isVisible
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-12 opacity-0"
                  }
                `}
              >
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="w-32 mb-8 drop-shadow-2xl"
                />
              </div>

              {/* Welcome Text */}
              <div
                className={`
                  space-y-4 mb-8
                  transform transition-all duration-700 delay-300
                  ${
                    isVisible
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-12 opacity-0"
                  }
                `}
              >
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Start Your Journey
                </h1>
                <p className="text-lg text-white/90 leading-relaxed max-w-md">
                  Join thousands of learners worldwide and master Arabic with
                  our personalized approach.
                </p>
              </div>

              {/* Benefits List */}
              {/* <div
                className={`
                  space-y-3 mb-8
                  transform transition-all duration-700 delay-400
                  ${
                    isVisible
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-12 opacity-0"
                  }
                `}
              >
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className={`
                      flex items-center gap-3 text-white/90
                      transform transition-all duration-700
                      ${
                        isVisible
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-12 opacity-0"
                      }
                    `}
                    style={{ transitionDelay: `${500 + index * 100}ms` }}
                  >
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div> */}

              {/* Features Grid */}
              <div className="grid grid-cols-1 gap-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className={`
                        bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20
                        transform transition-all duration-700 hover:scale-105 hover:bg-white/20
                        ${
                          isVisible
                            ? "translate-y-0 opacity-100"
                            : "translate-y-8 opacity-0"
                        }
                      `}
                      style={{ transitionDelay: `${800 + index * 100}ms` }}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 shadow-lg`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-white font-bold text-sm mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-white/70 text-xs">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Quote */}
            <div
              className={`
                relative z-10 mt-8 pt-8 border-t border-white/20
                transform transition-all duration-700 delay-1200
                ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }
              `}
            >
              <p className="text-white/80 italic text-sm">
                "Every expert was once a beginner. Start your Arabic journey
                today."
              </p>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="p-8 lg:p-12 flex items-center justify-center">
            <div className="w-full max-w-md">
              {/* Form Header */}
              <div
                className={`
                  text-center mb-8
                  transform transition-all duration-700 delay-400
                  ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }
                `}
              >
                <div className="inline-block mb-4">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl shadow-lg">
                    <User className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Create Account
                </h2>
                <p className="text-gray-600">
                  Fill in your details to get started
                </p>
              </div>

              {/* Form */}
              <form onSubmit={onSubmit} className="space-y-5">
                {/* First & Last Name */}
                <div
                  className={`
                    grid grid-cols-2 gap-4
                    transform transition-all duration-700 delay-500
                    ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }
                  `}
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={onInputChange}
                      onFocus={() => setFocusedField("firstName")}
                      onBlur={() => setFocusedField("")}
                      className={`
                        w-full px-4 py-3 bg-white border-2 rounded-xl
                        text-gray-800 placeholder-gray-400 text-sm
                        transition-all duration-300 focus:outline-none
                        ${
                          focusedField === "firstName"
                            ? "border-teal-500 shadow-lg shadow-teal-500/20 bg-teal-50/30"
                            : "border-gray-200 hover:border-gray-300"
                        }
                      `}
                      placeholder="John"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={onInputChange}
                      onFocus={() => setFocusedField("lastName")}
                      onBlur={() => setFocusedField("")}
                      className={`
                        w-full px-4 py-3 bg-white border-2 rounded-xl
                        text-gray-800 placeholder-gray-400 text-sm
                        transition-all duration-300 focus:outline-none
                        ${
                          focusedField === "lastName"
                            ? "border-teal-500 shadow-lg shadow-teal-500/20 bg-teal-50/30"
                            : "border-gray-200 hover:border-gray-300"
                        }
                      `}
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div
                  className={`
                    transform transition-all duration-700 delay-600
                    ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }
                  `}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail
                        className={`w-5 h-5 transition-colors duration-300 ${
                          focusedField === "email"
                            ? "text-teal-500"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={onInputChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField("")}
                      className={`
                        w-full pl-12 pr-4 py-3 bg-white border-2 rounded-xl
                        text-gray-800 placeholder-gray-400 text-sm
                        transition-all duration-300 focus:outline-none
                        ${
                          focusedField === "email"
                            ? "border-teal-500 shadow-lg shadow-teal-500/20 bg-teal-50/30"
                            : "border-gray-200 hover:border-gray-300"
                        }
                      `}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div
                  className={`
                    transform transition-all duration-700 delay-700
                    ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }
                  `}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone
                        className={`w-5 h-5 transition-colors duration-300 ${
                          focusedField === "phone"
                            ? "text-teal-500"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={onInputChange}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField("")}
                      className={`
                        w-full pl-12 pr-4 py-3 bg-white border-2 rounded-xl
                        text-gray-800 placeholder-gray-400 text-sm
                        transition-all duration-300 focus:outline-none
                        ${
                          focusedField === "phone"
                            ? "border-teal-500 shadow-lg shadow-teal-500/20 bg-teal-50/30"
                            : "border-gray-200 hover:border-gray-300"
                        }
                      `}
                      placeholder="+1 (555) 000-0000"
                      required
                    />
                  </div>
                </div>

                {/* Password & Confirm */}
                <div
                  className={`
                    grid grid-cols-2 gap-4
                    transform transition-all duration-700 delay-800
                    ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }
                  `}
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock
                          className={`w-5 h-5 transition-colors duration-300 ${
                            focusedField === "password"
                              ? "text-teal-500"
                              : "text-gray-400"
                          }`}
                        />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={onInputChange}
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField("")}
                        className={`
                          w-full pl-12 pr-10 py-3 bg-white border-2 rounded-xl
                          text-gray-800 placeholder-gray-400 text-sm
                          transition-all duration-300 focus:outline-none
                          ${
                            focusedField === "password"
                              ? "border-teal-500 shadow-lg shadow-teal-500/20 bg-teal-50/30"
                              : "border-gray-200 hover:border-gray-300"
                          }
                        `}
                        placeholder="••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-teal-500 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Confirm
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock
                          className={`w-5 h-5 transition-colors duration-300 ${
                            focusedField === "confirmPassword"
                              ? "text-teal-500"
                              : "text-gray-400"
                          }`}
                        />
                      </div>
                      <input
                        type={showConfirm ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={onInputChange}
                        onFocus={() => setFocusedField("confirmPassword")}
                        onBlur={() => setFocusedField("")}
                        className={`
                          w-full pl-12 pr-10 py-3 bg-white border-2 rounded-xl
                          text-gray-800 placeholder-gray-400 text-sm
                          transition-all duration-300 focus:outline-none
                          ${
                            focusedField === "confirmPassword"
                              ? "border-teal-500 shadow-lg shadow-teal-500/20 bg-teal-50/30"
                              : "border-gray-200 hover:border-gray-300"
                          }
                        `}
                        placeholder="••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-teal-500 transition-colors"
                      >
                        {showConfirm ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Terms Checkbox */}
                <div
                  className={`
                    transform transition-all duration-700 delay-900
                    ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }
                  `}
                >
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center mt-0.5">
                      <input
                        type="checkbox"
                        name="agree"
                        checked={formData.agree}
                        onChange={onInputChange}
                        className="w-5 h-5 text-teal-600 border-2 border-gray-300 rounded focus:ring-teal-500 cursor-pointer transition-all"
                      />
                    </div>
                    <span className="text-sm text-gray-600 leading-relaxed">
                      I agree to the{" "}
                      <span
                        // href="/terms"
                        className="text-teal-600 hover:text-teal-700 font-semibold hover:underline"
                      >
                        Terms & Conditions
                      </span>{" "}
                      and{" "}
                      <span
                        // href="/privacy"
                        className="text-teal-600 hover:text-teal-700 font-semibold hover:underline"
                      >
                        Privacy Policy
                      </span>
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!formData.agree || isLoading}
                  className={`
                    group relative w-full bg-gradient-to-r from-teal-600 to-cyan-600 
                    text-white px-6 py-3 rounded-xl font-bold text-lg
                    shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40
                    transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                    overflow-hidden
                    transform transition-all duration-700 delay-1000
                    ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }
                  `}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <span>Create Account</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>

                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>

                {/* Login Link */}
                <div
                  className={`
                    text-center
                    transform transition-all duration-700 delay-1100
                    ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }
                  `}
                >
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-teal-600 hover:text-teal-700 font-bold transition-colors hover:underline"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(50px, 50px) scale(1.05);
          }
        }

        .animate-blob {
          animation: blob 15s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Register;
