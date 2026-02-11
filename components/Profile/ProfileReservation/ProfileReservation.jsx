import React, { useEffect, useState } from "react";
import {
  CalendarFold,
  CalendarClock,
  Clock,
  UserRound,
  Eye,
  Trash2,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Video,
  Building,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { handleGetAllMyReservations } from "../../../libs/features/profile";
import { Spin } from "antd";

export default function ProfileReservation() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  
  // Safely get user data from localStorage/sessionStorage
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localData = localStorage.getItem("eg_user_data");
      const sessionData = sessionStorage.getItem("eg_user_data");
      const parsedData = JSON.parse(localData || sessionData || "null");
      setUserData(parsedData);
    }
  }, []);
  
  const dispatch = useDispatch();
  const { all_reservations_list, all_reservations_loading } = useSelector(state => state?.profile);

  useEffect(() => {
    if (userData?.student_id) {
      dispatch(handleGetAllMyReservations({
        data: {
          student_id: userData.student_id,
        }
      }));
    }
  }, [dispatch, userData]);

  console.log("all_reservations_list", all_reservations_list);

  // Transform API data to match component structure
  const transformReservationData = (apiData) => {
    if (!apiData?.data?.message) return [];
    
    return apiData.data.message.map((item, index) => {
      // Map status from API to our status types
      let status = item.status?.toLowerCase() || 'pending';
      
      // Extract date and time
      const meetingDate = item.meeting_date;
      const meetingTime = item.meeting_time;
      const startDateTime = meetingDate && meetingTime 
        ? `${meetingDate}T${meetingTime}` 
        : new Date().toISOString();

      return {
        id: item.meeting_resrvations_id || index,
        teacher: {
          name: item.teacher_name || "Instructor",
          avatar: item.teacher_avatar || "",
        },
        title: item.course_name || "Arabic Course",
        note: item.note || "",
        start: startDateTime,
        durationMin: item.duration_minutes || 60,
        mode: item.meeting_type === 'zoom' ? 'Online' : item.meeting_type || 'In Person',
        status: status,
        priority: item.priority || "normal",
        meeting_type: item.meeting_type,
        course_id: item.course_id,
        student_id: item.student_id,
      };
    });
  };

  const reservations = transformReservationData(all_reservations_list);

  const statusStyles = {
    pending: {
      ring: "ring-amber-300",
      left: "before:bg-amber-400",
      dot: "bg-amber-500",
      pill: "bg-amber-50 text-amber-700 border-amber-200",
      icon: <AlertTriangle className="w-4 h-4" />,
      label: "Pending",
      color: "border-amber-200",
      bg: "bg-amber-50/50",
    },
    accepted: {
      ring: "ring-teal-300",
      left: "before:bg-teal-400",
      dot: "bg-teal-500",
      pill: "bg-teal-50 text-teal-700 border-teal-200",
      icon: <CheckCircle2 className="w-4 h-4" />,
      label: "Accepted",
      color: "border-teal-200",
      bg: "bg-teal-50/50",
    },
    completed: {
      ring: "ring-emerald-300",
      left: "before:bg-emerald-500",
      dot: "bg-emerald-600",
      color: "border-emerald-200",
      pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: <CheckCircle2 className="w-4 h-4" />,
      label: "Completed",
      bg: "bg-emerald-50/50",
    },
    rejected: {
      ring: "ring-rose-300",
      left: "before:bg-rose-500",
      dot: "bg-rose-600",
      color: "border-rose-200",
      pill: "bg-rose-50 text-rose-700 border-rose-200",
      icon: <XCircle className="w-4 h-4" />,
      label: "Rejected",
      bg: "bg-rose-50/50",
    },
    canceled: {
      ring: "ring-rose-300",
      left: "before:bg-rose-500",
      dot: "bg-rose-600",
      color: "border-rose-200",
      pill: "bg-rose-50 text-rose-700 border-rose-200",
      icon: <XCircle className="w-4 h-4" />,
      label: "Canceled",
      bg: "bg-rose-50/50",
    },
  };

  const filters = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "accepted", label: "Accepted" },
    { key: "completed", label: "Completed" },
    { key: "rejected", label: "Rejected" },
    // { key: "canceled", label: "Canceled" },
  ];

  const formatDate = (dateString) => {
    if (!dateString) return "Date not set";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (error) {
      return dateString;
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return "Time not set";
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (error) {
      return dateString;
    }
  };

  const formatWhen = (iso) => {
    if (!iso) return "";
    try {
      const d = new Date(iso);
      const now = new Date();
      const diff = (d - now) / 1000; // seconds
      const abs = Math.abs(diff);
      const mins = Math.round(abs / 60);
      const hours = Math.round(abs / 3600);
      const days = Math.round(abs / 86400);
      
      if (abs < 60) return "just now";
      if (mins < 60) return diff > 0 ? `in ${mins} min` : `${mins} min ago`;
      if (hours < 24) return diff > 0 ? `in ${hours} h` : `${hours} h ago`;
      if (days < 30) return diff > 0 ? `in ${days} d` : `${days} d ago`;
      return formatDate(iso);
    } catch (error) {
      return "";
    }
  };

  const getMeetingTypeIcon = (mode) => {
    if (mode === 'Online' || mode === 'zoom') {
      return <Video className="w-4 h-4" />;
    }
    return <Building className="w-4 h-4" />;
  };

  const filtered = reservations
    .filter((r) => (filter === "all" ? true : r.status === filter))
    .filter((r) => {
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return (
        (r.title || "").toLowerCase().includes(q) ||
        (r.teacher?.name || "").toLowerCase().includes(q) ||
        (r.note || "").toLowerCase().includes(q)
      );
    })
    .sort((a, b) => new Date(b.start) - new Date(a.start));

  const handleDeleteReservation = (reservationId) => {
    console.log("Delete reservation:", reservationId);
  };

  const handleViewReservation = (reservation) => {
    console.log("View reservation:", reservation);
  };

  if (all_reservations_loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" spinning={all_reservations_loading} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center px-4 py-2 text-sm font-bold tracking-wide text-teal-700 bg-gradient-to-r from-teal-100 to-teal-200 rounded-full shadow">
            <CalendarFold className="w-4 h-4 mr-2" />
            My Reservations
            <span className="ml-2 px-2 py-0.5 bg-white/50 rounded-full text-xs">
              {filtered.length}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search reservations…"
              className="w-64 max-w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 pl-10 text-sm outline-none focus:ring-2 focus:ring-teal-500"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters?.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={[
                  "px-3 py-1.5 rounded-full text-sm font-medium border transition-all",
                  filter === f.key
                    ? "bg-teal-600 text-white border-teal-600 shadow-md"
                    : "bg-white text-gray-700 border-gray-200 hover:border-teal-300 hover:bg-teal-50",
                ].join(" ")}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filtered?.length > 0 ? (
          filtered.map((r) => {
            const s = statusStyles[r?.status] || statusStyles?.pending;
            return (
              <div
                key={r.id}
                className={`
                  relative bg-white rounded-2xl border-l-4 ${s?.color}
                  border border-gray-100 shadow-sm hover:shadow-md 
                  transition-all p-4 md:p-6
                `}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  {/* Avatar */}
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-white flex items-center justify-center ring-2 ring-teal-100 overflow-hidden flex-shrink-0">
                      {r.teacher?.avatar ? (
                        <img
                          src={r.teacher.avatar}
                          alt={r.teacher.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <UserRound className="w-6 h-6" />
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* <h3 className="text-lg font-semibold text-gray-900">
                        {r?.title}
                      </h3> */}
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${s?.pill}`}>
                        {s?.icon}
                        {s?.label}
                      </span>
                    </div>

                    {/* Meta Information */}
                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="inline-flex items-center gap-1.5">
                        <CalendarFold className="w-4 h-4 text-gray-400" />
                        <span>{formatDate(r.start)}</span>
                      </div>
                      <div className="inline-flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{formatTime(r.start)}</span>
                        <span className="text-xs text-gray-400">
                          ({formatWhen(r.start)})
                        </span>
                      </div>
                      <div className="inline-flex items-center gap-1.5">
                        {getMeetingTypeIcon(r.mode)}
                        <span className="capitalize">{r.mode}</span>
                      </div>
                    </div>

                    {/* Note */}
                    {r.note && (
                      <p className="mt-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-600 border border-gray-100">
                        <span className="font-medium">Note:</span> {r.note}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  {/* <div className="flex items-center gap-2 md:ml-auto">
                    {r.status === 'accepted' && (
                      <button
                        onClick={() => handleViewReservation(r)}
                        className="p-2 rounded-lg hover:bg-teal-50 text-gray-600 hover:text-teal-600 transition-colors"
                        title="Join Meeting"
                      >
                        <Video className="w-5 h-5" />
                      </button>
                    )}
                    {(r.status === 'pending' || r.status === 'accepted') && (
                      <button
                        onClick={() => handleDeleteReservation(r.id)}
                        className="p-2 rounded-lg hover:bg-rose-50 text-gray-600 hover:text-rose-600 transition-colors"
                        title="Cancel Reservation"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div> */}
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white/50 backdrop-blur-sm p-12 text-center">
            <div className="flex flex-col items-center gap-3">
              <CalendarFold className="w-12 h-12 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-700">No reservations found</h3>
              <p className="text-gray-500 max-w-md">
                {query || filter !== 'all' 
                  ? "No reservations match your current filters. Try adjusting your search criteria."
                  : "You don't have any reservations yet. Book your first lesson to get started!"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}