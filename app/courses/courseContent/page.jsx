"use client";

import { ArrowLeftCircle, CheckCircle, Clock } from "lucide-react";
import Link from "next/link.js";
import { Icon } from "@iconify/react";
import BannerSection from "../../../components/Courses/CourseDetails/BannerSection";
import { FadeInWhenVisible } from "../../../components/shared/FadeInWhenVisible";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const course = {
    id: 1,
    level: "Level 1",
    title: "Egyptian Arabic Conversation Course",
    duration: "12 Weeks",
    shortDescription:
      "Start speaking Egyptian Arabic confidently — from zero to real-life conversations!",

    courseIntroduction: [
      "Level 1 is your first step toward understanding and speaking Egyptian Arabic naturally.",
      "Even if you’ve never studied Arabic before, you’ll learn how to communicate confidently and enjoy real conversations from your very first class.",
      "Designed especially for absolute beginners, including those who can’t yet read or write Arabic.",
      "Each lesson includes Franco-Arabic, clear explanations, and real-life examples.",
    ],

    courseObjectives: [
      "Build a strong foundation in Egyptian Arabic conversation and grammar.",
      "Learn how Egyptians naturally speak in real daily situations.",
      "Master verb forms (past, present, future, imperative).",
      "Improve speaking, listening, and pronunciation.",
      "Receive personalized feedback from native teachers.",
      "Gain confidence from the very first session.",
    ],

    topicsCovered1: [
      "Greetings & introductions",
      "Meeting new people",
      "Numbers & prices",
      "Daily routine",
      "Food & drinks",
      "Shopping",
      "Transportation & directions",

      "Health & body parts",
      "Weather & seasons",
      "Future plans",
      "Egyptian culture",
      "Idioms & slang",
      "Final conversation project",
    ],
    learningOutcomes: [
      "Speak Egyptian Arabic confidently.",
      "Understand 60–70% of spoken Egyptian Arabic.",
      "Communicate naturally in daily situations.",
      "Move to Level 2 with strong foundation.",
      "Understand Egyptian culture & humor.",
    ],

    pricing: {
      groupClasses: [
        "2 sessions per week (6 months – 48 live lessons).",
        "1.5–2 hours per session.",
        "Interactive Zoom classes.",
        "All sessions recorded.",
      ],
      privateClasses: [
        "2 private sessions weekly (60 minutes each).",
        "Fully customized learning plan.",
        "Faster improvement with one-on-one teacher.",
      ],
    },
  };

  return (
    <div className="bg-gray-50">
      <div className="container  mx-auto px-6 py-14 rounded-xl m-5">
        {/* 🔙 BACK */}
        <div
          onClick={() => {
            router.back();
          }}
          className="text-gray-600 hover:text-black flex items-center gap-2 cursor-pointer mb-6"
        >
          <ArrowLeftCircle className="w-5 h-5" />
          Back to Courses
        </div>

        {/* 🏷️ HEADER */}
        <FadeInWhenVisible delay={0.01} dir="down">
          <div className="text-center mb-16">
            <BannerSection
              title={course.title}
              level={course.level}
              duration={course.duration}
              shortDescription={course.shortDescription}
            />
          </div>
        </FadeInWhenVisible>

        {/* 🌟 INTRODUCTION */}
        <FadeInWhenVisible delay={0.1} dir="right">
          <Section title="Course Introduction">
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
              {course?.courseIntroduction?.map((sentence, index) => {
                return (
                  <div
                    key={index}
                    className="group flex items-start gap-2 p-5 rounded-2xl bg-white shadow-sm border border-gray-100 
                     hover:shadow-md hover:border-amber-300 transition-all duration-300"
                  >
                    <div className="w-[42px] h-[42px]">
                      <Icon
                        icon="garden:check-badge-fill-12"
                        className="text-amber-600 group-hover:text-amber-700 transition duration-300"
                        width={32}
                        height={32}
                      />
                    </div>

                    <p className="text-gray-700 leading-relaxed text-lg">
                      {sentence}
                    </p>
                  </div>
                );
              })}
            </div>
          </Section>
        </FadeInWhenVisible>

        {/* 🎯 OBJECTIVES */}
        <FadeInWhenVisible delay={0.2} dir="left">
          <Section title="Course Objectives">
            <FeatureList items={course?.courseObjectives} />
          </Section>
        </FadeInWhenVisible>

        {/* 🧩 TOPICS + OUTCOMES */}
        <div className=" gap-10">
          <FadeInWhenVisible delay={0.3} dir="right">
            <Section title="Topics Covered">
              <FeatureList items={course?.topicsCovered1} view="col-2" />
            </Section>
          </FadeInWhenVisible>

          {/*   <FadeInWhenVisible delay={0.4} dir="left">
          <Section title="Learning Outcomes">
            <FeatureList items={course?.learningOutcomes} />
          </Section>
        </FadeInWhenVisible> */}
        </div>

        {/* 💵 PRICING */}
        <Section title="Pricing & Registration">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <FadeInWhenVisible delay={0.45} dir="up">
              <PricingCard
                title="Group Classes"
                items={course.pricing.groupClasses}
              />
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.55} dir="up">
              <PricingCard
                title="Private Classes"
                items={course.pricing.privateClasses}
              />
            </FadeInWhenVisible>
          </div>
        </Section>

        {/* CTA */}
        <FadeInWhenVisible delay={0.7} dir="up">
          <div className="mt-14">
            <Link href={`/Courses/CoursesEnroll/`}>
              <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl transition text-xl">
                Enroll in {course.level}
              </button>
            </Link>
          </div>
        </FadeInWhenVisible>
      </div>
    </div>
  );
}

/* 📌 COMPONENTS */

function Section({ title, children }) {
  return (
    <div className="mb-14">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
      {children}
    </div>
  );
}

function FeatureList({ items, view = "col-1" }) {
  return (
    <ul
      className={` ${
        view === "col-2" ? "grid grid-cols-2 gap-4" : " space-y-4"
      }  `}
    >
      {view === "col-1" &&
        items?.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 p-3 rounded-lg bg-white shadow-sm hover:shadow border border-gray-100 transition"
          >
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <span className="text-gray-700">{item}</span>
          </li>
        ))}
      {view === "col-2" &&
        items?.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 p-3 rounded-lg bg-white shadow-sm hover:shadow border border-gray-100 transition"
          >
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <span className="text-gray-700">{item}</span>
          </li>
        ))}
    </ul>
  );
}

function PricingCard({ title, items }) {
  return (
    <div className="p-6 rounded-xl    transition">
      <h3 className="font-bold text-xl text-gray-800 mb-4">{title}</h3>
      <FeatureList items={items} />
    </div>
  );
}
