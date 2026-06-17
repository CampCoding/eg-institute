"use client";
import React from "react";
import {
  Calendar,
  Clock,
  User,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  ArrowLeft,
  Quote,
} from "lucide-react";
import { Avatar, Divider, Spin, Empty } from "antd";
import Link from "next/link";
import toast from "react-hot-toast";

import { motion, AnimatePresence } from "framer-motion";

export default function BlogDetails({
  post,
  loading,
  error,
  onLike,
  onComment,
  isLikeLoading,
  isCommentLoading,
}) {
  const [commentValue, setCommentValue] = React.useState("");

  // Safer userData access
  const userData = React.useMemo(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw =
        localStorage.getItem("eg_user_data") ??
        sessionStorage.getItem("eg_user_data");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  const liked = React.useMemo(() => {
    if (!post?.likes || !userData?.student_id) return [];
    return post.likes.filter((like) => like.user_id === userData.student_id);
  }, [post?.likes, userData?.student_id]);

  const handleCommentSubmit = () => {
    if (commentValue.trim()) {
      onComment(commentValue);
      setCommentValue("");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        >
          <Spin size="large" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="mt-4 text-teal-600 font-bold tracking-widest text-xs uppercase"
        >
          Crafting your reading experience...
        </motion.p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center"
      >
        <Empty description={error || "Blog post not found"} />
        <Link
          href="/blogs"
          className="mt-8 flex items-center gap-3 text-teal-600 font-extrabold hover:translate-x-[-10px] transition-transform group"
        >
          <div className="p-3 rounded-2xl bg-teal-50 group-hover:bg-teal-100">
            <ArrowLeft className="w-5 h-5" />
          </div>
          Return to Blog Library
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="bg-slate-50/50 min-h-screen relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-teal-200/20 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 100, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-200/20 blur-[100px] rounded-full"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-16 relative z-10"
      >
        {/* Back Button */}
        <motion.div variants={itemVariants}>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-3 text-slate-500 hover:text-teal-600 transition-all mb-12 group"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: -10 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-2xl bg-white shadow-sm group-hover:shadow-md group-hover:bg-teal-50 transition-all border border-slate-100"
            >
              <ArrowLeft className="w-4 h-4" />
            </motion.div>
            <span className="font-black tracking-tight text-sm uppercase">
              Library
            </span>
          </Link>
        </motion.div>

        {/* Header Section */}
        <div className="mb-20 text-center">
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3 mb-10"
          >
            <motion.span
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-6 py-2.5 rounded-2xl bg-teal-500 text-white text-[10px] font-black uppercase tracking-[0.25em] shadow-xl shadow-teal-500/30 cursor-default"
            >
              {post.category}
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-6 py-2.5 rounded-2xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.25em] shadow-xl shadow-slate-900/30 cursor-default"
            >
              {post.level}
            </motion.span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.05] tracking-tight mx-auto"
          >
            {post.title}
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold text-teal-600 font-arabic mb-12 leading-relaxed opacity-90"
          >
            {post.arabic_title || post.titleArabic}
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-[12px] text-slate-400 font-extrabold uppercase tracking-widest"
          >
            <div className="flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm border border-white/50">
              <Calendar className="w-4 h-4 text-teal-500" />
              <span>{post.created_at || post.date}</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm border border-white/50">
              <Clock className="w-4 h-4 text-teal-500" />
              <span>5 MIN READ</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm border border-white/50">
              <User className="w-4 h-4 text-teal-500" />
              <span>BY ADMIN</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Section */}
        <motion.div
          variants={itemVariants}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative group mb-20"
        >
          <div className="absolute -inset-6 bg-gradient-to-tr from-teal-500/20 to-blue-500/10 rounded-[4rem] blur-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-1000"></div>
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.15)] border-8 border-white">
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src={
                post.image ||
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200"
              }
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700"></div>
          </div>
        </motion.div>

        {/* Content Body */}
        <div className=" mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="prose prose-slate prose-xl max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-teal-600 prose-blockquote:border-teal-500 prose-blockquote:bg-teal-50/50 prose-blockquote:p-12 prose-blockquote:rounded-[2.5rem] prose-img:rounded-[2.5rem]"
          >
            {/* Elegant Excerpt */}
            <div className="relative mb-16 px-10 border-l-[6px] border-teal-500">
              <Quote className="absolute -top-10 -left-12 w-24 h-24 text-teal-500/10 pointer-events-none" />
              <p className="text-3xl font-medium text-slate-700 italic leading-[1.6]">
                {post.excerpt || post.content?.substring(0, 150) + "..."}
              </p>
            </div>

            <div
              className="text-slate-800 leading-[1.9] whitespace-pre-wrap font-medium text-xl first-letter:text-6xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-teal-600"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </motion.div>

          <Divider className="my-20 border-slate-200" />

          {/* Interaction Bar - Ultra Modern Glassmorphism */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="sticky bottom-10 z-40 flex items-center justify-between py-5 px-10 bg-white/40 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.12)] border border-white/60 mb-20 group/bar hover:bg-white/60 transition-colors duration-500"
          >
            <div className="flex items-center gap-12">
              <motion.button
                layout
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onLike(post.id)}
                disabled={isLikeLoading}
                className={`flex items-center gap-4 transition-all group/btn ${
                  liked.length > 0
                    ? "text-red-500"
                    : "text-slate-500 hover:text-red-500"
                }`}
              >
                <motion.div
                  layout
                  className={`p-3.5 rounded-2xl transition-all shadow-sm group-hover/btn:shadow-md ${
                    liked.length > 0
                      ? "bg-red-50/80"
                      : "bg-white/80 group-hover/btn:bg-red-50/80"
                  }`}
                >
                  <Heart
                    className={`w-7 h-7 ${
                      liked.length > 0
                        ? "fill-red-500"
                        : "group-hover/btn:scale-110"
                    }`}
                  />
                </motion.div>
                <motion.span
                  layout
                  className="font-black text-2xl tracking-tighter"
                >
                  {post?.likes?.length || 0}
                </motion.span>
              </motion.button>

              <motion.div
                layout
                className="flex items-center gap-4 text-slate-500 group/comm"
              >
                <div className="p-3.5 rounded-2xl bg-white/80 shadow-sm group-hover/comm:shadow-md transition-all">
                  <MessageCircle className="w-7 h-7" />
                </div>
                <span className="font-black text-2xl tracking-tighter">
                  {post?.comments?.length || 0}
                </span>
              </motion.div>
            </div>

            <div className="flex items-center gap-6">
              <motion.button
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-4 rounded-2xl bg-white/80 shadow-sm text-slate-500 hover:bg-teal-500 hover:text-white transition-all border border-white/50"
              >
                <Bookmark className="w-5 h-5 font-black" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Link copied to clipboard", {
                    style: {
                      borderRadius: "1rem",
                      background: "#334155",
                      color: "#fff",
                      fontWeight: "800",
                      fontSize: "13px",
                    },
                  });
                }}
                className="p-4 rounded-2xl bg-white/80 shadow-sm text-slate-500 hover:bg-blue-500 hover:text-white transition-all border border-white/50"
              >
                <Share2 className="w-5 h-5 font-black" />
              </motion.button>
            </div>
          </motion.div>

          {/* Discussion Header */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-14 flex items-center justify-between"
          >
            <h3 className="text-4xl font-black text-slate-900 tracking-tighter">
              Comments
            </h3>
            <div className="flex items-center gap-3 px-6 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-teal-500/20">
              {post?.comments?.length || 0}{" "}
              {post?.comments?.length === 1 ? "Comment" : "Comments"}
            </div>
          </motion.div>

          {/* Comment Input Section */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="mb-20 relative group/input"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-teal-500 to-blue-500 rounded-[3rem] blur opacity-15 group-hover/input:opacity-25 transition-opacity duration-700"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-[3rem] p-10 shadow-[0_25px_60px_rgba(0,0,0,0.08)] border border-slate-100">
              <div className="flex gap-8">
                <div className="relative flex-shrink-0 h-fit">
                  <Avatar
                    size={64}
                    className="bg-gradient-to-tr from-slate-800 to-slate-900 shadow-2xl border-4 border-white"
                  >
                    U
                  </Avatar>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -bottom-1 -right-1 w-5 h-5 bg-teal-400 border-4 border-white rounded-full"
                  />
                </div>
                <div className="flex-1 space-y-8">
                  <textarea
                    value={commentValue}
                    onChange={(e) => setCommentValue(e.target.value)}
                    placeholder="Share your perspective with the community..."
                    className="w-full min-h-[160px] p-8 rounded-[2rem] bg-slate-50/50 border-2 border-transparent focus:border-teal-500/20 focus:bg-white focus:shadow-inner transition-all outline-none resize-none text-slate-800 font-semibold text-lg placeholder:text-slate-300 leading-relaxed"
                  />
                  <div className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCommentSubmit}
                      disabled={!commentValue.trim() || isCommentLoading}
                      className={`px-12 py-5 rounded-[1.5rem] font-black text-[13px] uppercase tracking-widest transition-all flex items-center gap-4 ${
                        commentValue.trim()
                          ? "bg-slate-900 text-white hover:bg-black shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
                          : "bg-slate-100 text-slate-300 cursor-not-allowed"
                      }`}
                    >
                      {isCommentLoading ? (
                        <Spin size="small" />
                      ) : (
                        <>
                          <span>Post</span>
                          <div className="p-1.5 rounded-lg bg-white/10 group-hover:bg-white/20">
                            <ArrowLeft className="w-4 h-4 rotate-[135deg]" />
                          </div>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Dynamic Comments List */}
          <div className="space-y-10 mb-32">
            <AnimatePresence mode="popLayout">
              {post.comments && post.comments.length > 0 ? (
                post.comments.map((comment, idx) => (
                  <motion.div
                    key={comment.comment_id || idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6, delay: (idx % 4) * 0.1 }}
                    className="group relative flex gap-8 p-10 bg-white rounded-[3rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)] hover:translate-y-[-8px] transition-all duration-700 border border-slate-50/50"
                  >
                    <div className="relative flex-shrink-0 h-fit">
                      <Avatar
                        size={64}
                        src={comment.image}
                        className="bg-slate-50 border-4 border-white shadow-xl group-hover:scale-110 transition-transform duration-500"
                      >
                        {comment.student_name?.[0]?.toUpperCase() || "U"}
                      </Avatar>
                      <div className="absolute -top-2 -left-2 p-2 bg-teal-500 rounded-2xl text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
                        <Quote className="w-3 h-3 fill-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-5">
                        <div>
                          <h4 className="font-black text-slate-900 text-xl leading-none mb-2 tracking-tight group-hover:text-teal-600 transition-colors">
                            {comment.student_name}
                          </h4>
                          <span className="text-[10px] font-black text-teal-600/60 uppercase tracking-[0.2em]">
                            {new Date(comment.created_at).toLocaleDateString(
                              undefined,
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        <div className="w-10 h-1 bg-slate-100 rounded-full group-hover:bg-teal-100 transition-all group-hover:w-20" />
                      </div>
                      <p className="text-slate-600 text-lg leading-relaxed font-semibold opacity-90 group-hover:opacity-100 transition-opacity">
                        {comment.comment}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="text-center py-32 bg-white rounded-[4rem] border-4 border-dashed border-slate-50 mb-24"
                >
                  <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <MessageCircle className="w-10 h-10 text-slate-200" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tighter">
                    The conversation hasn't started
                  </h4>
                  <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] bg-slate-50 inline-block px-6 py-2 rounded-full">
                    Be the first to share your thoughts
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <style jsx global>{`
        .font-arabic {
          font-family: "Amiri", serif;
        }
        @import url("https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Outfit:wght@100..900&display=swap");

        body {
          font-family: "Outfit", sans-serif;
          background-color: #f8fafc;
        }

        .prose blockquote p::before,
        .prose blockquote p::after {
          content: none;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}
