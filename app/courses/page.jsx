"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Users,
  BookOpen,
  Calendar,
  Globe,
  Award,
  Video,
  ArrowRight,
  Play,
  Sparkles,
  Target,
  Heart,
  Star,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import PagesBanner from "./../../components/layout/PagesBanner";
import CoursesContentSection from "../../components/Courses/CoursesContentSection";
import MeetOurLanguageExperts from "../../components/Courses/MeetOurLanguageExperts";
import WhyChooseUs from "../../components/Courses/WhyChooseUs";
import Dontwait from "./../../components/About/DontWaitAbout";
import NeedMoreHelp from "../../components/Courses/NeedMoreHelp";

const CoursesPage = () => {
  const [yearsCount, setYearsCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const sectionRef = useRef(null);

  const features = [
    {
      icon: Users,
      label: "Expert Instructors",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Video,
      label: "Interactive Lessons",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Calendar,
      label: "Flexible Scheduling",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: Globe,
      label: "Cultural Immersion",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Target,
      label: "Personalized Learning",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: Heart,
      label: "Global Community",
      color: "from-pink-500 to-rose-500",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          // Animate years counter
          let start = 0;
          const end = 15;
          const timer = setInterval(() => {
            start += 1;
            setYearsCount(start);
            if (start === end) clearInterval(timer);
          }, 100);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  return (
    <div>
      <PagesBanner
        title={"Courses"}
        subTitle={"Providing the best learning experience."}
      />
      <CoursesContentSection />
      {/* <MeetOurLanguageExperts /> */}
      <WhyChooseUs />
      <Dontwait image={"/images/teacher-and-his-students.jpg"} />
      <NeedMoreHelp />
    </div>
  );
};

export default CoursesPage;
