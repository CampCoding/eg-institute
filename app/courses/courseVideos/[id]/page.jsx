"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Settings,
  Maximize,
  Minimize,
  CheckCircle,
  Clock,
  FileText,
  Download,
  ChevronDown,
  ChevronUp,
  Star,
  Award,
  Share2,
  BookOpen,
  Users,
  Globe,
  Zap,
  Heart,
  MessageCircle,
  Search,
  Menu,
  X,
  SkipBack,
  SkipForward,
  MoreVertical,
  Bookmark,
  PlayCircle,
  Trophy,
  Target,
  Code,
  FileQuestion,
  RotateCcw,
  FastForward,
  ArrowDownToLine,
  Lock,
} from "lucide-react";

import CourseVideosSidebar from "@/components/Courses/CourseVideos/CourseVideosSidebar/CourseVideosSidebar";
import CourseVideosContent from "@/components/Courses/CourseVideos/CourseVideosContent/CourseVideosContent";
import CoursesEnroll from "@/components/Courses/CourseVideos/CoursesEnroll/CoursesEnroll";
import { useParams } from "next/navigation";

const courseContent = [
  {
    title: "Modern Standard Arabic (Fusha)",
    duration: "1h 10min",
    lessons: 4,
    completed: 1,
    lessons: [
      {
        id: 1,
        title: "Introduction to Fusha Arabic",
        duration: "10min",
        durationInSec: 600,
        completed: true,
        type: "video",
        videoUrl: "/videos/fusha-intro.mp4",
        description:
          "An overview of the importance and use of Modern Standard Arabic.",
        resources: [
          { label: "Slide Deck", url: "/resources/fusha-slides.pdf" },
        ],
      },
      {
        id: 2,
        title: "Grammar and Eloquence",
        duration: "20min",
        durationInSec: 1200,
        completed: false,
        type: "video",
        videoUrl: "/videos/fusha-grammar.mp4",
        description: "Basic principles of Arabic grammar and stylistics.",
      },
      {
        id: 3,
        title: "Correct Spelling",
        duration: "15min",
        durationInSec: 900,
        completed: false,
        type: "challenge",
        videoUrl: "/videos/fusha-spelling.mp4",
        description: "Spelling challenge to improve your writing skills.",
      },
      {
        id: 4,
        title: "Classical Texts",
        duration: "25min",
        durationInSec: 1500,
        completed: false,
        type: "quiz",
        description:
          "A quiz to assess your understanding of classical Arabic texts.",
      },
    ],
  },
  {
    title: "Colloquial Arabic (Ammiya)",
    duration: "55min",
    lessons: 3,
    completed: 0,
    lessons: [
      {
        id: 5,
        title: "Introduction to Egyptian Ammiya",
        duration: "15min",
        durationInSec: 900,
        completed: false,
        type: "video",
        videoUrl: "/videos/ammiya-intro.mp4",
        description:
          "Key differences between Fusha and Ammiya, and the basics of Egyptian dialect.",
      },
      {
        id: 6,
        title: "Daily Life Expressions",
        duration: "20min",
        durationInSec: 1200,
        completed: false,
        type: "video",
        videoUrl: "/videos/ammiya-daily.mp4",
        description:
          "Learn how to speak in daily life using common colloquial expressions.",
        resources: [
          { label: "Expression List", url: "/resources/ammiya-daily.pdf" },
        ],
      },
      {
        id: 7,
        title: "Dialect Challenge",
        duration: "20min",
        durationInSec: 1200,
        completed: false,
        type: "quiz",
        description:
          "Test your ability to understand and distinguish colloquial dialects.",
      },
    ],
  },
];

