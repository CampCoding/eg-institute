"use client";

import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { X, ArrowLeft, Calendar, Loader2, AlertCircle } from "lucide-react";
import { handleGetAllCourseTeacherGroups } from "@/libs/features/coursesSlice";

export default function GroupSelectionModal({
  isOpen,
  onClose,
  onSelectGroup,
  onBack,
  teacherId,
}) {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const dispatch = useDispatch();
  const { course_teacher_group_loading, course_teacher_group_data } =
    useSelector((state) => state?.courses);

  useEffect(() => {
    if (!isOpen || !teacherId) return;

    dispatch(
      handleGetAllCourseTeacherGroups({ data: { teacher_id: teacherId } })
    );
  }, [isOpen, teacherId, dispatch]);

  const groups = useMemo(() => {
    const list = course_teacher_group_data?.message || [];
    return list.map((g) => {
      const currentStudents = Number(g?.group_students ?? 0);
      const maxStudents = Number(g?.max_students ?? 0);
      const isFull = currentStudents >= maxStudents;

      return {
        id: String(g?.group_id ?? g?.id ?? ""),
        title: g?.group_name || g?.title || "Group",
        day: g?.day_of_week || g?.day || "",
        time: g?.time || "",
        startDate: g?.start_date || "",
        sessionDuration: g?.session_duration || "90",
        currentStudents,
        maxStudents,
        isFull,
        available:
          !isFull &&
          String(g?.is_full ?? "0") !== "1" &&
          String(g?.available ?? "1") !== "0",
        raw: g,
      };
    });
  }, [course_teacher_group_data]);

  const handleConfirm = () => {
    if (!selectedGroup) return;
    onSelectGroup(selectedGroup);
  };

  const handleClose = () => {
    setSelectedGroup(null);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) setSelectedGroup(null);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000] p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-cyan-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#023f4d]">
                Select Your Group
              </h2>
              <p className="text-gray-600 text-sm">
                Groups shown are based on your teacher selection
              </p>
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
          {course_teacher_group_loading ? (
            <div className="py-12 text-center">
              <Loader2 className="w-10 h-10 animate-spin text-teal-600 mx-auto mb-3" />
              <p className="text-gray-600">Loading groups...</p>
            </div>
          ) : groups.length === 0 ? (
            <div className="p-6 rounded-xl bg-gray-50 border border-gray-200 text-center">
              <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">
                No groups available for this teacher right now.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {groups.map((g) => {
                const availableSlots = g.maxStudents - g.currentStudents;

                return (
                  <button
                    key={g.id}
                    onClick={() => g.available && setSelectedGroup(g)}
                    disabled={!g.available}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      selectedGroup?.id === g.id
                        ? "border-teal-500 bg-teal-50"
                        : g.available
                          ? "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          : "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-4">
                        <Calendar
                          className={`w-5 h-5 mt-1 ${
                            selectedGroup?.id === g.id
                              ? "text-teal-600"
                              : g.available
                                ? "text-gray-400"
                                : "text-gray-300"
                          }`}
                        />
                        <div>
                          <div className="font-semibold text-gray-900">
                            {g.title}
                          </div>

                          <div className="flex gap-3 items-center mt-2">
                            <div
                              className={`text-sm font-medium ${
                                g.isFull ? "text-rose-600" : "text-emerald-600"
                              }`}
                            >
                              {g.currentStudents}/{g.maxStudents} students
                            </div>

                            {!g.isFull && (
                              <div className="text-xs text-gray-500 bg-emerald-50 px-2 py-0.5 rounded-full">
                                {availableSlots}{" "}
                                {availableSlots === 1 ? "slot" : "slots"} left
                              </div>
                            )}
                          </div>

                          {g?.raw?.group_schedules &&
                            g?.raw?.group_schedules.length > 0 && (
                              <div className="mt-2 space-y-1">
                                {g.raw.group_schedules.map((schedule, idx) => (
                                  <div
                                    key={idx}
                                    className="text-sm text-gray-600"
                                  >
                                    {schedule.day_of_week} •{" "}
                                    {schedule.start_time} - {schedule.end_time}
                                  </div>
                                ))}
                              </div>
                            )}

                          {!!g?.raw?.session_duration && (
                            <div className="text-sm text-gray-600 mt-1">
                              Duration: {g?.raw?.session_duration} min
                            </div>
                          )}

                          {!!g.startDate && (
                            <div className="text-xs text-gray-500 mt-1">
                              Starts: {g.startDate}
                            </div>
                          )}
                        </div>
                      </div>

                      {!g.available && (
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-sm text-rose-600 font-semibold bg-rose-50 px-3 py-1 rounded-full">
                            {g.isFull ? "FULL" : "Not Available"}
                          </span>
                          {g.isFull && (
                            <span className="text-xs text-gray-500">
                              {g.currentStudents}/{g.maxStudents}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          <button
            onClick={handleConfirm}
            disabled={!selectedGroup}
            className="mt-6 w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-teal-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Confirm Group
          </button>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Class Type
          </button>

          <button
            onClick={handleClose}
            className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
