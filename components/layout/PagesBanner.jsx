"use client";

import React, { useState, useEffect, useRef } from "react";

const PagesBanner = ({
  title,
  subTitle,
  backgroundImage = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80", // Default students studying image
  overlayOpacity = 0.7,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

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

  // Typewriter effect for subtitle
  const [displayedText, setDisplayedText] = useState("");
  const fullText =
    subTitle ||
    "Join our community of learners and start your journey towards success.";

  useEffect(() => {
    if (isVisible) {
      let index = 0;
      const timer = setInterval(() => {
        if (index < fullText.length) {
          setDisplayedText(fullText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [isVisible, fullText]);

  return (
    <div
      ref={sectionRef}
      className="relative py-[120px] min-h-[70vh] object-top flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundColor: backgroundImage ? "transparent" : undefined,
      }}
    >
      {/* Background Overlay */}
      {backgroundImage ? (
        <div
          className="absolute inset-0 bg-gradient-to-br from-teal-900/80 via-teal-900/70 to-teal-900/60"
          style={{ opacity: overlayOpacity }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50" />
      )}

      {/* Animated Background Elements (only when no background image) */}
      {!backgroundImage && (
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating geometric shapes */}
          <div
            className={`absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-cyan-200/20 to-teal-300/10 rounded-full blur-2xl transform transition-all duration-3000 ease-in-out animate-float-slow ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
          />

          <div
            className={`absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-bl from-blue-200/15 to-cyan-200/10 rounded-full blur-xl transform transition-all duration-4000 ease-out animate-float-medium ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          />

          <div
            className={`absolute bottom-1/4 right-1/3 w-32 h-32 bg-gradient-to-tr from-teal-200/20 to-emerald-200/10 rounded-full blur-lg transform transition-all duration-2500 ease-in-out animate-float-fast ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-25"
            }`}
          />

          {/* Geometric shapes */}
          <div
            className={`absolute top-1/2 left-1/6 w-16 h-16 bg-gradient-to-r from-blue-300/15 to-cyan-300/10 transform rotate-45 rounded-lg blur-sm transition-all duration-3000 ease-out animate-pulse-slow ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          />

          <div
            className={`absolute bottom-1/3 left-1/3 w-12 h-12 bg-gradient-to-l from-teal-300/20 to-emerald-300/10 rounded-full blur-sm transition-all duration-2000 ease-in-out animate-bounce-slow ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        {/* Title */}
        <h1
          ref={titleRef}
          className={`text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 transform transition-all duration-1000 ease-out ${
            backgroundImage
              ? "text-white drop-shadow-2xl"
              : "bg-gradient-to-r from-slate-800 via-blue-900 to-cyan-800 bg-clip-text"
          } ${
            isVisible
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-12 opacity-0 scale-95"
          }`}
          style={{
            textShadow: backgroundImage
              ? "0 4px 30px rgba(0,0,0,0.5)"
              : "0 4px 20px rgba(0,0,0,0.1)",
            filter: isVisible ? "blur(0px)" : "blur(2px)",
          }}
        >
          {title?.split("").map((char, index) =>
            char === " " ? (
              <span className="inline-block w-4" key={index}></span>
            ) : (
              <span
                className="inline-block transition-all duration-500 ease-out animate-slide-up"
                style={{
                  animationDelay: `${index * 0.08}s`,
                  animationFillMode: "both",
                }}
                key={index}
              >
                {char}
              </span>
            )
          )}
        </h1>

        {/* Subtitle with Typewriter Effect */}
        <div
          ref={subtitleRef}
          className={`text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed font-medium transform transition-all duration-1200 delay-300 ease-out ${
            backgroundImage ? "text-gray-100 drop-shadow-lg" : "text-slate-600"
          } ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{
            textShadow: backgroundImage
              ? "0 2px 10px rgba(0,0,0,0.3)"
              : undefined,
          }}
        >
          <span className="relative">
            {displayedText}
            {isVisible && displayedText.length < fullText.length && (
              <span
                className={`animate-pulse w-0.5 h-6 ml-1 inline-block ${
                  backgroundImage ? "bg-gray-100" : "bg-slate-600"
                }`}
              />
            )}
          </span>
        </div>

        {/* Decorative Elements */}
        <div
          className={`mt-12 flex justify-center items-center space-x-4 transform transition-all duration-1500 delay-500 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full animate-bounce ${
                backgroundImage
                  ? "bg-gradient-to-r from-cyan-300 to-teal-400"
                  : "bg-gradient-to-r from-cyan-400 to-teal-500"
              }`}
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: "2s",
                boxShadow: backgroundImage
                  ? "0 0 20px rgba(34, 211, 238, 0.4)"
                  : undefined,
              }}
            />
          ))}
        </div>

        {/* Glow Effect */}
        <div
          className={`absolute inset-0 -z-10 rounded-full blur-3xl transition-all duration-1000 ${
            backgroundImage
              ? "bg-gradient-radial from-cyan-400/20 via-transparent to-transparent"
              : "bg-gradient-radial from-cyan-100/50 via-transparent to-transparent"
          }`}
          style={{
            transform: `scale(${isVisible ? 1.2 : 0.8})`,
            opacity: isVisible ? 0.6 : 0,
          }}
        />
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-2000 delay-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div
          className={`w-6 h-10 border-2 rounded-full flex justify-center ${
            backgroundImage ? "border-gray-300" : "border-slate-300"
          }`}
        >
          <div
            className={`w-1 h-3 rounded-full mt-2 animate-bounce ${
              backgroundImage ? "bg-gray-300" : "bg-slate-400"
            }`}
          />
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes float-medium {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(-3deg);
          }
        }

        @keyframes float-fast {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(8deg);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 8s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
};

export default PagesBanner;