const UdemyCourseInterface = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(420);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [openSections, setOpenSections] = useState({ 0: true, 1: true });
  const [notes, setNotes] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const user = null;
  const [bookmarks, setBookmarks] = useState([]);
  const videoRef = useRef(null);
  const params = useParams();

  useEffect(() => {
    let interval;
    if (isPlaying && selectedVideo) {
      interval = setInterval(() => {
        setCurrentTime((prev) => (prev < duration ? prev + 1 : prev));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, selectedVideo]);

  useEffect(() => {
    if (selectedVideo?.durationInSec) {
      setDuration(selectedVideo.durationInSec);
      setCurrentTime(0);
    }
  }, [selectedVideo]);

  const handleVideoSelect = (lesson) => {
    setSelectedVideo(lesson);
    setIsPlaying(false);
  };

  const filteredContent = courseContent
    .map((section) => ({
      ...section,
      lessons: section.lessons.filter((lesson) =>
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((section) => section.lessons.length > 0);

  // Set initial video if none selected
  useEffect(() => {
    if (!selectedVideo) {
      const currentLesson = courseContent
        .flatMap((section) => section.lessons)
        .find((lesson) => lesson.current);
      if (currentLesson) {
        setSelectedVideo(currentLesson);
      }
    }
  }, []);

  if (!isEnrolled) {
    return (
      <CoursesEnroll
        isEnrolled={isEnrolled}
        setIsEnrolled={setIsEnrolled}
        params={params}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Modern Standard Arabic (Fusha)
              </h1>
              <p className="text-sm text-gray-600">
                by John Doe • 4.8 ⭐ (12,450 students)
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <a
              download
              href="/images/assets_pdfs_Student Handbook for ITI Programs.pdf"
              className="flex bg-[#02aa9f25] text-primary items-center  px-3 py-1 rounded-full text-sm font-medium gap-2"
            >
              <p className="cursor-pointer">Pdf</p>
              <FileText className="w-4 h-4 mr-1" />
            </a>

            <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              <Trophy className="w-4 h-4 mr-1" />
              68% Complete
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12">
        {/* Main Content */}
        <CourseVideosContent
          sidebarCollapsed={sidebarCollapsed}
          courseContent={courseContent}
          notes={notes}
          selectedVideo={selectedVideo}
        />

        {/* Sidebar */}
        <CourseVideosSidebar
          filteredContent={filteredContent}
          handleVideoSelect={handleVideoSelect}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedVideo={selectedVideo}
          setSidebarCollapsed={setSidebarCollapsed}
          sidebarCollapsed={sidebarCollapsed}
        />
        {/* <div className={`h-full lg:col-span-3  w-full bg-white border-l border-gray-200 shadow-xl transition-all duration-300 overflow-hidden z-40`}>
          <div className=" bg-white p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Course Content</h3>
              <button
                onClick={() => setSidebarCollapsed(true)}
                className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search lessons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-lg mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm">68%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full transition-all" style={{ width: '68%' }}></div>
              </div>
            </div>
          </div>

          <div className="overflow-y-auto h-full pb-20">
            {filteredContent.map((section, sectionIdx) => {
              const isOpen = openSections[sectionIdx] ?? true;
              const completedLessons = section.lessons.filter(l => l.completed).length;
              const totalLessons = section.lessons.length;
              const sectionProgress = (completedLessons / totalLessons) * 100;

              return (
                <div key={sectionIdx} className="mb-1">
                  <button
                    onClick={() => toggleSection(sectionIdx)}
                    className="w-full flex justify-between items-center px-6 py-4 bg-gray-50 hover:bg-gray-100 text-left transition-colors"
                  >
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{section.title}</h4>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                        <span>{completedLessons}/{totalLessons} lessons</span>
                        <span>•</span>
                        <span>{section.duration}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                        <div
                          className="bg-green-600 h-1 rounded-full transition-all"
                          style={{ width: `${sectionProgress}%` }}
                        ></div>
                      </div>
                    </div>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>

                  {isOpen && (
                    <div>
                      {section.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => handleVideoSelect(lesson)}
                          className={`w-full text-left border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 p-4 flex items-center space-x-4 transition-all ${
                            selectedVideo?.id == lesson?.id ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-l-blue-600' : ''
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                            lesson.completed
                              ? 'bg-green-600 text-white'
                              : selectedVideo?.id == lesson?.id
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}>
                            {lesson.completed ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <LessonIcon lesson={lesson} />
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className={`font-medium text-sm mb-1 ${
                              selectedVideo?.id == lesson?.id ? 'text-blue-600' : 'text-gray-900'
                            }`}>
                              {lesson.title}
                            </h4>
                            <div className="flex items-center space-x-3 text-xs text-gray-500">
                              <span className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{lesson.duration}</span>
                              </span>
                              <span className="capitalize">{lesson.type}</span>
                            </div>
                          </div>
                          
                          {selectedVideo?.id == lesson?.id && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse flex-shrink-0"></div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default UdemyCourseInterface;
