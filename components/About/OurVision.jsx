"use client";

import React, { useState, useEffect, useRef } from "react";
import { Eye, ArrowRight, Sparkles, Globe, Heart, Star } from "lucide-react";

export default function OurVision() {
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
  const visionElements = [
    {
      icon: Globe,
      title: "Global & Accessible",
      description:
        "Making Arabic a truly global and accessible language for everyone, everywhere.",
    },
    {
      icon: Heart,
      title: "Bridge Between Cultures",
      description:
        "Using Arabic as a bridge — connecting cultures, strengthening communication, and inspiring understanding.",
    },
    {
      icon: Star,
      title: "Immersion + Innovation",
      description:
        "Combining cultural immersion with innovative teaching methods to help learners embrace Arabic with confidence, pride, and joy.",
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
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Global Arabic learning community"
                  className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-transparent to-blue-900/20"></div>

                {/* Floating Elements */}
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-5 h-5 text-cyan-500" />
                    <span className="text-sm font-semibold text-gray-700">
                      Worldwide Reach
                    </span>
                  </div>
                </div>

                <div
                  className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
                  style={{ animationDelay: "1s" }}
                >
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-[#023f4d]" />
                    <span className="text-sm font-semibold text-gray-700">
                      Excellence
                    </span>
                  </div>
                </div>

                <div
                  className="absolute top-1/2 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
                  style={{ animationDelay: "2s" }}
                >
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-pink-500" />
                    <span className="text-sm font-semibold text-gray-700">
                      With Passion
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              {/* <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-15 animate-pulse delay-500"></div> */}
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
                <Eye className="w-5 h-5 text-cyan-600" />
                <span className="text-cyan-700 font-semibold">Our Vision</span>
              </div>

              <h2 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
                A World{" "}
                <span className="bg-gradient-to-r from-cyan-600 to-[#023f4d] bg-clip-text text-transparent">
                  Connected
                </span>{" "}
                by Arabic
              </h2>

              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                At the Egyptian Institute of Arabic Language, we envision a
                world where Arabic becomes a bridge — connecting cultures,
                strengthening communication, and inspiring understanding. Our
                vision is to make Arabic a truly global and accessible language
                for everyone, everywhere. We aim to lead this movement by
                combining cultural immersion with innovative teaching methods,
                empowering learners to embrace Arabic with confidence, pride,
                and joy.
              </p>

              {/*    <p className="text-xl text-gray-600 leading-relaxed mb-8">
                At the Egyptian Institute of Arabic Language, we dream of a
                world where the Arabic language connects cultures, bridges gaps,
                and inspires communication. Our vision is to make Arabic a
                global language, accessible to everyone, everywhere.
              </p> */}

              {/* <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-100/50 mb-8">
                <p className="text-gray-700 italic text-lg">
                  "We aspire to lead this movement by combining cultural
                  immersion with innovative teaching methods, empowering
                  learners to embrace Arabic with confidence and joy."
                </p>
              </div> */}
            </div>

            {/* Vision Elements */}
            <div className="space-y-6 mb-10">
              {visionElements.map((element, index) => {
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
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-[#023f4d] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        {element.title}
                      </h4>
                      <p className="text-gray-600">{element.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            {/* <div
              className={`transition-all duration-1000 delay-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <button className="bg-gradient-to-r from-cyan-600 to-[#023f4d] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden group">
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Join Our Vision</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#023f4d] to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div> */}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
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
