"use client";

import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spin } from "antd";
import {
  X,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Clock,
  Lock,
} from "lucide-react";
import { handleGetAllCourseTeachers } from "@/libs/features/coursesSlice";
import toast from "react-hot-toast";
import {
  toHHMM,
  toHHMMSS,
  timeToMinutes,
  minutesToHHMM,
  format24to12,
  DAY_ORDER,
} from "../../utils/helpers";

export default function ScheduleSelectionModal({
  courseId,
  selectedTeacher,
  isOpen,
  onClose,
  onSelectSchedules,
  onBack,
}) {
  const [selected, setSelected] = useState([]);
  const [loadError, setLoadError] = useState("");
  const [filteredData, setFilteredData] = useState(null);

  const dispatch = useDispatch();
  const { course_teacher_loading } = useSelector((state) => state?.courses);

  useEffect(() => {
    if (!isOpen) return;

    dispatch(handleGetAllCourseTeachers({ data: { course_id: courseId } }))
      .unwrap()
      .then((res) => {
        if (res?.status === "success") {
          const teachersList = res?.message || [];
          const filtered = teachersList.find(
            (item) => String(item?.teacher_id) === String(selectedTeacher?.id)
          );
          setFilteredData(filtered);
          setLoadError("");
        } else {
          setLoadError("Failed to load teacher data");
        }
      })
      .catch((err) => {
        console.error("Error loading teachers:", err);
        setLoadError("Error loading teacher schedules");
      });
  }, [isOpen, dispatch, courseId, selectedTeacher]);

  // ✅ التحقق من الـ Reserved Slots
  const isSlotReserved = (day, startTime, endTime) => {
    const reservedSlots = filteredData?.reserved_slots || [];

    return reservedSlots.some((reserved) => {
      const reservedDay = reserved?.day_of_week || "";
      const reservedStart = toHHMM(reserved?.start_time || "");
      const reservedEnd = toHHMM(reserved?.end_time || "");

      if (reservedDay !== day) return false;

      // التحقق من التداخل
      const slotStartMins = timeToMinutes(startTime);
      const slotEndMins = timeToMinutes(endTime);
      const reservedStartMins = timeToMinutes(reservedStart);
      const reservedEndMins = timeToMinutes(reservedEnd);

      // لو في تداخل بين الـ slot والـ reserved time
      return (
        (slotStartMins >= reservedStartMins &&
          slotStartMins < reservedEndMins) ||
        (slotEndMins > reservedStartMins && slotEndMins <= reservedEndMins) ||
        (slotStartMins <= reservedStartMins && slotEndMins >= reservedEndMins)
      );
    });
  };

  // ✅ تحويل المواعيد المتاحة لساعات كاملة (1 hour slots)
  const availableSlotsByDay = useMemo(() => {
    const slots = filteredData?.teacher_slots;
    if (!Array.isArray(slots)) return new Map();

    const daySlots = new Map();

    slots
      .filter((slot) => slot?.hidden !== "1")
      .forEach((slot) => {
        const day = slot?.day || "";
        const startTime = slot?.slots_from || "";
        const endTime = slot?.slots_to || "";

        if (!day || !startTime || !endTime) return;

        const startMins = timeToMinutes(toHHMM(startTime));
        const endMins = timeToMinutes(toHHMM(endTime));

        // ✅ تقسيم كل ساعة
        const hourSlots = [];
        for (
          let currentStart = startMins;
          currentStart + 60 <= endMins;
          currentStart += 60
        ) {
          const currentEnd = currentStart + 60;
          const slotStartTime = minutesToHHMM(currentStart);
          const slotEndTime = minutesToHHMM(currentEnd);

          // ✅ التحقق من الحجز
          const isReserved = isSlotReserved(day, slotStartTime, slotEndTime);

          hourSlots.push({
            key: `${day}-${slotStartTime}-${slotEndTime}`,
            day_of_week: day,
            start_time: slotStartTime,
            end_time: slotEndTime,
            start_time_12h: format24to12(toHHMMSS(slotStartTime)),
            end_time_12h: format24to12(toHHMMSS(slotEndTime)),
            window_start: toHHMM(startTime),
            window_end: toHHMM(endTime),
            isReserved: isReserved, // ✅ علامة الحجز
          });
        }

        if (!daySlots.has(day)) {
          daySlots.set(day, []);
        }
        daySlots.get(day).push(...hourSlots);
      });

    return daySlots;
  }, [filteredData]);

  const daysToRender = useMemo(() => {
    const existingDays = Array.from(availableSlotsByDay.keys());
    return existingDays.sort((a, b) => {
      const ia = DAY_ORDER.indexOf(a);
      const ib = DAY_ORDER.indexOf(b);
      if (ia === -1 && ib === -1) return String(a).localeCompare(String(b));
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    });
  }, [availableSlotsByDay]);

  useEffect(() => {
    if (!isOpen) {
      setSelected([]);
      setFilteredData(null);
      setLoadError("");
    }
  }, [isOpen]);

  const isSlotSelected = (slotKey) => {
    return selected.some((x) => x.key === slotKey);
  };

  const toggleSlot = (slot) => {
    // ✅ منع اختيار المحجوز
    if (slot.isReserved) {
      toast.error("This time slot is already reserved");
      return;
    }

    setSelected((prev) => {
      const exists = prev.some((x) => x.key === slot.key);
      if (exists) {
        return prev.filter((x) => x.key !== slot.key);
      }
      return [...prev, slot];
    });
  };

  const handleConfirm = () => {
    if (selected.length === 0) {
      toast.error("Please select at least one schedule");
      return;
    }

    const payloadSchedules = selected.map((s) => ({
      id: s.key,
      day_of_week: s.day_of_week,
      start_time: toHHMMSS(s.start_time),
      end_time: toHHMMSS(s.end_time),
      window_start: s.window_start,
      window_end: s.window_end,
    }));

    onSelectSchedules(payloadSchedules);
  };

  if (!isOpen) return null;

  const showEmpty =
    !course_teacher_loading &&
    (!filteredData || availableSlotsByDay.size === 0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000] p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-cyan-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#023f4d]">
                Select Your Private Class Schedule
              </h2>
              <p className="text-gray-600 text-sm">
                Choose 1-hour time slots for your private lessons
              </p>
              {selectedTeacher && (
                <p className="text-xs text-gray-500 mt-1">
                  Teacher: {selectedTeacher.name}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {course_teacher_loading ? (
            <div className="py-12 flex items-center justify-center">
              <Spin size="large" spinning />
            </div>
          ) : loadError ? (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">
              {loadError}
            </div>
          ) : showEmpty ? (
            <div className="p-6 rounded-xl bg-gray-50 border border-gray-200 text-center">
              <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">
                No available schedules found for this teacher.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-blue-800 mb-1">
                      How it works:
                    </p>
                    <p className="text-sm text-blue-700">
                      Each session is <strong>exactly 1 hour</strong>. Click on
                      any available time slot to add it to your schedule. You
                      can select multiple slots across different days.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {daysToRender.map((day) => {
                  const daySlots = availableSlotsByDay.get(day) || [];
                  if (daySlots.length === 0) return null;

                  const availableCount = daySlots.filter(
                    (s) => !s.isReserved
                  ).length;
                  const reservedCount = daySlots.filter(
                    (s) => s.isReserved
                  ).length;

                  return (
                    <div
                      key={day}
                      className="border border-gray-200 rounded-2xl p-5 bg-gray-50"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-lg text-[#023f4d]">
                          {day}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                            {availableCount} available
                          </span>
                          {reservedCount > 0 && (
                            <span className="text-xs text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200">
                              {reservedCount} reserved
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {daySlots.map((slot) => {
                          const isSelected = isSlotSelected(slot.key);
                          const isReserved = slot.isReserved;

                          return (
                            <button
                              key={slot.key}
                              type="button"
                              onClick={() => toggleSlot(slot)}
                              disabled={isReserved}
                              className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                                isReserved
                                  ? "border-gray-300 bg-gray-100 cursor-not-allowed opacity-60"
                                  : isSelected
                                    ? "border-teal-500 bg-teal-50 shadow-md scale-105"
                                    : "border-gray-200 bg-white hover:border-teal-300 hover:shadow-sm"
                              }`}
                            >
                              {/* Checkmark or Lock */}
                              <div className="absolute top-2 right-2">
                                {isReserved ? (
                                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                    <Lock className="w-3 h-3 text-white" />
                                  </div>
                                ) : (
                                  isSelected && (
                                    <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
                                      <CheckCircle className="w-3 h-3 text-white" />
                                    </div>
                                  )
                                )}
                              </div>

                              {/* Time Display */}
                              <div
                                className={`font-bold text-sm mb-1 ${
                                  isReserved
                                    ? "text-gray-500"
                                    : isSelected
                                      ? "text-teal-700"
                                      : "text-gray-800"
                                }`}
                              >
                                {slot.start_time} - {slot.end_time}
                              </div>
                              <div
                                className={`text-xs ${
                                  isReserved
                                    ? "text-gray-400"
                                    : isSelected
                                      ? "text-teal-600"
                                      : "text-gray-500"
                                }`}
                              >
                                {slot.start_time_12h}
                              </div>
                              <div
                                className={`text-xs ${
                                  isReserved
                                    ? "text-gray-400"
                                    : isSelected
                                      ? "text-teal-600"
                                      : "text-gray-500"
                                }`}
                              >
                                to {slot.end_time_12h}
                              </div>

                              {/* Duration Badge or Reserved */}
                              <div className="mt-2">
                                <span
                                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                    isReserved
                                      ? "bg-red-100 text-red-700"
                                      : isSelected
                                        ? "bg-teal-100 text-teal-700"
                                        : "bg-gray-100 text-gray-600"
                                  }`}
                                >
                                  {isReserved ? "RESERVED" : "1 HOUR"}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Selected Sessions Summary */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          {selected.length > 0 && (
            <div className="mb-4 p-4 bg-white rounded-xl border border-teal-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-[#023f4d]">
                  Selected Sessions ({selected.length})
                </h4>
                <button
                  onClick={() => setSelected([])}
                  className="text-xs text-red-600 hover:text-red-700 font-medium"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-2 max-h-40 overflow-y-auto">
                {selected.map((s) => (
                  <div
                    key={s.key}
                    className="flex items-center justify-between p-2 bg-teal-50 rounded-lg border border-teal-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-teal-500 rounded-full" />
                      <div>
                        <div className="font-medium text-sm text-gray-800">
                          {s.day_of_week}
                        </div>
                        <div className="text-xs text-gray-600">
                          {s.start_time_12h} - {s.end_time_12h}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleSlot(s)}
                      className="text-red-600 hover:text-red-800 text-xs font-medium px-2 py-1 rounded hover:bg-red-100 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleConfirm}
              disabled={selected.length === 0}
              className="flex-1 bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-teal-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {selected.length === 0
                ? "Select at least one session"
                : `Confirm ${selected.length} Session${
                    selected.length > 1 ? "s" : ""
                  }`}
            </button>
            <button
              onClick={onBack}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Class Type
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
