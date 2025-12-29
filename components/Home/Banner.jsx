"use client";
import React from "react";
import {
  Star,
  Users,
  BookOpen,
  Award,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Banner = () => {
  const slides = [
    {
      id: 1,
      backgroundImage: "/3.png",
      badge: "WELCOME TO THE EGYPTIAN INSTITUTE OF ARABIC LANGUAGE",
      title: "Learn Arabic with professionals",
      highlightedText: "",
      subtitle: "",
      subtitle2: "",
      highlightedText2: "",
      description: `Specialized & Native teachers with 15+ years of experience in
teaching Arabic to non-native speakers — live, interactive, and fun!`,
      primaryButton: "Start Your Journey",
      secondaryButton: "DISCOVER MORE",
    },
    {
      id: 2,
      backgroundImage: "/images/EgyptianArabic.png",
      badge: "LEARN ARABIC WITH NATIVE SPEAKERS",
      title: "More than language…  ",
      highlightedText: "it’s lifestyle",
      subtitle: "",
      subtitle2: "",
      highlightedText2: "",
      description: `Break the “random books” cycle and join a full structured program
that teaches real Egyptian Arabic + grammar in a fun, natural way.`,
      primaryButton: "Learn Egyptian",
      secondaryButton: "VIEW PROGRAMS",
    },
    {
      id: 3,
      backgroundImage: "/10.png",
      badge: "JOIN OUR COMMUNITY OF LEARNERS",
      title: "Sound  ",
      highlightedText: "smart  ",
      subtitle: "Speak beautifully",
      subtitle2: "",
      highlightedText2: "",
      description: `Not just grammar lessons — our method makes you live the rules
through real use. Forget confusion — we make grammar click naturally.
`,
      primaryButton: " Explore MSA",
      secondaryButton: "SUCCESS STORIES",
    },
    {
      id: 4,
      backgroundImage: "/images/PrivateLessons.png",
      badge: "JOIN OUR COMMUNITY OF LEARNERS",
      title: "100%   ",
      highlightedText: "Personal.",
      subtitle: "",
      subtitle2: "0% Boring.",
      highlightedText2: "",
      description: `Your time, your goals, your teacher — a private plan designed to
make Arabic truly yours.`,
      primaryButton: "Go Private",
    },
    {
      id: 5,
      backgroundImage: "/images/GROUPCLASSES.png",
      badge: "JOIN OUR COMMUNITY OF LEARNERS",
      title: " Speak up. ",
      highlightedText: "  ",
      subtitle: "Laugh.",
      subtitle2: "Connect.",
      highlightedText2: "",
      description: ` Join small, friendly groups and practice Arabic in real conversations
— culture included.`,
      primaryButton: "Join a Group",
    },
    {
      id: 6,
      backgroundImage: "/images/KidsCourses.png",
      badge: "Arabic Learning for Kids",
      title: "Learn",
      highlightedText: "  ",
      subtitle: "Play",
      subtitle2: "Speak Arabic",
      highlightedText2: "",
      description: `Fun live classes that spark curiosity and build confidence — kids
learn through joy, not pressure.`,
      primaryButton: "For Kids",
    },
  ];

  return (
    <main className=" relative z-10 overflow-hidden border-b border-primary border-dashed">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        pagination={{
          el: ".swiper-pagination-custom",
          clickable: true,
          bulletClass: "swiper-pagination-bullet-custom",
          bulletActiveClass: "swiper-pagination-bullet-active-custom",
        }}
        autoplay={
          false
          // {
          //   delay: 4000,
          //   disableOnInteraction: false,
          //   pauseOnMouseEnter: true,
          // }
        }
        loop={true}
        className="hero-slider"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative min-h-[100vh] bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.backgroundImage})` }}
            >
              {/* Enhanced Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

              <div className="relative z-10 container mx-auto md:!px-6 px-3 py-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
                  {/* Left Content */}
                  <div className="space-y-6 md:space-y-8">
                    <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-md rounded-full px-4 md:px-6 py-2 md:py-3 border border-white/50 shadow-lg">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-xs uppercase tracking-widest transform md:text-sm font-semibold text-gray-700">
                        {slide.badge}
                      </span>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                      <h1 className="text-3xl  md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight drop-shadow-2xl">
                        {slide.title}{" "}
                        <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
                          {slide.highlightedText}
                        </span>
                        {slide.subtitle && (
                          <>
                            <br />
                            {slide.subtitle}
                          </>
                        )}
                        <br />
                        {slide.subtitle2}{" "}
                        <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                          {slide.highlightedText2}
                        </span>
                      </h1>

                      <p className="text-base md:text-lg lg:text-xl text-gray-100 leading-relaxed max-w-xl drop-shadow-lg">
                        {slide.description}
                      </p>
                    </div>

                    {/* Enhanced Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
                      <button className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden group shadow-lg">
                        <span className="relative z-10 flex items-center justify-center space-x-2">
                          <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
                          <span className="text-sm md:text-base">
                            {slide.primaryButton}
                          </span>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </button>

                      {slide.secondaryButton && (
                        <button className="border-2 border-white/90 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:bg-white/20 hover:border-white transition-all duration-300 backdrop-blur-md bg-white/10 shadow-lg">
                          <span className="text-sm md:text-base">
                            {slide.secondaryButton}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Right Content - Enhanced Floating Elements (Desktop Only) */}
                  <div className="relative hidden lg:block">
                    <div className="relative z-10">
                      {/* Floating elements with enhanced design */}
                      <div className="absolute top-10 right-10 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl animate-bounce border border-white/30">
                        <Star className="w-8 h-8 text-yellow-500" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                      </div>

                      <div className="absolute top-1/3 left-10 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-2xl p-4 shadow-2xl animate-pulse">
                        <BookOpen className="w-8 h-8" />
                        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-teal-300 rounded-full opacity-70"></div>
                      </div>

                      <div className="absolute bottom-1/4 right-16 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl animate-bounce delay-700 border border-white/30">
                        <Award className="w-8 h-8 text-teal-600" />
                        <div className="absolute -top-2 -right-2 w-5 h-5 bg-teal-400 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons - Hidden on Mobile & Tablet, Visible on Desktop Only */}
      <div className="swiper-button-prev-custom md:flex hidden absolute left-6 top-1/2 transform -translate-y-1/2 z-20 w-14 h-14 bg-white/20 backdrop-blur-md border border-white/30 rounded-full items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-300 shadow-lg">
        <ChevronLeft className="w-7 h-7 text-white" />
      </div>
      <div className="swiper-button-next-custom md:flex hidden absolute right-6 top-1/2 transform -translate-y-1/2 z-20 w-14 h-14 bg-white/20 backdrop-blur-md border border-white/30 rounded-full items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-300 shadow-lg ">
        <ChevronRight className="w-7 h-7 text-white" />
      </div>

      {/* Enhanced Custom Pagination - Always Visible */}
      <div className="swiper-pagination-custom absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3"></div>

      <style jsx>{`
        .swiper-pagination-bullet-custom {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }
        .swiper-pagination-bullet-active-custom {
          background: linear-gradient(to right, #0d9488, #0891b2);
          width: 36px;
          border-radius: 8px;
          border: 2px solid rgba(255, 255, 255, 0.8);
        }
        .hero-slider .swiper-slide {
          height: auto;
        }

        /* Additional animations */
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .floating-element {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
};

export default Banner;
