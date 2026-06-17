"use client";
import React, { useState, useEffect } from "react";
import {
  Clock,
  FileText,
  Award,
  CheckCircle,
  XCircle,
  Play,
  Lock,
  Target,
  TrendingUp,
  Calendar,
  Users,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";

const examData = [
  {
    id: 1,
    unitName: "Unit 1: Introduction & Greetings",
    examTitle: "Arabic Greetings & Introduction Assessment",
    description:
      "Test your knowledge of basic Arabic greetings, introductions, and the Arabic alphabet fundamentals.",
    duration: 45,
    totalQuestions: 25,
    passingScore: 70,
    difficulty: "Beginner",
    status: "available", // available, completed, locked
    score: null,
    attempts: 0,
    maxAttempts: 3,
    topics: [
      "Arabic Alphabet",
      "Basic Greetings",
      "Self Introduction",
      "Farewells",
    ],
    examType: "Mixed",
    dueDate: "2025-08-15",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center",
    backgroundColor: "from-emerald-50 to-teal-50",
    accentColor: "#02AAA0",
    borderColor: "border-emerald-200",
  },
  {
    id: 2,
    unitName: "Unit 1: Essential Vocabulary",
    examTitle: "Core Arabic Vocabulary Test",
    description:
      "Evaluate your understanding of essential Arabic nouns, verbs, and pronouns used in daily conversations.",
    duration: 50,
    totalQuestions: 30,
    passingScore: 75,
    difficulty: "Beginner",
    status: "available",
    score: 85,
    attempts: 1,
    maxAttempts: 3,
    topics: ["Common Nouns", "Everyday Verbs", "Pronouns", "Vocabulary Usage"],
    examType: "Multiple Choice",
    dueDate: "2025-08-20",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center",
    backgroundColor: "from-blue-50 to-indigo-50",
    accentColor: "#3B82F6",
    borderColor: "border-blue-200",
  },
  {
    id: 3,
    unitName: "Unit 1: Basic Sentence Structure",
    examTitle: "Arabic Grammar & Sentence Formation",
    description:
      "Master Arabic sentence construction, question formation, and word order rules through comprehensive testing.",
    duration: 60,
    totalQuestions: 35,
    passingScore: 80,
    difficulty: "Intermediate",
    status: "available",
    score: null,
    attempts: 0,
    maxAttempts: 2,
    topics: [
      "Sentence Structure",
      "Question Formation",
      "Word Order",
      "Grammar Rules",
    ],
    examType: "Interactive",
    dueDate: "2025-08-25",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop&crop=center",
    backgroundColor: "from-purple-50 to-pink-50",
    accentColor: "#8B5CF6",
    borderColor: "border-purple-200",
  },
  {
    id: 4,
    unitName: "Unit 1: Conversational Practice",
    examTitle: "Arabic Conversation Skills Assessment",
    description:
      "Demonstrate your ability to engage in basic Arabic conversations and apply learned vocabulary in context.",
    duration: 40,
    totalQuestions: 20,
    passingScore: 70,
    difficulty: "Intermediate",
    status: "available",
    score: null,
    attempts: 0,
    maxAttempts: 3,
    topics: [
      "Dialogue Practice",
      "Context Usage",
      "Listening Comprehension",
      "Speaking Skills",
    ],
    examType: "Audio/Visual",
    dueDate: "2025-08-30",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&crop=center",
    backgroundColor: "from-orange-50 to-red-50",
    accentColor: "#F97316",
    borderColor: "border-orange-200",
  },
];

const getDifficultyColor = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case "beginner":
      return "bg-green-100 text-green-800";
    case "intermediate":
      return "bg-yellow-100 text-yellow-800";
    case "advanced":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status, score) => {
  if (status === "completed" && score >= 70)
    return <CheckCircle className="text-green-500" size={24} />;
  if (status === "completed" && score < 70)
    return <XCircle className="text-red-500" size={24} />;
  if (status === "locked") return <Lock className="text-gray-400" size={24} />;
  return <Play className="text-blue-500" size={24} />;
};

