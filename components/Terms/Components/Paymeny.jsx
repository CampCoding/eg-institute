"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  CreditCard,
  ShieldAlert,
  Mail,
  Globe,
  MessageCircle,
  Ban,
  TriangleAlert,
  LockKeyhole,
} from "lucide-react";

export default function PaymentsSafetyPolicy() {
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

  const channels = [
    { icon: Globe, label: "the academy’s website" },
    { icon: Mail, label: "the official academy email" },
    { icon: MessageCircle, label: "our WhatsApp: +201270075031" },
  ];

  const responsibilities = [
    "private agreements made with teachers",
    "payments made outside official channels",
    "lessons arranged independently of the academy",
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
        {/* Header */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full px-6 py-3">
            <ShieldAlert className="w-5 h-5 text-cyan-700" />
            <span className="text-cyan-700 font-semibold">
               Payments &amp; Safety Policy
            </span>
          </div>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-gray-800">
            Payments{" "}
            <span className="bg-gradient-to-r from-cyan-600 to-[#023f4d] bg-clip-text text-transparent">
              &amp; Safety
            </span>{" "}
            Rules
          </h2>

          <p className="mt-4 text-lg text-gray-600 leading-relaxed max-w-4xl">
            Follow these official steps to keep your account safe and ensure your
            package is always protected.
          </p>
        </div>

        {/* Layout */}
        <div className="mt-12 grid lg:grid-cols-3 gap-6">
          {/* Left: Official payments card */}
          <div
            className={`lg:col-span-2 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="rounded-3xl bg-white/80 backdrop-blur border border-cyan-100/60 shadow-xl overflow-hidden">
              {/* Card header */}
              <div className="p-6 md:p-7 border-b border-cyan-100/60 bg-gradient-to-r from-cyan-50 to-blue-50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-[#023f4d] flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-800 font-bold text-xl">
                      Payments Must Be Made Through the Academy Only
                    </p>
                    <p className="text-gray-600">
                      Payments, renewals, and subscription updates should be
                      completed via:
                    </p>
                  </div>
                </div>
              </div>

              {/* Channels */}
              <div className="p-6 md:p-7">
                <div className="grid sm:grid-cols-3 gap-4">
                  {channels.map((c, i) => {
                    const Icon = c.icon;
                    return (
                      <div
                        key={i}
                        className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                      >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-[#023f4d] flex items-center justify-center mb-3">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-gray-700 font-semibold leading-snug">
                          {c.label}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Prohibited */}
                <div className="mt-6 rounded-2xl border border-red-100 bg-red-50/60 p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center flex-shrink-0">
                      <Ban className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-bold">
                        No Direct Payments to Teachers
                      </p>
                      <p className="text-gray-700 mt-1">
                        This is strictly prohibited. If a teacher ever requests
                        direct payment, please notify support immediately.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Safety & Ownership column */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="rounded-3xl bg-white/80 backdrop-blur border border-cyan-100/60 shadow-xl overflow-hidden">
              {/* Not responsible */}
              <div className="p-6 md:p-7 border-b border-cyan-100/60">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-[#023f4d] flex items-center justify-center">
                    <TriangleAlert className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-gray-800 font-bold text-xl">
                    The Academy Is Not Responsible For:
                  </p>
                </div>

                <ul className="space-y-3">
                  {responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-2 w-2.5 h-2.5 rounded-full bg-cyan-600 flex-shrink-0" />
                      <span className="text-gray-700 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ownership */}
              <div className="p-6 md:p-7 bg-gradient-to-r from-cyan-50 to-blue-50">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-[#023f4d] flex items-center justify-center flex-shrink-0">
                    <LockKeyhole className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-800 font-bold text-xl">
                      Curriculum Ownership
                    </p>
                    <p className="text-gray-700 mt-1 leading-relaxed">
                      Teachers may not use or reproduce academy materials for
                      personal use or teaching outside the academy.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Small footer note */}
            <div className="mt-5 rounded-2xl border border-cyan-100/60 bg-white/70 backdrop-blur p-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                Use only official channels to keep your payments secure and your
                package fully covered.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
