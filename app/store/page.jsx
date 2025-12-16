"use client";
import React, { useMemo, useState } from "react";
import {
  BookOpen,
  Package,
  Video,
  ShoppingCart,
  Star,
  Search,
  Heart,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Eye,
} from "lucide-react";
import StoreBanner from "@/components/Store/StoreBanner/StoreBanner";
import StoreCard from "@/components/Store/StoreCard/StoreCard";

const PRIMARY = "#02AAA0";
const PRIMARY_DARK = "#0E5F5B";
const PRIMARY_LIGHT = "#23C7BD";

const CATEGORIES = [
  { key: "all", label: "All Products", icon: <Sparkles className="w-4 h-4" /> },
  { key: "books", label: "Books", icon: <BookOpen className="w-4 h-4" /> },
  { key: "supplies", label: "Supplies", icon: <Package className="w-4 h-4" /> },
  { key: "videos", label: "Videos", icon: <Video className="w-4 h-4" /> },
];

const BOOK_FILTERS = [
  { key: "all", label: "All Books" },
  { key: "digital", label: "Digital Stories" },
  { key: "printed", label: "Printed stories" },
  { key: "scientific", label: "Scientific books" },
];

const PRODUCTS = [
  {
    id: "b1",
    type: "books",
    subtype: "scientific",
    title: "MSA Grammar Companion",
    desc: "Master Modern Standard Arabic with clear explanations, interactive drills, and comprehensive answer Keys.",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=600&fit=crop",
    rating: 4.8,
    price: 24.0,
    originalPrice: 32.0,
    tag: "Bestseller",
    reviews: 245,
    badge: "🏆",
  },
  {
    id: "b2",
    type: "books",
    subtype: "printed",
    title: "Egyptian Phrasebook",
    desc: "Essential everyday dialogues with accurate phonetics and cultural context. Your gateway to authentic Egyptian Arabic.",
    image:
      "https://images.unsplash.com/photo-1526312426976-593c2b9991f5?w=800&h=600&fit=crop",
    rating: 4.6,
    price: 18.5,
    originalPrice: 25.0,
    reviews: 189,
    badge: "📚",
  },
  {
    id: "b3",
    type: "books",
    subtype: "digital",
    title: "Digital Story Adventures",
    desc: "Engaging animated digital Arabic stories designed for young readers with audio narration.",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=600&fit=crop",
    rating: 4.7,
    price: 14.0,
    originalPrice: 20.0,
    reviews: 120,
    badge: "📖",
  },
  {
    id: "s1",
    type: "supplies",
    title: "Study Planner (Undated)",
    desc: "Premium undated planner with weekly layouts, habit tracker, and thick paper.",
    image:
      "https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?w=800&h=600&fit=crop",
    rating: 4.7,
    price: 12.0,
    originalPrice: 16.0,
    tag: "New",
    reviews: 98,
    badge: "✨",
  },
  {
    id: "s2",
    type: "supplies",
    title: "Flashcards Set (500 pcs)",
    desc: "Professional-grade flashcards with rounded corners and smooth finish.",
    image:
      "https://images.unsplash.com/photo-1511974035430-5de47d3b95da?w=800&h=600&fit=crop",
    rating: 4.5,
    price: 14.0,
    reviews: 156,
    badge: "🎯",
  },
  {
    id: "v1",
    type: "videos",
    title: "Advanced Syntax Masterclass",
    desc: "Comprehensive HD video lessons with interactive quizzes and downloadable PDF notes.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    rating: 4.9,
    price: 39.0,
    originalPrice: 55.0,
    tag: "Top Rated",
    reviews: 312,
    badge: "🚀",
  },
  {
    id: "v2",
    type: "videos",
    title: "Pronunciation Drills Pack",
    desc: "Intensive pronunciation training with minimal pairs, stress patterns, and rhythm practice.",
    image:
      "https://images.unsplash.com/photo-1520974722079-6ca4f3c6bbf0?w=800&h=600&fit=crop",
    rating: 4.7,
    price: 29.0,
    originalPrice: 40.0,
    reviews: 201,
    badge: "🎵",
  },
];

export default function StorePage() {
  const [active, setActive] = useState("all");
  const [q, setQ] = useState("");
  const [bookFilter, setBookFilter] = useState("all");

  const counts = useMemo(() => {
    const books = PRODUCTS.filter((p) => p.type === "books").length;
    const supplies = PRODUCTS.filter((p) => p.type === "supplies").length;
    const videos = PRODUCTS.filter((p) => p.type === "videos").length;
    return { all: PRODUCTS.length, books, supplies, videos };
  }, []);

  const items = useMemo(() => {
    let list =
      active === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.type === active);

    if (active === "books" && bookFilter !== "all") {
      list = list.filter((p) => p.subtype === bookFilter);
    }

    const term = q.trim().toLowerCase();
    if (term) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          (p.desc || "").toLowerCase().includes(term)
      );
    }

    return list;
  }, [active, q, bookFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6FAF8] via-white to-[#E6FAF8]">
      {/* Hero */}
      <StoreBanner
        q={q}
        setQ={setQ}
        active={active}
        setActive={setActive}
        PRIMARY={PRIMARY}
        PRIMARY_DARK={PRIMARY_DARK}
        PRODUCTS={PRODUCTS}
        PRIMARY_LIGHT={PRIMARY_LIGHT}
        counts={counts}
        CATEGORIES={CATEGORIES}
      />

      <main className="mx-auto max-w-7xl px-6 pb-20">
        {/* Conditional Book Subtype Filters */}
        {active === "books" && (
          <div className="flex gap-3 flex-wrap items-center justify-center mb-8">
            {BOOK_FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setBookFilter(f.key)}
                className={`px-4 py-2 rounded-full border font-medium text-sm transition-all ${
                  bookFilter === f.key
                    ? "bg-[#02AAA0] text-white border-[#02AAA0]"
                    : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        {/* Product Grid or Empty State */}
        {items.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-white/50 backdrop-blur-sm p-16 text-center text-slate-600 shadow-lg">
            <div
              className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: "#EEF9F8" }}
            >
              <Search className="w-8 h-8" style={{ color: PRIMARY }} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No products found
            </h3>
            <p>Try adjusting your search or browse different categories.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((p) => (
              <StoreCard
                key={p?.id}
                p={p}
                PRIMARY={PRIMARY}
                PRIMARY_DARK={PRIMARY_DARK}
                PRIMARY_LIGHT={PRIMARY_LIGHT}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
