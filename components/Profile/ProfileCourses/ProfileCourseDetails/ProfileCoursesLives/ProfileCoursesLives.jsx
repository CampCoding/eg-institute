"use client";
import { Modal } from "antd";
import {
  ArrowRight,
  Award,
  Calendar,
  Clock,
  Flame,
  Play,
  Target,
  Users,
  Video,
} from "lucide-react";
import React, { useEffect, useState, useCallback , useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleGetAllCourseQuizs } from "../../../../../libs/features/profile";
import { useSearchParams } from "next/navigation";

function safeParse(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch {
    return null;
  }
}

export default function ProfileCoursesLives({ liveClasses }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recordingSrc, setRecordingSrc] = useState(null);

   const dispatch = useDispatch();
    const { all_course_quizes_loading, all_course_quizes_list } = useSelector(state => state?.profile)
    
    const searchParams = useSearchParams()
      const group_id = searchParams.get("group_id");

      const adminData = useMemo(() => {
        if (typeof window === "undefined") return null;
    
        const raw =
          localStorage.getItem("eg_user_data") ||
          sessionStorage.getItem("eg_user_data");
    
          console.log("raw")
    
        if (!raw) return null;
  
        return safeParse(raw) || null;
      }, []);
    
      const student_id = adminData?.student_id;
  
    useEffect(() => {
      dispatch(handleGetAllCourseQuizs({
        data: {
          group_id,
          student_id ,
        }
      }))
    }, [dispatch, group_id, student_id])
    

  const isExternal = (url) => /^https?:\/\//i.test(url);

  const handleOpenExternal = (url) => {
    if (!url) {
      alert("No link available yet. Please check back later.");
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const openRecordingModal = (url) => {
    if (!url) {
      alert("Recording not available yet.");
      return;
    }
    setRecordingSrc(url);
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    // give a tiny delay to let modal unmount before clearing src (avoids brief audio blip)
    setTimeout(() => setRecordingSrc(null), 50);
  }, []);

  // close on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && isModalOpen && closeModal();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isModalOpen, closeModal]);

  const handleAction = (liveClass) => {
    if (liveClass.status === "upcoming" || liveClass.status === "live") {
      handleOpenExternal(liveClass.joinUrl);
    } else {
      openRecordingModal(liveClass.recordingUrl);
    }
  };

  const isFull = (lc) => lc.participants >= lc.maxParticipants;

  // Helpers to detect embeddable provider
  const isYouTube = (u) => /youtube\.com\/watch\?v=|youtu\.be\//i.test(u || "");
  const toYouTubeEmbed = (u) => {
    if (!u) return null;
    const idMatch = u.match(/v=([^&]+)/) || u.match(/youtu\.be\/([^?&]+)/);
    return idMatch ? `https://www.youtube.com/embed/${idMatch[1]}` : null;
  };
  const isVimeo = (u) => /vimeo\.com\/\d+/.test(u || "");
  const toVimeoEmbed = (u) => {
    const idMatch = u?.match(/vimeo\.com\/(\d+)/);
    return idMatch ? `https://player.vimeo.com/video/${idMatch[1]}` : null;
  };
  const isMP4 = (u) => /\.mp4($|\?)/i.test(u || "");

  return (
    <>
      <div className="space-y-8">
        {liveClasses.map((liveClass) => (
          <div
            key={liveClass.id}
            className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-transparent hover:border-[#02AAA0]/30 overflow-hidden"
          >
            <div className="p-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#02AAA0] to-[#02AAA0]/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Video className="w-7 h-7 text-white" />
                      </div>
                      {liveClass.isPopular && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center">
                          <Flame className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-gray-800 group-hover:text-[#02AAA0] transition-colors duration-300">
                          {liveClass.title}
                        </h3>
                        {liveClass.isPopular && (
                          <span className="px-3 py-1 bg-gradient-to-r from-red-100 to-red-200 text-red-700 text-xs font-bold rounded-full border border-red-300">
                            POPULAR
                          </span>
                        )}
                      </div>
                      <span
                        className={`inline-block px-4 py-1 rounded-full text-sm font-bold ${
                          liveClass.status === "upcoming" ||
                          liveClass.status === "live"
                            ? "bg-gradient-to-r from-[#02AAA0]/10 to-[#02AAA0]/20 text-[#02AAA0] border border-[#02AAA0]/30"
                            : "bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-700 border border-emerald-300"
                        }`}
                      >
                        {liveClass.status.charAt(0).toUpperCase() +
                          liveClass.status.slice(1) || "Status"}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-[#C9AE6C]/10 to-[#C9AE6C]/5 rounded-2xl p-5 mb-6 border border-[#C9AE6C]/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-[#C9AE6C]" />
                      <span className="font-semibold text-[#C9AE6C]">
                        Topic Focus
                      </span>
                    </div>
                    <p className="text-gray-700 font-medium text-lg">
                      {liveClass.topic}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                      <Calendar className="w-5 h-5 text-[#02AAA0]" />
                      <div>
                        <div className="font-bold text-gray-800">
                          {liveClass.date}
                        </div>
                        <div className="text-gray-500">{liveClass.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                      <Clock className="w-5 h-5 text-[#C9AE6C]" />
                      <div>
                        <div className="font-bold text-gray-800">
                          {liveClass.duration}
                        </div>
                        <div className="text-gray-500">Duration</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                      <Users className="w-5 h-5 text-[#02AAA0]" />
                      <div>
                        <div className="font-bold text-gray-800">
                          {liveClass.participants}/{liveClass.maxParticipants}
                        </div>
                        <div className="text-gray-500">Joined</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                      <Award className="w-5 h-5 text-[#C9AE6C]" />
                      <div>
                        <div className="font-bold text-gray-800">
                          {liveClass.instructor?.split(" ")[1] ||
                            liveClass.instructor}
                        </div>
                        <div className="text-gray-500">Instructor</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 min-w-64">
                  <button
                    onClick={() => handleAction(liveClass)}
                    disabled={
                      (liveClass.status === "upcoming" ||
                        liveClass.status === "live") &&
                      isFull(liveClass)
                    }
                    className={`px-8 py-4 rounded-2xl font-bold shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3
                      ${
                        liveClass.status === "upcoming" ||
                        liveClass.status === "live"
                          ? "bg-gradient-to-r from-[#02AAA0] to-[#02AAA0]/90 text-white hover:shadow-2xl disabled:opacity-60 disabled:cursor-not-allowed"
                          : "bg-gradient-to-r from-[#C9AE6C] to-[#C9AE6C]/90 text-white hover:shadow-xl"
                      }`}
                    aria-label={
                      liveClass.status === "upcoming" ||
                      liveClass.status === "live"
                        ? "Join live class"
                        : "Watch recording"
                    }
                  >
                    {liveClass.status === "upcoming" ||
                    liveClass.status === "live" ? (
                      <>
                        <Video className="w-5 h-5" />
                        Join Live Class
                        <ArrowRight className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5" />
                        Watch Recording
                      </>
                    )}
                  </button>

                  {/* Capacity Progress */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-gray-700">
                        Class Capacity
                      </span>
                      <span className="text-sm text-[#02AAA0] font-bold">
                        {Math.round(
                          (liveClass.participants / liveClass.maxParticipants) *
                            100
                        )}
                        %
                      </span>
                    </div>
                    <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#02AAA0] to-[#C9AE6C] h-3 rounded-full transition-all duration-700 shadow-sm"
                        style={{
                          width: `${
                            (liveClass.participants /
                              liveClass.maxParticipants) *
                            100
                          }%`,
                        }}
                      />
                      {liveClass.participants / liveClass.maxParticipants >
                        0.8 && (
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-400/20 animate-pulse" />
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 text-center">
                      {Math.max(
                        liveClass.maxParticipants - liveClass.participants,
                        0
                      )}{" "}
                      spots remaining
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recording Modal */}
      {/* {isModalOpen && (
        <div
          className="fixed inset-0 !z-[99999999] flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h4 className="text-lg font-semibold">Class Recording</h4>
              <button
                onClick={closeModal}
                className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                Close
              </button>
            </div>

            <div className="aspect-video w-full bg-black">
              {recordingSrc && (isYouTube(recordingSrc) || isVimeo(recordingSrc)) ? (
                <iframe
                  key={recordingSrc}
                  src={
                    isYouTube(recordingSrc)
                      ? toYouTubeEmbed(recordingSrc)
                      : toVimeoEmbed(recordingSrc)
                  }
                  title="Recording"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : isMP4(recordingSrc) ? (
                <video
                  key={recordingSrc}
                  className="w-full h-full"
                  controls
                  playsInline
                  preload="metadata"
                >
                  <source src={recordingSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  Unable to preview this recording type.
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t text-sm text-gray-500">
              Press <span className="font-semibold">Esc</span> or click outside to close.
            </div>
          </div>
        </div>
      )} */}
      <Modal
        open={isModalOpen}
        width={800}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <div
          className="w-full max-w-5xl bg-white mt-5 rounded-2xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="aspect-video w-full bg-black">
            {recordingSrc &&
            (isYouTube(recordingSrc) || isVimeo(recordingSrc)) ? (
              <iframe
                key={recordingSrc}
                src={
                  isYouTube(recordingSrc)
                    ? toYouTubeEmbed(recordingSrc)
                    : toVimeoEmbed(recordingSrc)
                }
                title="Recording"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : isMP4(recordingSrc) ? (
              <video
                key={recordingSrc}
                className="w-full h-full"
                controls
                playsInline
                preload="metadata"
              >
                <source src={recordingSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                Unable to preview this recording type.
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
