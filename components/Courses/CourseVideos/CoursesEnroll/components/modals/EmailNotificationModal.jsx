"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  X,
  ArrowLeft,
  Mail,
  CheckCircle,
  CheckSquare,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  handleMakeStudentSchedule,
  handleGetAllStudentSchedules,
} from "@/libs/features/coursesSlice";
import { handleReserveMeeting } from "@/libs/features/meetingSlice";
import { toISODate, toHHMM } from "../../utils/helpers";

export default function EmailNotificationModal({
  isOpen,
  onClose,
  onBack,
  courseData,
  userAnswers,
  selectedClassType,
  selectedSchedules,
  selectedTeacher,
  selectedGroup,
  placementTestMeeting, // ✅ بيانات الـ placement test
}) {
  const dispatch = useDispatch();
  const { make_schedule_loading } = useSelector((state) => state?.courses);

  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const storedEmail =
      JSON.parse(localStorage.getItem("eg_user_data"))?.student_email || "";
    setEmail(storedEmail);
  }, [isOpen]);

  const handleClose = () => {
    setEmail("");
    setIsSubmitted(false);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setIsSubmitted(false);
    }
  }, [isOpen]);

  if (!isOpen || !courseData) return null;

  const prettyLevel = userAnswers?.selfAssessment
    ? userAnswers.selfAssessment
        .replace(/_/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())
    : "";

  const buildSubscriptionPayload = () => {
    const studentId = JSON.parse(
      localStorage.getItem("eg_user_data")
    )?.student_id;
    if (!studentId) return null;

    const base = {
      course_id: String(courseData?.course_id),
      teacher_id: String(selectedTeacher?.id),
      student_id: String(studentId),
    };

    if (selectedClassType === "group") {
      return {
        ...base,
        subscription_type: "group",
        group_id: String(selectedGroup?.id),
        subscription_start_date: toISODate(selectedGroup?.startDate),
        session_duration: String(selectedGroup?.sessionDuration || 90),
        ...(placementTestMeeting && {
          placement_test_meeting: placementTestMeeting,
        }),
      };
    }

    return {
      ...base,
      subscription_type: "private",
      subscription_start_date: toISODate(new Date()),
      session_duration: "60",
      schedules: (selectedSchedules || []).map((s) => ({
        day_of_week: s.day_of_week,
        start_time: s.start_time,
        end_time: s.end_time,
      })),
      ...(placementTestMeeting && {
        placement_test_meeting: placementTestMeeting,
      }),
    };
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();

    const studentId = JSON.parse(
      localStorage.getItem("eg_user_data")
    )?.student_id;
    if (!studentId) {
      toast.error("Student ID not found. Please log in again.");
      return;
    }

    if (selectedClassType === "private") {
      if (!selectedSchedules || selectedSchedules.length === 0) {
        toast.error("Please select at least one schedule.");
        return;
      }
    }

    const subscriptionPayload = buildSubscriptionPayload();
    if (!subscriptionPayload) {
      toast.error("Subscription payload is missing required data.");
      return;
    }

    setIsProcessing(true);

    try {
      // ✅ 1. أولاً: إرسال الاشتراك
      const subscriptionRes = await dispatch(
        handleMakeStudentSchedule({ data: subscriptionPayload })
      ).unwrap();

      if (subscriptionRes?.status !== "success") {
        toast.error(
          subscriptionRes?.message || "Subscription failed. Please try again."
        );
        setIsProcessing(false);
        return;
      }

      toast.success(subscriptionRes?.message || "Subscription created!");

      // ✅ 2. ثانياً: لو في placement test meeting، نرسله
      if (placementTestMeeting) {
        const meetingPayload = {
          meeting_resrvations_id: String(
            placementTestMeeting.meeting_resrvations_id
          ),
          meeting_type: placementTestMeeting.meeting_type,
          course_id: String(courseData?.course_id),
          note: placementTestMeeting.note || "",
          student_id: String(studentId),
        };

        const meetingRes = await dispatch(
          handleReserveMeeting({ data: meetingPayload })
        ).unwrap();

        if (meetingRes?.status === "success") {
          toast.success(
            meetingRes?.message || "Placement test meeting reserved!"
          );
        } else {
          toast.error(
            meetingRes?.message ||
              "Subscription created but meeting reservation failed."
          );
        }
      }

      // ✅ 3. تحديث قائمة الجداول
      await dispatch(
        handleGetAllStudentSchedules({ data: { student_id: studentId } })
      );

      setIsSubmitted(true);
    } catch (err) {
      console.error("Subscription error:", err);
      toast.error(err?.message || "An error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000] p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-cyan-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-teal-600" />
              <div>
                <h2 className="text-xl font-bold text-[#023f4d]">
                  {isSubmitted
                    ? "Enrollment Confirmed!"
                    : "Complete Enrollment"}
                </h2>
                <p className="text-gray-600 text-sm">
                  {isSubmitted
                    ? "Your subscription is created successfully."
                    : "We'll send you enrollment details"}
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
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-[#023f4d] mb-3">
                  Enrollment Summary:
                </h3>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Class Type:</span>
                    <span className="font-bold text-[#023f4d]">
                      {selectedClassType === "group"
                        ? "Group Classes"
                        : "Private Classes"}
                    </span>
                  </div>

                  {prettyLevel && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Level:</span>
                      <span className="font-bold text-teal-600">
                        {prettyLevel}
                      </span>
                    </div>
                  )}

                  {selectedTeacher?.name && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Teacher:</span>
                      <span className="font-medium text-gray-800">
                        {selectedTeacher.name}
                      </span>
                    </div>
                  )}

                  {selectedClassType === "group" && selectedGroup?.title && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Group:</span>
                        <span className="font-medium text-gray-800">
                          {selectedGroup.title}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Schedule:</span>
                        <span className="font-medium text-gray-800">
                          {selectedGroup.day || "-"}
                        </span>
                      </div>
                    </>
                  )}

                  {selectedClassType === "private" && (
                    <>
                      <div className="text-gray-600 mt-2 font-semibold">
                        Selected Schedules:
                      </div>
                      <div className="space-y-1">
                        {(selectedSchedules || []).map((s) => (
                          <div key={s.id} className="text-sm text-gray-700">
                            • {s.day_of_week} ({toHHMM(s.start_time)} -{" "}
                            {toHHMM(s.end_time)})
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* ✅ عرض بيانات الـ Placement Test */}
                  {placementTestMeeting && (
                    <>
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="text-gray-600 font-semibold mb-2">
                          Placement Test:
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Date:</span>
                          <span className="font-medium text-gray-800">
                            {placementTestMeeting.meeting_date}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Time:</span>
                          <span className="font-medium text-gray-800">
                            {toHHMM(placementTestMeeting.meeting_time)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Platform:</span>
                          <span className="font-medium text-gray-800">
                            {placementTestMeeting.platform}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <p className="text-gray-600 mb-4">
                Enter your email address and we will send you:
              </p>

              <ul className="text-sm text-gray-600 mb-4 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600" />
                  Payment link and instructions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600" />
                  Course access details
                </li>
                {placementTestMeeting && (
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600" />
                    Placement test meeting link
                  </li>
                )}
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600" />
                  Welcome materials and resources
                </li>
              </ul>

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
                    disabled
                    value={email}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="flex-1 bg-gradient-to-r from-[#023f4d] to-teal-600 text-white py-3 px-4 rounded-xl font-semibold hover:to-teal-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 mr-2" />
                        Complete Enrollment
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={onBack}
                    disabled={isProcessing}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center disabled:opacity-50"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </button>
                </div>
              </form>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">
                  By providing your email, you agree to receive course
                  information and enrollment details.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckSquare className="w-8 h-8 text-green-600" />
              </div>

              <h3 className="text-xl font-bold text-[#023f4d] mb-2">
                Subscription Created Successfully!
              </h3>

              <p className="text-gray-600 mb-2">
                Enrollment details will be sent to <strong>{email}</strong>
              </p>

              {placementTestMeeting && (
                <div className="mt-4 p-3 bg-teal-50 rounded-lg border border-teal-200">
                  <p className="text-sm text-teal-700">
                    <strong>✓</strong> Placement test meeting reserved for{" "}
                    {placementTestMeeting.meeting_date} at{" "}
                    {toHHMM(placementTestMeeting.meeting_time)}
                  </p>
                </div>
              )}

              <button
                onClick={handleClose}
                className="mt-6 w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
