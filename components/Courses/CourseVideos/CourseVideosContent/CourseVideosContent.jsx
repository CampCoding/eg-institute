"use client";
import {
  ArrowDownToLine,
  Award,
  BookOpen,
  Clock,
  Code,
  FileQuestion,
  FileText,
  Globe,
  MessageCircle,
  PlayCircle,
  Star,
  Target,
  Zap,
} from "lucide-react";
import React, { useState } from "react";
import ReactPlayer from "react-player";

export default function CourseVideosContent({
  sidebarCollapsed,
  selectedVideo,
  courseContent,
  notes,
}) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(80);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const tabs = [
    { name: "Overview", icon: BookOpen },
    { name: "Q&A", icon: MessageCircle, count: 24 },
    { name: "Notes", icon: FileText, count: notes.length },
    { name: "Announcements", icon: Globe, count: 3 },
    { name: "Reviews", icon: Star, count: 156 },
    { name: "Learning tools", icon: Zap },
  ];

  const LessonIcon = ({ lesson }) => {
    if (lesson.type === "quiz") return <FileQuestion className="w-4 h-4" />;
    if (lesson.type === "challenge") return <Target className="w-4 h-4" />;
    if (lesson.type === "code") return <Code className="w-4 h-4" />;
    return <PlayCircle className="w-4 h-4" />;
  };

  return (
    <div
      className={`w-full lg:col-span-9 transition-all duration-300 ${
        sidebarCollapsed ? "mr-0" : "mr-96"
      }`}
    >
      {/* Video Player */}
      <div className="relative bg-black aspect-video">
        {selectedVideo ? (
          <ReactPlayer
            width={"100%"}
            src={selectedVideo.videoUrl}
            controls
            volume={isMuted ? 0 : volume / 100}
            playbackRate={playbackSpeed}
            style={{ width: "100%", height: "100%" }}
            className="react-player !w-full !h-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-white">
              <PlayCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg">Select a lesson to start learning</p>
            </div>
          </div>
        )}
      </div>

      {/* Video Info and Resources */}
      {selectedVideo && (
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedVideo.title}
              </h2>
              <p className="text-gray-600 mb-4">{selectedVideo.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{selectedVideo.duration}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <LessonIcon lesson={selectedVideo} />
                  <span className="capitalize">{selectedVideo.type}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Resources */}
          <ul className="space-y-2">
            {selectedVideo?.resources?.map((res, i) => (
              <li key={i} className="flex  justify-between items-center group">
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>{res.label}</span>
                </a>
                <a
                  href={res.url}
                  download
                  className="opacity-1 bg-primary shadow-lg p-2 rounded-lg group-hover:opacity-100 transition-opacity"
                  title="Download file"
                >
                  <ArrowDownToLine className="w-5 h-5 text-white hover:text-white" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.name
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
              {tab.count && (
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white p-6">
        {activeTab === "Overview" && (
          <div className="max-w-4xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Course Overview
            </h3>
            <p className="text-gray-600 mb-6">
              Master React from the ground up with this comprehensive course.
              Learn modern React patterns, hooks, state management, and build
              real-world applications.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-gray-900">Lessons</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  {courseContent.reduce(
                    (acc, section) => acc + section.lessons.length,
                    0
                  )}
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-gray-900">Duration</span>
                </div>
                <p className="text-2xl font-bold text-green-600">2h 5min</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-gray-900">
                    Certificate
                  </span>
                </div>
                <p className="text-2xl font-bold text-purple-600">Yes</p>
              </div>
            </div>
          </div>
        )}
        {activeTab === "Notes" && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">My Notes</h3>
            <p className="text-gray-600">
              Your notes will appear here as you take them during the course.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
