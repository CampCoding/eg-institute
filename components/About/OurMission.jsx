"use client";

import React, { useState, useEffect, useRef } from "react";
import { Target, CheckCircle } from "lucide-react";
import SmartIcon from "@/libs/shared/SmartIcon";

export default function OurMission({ mission, missionFeatures = [] }) {
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

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/50 py-20 px-6 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <div
            className={`lg:order-1 transition-all duration-1000 ${isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-8"
              }`}
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full px-6 py-3 mb-6">
              <Target className="w-5 h-5 text-emerald-600" />
              <span className="text-emerald-700 font-semibold">
                {mission?.mission_badge || "Our Mission"}
              </span>
            </div>

            <h2 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
              {mission?.mission_title || "Redefining Arabic Learning"}
            </h2>

            {/* <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {mission?.mission_description}
            </p> */}

            <div dangerouslySetInnerHTML={{ __html: mission?.mission_description }} />

            <div className="space-y-6 mb-10">
              {missionFeatures.map((point, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-4 transition-all duration-700 ${isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4"
                    }`}
                  style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <SmartIcon
                      icon={point.icon}
                      className="w-6 h-6 text-white"
                      alt={point.title}
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      {point.title}
                    </h4>
                    <p className="text-gray-600">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Side */}
          <div
            className={`lg:order-2 transition-all duration-1000 delay-300 ${isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-8"
              }`}
          >
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <img
                  src={mission?.mission_image}
                  alt="Mission"
                  className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-transparent to-teal-900/20"></div>

                {mission?.mission_image_badge && (
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span className="text-sm font-semibold text-gray-700">
                        {mission.mission_image_badge}
                      </span>
                    </div>
                  </div>
                )}
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