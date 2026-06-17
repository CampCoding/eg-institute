"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Users,
  Sparkles,
  GraduationCap,
  BookOpen,
  Newspaper,
  PenTool,
  Languages,
  Mic2,
  MessageCircle,
  MapPin,
  BadgeCheck,
  Workflow,
  ArrowRight,
} from "lucide-react";

export default function MeetOurTeachersScrollytelling() {
  const [active, setActive] = useState("intro");
  const [isDesktop, setIsDesktop] = useState(false);
  const wrapRef = useRef(null);

  const accent = "#14B8A6";
  const deep = "#023f4d";

  const sectionRefs = useRef({
    intro: null,
    msa: null,
    eca: null,
    process: null,
  });

  // ✅ detect desktop (lg = 1024px)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  const sections = useMemo(
    () => [
      {
        id: "intro",
        label: "Meet Our Teachers",
        icon: Users,
        hint: "Overview + Teams",
      },
      {
        id: "msa",
        label: "MSA Teachers",
        icon: BookOpen,
        hint: "Formal / Academic Arabic",
      },
      {
        id: "eca",
        label: "ECA Teachers",
        icon: MessageCircle,
        hint: "Real Egyptian Conversations",
      },
      {
        id: "process",
        label: "Selection Process",
        icon: Workflow,
        hint: "Top 5% hiring",
      },
    ],
    []
  );

  const sectionsData = useMemo(
    () => [
      {
        id: "intro",
        render: () => (
          <div className="rounded-3xl bg-white/85 backdrop-blur border border-cyan-100/60 shadow-xl overflow-hidden">
            <div className="p-8 md:p-10 bg-gradient-to-r from-cyan-50 to-teal-50 border-b border-cyan-100/60">
              <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 bg-white/70 border border-cyan-100">
                <Users className="w-5 h-5 text-teal-700" />
                <span className="font-semibold text-gray-800">
                  Meet Our Teachers
                </span>
              </div>

              <h2 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                The Heart of Your{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${accent}, ${deep})`,
                  }}
                >
                  Arabic Journey
                </span>{" "}
                Starts Here.
              </h2>
            </div>

            <div className="p-8 md:p-10 space-y-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                At EIAL Academy, we believe that a great teacher can transform
                your entire learning experience — and that’s why we handpick
                every instructor with extreme care.
              </p>

              <p className="text-gray-700 leading-relaxed text-lg">
                Our teachers are more than educators. They are mentors,
                motivators, language experts, and cultural guides who will walk
                with you step-by-step until you speak Arabic with confidence.
              </p>

              <div className="rounded-2xl border border-cyan-100 bg-gradient-to-r from-cyan-50 to-teal-50 p-6">
                <p className="text-gray-900 font-bold mb-3">
                  We proudly introduce you to two exceptional teams:
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white/80 border border-cyan-100 p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-teal-700" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">
                          Modern Standard Arabic Teachers (MSA)
                        </p>
                        <p className="text-gray-600 mt-1">
                          your doorway to academic, formal, and media Arabic
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/80 border border-cyan-100 p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-cyan-700" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">
                          Egyptian Arabic Teachers (ECA)
                        </p>
                        <p className="text-gray-600 mt-1">
                          your gateway to the Real language Egyptians use every
                          day
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mt-5 font-semibold">
                  Each team brings a unique type of magic to your learning
                  journey.
                </p>
              </div>
            </div>
          </div>
        ),
      },

      {
        id: "msa",
        render: () => (
          <div className="rounded-3xl bg-white/85 backdrop-blur border border-cyan-100/60 shadow-xl overflow-hidden">
            <div className="p-8 md:p-10 bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-cyan-100/60">
              <div className="flex items-start justify-between gap-6 flex-wrap">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 bg-white/70 border border-cyan-100">
                    <BookOpen className="w-5 h-5 text-teal-700" />
                    <span className="font-semibold text-gray-800">
                      Our Modern Standard Arabic (MSA) Teachers
                    </span>
                  </div>
                  <p className="mt-4 text-xl font-bold text-gray-900">
                    Academically Strong. Linguistically Sharp. Masters of
                    Arabic.
                  </p>
                </div>

                <span
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 border font-semibold"
                  style={{
                    borderColor: `${accent}55`,
                    backgroundColor: `${accent}12`,
                    color: deep,
                  }}
                >
                  <BadgeCheck className="w-4 h-4" style={{ color: accent }} />
                  Formal / Academic Track
                </span>
              </div>
            </div>

            <div className="p-8 md:p-10 space-y-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                Our MSA instructors come from the top Arabic-language faculties
                in Egypt, specializing in Arabic Language, Linguistics,
                Literature, and Arabic Education.
              </p>

              <div className="rounded-2xl border border-cyan-100 bg-white p-6">
                <p className="font-bold text-gray-900 mb-3">
                  They are the perfect match for learners who want:
                </p>

                <ul className="grid sm:grid-cols-2 gap-3 text-gray-700">
                  {[
                    { icon: GraduationCap, text: "academic Arabic" },
                    { icon: Languages, text: "formal speaking" },
                    { icon: Newspaper, text: "media and news comprehension" },
                    {
                      icon: PenTool,
                      text: "writing, reading, and grammar mastery",
                    },
                    {
                      icon: BookOpen,
                      text: "a strong command of classical and modern forms",
                    },
                  ].map((it, idx) => {
                    const Icon = it.icon;
                    return (
                      <li key={idx} className="flex items-start gap-2">
                        <Icon className="w-5 h-5 text-teal-700 mt-0.5" />
                        {it.text}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="rounded-2xl border border-cyan-100 bg-gradient-to-r from-cyan-50 to-teal-50 p-6">
                <p className="font-bold text-gray-900 mb-3">
                  ⭐ What Makes Our MSA Teachers Exceptional
                </p>

                <ul className="space-y-3 text-gray-700">
                  {[
                    "Graduates of prestigious Arabic faculties",
                    "Professional training in teaching MSA to non-native speakers",
                    "Strong background in grammar, syntax, and linguistic structure",
                    "Deliver lessons in Arabic + English (no Franco)",
                    "Make complex grammar simple, clear, and enjoyable",
                    "Perfect for professionals, students, researchers, or anyone aiming for fluent formal Arabic",
                  ].map((t, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-2 w-2 h-2 rounded-full bg-teal-600" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-teal-100 bg-white p-6">
                <p className="text-gray-800 font-semibold text-lg">
                  With our MSA teachers, you don’t just learn rules — you learn
                  how to think in Arabic.
                </p>
              </div>
            </div>
          </div>
        ),
      },

      {
        id: "eca",
        render: () => (
          <div className="rounded-3xl bg-white/85 backdrop-blur border border-cyan-100/60 shadow-xl overflow-hidden">
            <div className="p-8 md:p-10 bg-gradient-to-r from-cyan-50 to-teal-50 border-b border-cyan-100/60">
              <div className="flex items-start justify-between gap-6 flex-wrap">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 bg-white/70 border border-cyan-100">
                    <MessageCircle className="w-5 h-5 text-cyan-700" />
                    <span className="font-semibold text-gray-800">
                      Our Egyptian Arabic (ECA) Teachers
                    </span>
                  </div>
                  <p className="mt-4 text-xl font-bold text-gray-900">
                    Real Egyptians. Real Accent. Real Conversations.
                  </p>
                </div>

                <span
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 border font-semibold"
                  style={{
                    borderColor: `${accent}55`,
                    backgroundColor: `${accent}12`,
                    color: deep,
                  }}
                >
                  <Mic2 className="w-4 h-4" style={{ color: accent }} />
                  Daily / Real-life Track
                </span>
              </div>
            </div>

            <div className="p-8 md:p-10 space-y-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                Our ECA teachers are native speakers who bring the warmth,
                humor, and spirit of Egyptian culture straight into your lesson.
              </p>

              <div className="rounded-2xl border border-cyan-100 bg-white p-6">
                <p className="font-bold text-gray-900 mb-3">
                  These are the teachers who help you:
                </p>

                <ul className="grid sm:grid-cols-2 gap-3 text-gray-700">
                  {[
                    { icon: Mic2, text: "speak naturally like an Egyptian" },
                    {
                      icon: MessageCircle,
                      text: "understand daily conversations",
                    },
                    {
                      icon: Users,
                      text: "communicate with friends, family, or your partner’s relatives",
                    },
                    {
                      icon: MapPin,
                      text: "survive (and thrive!) in real situations like shopping, taxis, restaurants, and social gatherings",
                    },
                    {
                      icon: BadgeCheck,
                      text: "build confidence from the very first class",
                    },
                  ].map((it, idx) => {
                    const Icon = it.icon;
                    return (
                      <li key={idx} className="flex items-start gap-2">
                        <Icon className="w-5 h-5 text-cyan-700 mt-0.5" />
                        {it.text}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="rounded-2xl border border-cyan-100 bg-gradient-to-r from-cyan-50 to-teal-50 p-6">
                <p className="font-bold text-gray-900 mb-3">
                  ⭐ Why Students LOVE Our ECA Teachers
                </p>

                <ul className="space-y-3 text-gray-700">
                  {[
                    "Native Egyptians with deep cultural insight",
                    "Certified in teaching Arabic to foreigners",
                    "Specialists in teaching beginners who don’t read Arabic yet",
                    "Teach using Arabic + English + Franco-Arabic",
                    "Friendly, patient, and incredibly supportive",
                    "Experts in pronunciation and real-life expressions",
                    "Make every lesson fun, interactive, and full of energy",
                  ].map((t, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-2 w-2 h-2 rounded-full bg-cyan-600" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-teal-100 bg-white p-6">
                <p className="text-gray-800 font-semibold text-lg">
                  Your ECA teacher won’t just teach you the language — they will
                  teach you how Egyptians think, speak, and feel.
                </p>
              </div>
            </div>
          </div>
        ),
      },

      {
        id: "process",
        render: () => (
          <div className="rounded-3xl bg-white/85 backdrop-blur border border-cyan-100/60 shadow-xl overflow-hidden">
            <div className="p-8 md:p-10 bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-cyan-100/60">
              <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 bg-white/70 border border-cyan-100">
                <Workflow className="w-5 h-5 text-teal-700" />
                <span className="font-semibold text-gray-800">
                  Our Teacher Selection Process
                </span>
              </div>
              <p className="mt-4 text-xl font-bold text-gray-900">
                Only the Top 5% Make It.
              </p>
            </div>

            <div className="p-8 md:p-10">
              <div className="space-y-5">
                {[
                  {
                    title: " Step 1 — Academic & Experience Screening",
                    text: "We review degrees, certifications, experience, and teaching background.",
                  },
                  {
                    title: " Step 2 — Live Teaching Demo",
                    text: "We evaluate clarity, methodology, fluency, accent, confidence, and teaching style.",
                  },
                  {
                    title: " Step 3 — Professional Training",
                    text: "Teachers receive specialized training in: our curriculum, our teaching system, Franco-Arabic instruction, teaching beginners from zero, cultural communication skills.",
                  },
                  {
                    title: " Step 4 — Final Evaluation",
                    text: "Only teachers who meet our performance standards move on to teach at EIAL.",
                  },
                ].map((s, idx) => (
                  <StepCard
                    key={idx}
                    accent={accent}
                    title={s.title}
                    text={s.text}
                  />
                ))}
              </div>

              <div className="mt-7 rounded-2xl bg-gradient-to-r from-cyan-50 to-teal-50 border border-cyan-100/60 p-6">
                <p className="text-gray-800 font-semibold text-lg leading-relaxed">
                  We don’t choose teachers randomly — we choose teachers who
                  will change your entire learning experience.
                </p>
              </div>
            </div>
          </div>
        ),
      },
    ],
    [accent, deep]
  );

  // ✅ mobile: scroll | desktop: tabs
  const scrollTo = (id) => {
    setActive(id);

    if (isDesktop) {
      // optional: رجّع المستخدم لفوق منطقة المحتوى
      wrapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const el = sectionRefs.current[id];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ✅ Observer يشتغل للموبايل فقط
  useEffect(() => {
    if (isDesktop) return;

    const entries = Object.entries(sectionRefs.current).filter(
      ([, el]) => !!el
    );

    const observer = new IntersectionObserver(
      (obsEntries) => {
        const visible = obsEntries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.dataset?.sectionId) {
          setActive(visible.target.dataset.sectionId);
        }
      },
      {
        threshold: [0.15, 0.25, 0.35, 0.45, 0.6],
        rootMargin: "-15% 0px -60% 0px",
      }
    );

    entries.forEach(([, el]) => observer.observe(el));
    return () => observer.disconnect();
  }, [isDesktop]);

  const activeSection = sectionsData.find((s) => s.id === active);

  return (
    <section
      ref={wrapRef}
      className="relative overflow-hidden py-20 px-6 bg-gradient-to-br from-white via-cyan-50/40 to-teal-50/50"
    >
      {/* Background decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-24 -left-24 w-[560px] h-[560px] rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: accent }}
        />
        <div className="absolute -bottom-24 -right-24 w-[680px] h-[680px] rounded-full blur-3xl opacity-15 bg-cyan-300" />
        <div className="absolute top-24 right-14 w-24 h-24 border-2 border-cyan-300/30 rounded-3xl rotate-12" />
        <div className="absolute bottom-28 left-16 w-16 h-16 bg-teal-300/20 rounded-2xl -rotate-12" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ✅ Mobile sticky pills (unchanged behavior) */}
        <div className="lg:hidden sticky top-0 z-20 mx-6 px-6 py-4 backdrop-blur border-b border-cyan-100">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {sections.map((s) => {
              const Icon = s.icon;
              const isActive = active === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full border transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white border-transparent shadow-md"
                      : "bg-white/70 border-cyan-100 text-gray-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-semibold text-sm">{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* ✅ Desktop sidebar = Tabs */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-10">
              <div className="rounded-3xl bg-white/80 backdrop-blur border border-cyan-100/60 shadow-xl overflow-hidden">
                <div className="p-6 border-b border-cyan-100/60 bg-gradient-to-r from-cyan-50 to-teal-50">
                  <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/70 border border-cyan-100">
                    <Sparkles className="w-4 h-4" style={{ color: accent }} />
                    <span className="font-semibold text-gray-800">
                      Teacher Overview
                    </span>
                  </div>
                  <h3 className="mt-4 text-2xl font-bold text-gray-900">
                    Navigate the story
                  </h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">
                    On desktop, these work like tabs (one section at a time).
                  </p>
                </div>

                <div className="p-4">
                  <div className="space-y-2">
                    {sections.map((s) => {
                      const Icon = s.icon;
                      const isActive = active === s.id;
                      return (
                        <button
                          key={s.id}
                          onClick={() => scrollTo(s.id)}
                          className={`w-full text-left rounded-2xl border transition-all p-4 group ${
                            isActive
                              ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white border-transparent shadow-lg"
                              : "bg-white/60 border-cyan-100 hover:bg-white"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                                isActive
                                  ? "bg-white/15"
                                  : "bg-teal-50 border border-teal-100"
                              }`}
                            >
                              <Icon
                                className={`w-5 h-5 ${
                                  isActive ? "text-white" : "text-teal-700"
                                }`}
                              />
                            </div>

                            <div className="flex-1">
                              <p
                                className={`font-bold ${
                                  isActive ? "text-white" : "text-gray-900"
                                }`}
                              >
                                {s.label}
                              </p>
                              <p
                                className={`text-sm mt-0.5 ${
                                  isActive ? "text-white/85" : "text-gray-600"
                                }`}
                              >
                                {s.hint}
                              </p>
                              <div
                                className={`mt-3 h-1 w-14 rounded-full transition-all ${
                                  isActive ? "bg-white/60" : "bg-teal-200"
                                }`}
                              />
                            </div>

                            <ArrowRight
                              className={`w-5 h-5 mt-1 transition-all ${
                                isActive
                                  ? "text-white"
                                  : "text-gray-400 group-hover:text-teal-600"
                              }`}
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-3xl bg-white/75 backdrop-blur border border-cyan-100/60 p-5">
                <p className="text-gray-700 font-semibold">
                  Only the Top 5% make it — and it shows in every lesson.
                </p>
              </div>
            </div>
          </aside>

          {/* ✅ Content: mobile = scrollytelling | desktop = one tab */}
          <main className="lg:col-span-8 space-y-10">
            {isDesktop ? (
              <div>{activeSection?.render()}</div>
            ) : (
              sectionsData.map((item) => (
                <div
                  key={item.id}
                  ref={(el) => (sectionRefs.current[item.id] = el)}
                  data-section-id={item.id}
                  className="scroll-mt-24"
                >
                  {item.render()}
                </div>
              ))
            )}
          </main>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

function StepCard({ accent, title, text }) {
  return (
    <div className="rounded-2xl border border-cyan-100/60 bg-white p-5 hover:shadow-md transition-all">
      <div className="flex items-start gap-4">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center border"
          style={{ backgroundColor: `${accent}14`, borderColor: `${accent}44` }}
        >
          <Sparkles className="w-5 h-5" style={{ color: accent }} />
        </div>
        <div>
          <p className="font-bold text-gray-900">{title}</p>
          <p className="mt-2 text-gray-600 leading-relaxed">{text}</p>
        </div>
      </div>
    </div>
  );
}
