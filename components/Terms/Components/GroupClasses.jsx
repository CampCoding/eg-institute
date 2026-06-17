"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Users,
  CalendarDays,
  Clock,
  Repeat,
  AlertTriangle,
  UserMinus,
  BadgeInfo,
} from "lucide-react";

export default function GroupClassesTimeline() {
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

  const steps = [
    {
      icon: CalendarDays,
      title: "Number of Sessions",
      lines: [
        "Each group receives 8 sessions per month.",
        "We calculate the month based on the number of sessions, not calendar dates.",
      ],
    },
    {
      icon: Clock,
      title: "Class Duration",
      lines: [
        "Each session is 1.5 to 2 hours, depending on the lesson size and content.",
      ],
    },
    {
      icon: Repeat,
      title: "Fixed Weekly Schedule",
      lines: [
        "Group classes run according to a fixed weekly schedule to ensure consistency and steady progress.",
      ],
    },
    {
      icon: AlertTriangle,
      title: "When a Session Is NOT Deducted",
      lines: [
        "A group session will not be deducted from your package if it is canceled due to:",
      ],
      bullets: [
        "teacher emergencies",
        "technical issues",
        "national/public holidays",
        "unavoidable circumstances",
      ],
    },
    {
      icon: UserMinus,
      title: "If YOU Miss a Class",
      lines: [
        "If the session takes place and the group attends, the session is considered completed because:",
      ],
      bullets: [
        "the lesson was delivered",
        "all materials were shared",
        "the session was recorded",
        "lessons cannot be repeated for the group",
      ],
      footer:
        "You will still receive the recording and all materials to review anytime.",
    },
    {
      icon: BadgeInfo,
      title: "Important Example",
      lines: [
        "A 2-month package = 16 sessions.",
        "Your package ends when all 16 sessions have been completed — not when two calendar months pass.",
      ],
      highlight: true,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 px-6 bg-gradient-to-b from-white via-cyan-50/40 to-blue-50/40"
    >
      {/* Background decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-[520px] h-[520px] bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute top-28 right-16 w-24 h-24 border-2 border-cyan-300/30 rounded-3xl rotate-12" />
        <div className="absolute bottom-32 left-16 w-16 h-16 bg-blue-300/20 rounded-2xl -rotate-12" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur border border-cyan-100 rounded-full px-5 py-2 shadow-sm">
            <Users className="w-5 h-5 text-cyan-600" />
            <span className="font-semibold text-cyan-700">
              Group Classes
            </span>
          </div>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-gray-800">
            How Group Classes{" "}
            <span className="bg-gradient-to-r from-cyan-600 to-[#14B8A6] bg-clip-text text-transparent">
              Work
            </span>
          </h2>

          <p className="mt-4 text-lg text-gray-600 leading-relaxed max-w-3xl">
            Clear rules to keep consistency, fairness, and steady progress for
            every group.
          </p>
        </div>

        {/* Timeline */}
        <div className="mt-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === steps.length - 1;

            return (
              <div
                key={idx}
                className={`relative pl-14 md:pl-16 pb-10 transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${200 + idx * 120}ms` }}
              >
                {/* Connector line */}
                {!isLast && (
                  <div className="absolute left-6 md:left-7 top-12 bottom-2 w-px bg-gradient-to-b from-cyan-300/70 to-blue-300/10" />
                )}

                {/* Step bubble */}
                <div className="absolute left-0 top-0">
                  <div className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur border border-cyan-100 shadow-sm flex items-center justify-center">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-[#14B8A6] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                
                </div>

                {/* Card */}
                <div
                  className={`rounded-3xl border shadow-sm ${
                    step.highlight
                      ? "bg-white/90 border-cyan-100"
                      : "bg-white/70 border-white/60"
                  } backdrop-blur p-6 md:p-7`}
                >
                  <h3 className="text-xl font-bold text-gray-800">
                    {step.title}
                  </h3>

                  <div className="mt-3 space-y-2">
                    {step.lines?.map((line, i) => (
                      <p key={i} className="text-gray-600 leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>

                  {step.bullets?.length ? (
                    <ul className="mt-4 space-y-2 text-gray-700">
                      {step.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-2 w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {step.footer ? (
                    <p className="mt-4 text-gray-600 leading-relaxed">
                      {step.footer}
                    </p>
                  ) : null}

                  {step.highlight ? (
                    <div className="mt-5 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-100/60 p-4">
                      <p className="text-gray-700 italic">
                        Keep in mind: packages are session-based, not
                        calendar-based.
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
