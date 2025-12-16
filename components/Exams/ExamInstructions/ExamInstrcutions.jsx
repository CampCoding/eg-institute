"use client";

import { BookOpen, Trophy, Users, Target, Sparkles, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function ExamInstructions({ setIsLogin, isLogin }) {
  const router = useRouter();

  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-5 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 via-teal-600 to-teal-600 bg-clip-text text-transparent mb-6">
            Complete Study Guide
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Master Arabic language and literature with our comprehensive
            preparation framework
          </p>
        </div>

        {/* Instruction Cards Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Cards Start */}
          {[
            {
              icon: <BookOpen className="w-8 h-8 text-white" />,
              title: "Prerequisites & Foundation",
              bgFrom: "from-emerald-100",
              bgTo: "to-teal-100",
              border: "border-emerald-200",
              shadow: "hover:shadow-emerald-500/20",
              iconBg: "from-emerald-500 to-teal-600",
              items: [
                {
                  dot: "bg-emerald-500",
                  text: "Master Arabic grammar rules (النحو) and morphology (الصرف) fundamentals",
                },
                {
                  dot: "bg-teal-500",
                  text: "Build extensive vocabulary through classical and modern texts",
                },
                {
                  dot: "bg-cyan-500",
                  text: "Develop deep understanding of Arabic literary heritage and poetry",
                },
              ],
            },
            {
              icon: <Trophy className="w-8 h-8 text-white" />,
              title: "Core Exam Topics",
              bgFrom: "from-orange-100",
              bgTo: "to-red-100",
              border: "border-orange-200",
              shadow: "hover:shadow-orange-500/20",
              iconBg: "from-orange-500 to-red-600",
              items: [
                {
                  dot: "bg-orange-500",
                  text: (
                    <>
                      <span className="text-orange-600 font-semibold">
                        Grammar & Syntax:
                      </span>{" "}
                      Sentence structure and parsing (الإعراب)
                    </>
                  ),
                },
                {
                  dot: "bg-red-500",
                  text: (
                    <>
                      <span className="text-red-600 font-semibold">
                        Rhetoric & Style:
                      </span>{" "}
                      Metaphors, similes, and literary devices
                    </>
                  ),
                },
                {
                  dot: "bg-pink-500",
                  text: (
                    <>
                      <span className="text-pink-600 font-semibold">
                        Literature & Composition:
                      </span>{" "}
                      Classical poetry and creative writing
                    </>
                  ),
                },
              ],
            },
            {
              icon: <Users className="w-8 h-8 text-white" />,
              title: "Success Strategies",
              bgFrom: "from-purple-100",
              bgTo: "to-pink-100",
              border: "border-purple-200",
              shadow: "hover:shadow-purple-500/20",
              iconBg: "from-purple-500 to-pink-600",
              items: [
                {
                  dot: "bg-purple-500",
                  text: "Daily grammar review sessions with practical applications",
                },
                {
                  dot: "bg-pink-500",
                  text: "Regular practice with literary analysis and text interpretation",
                },
                {
                  dot: "bg-rose-500",
                  text: "Memorization of prescribed poems and classical texts",
                },
              ],
            },
            {
              icon: <Clock className="w-8 h-8 text-white" />,
              title: "Optimal Study Schedule",
              bgFrom: "from-blue-100",
              bgTo: "to-indigo-100",
              border: "border-blue-200",
              shadow: "hover:shadow-blue-500/20",
              iconBg: "from-blue-500 to-indigo-600",
              items: [
                {
                  dot: "bg-blue-500",
                  text: (
                    <>
                      <span className="text-blue-600 font-semibold">
                        Daily Sessions:
                      </span>{" "}
                      2 hours split between grammar and literature
                    </>
                  ),
                },
                {
                  dot: "bg-indigo-500",
                  text: (
                    <>
                      <span className="text-indigo-600 font-semibold">
                        Weekly Review:
                      </span>{" "}
                      Comprehensive practice tests every Friday
                    </>
                  ),
                },
                {
                  dot: "bg-violet-500",
                  text: (
                    <>
                      <span className="text-violet-600 font-semibold">
                        Mock Exams:
                      </span>{" "}
                      Bi-weekly full-length practice examinations
                    </>
                  ),
                },
              ],
            },
          ].map((card, idx) => (
            <div key={idx} className="group  relative overflow-hidden h-full">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.bgFrom} ${card.bgTo} rounded-3xl transition-all duration-300`}
              ></div>
              <div
                className={`relative h-full hover:!rounded-3xl hover:!border-[${card?.border}] flex flex-col justify-between backdrop-blur-sm rounded-3xl p-8 border ${card.border} bg-white/80 hover:bg-white/90 hover:!rounded-md transition-all duration-500 hover:scale-105 ${card.shadow}`}
              >
                <div>
                  <div className="flex items-center mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mr-6 bg-gradient-to-br ${card.iconBg} shadow-lg transition-transform duration-300 group-hover:scale-110`}
                    >
                      {card.icon}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-800">
                      {card.title}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {card.items.map((item, i) => (
                      <div key={i} className="flex items-start space-x-4">
                        <div
                          className={`w-2 h-2 ${item.dot} rounded-full mt-3 flex-shrink-0`}
                        ></div>
                        <p className="text-slate-700 text-lg font-medium leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pro Tips Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-yellow-50 via-orange-50 to-amber-50 border border-yellow-200 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-100/30 to-orange-100/30"></div>
          <div className="relative p-8 md:p-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Trophy className="w-10 h-10 text-white" />
              </div>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-8">
              Expert Exam Tips
            </h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                {
                  icon: <BookOpen className="text-yellow-600 w-8 h-8" />,
                  title: "Read Carefully",
                  text: "Always read questions thoroughly before answering",
                },
                {
                  icon: <Target className="text-orange-600 w-8 h-8" />,
                  title: "Start Simple",
                  text: "Begin with easier questions to build confidence",
                },
                {
                  icon: <Sparkles className="text-amber-600 w-8 h-8" />,
                  title: "Present Well",
                  text: "Clear handwriting and organization boost scores",
                },
              ].map((tip, i) => (
                <div key={i} className="space-y-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto border">
                    {tip.icon}
                  </div>
                  <h4 className="text-xl font-bold text-slate-700">
                    {tip.title}
                  </h4>
                  <p className="text-slate-600">{tip.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => router.push("/exams/exam-courses")}
            className="px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg"
          >
            Start Now
          </button>
        </div>
      </div>
    </section>
  );
}
