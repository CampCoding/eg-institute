"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Facebook,
  Instagram,
  MapPin,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Tooltip } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const TeamsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [swiperRef, setSwiperRef] = useState(null);
  const router = useRouter();
  const sectionRef = useRef(null);
  const { home_data } = useSelector((state) => state.home);

  const section = home_data?.message?.sections?.team;
  const teachersData = home_data?.message?.teachers;

  const teamMembers = teachersData?.map((item) => ({
    id: item.id,
    name: item.name,
    role: item.specialization,
    image: item.image,
    description: item.bio,
    location: item.country,
    email: item.email,
    phone: item.phone,
    social: { facebook: null, instagram: null },
  })) ?? [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePrevSlide = () => {
    if (swiperRef) {
      swiperRef.slidePrev();
    }
  };

  const handleNextSlide = () => {
    if (swiperRef) {
      swiperRef.slideNext();
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-10 px-4 bg-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 bg-teal-600 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-teal-700 rounded-full blur-2xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-black rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-4 transform transition-all duration-1000 ease-out ${
            isVisible
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-16 opacity-0 scale-95"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            {section?.title ?? "Meet Our Expert Team"}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {section?.subtitle ??
              "Our passionate educators and technology experts are dedicated to providing world-class Arabic language education through innovative teaching methods and cutting-edge technology."}
          </p>
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-teal-600 to-teal-700 mx-auto rounded-full"></div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={handlePrevSlide}
            className="w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-gray-600 hover:text-teal-600 transition-all duration-300 hover:scale-110 border border-gray-100 hover:border-teal-200 group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform duration-300" />
          </button>

          <div className="text-center">
            {/* <p className="text-sm text-gray-500">
              Swipe or use navigation buttons to explore our team
            </p> */}
          </div>

          <button
            onClick={handleNextSlide}
            className="w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-gray-600 hover:text-teal-600 transition-all duration-300 hover:scale-110 border border-gray-100 hover:border-teal-200 group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform duration-300" />
          </button>
        </div>

        {/* Swiper Container */}
        <div
          className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet !bg-teal-600",
              bulletActiveClass: "swiper-pagination-bullet-active !bg-teal-700",
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            onSwiper={setSwiperRef}
            className="teams-swiper"
          >
            {teamMembers.map((member, index) => (
              <SwiperSlide key={member.id}>
                <div className="h-full">
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100 hover:border-teal-200 h-full">
                    {/* Image Container */}
                    <div className="relative overflow-hidden">
                      <div className="aspect-w-1 aspect-h-1 w-full h-80">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>

                      {/* Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center space-x-2 text-white text-sm">
                            <MapPin className="w-4 h-4" />
                            <span>{member.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Social Media Icons */}
                      {/*    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <a
                          href={member.social.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-black hover:bg-teal-600 hover:text-white transition-all duration-300 hover:scale-110"
                          title="Facebook"
                        >
                          <Facebook className="w-4 h-4" />
                        </a>
                        <a
                          href={member.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-black hover:bg-teal-700 hover:text-white transition-all duration-300 hover:scale-110"
                          title="Instagram"
                        >
                          <Instagram className="w-4 h-4" />
                        </a>
                      </div> */}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      {/* Name and Role */}
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-black mb-1 group-hover:text-teal-600 transition-colors duration-300">
                          {member.name}
                        </h3>
                        <p className="text-teal-600 font-semibold text-sm uppercase tracking-wide">
                          {member.role}
                        </p>
                      </div>

                      {/* Description */}
                      <Tooltip
                        title={member.description}
                        placement="bottom"
                        trigger="hover"
                        mouseEnterDelay={0.5}
                        mouseLeaveDelay={0.2}
                        styles={{ root: { maxWidth: "300px" } }}
                      >
                        <div>
                          <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow cursor-help line-clamp-1">
                            {member.description}
                          </p>
                        </div>
                      </Tooltip>

                      {/* Contact Info */}
                      {/* <div className="gap-2 border-t flex items-center justify-between flex-wrap border-gray-100 pt-4 mt-auto">
                        <Tooltip
                          title={`Email: ${member.email}`}
                          trigger="hover"
                          mouseEnterDelay={0.5}
                          mouseLeaveDelay={0.1}
                          placement="bottom"
                        >
                          <div className="flex items-center space-x-2 text-xs text-gray-500 hover:text-teal-600 transition-colors duration-200 cursor-help">
                            <Mail className="w-3 h-3 text-teal-600 flex-shrink-0" />
                            <span className="truncate">{member.email}</span>
                          </div>
                        </Tooltip>
                        <Tooltip
                          title={`Phone: ${member.phone}`}
                          trigger="hover"
                          mouseEnterDelay={0.5}
                          mouseLeaveDelay={0.1}
                          placement="bottom"
                        >
                          <div className="flex items-center space-x-2 text-xs text-gray-500 hover:text-teal-600 transition-colors duration-200 cursor-help">
                            <Phone className="w-3 h-3 text-teal-600 flex-shrink-0" />
                            <span>{member.phone}</span>
                          </div>
                        </Tooltip>
                      </div> */}

                      <button
                        onClick={() =>
                          router.push(`/teachers/teacher-profile/${member.id}`)
                        }
                        className="w-full mt-auto bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg group/btn"
                      >
                        <span className="flex  items-center justify-center gap-2">
                          Details
                          <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Custom Swiper Styles */
        :global(.teams-swiper) {
          padding-bottom: 50px !important;
        }

        :global(.teams-swiper .swiper-pagination) {
          bottom: 10px !important;
        }

        :global(.teams-swiper .swiper-pagination-bullet) {
          width: 12px !important;
          height: 12px !important;
          margin: 0 6px !important;
          opacity: 0.4 !important;
          transition: all 0.3s ease !important;
        }

        :global(.teams-swiper .swiper-pagination-bullet-active) {
          opacity: 1 !important;
          transform: scale(1.2) !important;
        }

        /* Ensure smooth animations on all devices */
        * {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          -webkit-perspective: 1000;
          perspective: 1000;
        }
      `}</style>
    </section>
  );
};

export default TeamsSection;
