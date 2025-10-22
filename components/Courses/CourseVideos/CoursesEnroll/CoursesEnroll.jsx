"use client";

import React, { useState, useEffect } from "react";
import {
  Clock,
  Users,
  Star,
  BookOpen,
  Play,
  Lock,
  CheckCircle,
  ArrowRight,
  Calendar,
  Award,
  Target,
  FileText,
  Brain,
  CreditCard,
  FolderOpen,
  Globe,
  ChevronDown,
  ChevronRight,
  Loader2,
  MessageCircle,
  Headphones,
  PenTool,
} from "lucide-react";
import Link from "next/link";

const CoursesEnroll = ({ params, isEnrolled, setIsEnrolled }) => {
  const userData = localStorage.getItem("egy-user")
    ? JSON.parse(localStorage.getItem("egy-user"))
    : null;
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedUnits, setExpandedUnits] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [subject, setSubject] = useState(null);
  const unwrappedParams = params;

  useEffect(() => {
    const fetchSubjectData = async () => {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      const subjectData = {
        id: unwrappedParams?.id,
        title: "Egyptian Arabic Complete Course",
        description:
          "Master Egyptian Arabic from beginner to advanced with comprehensive lessons covering daily conversations, cultural contexts, and practical communication skills.",
        longDescription:
          "This comprehensive Egyptian Arabic course is designed for learners who want to communicate effectively in everyday Egyptian life. Through interactive lessons, real-life dialogues, and cultural insights, you'll learn to speak, understand, and interact confidently in Egyptian Arabic. Our course covers everything from basic greetings to complex conversations, including colloquial expressions and cultural nuances that textbooks often miss.",
        instructor: "Ahmed Hassan",
        duration: "12 weeks",
        students: 2847,
        rating: 4.9,
        reviews: 312,
        price: 149,
        originalPrice: 199,
        totalExams: 36,
        totalFlashcardSets: 24,
        image: "/images/online-course-of-study.jpg",
        publicExams: [
          {
            id: 1,
            title: "Egyptian Arabic Basics - Free Trial",
            questions: 20,
            duration: "25 min",
            type: "MCQ",
            isFree: true,
            description: "Test your basic Egyptian Arabic knowledge",
          },
          {
            id: 2,
            title: "Daily Conversations - Sample",
            questions: 15,
            duration: "20 min",
            type: "MCQ",
            isFree: true,
            description: "Practice common daily conversations",
          },
        ],
        units: [
          {
            id: 1,
            title: "Unit 1: Getting Started with Egyptian Arabic",
            description:
              "Foundation of Egyptian Arabic communication and pronunciation",
            topics: [
              {
                id: 1,
                title: "Arabic Alphabet & Pronunciation",
                description:
                  "Master the Arabic alphabet and Egyptian pronunciation patterns",
                exams: [
                  {
                    id: 1,
                    title: "Alphabet Recognition Test",
                    questions: 30,
                    duration: "35 min",
                    type: "MCQ",
                    isPreview: true,
                  },
                  {
                    id: 2,
                    title: "Pronunciation Practice",
                    questions: 25,
                    duration: "30 min",
                    type: "Audio",
                    isPreview: false,
                  },
                ],
                flashcardSets: [
                  {
                    id: 1,
                    title: "Arabic Letters",
                    cards: 28,
                    isCompleted: false,
                    isPreview: true,
                    category: "Alphabet",
                  },
                  {
                    id: 2,
                    title: "Basic Sounds",
                    cards: 20,
                    isCompleted: false,
                    isPreview: false,
                    category: "Pronunciation",
                  },
                ],
              },
              {
                id: 2,
                title: "Essential Greetings & Introductions",
                description:
                  "Learn how to greet people and introduce yourself in Egyptian Arabic",
                exams: [
                  {
                    id: 3,
                    title: "Greetings Assessment",
                    questions: 25,
                    duration: "30 min",
                    type: "Mixed",
                    isPreview: false,
                  },
                ],
                flashcardSets: [
                  {
                    id: 3,
                    title: "Common Greetings",
                    cards: 35,
                    isCompleted: false,
                    isPreview: false,
                    category: "Conversation",
                  },
                ],
              },
            ],
          },
          {
            id: 2,
            title: "Unit 2: Daily Life Conversations",
            description: "Navigate everyday situations in Egyptian Arabic",
            topics: [
              {
                id: 3,
                title: "Shopping & Bargaining",
                description:
                  "Essential vocabulary and phrases for shopping in Egyptian markets",
                exams: [
                  {
                    id: 4,
                    title: "Market Conversations",
                    questions: 30,
                    duration: "40 min",
                    type: "Dialogue",
                    isPreview: false,
                  },
                ],
                flashcardSets: [
                  {
                    id: 4,
                    title: "Shopping Vocabulary",
                    cards: 50,
                    isCompleted: false,
                    isPreview: false,
                    category: "Vocabulary",
                  },
                ],
              },
              {
                id: 4,
                title: "Food & Restaurant Arabic",
                description: "Order food and discuss meals like a local",
                exams: [
                  {
                    id: 5,
                    title: "Restaurant Dialogues",
                    questions: 35,
                    duration: "45 min",
                    type: "MCQ",
                    isPreview: false,
                  },
                ],
                flashcardSets: [
                  {
                    id: 5,
                    title: "Egyptian Food Terms",
                    cards: 45,
                    isCompleted: false,
                    isPreview: false,
                    category: "Food",
                  },
                ],
              },
            ],
          },
          {
            id: 3,
            title: "Unit 3: Egyptian Culture & Expression",
            description:
              "Deep dive into Egyptian expressions, idioms, and cultural contexts",
            topics: [
              {
                id: 5,
                title: "Egyptian Idioms & Expressions",
                description:
                  "Master common Egyptian expressions and their cultural meanings",
                exams: [
                  {
                    id: 6,
                    title: "Idioms & Culture Test",
                    questions: 40,
                    duration: "50 min",
                    type: "Mixed",
                    isPreview: false,
                  },
                ],
                flashcardSets: [
                  {
                    id: 6,
                    title: "Popular Egyptian Expressions",
                    cards: 60,
                    isCompleted: false,
                    isPreview: false,
                    category: "Culture",
                  },
                ],
              },
            ],
          },
        ],
      };

      setSubject(subjectData);
      setIsLoading(false);
    };

    fetchSubjectData();
  }, [unwrappedParams.id]);

  const handleEnroll = async () => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (userData) {
      setIsEnrolled(true);
      setIsLoading(false);
    }
  };

  const toggleUnit = (unitId) => {
    const newExpandedUnits = new Set(expandedUnits);
    if (newExpandedUnits.has(unitId)) {
      newExpandedUnits.delete(unitId);
    } else {
      newExpandedUnits.add(unitId);
    }
    setExpandedUnits(newExpandedUnits);
  };

  if (!subject) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#023f4d] mx-auto mb-4" />
          <p className="text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Subject Header */}
              <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-1/3">
                    <div className="relative">
                      <img
                        src={subject.image}
                        alt={subject.title}
                        className="w-full h-48 object-cover rounded-xl"
                      />
                      <button className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors rounded-xl">
                        <Brain className="w-12 h-12 text-white" />
                      </button>
                    </div>
                  </div>

                  <div className="lg:w-2/3">
                    <h1 className="text-3xl font-bold text-[#023f4d] mb-4">
                      {subject.title}
                    </h1>
                    <p className="text-gray-600 mb-6">{subject.description}</p>

                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-teal-600" />
                        <span className="text-sm text-gray-600">
                          {subject.duration}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-teal-600" />
                        <span className="text-sm text-gray-600">
                          {subject.students} students
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <span className="text-sm text-gray-600">
                          {subject.rating} ({subject.reviews} reviews)
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="w-5 h-5 text-cyan-600" />
                        <span className="text-sm text-gray-600">
                          {subject.totalExams} practice exams
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-5 h-5 text-emerald-600" />
                        <span className="text-sm text-gray-600">
                          {subject.totalFlashcardSets} flashcard sets
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white rounded-2xl shadow-sm">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6 overflow-x-auto">
                    <button
                      onClick={() => setActiveTab("overview")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                        activeTab === "overview"
                          ? "border-[#023f4d] text-[#023f4d]"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab("public-exams")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                        activeTab === "public-exams"
                          ? "border-[#023f4d] text-[#023f4d]"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Free Trials
                    </button>
                    <button
                      onClick={() => setActiveTab("units")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                        activeTab === "units"
                          ? "border-[#023f4d] text-[#023f4d]"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Course Content
                    </button>
                    <button
                      onClick={() => setActiveTab("instructor")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                        activeTab === "instructor"
                          ? "border-[#023f4d] text-[#023f4d]"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Instructor
                    </button>
                    <button
                      onClick={() => setActiveTab("reviews")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                        activeTab === "reviews"
                          ? "border-[#023f4d] text-[#023f4d]"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Reviews
                    </button>
                  </nav>
                </div>

                <div className="p-6">
                  {activeTab === "overview" && (
                    <div>
                      <h3 className="text-xl font-bold text-[#023f4d] mb-4">
                        Course Overview
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {subject.longDescription}
                      </p>

                      <h4 className="text-lg font-bold text-[#023f4d] mb-4">
                        What you'll learn:
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-teal-600 mt-1" />
                          <span className="text-gray-700">
                            Read and write Arabic script fluently
                          </span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-teal-600 mt-1" />
                          <span className="text-gray-700">
                            Engage in everyday Egyptian conversations
                          </span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-teal-600 mt-1" />
                          <span className="text-gray-700">
                            Understand Egyptian movies and TV shows
                          </span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-teal-600 mt-1" />
                          <span className="text-gray-700">
                            Navigate Egyptian markets and restaurants
                          </span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-teal-600 mt-1" />
                          <span className="text-gray-700">
                            Master Egyptian expressions and idioms
                          </span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-teal-600 mt-1" />
                          <span className="text-gray-700">
                            Build confidence in real-life situations
                          </span>
                        </div>
                      </div>

                      <h4 className="text-lg font-bold text-[#023f4d] mt-8 mb-4">
                        Course Features:
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-3 p-4 bg-teal-50 rounded-lg">
                          <MessageCircle className="w-8 h-8 text-teal-600" />
                          <div>
                            <h5 className="font-semibold text-[#023f4d]">
                              Interactive Dialogues
                            </h5>
                            <p className="text-sm text-gray-600">
                              Real-life conversations
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-4 bg-cyan-50 rounded-lg">
                          <Headphones className="w-8 h-8 text-cyan-600" />
                          <div>
                            <h5 className="font-semibold text-[#023f4d]">
                              Audio Lessons
                            </h5>
                            <p className="text-sm text-gray-600">
                              Native pronunciation
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-4 bg-emerald-50 rounded-lg">
                          <PenTool className="w-8 h-8 text-emerald-600" />
                          <div>
                            <h5 className="font-semibold text-[#023f4d]">
                              Writing Practice
                            </h5>
                            <p className="text-sm text-gray-600">
                              Script mastery
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "public-exams" && (
                    <div>
                      <h3 className="text-xl font-bold text-[#023f4d] mb-6">
                        Free Trial Lessons
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Try these free lessons to experience our teaching
                        methodology and course quality.
                      </p>
                      <div className="space-y-4">
                        {subject.publicExams.map((exam) => (
                          <div
                            key={exam.id}
                            className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-lg hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-center space-x-3">
                              <Globe className="w-5 h-5 text-teal-600" />
                              <div>
                                <h4 className="font-medium text-[#023f4d]">
                                  {exam.title}
                                </h4>
                                <p className="text-sm text-gray-600 mb-2">
                                  {exam.description}
                                </p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <span>{exam.questions} questions</span>
                                  <span>•</span>
                                  <span>{exam.duration}</span>
                                  <span>•</span>
                                  <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-xs">
                                    {exam.type}
                                  </span>
                                  <span className="bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full text-xs">
                                    Free
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "units" && (
                    <div>
                      <h3 className="text-xl font-bold text-[#023f4d] mb-6">
                        Course Content
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Explore our comprehensive curriculum designed to take
                        you from beginner to fluent speaker.
                      </p>
                      <div className="space-y-4">
                        {subject.units.map((unit) => (
                          <div
                            key={unit.id}
                            className="border border-gray-200 rounded-xl overflow-hidden hover:border-[#023f4d] transition-colors"
                          >
                            {/* Unit Header - Clickable */}
                            <button
                              onClick={() => toggleUnit(unit.id)}
                              className="w-full p-6 bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
                            >
                              <div className="flex items-center space-x-3">
                                <FolderOpen className="w-6 h-6 text-[#023f4d]" />
                                <div className="text-left">
                                  <h4 className="text-lg font-bold text-[#023f4d]">
                                    {unit.title}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    {unit.description}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="text-sm text-gray-500">
                                  {unit.topics.length} topics
                                </div>
                                {expandedUnits.has(unit.id) ? (
                                  <ChevronDown className="w-5 h-5 text-[#023f4d] transition-transform" />
                                ) : (
                                  <ChevronRight className="w-5 h-5 text-[#023f4d] transition-transform" />
                                )}
                              </div>
                            </button>

                            {/* Unit Content - Expandable */}
                            {expandedUnits.has(unit.id) && (
                              <div className="border-t border-gray-200 bg-gray-50 p-6">
                                <div className="space-y-4">
                                  {unit.topics.map((topic) => (
                                    <div
                                      key={topic.id}
                                      className="bg-white rounded-lg p-4 border border-gray-200"
                                    >
                                      <h5 className="font-semibold text-[#023f4d] mb-2">
                                        {topic.title}
                                      </h5>
                                      <p className="text-sm text-gray-600 mb-3">
                                        {topic.description}
                                      </p>

                                      {/* Exams */}
                                      {topic.exams.length > 0 && (
                                        <div className="mb-3">
                                          <h6 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                            <FileText className="w-4 h-4 mr-2 text-cyan-600" />
                                            Practice Tests ({topic.exams.length}
                                            )
                                          </h6>
                                          <div className="space-y-2">
                                            {topic.exams.map((exam) => (
                                              <div
                                                key={exam.id}
                                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                              >
                                                <div>
                                                  <span className="font-medium text-sm">
                                                    {exam.title}
                                                  </span>
                                                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                                                    <span>
                                                      {exam.questions} questions
                                                    </span>
                                                    <span>•</span>
                                                    <span>{exam.duration}</span>
                                                    <span>•</span>
                                                    <span className="bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full">
                                                      {exam.type}
                                                    </span>
                                                    {exam.isPreview && (
                                                      <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full">
                                                        Free Preview
                                                      </span>
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}

                                      {/* Flashcard Sets */}
                                      {topic.flashcardSets.length > 0 && (
                                        <div>
                                          <h6 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                            <CreditCard className="w-4 h-4 mr-2 text-emerald-600" />
                                            Flashcard Sets (
                                            {topic.flashcardSets.length})
                                          </h6>
                                          <div className="space-y-2">
                                            {topic.flashcardSets.map((set) => (
                                              <div
                                                key={set.id}
                                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                              >
                                                <div>
                                                  <span className="font-medium text-sm">
                                                    {set.title}
                                                  </span>
                                                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                                                    <span>
                                                      {set.cards} cards
                                                    </span>
                                                    <span>•</span>
                                                    <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                                                      {set.category}
                                                    </span>
                                                    {set.isPreview && (
                                                      <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full">
                                                        Free Preview
                                                      </span>
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "instructor" && (
                    <div>
                      <h3 className="text-xl font-bold text-[#023f4d] mb-4">
                        About the Instructor
                      </h3>
                      <div className="grid grid-cols-[auto_1fr] gap-4">
                        <div className="w-[64px] h-[64px] bg-[#023f4d] rounded-full flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">
                            AH
                          </span>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-[#023f4d]">
                            {subject.instructor}
                          </h4>
                          <p className="text-gray-600 mb-4">
                            Native Egyptian Arabic Teacher & Cultural Expert
                          </p>
                          <p className="text-gray-600">
                            Ahmed Hassan is a certified Arabic language
                            instructor with over 10 years of experience teaching
                            Egyptian Arabic to international students. Born and
                            raised in Cairo, he brings authentic cultural
                            insights and practical language skills to help
                            students communicate naturally and confidently in
                            Egyptian Arabic.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "reviews" && (
                    <div>
                      <h3 className="text-xl font-bold text-[#023f4d] mb-4">
                        Student Reviews
                      </h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-4 h-4 fill-current"
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">
                              Best Egyptian Arabic course!
                            </span>
                          </div>
                          <p className="text-gray-700">
                            "This course transformed my ability to communicate
                            in Egyptian Arabic. The lessons are practical,
                            engaging, and culturally rich. I can now watch
                            Egyptian movies without subtitles!"
                          </p>
                          <p className="text-sm text-gray-500 mt-2">
                            - Sarah Thompson, USA
                          </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-4 h-4 fill-current"
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">
                              Highly recommended!
                            </span>
                          </div>
                          <p className="text-gray-700">
                            "Ahmed is an excellent teacher who makes learning
                            fun and easy. The course structure is perfect for
                            beginners and the cultural insights are invaluable."
                          </p>
                          <p className="text-sm text-gray-500 mt-2">
                            - Michael Chen, Canada
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-[#023f4d]">
                      ${subject.price}
                    </div>
                    <div className="text-lg text-gray-500 line-through">
                      ${subject.originalPrice}
                    </div>
                    <div className="text-sm text-teal-600 font-medium">
                      25% off - Limited Time
                    </div>
                  </div>

                  {userData || isEnrolled ? (
                    <div className="space-y-4">
                      <div className="text-center text-gray-600 mb-4">
                        You are enrolled in this course
                      </div>
                      <Link
                        onClick={() => setIsEnrolled(true)}
                        href={`/courses/courseVideos/1`}
                      >
                        <button className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 flex items-center justify-center space-x-2">
                          <Brain className="w-4 h-4" />
                          <span>Continue Learning</span>
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <button
                        onClick={handleEnroll}
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-[#023f4d] to-teal-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-[#023f4d] hover:to-teal-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            Enrolling...
                          </>
                        ) : (
                          "Enroll Now"
                        )}
                      </button>
                      <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                        Add to Wishlist
                      </button>
                    </div>
                  )}

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 font-semibold">
                        This course includes:
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-teal-600" />
                        <span className="text-sm text-gray-700">
                          {subject.totalExams} Practice Tests
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-teal-600" />
                        <span className="text-sm text-gray-700">
                          {subject.totalFlashcardSets} Flashcard Sets
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-teal-600" />
                        <span className="text-sm text-gray-700">
                          Lifetime Access
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-teal-600" />
                        <span className="text-sm text-gray-700">
                          Certificate of Completion
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-teal-600" />
                        <span className="text-sm text-gray-700">
                          Mobile & Desktop Access
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-teal-600" />
                        <span className="text-sm text-gray-700">
                          Downloadable Resources
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-teal-600" />
                        <span className="text-sm text-gray-700">
                          24/7 Support
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                      <Lock className="w-4 h-4" />
                      <span>30-day money-back guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursesEnroll;
