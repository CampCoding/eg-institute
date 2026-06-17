"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Headset,
  Calendar,
  SlidersHorizontal,
  Smile,
  ArrowRight,
} from "lucide-react";

export default function ChangingYourTeacher() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.25 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const reasons = [
    { icon: Calendar, text: "the schedule does not suit you" },
    { icon: SlidersHorizontal, text: "you prefer a different teaching style" },
    { icon: Smile, text: "you are not fully comfortable" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 px-6 bg-gradient-to-br from-white via-cyan-50/40 to-blue-50/50"
    >
      {/* Background decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full bg-cyan-200/20 blur-3xl" />
        <div className="absolute -bottom-28 -right-28 w-[620px] h-[620px] rounded-full bg-blue-200/20 blur-3xl" />
        <div className="absolute top-24 right-16 w-24 h-24 border-2 border-cyan-300/30 rounded-3xl rotate-12" />
        <div className="absolute bottom-28 left-16 w-16 h-16 bg-blue-300/20 rounded-2xl -rotate-12" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full px-6 py-3">
            <Headset className="w-5 h-5 text-cyan-700" />
            <span className="text-cyan-700 font-semibold">
              Changing Your Teacher
            </span>
          </div>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-gray-800">
            Your comfort{" "}
            <span className="bg-gradient-to-r from-cyan-600 to-[#13B5A6] bg-clip-text text-transparent">
              matters
            </span>
          </h2>

          <p className="mt-4 text-lg text-gray-600 leading-relaxed max-w-3xl">
            Your comfort matters. If at any time you feel that:
          </p>
        </div>

        {/* Main Card */}
        <div
          className={`mt-10 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="rounded-3xl bg-white/85 backdrop-blur border border-cyan-100/60 shadow-xl overflow-hidden">
            {/* Reasons pills */}
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap gap-3">
                {reasons.map((r, i) => {
                  const Icon = r.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 rounded-full border border-cyan-100 bg-gradient-to-r from-cyan-50 to-blue-50 px-4 py-2"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-[#13B5A6] flex items-center justify-center">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700 font-semibold">
                        {r.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Panel */}
            <div className="border-t border-cyan-100/60 bg-gradient-to-r from-cyan-50 to-blue-50 p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <p className="text-gray-800 font-semibold text-lg leading-relaxed">
                  Simply contact support — we will change your teacher promptly
                  and smoothly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
