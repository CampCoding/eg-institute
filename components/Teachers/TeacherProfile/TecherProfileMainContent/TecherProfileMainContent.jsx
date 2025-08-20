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
import TeacherProfileCertifications from "../TeacherProfileCertifications/TeacherProfileCertifications";
import TeacherReservationLessonModal from "../TeacherReservationLessonModal/TeacherReservationLessonModal";
import TeacherProfileTestimonial from "../TeacherProfileTestimonial/TeacherProfileTestimonial";
import TestimonialSection from "@/components/Home/TestimonialSection";

export default function TeacherProfileMainContent({ teacher }) {
  const [showVideo, setShowVideo] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [likedSubjects, setLikedSubjects] = useState(new Set());
  const [reservceLessson, setReserveLesson] = useState(false);

  const handleLikeSubject = (subjectId) => {
    const newLiked = new Set(likedSubjects);
    if (newLiked.has(subjectId)) {
      newLiked.delete(subjectId);
    } else {
      newLiked.add(subjectId);
    }
    setLikedSubjects(newLiked);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          {/* Contact Info */}
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50 overflow-hidden group">
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full blur-xl group-hover:scale-110 transition-transform duration-500"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Contact Information
                </h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-gray-50/70 rounded-2xl hover:bg-teal-50/70 transition-colors duration-300 group/item">
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover/item:scale-110 transition-transform duration-300">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      Phone
                    </p>
                    <p className="font-bold text-gray-900 text-lg">
                      {teacher.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 group/item">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover/item:scale-110 transition-transform duration-300">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-600 uppercase tracking-wide">
                      Next Available
                    </p>
                    <p className="font-bold text-green-700 text-lg flex items-center gap-2">
                      {teacher.availability.nextAvailable}
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button className="flex-1 bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 hover:scale-105 shadow-lg">
                  <MessageCircle className="w-4 h-4 inline mr-2" />
                  Message
                </button>
                <button className="bg-white border-2 border-teal-200 text-teal-600 p-3 rounded-xl hover:bg-teal-50 transition-all duration-300 hover:scale-105">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <TeacherProfileVideoIntroduction teacher={teacher} />
          <TeacherProfileCertifications teacher={teacher} />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50 overflow-hidden relative">
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-teal-400/10 to-cyan-400/10 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">
                  About {teacher.name.split(" ")[1]}
                </h3>
              </div>

              <p className="text-gray-700 leading-relaxed text-lg mb-8 font-medium">
                {teacher.fullBio}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group text-center p-8 bg-gradient-to-br from-teal-50 via-cyan-50 to-teal-100 rounded-3xl border border-teal-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-3xl font-black text-gray-900 mb-2">
                    {teacher.totalStudents}+
                  </h4>
                  <p className="text-teal-700 font-semibold">Happy Students</p>
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
                    {teacher.experienceYears}
                  </h4>
                  <p className="text-purple-700 font-semibold">
                    Years Experience
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

          {/* Subjects to Learn */}
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
                {teacher.subjects.length} courses available
              </div>
            </div>

            <div className="grid gap-6">
              {teacher.subjects.map((subject) => (
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
                  {/* Background decoration */}
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
                              <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-semibold">
                                {subject.level}
                              </span>
                              <span className="text-gray-500 text-sm">•</span>
                              <span className="text-gray-600 font-medium">
                                {subject.duration} minutes
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                          {subject.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-6">
                            <div className="flex items-center gap-2">
                              <Clock className="w-5 h-5 text-gray-500" />
                              <span className="text-gray-700 font-medium">
                                {subject.duration} min session
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-4xl font-black text-teal-600">
                                ${subject.price}
                              </span>
                              <span className="text-gray-600 font-medium">
                                per lesson
                              </span>
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 rounded-3xl p-12 text-white text-center shadow-2xl overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-20 -translate-y-20 animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-16 translate-y-16 animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white/5 rounded-full -translate-x-12 -translate-y-12 animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
                <Zap className="w-5 h-5 text-yellow-300" />
                <span className="font-semibold">Start Your Journey Today</span>
              </div>

              <h3 className="text-4xl font-black mb-4">
                Ready to Master Arabic?
              </h3>
              <p className="text-2xl text-teal-100 mb-8 max-w-2xl mx-auto">
                Join thousands of successful students and book your personalized
                lesson with {teacher.name.split(" ")[1]} today!
              </p>

              <div className="flex items-center justify-center gap-6 mb-8">
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-2xl">
                  <p className="text-sm text-teal-200">Next Available</p>
                  <p className="font-bold text-lg">
                    {teacher.availability.nextAvailable}
                  </p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-2xl">
                  <p className="text-sm text-teal-200">Starting From</p>
                  <p className="font-bold text-lg">
                    ${Math.min(...teacher.subjects.map((s) => s.price))}/lesson
                  </p>
                </div>
              </div>

              <button
                onClick={() => setReserveLesson(true)}
                className="bg-white text-teal-700 px-16 py-5 rounded-3xl font-black text-2xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-2xl inline-flex items-center gap-4 group"
              >
                <Calendar className="w-8 h-8" />
                Reserve Your Lesson Now
                <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform duration-300" />
              </button>

              <p className="text-teal-200 mt-6 text-lg">
                ✨ Free cancellation up to 24 hours before your lesson
              </p>
            </div>
          </div>
        </div>
      </div>

      <TeacherProfileTestimonial />

      {showVideo && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
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

      <TeacherReservationLessonModal
        data={teacher}
        open={reservceLessson}
        setOpen={setReserveLesson}
      />

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
  );
}
