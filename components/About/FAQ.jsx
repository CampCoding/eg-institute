"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  Search,
  HelpCircle,
  Filter,
  X,
} from "lucide-react";
import SmartIcon from "@/libs/shared/SmartIcon";

const FAQ = ({ faqs = [], categories = [] }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Build categories list with "All" prepended
  const allCategoriesOption = {
    category_id: "all",
    name: "All Questions",
    icon: "help-icon",
  };

  const categoryColors = [
    "from-[#023f4d] to-teal-600",
    "from-[#023f4d] to-cyan-600",
    "from-[#023f4d] to-emerald-600",
    "from-[#023f4d] to-teal-700",
    "from-[#023f4d] to-cyan-700",
    "from-[#023f4d] to-[#035a6d]",
  ];

  const enrichedCategories = [
    { ...allCategoriesOption, color: "from-[#023f4d] to-[#035a6d]" },
    ...categories.map((cat, i) => ({
      ...cat,
      color: categoryColors[i % categoryColors.length],
    })),
  ];

  // Filter FAQ based on search and category
  const filteredFAQ = faqs.filter((item) => {
    const matchesSearch = item.question
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      String(item.category_id) === String(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Count items per category
  const getCategoryCount = (categoryId) => {
    if (categoryId === "all") return faqs.length;
    return faqs.filter(
      (item) => String(item.category_id) === String(categoryId)
    ).length;
  };

  // Get category info by category_id
  const getCategoryInfo = (categoryId) => {
    return (
      enrichedCategories.find(
        (cat) => String(cat.category_id) === String(categoryId)
      ) || enrichedCategories[0]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#023f4d] to-teal-600 rounded-3xl mb-6 shadow-lg">
            <HelpCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-[#023f4d] mb-6 leading-tight">
            Frequently Asked
            <span className="block bg-gradient-to-r from-[#023f4d] to-teal-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our Arabic language courses
            and programs.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-12 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                <Search className="w-5 h-5 text-[#023f4d]" />
              </div>
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#023f4d] focus:border-transparent transition-all duration-300 shadow-sm"
              />
            </div>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden flex items-center justify-center gap-2 px-6 py-4 bg-[#023f4d] text-white rounded-xl hover:bg-[#035a6d] transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filter Categories
            </button>
          </div>

          {/* Category Filters - Desktop */}
          <div className="hidden md:flex flex-wrap gap-3">
            {enrichedCategories.map((category) => {
              const isActive =
                String(selectedCategory) === String(category.category_id);
              const count = getCategoryCount(category.category_id);

              return (
                <button
                  key={category.category_id}
                  onClick={() => setSelectedCategory(category.category_id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 ${isActive
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg transform scale-105`
                    : "bg-white text-gray-600 hover:text-[#023f4d] hover:bg-gray-50 border border-gray-200"
                    }`}
                >
                  {/* <SmartIcon
                    icon={category.icon}
                    className="w-4 h-4"
                    alt={category.name}
                  /> */}
                  <span>{category.name}</span>
                  <span
                    className={`ml-1 px-2 py-0.5 text-xs rounded-full ${isActive ? "bg-white/20" : "bg-gray-100"
                      }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Category Filters - Mobile */}
          {isFilterOpen && (
            <div
              className="md:hidden fixed inset-0 z-50 bg-black/50"
              onClick={() => setIsFilterOpen(false)}
            >
              <div
                className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-[#023f4d]">
                    Filter by Category
                  </h3>
                  <button onClick={() => setIsFilterOpen(false)}>
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <div className="space-y-2">
                  {enrichedCategories.map((category) => {
                    const isActive =
                      String(selectedCategory) === String(category.category_id);
                    const count = getCategoryCount(category.category_id);

                    return (
                      <button
                        key={category.category_id}
                        onClick={() => {
                          setSelectedCategory(category.category_id);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                          ? `bg-gradient-to-r ${category.color} text-white`
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                          }`}
                      >
                        {/* <SmartIcon
                          icon={category.icon}
                          className="w-5 h-5"
                          alt={category.name}
                        /> */}
                        <span className="flex-1 text-left">
                          {category.name}
                        </span>
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full ${isActive ? "bg-white/20" : "bg-gray-200"
                            }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FAQ Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12 items-start">
          {filteredFAQ.map((item, index) => {
            const categoryInfo = getCategoryInfo(item.category_id);

            return (
              <div
                key={item.faq_id || index}
                className={`bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-lg ${openIndex === index
                  ? "shadow-xl ring-2 ring-[#023f4d]/20"
                  : "shadow-sm"
                  }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left focus:outline-none group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {/* <div
                          className={`p-1.5 rounded-lg bg-gradient-to-r ${categoryInfo?.color || "from-gray-400 to-gray-500"
                            }`}
                        >
                          {/* <SmartIcon
                            icon={categoryInfo?.icon}
                            className="w-4 h-4 text-white"
                            alt={categoryInfo?.name}
                          /> 
                      </div> */}
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {categoryInfo?.name || "General"}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-[#023f4d] group-hover:text-teal-700 transition-colors duration-300">
                        {index + 1}. {item.question}
                      </h3>
                    </div>
                    <div className="mt-1 p-2 rounded-lg bg-gray-50 group-hover:bg-[#023f4d] transition-all duration-300">
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 group-hover:text-white transition-all duration-300 ${openIndex === index ? "rotate-180" : ""
                          }`}
                      />
                    </div>
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ${openIndex === index
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                    }`}
                >
                  {item.answer && (
                    <div className="px-6 pb-6 -mt-2 overflow-y-auto max-h-[400px] custom-scrollbar">
                      <div
                        className="text-gray-600 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: item.answer }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {
          filteredFAQ.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-[#023f4d] mb-2">
                No results found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or browse all questions.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="px-6 py-3 bg-[#023f4d] text-white rounded-lg hover:bg-[#035a6d] transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )
        }
      </div >

      {/* Custom scrollbar styles */}
      < style jsx > {`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #023f4d;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #035a6d;
        }
      `}</style >
    </div >
  );
};

export default FAQ;