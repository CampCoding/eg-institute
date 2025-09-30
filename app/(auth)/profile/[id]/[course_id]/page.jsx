"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Play,
  Clock,
  BookOpen,
  Users,
  Star,
  Award,
  Calendar,
  CheckCircle,
  Lock,
  Video,
  FileText,
  PenTool,
  Download,
  Eye,
  PlayCircle,
  Pause,
  Volume2,
  Sparkles,
  Trophy,
  Target,
  ChevronRight,
  BarChart3,
  Flame,
  Zap,
  Heart,
  Share2,
  Bookmark,
  ArrowRight,
} from "lucide-react";
import ProfileCourseLessons from "../../../../../components/Profile/ProfileCourses/ProfileCourseDetails/ProfileCourseLessons/ProfileCourseLessons";
import ProfileCoursesLives from "../../../../../components/Profile/ProfileCourses/ProfileCourseDetails/ProfileCoursesLives/ProfileCoursesLives";
import ProfileCoursesBooks from "../../../../../components/Profile/ProfileCourses/ProfileCourseDetails/ProfileCoursesBooks/ProfileCoursesBooks";
import ProfileCoursesExams from "../../../../../components/Profile/ProfileCourses/ProfileCourseDetails/ProfileCoursesExams/ProfileCoursesExams";

