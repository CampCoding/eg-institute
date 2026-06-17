import { Sparkles, TrendingUp, Search } from "lucide-react";
import React from "react";

const PRIMARY = "#02AAA0";
const PRIMARY_DARK = "#0E5F5B";
const PRIMARY_LIGHT = "#23C7BD";

export default function ExamBanner() {
  return (
    <div className="relative overflow-hidden">
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
        </div>
      </div>
    </div>
  );
}
