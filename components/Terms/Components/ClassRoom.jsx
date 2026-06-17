"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  Volume2,
  Video,
  Clock,
  MessageSquare,
} from "lucide-react";

export default function ClassroomEtiquette() {
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

  const rules = [
    { icon: Clock, text: "Be on time" },
    { icon: Volume2, text: "Keep your microphone clear" },
    { icon: Video, text: "Use your camera when possible" },
    { icon: MessageSquare, text: "Participate actively" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 px-6 bg-gradient-to-b from-white via-emerald-50/40 to-white"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full blur-3xl bg-[#14B8A6]/15" />
        <div className="absolute -bottom-24 -right-24 w-[620px] h-[620px] rounded-full blur-3xl bg-[#14B8A6]/10" />

        {/* subtle lines */}
        <div className="absolute inset-0 opacity-[0.06]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(20,184,166,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,184,166,.35) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header / Hero */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/20 px-5 py-2">
            <span className="w-2 h-2 rounded-full bg-[#14B8A6]" />
            <span className="font-semibold text-[#0F766E]">
              Classroom Etiquette (Code of Conduct)
            </span>
          </div>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            A respectful space for{" "}
            <span className="text-[#14B8A6]">real speaking practice</span>
          </h2>

          <p className="mt-4 text-lg text-gray-600 leading-relaxed max-w-3xl">
            To maintain a productive learning environment, please:
          </p>
        </div>

        {/* Card */}
        <div
          className={`mt-10 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="relative rounded-[28px] bg-white shadow-xl border border-gray-100 overflow-hidden">
            {/* Accent bar */}
            <div
              className="h-2 w-full"
              style={{ backgroundColor: "#14B8A6" }}
            />

            <div className="p-7 md:p-10">
              {/* Checklist */}
              <div className="grid sm:grid-cols-2 gap-4">
                {rules.map((rule, i) => {
                  const Icon = rule.icon;
                  return (
                    <div
                      key={i}
                      className="group rounded-2xl border border-gray-100 bg-gray-50/60 p-4 hover:bg-white hover:shadow-md transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#14B8A6]/12 border border-[#14B8A6]/20">
                          <Icon className="w-5 h-5 text-[#14B8A6]" />
                        </div>
                        <div>
                          <p className="text-gray-900 font-semibold">
                            {rule.text}
                          </p>
                          <div className="mt-2 h-1 w-12 rounded-full bg-[#14B8A6]/30 group-hover:bg-[#14B8A6]/60 transition-all" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Closing note */}
              <div className="mt-8 rounded-2xl bg-[#14B8A6]/10 border border-[#14B8A6]/20 p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#14B8A6] flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-gray-800 font-semibold leading-relaxed">
                    Speaking practice is essential — your participation matters!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
