"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  X,
  Calendar,
  Phone,
  Video,
  Send,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  handleGetAllReservedMeeting,
  handleReserveMeeting,
} from "../../../libs/features/meetingSlice";
import { useParams } from "next/navigation";

export default function OralMeetingModal({
  open,
  onClose,
  onSubmit,
  initial = {},
}) {
  const dispatch = useDispatch();
  const params = useParams();
  const rawId = params?.id;
  const course_id = Array.isArray(rawId) ? rawId[0] : rawId;

  const {
    all_reserved_meetings_loading,
    all_reserved_meetings_list,
    reserve_meeting_loading,
  } = useSelector((state) => state?.meeting);

  const [form, setForm] = useState({
    platform: initial.platform || "Google Meet",
    timezone:
      initial.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
    notes: initial.notes || "",
  });

  const [selectedDate, setSelectedDate] = useState(""); // YYYY-MM-DD
  const [timeInput, setTimeInput] = useState(""); // HH:MM (from buttons)
  const [selectedReservationId, setSelectedReservationId] = useState(""); // <-- IMPORTANT

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const platforms = [
    { label: "Google Meet", value: "Google Meet", icon: Video },
    { label: "Zoom", value: "Zoom", icon: Video },
    { label: "WhatsApp", value: "WhatsApp", icon: Phone },
    { label: "Phone Call", value: "Phone Call", icon: Phone },
  ];

  const update = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  useEffect(() => {
    if (!open) return;

    setSuccess(false);
    setErrors({});
    setSelectedDate("");
    setTimeInput("");
    setSelectedReservationId("");

    dispatch(handleGetAllReservedMeeting());
  }, [open, dispatch]);

  // Normalize backend list
  const allSlots = useMemo(() => {
    const msg =
      all_reserved_meetings_list?.message ||
      all_reserved_meetings_list?.message ||
      [];
    return Array.isArray(msg) ? msg : [];
  }, [all_reserved_meetings_list]);

  // Available slots only
  const availableSlots = useMemo(() => {
    return allSlots.filter((m) => {
      const status = String(m?.status || "").toLowerCase();
      const hasStudent =
        m?.student_id !== null &&
        m?.student_id !== undefined &&
        String(m.student_id) !== "";

      if (hasStudent) return false;
      if (["booked", "reserved", "accepted", "confirmed"].includes(status))
        return false;

      // "pending" with student_id:null is considered available for your case
      return true;
    });
  }, [allSlots]);

  // Slots for selected date
  const slotsByDate = useMemo(() => {
    if (!selectedDate) return [];
    return availableSlots
      .filter((s) => String(s.meeting_date) === String(selectedDate))
      .sort((a, b) =>
        String(a.meeting_time || "").localeCompare(String(b.meeting_time || ""))
      );
  }, [availableSlots, selectedDate]);

  // Time list (HH:MM) for selected date
  const allowedTimeInputs = useMemo(() => {
    const set = new Set();
    for (const s of slotsByDate) {
      const hhmm = toHHMM(s?.meeting_time);
      if (hhmm) set.add(hhmm);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [slotsByDate]);

  // Helper: find slot by time (HH:MM)
  const findSlotByTime = (hhmm) => {
    if (!hhmm) return null;
    return (
      slotsByDate.find((s) => toHHMM(s?.meeting_time) === String(hhmm)) || null
    );
  };

  // When date changes, auto pick the first time and set reservation id
  useEffect(() => {
    if (!selectedDate) return;

    if (allowedTimeInputs.length === 0) {
      setTimeInput("");
      setSelectedReservationId("");
      return;
    }

    const firstTime = allowedTimeInputs[0];
    setTimeInput(firstTime);

    const slot = findSlotByTime(firstTime);
    setSelectedReservationId(
      slot?.meeting_resrvations_id ? String(slot.meeting_resrvations_id) : ""
    );
  }, [selectedDate, allowedTimeInputs]); // eslint-disable-line react-hooks/exhaustive-deps

  // Whenever time changes, set reservation id based on selected time
  useEffect(() => {
    if (!selectedDate || !timeInput) {
      setSelectedReservationId("");
      return;
    }

    const slot = findSlotByTime(timeInput);
    setSelectedReservationId(
      slot?.meeting_resrvations_id ? String(slot.meeting_resrvations_id) : ""
    );
  }, [selectedDate, timeInput]); // eslint-disable-line react-hooks/exhaustive-deps

  const validate = () => {
    const e = {};
    if (!selectedDate) e.date = "Select a date";
    if (!timeInput) e.time = "Select a time";

    if (selectedDate && timeInput && !allowedTimeInputs.includes(timeInput)) {
      e.time = "This time is not available for the selected date";
    }

    if (!selectedReservationId) {
      e.slot = "This slot is not available. Choose another time.";
    }

    return e;
  };

  async function handleSubmit(ev) {
    ev.preventDefault();

    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    const studentId = getStudentIdSafe();
    if (!studentId) {
      toast.error("Student ID not found. Please log in again.");
      return;
    }

    if (!course_id) {
      toast.error("Course ID is missing.");
      return;
    }

    const payload = {
      meeting_resrvations_id: String(selectedReservationId), // <-- FROM SELECTED TIME
      meeting_type: platformToMeetingType(form.platform),
      course_id: String(course_id),
      note: form.notes || "",
      student_id: String(studentId),
    };

    const res = await dispatch(
      handleReserveMeeting({ data: payload })
    ).unwrap();

    if (res?.status == "success") {
      dispatch(handleGetAllReservedMeeting());
      setSuccess(true);
      toast.success(res?.message || "Meeting reserved successfully!");
    } else {
      toast.error(res?.message);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 bg-teal-50">
          <div>
            <p className="text-xs text-gray-500">
              {initial?.course_title || "Course"}
            </p>
            <h2 className="text-xl font-semibold text-gray-800">
              Reserve a Meeting Slot
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white text-gray-600"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
          {success ? (
            <SuccessState onClose={onClose} />
          ) : all_reserved_meetings_loading ? (
            <div className="py-10 flex items-center justify-center gap-3 text-gray-700">
              <Loader2 className="w-5 h-5 animate-spin" />
              Loading available reservations...
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Field label="Preferred platform">
                    <div className="grid grid-cols-2 gap-2">
                      {platforms.map((p) => (
                        <button
                          type="button"
                          key={p.value}
                          onClick={() => update("platform", p.value)}
                          className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition ${
                            form.platform === p.value
                              ? "bg-teal-50 border-teal-300 text-teal-800"
                              : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                          }`}
                          aria-pressed={form.platform === p.value}
                        >
                          <p.icon className="w-4 h-4" />
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </Field>
                </div>

                <Field label="Meeting date" error={errors.date}>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => {
                        const d = e.target.value;
                        setSelectedDate(d);
                        setErrors((prev) => ({
                          ...prev,
                          date: undefined,
                          time: undefined,
                          slot: undefined,
                        }));
                      }}
                      className="w-full rounded-xl border border-gray-200 pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                    />
                  </div>

                  {selectedDate && allowedTimeInputs.length === 0 && (
                    <p className="mt-2 text-sm text-gray-600">
                      No times available for this date.
                    </p>
                  )}
                </Field>

                <Field label="Time" error={errors.time}>
                  {selectedDate && allowedTimeInputs.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {allowedTimeInputs.map((t) => {
                        const active = t === timeInput;
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => {
                              console.log("time", t);
                              setTimeInput(t);

                              // set reservation id right away for safety
                              const slot = findSlotByTime(t);
                              setSelectedReservationId(
                                slot?.meeting_resrvations_id
                                  ? String(slot.meeting_resrvations_id)
                                  : ""
                              );

                              setErrors((prev) => ({
                                ...prev,
                                time: undefined,
                                slot: undefined,
                              }));
                            }}
                            className={`text-xs px-3 py-1.5 rounded-full border transition ${
                              active
                                ? "bg-teal-50 border-teal-300 text-teal-800"
                                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            {to12Hour(toHHMMSS(t))}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {selectedDate && timeInput && (
                    <p
                      className={`mt-2 text-xs ${
                        selectedReservationId
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      {selectedReservationId
                        ? `Selected slot ID: ${selectedReservationId}`
                        : "Choose one of the available times shown above."}
                    </p>
                  )}

                  {errors.slot && (
                    <p className="mt-1 text-xs text-red-600">{errors.slot}</p>
                  )}
                </Field>
              </div>

              <Field label="Notes (optional)">
                <div className="relative">
                  <MessageSquare className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <textarea
                    rows={4}
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    className="w-full rounded-xl border border-gray-200 pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Tell us anything helpful (level, goals, availability)…"
                  />
                </div>
              </Field>

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={reserve_meeting_loading || !selectedReservationId}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-medium hover:opacity-95 disabled:opacity-50"
                >
                  {reserve_meeting_loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Reserving...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Reserve Meeting
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-800 mb-1">
        {label}
      </span>
      {children}
      {error && (
        <span className="block mt-1 text-xs text-red-600">{error}</span>
      )}
    </label>
  );
}

function SuccessState({ onClose }) {
  return (
    <div className="py-10 text-center">
      <div className="mx-auto w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center mb-4">
        <Send className="w-6 h-6 text-teal-700" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-1">
        Reservation confirmed!
      </h3>
      <p className="text-gray-600 max-w-md mx-auto">
        Your meeting has been reserved. We will share the meeting details soon.
      </p>
      <button
        onClick={onClose}
        className="mt-6 px-5 py-2.5 rounded-xl bg-teal-600 text-white hover:bg-teal-700"
      >
        Close
      </button>
    </div>
  );
}

/* ----------------------------- helpers ----------------------------- */

function platformToMeetingType(platform) {
  const p = String(platform || "").toLowerCase();
  if (p.includes("google")) return "google_meet";
  if (p.includes("zoom")) return "zoom";
  if (p.includes("whatsapp")) return "whatsapp";
  if (p.includes("phone")) return "phone_call";
  return "google_meet";
}

// Backend: "06:07:00" -> "06:07"
function toHHMM(timeStr) {
  if (!timeStr) return "";
  const parts = String(timeStr).split(":");
  const hh = String(parts[0] || "00").padStart(2, "0");
  const mm = String(parts[1] || "00").padStart(2, "0");
  return `${hh}:${mm}`;
}

// Input: "06:07" -> "06:07:00"
function toHHMMSS(hhmm) {
  if (!hhmm) return "";
  const parts = String(hhmm).split(":");
  const hh = String(parts[0] || "00").padStart(2, "0");
  const mm = String(parts[1] || "00").padStart(2, "0");
  return `${hh}:${mm}:00`;
}

function to12Hour(timeStr) {
  if (!timeStr) return "";
  const parts = String(timeStr).split(":");
  const hh = Number(parts[0] || 0);
  const mm = Number(parts[1] || 0);

  const period = hh >= 12 ? "PM" : "AM";
  const h12 = hh % 12 === 0 ? 12 : hh % 12;
  const min = String(mm).padStart(2, "0");
  return `${h12}:${min} ${period}`;
}

function getStudentIdSafe() {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem("eg_user_data");
    if (raw) {
      const obj = JSON.parse(raw);
      const id = obj?.student_id || obj?.id || obj?.user_id;
      if (id) return Number(id);
    }
  } catch {}

  return null;
}
