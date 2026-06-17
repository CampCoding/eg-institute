"use client";

import React, { useEffect, useRef, useState } from "react";
import { CalendarCheck, User, Clock, Sparkles, ArrowRight } from "lucide-react";

export default function OneToOnePrivateClasses() {
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

  const accent = "#06A4BF"; // New color + new design vibe (Purple)

  const rows = [
    { sessions: 16, main: "2 months", grace: "2 months", total: "4 months" },
    { sessions: 32, main: "4 months", grace: "4 months", total: "8 months" },
    { sessions: 48, main: "6 months", grace: "6 months", total: "12 months" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 px-6 bg-gradient-to-b from-white via-purple-50/40 to-white"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-24 -left-24 w-[560px] h-[560px] rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: accent }}
        />
        <div
          className="absolute -bottom-24 -right-24 w-[640px] h-[640px] rounded-full blur-3xl opacity-15"
          style={{ backgroundColor: accent }}
        />

        {/* dotted pattern */}
        <div className="absolute inset-0 opacity-[0.08]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(168,85,247,.5) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              backgroundPosition: "0 0",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/70 backdrop-blur px-5 py-2 shadow-sm">
            <User className="w-5 h-5" style={{ color: accent }} />
            <span className="font-semibold text-gray-800">
              One-to-One (Private) Classes
            </span>
          </div>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Flexible{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#06A4BF]/80 to-[#06A4BF]">
              private learning
            </span>{" "}
            that fits your life
          </h2>
        </div>

        {/* Bento Grid */}
        <div
          className={`mt-10 grid lg:grid-cols-12 gap-6 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Card 1 */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-white shadow-xl border border-gray-100 overflow-hidden">
              {/* top accent line */}
              <div
                className="h-1.5 w-full"
                style={{
                  background: `linear-gradient(90deg, ${accent}, #06A4BF)`,
                }}
              />
              <div className="p-7">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${accent}1A` }}
                  >
                    <CalendarCheck
                      className="w-6 h-6"
                      style={{ color: accent }}
                    />
                  </div>
                  <div>
                    <p className="text-gray-900 font-bold text-xl">
                    Flexible Scheduling
                    </p>
                    <p className="mt-2 text-gray-600 leading-relaxed">
                      You set your class schedule directly with your teacher
                      based on your availability.
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-[#06A4BF] p-5">
                  <p className="text-gray-700 font-semibold">
                    Works for: travel • work • holidays • personal breaks
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-white shadow-xl border border-gray-100 overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  background: `radial-gradient(900px circle at 20% 10%, ${accent} 0%, transparent 55%)`,
                }}
              />
              <div className="relative">
                {/* header strip */}
                <div className="p-7 pb-4">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${accent}1A` }}
                    >
                      <Clock className="w-6 h-6" style={{ color: accent }} />
                    </div>
                    <div>
                      <p className="text-gray-900 font-bold text-xl">
                        Double Grace Period
                      </p>
                      <p className="mt-2 text-gray-600 leading-relaxed">
                        You receive a grace period equal to your package
                        duration, giving you flexibility for travel, work,
                        holidays, and personal breaks.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Table Card */}
                <div className="px-7 pb-7">
                  <div className="rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 bg-gray-50">
                      <p className="font-bold text-gray-800 flex items-center gap-2">
                        <Sparkles
                          className="w-4 h-4"
                          style={{ color: accent }}
                        />
                        Examples
                      </p>
                      <span
                        className="text-xs font-semibold px-3 py-1 rounded-full border"
                        style={{
                          color: accent,
                          borderColor: `${accent}55`,
                          backgroundColor: `${accent}12`,
                        }}
                      >
                        Main + Grace = Total
                      </span>
                    </div>

                    <div className="overflow-x-auto bg-white">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="text-sm text-gray-600 border-b border-gray-100">
                            <th className="px-5 py-3 font-semibold">
                              Package Sessions
                            </th>
                            <th className="px-5 py-3 font-semibold">
                              Main Duration
                            </th>
                            <th className="px-5 py-3 font-semibold">
                              Grace Period
                            </th>
                            <th className="px-5 py-3 font-semibold">
                              Total Time Allowed
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((r, i) => (
                            <tr
                              key={i}
                              className="border-b border-gray-50 hover:bg-purple-50/40 transition-colors"
                            >
                              <td className="px-5 py-4 font-bold text-gray-900">
                                {r.sessions}
                              </td>
                              <td className="px-5 py-4 text-gray-700">
                                {r.main}
                              </td>
                              <td className="px-5 py-4 text-gray-700">
                                {r.grace}
                              </td>
                              <td className="px-5 py-4">
                                <span
                                  className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold border"
                                  style={{
                                    color: accent,
                                    borderColor: `${accent}55`,
                                    backgroundColor: `${accent}12`,
                                  }}
                                >
                                  {r.total}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Activation */}
                  <div className="mt-6 rounded-2xl border border-[#06A4BF]   p-6">
                    <p className="text-gray-900 font-bold text-lg">
                      Package Activation
                    </p>
                    <p className="mt-2 text-gray-700 leading-relaxed">
                      Your package starts from your first actual lesson, not the
                      payment date.
                    </p>

                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <p className="text-gray-700 font-semibold">
                        Example: You pay in January and begin in May → your
                        package officially starts in May.
                      </p>
                      <div
                        className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 font-semibold text-white shadow-sm"
                        style={{
                          background: `linear-gradient(90deg, ${accent}, #06A4BF)`,
                        }}
                      >
                        <span>Starts at first lesson</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* end card */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
