"use client";

import React, { useMemo, useState, useEffect, useCallback } from "react";
import {
  BarChart3,
  BookOpen,
  Download,
  ExternalLink,
  Heart,
  Star,
  X,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { handleGetAllCoursePDFS } from "../../../../../libs/features/profile";
import { Spin } from "antd";


function safeParse(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch {
    return null;
  }
}

export default function ProfileCoursesBooks({
  books,
  setIsBookmarked,
  isBookmarked,
  animateProgress,
}) {
  const [previewBook, setPreviewBook] = useState(null);

  const searchParams = useSearchParams()
  const group_id = searchParams.get("group_id");

  const dispatch = useDispatch();
  const { all_course_pdfs_loading, all_course_pdfs_list } = useSelector(state => state?.profile)

  const adminData = useMemo(() => {
    if (typeof window === "undefined") return null;

    const raw =
      localStorage.getItem("eg_user_data") ||
      sessionStorage.getItem("eg_user_data");

    console.log("raw")

    if (!raw) return null;

    return safeParse(raw) || null;
  }, []);

  const student_id = adminData?.student_id;

  useEffect(() => {
    if (!group_id || !student_id) return;

    dispatch(
      handleGetAllCoursePDFS({
        data: {
          group_id,
          student_id,
        },
      })
    );
  }, [dispatch, group_id, student_id]);

  const pdfs = useMemo(() => {
    const payload = all_course_pdfs_list;

    // احتمالات شائعة حسب الـ API
    const maybe =
      payload?.data?.message ??
      payload?.data?.data ??
      payload?.data ??
      payload?.message ??
      payload;

    // لو object واحد مش array
    if (maybe && !Array.isArray(maybe) && typeof maybe === "object") return [maybe];

    // لو array
    if (Array.isArray(maybe)) return maybe;

    // غير كده: فاضي
    return [];
  }, [all_course_pdfs_list]);

  const isEmpty = pdfs?.length === 0;


  const openModal = (book) => {
    if (!book?.pdfUrl) return;
    setPreviewBook(book);
    // Lock background scroll while modal is open
    document.documentElement.style.overflow = "hidden";
  };

  const closeModal = useCallback(() => {
    setPreviewBook(null);
    document.documentElement.style.overflow = "";
  }, []);

  // ESC to close
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && previewBook) closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [previewBook, closeModal]);

  // Build PDF.js viewer URL (using CDN). You can self-host if you prefer.
  const viewerSrc = useMemo(() => {
    if (!previewBook?.pdfUrl) return "";
    const viewer = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.7.76/web/viewer.html";
    return `${viewer}?file=${encodeURIComponent(previewBook.pdfUrl)}`;
  }, [previewBook]);

  const handleOpenInNewTab = () => {
    if (previewBook?.pdfUrl) {
      window.open(previewBook.pdfUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleDownload = () => {
    if (!previewBook?.pdfUrl) return;
    const a = document.createElement("a");
    a.href = previewBook.pdfUrl;
    a.download = previewBook.title ? `${previewBook.title}.pdf` : "file.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  if (all_course_pdfs_loading) {
    return (
      <div className="flex justify-center items-center">
        <Spin size="large" spinning />
      </div>
    )
  }

  return (
    <>
      <div>
        {isEmpty ? (
          <div className="col-span-full bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-3xl p-10 text-center">
            <BookOpen className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-semibold">No PDFs available yet</p>
            <p className="text-gray-400 text-sm mt-1">
              Once PDFs are uploaded for this group, they’ll appear here.
            </p>
          </div>
        ) : (
          <div  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {pdfs?.map((book) => (
            <div
              key={book.pdf_id}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-2 border-transparent hover:border-[#02AAA0]/30 overflow-hidden"
            >
              {/* Cover */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={book?.pdf_image || "/placeholder.jpg"}
                  alt={book?.pdf_title || "PDF"}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute top-4 right-4 flex gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#C9AE6C]/90 to-[#C9AE6C]/70 backdrop-blur-sm border border-white/20">
                    PDF
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#02AAA0] transition-colors duration-300 line-clamp-2">
                  {book?.pdf_title || "Untitled PDF"}
                </h3>

                {/* Actions (لو عايز ترجعها) */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() =>
                      window.open(book?.pdf_url, "_blank", "noopener,noreferrer")
                    }
                    disabled={!book?.pdf_url}
                    className={`flex-1 bg-gradient-to-r from-[#02AAA0] to-[#02AAA0]/90 text-white py-3 rounded-2xl font-bold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 ${book?.pdf_url ? "" : "opacity-60 cursor-not-allowed"
                      }`}
                  >
                    <BookOpen className="w-5 h-5" />
                    Preview
                  </button>

                  {/* <a
            href={book?.pdf_url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 py-3 rounded-2xl font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center justify-center ${
              book?.pdf_url ? "" : "pointer-events-none opacity-50"
            }`}
            title="Open in new tab"
          >
            <ExternalLink className="w-5 h-5" />
          </a> */}
                </div>
              </div>
            </div>
          ))}
          </div>
        )}

      </div>

      {/* PDF Modal */}
      {previewBook && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-6xl bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b">
              <div className="min-w-0">
                <div className="text-xs text-gray-500">PDF Preview</div>
                <h4 className="text-lg sm:text-xl font-semibold truncate">{previewBook.title}</h4>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={previewBook.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 inline-flex items-center gap-2"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline">Open</span>
                </a>
                <button
                  onClick={handleDownload}
                  className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 inline-flex items-center gap-2"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download</span>
                </button>
                <button
                  onClick={closeModal}
                  className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Viewer */}
            <div className="w-full" style={{ height: "min(80vh, 900px)" }}>
              <iframe
                key={previewBook.pdfUrl}
                src={`https://cdn.jsdelivr.net/npm/pdfjs-dist@4.7.76/web/viewer.html?file=${encodeURIComponent(
                  previewBook.pdfUrl
                )}`}
                title="PDF Viewer"
                className="w-full h-full"
                style={{ border: 0 }}
                allow="clipboard-write; fullscreen"
              />
            </div>

            <div className="px-4 sm:px-6 py-3 border-t text-xs sm:text-sm text-gray-500">
              Tip: Use the viewer toolbar (zoom, search, print, thumbnails).
            </div>
          </div>
        </div>
      )}
    </>
  );
}
