"use client";

import React, { useEffect, useRef, useState } from "react";
import { Wifi, Mic, Laptop, VolumeX, Video, Settings2 } from "lucide-react";

export default function TechnicalRequirementsAlt() {
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

  // ✅ Updated palette
  const accent = "#90C8FD"; // main accent (keep)
  const bgTop = "#0B5A8E"; // deep blue
  const bgMid = "#070B16"; // near-black navy
  const bgBottom = "#083B5B"; // deep blue (bottom)

  const requirements = [
    { icon: Wifi, text: "Stable internet connection" },
    { icon: Mic, text: "Clear microphone and headphones" },
    { icon: Laptop, text: "Laptop or tablet preferred over mobile" },
    { icon: VolumeX, text: "Quiet environment" },
    { icon: Video, text: "Zoom app" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 px-6"
      style={{
        background: `linear-gradient(180deg, ${bgTop} 0%, ${bgMid} 45%, ${bgBottom} 100%)`,
      }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-28 -left-28 w-[620px] h-[620px] rounded-full blur-3xl"
          style={{ backgroundColor: accent, opacity: 0.22 }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[720px] h-[720px] rounded-full blur-3xl"
          style={{ backgroundColor: accent, opacity: 0.16 }}
        />

        {/* subtle vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px circle at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 55%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Title row */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 backdrop-blur px-5 py-2">
            <Settings2 className="w-5 h-5" style={{ color: accent }} />
            <span className="text-white font-semibold">
              Technical Requirements
            </span>
          </div>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-white leading-tight">
            Your setup, <span style={{ color: accent }}>ready in minutes</span>
          </h2>

          <p className="mt-4 text-lg text-white/75 leading-relaxed max-w-3xl">
            To ensure the best learning experience:
          </p>
        </div>

        {/* Split panel */}
        <div
          className={`mt-10 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-white/15 bg-white/7 backdrop-blur shadow-2xl">
            {/* Left sidebar */}
            <div className=" p-7 md:p-9 relative">
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(900px circle at 18% 22%, ${accent} 0%, transparent 60%)`,
                  opacity: 0.16,
                }}
              />
              <div className="relative">
                <p className="text-white font-bold text-2xl">Quick Checklist</p>
                <p className="mt-3 text-white/75 leading-relaxed">
                  Make sure these basics are ready before class starts.
                </p>

                <div className="mt-6 rounded-2xl border border-white/15 bg-white/5 p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">Priority</span>
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: `${accent}1F`,
                        color: accent,
                        border: `1px solid ${accent}66`,
                      }}
                    >
                      Required
                    </span>
                  </div>
                  <p className="mt-3 text-white/80 text-sm leading-relaxed">
                    Stable internet + clear audio are the biggest factors for a
                    smooth lesson.
                  </p>
                </div>
              </div>
            </div>
            <div className=" p-7 md:p-9 bg-white/4">
              <div className="space-y-3">
                {requirements.map((req, i) => {
                  const Icon = req.icon;
                  return (
                    <div
                      key={i}
                      className="group flex items-center gap-4 rounded-2xl border border-white/12 bg-white/5 p-4 hover:bg-white/8 transition-all"
                    >
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center border"
                        style={{
                          backgroundColor: `${accent}1A`,
                          borderColor: `${accent}66`,
                        }}
                      >
                        <Icon className="w-6 h-6" style={{ color: accent }} />
                      </div>

                      <div className="flex-1">
                        <p className="text-white font-semibold">{req.text}</p>
                        <div
                          className="mt-2 h-1 w-14 rounded-full opacity-60 group-hover:opacity-100 transition-all"
                          style={{ backgroundColor: accent }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom note */}
              <div className="mt-6 rounded-2xl border border-white/12 bg-white/5 p-5">
                <p className="text-white/80 leading-relaxed">
                  Tip: Join Zoom 5 minutes early to test sound and camera.
                </p>
              </div>
            </div>

            {/* Divider */}
           <div className="hidden lg:block lg:col-span-1 w-px bg-white/10" /> 

            {/* Right list */}
          </div>
        </div>
      </div>
    </section>
  );
}
