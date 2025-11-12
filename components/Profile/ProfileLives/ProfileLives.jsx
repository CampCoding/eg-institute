import { PictureInPicture } from "lucide-react";
import React from "react";

export default function ProfileLives() {
  // Mock data — replace with your API data
  const data = [
    {
      id: "live-1",
      name: "MSA Q&A: Advanced Syntax",
      start: "2025-08-04T17:00:00+02:00",
      end: "2025-08-04T18:00:00+02:00",
    },
    {
      id: "live-2",
      name: "Egyptian Dialect: Street Phrases",
      start: "2025-08-05T19:30:00+02:00",
      end: "2025-08-05T20:30:00+02:00",
    },
    {
      id: "live-3",
      name: "Pronunciation Drills: Emphatics",
      start: "2025-07-28T18:00:00+02:00",
      end: "2025-07-28T19:00:00+02:00",
    },
    {
      id: "live-4",
      name: "Media Arabic Headlines",
      start: "2025-08-04T21:00:00+02:00",
      end: "2025-08-04T22:00:00+02:00",
    },
  ];

  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("all"); // "all" | "live" | "upcoming" | "completed"

  // Helpers
  const getStatus = (item) => {
    const now = new Date();
    const start = new Date(item.start);
    const end = new Date(item.end);
    if (now >= start && now <= end) return "live";
    if (now < start) return "upcoming";
    return "completed";
  };

  const isEnded = (item) => new Date(item.end) < new Date();

  const statusStyles = {
    live: "bg-red-100 text-red-700 border border-red-200",
    upcoming: "bg-amber-100 text-amber-700 border border-amber-200",
    completed: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  };

  const filters = [
    { key: "all", label: "All" },
    { key: "live", label: "Live Now" },
    { key: "upcoming", label: "Upcoming" },
    { key: "completed", label: "Completed" },
  ];

  const formatRange = (startISO, endISO) => {
    const start = new Date(startISO);
    const end = new Date(endISO);
    const sameDay = start.toDateString() === end.toDateString();
    const dateStr = start.toLocaleDateString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const startTime = start.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
    const endTime = end.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
    return sameDay
      ? `${dateStr} • ${startTime}–${endTime}`
      : `${dateStr} → ${end.toLocaleString()}`;
  };

  const filtered = data
    .map((item) => ({ ...item, status: getStatus(item) }))
    .filter((item) => (filter === "all" ? true : item.status === filter))
    .filter((item) =>
      item.name.toLowerCase().includes(search.trim().toLowerCase())
    )
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 p-6">
      {/* Header */}
      <div className="mb-3 text-center">
        <div className="inline-flex items-center px-6 py-3 mb-4 text-sm font-bold tracking-wider text-teal-700 uppercase transition-all duration-300 bg-gradient-to-r from-teal-100 to-teal-200 rounded-full shadow-lg hover:shadow-xl hover:scale-105">
          <PictureInPicture className="w-4 h-4 mr-2" />
          Lives
        </div>
      </div>

      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-center gap-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={[
                  "px-3 py-1.5 rounded-full text-sm font-medium border transition",
                  filter === f.key
                    ? "bg-teal-600 text-white border-teal-600"
                    : "bg-white text-gray-700 border-gray-200 hover:border-teal-300",
                ].join(" ")}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => {
          const status = getStatus(item);
          const ended = isEnded(item);

          return (
            <div
              key={item.id}
              className="group hover:scale-105 h-full flex flex-col bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div
                className={[
                  "h-1 w-full",
                  status === "live"
                    ? "bg-red-500"
                    : status === "upcoming"
                    ? "bg-amber-500"
                    : "bg-emerald-500",
                ].join(" ")}
              />

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-teal-700 transition-colors">
                    {item.name}
                  </h3>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyles[status]}`}
                  >
                    {status === "live"
                      ? "Live"
                      : status === "upcoming"
                      ? "Upcoming"
                      : "Completed"}
                  </span>
                </div>

                <div className="mb-3 text-sm text-gray-600">
                  <div className="font-medium text-gray-700">Schedule</div>
                  <div>{formatRange(item.start, item.end)}</div>
                </div>

                <div className="mb-6">
                  <div
                    className={`inline-flex items-center gap-2 text-xs font-medium px-2.5 py-1 rounded-full border
                    ${
                      ended
                        ? "bg-gray-100 text-gray-700 border-gray-200"
                        : "bg-teal-50 text-teal-700 border-teal-200"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        ended ? "bg-gray-400" : "bg-teal-500"
                      }`}
                    />
                    {ended ? "Finished" : "In Progress"}
                  </div>
                </div>

                <div className="mt-auto flex items-center gap-3">
                  {status === "live" ? (
                    <button
                      type="button"
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold px-4 py-2.5 hover:scale-[1.02] hover:shadow-md transition-all"
                    >
                      Join Now
                    </button>
                  ) : status === "upcoming" ? (
                    <button
                      type="button"
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-semibold px-4 py-2.5 hover:scale-[1.02] hover:shadow-md transition-all"
                    >
                      Remind Me
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="flex-1 whitespace-nowrap inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold px-4 py-2.5 hover:scale-[1.02] hover:shadow-md transition-all"
                    >
                      View Recording
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-full">
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-600">
              No lives match your filters.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
