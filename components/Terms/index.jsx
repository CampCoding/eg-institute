"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleGetTerms } from "../../libs/features/termsSlice";
import { Loader2 } from "lucide-react";

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

  if (!terms_data?.content) {
    return (
      <div className="flex items-center justify-center py-32 text-gray-400 text-lg">
        No terms available.
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-teal-50/30 min-h-screen py-16 px-6">
      <div
        className="max-w-4xl mx-auto prose prose-lg prose-teal"
        dangerouslySetInnerHTML={{ __html: terms_data.content }}
      />
    </div>
  );
}
