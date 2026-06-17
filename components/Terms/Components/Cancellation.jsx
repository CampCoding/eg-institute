"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  XCircle,
  GraduationCap,
  UserCheck,
  Clock,
  Timer,
  MinusCircle,
  PlusCircle,
} from "lucide-react";

export default function CancellationPolicy() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("students"); // "students" | "teachers"
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.25 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const content = {
    students: {
      title: "For Students",
      icon: GraduationCap,
      bullets: [
        "You have 2 emergency cancellations per month with no penalty.",
        "Additional cancellations must be made at least 4 hours before class.",
        "Canceling within 4 hours of the session results in half a session being deducted.",
      ],
      chips: [
        { icon: Timer, text: "2 emergency / month" },
        { icon: Clock, text: "4 hours notice" },
        { icon: MinusCircle, text: "Within 4 hours = ½ session deducted" },
      ],
    },
    teachers: {
      title: "For Teachers",
      icon: UserCheck,
      bullets: [
        "Teachers also have 2 emergency cancellations per month.",
        "A 3rd cancellation in the same month results in 30 minutes of free time added to your package.",
      ],
      chips: [
        { icon: Timer, text: "2 emergency / month" },
        { icon: PlusCircle, text: "3rd cancellation = +30 min free time" },
      ],
    },
  };

  const active = content[activeTab];
  const ActiveIcon = active.icon;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 px-6 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950"
    >
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -bottom-28 -right-28 w-[620px] h-[620px] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.08]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.08) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur px-5 py-2">
            <XCircle className="w-5 h-5 text-cyan-300" />
            <span className="text-cyan-200 font-semibold">
               Cancellation Policy
            </span>
          </div>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-white">
            Clear{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              Cancellation Rules
            </span>
          </h2>

          <p className="mt-4 text-lg text-slate-200/80 max-w-3xl leading-relaxed">
            Choose your category below to see the policy details.
          </p>
        </div>

        {/* Tabs */}
        <div
          className={`mt-10 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur p-1">
            <button
              onClick={() => setActiveTab("students")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === "students"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                  : "text-slate-200/80 hover:text-white"
              }`}
            >
              For Students
            </button>
            <button
              onClick={() => setActiveTab("teachers")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === "teachers"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                  : "text-slate-200/80 hover:text-white"
              }`}
            >
              For Teachers
            </button>
          </div>
        </div>

        {/* Content Card */}
        <div
          className={`mt-8 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-2xl overflow-hidden">
            {/* Top strip */}
            <div className="p-6 md:p-8 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                  <ActiveIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-xl">{active.title}</p>
                  <p className="text-slate-200/70">
                     Policy details for your category
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="grid md:grid-cols-5 gap-0">
              {/* Left: bullets */}
              <div className="md:col-span-3 p-6 md:p-8">
                <div className="space-y-4">
                  {active.bullets.map((b, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="mt-2 w-2.5 h-2.5 rounded-full bg-cyan-300 flex-shrink-0" />
                      <p className="text-slate-100/90 leading-relaxed">{b}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: chips */}
              <div className="md:col-span-2 p-6 md:p-8 border-t md:border-t-0 md:border-l border-white/10">
                <p className="text-white font-semibold mb-4">Quick Rules</p>

                <div className="flex flex-col gap-3">
                  {active.chips.map((chip, i) => {
                    const ChipIcon = chip.icon;
                    return (
                      <div
                        key={i}
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 flex items-start gap-3"
                      >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500/80 to-blue-500/80 flex items-center justify-center flex-shrink-0">
                          <ChipIcon className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-slate-100/90 leading-relaxed">
                          {chip.text}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-white/10 p-4">
                  <p className="text-slate-100/80 text-sm leading-relaxed">
                    This policy helps maintain fairness, consistency, and smooth
                    scheduling for everyone.
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
