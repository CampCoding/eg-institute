"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  BookOpen,
  Users,
  Globe,
  Star,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function OurStory() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 } // Reduced threshold for mobile
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* Mobile/Tablet Background */}
      <div className="lg:hidden absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600"></div>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay",
          }}
        ></div>
      </div>

      {/* Desktop Split Background */}
      <div className="hidden lg:grid absolute inset-0 lg:grid-cols-2">
        {/* Left Side - Gradient */}
        <div className="bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600"></div>

        {/* Right Side - Image */}
        <div
          className="relative"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-slate-900/50 to-slate-900/80"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center py-12 md:py-16 lg:py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div
              className={`text-white transition-all duration-700 md:duration-1000 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4 md:-translate-x-8"
              }`}
            >
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 md:mb-8">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-teal-200" />
                <span className="text-sm sm:text-base font-semibold">
                  Our Story
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8">
                Our <span className="text-teal-200">Story</span>
              </h1>

              <div className="space-y-4 sm:space-y-5 md:space-y-6 text-base sm:text-lg leading-relaxed text-gray-100">
                <p>
                  At the Egyptian Institute of Arabic Language, we envision a
                  world where Arabic becomes a{" "}
                  <span className="text-teal-200 font-semibold">
                    bridge — connecting cultures
                  </span>
                  , strengthening communication, and inspiring understanding.
                </p>

                <p>
                  Our vision is to make Arabic a truly global and accessible
                  language for everyone, everywhere.
                </p>

                <p className="hidden sm:block">
                  We aim to lead this movement by combining cultural immersion
                  with innovative teaching methods, empowering learners to
                  embrace Arabic with confidence, pride, and joy.
                </p>

                {/* Shortened version for mobile */}
                <p className="sm:hidden">
                  We combine cultural immersion with innovative methods,
                  empowering learners to embrace Arabic with confidence and joy.
                </p>
              </div>
            </div>

            {/* Right Side - Milestones */}
            <div
              className={`transition-all duration-700 md:duration-1000 delay-200 md:delay-300 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4 md:translate-x-8"
              }`}
            >
              {/* Mobile Milestones - Compact Cards */}
              <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-4">
                {[
                  {
                    icon: BookOpen,
                    year: "2019",
                    title: "Founded",
                    desc: "Started our journey",
                  },
                  {
                    icon: Users,
                    year: "2021",
                    title: "10K+ Students",
                    desc: "Global community",
                  },
                  {
                    icon: Globe,
                    year: "2024",
                    title: "50+ Countries",
                    desc: "Worldwide impact",
                  },
                ].map((milestone, index) => {
                  const Icon = milestone.icon;
                  return (
                    <div
                      key={index}
                      className={`bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 transition-all duration-500 ${
                        isVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                      style={{
                        transitionDelay: `${(index + 1) * 100 + 300}ms`,
                      }}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="bg-teal-500/80 text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                          {milestone.year}
                        </span>
                      </div>
                      <h3 className="text-white font-bold text-sm mb-1">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-200 text-xs">{milestone.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* Desktop Milestones - Original Layout */}
              <div className="hidden lg:block space-y-8">
                {[
                  {
                    icon: BookOpen,
                    year: "2019",
                    title: "Founded with Vision",
                    desc: "Started our journey to revolutionize Arabic education",
                  },
                  {
                    icon: Users,
                    year: "2021",
                    title: "Community Growth",
                    desc: "Reached 10,000+ students across the globe",
                  },
                  {
                    icon: Globe,
                    year: "2024",
                    title: "Global Impact",
                    desc: "Expanded to 50+ countries with innovative methods",
                  },
                ].map((milestone, index) => {
                  const Icon = milestone.icon;
                  return (
                    <div
                      key={index}
                      className={`flex items-start space-x-6 transition-all duration-700 ${
                        isVisible
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-4"
                      }`}
                      style={{
                        transitionDelay: `${(index + 1) * 200 + 600}ms`,
                      }}
                    >
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </div>

                      <div className="text-white">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold">
                            {milestone.title}
                          </h3>
                          <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {milestone.year}
                          </span>
                        </div>
                        <p className="text-gray-200 leading-relaxed">
                          {milestone.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
