"use client";
import { Search, Sparkles, TrendingUp } from "lucide-react";
import React, { useRef, useState } from "react";

export default function StoreBanner({
  PRODUCTS,
  active,
  q,
  setQ,
  setActive,
  counts,
  PRIMARY,
  PRIMARY_LIGHT,
  PRIMARY_DARK,
  CATEGORIES,
}) {
  const searchRef = useRef(null);

  return (
    <header className="relative overflow-hidden">
      {/* soft blobs in primary */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-40 bg-[radial-gradient(circle,rgba(2,170,160,0.25)_0%,transparent_60%)]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-40 bg-[radial-gradient(circle,rgba(35,199,189,0.25)_0%,transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="text-center">
          <div
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full text-white text-sm font-semibold shadow-lg"
            style={{
              backgroundImage: `linear-gradient(90deg, ${PRIMARY}, ${PRIMARY_LIGHT})`,
            }}
          >
            <Sparkles className="w-4 h-4" />
            Premium Learning Store
            <TrendingUp className="w-4 h-4" />
          </div>

          <h1 className="mt-3 flex flex-col pb-5 text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
            <span
              style={{
                backgroundImage: `linear-gradient(90deg, ${PRIMARY}, ${PRIMARY_DARK})`,
              }}
              className=" text-transparent bg-clip-text"
            >
              Elevate Your
            </span>
            <span
              className=" text-transparent bg-clip-text"
              style={{
                backgroundImage: `linear-gradient(90deg, ${PRIMARY}, ${PRIMARY_LIGHT})`,
              }}
            >
              Learning Journey
            </span>
          </h1>

          <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover premium books, supplies, and video courses crafted by
            experts.
          </p>

          {/* Stats */}
          <div className="mt-10 flex-wrap sm:flex-nowrap flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: PRIMARY }}
              />
              <span className="font-semibold text-slate-900">
                {PRODUCTS.length}+
              </span>{" "}
              Products
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: PRIMARY_LIGHT }}
              />
              <span className="font-semibold text-slate-900">4.7★</span> Avg.
              Rating
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: PRIMARY_DARK }}
              />
              <span className="font-semibold text-slate-900">1200+</span>{" "}
              Learners
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                ref={searchRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search for books, supplies, videos..."
                className="w-full rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm pl-12 pr-4 py-4 text-sm placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#02AAA0] focus:border-transparent shadow-lg shadow-slate-900/5 transition-all"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                onClick={() => setActive(c.key)}
                className={[
                  "group inline-flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform border",
                  active === c.key
                    ? "text-white scale-105 shadow-lg"
                    : "bg-white/80 backdrop-blur-sm text-slate-700 hover:shadow-md",
                ].join(" ")}
                style={
                  active === c.key
                    ? {
                        backgroundImage: `linear-gradient(90deg, ${PRIMARY}, ${PRIMARY_LIGHT})`,
                        borderColor: PRIMARY,
                      }
                    : { borderColor: "#e5e7eb" }
                }
              >
                <span
                  className={active === c.key ? "text-white" : ""}
                  style={active !== c.key ? { color: PRIMARY } : undefined}
                >
                  {c.icon}
                </span>
                {c.label}
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-bold"
                  style={
                    active === c.key
                      ? {
                          backgroundColor: "rgba(255,255,255,0.2)",
                          color: "white",
                        }
                      : { backgroundColor: "#ECFDF5", color: PRIMARY }
                  }
                >
                  {counts[c.key]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
