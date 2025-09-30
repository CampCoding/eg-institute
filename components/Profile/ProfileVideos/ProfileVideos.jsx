import { Award, Play, Star, Video } from "lucide-react";
import React, { useMemo, useState } from "react";

const filters = [
  { key: "all", label: "All" },
  { key: "purchased_videos", label: "Purchased Videos" },
  { key: "watched_videos", label: "Watched Videos" },
];

const videos = [
  {
    id: "msa-adv-1",
    title: "Modern Standard Arabic: Advanced Syntax",
    description:
      "Master complex sentence structures, advanced connectors, and rhetorical devices used in news and formal media.",
    thumbnail:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=480&fit=crop",
    level: "Advanced",
    rating: 4.9,
    instructor: "Dr. Amira Hassan",
    completed: 31,
    total: 48,
    type: "purchaed", // typo handled below
  },
  {
    id: "dialect-egy-1",
    title: "Egyptian Dialect: Everyday Conversations",
    description:
      "Build fluency for daily life: greetings, directions, bargaining, and common social phrases.",
    thumbnail:
      "https://images.unsplash.com/photo-1520975682031-c83b66eb1eeb?w=800&h=480&fit=crop",
    level: "Intermediate",
    rating: 4.7,
    instructor: "Omar El-Sayed",
    completed: 12,
    total: 24,
    type: "watched",
  },
  {
    id: "pron-phon-1",
    title: "Pronunciation & Phonetics Essentials",
    description:
      "Train your ear with minimal pairs, vowel length, emphatics, and stress patterns to sound natural.",
    thumbnail:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=480&fit=crop",
    level: "Beginner",
    rating: 4.8,
    instructor: "Nour Fathy",
    completed: 5,
    total: 20,
    type: "purchaed", // typo handled below
  },
];

export default function ProfileVideos() {
  const [filter, setFilter] = useState("all");

  // normalize type: handle "purchaed" typo and return "purchased" | "watched"
  const normalizeType = (t = "") =>
    t === "purchaed" ? "purchased" : t;

  const counts = useMemo(() => {
    const purchased = videos.filter(v => normalizeType(v.type) === "purchased").length;
    const watched = videos.filter(v => normalizeType(v.type) === "watched").length;
    return {
      all: videos.length,
      purchased_videos: purchased,
      watched_videos: watched,
    };
  }, []);

  const filteredVideos = useMemo(() => {
    if (filter === "all") return videos;
    if (filter === "purchased_videos") {
      return videos.filter(v => normalizeType(v.type) === "purchased");
    }
    if (filter === "watched_videos") {
      return videos.filter(v => normalizeType(v.type) === "watched");
    }
    return videos;
  }, [filter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 p-6">
      <div className="flex mb-3 flex-col md:flex-row justify-between items-center">
        <div className="text-center">
          <div className="inline-flex items-center px-6 py-3 mb-4 text-sm font-bold tracking-wider text-teal-700 uppercase transition-all duration-300 bg-gradient-to-r from-teal-100 to-teal-200 rounded-full shadow-lg hover:shadow-xl hover:scale-105">
            <Video className="w-4 h-4 mr-2" />
            Videos
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center mx-auto gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={[
                "px-3 py-1.5 rounded-full text-sm font-medium border transition inline-flex items-center gap-2",
                filter === f.key
                  ? "bg-teal-600 text-white border-teal-600"
                  : "bg-white text-gray-700 border-gray-200 hover:border-teal-300",
              ].join(" ")}
            >
              {f.label}
              <span
                className={[
                  "min-w-[1.5rem] text-center rounded-full px-2 py-0.5 text-xs",
                  filter === f.key ? "bg-white/20" : "bg-gray-100 text-gray-700",
                ].join(" ")}
              >
                {counts[f.key]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {filteredVideos.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-600">
          No videos in this category yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredVideos.map((v) => {
            const progressPercentage = Math.round((v.completed / v.total) * 100);
            return (
              <div
                key={v.id}
                className="group h-full flex flex-col bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
              >
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={v.thumbnail}
                    alt={v.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      type="button"
                      aria-label={`Play preview: ${v.title}`}
                      className="bg-white/20 backdrop-blur-md rounded-full p-4 hover:bg-white/30 transition-colors duration-200"
                    >
                      <Play className="w-8 h-8 text-white fill-white" />
                    </button>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-white/20 backdrop-blur-sm">
                      {v.level}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-sm font-semibold">
                      {v.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors duration-200">
                    {v.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{v.description}</p>

                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">
                        Progress
                      </span>
                      <span className="text-sm font-bold text-teal-600">
                        {progressPercentage}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-500"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto">
                    <button
                      type="button"
                      className="w-full py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 text-white bg-gradient-to-r from-teal-600 to-emerald-600"
                    >
                      <Play className="w-4 h-4" />
                      Continue Learning
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
