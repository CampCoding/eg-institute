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

export default function ProfileCoursesBooks({
  books,
  setIsBookmarked,
  isBookmarked,
  animateProgress,
}) {
  const [previewBook, setPreviewBook] = useState(null);

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

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {books.map((book) => (
          <div
            key={book.id}
            className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-2 border-transparent hover:border-[#02AAA0]/30 overflow-hidden"
          >
            {/* Cover */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Badges */}
              <div className="absolute top-4 left-4">
                <span className="px-4 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#02AAA0]/90 to-[#02AAA0]/70 backdrop-blur-sm border border-white/20">
                  {book.category}
                </span>
              </div>

              <div className="absolute top-4 right-4 flex gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#C9AE6C]/90 to-[#C9AE6C]/70 backdrop-blur-sm border border-white/20">
                  {book.format}
                </span>
                <div className="flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs font-bold text-white">{book.rating}</span>
                </div>
              </div>

              {/* Overlay info */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-white/90 text-sm mb-2">
                  {book.pages} pages • {book.size}
                </div>
                <div className="text-white/70 text-xs">Last read: {book.lastRead}</div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#02AAA0] transition-colors duration-300 line-clamp-2">
                {book.title}
              </h3>
              <p className="text-gray-600 mb-4 font-medium">by {book.author}</p>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[#C9AE6C]" />
                    <span className="font-semibold text-gray-700">Reading Progress</span>
                  </div>
                  <span className="text-xl font-black text-[#02AAA0]">{book.progress}%</span>
                </div>
                <div className="relative w-full bg-gray-100 rounded-full h-4 shadow-inner overflow-hidden">
                  <div
                    className={`bg-gradient-to-r from-[#02AAA0] to-[#C9AE6C] h-4 rounded-full transition-all duration-700 shadow-sm ${
                      animateProgress ? "animate-pulse" : ""
                    }`}
                    style={{ width: `${book.progress}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse opacity-50" />
                  </div>
                </div>
                <div className="flex justify-between text-sm mt-3">
                  <span className="text-gray-500 flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {book.completedChapters} of {book.chapters} chapters
                  </span>
                  <span className="text-[#02AAA0] font-bold">
                    {Math.max(0, (book.chapters || 0) - (book.completedChapters || 0))} remaining
                  </span>
                </div>
              </div>

              {/* Actions */}
              {/* <div className="flex gap-3">
                <button
                  onClick={() => openModal(book)}
                  disabled={!book.pdfUrl}
                  className={`flex-1 bg-gradient-to-r from-[#02AAA0] to-[#02AAA0]/90 text-white py-4 rounded-2xl font-bold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group ${
                    book.pdfUrl ? "" : "opacity-60 cursor-not-allowed"
                  }`}
                >
                  <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Continue Reading
                </button>

                {typeof setIsBookmarked === "function" && (
                  <button
                    onClick={() => setIsBookmarked?.(!isBookmarked)}
                    className={`px-4 py-4 rounded-2xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center ${
                      isBookmarked ? "bg-rose-100 text-rose-600" : "bg-gray-100 text-gray-600"
                    }`}
                    title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
                  >
                    <Heart className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`} />
                  </button>
                )}
              </div> */}
            </div>
          </div>
        ))}
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
