"use client";

import React, { useState, useEffect, useRef } from "react";
import { Eye } from "lucide-react";
import SmartIcon from "@/libs/shared/SmartIcon";

export default function OurVision({ vision, visionFeatures = [] }) {
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

  // Image badges from vision object
  const imageBadges = [
    {
      icon: vision?.vision_image_badge_one_icon,
      label: vision?.vision_image_badge_one,
      position: "top-6 left-6",
    },
    {
      icon: vision?.vision_image_badge_two_icon,
      label: vision?.vision_image_badge_two,
      position: "top-1/2 right-6",
    },
    {
      icon: vision?.vision_image_badge_three_icon,
      label: vision?.vision_image_badge_three,
      position: "bottom-6 right-6",
    },
  ].filter((b) => b.label);

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-cyan-50/30 via-white to-blue-50/50 py-20 px-6 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-200/15 to-indigo-200/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 border-2 border-cyan-300/30 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-14 h-14 bg-blue-300/20 rotate-45 animate-bounce"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div
            className={`lg:order-1 transition-all duration-1000 ${isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-8"
              }`}
          >
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <img
                  src={vision?.vision_image}
                  alt="Vision"
                  className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-transparent to-blue-900/20"></div>

                {imageBadges.map((badge, i) => {
                  const colors = [
                    "text-cyan-500",
                    "text-pink-500",
                    "text-[#023f4d]",
                  ];
                  return (
                    <div
                      key={i}
                      className={`absolute ${badge.position} bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg`}
                    >
                      <div className="flex items-center space-x-2">
                        <SmartIcon
                          icon={badge.icon}
                          className={`w-5 h-5 ${colors[i]}`}
                          alt={badge.label}
                        />
                        <span className="text-sm font-semibold text-gray-700">
                          {badge.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div
            className={`lg:order-2 transition-all duration-1000 delay-300 ${isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-8"
              }`}
          >
            <div className="mb-12">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full px-6 py-3 mb-6">
                <Eye className="w-5 h-5 text-cyan-600" />
                <span className="text-cyan-700 font-semibold">
                  {vision?.vision_badge || "Our Vision"}
                </span>
              </div>

              <h2 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
                {vision?.vision_title || "A World Connected by Arabic"}
              </h2>

              {/* <p className="text-xl text-gray-600 leading-relaxed mb-8">
                 {vision?.vision_description}
              </p> */}

              <div dangerouslySetInnerHTML={{ __html: vision?.vision_description }} />
            </div>

            {/* Vision Features */}
            <div className="space-y-6 mb-10">
              {visionFeatures.map((element, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-4 transition-all duration-700 ${isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4"
                    }`}
                  style={{ transitionDelay: `${(index + 1) * 200 + 500}ms` }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-[#023f4d] rounded-xl flex items-center justify-center flex-shrink-0">
                    <SmartIcon
                      icon={element.icon}
                      className="w-6 h-6 text-white"
                      alt={element.title}
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      {element.title}
                    </h4>
                    <p className="text-gray-600">{element.description}</p>
                  </div>
                </div>
              ))}
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
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}