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
  Video,
  Volume2,
  X,
  ArrowLeft,
  Timer,
  AlertCircle,
  Mail,
  CheckSquare,
} from "lucide-react";

import Link from "next/link";

// Email Notification Component
const EmailNotificationModal = ({
  isOpen,
  onClose,
  courseData,
  placementScore,
}) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const getRecommendedLevel = (score) => {
    if (score >= 80) return "Advanced";
    if (score >= 60) return "Intermediate";
    return "Beginner";
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate email submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setEmail("");
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen || !courseData) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000] p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-cyan-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-teal-600" />
              <div>
                <h2 className="text-xl font-bold text-[#023f4d]">
                  {isSubmitted ? "Email Sent!" : "Get Enrollment Details"}
                </h2>
                <p className="text-gray-600 text-sm">
                  {isSubmitted
                    ? "Check your inbox for next steps"
                    : "We'll send you enrollment information"}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {!isSubmitted ? (
            <div>
              {/* Test Results Summary */}
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-[#023f4d] mb-2">
                  Your Placement Test Results:
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Score:</span>
                  <span className="font-bold text-[#023f4d]">
                    {placementScore}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Recommended Level:</span>
                  <span className="font-bold text-teal-600">
                    {getRecommendedLevel(placementScore)}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-4">
                Enter your email address and we'll send you detailed enrollment
                information, course access instructions, and your personalized
                learning path based on your placement test results.
              </p>

              <form onSubmit={handleSubmitEmail}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="w-full bg-gradient-to-r from-[#023f4d] to-teal-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-[#023f4d] hover:to-teal-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 mr-2" />
                      Send Enrollment Information
                    </>
                  )}
                </button>
              </form>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">
                  By providing your email, you agree to receive course
                  information and enrollment details. We respect your privacy
                  and won't spam you.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckSquare className="w-8 h-8 text-green-600" />
              </div>

              <h3 className="text-xl font-bold text-[#023f4d] mb-2">
                Email Sent Successfully!
              </h3>

              <p className="text-gray-600 mb-4">
                We've sent detailed enrollment information to{" "}
                <strong>{email}</strong>
              </p>

              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-[#023f4d] mb-2">
                  What's Next?
                </h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600" />
                    <span>Check your email for enrollment link</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600" />
                    <span>Complete payment process</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600" />
                    <span>Start learning at your recommended level</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Placement Test Component
const PlacementTestModal = ({ isOpen, onClose, onComplete, courseTitle }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes
  const [showResults, setShowResults] = useState(false);
  const [testScore, setTestScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample placement test questions
  const questions = [
    {
      id: 1,
      question: "What does 'أهلاً وسهلاً' mean in English?",
      options: ["Good morning", "Welcome/Hello", "How are you?", "Goodbye"],
      correct: 1,
      level: "beginner",
    },
    {
      id: 2,
      question: "How do you say 'My name is...' in Egyptian Arabic?",
      options: ["اسمي...", "أنا اسمي...", "اسمي هو...", "إسمي..."],
      correct: 0,
      level: "beginner",
    },
    {
      id: 3,
      question: "What is the Egyptian Arabic word for 'water'?",
      options: ["ماية", "مويا", "مايه", "All of the above"],
      correct: 3,
      level: "intermediate",
    },
    {
      id: 4,
      question: "Complete the phrase: 'إزايك يا...' (How are you...)",
      options: [
        "حبيبي/حبيبتي",
        "أستاذ/أستاذة",
        "صديقي/صديقتي",
        "All are correct",
      ],
      correct: 3,
      level: "intermediate",
    },
    {
      id: 5,
      question: "What does 'معلش' mean in Egyptian Arabic?",
      options: ["Thank you", "Never mind/It's okay", "Excuse me", "I'm sorry"],
      correct: 1,
      level: "advanced",
    },
  ];

  // Timer effect
  useEffect(() => {
    if (isOpen && !showResults && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0 && !showResults) {
      handleSubmitTest();
    }
  }, [timeLeft, isOpen, showResults]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers({
      ...answers,
      [questionId]: answerIndex,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmitTest();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitTest = async () => {
    setIsSubmitting(true);

    // Calculate score
    let score = 0;
    questions.forEach((question) => {
      if (answers[question.id] === question.correct) {
        score += 1;
      }
    });

    const percentage = Math.round((score / questions.length) * 100);
    setTestScore(percentage);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowResults(true);
  };

  const getRecommendedLevel = (score) => {
    if (score >= 80)
      return {
        level: "Advanced",
        color: "text-emerald-600",
        bg: "bg-emerald-50",
      };
    if (score >= 60)
      return {
        level: "Intermediate",
        color: "text-teal-600",
        bg: "bg-teal-50",
      };
    return { level: "Beginner", color: "text-cyan-600", bg: "bg-cyan-50" };
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setTimeLeft(1200);
    setTestScore(0);
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000] p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-cyan-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#023f4d]">
                Placement Test
              </h2>
              <p className="text-gray-600 text-sm">{courseTitle}</p>
            </div>
            {!showResults && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Timer className="w-4 h-4" />
                  <span
                    className={timeLeft < 300 ? "text-red-600 font-medium" : ""}
                  >
                    {formatTime(timeLeft)}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {!showResults && !isSubmitting ? (
            <>
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-sm text-gray-500">
                    {Math.round(
                      ((currentQuestion + 1) / questions.length) * 100
                    )}
                    % Complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-teal-600 to-cyan-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        ((currentQuestion + 1) / questions.length) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Current Question */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#023f4d] mb-6">
                  {questions[currentQuestion].question}
                </h3>

                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        handleAnswerSelect(questions[currentQuestion].id, index)
                      }
                      className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                        answers[questions[currentQuestion].id] === index
                          ? "border-teal-500 bg-teal-50 text-teal-700"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            answers[questions[currentQuestion].id] === index
                              ? "border-teal-500 bg-teal-500"
                              : "border-gray-300"
                          }`}
                        >
                          {answers[questions[currentQuestion].id] === index && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span className="font-medium">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 0}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>

                <button
                  onClick={handleNextQuestion}
                  disabled={
                    answers[questions[currentQuestion].id] === undefined
                  }
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:from-teal-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {currentQuestion === questions.length - 1
                    ? "Submit Test"
                    : "Next"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : isSubmitting ? (
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 animate-spin text-teal-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#023f4d] mb-2">
                Evaluating Your Responses
              </h3>
              <p className="text-gray-600">
                Please wait while we calculate your placement level...
              </p>
            </div>
          ) : (
            // Results Screen
            <div className="text-center py-8">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#023f4d] mb-2">
                  Test Complete!
                </h3>
                <p className="text-gray-600">
                  Here are your placement test results
                </p>
              </div>

              {/* Score Display */}
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 mb-6">
                <div className="text-4xl font-bold text-[#023f4d] mb-2">
                  {testScore}%
                </div>
                <p className="text-gray-600">
                  You answered{" "}
                  {Math.round((testScore / 100) * questions.length)} out of{" "}
                  {questions.length} questions correctly
                </p>
              </div>

              {/* Recommended Level */}
              {/* <div
                className={`${
                  getRecommendedLevel(testScore).bg
                } rounded-xl p-6 mb-8`}
              >
                <h4 className="font-semibold text-[#023f4d] mb-2">
                  Recommended Starting Level
                </h4>
                <div
                  className={`text-2xl font-bold ${
                    getRecommendedLevel(testScore).color
                  } mb-2`}
                >
                  {getRecommendedLevel(testScore).level}
                </div>
                <p className="text-gray-600 text-sm">
                  {testScore >= 80
                    ? "You have a strong foundation in Egyptian Arabic. You can start with advanced topics."
                    : testScore >= 60
                    ? "You have some knowledge of Egyptian Arabic. Intermediate level would be perfect for you."
                    : "You're new to Egyptian Arabic. Starting with beginner level will give you a solid foundation."}
                </p>
              </div> */}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    onComplete(testScore);
                    onClose();
                  }}
                  className="flex-1 bg-gradient-to-r from-[#023f4d] to-teal-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-[#023f4d] hover:to-teal-700 transition-all duration-200"
                >
                  Get Enrollment Information
                </button>
                {/* <button
                  onClick={resetTest}
                  className="flex-1 border border-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Retake Test
                </button> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CoursesEnroll = ({ params }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedUnits, setExpandedUnits] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [subject, setSubject] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showPlacementTest, setShowPlacementTest] = useState(false);
  const [showEmailNotification, setShowEmailNotification] = useState(false);
  const [placementTestScore, setPlacementTestScore] = useState(null);
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
        advertisingVideoType: "url",
        advertisingVideoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        advertisingVideoFile: null,
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

  const handleStartPlacementTest = () => {
    setShowPlacementTest(true);
  };

  const handlePlacementTestComplete = (score) => {
    setPlacementTestScore(score);
    setShowEmailNotification(true);
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

  const renderAdvertisingVideo = () => {
    if (!subject.advertisingVideoType) return null;

    let videoSrc = null;

    if (subject.advertisingVideoType === "url" && subject.advertisingVideoUrl) {
      videoSrc = subject.advertisingVideoUrl;
    } else if (
      subject.advertisingVideoType === "upload" &&
      subject.advertisingVideoFile
    ) {
      videoSrc = URL.createObjectURL(subject.advertisingVideoFile);
    }

    if (!videoSrc) return null;

    return (
      <div className="mb-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Video Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Video className="w-6 h-6 text-[#023f4d]" />
              <div>
                <h2 className="text-xl font-bold text-[#023f4d]">
                  Course Preview
                </h2>
                <p className="text-gray-600 text-sm">
                  Get a taste of what you'll learn in this course
                </p>
              </div>
            </div>
          </div>

          {/* Video Player */}
          <div className="relative bg-black">
            <video
              className="w-full h-auto max-h-[500px] object-cover"
              controls
              preload="metadata"
              poster={subject.image}
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
              onEnded={() => setIsVideoPlaying(false)}
            >
              <source src={videoSrc} type="video/mp4" />
              <source src={videoSrc} type="video/webm" />
              <source src={videoSrc} type="video/ogg" />
              Your browser does not support the video tag.
            </video>

            {/* Video Overlay Info */}
            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-2 text-sm">
                <Volume2 className="w-4 h-4" />
                <span>Course Introduction</span>
              </div>
            </div>

            {/* Play Status Indicator */}
            {isVideoPlaying && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium animate-pulse">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  LIVE PREVIEW
                </div>
              </div>
            )}
          </div>

          {/* Video Info */}
          <div className="p-6 bg-gradient-to-r from-teal-50 to-cyan-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-semibold text-[#023f4d] mb-1">
                  Why Choose This Course?
                </h3>
                <p className="text-gray-600 text-sm">
                  Watch this preview to understand our teaching methodology and
                  course quality
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4 text-teal-600" />
                  <span>
                    {subject.students.toLocaleString()} students enrolled
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>{subject.rating} rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
              {/* Advertising Video Section */}
              {renderAdvertisingVideo()}

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
              <div className="sticky top-[6rem]">
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

                  <div className="space-y-4">
                    {/* Placement Test Info */}
                    <div className="p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-200 mb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Target className="w-5 h-5 text-teal-600" />
                        <h4 className="font-semibold text-[#023f4d]">
                          Placement Test Required
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Take a quick 5-minute test to determine your optimal
                        starting level
                      </p>
                    </div>

                    <button
                      onClick={handleStartPlacementTest}
                      className="w-full bg-gradient-to-r from-[#023f4d] to-teal-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-[#023f4d] hover:to-teal-700 transition-all duration-300 flex items-center justify-center"
                    >
                      <Target className="w-4 h-4 mr-2" />
                      Take Placement Test & Get Info
                    </button>
                    <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                      Add to Wishlist
                    </button>
                  </div>

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

      {/* Placement Test Modal */}
      <PlacementTestModal
        isOpen={showPlacementTest}
        onClose={() => setShowPlacementTest(false)}
        onComplete={handlePlacementTestComplete}
        courseTitle={subject.title}
      />

      {/* Email Notification Modal */}
      <EmailNotificationModal
        isOpen={showEmailNotification}
        onClose={() => setShowEmailNotification(false)}
        courseData={subject}
        placementScore={placementTestScore}
      />
    </>
  );
};

export default CoursesEnroll;
