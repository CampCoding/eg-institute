"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  User,
  Heart,
  Play,
  Pause,
} from "lucide-react";

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [animationDirection, setAnimationDirection] = useState("next");

  const autoPlayRef = useRef(null);
  const sectionRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Ahmed",
      role: "Business Professional",
      company: "Tech Solutions Inc.",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "The Arabic learning experience has been absolutely transformative. The cultural immersion programs and personalized approach helped me achieve fluency faster than I ever imagined possible.",
      accent: "from-rose-400 to-pink-500",
      bgAccent: "from-rose-50 to-pink-50",
      location: "Dubai, UAE",
      courseCompleted: "Advanced Business Arabic",
      testimonialDate: "March 2024",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Travel Enthusiast & Blogger",
      company: "Wanderlust Adventures",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "The teaching methodology is exceptional and results-driven. I've traveled to 15 Arabic-speaking countries with confidence! The flexible learning paths made all the difference.",
      accent: "from-blue-400 to-indigo-500",
      bgAccent: "from-blue-50 to-indigo-50",
      location: "London, UK",
      courseCompleted: "Travel Arabic Intensive",
      testimonialDate: "February 2024",
    },
    {
      id: 3,
      name: "Layla Hassan",
      role: "University Student",
      company: "Cairo University",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "The flexible learning paths and tailored curriculum made it possible for me to balance my studies while mastering Arabic. The instructors are incredibly supportive and knowledgeable.",
      accent: "from-emerald-400 to-teal-500",
      bgAccent: "from-emerald-50 to-teal-50",
      location: "New York, USA",
      courseCompleted: "Academic Arabic Program",
      testimonialDate: "January 2024",
    },
    {
      id: 4,
      name: "Ahmed Al-Rashid",
      role: "Medical Professional",
      company: "International Hospital",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "As a healthcare professional working in diverse communities, mastering Arabic has been crucial. The medical Arabic specialization program exceeded my expectations completely.",
      accent: "from-purple-400 to-violet-500",
      bgAccent: "from-purple-50 to-violet-50",
      location: "Toronto, Canada",
      courseCompleted: "Medical Arabic Certification",
      testimonialDate: "April 2024",
    },
    {
      id: 5,
      name: "Fatima Al-Zahra",
      role: "Content Creator",
      company: "Digital Media Agency",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "The online platform is incredibly intuitive and the interactive lessons kept me engaged throughout my learning journey. I can now create content in Arabic with confidence.",
      accent: "from-amber-400 to-orange-500",
      bgAccent: "from-amber-50 to-orange-50",
      location: "Berlin, Germany",
      courseCompleted: "Digital Arabic Communication",
      testimonialDate: "May 2024",
    },
    {
      id: 6,
      name: "Omar Khalil",
      role: "Software Engineer",
      company: "Innovation Labs",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Learning Arabic while working full-time seemed impossible until I found this program. The bite-sized lessons and mobile app made it incredibly convenient to learn on the go.",
      accent: "from-cyan-400 to-blue-500",
      bgAccent: "from-cyan-50 to-blue-50",
      location: "San Francisco, USA",
      courseCompleted: "Professional Arabic",
      testimonialDate: "June 2024",
    },
  ];

  const cardsPerView = 3;
  const maxIndex = Math.max(0, testimonials.length - cardsPerView);

  // Auto-play logic
  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    if (isAutoPlaying && !isPaused) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 4000);
    }
  }, [isAutoPlaying, isPaused]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  // Initialize visibility and auto-play
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          startAutoPlay();
        } else {
          stopAutoPlay();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      stopAutoPlay();
    };
  }, [startAutoPlay, stopAutoPlay]);

  // Restart auto-play when settings change
  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [currentIndex, isAutoPlaying, isPaused, startAutoPlay, stopAutoPlay]);

  // Navigation functions
  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setAnimationDirection("next");
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      setTimeout(() => setIsAnimating(false), 100);
    }, 300);
  }, [isAnimating, maxIndex]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setAnimationDirection("prev");
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
      setTimeout(() => setIsAnimating(false), 100);
    }, 300);
  }, [isAnimating, maxIndex]);

  const goToSlide = useCallback(
    (index) => {
      if (isAnimating || index === currentIndex) return;

      setAnimationDirection(index > currentIndex ? "next" : "prev");
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentIndex(index);
        setTimeout(() => setIsAnimating(false), 100);
      }, 300);
    },
    [isAnimating, currentIndex]
  );

  // Touch/Swipe logic
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isVisible) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          prevSlide();
          break;
        case "ArrowRight":
          e.preventDefault();
          nextSlide();
          break;
        case " ":
          e.preventDefault();
          toggleAutoPlay();
          break;
        case "Escape":
          setIsPaused(!isPaused);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isVisible, nextSlide, prevSlide, isPaused]);

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // Get visible testimonials
  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + cardsPerView
  );

  // Fill remaining slots if needed
  while (
    visibleTestimonials.length < cardsPerView &&
    testimonials.length >= cardsPerView
  ) {
    const remainingSlots = cardsPerView - visibleTestimonials.length;
    visibleTestimonials.push(...testimonials.slice(0, remainingSlots));
  }

  return (
    <div
      ref={sectionRef}
      className="relative bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 py-16 px-4 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Controls Panel */}
      <div className="absolute top-4 right-4 z-40 flex items-center space-x-2">
        <button
          onClick={toggleAutoPlay}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isAutoPlaying
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-600"
          } hover:scale-110 shadow-lg`}
          title={isAutoPlaying ? "Disable Auto-play" : "Enable Auto-play"}
        >
          {isAutoPlaying ? (
            <Pause className="w-3 h-3" />
          ) : (
            <Play className="w-3 h-3" />
          )}
        </button>

        <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded shadow">
          {currentIndex + 1} / {maxIndex + 1}
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-24 h-24 bg-gradient-to-br from-rose-200/20 to-pink-200/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-xl animate-bounce-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-12 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover the transformative experiences of our Arabic language
            learners
          </p>
        </div>

        {/* Cards Container */}
        <div
          className={`transform transition-all duration-500 ${
            isAnimating
              ? animationDirection === "next"
                ? "translate-x-8 opacity-70"
                : "-translate-x-8 opacity-70"
              : "translate-x-0 opacity-100"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${currentIndex}-${index}`}
                className={`bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6 relative overflow-hidden group ${
                  isAnimating ? "scale-95" : "scale-100"
                }`}
                style={{
                  background: `linear-gradient(135deg, ${testimonial.bgAccent
                    .replace("from-", "")
                    .replace("to-", ", ")})`,
                }}
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                  <Quote className="w-full h-full text-slate-400 transform rotate-12" />
                </div>

                {/* Profile Section */}
                <div className="flex items-center mb-4">
                  <div className="relative">
                    <div
                      className={`absolute inset-0 w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.accent} animate-pulse opacity-30`}
                    ></div>
                    <img
                      src={testimonial.image}
                      // alt={testimonial.name}
                      className="relative w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg"
                      loading="lazy"
                    />
                    <div className="absolute -top-1 -right-1">
                      <div
                        className={`w-4 h-4 bg-gradient-to-r ${testimonial.accent} rounded-full flex items-center justify-center shadow-sm`}
                      >
                        <Heart className="w-2 h-2 text-white fill-current" />
                      </div>
                    </div>
                  </div>

                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-bold text-slate-800">
                      {testimonial.name}
                    </h3>
                    <p className="text-xs text-slate-600">{testimonial.role}</p>
                    <p className="text-xs text-slate-500">
                      {testimonial.company}
                    </p>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                  <span className="ml-2 text-xs text-slate-600 font-medium">
                    {testimonial.rating}.0
                  </span>
                </div>

                {/* Testimonial Text */}
                <div className="mb-4">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                </div>

                {/* Footer */}
                <div className="border-t border-slate-200 pt-3">
                  <p className="text-xs text-slate-500 mb-1">
                    <span className="font-medium">Course:</span>{" "}
                    {testimonial.courseCompleted}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-slate-400">
                      {testimonial.location}
                    </p>
                    <p className="text-xs text-slate-400">
                      {testimonial.testimonialDate}
                    </p>
                  </div>
                </div>

                {/* Hover Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${testimonial.accent} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center space-x-6">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="w-10 h-10 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-slate-600 hover:text-slate-800 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group"
            title="Previous testimonials (←)"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Dots Indicator */}
          <div className="flex space-x-2">
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isAnimating}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "w-8 h-2 bg-gradient-to-r from-blue-400 to-indigo-500 shadow-md"
                    : "w-2 h-2 bg-slate-300 hover:bg-slate-400 hover:scale-125"
                }`}
                title={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="w-10 h-10 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-slate-600 hover:text-slate-800 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group"
            title="Next testimonials (→)"
          >
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(5deg);
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

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default TestimonialSection;
