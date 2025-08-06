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
} from "lucide-react";
import Link from "next/link";

const CoursesEnroll = ({ params  , isEnrolled , setIsEnrolled}) => {
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
        title: "Medical English",
        description:
          "Master essential English phrases and vocabulary for medical settings through comprehensive practice exams and flashcards.",
        longDescription:
          "This comprehensive subject is designed for healthcare professionals and students who want to improve their medical English communication skills. Through a combination of interactive practice exams and engaging flashcard exercises, you'll learn essential medical terminology, patient communication phrases, and professional vocabulary used in healthcare settings.",
        instructor: "Dr. Sarah Johnson",
        duration: "8 weeks",
        students: 1247,
        rating: 4.8,
        reviews: 89,
        price: 99,
        originalPrice: 149,
        totalExams: 24,
        totalFlashcardSets: 12,
        image: "/images/online-course-of-study.jpg",
        publicExams: [
          {
            id: 1,
            title: "Medical English Basics - Free Trial",
            questions: 15,
            duration: "20 min",
            type: "MCQ",
            isFree: true,
            description: "Try our medical English exam for free",
          },
          {
            id: 2,
            title: "Patient Communication - Sample",
            questions: 10,
            duration: "15 min",
            type: "MCQ",
            isFree: true,
            description: "Sample exam on patient communication",
          },
        ],
        units: [
          {
            id: 1,
            title: "Unit 1: Basic Medical Communication",
            description: "Foundation of medical English communication",
            topics: [
              {
                id: 1,
                title: "Patient Greetings & Introductions",
                description:
                  "Learn how to greet patients and introduce yourself professionally",
                exams: [
                  {
                    id: 1,
                    title: "Basic Patient Greetings",
                    questions: 25,
                    duration: "30 min",
                    type: "MCQ",
                    isPreview: true,
                  },
                  {
                    id: 2,
                    title: "Professional Introductions",
                    questions: 30,
                    duration: "45 min",
                    type: "MCQ",
                    isPreview: false,
                  },
                ],
                flashcardSets: [
                  {
                    id: 1,
                    title: "Greeting Phrases",
                    cards: 20,
                    isCompleted: false,
                    isPreview: true,
                    category: "Conversation",
                  },
                  {
                    id: 2,
                    title: "Introduction Vocabulary",
                    cards: 15,
                    isCompleted: false,
                    isPreview: false,
                    category: "Vocabulary",
                  },
                ],
              },
              {
                id: 2,
                title: "Medical History Taking",
                description:
                  "Essential phrases for taking patient medical history",
                exams: [
                  {
                    id: 3,
                    title: "History Taking Basics",
                    questions: 35,
                    duration: "60 min",
                    type: "Mixed",
                    isPreview: false,
                  },
                ],
                flashcardSets: [
                  {
                    id: 3,
                    title: "History Taking Phrases",
                    cards: 30,
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
            title: "Unit 2: Symptoms & Complaints",
            description: "Understanding and discussing patient symptoms",
            topics: [
              {
                id: 3,
                title: "Common Symptoms",
                description:
                  "Vocabulary for describing common medical symptoms",
                exams: [
                  {
                    id: 4,
                    title: "Symptoms Assessment",
                    questions: 40,
                    duration: "75 min",
                    type: "MCQ",
                    isPreview: false,
                  },
                ],
                flashcardSets: [
                  {
                    id: 4,
                    title: "Symptom Vocabulary",
                    cards: 45,
                    isCompleted: false,
                    isPreview: false,
                    category: "Vocabulary",
                  },
                ],
              },
              {
                id: 4,
                title: "Pain Assessment",
                description: "How to assess and discuss pain with patients",
                exams: [
                  {
                    id: 5,
                    title: "Pain Assessment Techniques",
                    questions: 30,
                    duration: "45 min",
                    type: "MCQ",
                    isPreview: false,
                  },
                ],
                flashcardSets: [
                  {
                    id: 5,
                    title: "Pain Descriptions",
                    cards: 25,
                    isCompleted: false,
                    isPreview: false,
                    category: "Assessment",
                  },
                ],
              },
            ],
          },
          {
            id: 3,
            title: "Unit 3: Emergency & Urgent Care",
            description: "Critical communication for emergency situations",
            topics: [
              {
                id: 5,
                title: "Emergency Phrases",
                description:
                  "Essential phrases for emergency medical situations",
                exams: [
                  {
                    id: 6,
                    title: "Emergency Communication",
                    questions: 20,
                    duration: "30 min",
                    type: "MCQ",
                    isPreview: false,
                  },
                ],
                flashcardSets: [
                  {
                    id: 6,
                    title: "Emergency Vocabulary",
                    cards: 35,
                    isCompleted: false,
                    isPreview: false,
                    category: "Emergency",
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

    setIsEnrolled(true);
    setIsLoading(false);
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

  if (isLoading || !subject) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading subject details...</p>
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
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                      {subject.title}
                    </h1>
                    <p className="text-gray-600 mb-6">{subject.description}</p>

                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {subject.duration}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-gray-500" />
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
                        <FileText className="w-5 h-5 text-blue-500" />
                        <span className="text-sm text-gray-600">
                          {subject.totalExams} practice exams
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-5 h-5 text-purple-500" />
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
                  <nav className="flex space-x-8 px-6">
                    <button
                      onClick={() => setActiveTab("overview")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                        activeTab === "overview"
                          ? "border-purple-500 text-purple-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab("public-exams")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                        activeTab === "public-exams"
                          ? "border-purple-500 text-purple-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Public Exams
                    </button>
                    <button
                      onClick={() => setActiveTab("units")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                        activeTab === "units"
                          ? "border-purple-500 text-purple-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Units & Topics
                    </button>
                    <button
                      onClick={() => setActiveTab("instructor")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                        activeTab === "instructor"
                          ? "border-purple-500 text-purple-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Instructor
                    </button>
                    <button
                      onClick={() => setActiveTab("reviews")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                        activeTab === "reviews"
                          ? "border-purple-500 text-purple-600"
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
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Subject Overview
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {subject.longDescription}
                      </p>

                      <h4 className="text-lg font-bold text-gray-900 mb-4">
                        What you'll learn:
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                          <span className="text-gray-700">
                            Essential medical English vocabulary and terminology
                          </span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                          <span className="text-gray-700">
                            Patient communication and history-taking phrases
                          </span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                          <span className="text-gray-700">
                            Emergency and urgent care terminology
                          </span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                          <span className="text-gray-700">
                            Professional medical documentation language
                          </span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                          <span className="text-gray-700">
                            Interactive practice with real medical scenarios
                          </span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                          <span className="text-gray-700">
                            Flashcard-based vocabulary building
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "public-exams" && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-6">
                        Public Exams
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Try these free exams to get a feel for our medical
                        English practice tests.
                      </p>
                      <div className="space-y-4">
                        {subject.publicExams.map((exam) => (
                          <div
                            key={exam.id}
                            className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <Globe className="w-5 h-5 text-green-600" />
                              <div>
                                <h4 className="font-medium text-gray-900">
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
                                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                                    {exam.type}
                                  </span>
                                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
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
                      <h3 className="text-xl font-bold text-gray-900 mb-6">
                        Units & Topics
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Enroll to access all units, topics, exams, and
                        flashcards.
                      </p>
                      <div className="space-y-4">
                        {subject.units.map((unit) => (
                          <div
                            key={unit.id}
                            className="border border-gray-200 rounded-xl overflow-hidden"
                          >
                            {/* Unit Header - Clickable */}
                            <button
                              onClick={() => toggleUnit(unit.id)}
                              className="w-full p-6 bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
                            >
                              <div className="flex items-center space-x-3">
                                <FolderOpen className="w-6 h-6 text-blue-600" />
                                <div className="text-left">
                                  <h4 className="text-lg font-bold text-gray-900">
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
                                  <ChevronDown className="w-5 h-5 text-gray-500 transition-transform" />
                                ) : (
                                  <ChevronRight className="w-5 h-5 text-gray-500 transition-transform" />
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
                                      <h5 className="font-semibold text-gray-900 mb-2">
                                        {topic.title}
                                      </h5>
                                      <p className="text-sm text-gray-600 mb-3">
                                        {topic.description}
                                      </p>

                                      {/* Exams */}
                                      {topic.exams.length > 0 && (
                                        <div className="mb-3">
                                          <h6 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                            <FileText className="w-4 h-4 mr-2 text-blue-500" />
                                            Practice Exams ({topic.exams.length}
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
                                                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                                      {exam.type}
                                                    </span>
                                                    {exam.isPreview && (
                                                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
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
                                            <CreditCard className="w-4 h-4 mr-2 text-purple-500" />
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
                                                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                                                      {set.category}
                                                    </span>
                                                    {set.isPreview && (
                                                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
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
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        About the Instructor
                      </h3>
                      <div className="flex items-start space-x-4">
                        <div className="!w-16 !h-16 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-2xl font-bold text-purple-600">
                            SJ
                          </span>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">
                            {subject.instructor}
                          </h4>
                          <p className="text-gray-600 mb-4">
                            Medical English Specialist & Healthcare
                            Communication Expert
                          </p>
                          <p className="text-gray-600">
                            Dr. Sarah Johnson has over 15 years of experience
                            teaching medical English to healthcare professionals
                            worldwide. She specializes in patient communication,
                            medical terminology, and healthcare documentation.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "reviews" && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
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
                              Excellent subject!
                            </span>
                          </div>
                          <p className="text-gray-700">
                            "This subject helped me improve my medical English
                            significantly. The practice exams are very realistic
                            and the flashcards are great for vocabulary
                            building."
                          </p>
                          <p className="text-sm text-gray-500 mt-2">
                            - Dr. Maria Rodriguez
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
                    <div className="text-3xl font-bold text-gray-900">
                      ${subject.price}
                    </div>
                    <div className="text-lg text-gray-500 line-through">
                      ${subject.originalPrice}
                    </div>
                    <div className="text-sm text-green-600 font-medium">
                      33% off
                    </div>
                  </div>

                  {isEnrolled ? (
                    <div className="space-y-4">
                      <div className="text-center text-gray-600 mb-4">
                        You are enrolled in this subject
                      </div>
                      <Link 
                      onClick={() => setIsEnrolled(true)}
                      href={`/courses/courseVideos/1`}>
                        <button className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center space-x-2">
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
                        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
                      <span className="text-gray-600">Subject includes:</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">
                          {subject.totalExams} Practice Exams
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">
                          {subject.totalFlashcardSets} Flashcard Sets
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">
                          Lifetime Access
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">
                          Certificate of Completion
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">
                          Mobile & Desktop Access
                        </span>
                      </div>
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
