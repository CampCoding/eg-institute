"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Target,
  ArrowRight,
  CheckCircle,
  Globe,
  BookOpen,
  Users,
} from "lucide-react";

export default function OurMission() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const missionPoints = [
    {
      icon: BookOpen,
      title: "Modern Teaching Methods",
      description:
        "Innovative approaches that make learning Arabic engaging and effective",
    },
    {
      icon: Users,
      title: "Personalized Experience",
      description:
        "Tailored learning paths that adapt to your goals and lifestyle",
    },
    {
      icon: Globe,
      title: "Cultural Bridge",
      description:
        "Connecting learners with authentic Arabic culture and traditions",
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/50 py-20 px-6 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <div
            className={`lg:order-1 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full px-6 py-3 mb-6">
              <Target className="w-5 h-5 text-emerald-600" />
              <span className="text-emerald-700 font-semibold">
                Our Mission
              </span>
            </div>

            <h2 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
              Redefining{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Arabic Learning
              </span>
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Our mission is to revolutionize how Arabic is taught and learned
              through modern technology, interactive methods, and cultural
              insights for a personalized learning experience.
            </p>

            <div className="space-y-6 mb-10">
              {missionPoints.map((point, index) => {
                const Icon = point.icon;
                return (
                  <div
                    key={index}
                    className={`flex items-start space-x-4 transition-all duration-700 ${
                      isVisible
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-4"
                    }`}
                    style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        {point.title}
                      </h4>
                      <p className="text-gray-600">{point.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image Side - NEW IMAGE */}
          <div
            className={`lg:order-2 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=2128&q=80"
                  alt="Modern Arabic learning with technology"
                  className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-transparent to-teal-900/20"></div>

                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-semibold text-gray-700">
                      Interactive Learning
                    </span>
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
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
