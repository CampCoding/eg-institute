"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Star,
  Quote,
  Heart,
  Play,
  Pause,
  MapPin,
  Calendar,
  Music,
  MessageCircle,
  Share2,
  X,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCoverflow,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

const RealsSection = () => {
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [likedCards, setLikedCards] = useState({});
  const [selectedReel, setSelectedReel] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const swiperRef = useRef(null);
  const sectionRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      user: {
        name: "Sarah Ahmed",
        role: "Business Professional",
        company: "Tech Solutions Inc.",
        profileImg:
          "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
      },
      videoUrl:
        "https://res.cloudinary.com/dhgp9dzdt/video/upload/v1759224302/6944288-uhd_2160_3840_24fps_gnv96e.mp4", // boy reading Quran
      caption:
        "Arabic learning transformed my career! 🌍✨ Cultural immersion + personalized approach = fluency faster than I dreamed 🚀",
      music: "Arabic Vibes - DJ Khaled",
      likes: 2450,
      comments: 320,
      shares: 180,
      location: "Dubai, UAE",
      date: "March 2024",
      rating: 5,
      accent: "from-blue-400 to-indigo-500",
    },
    {
      id: 2,
      user: {
        name: "Michael Chen",
        role: "Travel Enthusiast & Blogger",
        company: "Wanderlust Adventures",
        profileImg:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
      videoUrl:
        "https://res.cloudinary.com/dhgp9dzdt/video/upload/v1759223709/4540151-hd_1920_1080_30fps_xkygx6.mp4", // muslim woman talking on phone
      caption:
        "Exploring 15 Arabic-speaking countries with confidence 🌴🕌 Learning Arabic made travel unforgettable 🌍✈️",
      music: "Travel Beats - Nomad Sound",
      likes: 3100,
      comments: 410,
      shares: 220,
      location: "London, UK",
      date: "February 2024",
      rating: 5,
      accent: "from-emerald-400 to-teal-500",
    },
    {
      id: 3,
      user: {
        name: "Layla Hassan",
        role: "University Student",
        company: "Cairo University",
        profileImg:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      },
      videoUrl:
        "https://res.cloudinary.com/dhgp9dzdt/video/upload/v1759225044/6989135-hd_1920_1080_25fps_nubrct.mp4", // man tutoring woman
      caption:
        "Balancing studies + mastering Arabic 🎓📚 Tailored lessons & supportive instructors made all the difference ❤️",
      music: "Chill Study Beats",
      likes: 1980,
      comments: 250,
      shares: 95,
      location: "New York, USA",
      date: "January 2024",
      rating: 5,
      accent: "from-purple-400 to-pink-500",
    },
    {
      id: 4,
      user: {
        name: "Ahmed Al-Rashid",
        role: "Medical Professional",
        company: "International Hospital",
        profileImg:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
      videoUrl:
        "https://res.cloudinary.com/dhgp9dzdt/video/upload/v1759224302/6944288-uhd_2160_3840_24fps_gnv96e.mp4", // doctor consulting
      caption:
        "Medical Arabic saved my career 🏥💉 Now I connect better with patients across communities 🌍",
      music: "Healing Piano - Calm Vibes",
      likes: 2760,
      comments: 360,
      shares: 140,
      location: "Toronto, Canada",
      date: "April 2024",
      rating: 5,
      accent: "from-rose-400 to-red-500",
    },
    {
      id: 5,
      user: {
        name: "Fatima Al-Zahra",
        role: "Content Creator",
        company: "Digital Media Agency",
        profileImg:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      },
      videoUrl:
        "https://res.cloudinary.com/dhgp9dzdt/video/upload/v1759225044/6989135-hd_1920_1080_25fps_nubrct.mp4", // woman creating content
      caption:
        "Creating content in Arabic 🎥✨ Interactive lessons kept me hooked throughout my journey 💡",
      music: "Upbeat Arabic Trap",
      likes: 3240,
      comments: 410,
      shares: 210,
      location: "Berlin, Germany",
      date: "May 2024",
      rating: 5,
      accent: "from-amber-400 to-orange-500",
    },
    {
      id: 6,
      user: {
        name: "Omar Khalil",
        role: "Software Engineer",
        company: "Innovation Labs",
        profileImg:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      },
      videoUrl:
        "https://res.cloudinary.com/dhgp9dzdt/video/upload/v1759223709/4540151-hd_1920_1080_30fps_xkygx6.mp4", // man working laptop
      caption:
        "Learning Arabic while coding 👨‍💻📱 Bite-sized lessons + mobile app = progress on the go 🚀",
      music: "Coding Lo-Fi Beats",
      likes: 2890,
      comments: 330,
      shares: 170,
      location: "San Francisco, USA",
      date: "June 2024",
      rating: 5,
      accent: "from-cyan-400 to-blue-500",
    },
  ];

  const toggleLike = (id) => {
    setLikedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num;
  };

  // Visibility observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);

        // Pause/resume autoplay based on visibility
        if (swiperRef.current && swiperRef.current.autoplay) {
          if (entry.isIntersecting && isAutoPlaying && !isPaused) {
            swiperRef.current.autoplay.start();
          } else {
            swiperRef.current.autoplay.stop();
          }
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isAutoPlaying, isPaused]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isVisible || !swiperRef.current) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          swiperRef.current.slidePrev();
          break;
        case "ArrowRight":
          e.preventDefault();
          swiperRef.current.slideNext();
          break;
        case " ":
          e.preventDefault();
          setIsAutoPlaying(!isAutoPlaying);
          if (!isAutoPlaying) {
            swiperRef.current.autoplay.start();
          } else {
            swiperRef.current.autoplay.stop();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isVisible, isAutoPlaying]);

  return (
    <>
      <div
        ref={sectionRef}
        className="relative bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 py-16 px-4 overflow-hidden"
        onMouseEnter={() => {
          setIsPaused(true);
          if (swiperRef.current && swiperRef.current.autoplay) {
            swiperRef.current.autoplay.stop();
          }
        }}
        onMouseLeave={() => {
          setIsPaused(false);
          if (
            swiperRef.current &&
            swiperRef.current.autoplay &&
            isAutoPlaying
          ) {
            swiperRef.current.autoplay.start();
          }
        }}
      >
        {/* Controls Panel */}
        <div className="absolute top-4 right-4 z-40 flex items-center space-x-2">
          <button
            onClick={() => {
              setIsAutoPlaying(!isAutoPlaying);
              if (swiperRef.current && swiperRef.current.autoplay) {
                if (isAutoPlaying) {
                  swiperRef.current.autoplay.stop();
                } else {
                  swiperRef.current.autoplay.start();
                }
              }
            }}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              isAutoPlaying
                ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
                : "bg-gray-200 text-gray-600"
            } hover:scale-110`}
            title={isAutoPlaying ? "Disable Auto-play" : "Enable Auto-play"}
          >
            {isAutoPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" />
            )}
          </button>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-32 right-20 w-24 h-24 bg-gradient-to-br from-rose-200/20 to-pink-200/20 rounded-full blur-2xl animate-float"></div>
          <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-xl animate-bounce-slow"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div
            className={`text-center mb-12 transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
              Student Success Stories
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Real experiences from our Arabic language learning community 🌟
            </p>
          </div>

          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2,
              slideShadows: false,
            }}
            loop
            spaceBetween={40}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
            className="mySwiper"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide
                key={testimonial.id}
                className="py-10 px-2 max-w-[350px]"
              >
                <div
                  className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group w-full md:w-[350px] h-[500px] mx-auto"
                  onClick={() => setSelectedReel(testimonial)}
                >
                  {/* Video Thumbnail Header */}
                  <div className="relative w-full h-full bg-gradient-to-br rounded-t-3xl from-slate-800 to-slate-600 overflow-hidden">
                    <video
                      src={testimonial.videoUrl}
                      className="rounded-3xl h-full w-full  object-cover"
                      muted
                    ></video>

                    <div className="absolute inset-0 rounded-t-3xl bg-black/20"></div>
                    <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                      <Music className="w-3 h-3 inline mr-1" />
                      {testimonial.music}
                    </div>

                    {/* Profile overlay */}
                    <div className="absolute bottom-3 left-3 flex items-center">
                      <div className="relative">
                        <img
                          src={testimonial.user.profileImg}
                          alt={testimonial.user.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg"
                          loading="lazy"
                        />
                        <div
                          className={`absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r ${testimonial.accent} rounded-full flex items-center justify-center shadow-md`}
                        >
                          <Heart className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-bold text-white">
                          {testimonial.user.name}
                        </h3>
                        <p className="text-xs text-white/80">
                          {testimonial.user.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${testimonial.accent} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  ></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Keyboard Shortcuts Hint */}
          <div className="text-center mt-6 text-xs text-slate-400">
            Use arrow keys ← → to navigate • Space to toggle auto-play
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

        <style jsx global>{`
          .hero-slider.swiper {
            padding-top: 0px !important ;
            padding-bottom: 0px !important;
          }

          .swiper {
            width: 100%;
            padding-top: 20px;
            padding-bottom: 50px;
          }

          .swiper-slide {
            background-position: center;
            background-size: cover;
            transition: all 0.3s ease;
          }

          .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            background: rgba(0, 0, 0, 0.2);
          }

          .swiper-pagination-bullet-active {
            background: linear-gradient(to right, #3b82f6, #4f46e5);
            width: 20px;
            border-radius: 5px;
          }

          .swiper-button-next,
          .swiper-button-prev {
            color: #3b82f6;
            background: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
          }

          .swiper-button-next:hover,
          .swiper-button-prev:hover {
            transform: scale(1.1);
          }

          .swiper-button-next:after,
          .swiper-button-prev:after {
            font-size: 18px;
            font-weight: bold;
          }
        `}</style>
      </div>

      {/* Reel Popup Modal */}
      {selectedReel && (
        <div
          onClick={() => setSelectedReel(null)}
          className="fixed w-[100%] h-[100vh] inset-0 py-8 overflow-hidden bg-black/90 backdrop-blur-sm flex  z-[1000] transition-opacity duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full h-full py-8  flex flex-col md:flex-row items-center gap-4 p-4"
          >
            <button
              onClick={() => setSelectedReel(null)}
              className="absolute top-4 right-4 bg-black/60 rounded-full p-2 text-white hover:bg-white hover:text-black transition-all z-10"
              aria-label="Close reel"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-full  h-auto flex items-center justify-center">
              <video
                src={selectedReel.videoUrl}
                className="h-[95vh] rounded-xl  shadow-2xl"
                autoPlay
                controls
                loop
                playsInline
              />
            </div>

            {/* <div className="w-full md:w-1/3 text-white flex flex-col gap-4 p-4 md:max-h-[70vh] overflow-y-auto">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-orange-400 flex items-center justify-center">
                  <img
                    src={selectedReel.user.profileImg}
                    alt={selectedReel.user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    {selectedReel.user.name}
                  </h3>
                  <p className="text-xs text-gray-300">
                    {selectedReel.user.role}
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed">{selectedReel.caption}</p>

              <div className="flex items-center gap-2 text-gray-300">
                <Music className="w-4 h-4" />
                <p className="text-xs">{selectedReel.music}</p>
              </div>

              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Heart
                    className={`w-4 h-4 ${
                      likedCards[selectedReel.id]
                        ? "text-red-500 fill-red-500"
                        : ""
                    }`}
                  />
                  <span className="text-xs">
                    {formatNumber(selectedReel.likes)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-xs">
                    {formatNumber(selectedReel.comments)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Share2 className="w-4 h-4" />
                  <span className="text-xs">
                    {formatNumber(selectedReel.shares)}
                  </span>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default RealsSection;
