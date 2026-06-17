"use client";

import React, { useState, useEffect, useRef } from "react";
import { BookOpen, Gift, Lock, FileText, ShieldCheck } from "lucide-react";

export default function LearningMaterials() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const materialElements = [
    {
      icon: Gift,
      title: "All Materials Are Completely Free",
      description:
        "Every resource you receive — PDFs, worksheets, audio files, videos, lesson notes, and exercises — is provided at no additional cost throughout your course.",
    },
    {
      icon: Lock,
      title: "Copyright & Usage",
      description:
        "All materials are the intellectual property of the academy. They may not be shared, forwarded, reproduced, or distributed outside the program under any circumstances.",
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-cyan-50/30 via-white to-blue-50/50 py-20 px-6 relative overflow-hidden"
    >
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-200/15 to-indigo-200/15 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Geometric shapes */}
        <div className="absolute top-1/3 right-1/4 w-20 h-20 border-2 border-cyan-300/30 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-14 h-14 bg-blue-300/20 rotate-45 animate-bounce"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div
            className={`lg:order-1 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Learning materials"
                  className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-transparent to-blue-900/20"></div>

                {/* Floating badges */}
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Gift className="w-5 h-5 text-cyan-500" />
                    <span className="text-sm font-semibold text-gray-700">
                      Free Materials
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5 text-[#023f4d]" />
                    <span className="text-sm font-semibold text-gray-700">
                      Protected Content
                    </span>
                  </div>
                </div>

                <div className="absolute top-1/2 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-700">
                      PDFs • Audio • Video
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div
            className={`lg:order-2 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            {/* Header */}
            <div className="mb-12">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full px-6 py-3 mb-6">
                <BookOpen className="w-5 h-5 text-cyan-600" />
                <span className="text-cyan-700 font-semibold">
                  Learning Materials
                </span>
              </div>

              <h2 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
                Free &{" "}
                <span className="bg-gradient-to-r from-cyan-600 to-[#023f4d] bg-clip-text text-transparent">
                  Protected
                </span>{" "}
                Resources
              </h2>
            </div>

            {/* Material Elements */}
            <div className="space-y-6 mb-8">
              {materialElements.map((element, index) => {
                const Icon = element.icon;
                return (
                  <div
                    key={index}
                    className={`flex items-start space-x-4 transition-all duration-700 ${
                      isVisible
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-4"
                    }`}
                    style={{ transitionDelay: `${(index + 1) * 200 + 500}ms` }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-[#023f4d] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        {element.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {element.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Trust Note */}
            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "1100ms" }}
            >
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-100/50">
                <p className="text-gray-700 italic text-lg">
                  We trust your professionalism and appreciate your respect for
                  our copyrighted content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