export default function EnhancedCourseDetailPage() {
  const [activeTab, setActiveTab] = useState("lessons");
  const [currentLesson, setCurrentLesson] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [animateProgress, setAnimateProgress] = useState(false);

  useEffect(() => {
    setAnimateProgress(true);
  }, []);

  // Mock course data
  const course = {
    id: 1,
    title: "Egyptian Arabic Courses",
    subtitle: "Master the Egyptian Dialect",
    description:
      "Learn the most widely understood Arabic dialect in the Middle East. Perfect for everyday conversations, movies, and cultural immersion.",
    image:
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800&h=400&fit=crop",
    progress: 65,
    totalLessons: 48,
    completedLessons: 31,
    duration: "12 weeks",
    level: "Intermediate",
    rating: 4.8,
    students: 1247,
    instructor: "Dr. Amira Hassan",
    nextLesson: "Shopping in Cairo",
    studyStreak: 7,
    weeklyGoal: 5,
    completedThisWeek: 3,
  };

  const lessons = [
    {
      id: 1,
      title: "Introduction to Egyptian Arabic",
      duration: "15 min",
      completed: true,
      type: "video",
      description: "Basic greetings and introductions",
      difficulty: "Beginner",
    },
    {
      id: 2,
      title: "Essential Phrases for Daily Life",
      duration: "22 min",
      completed: true,
      type: "video",
      description: "Common expressions and responses",
      difficulty: "Beginner",
    },
    {
      id: 3,
      title: "Numbers and Time",
      duration: "18 min",
      completed: true,
      type: "interactive",
      description: "Learn to count and tell time",
      difficulty: "Beginner",
    },
    {
      id: 32,
      title: "Shopping in Cairo",
      duration: "25 min",
      completed: false,
      type: "video",
      description: "Navigate markets and bargain effectively",
      current: true,
      difficulty: "Intermediate",
    },
    {
      id: 33,
      title: "Transportation Vocabulary",
      duration: "20 min",
      completed: false,
      type: "audio",
      description: "Buses, taxis, and metro system",
      difficulty: "Intermediate",
    },
    {
      id: 34,
      title: "Practice Quiz: Shopping",
      duration: "10 min",
      completed: false,
      type: "quiz",
      description: "Test your shopping vocabulary",
      difficulty: "Intermediate",
    },
  ];

  const liveClasses = [
    {
      id: 1,
      title: "Conversation Practice Session",
      instructor: "Dr. Amira Hassan",
      date: "Aug 22, 2025",
      time: "7:00 PM",
      duration: "60 min",
      participants: 15,
      maxParticipants: 20,
      status: "upcoming",
      topic: "Market Conversations",
      isPopular: true,
      joinUrl: "https://youtube.com/shorts/zqGYkj9ljOk?si=A64R9Z6wrzv8-htW",
    },
    {
      id: 2,
      title: "Egyptian Culture Deep Dive",
      instructor: "Prof. Yasmin El-Sharif",
      date: "Aug 25, 2025",
      time: "6:00 PM",
      duration: "90 min",
      participants: 8,
      maxParticipants: 15,
      status: "upcoming",
      topic: "Traditional Festivals",
      isPopular: false,
      joinUrl: "https://youtube.com/shorts/zqGYkj9ljOk?si=A64R9Z6wrzv8-htW",
    },
    {
      id: 3,
      title: "Pronunciation Workshop",
      instructor: "Dr. Amira Hassan",
      date: "Aug 19, 2025",
      time: "7:00 PM",
      duration: "45 min",
      participants: 18,
      maxParticipants: 20,
      status: "completed",
      topic: "Difficult Sounds",
      isPopular: false,
      recordingUrl: "/images/WhatsApp Video 2025-08-05 at 11.43.15 AM",
    },
  ];

  const books = [
    {
      id: 1,
      title: "Egyptian Arabic Grammar Guide",
      author: "Dr. Amira Hassan",
      pdfUrl: "",
      pages: 240,
      format: "PDF",
      size: "12.5 MB",
      progress: 45,
      chapters: 12,
      completedChapters: 5,
      category: "Grammar",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      rating: 4.9,
      lastRead: "2 days ago",
    },
    {
      id: 2,
      title: "Common Egyptian Phrases Handbook",
      author: "Prof. Omar Al-Rashid",
      pages: 180,
      format: "PDF",
      size: "8.2 MB",
      progress: 78,
      chapters: 8,
      completedChapters: 6,
      category: "Vocabulary",
      image:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
      rating: 4.7,
      lastRead: "Yesterday",
    },
    {
      id: 3,
      title: "Egyptian Culture & Traditions",
      author: "Dr. Nadia Farouk",
      pages: 320,
      format: "PDF",
      size: "18.7 MB",
      progress: 12,
      chapters: 15,
      completedChapters: 2,
      category: "Culture",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      rating: 4.8,
      lastRead: "1 week ago",
    },
  ];

  const exams = [
    {
      id: 1,
      title: "Mid-Course Assessment",
      type: "Comprehensive",
      questions: 50,
      duration: "90 min",
      attempts: 2,
      maxAttempts: 3,
      bestScore: 85,
      averageScore: 78,
      status: "completed",
      dueDate: "Aug 15, 2025",
      topics: ["Vocabulary", "Grammar", "Listening", "Speaking"],
      difficulty: "Intermediate",
    },
    {
      id: 2,
      title: "Vocabulary Quiz - Lessons 25-30",
      type: "Quiz",
      questions: 25,
      duration: "30 min",
      attempts: 1,
      maxAttempts: 2,
      bestScore: 92,
      averageScore: 84,
      status: "completed",
      dueDate: "Aug 20, 2025",
      topics: ["Vocabulary", "Pronunciation"],
      difficulty: "Beginner",
    },
    {
      id: 3,
      title: "Speaking Assessment",
      type: "Oral Exam",
      questions: 10,
      duration: "45 min",
      attempts: 0,
      maxAttempts: 2,
      bestScore: null,
      averageScore: 82,
      status: "available",
      dueDate: "Aug 30, 2025",
      topics: ["Speaking", "Pronunciation", "Conversation"],
      difficulty: "Intermediate",
    },
    {
      id: 4,
      title: "Final Course Examination",
      type: "Final Exam",
      questions: 75,
      duration: "120 min",
      attempts: 0,
      maxAttempts: 2,
      bestScore: null,
      averageScore: 79,
      status: "locked",
      dueDate: "Sep 15, 2025",
      topics: ["All Topics"],
      difficulty: "Advanced",
    },
  ];

  const tabs = [
    {
      id: "lessons",
      label: "Lessons",
      icon: PlayCircle,
      count: lessons.length,
    },
    {
      id: "lives",
      label: "Live Classes",
      icon: Video,
      count: liveClasses.filter((c) => c.status === "upcoming").length,
    },
    { id: "books", label: "Books", icon: BookOpen, count: books.length },
    {
      id: "exams",
      label: "Exams",
      icon: PenTool,
      count: exams.filter((e) => e.status === "available").length,
    },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-700 border-green-200";
      case "Intermediate":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Advanced":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "lessons":
        return <ProfileCourseLessons lessons={lessons} course={course} />;

      case "lives":
        return <ProfileCoursesLives liveClasses={liveClasses} />;

      case "books":
        return (
          <ProfileCoursesBooks
            animateProgress={animateProgress}
            books={books}
          />
        );

      case "exams":
        return (
          <ProfileCoursesExams
            getDifficultyColor={getDifficultyColor}
            exams={exams}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#02AAA0]/5 via-white to-[#C9AE6C]/5">
      {/* Enhanced Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#02AAA0]/90 via-[#02AAA0]/80 to-[#C9AE6C]/70"></div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-[#C9AE6C]/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/5 rounded-full blur-xl animate-pulse delay-500"></div>

        {/* Header Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-6">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
              <div className="flex-1">
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="inline-block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-bold border border-white/30">
                      {course.level} Level
                    </span>
                    <div className="flex items-center gap-2">
                      {/* <button 
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        className={`p-3 rounded-full backdrop-blur-sm border transition-all duration-300 ${
                          isBookmarked 
                            ? 'bg-red-500/20 border-red-400/50 text-red-200' 
                            : 'bg-white/10 border-white/30 text-white/80 hover:bg-white/20'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                      </button> */}
                      {/* <button className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 text-white/80 hover:bg-white/20 transition-all duration-300">
                        <Share2 className="w-5 h-5" />
                      </button> */}
                    </div>
                  </div>
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                  {course.title}
                </h1>
                <p className="text-2xl text-white/90 mb-6 font-medium">
                  {course.subtitle}
                </p>
                <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-2xl">
                  {course.description}
                </p>

                <div className="flex items-center gap-6 text-white/90">
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/20">
                    <Award className="w-6 h-6" />
                    <span className="font-semibold">{course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/20">
                    <Star className="w-6 h-6 fill-[#C9AE6C] text-[#C9AE6C]" />
                    <span className="font-semibold">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/20">
                    <Users className="w-6 h-6" />
                    <span className="font-semibold">
                      {course.students} students
                    </span>
                  </div>
                </div>
              </div>

              {/* Enhanced Progress Card */}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-10">
        {/* Enhanced Tabs Navigation */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl mb-12 overflow-hidden border border-white/50">
          <div className="flex">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-3 py-8 px-6 font-bold text-lg transition-all duration-500 relative overflow-hidden group ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-[#02AAA0] to-[#02AAA0]/90 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gradient-to-r hover:from-[#02AAA0]/5 hover:to-[#C9AE6C]/5 hover:text-[#02AAA0]"
                  }`}
                >
                  {activeTab === tab.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#C9AE6C]/20 to-transparent opacity-50"></div>
                  )}
                  <div className="relative z-10 flex items-center gap-3">
                    <IconComponent
                      className={`w-6 h-6 transition-all duration-300 ${
                        activeTab === tab.id
                          ? "scale-110"
                          : "group-hover:scale-105"
                      }`}
                    />
                    <span className="hidden sm:inline">{tab.label}</span>
                    {tab.count > 0 && (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold ${
                          activeTab === tab.id
                            ? "bg-white/20 text-white"
                            : "bg-[#02AAA0]/10 text-[#02AAA0] group-hover:bg-[#02AAA0]/20"
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-16">{renderTabContent()}</div>
      </div>

      {/* Enhanced Current Lesson Modal */}
      {currentLesson && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20 animate-in slide-in-from-bottom duration-500">
            <div className="p-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#02AAA0] to-[#02AAA0]/80 rounded-2xl flex items-center justify-center shadow-lg">
                    <Play className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-3xl font-black text-gray-800">
                    Ready to Learn?
                  </h2>
                </div>
                <button
                  onClick={() => setCurrentLesson(null)}
                  className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all duration-200 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {currentLesson.title}
                  </h3>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold border ${getDifficultyColor(
                      currentLesson.difficulty
                    )}`}
                  >
                    {currentLesson.difficulty}
                  </span>
                </div>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  {currentLesson.description}
                </p>

                <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center gap-3 bg-gradient-to-r from-[#02AAA0]/10 to-[#02AAA0]/5 rounded-2xl px-5 py-3 border border-[#02AAA0]/20">
                    <Clock className="w-5 h-5 text-[#02AAA0]" />
                    <span className="font-semibold text-gray-700">
                      {currentLesson.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-gradient-to-r from-[#C9AE6C]/10 to-[#C9AE6C]/5 rounded-2xl px-5 py-3 capitalize border border-[#C9AE6C]/20">
                    <Video className="w-5 h-5 text-[#C9AE6C]" />
                    <span className="font-semibold text-gray-700">
                      {currentLesson.type} Lesson
                    </span>
                  </div>
                </div>

                {/* Enhanced Lesson Preview Card */}
                <div className="bg-gradient-to-r from-[#02AAA0]/5 to-[#C9AE6C]/5 rounded-3xl p-8 mb-8 border border-[#02AAA0]/10">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-6 h-6 text-[#C9AE6C]" />
                    <span className="font-bold text-gray-800 text-lg">
                      What You'll Learn
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Master essential shopping vocabulary, learn bargaining
                    techniques, and practice real-world conversations in
                    Egyptian markets.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white/60 rounded-full text-sm font-medium text-gray-700 border">
                      Vocabulary Building
                    </span>
                    <span className="px-3 py-1 bg-white/60 rounded-full text-sm font-medium text-gray-700 border">
                      Cultural Context
                    </span>
                    <span className="px-3 py-1 bg-white/60 rounded-full text-sm font-medium text-gray-700 border">
                      Practical Conversation
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentLesson(null)}
                  className="flex-1 bg-gradient-to-r from-[#02AAA0] to-[#02AAA0]/90                  text-white px-6 py-3 rounded-2xl font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
                >
                  Start Learning
                </button>
                <button
                  onClick={() => setCurrentLesson(null)}
                  className="bg-transparent text-gray-600 border border-gray-300 hover:bg-gray-100 rounded-2xl px-6 py-3 font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
