"use client";

import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [focusedField, setFocusedField] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      localStorage.setItem("egy-user", JSON.stringify(formData));
      router.push("/");
    }, 1500);
  };

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
    // {
    //   icon: Award,
    //   title: "Certificates",
    //   description: "Recognized worldwide",
    //   color: "from-purple-500 to-pink-500",
    // },
    // {
    //   icon: Globe,
    //   title: "50+ Countries",
    //   description: "Global community",
    //   color: "from-orange-500 to-red-500",
    // },
  ];

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
        <div className="grid lg:grid-cols-2 min-h-[600px]">
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
                  space-y-4 mb-12
                  transform transition-all duration-700 delay-300
                  ${
                    isVisible
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-12 opacity-0"
                  }
                `}
              >
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Welcome Back!
                </h1>
                <p className="text-lg text-white/90 leading-relaxed max-w-md">
                  Continue your Arabic learning journey. Sign in to access your
                  personalized dashboard and lessons.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4">
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
                      style={{ transitionDelay: `${400 + index * 100}ms` }}
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
                transform transition-all duration-700 delay-800
                ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }
              `}
            >
              <p className="text-white/80 italic text-sm">
                "Learning Arabic opens doors to rich cultures and endless
                opportunities."
              </p>
            </div>
          </div>

          {/* Right Side - Login Form */}
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
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Sign In
                </h2>
                <p className="text-gray-600">
                  Enter your credentials to continue
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div
                  className={`
                    transform transition-all duration-700 delay-500
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
                  <div className="relative group">
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
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField("")}
                      className={`
                        w-full pl-12 pr-4 py-4 bg-white border-2 rounded-xl
                        text-gray-800 placeholder-gray-400
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

                {/* Password Field */}
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
                    Password
                  </label>
                  <div className="relative group">
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
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField("")}
                      className={`
                        w-full pl-12 pr-12 py-4 bg-white border-2 rounded-xl
                        text-gray-800 placeholder-gray-400
                        transition-all duration-300 focus:outline-none
                        ${
                          focusedField === "password"
                            ? "border-teal-500 shadow-lg shadow-teal-500/20 bg-teal-50/30"
                            : "border-gray-200 hover:border-gray-300"
                        }
                      `}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-teal-500 transition-colors duration-300"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div
                  className={`
                    flex items-center justify-between
                    transform transition-all duration-700 delay-700
                    ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }
                  `}
                >
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500 cursor-pointer"
                    />
                    <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                      Remember me
                    </span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-teal-600 hover:text-teal-700 font-semibold transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`
                    group relative w-full bg-gradient-to-r from-teal-600 to-cyan-600 
                    text-white px-6 py-4 rounded-xl font-bold text-lg
                    shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40
                    transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
                    disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100
                    overflow-hidden
                    transform transition-all duration-700 delay-800
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
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>

                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>

                {/* Register Link */}
                <div
                  className={`
                    text-center
                    transform transition-all duration-700 delay-900
                    ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }
                  `}
                >
                  <p className="text-gray-600">
                    Don't have an account?{" "}
                    <Link
                      href="/register"
                      className="text-teal-600 hover:text-teal-700 font-bold transition-colors hover:underline"
                    >
                      Create Account
                    </Link>
                  </p>
                </div>
              </form>

              {/* Social Login (Optional) */}
              {/* <div 
                className={`
                  mt-8 pt-8 border-t border-gray-200
                  transform transition-all duration-700 delay-1000
                  ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                `}
              >
                <p className="text-center text-sm text-gray-500 mb-4">Or continue with</p>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-300">
                    <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
                    <span className="font-semibold text-gray-700">Google</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-300">
                    <img src="/facebook-icon.svg" alt="Facebook" className="w-5 h-5" />
                    <span className="font-semibold text-gray-700">Facebook</span>
                  </button>
                </div>
              </div> */}
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

export default Login;
