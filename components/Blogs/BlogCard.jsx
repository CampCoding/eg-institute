import React from "react";
import {
  Calendar,
  Clock,
  User,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  ArrowRight,
  TrendingUp,
  Star,
  PlayCircle,
  Headphones,
} from "lucide-react";
import Link from "next/link";

export default function BlogCard({
  post,
  isLiked,
  liked,
  isBookmarked,
  onLike,
  onComment,
  onBookmark,
}) {
  console.log(isLiked);

  return (
    <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] overflow-hidden flex flex-col h-full border border-gray-100">
      {/* Background Gradient Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
      ></div>

      {/* Special Badges */}
      <div className="absolute top-4 left-4 z-20 flex flex-col space-y-2">
        {post.trending && (
          <div className="flex items-center space-x-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse shadow-md">
            <TrendingUp className="w-3 h-3" />
            <span>Trending</span>
          </div>
        )}
        {post.featured && (
          <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
            <Star className="w-3 h-3 fill-white" />
            <span>Featured</span>
          </div>
        )}
      </div>

      {/* Media Type Icons */}
      <div className="absolute top-4 right-4 z-20 flex space-x-2">
        {post.hasVideo && (
          <div className="p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
            <PlayCircle className="w-4 h-4 text-white" />
          </div>
        )}
        {post.hasAudio && (
          <div className="p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
            <Headphones className="w-4 h-4 text-white" />
          </div>
        )}
      </div>

      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

        {/* Category & Level Badges */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white bg-white/20 backdrop-blur-md border border-white/20 shadow-sm`}
          >
            {post.category}
          </span>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white bg-black/30 backdrop-blur-md border border-white/10 shadow-sm`}
          >
            {post.level}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow relative z-10">
        {/* Meta Info Top */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 font-medium">
          <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-full text-teal-700">
            <Calendar className="w-3.5 h-3.5" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/blogs/${post.id}`}>
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors duration-300 line-clamp-2 leading-tight cursor-pointer">
            {post.title}
          </h3>
        </Link>

        {/* Arabic Title */}
        <p className="text-right text-teal-600 font-bold mb-3 font-arabic text-lg opacity-80 group-hover:opacity-100 transition-opacity">
          {post.titleArabic}
        </p>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Spacer to push Bottom Actions down */}
        <div className="flex-grow"></div>

        {/* Divider */}
        <div className="h-px w-full bg-gray-100 mb-4 group-hover:bg-teal-50 transition-colors"></div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {/* Like Button */}
            <button
              onClick={() => onLike(post.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 ${
                isLiked
                  ? "text-red-500 bg-red-50"
                  : "text-gray-500 hover:bg-red-50 hover:text-red-500"
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              <span className="text-sm font-semibold">{post.likes}</span>
            </button>

            {/* Comment Button */}
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-gray-500 hover:bg-blue-50 hover:text-blue-500 transition-all duration-300">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-semibold">
                {post.commentsCount}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Bookmark */}
            <button
              onClick={() => onBookmark(post.id)}
              className={`p-2 rounded-full transition-colors duration-300 ${
                isBookmarked
                  ? "text-yellow-500 bg-yellow-50"
                  : "text-gray-400 hover:text-yellow-500 hover:bg-yellow-50"
              }`}
            >
              <Bookmark
                className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
              />
            </button>

            {/* Read Button */}
            <Link
              href={`/blogs/${post.id}`}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300 transform group-hover:-rotate-45"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
