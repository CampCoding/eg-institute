"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleGetAllStudentSchedules } from "../../../libs/features/coursesSlice";
import { ChevronLeft, ChevronRight, Search, Video } from "lucide-react";
import { Modal } from "antd";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const pad2 = (n) => String(n).padStart(2, "0");

const isoDate = (d) =>
  `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

const parseISO = (s) => {
  const [y, m, d] = (s || "").split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
};

const formatRange = (start, end) => {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return `${fmt.format(start)} - ${fmt.format(end)}`;
};

const timeToMinutes = (t) => {
  if (!t) return 0;
  const [hh, mm] = t.split(":").map(Number);
  return hh * 60 + (mm || 0);
};

const minutesToLabel = (mins) => {
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  const ampm = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 || 12;
  return `${h12}:${pad2(m)} ${ampm}`;
};

const hashStr = (s) => {
  let h = 0;
  for (let i = 0; i < (s || "").length; i++)
    h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
};

const COURSE_PALETTE = [
  { bg: "bg-orange-500", hover: "hover:bg-orange-600", text: "text-white" },
  { bg: "bg-red-500", hover: "hover:bg-red-600", text: "text-white" },
  { bg: "bg-blue-500", hover: "hover:bg-blue-600", text: "text-white" },
  { bg: "bg-purple-500", hover: "hover:bg-purple-600", text: "text-white" },
  { bg: "bg-emerald-500", hover: "hover:bg-emerald-600", text: "text-white" },
];

function pickCourseColor(courseName, status) {
  if (status === "deActive") {
    return {
      bg: "bg-slate-600",
      hover: "hover:bg-slate-700",
      text: "text-white",
    };
  }
  const idx = hashStr(courseName) % COURSE_PALETTE.length;
  return COURSE_PALETTE[idx];
}

function assignOverlapColumns(events) {
  const sorted = [...events].sort(
    (a, b) => a.startMin - b.startMin || a.endMin - b.endMin
  );
  const active = [];
  const usedCols = new Set();

  const placed = sorted.map((e) => {
    for (let i = active.length - 1; i >= 0; i--) {
      if (active[i].endMin <= e.startMin) {
        usedCols.delete(active[i].col);
        active.splice(i, 1);
      }
    }

    let col = 0;
    while (usedCols.has(col)) col++;
    usedCols.add(col);
    active.push({ endMin: e.endMin, col });

    return { ...e, _col: col };
  });

  const maxCol = placed.reduce((m, e) => Math.max(m, e._col), 0);
  const colCount = maxCol + 1;

  return placed.map((e) => ({ ...e, _colCount: colCount }));
}

export default function Schedule() {
  const dispatch = useDispatch();

  // ✅ FIXED: Use correct state variables from your slice
  const { course_student_shedule_data, course_student_shedule_loading } =
    useSelector((state) => state?.courses);

  const [weekStartISO, setWeekStartISO] = useState(null);
  const [view, setView] = useState("week");
  const [query, setQuery] = useState("");

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [activeLesson, setActiveLesson] = useState(null);

  const openDetails = (lesson) => {
    setActiveLesson(lesson);
    setDetailsOpen(true);
  };

  const closeDetails = () => {
    setDetailsOpen(false);
    setActiveLesson(null);
  };

  const fetchWeek = async (startISO) => {
    const userData =
      typeof window !== "undefined" && localStorage.getItem("eg_user_data")
        ? JSON.parse(localStorage.getItem("eg_user_data"))
        : typeof window !== "undefined" &&
            sessionStorage.getItem("eg_user_data")
          ? JSON.parse(sessionStorage.getItem("eg_user_data"))
          : null;

    const payload = {
      student_id: userData?.student_id,
    };

    if (startISO) {
      payload.week_start = startISO;
    }

    dispatch(handleGetAllStudentSchedules({ data: payload }));
  };

  useEffect(() => {
    fetchWeek(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ FIXED: Use course_student_shedule_data directly (API response is at root level)
  const apiData = course_student_shedule_data;

  // ✅ Update weekStartISO when data changes
  useEffect(() => {
    if (apiData?.week_start && !weekStartISO) {
      setWeekStartISO(apiData.week_start);
    }
  }, [apiData, weekStartISO]);

  const weekStartDate = useMemo(
    () => parseISO(weekStartISO || apiData?.week_start),
    [weekStartISO, apiData]
  );

  const weekEndDate = useMemo(() => {
    if (!weekStartDate) return null;
    const d = new Date(weekStartDate);
    d.setDate(d.getDate() + 6);
    return d;
  }, [weekStartDate]);

  const days = useMemo(() => {
    if (!weekStartDate) return [];
    return DAYS.map((name, i) => {
      const d = new Date(weekStartDate);
      d.setDate(d.getDate() + i);
      const dateShort = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
      }).format(d);
      const dateISO = isoDate(d);
      return { name, short: name.slice(0, 3), dateShort, dateISO };
    });
  }, [weekStartDate]);

  // ✅ FIXED: Access group_lessons from apiData
  const lessons = useMemo(() => {
    const list = apiData?.group_lessons || [];
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter((l) => {
      const a = (l.course_name || "").toLowerCase();
      const b = (l.group_name || "").toLowerCase();
      return a.includes(q) || b.includes(q);
    });
  }, [apiData, query]);

  const HOUR_HEIGHT = 72;
  const pxPerMinute = HOUR_HEIGHT / 60;

  const { gridStartMin, gridEndMin } = useMemo(() => {
    const starts = lessons.map((l) => timeToMinutes(l.start_time));
    const ends = lessons.map((l) => timeToMinutes(l.end_time));
    const minStart = starts.length ? Math.min(...starts) : 8 * 60;
    const maxEnd = ends.length ? Math.max(...ends) : 18 * 60;

    const floorHour = Math.floor(minStart / 60) * 60;
    const ceilHour = Math.ceil(maxEnd / 60) * 60;

    return {
      gridStartMin: Math.min(floorHour, 8 * 60),
      gridEndMin: Math.max(ceilHour, 18 * 60),
    };
  }, [lessons]);

  const hours = useMemo(() => {
    const arr = [];
    for (let m = gridStartMin; m <= gridEndMin; m += 60) arr.push(m);
    return arr;
  }, [gridStartMin, gridEndMin]);

  const eventsByDay = useMemo(() => {
    const map = {};
    for (const d of days) map[d.name] = [];

    for (const l of lessons) {
      const dayName = l.day_of_week;
      if (!map[dayName]) continue;

      const startMin = timeToMinutes(l.start_time);
      const endMin = timeToMinutes(l.end_time);

      if (endMin <= gridStartMin || startMin >= gridEndMin) continue;

      map[dayName].push({
        lesson: l,
        startMin,
        endMin,
      });
    }

    for (const k of Object.keys(map)) {
      map[k] = assignOverlapColumns(map[k]);
    }

    return map;
  }, [days, lessons, gridStartMin, gridEndMin]);

  const reservationsCount = useMemo(() => {
    const counts = {};
    for (const d of days) counts[d.name] = 0;
    for (const l of lessons)
      if (counts[l.day_of_week] !== undefined) counts[l.day_of_week] += 1;
    return counts;
  }, [days, lessons]);

  // ✅ FIXED: Access today from apiData
  const todayISO = apiData?.today;

  const goToday = () => {
    if (apiData?.week_start) {
      setWeekStartISO(apiData.week_start);
    }
  };

  const goPrev = () => {
    if (!weekStartDate) return;
    const d = new Date(weekStartDate);
    d.setDate(d.getDate() - 7);
    const nextISO = isoDate(d);
    setWeekStartISO(nextISO);
    fetchWeek(nextISO);
  };

  const goNext = () => {
    if (!weekStartDate) return;
    const d = new Date(weekStartDate);
    d.setDate(d.getDate() + 7);
    const nextISO = isoDate(d);
    setWeekStartISO(nextISO);
    fetchWeek(nextISO);
  };

  // ✅ FIXED: Use correct loading state
  if (course_student_shedule_loading) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600 mx-auto mb-3" />
          <p className="text-gray-600">Loading schedule...</p>
        </div>
      </div>
    );
  }

  if (!apiData || !weekStartDate || !weekEndDate) {
    return (
      <div className="min-h-screen p-6">
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow">
          <p className="text-gray-600">No schedule data yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Calendar Grid */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-[90px_repeat(7,minmax(160px,1fr))] border-b border-gray-200">
            <div className="h-16 px-3 py-2 text-sm font-semibold text-gray-600 flex items-center">
              Time
            </div>

            {days.map((d) => {
              const isToday = todayISO && d.dateISO === todayISO;
              return (
                <div
                  key={d.name}
                  className={`h-16 px-3 py-2 border-l border-gray-200 ${
                    isToday ? "bg-indigo-50" : "bg-white"
                  }`}
                >
                  <div className="font-semibold text-gray-900">
                    {d.short}{" "}
                    <span className="text-gray-500 font-normal">
                      {d.dateShort}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {reservationsCount[d.name] || 0}{" "}
                    {(reservationsCount[d.name] || 0) === 1
                      ? "Reservation"
                      : "Reservations"}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Body */}
          <div className="overflow-auto">
            <div className="grid grid-cols-[90px_repeat(7,minmax(160px,1fr))]">
              {/* Time Column */}
              <div className="border-r border-gray-200">
                {hours.map((m) => (
                  <div
                    key={m}
                    className="h-[72px] border-b border-gray-100 px-3 flex items-start pt-2 text-sm text-gray-600"
                  >
                    {minutesToLabel(m)}
                  </div>
                ))}
              </div>

              {/* Day Columns */}
              {days.map((d) => {
                const isToday = todayISO && d.dateISO === todayISO;
                const events = eventsByDay[d.name] || [];

                return (
                  <div
                    key={d.name}
                    className={`border-r border-gray-200 last:border-r-0 ${isToday ? "bg-indigo-50/40" : ""}`}
                  >
                    <div
                      className="relative"
                      style={{ height: `${hours.length * HOUR_HEIGHT}px` }}
                    >
                      {/* grid lines */}
                      <div className="absolute inset-0">
                        {hours.map((m) => (
                          <div
                            key={m}
                            className="h-[72px] border-b border-gray-100"
                          />
                        ))}
                      </div>

                      {/* events */}
                      <div className="absolute inset-0">
                        {events.map((e, idx) => {
                          const l = e.lesson;

                          const top = (e.startMin - gridStartMin) * pxPerMinute;
                          const height = Math.max(
                            (e.endMin - e.startMin) * pxPerMinute,
                            28
                          );

                          const colPct = 100 / e._colCount;
                          const leftPct = e._col * colPct;

                          const color = pickCourseColor(
                            l.course_name,
                            l.session_status
                          );

                          return (
                            <div
                              key={`${l.schedule_id}-${idx}`}
                              role="button"
                              tabIndex={0}
                              onClick={() => openDetails(l)}
                              onKeyDown={(ev) => {
                                if (ev.key === "Enter" || ev.key === " ")
                                  openDetails(l);
                              }}
                              className={`absolute rounded-xl ${color.bg} ${color.hover} ${color.text} shadow-md px-3 py-2 overflow-hidden cursor-pointer`}
                              style={{
                                top,
                                height,
                                left: `calc(${leftPct}% + 6px)`,
                                width: `calc(${colPct}% - 12px)`,
                              }}
                              title={`${l.course_name}\n${l.group_name}\n${l.start_time} - ${l.end_time}`}
                            >
                              <div className="text-sm font-semibold truncate">
                                {l.course_name}
                              </div>
                              <div className="text-xs opacity-90 truncate">
                                {l.group_name}
                              </div>

                              <div className="mt-2 flex items-center justify-between gap-2">
                                <div className="text-[11px] opacity-90">
                                  {minutesToLabel(e.startMin)} -{" "}
                                  {minutesToLabel(e.endMin)}
                                </div>

                                {l.zoom_meeting_link ? (
                                  <a
                                    href={l.zoom_meeting_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(ev) => ev.stopPropagation()}
                                    className="inline-flex items-center gap-1 text-[11px] font-semibold bg-white/15 hover:bg-white/20 px-2 py-1 rounded-lg"
                                  >
                                    <Video className="w-3 h-3" />
                                    Join
                                  </a>
                                ) : null}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 text-sm text-gray-500">
          Timezone: {apiData?.timeZone || "Africa/Cairo"} | Today:{" "}
          {apiData?.today}
        </div>
      </div>

      {/* Session Details Modal */}
      <Modal
        open={detailsOpen}
        onCancel={closeDetails}
        footer={null}
        title="Session Details"
        centered
        width={500}
      >
        {activeLesson ? (
          <div className="space-y-4">
            {/* Course Image */}
            {activeLesson.image && (
              <div className="w-full">
                <img
                  src={activeLesson.image}
                  alt={activeLesson.course_name}
                  className="w-full h-52 rounded-xl object-cover"
                />
              </div>
            )}

            {/* Course & Group Info */}
            <div className="text-center space-y-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {activeLesson.course_name}
              </h3>
              <p className="text-sm text-gray-600">{activeLesson.group_name}</p>
            </div>

            {/* Session Details */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Date:</span>
                <span className="text-sm text-gray-900">
                  {activeLesson.session_date}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Day:</span>
                <span className="text-sm text-gray-900">
                  {activeLesson.day_of_week}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Time:</span>
                <span className="text-sm text-gray-900">
                  {activeLesson.start_time} - {activeLesson.end_time}
                </span>
              </div>
            </div>

            {/* Zoom Link */}
            {activeLesson.zoom_meeting_link ? (
              <a
                href={activeLesson.zoom_meeting_link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
              >
                <Video className="w-5 h-5" />
                Join Zoom Meeting
              </a>
            ) : (
              <div className="text-center text-sm text-gray-500 bg-gray-50 rounded-xl p-4">
                No Zoom link available for this session.
              </div>
            )}
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
