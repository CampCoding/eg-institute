"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Undo2,
  CheckCircle2,
  ShieldCheck,
  CalendarClock,
  Dot,
} from "lucide-react";

export default function RefundAndActivationPolicies() {
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

  const refundOptions = [
    "You may switch to another program",
    "You may transfer your subscription to another person",
    "You may adjust your study plan according to your needs",
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

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Top heading */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full px-6 py-3">
            <ShieldCheck className="w-5 h-5 text-cyan-700" />
            <span className="text-cyan-700 font-semibold">
              Policies &amp; Timeline
            </span>
          </div>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-gray-800">
            Refund{" "}
            <span className="bg-gradient-to-r from-cyan-600 to-[#14B8A6] bg-clip-text text-transparent">
              &amp;
            </span>{" "}
            Package Activation
          </h2>

          <p className="mt-4 text-lg text-gray-600 leading-relaxed max-w-4xl">
            Clear terms to ensure fairness — and flexible options to help you
            get maximum value.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          {/* 7. Refund Policy */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="bg-gradient-to-r from-cyan-300/60 to-blue-300/60 p-[1px] rounded-3xl">
              <div className="rounded-3xl bg-white/85 backdrop-blur shadow-xl overflow-hidden">
                {/* Header */}
                <div className="p-6 md:p-7 border-b border-cyan-100/70 bg-gradient-to-r from-cyan-50 to-blue-50">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-[#14B8A6] flex items-center justify-center">
                      <Undo2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-800 font-bold text-xl">
                         Refund Policy
                      </p>
                      <p className="text-gray-600">Terms &amp; flexibility</p>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 md:p-7">
                  {/* Alert strip */}
                  <div className="rounded-2xl border border-amber-100 bg-amber-50/70 p-5">
                    <p className="text-gray-800 font-semibold leading-relaxed">
                      After attending your trial session, payments become non
                      refundable.
                    </p>
                  </div>

                  <p className="mt-5 text-gray-700 font-semibold">
                    However, you always have flexible options:
                  </p>

                  <div className="mt-4 space-y-3">
                    {refundOptions.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700 leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-100/70 p-5">
                    <p className="text-gray-700 italic leading-relaxed">
                      We aim to ensure you receive maximum value from your
                      learning experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 8. Package Activation & Usage Timeline */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="bg-gradient-to-r from-blue-300/60 to-cyan-300/60 p-[1px] rounded-3xl">
              <div className="rounded-3xl bg-white/85 backdrop-blur shadow-xl overflow-hidden">
                {/* Header */}
                <div className="p-6 md:p-7 border-b border-cyan-100/70 bg-gradient-to-r from-blue-50 to-cyan-50">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-[#14B8A6] flex items-center justify-center">
                      <CalendarClock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-800 font-bold text-xl">
                      Package Activation &amp; Usage Timeline
                      </p>
                      <p className="text-gray-600">
                        When it starts &amp; how it’s counted
                      </p>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 md:p-7">
                  {/* Mini timeline */}
                  <div className="relative rounded-2xl border border-cyan-100/70 bg-white p-5">
                    <div className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-cyan-400/70 to-blue-400/20" />

                    <div className="pl-10 space-y-6">
                      <div className="relative">
                        <div className="absolute -left-[26px] top-1.5">
                          <div className="w-4 h-4 rounded-full bg-cyan-600" />
                        </div>
                        <p className="text-gray-800 font-semibold leading-relaxed">
                          Your package begins only from your first official
                          lesson.
                        </p>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-[30px] top-1">
                          <Dot className="w-6 h-6 text-cyan-600" />
                        </div>
                        <p className="text-gray-700 font-semibold leading-relaxed">
                          Example:
                        </p>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-[26px] top-1.5">
                          <div className="w-4 h-4 rounded-full bg-blue-600" />
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          If you purchased a 16-session package → you have 4
                          full months to complete your lessons (including the
                          grace period).
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Optional soft note panel (styling only) */}
                  <div className="mt-6 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-100/70 p-5">
                    <p className="text-gray-700 italic leading-relaxed">
                      Timeline is based on activation from the first official
                      lesson.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
