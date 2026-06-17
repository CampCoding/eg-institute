"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Sparkles, Star, TrendingUp } from "lucide-react";
import SmartIcon from "@/libs/shared/SmartIcon";

export default function AboutSection({ overview, features = [] }) {
  const [counterValue, setCounterValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const sectionRef = useRef(null);

  // استخراج رقم من counter_one_value (مثال: "15+" → 15)
  const counterOneNumber = parseInt(overview?.counter_one_value) || 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          let start = 0;
          const end = counterOneNumber;
          if (end === 0) return;
          const step = Math.max(1, Math.ceil(end / 30));
          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              setCounterValue(end);
              clearInterval(timer);
            } else {
              setCounterValue(start);
            }
          }, 50);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [counterOneNumber]);

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-100 py-20 px-6 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-teal-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-200/15 to-indigo-200/15 rounded-full blur-3xl animate-pulse delay-1000"></div>

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

        <div className="absolute top-1/4 right-1/4 w-16 h-16 border-4 border-teal-300/40 rounded-lg animate-spin-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div
            className={`space-y-8 transform transition-all duration-1000 ${isVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-20 opacity-0"
              }`}
          >
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-100 to-cyan-100 rounded-full px-6 py-3 animate-fade-in">
                <Sparkles className="w-5 h-5 text-teal-600 animate-pulse" />
                <span className="text-teal-700 font-semibold tracking-wider">
                  WHO WE ARE
                </span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  {overview?.header_title || "Egyptian Institute"}
                </span>
              </h2>
            </div>

            {/* Description from API (HTML) */}
            {overview?.description && (
              <div
                className="text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: overview.description }}
              />
            )}

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group p-2 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/50 hover:bg-white/80 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-1 ${isVisible ? "animate-fade-in" : "opacity-0"
                    }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="min-w-[40px] w-10 h-10 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <SmartIcon
                        icon={feature.icon}
                        className="w-5 h-5 text-white"
                        alt={feature.title}
                      />
                    </div>
                    <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                      {feature.title}
                    </span>
                  </div>

                  <div
                    className={`mt-2 h-1 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full transform origin-left transition-transform duration-300 ${hoveredFeature === index ? "scale-x-100" : "scale-x-0"
                      }`}
                  ></div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div
              className={`pt-4 ${isVisible ? "animate-fade-in" : "opacity-0"}`}
              style={{ animationDelay: "1s" }}
            >
              <button className="group bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-500 relative overflow-hidden hover:scale-105">
                <span className="relative z-10 flex items-center space-x-2">
                  <span>DISCOVER MORE</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 transform scale-150"></div>
              </button>
            </div>
          </div>

          {/* Right Content */}
          <div
            className={`relative transform transition-all duration-1000 delay-300 ${isVisible
              ? "translate-x-0 opacity-100"
              : "translate-x-20 opacity-0"
              }`}
          >
            {/* Counter One Badge */}
            <div className="absolute -top-8 -left-8 z-20 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-3xl p-6 shadow-2xl animate-bounce">
              <div className="text-center text-white">
                <div className="text-4xl font-bold mb-2 flex items-center justify-center">
                  <span className="animate-count">{counterValue}</span>
                  {overview?.counter_one_value?.includes("+") && (
                    <span className="text-2xl ml-1">+</span>
                  )}
                </div>
                <div className="text-sm font-medium opacity-90">
                  {overview?.counter_one_label || "Hours of Experience"}
                </div>
              </div>

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

            {/* Main Image */}
            <div className="relative bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl p-8 shadow-2xl">
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

              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={overview?.content_image || "/images/about.png"}
                  alt="About"
                  className="w-full h-auto"
                />
              </div>

              {/* Counter Two Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-800">
                      {overview?.counter_two_value || "98%"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {overview?.counter_two_label || "Success Rate"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out both;
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
      `}</style>
    </div>
  );
}