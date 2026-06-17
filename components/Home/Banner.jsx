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
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const FALLBACK_SLIDES = [
  {
    id: 1,
    backgroundImage: "/3.png",
    badge: "WELCOME TO THE EGYPTIAN INSTITUTE OF ARABIC LANGUAGE",
    title: "Learn Arabic with professionals",
    highlightedText: "",
    description: "Specialized & Native teachers with 15+ hours of experience in teaching Arabic to non-native speakers - live, interactive, and fun!",
    primaryButton: "Start Your Journey",
    primaryLink: "/courses",
    secondaryButton: "DISCOVER MORE",
    secondaryLink: "/about",
  },
];

const Banner = () => {
  const router = useRouter();
  const { home_data } = useSelector((state) => state.home);
  const heroData = home_data?.message?.hero;

  const slides = heroData?.length
    ? heroData.map((h) => ({
        id: h.id,
        backgroundImage: h.image,
        badge: h.badge,
        title: h.title,
        highlightedText: h.highlight_text || "",
        description: h.description,
        primaryButton: h.primary_button_text,
        primaryLink: h.primary_button_link,
        secondaryButton: h.secondary_button_text,
        secondaryLink: h.secondary_button_link,
      }))
    : FALLBACK_SLIDES;

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
        autoplay={false}
        loop={true}
        className="hero-slider"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative min-h-[100vh] bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.backgroundImage})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

              <div className="relative z-10 container mx-auto md:!px-6 px-3 py-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
                  <div className="space-y-6 md:space-y-8">
                    <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-md rounded-full px-4 md:px-6 py-2 md:py-3 border border-white/50 shadow-lg">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-xs uppercase tracking-widest transform md:text-sm font-semibold text-gray-700">
                        {slide.badge}
                      </span>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                      <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight drop-shadow-2xl">
                        {slide.title}{" "}
                        {slide.highlightedText && (
                          <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
                            {slide.highlightedText}
                          </span>
                        )}
                      </h1>

                      <p className="text-base md:text-lg lg:text-xl text-gray-100 leading-relaxed max-w-xl drop-shadow-lg">
                        {slide.description}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
                      {slide.primaryButton && (
                        <button
                          onClick={() => slide.primaryLink && router.push(slide.primaryLink)}
                          className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden group shadow-lg"
                        >
                          <span className="relative z-10 flex items-center justify-center space-x-2">
                            <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="text-sm md:text-base">
                              {slide.primaryButton}
                            </span>
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </button>
                      )}

                      {slide.secondaryButton && (
                        <button
                          onClick={() => slide.secondaryLink && router.push(slide.secondaryLink)}
                          className="border-2 border-white/90 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:bg-white/20 hover:border-white transition-all duration-300 backdrop-blur-md bg-white/10 shadow-lg"
                        >
                          <span className="text-sm md:text-base">
                            {slide.secondaryButton}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-button-prev-custom md:flex hidden absolute left-6 top-1/2 transform -translate-y-1/2 z-20 w-14 h-14 bg-white/20 backdrop-blur-md border border-white/30 rounded-full items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-300 shadow-lg">
        <ChevronLeft className="w-7 h-7 text-white" />
      </div>
      <div className="swiper-button-next-custom md:flex hidden absolute right-6 top-1/2 transform -translate-y-1/2 z-20 w-14 h-14 bg-white/20 backdrop-blur-md border border-white/30 rounded-full items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-300 shadow-lg ">
        <ChevronRight className="w-7 h-7 text-white" />
      </div>

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