"use client";
import {
  ShoppingCart,
  Book,
  Video,
  PackageOpen,
  Star,
  Search,
  Filter
} from "lucide-react";
import React, { useState, useMemo } from "react";

function PurchaseCard({ item, PRIMARY, PRIMARY_DARK }) {
  return (
    <article className="group bg-white rounded-3xl border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-slate-800 mb-1">{item.title}</h3>
        <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          {item.rating.toFixed(1)} · {item.reviews} reviews
        </div>
        <p className="text-sm text-slate-500 flex-1">{item.desc}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm font-bold" style={{ color: PRIMARY }}>
            ${item.price.toFixed(2)}
          </span>
          <span
            className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border"
            style={{
              backgroundColor: "#F0FBFA",
              color: PRIMARY_DARK,
              borderColor: "#CFF3EF",
            }}
          >
            {item.type === "books"
              ? "📚 Book"
              : item.type === "supplies"
              ? "📝 Supply"
              : "🎥 Video"}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function ProfilePurchases() {
  const PRIMARY = "#02AAA0";
  const PRIMARY_DARK = "#028D86";

  const purchases = [
    {
      id: 1,
      title: "Arabic Grammar for Beginners",
      type: "books",
      image: "/images/banner.png",
      rating: 4.8,
      reviews: 120,
      desc: "A comprehensive introduction to Arabic grammar rules.",
      price: 14.99,
    },
    {
      id: 2,
      title: "Learn Arabic Letters",
      type: "videos",
      image: "/images/teacher-and-his-students.jpg",
      rating: 4.7,
      reviews: 89,
      desc: "Master the Arabic alphabet with this video course.",
      price: 12.0,
    },
    {
      id: 3,
      title: "Arabic Calligraphy Set",
      type: "supplies",
      image:
        "/image/rear-view-young-college-student-paying-attention-listening-her-online-teacher-laptop-home-scaled.jpg",
      rating: 4.9,
      reviews: 34,
      desc: "Premium pen set for Arabic handwriting practice.",
      price: 19.99,
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredPurchases = useMemo(() => {
    return purchases.filter((item) => {
      const matchesType = filterType === "all" || item.type === filterType;
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [searchTerm, filterType, purchases]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col  sm:items-center sm:justify-between gap-4">
          <div className="inline-flex items-center  justify-center w-fit mx-auto px-6 py-3 text-sm font-bold tracking-wider text-teal-700 uppercase transition-all duration-300 bg-gradient-to-r from-teal-100 to-teal-200 rounded-full shadow-lg hover:shadow-xl hover:scale-105">
            <ShoppingCart className="w-4 h-4 mr-2" />
            My Purchases
          </div>

          {/* Search + Filter */}
          <div className="flex flex-col   sm:flex-row justify-between gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search purchases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm appearance-none bg-white relative"
            >
              <option value="all">All</option>
              <option value="books">Books</option>
              <option value="videos">Videos</option>
              <option value="supplies">Supplies</option>
            </select>
          </div>
        </div>

        {/* Cards Grid */}
        {filteredPurchases.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPurchases.map((item) => (
              <PurchaseCard
                key={item.id}
                item={item}
                PRIMARY={PRIMARY}
                PRIMARY_DARK={PRIMARY_DARK}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-500 mt-12">
            No purchases match your search or filter.
          </div>
        )}
      </div>
    </div>
  );
}