export default function ExamCard() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleExamStart = (examId, status) => {
  
    router.push(`/exams/exam-courses/exam-units/1/${examId}/2`)
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Exam Cards Grid */}
     <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
           Unit Exams
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-blue-500 mx-auto rounded-full"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {examData.map((exam, index) => {
          const isHovered = hoveredCard === exam.id;
          const isLocked = exam.status === "locked";
          const isCompleted = exam.status === "completed";

          return (
            <div
              
              key={exam.id}
              className={`
                  relative overflow-hidden rounded-2xl transition-all duration-500 ease-out transform
                  ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }
                  ${
                    isHovered && !isLocked
                      ? "scale-105 shadow-2xl -translate-y-2"
                      : "scale-100"
                  }
                  ${isLocked ? "opacity-75" : ""}
                  bg-gradient-to-br ${exam.backgroundColor}
                  border-2 ${exam.borderColor}
                  shadow-lg cursor-pointer group
                `}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => !isLocked && setHoveredCard(exam.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => {
                handleExamStart(exam.id, exam.status)
              }}
            >
              {hoveredCard === exam.id && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute animate-float opacity-30"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${3 + Math.random() * 2}s`,
                      }}
                    >
                      <Sparkles className="w-4 h-4 text-teal-400" />
                    </div>
                  ))}
                </div>
              )}

              {/* Decorative Elements */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute top-4 right-4 w-16 h-16 rounded-full transition-transform duration-700"
                  style={{
                    backgroundColor: exam.accentColor,
                    transform: isHovered
                      ? "scale(1.3) rotate(180deg)"
                      : "scale(1)",
                  }}
                ></div>
                <div
                  className="absolute bottom-6 left-6 w-10 h-10 rounded-full transition-transform duration-500"
                  style={{
                    backgroundColor: exam.accentColor,
                    transform: isHovered
                      ? "scale(1.2) rotate(-90deg)"
                      : "scale(1)",
                  }}
                ></div>
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 left-4 z-20">
                {getStatusIcon(exam.status, exam.score)}
              </div>

              {/* Score Badge (if completed) */}
              {isCompleted && exam.score !== null && (
                <div className="absolute top-4 right-4 z-20">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold text-white ${
                      exam.score >= exam.passingScore
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {exam.score}%
                  </span>
                </div>
              )}

              {/* Exam Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={exam.image}
                  alt={exam.examTitle}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Exam Content */}
              <div className="p-6">
                {/* Unit Name */}
                <div className="text-sm text-gray-500 mb-2 font-medium">
                  {exam.unitName}
                </div>

                {/* Exam Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
                  {exam.examTitle}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {exam.description}
                </p>

                {/* Exam Details */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock size={16} />
                    <span>{exam.duration} min</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FileText size={16} />
                    <span>{exam.totalQuestions} questions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Target size={16} />
                    <span>{exam.passingScore}% to pass</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={16} />
                    <span>Due {exam.dueDate}</span>
                  </div>
                </div>

                {/* Difficulty & Type Badges */}
                <div className="flex gap-2 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
                      exam.difficulty
                    )}`}
                  >
                    {exam.difficulty}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                    {exam.examType}
                  </span>
                </div>

                {/* Topics Covered */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Topics Covered:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {exam.topics.map((topic, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-white/60 text-xs text-gray-600 rounded"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Attempts Info */}
                {!isLocked && (
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>
                      Attempts: {exam.attempts}/{exam.maxAttempts}
                    </span>
                    <span>{exam.maxAttempts - exam.attempts} remaining</span>
                  </div>
                )}

                {/* Action Button */}
                <button
                  className={`
                      w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 transform
                      ${
                        isLocked
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : isCompleted
                          ? "bg-green-500 hover:bg-green-600 text-white hover:shadow-lg hover:scale-105"
                          : "text-white hover:shadow-lg hover:scale-105"
                      }
                    `}
                  style={{
                    backgroundColor: isLocked
                      ? undefined
                      : isCompleted
                      ? undefined
                      : exam.accentColor,
                    opacity: isLocked ? 0.6 : 1,
                  }}
                >
                  Start Exam
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
