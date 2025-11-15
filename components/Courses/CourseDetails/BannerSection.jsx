"use client";
import React from "react";
import banner from "../../../public/images/3.png";
import Image from "next/image.js";
import { Icon } from "@iconify/react";

export default function BannerSection({
  title,
  level,
  shortDescription,
  duration,
}) {
  return (
    <div className="relative w-full h-[300px] sm:h-[350px] md:h-[450px] overflow-hidden rounded-xl">
      {/* Background Image */}
      <Image
        src={banner}
        alt="banner"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center px-4 text-center">
        {/* TITLE */}
        <h1
          className="text-[28px] sm:text-[40px] md:text-[55px] font-bold font-Montserrat 
          bg-gradient-to-r from-white to-teal-400 bg-clip-text text-transparent
          drop-shadow-[0_4px_10px_rgba(0,0,0,0.2)] leading-tight "
        >
          {title}

          <br />
          <span
            className="text-[26px] text-[#F8EFD7]



 sm:text-[32px] mx-5 md:text-[45px] "
          >
            {level}
          </span>
        </h1>

        {/* BOX */}
        <div
          className="bg-white/80 backdrop-blur-md shadow-md border border-gray-200 
                        p-4 sm:p-6 rounded-xl mt-4 max-w-lg w-full"
        >
          <h2 className="text-[16px] sm:text-[20px] font-semibold text-gray-900 leading-relaxed mb-3">
            {shortDescription}
          </h2>

          <div className="flex justify-center items-center text-gray-700 text-sm sm:text-lg font-medium">
            <Icon
              icon="iconamoon:clock-fill"
              width={28}
              className="mr-2 text-amber-600"
            />
            <span>{duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
