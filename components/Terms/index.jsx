"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleGetTerms } from "../../libs/features/termsSlice";
import { Loader2, BookOpen, ChevronRight } from "lucide-react";

function TermCard({ term, index }) {
  const isEven = index % 2 === 0;
  return (
    <div
      className={`flex flex-col ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      } gap-10 items-center py-16 px-6 border-b border-gray-100 last:border-0`}
    >
      {/* Number badge side */}
      <div className="flex-shrink-0 w-24 h-24 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-xl">
        <span className="text-3xl font-black text-white">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
          <BookOpen className="w-4 h-4" />
          <span>Term {index + 1}</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-snug">
          {term.title}
        </h2>

        <div className="text-gray-600 leading-relaxed text-base whitespace-pre-line">
          {term.content || term.description || term.details || term.body || ""}
        </div>
      </div>
    </div>
  );
}

export default function Terms() {
  const dispatch = useDispatch();
  const { terms_data, terms_loading, terms_error } = useSelector(
    (state) => state.terms
  );

  useEffect(() => {
    dispatch(handleGetTerms());
  }, [dispatch]);

  if (terms_loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-10 h-10 animate-spin text-teal-500" />
      </div>
    );
  }

  if (terms_error) {
    return (
      <div className="flex items-center justify-center py-32 text-red-500 text-lg">
        Failed to load terms. Please try again later.
      </div>
    );
  }

  const list = Array.isArray(terms_data) ? terms_data : [];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-teal-50/30 min-h-screen">
      <div className="max-w-5xl mx-auto divide-y divide-gray-100">
        {list.length === 0 ? (
          <div className="text-center py-32 text-gray-400 text-lg">
            No terms available.
          </div>
        ) : (
          list.map((term, index) => (
            <TermCard key={term.id ?? index} term={term} index={index} />
          ))
        )}
      </div>
    </div>
  );
}
