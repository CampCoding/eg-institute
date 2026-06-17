// components/TeacherProfileMainContent/TeacherProfileMainContent.js
"use client";
import {
  Award,
  BookOpen,
  Calendar,
  Clock,
  Globe,
  Phone,
  PlayCircle,
  Star,
  Users,
  MessageCircle,
  Video,
  Download,
  CheckCircle,
  ArrowRight,
  Zap,
  TrendingUp,
  Heart,
  Share2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import TeacherProfileVideoIntroduction from "../TeacherProfileVideoIntroduction/TeacherProfileVideoIntroduction";
import TeacherReservationLessonModal from "../TeacherReservationLessonModal/TeacherReservationLessonModal";

export default function TeacherProfileMainContent({ teacher }) {
  const [showVideo, setShowVideo] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [likedSubjects, setLikedSubjects] = useState(new Set());
  const [reserveLesson, setReserveLesson] = useState(false);

  const handleLikeSubject = (subjectId) => {
    const newLiked = new Set(likedSubjects);
    if (newLiked.has(subjectId)) {
      newLiked.delete(subjectId);
    } else {
      newLiked.add(subjectId);
    }
    setLikedSubjects(newLiked);
  };

  const handleReservationConfirm = (reservationData) => {
    console.log("Lesson reserved:", reservationData);
    // Handle the reservation logic here
    // You can make an API call to book the lesson

    // Example API call:
    // const bookLesson = async () => {
    //   try {
    //     const response = await fetch('/api/book-lesson', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({
    //         teacher_id: teacher.id,
    //         date: reservationData.date,
    //         time: reservationData.time,
    //         timezone: reservationData.timezone
    //       })
    //     });
    //     const result = await response.json();
    //     if (result.success) {
    //       alert('Lesson booked successfully!');
    //     }
    //   } catch (error) {
    //     console.error('Error booking lesson:', error);
    //   }
    // };
    // bookLesson();

    alert(
      `Lesson reserved for ${reservationData.date} at ${reservationData.time}`
    );
  };

  if (!teacher) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading teacher profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-16">
      <div className="container mx-auto flex flex-col gap-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <TeacherProfileVideoIntroduction teacher={teacher} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50 overflow-hidden relative h-full">
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-teal-400/10 to-cyan-400/10 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">
                    About {teacher.name?.split(" ")[1] || teacher.name}
                  </h3>
                </div>

                <p className="text-gray-700 leading-relaxed text-lg mb-8 font-medium">
                  {teacher.fullBio}
                </p>

                {/* Languages */}
                {teacher.languages && teacher.languages.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">
                      Languages
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {teacher.languages.map((language, index) => (
                        <span
                          key={index}
                          className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full font-semibold"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="group text-center p-8 bg-gradient-to-br from-teal-50 via-cyan-50 to-teal-100 rounded-3xl border border-teal-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-3xl font-black text-gray-900 mb-2">
                      {teacher.totalStudents}+
                    </h4>
                    <p className="text-teal-700 font-semibold">
                      Happy Students
                    </p>
                    <div className="mt-2 flex items-center justify-center gap-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600 font-medium">
                        Growing
                      </span>
                    </div>
                  </div>

                  <div className="group text-center p-8 bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 rounded-3xl border border-yellow-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Star className="w-10 h-10 text-white fill-current" />
                    </div>
                    <h4 className="text-3xl font-black text-gray-900 mb-2">
                      {teacher.rating}
                    </h4>
                    <p className="text-orange-700 font-semibold">
                      Average Rating
                    </p>
                    <div className="mt-2 flex items-center justify-center gap-1">
                      <span className="text-sm text-orange-600 font-medium">
                        ({teacher.totalReviews} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="group text-center p-8 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 rounded-3xl border border-purple-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Award className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-3xl font-black text-gray-900 mb-2">
                      {teacher.classCount || "50"}+
                    </h4>
                    <p className="text-purple-700 font-semibold">
                      Classes Taught
                    </p>
                    <div className="mt-2 flex items-center justify-center gap-1">
                      <Zap className="w-4 h-4 text-purple-500" />
                      <span className="text-sm text-purple-600 font-medium">
                        Expert
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subjects Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50">
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">
                Available Subjects
              </h3>
            </div>
            <div className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
              {teacher.subjects?.length || 0} courses available
            </div>
          </div>

          <div className="grid gap-6">
            {teacher.subjects?.map((subject) => (
              <div
                key={subject.id}
                className={`group relative p-8 rounded-3xl border-2 transition-all duration-500 cursor-pointer overflow-hidden ${
                  selectedSubject === subject.id
                    ? "border-teal-500 bg-gradient-to-r from-teal-50 to-cyan-50 shadow-lg scale-[1.02]"
                    : "border-gray-200 hover:border-teal-300 hover:bg-gray-50 hover:shadow-md"
                }`}
                onClick={() =>
                  setSelectedSubject(
                    selectedSubject === subject.id ? null : subject.id
                  )
                }
              >
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-teal-400/10 to-cyan-400/10 rounded-full blur-xl group-hover:scale-110 transition-transform duration-500"></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap sm:flex-nowrap items-center gap-6 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <BookOpen className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h4 className="text-2xl font-bold text-gray-900 group-hover:text-teal-700 transition-colors duration-300">
                            {subject.name}
                          </h4>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 mt-1">
                            <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-semibold capitalize">
                              {subject.level}
                            </span>
                            <span className="text-gray-500 text-sm">•</span>
                            <span className="text-gray-600 font-medium">
                              {subject.lessons} lessons
                            </span>
                            <span className="text-gray-500 text-sm">•</span>
                            <span className="text-gray-600 font-medium">
                              {subject.duration} minutes per session
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                        {subject.description}
                      </p>

                      {/* Show additional details when expanded */}
                      {selectedSubject === subject.id && (
                        <div className="mt-6 space-y-4">
                          {subject.willLearn &&
                            subject.willLearn.length > 0 && (
                              <div>
                                <h5 className="font-bold text-gray-900 mb-2">
                                  What you'll learn:
                                </h5>
                                <ul className="space-y-1">
                                  {subject.willLearn.map((item, index) => (
                                    <li
                                      key={index}
                                      className="flex items-center gap-2"
                                    >
                                      <CheckCircle className="w-4 h-4 text-green-500" />
                                      <span className="text-gray-700">
                                        {item}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                          {subject.features && subject.features.length > 0 && (
                            <div>
                              <h5 className="font-bold text-gray-900 mb-2">
                                Course features:
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {subject.features.map((feature, index) => (
                                  <span
                                    key={index}
                                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                  >
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-6">
                        <div className="flex flex-wrap sm:flex-nowrap items-center gap-6">
                          <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-gray-500" />
                            <span className="text-gray-700 font-medium">
                              {subject.duration} min session
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <span className="text-2xl font-black text-teal-600">
                                ${subject.privatePrice}
                              </span>
                              <p className="text-xs text-gray-600">Private</p>
                            </div>
                            <div className="text-center">
                              <span className="text-2xl font-black text-purple-600">
                                ${subject.groupPrice}
                              </span>
                              <p className="text-xs text-gray-600">Group</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLikeSubject(subject.id);
                            }}
                            className={`p-3 rounded-xl transition-all duration-300 ${
                              likedSubjects.has(subject.id)
                                ? "bg-red-100 text-red-600 hover:bg-red-200"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            <Heart
                              className={`w-5 h-5 ${
                                likedSubjects.has(subject.id)
                                  ? "fill-current"
                                  : ""
                              }`}
                            />
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setReserveLesson(true);
                            }}
                            className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
                          >
                            <Calendar className="w-5 h-5" />
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Modal */}
        {showVideo && (
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[9999] !m-0 p-4 animate-fade-in"
            onClick={() => setShowVideo(false)}
          >
            <div
              className="bg-white rounded-3xl p-8 max-w-5xl w-full shadow-2xl transform animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">
                    Meet Your Teacher
                  </h3>
                  <p className="text-gray-600">
                    Personal introduction from {teacher.name}
                  </p>
                </div>
                <button
                  onClick={() => setShowVideo(false)}
                  className="text-gray-500 hover:text-gray-700 text-3xl w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  ×
                </button>
              </div>
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl flex items-center justify-center shadow-inner">
                <div className="text-center text-white">
                  <PlayCircle className="w-20 h-20 mx-auto mb-4 opacity-50" />
                  <p className="text-xl font-semibold">
                    Video Player Integration
                  </p>
                  <p className="text-gray-400">
                    Connect your preferred video service here
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes scale-in {
            from {
              transform: scale(0.9);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out;
          }
          .animate-scale-in {
            animation: scale-in 0.3s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
}
