import {
  CheckCircle,
  Clock,
  Play,
  Search,
  X,
  ChevronDown,
  ChevronUp,
  PlayCircle,
  FileQuestion,
  Target,
  Code,
} from "lucide-react";
import React, { useState } from "react";

export default function CourseVideosSidebar({
  sidebarCollapsed,
  setSidebarCollapsed,
  setSearchQuery,
  searchQuery,
  filteredContent,
  onVideoSelect,
  handleVideoSelect,
  selectedVideo,
}) {
  const [openSections, setOpenSections] = useState({});
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const LessonIcon = ({ lesson }) => {
    if (lesson.type === "quiz") return <FileQuestion className="w-4 h-4" />;
    if (lesson.type === "challenge") return <Target className="w-4 h-4" />;
    if (lesson.type === "code") return <Code className="w-4 h-4" />;
    return <PlayCircle className="w-4 h-4" />;
  };

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div
      className={`h-full lg:col-span-3  w-full bg-white border-l border-gray-200 shadow-xl transition-all duration-300 overflow-hidden z-40`}
    >
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
            <div
              className="bg-white h-2 rounded-full transition-all"
              style={{ width: "68%" }}
            ></div>
          </div>
        </div>
      </div>

      <div className="overflow-y-auto h-full pb-20">
        {filteredContent.map((section, sectionIdx) => {
          const isOpen = openSections[sectionIdx] ?? true;
          const completedLessons = section.lessons.filter(
            (l) => l.completed
          ).length;
          const totalLessons = section.lessons.length;
          const sectionProgress = (completedLessons / totalLessons) * 100;

          return (
            <div key={sectionIdx} className="mb-1">
              <button
                onClick={() => toggleSection(sectionIdx)}
                className="w-full flex justify-between items-center px-6 py-4 bg-gray-50 hover:bg-gray-100 text-left transition-colors"
              >
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {section.title}
                  </h4>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                    <span>
                      {completedLessons}/{totalLessons} lessons
                    </span>
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
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </button>

              {isOpen && (
                <div>
                  {section.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => handleVideoSelect(lesson)}
                      className={`w-full text-left border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 p-4 flex items-center space-x-4 transition-all ${
                        selectedVideo?.id == lesson?.id
                          ? "bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-l-blue-600"
                          : ""
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                          lesson.completed
                            ? "bg-green-600 text-white"
                            : selectedVideo?.id == lesson?.id
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {lesson.completed ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <LessonIcon lesson={lesson} />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4
                          className={`font-medium text-sm mb-1 ${
                            selectedVideo?.id == lesson?.id
                              ? "text-blue-600"
                              : "text-gray-900"
                          }`}
                        >
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
    </div>
  );
}
