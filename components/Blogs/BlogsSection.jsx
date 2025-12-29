// import { useState, useEffect } from "react";
// import {
//   Search,
//   Filter,
//   BookOpen,
//   Sparkles,
//   Award,
//   Headphones,
//   Globe,
//   TrendingUp,
//   Mic,
//   Smile,
//   Send,
//   X,
//   Image as ImageIcon,
//   MessageCircle,
// } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   handleGetAllBlogs,
//   handleMakeComment,
// } from "@/libs/features/blogsSlice";
// import { Spin, Modal, Input, Button, List, Avatar, Empty, Tooltip } from "antd";
// import { formatToLongEnglish } from "../../libs/shared/ParseDate";
// import axios from "axios";
// import { base_url } from "../../libs/constant";
// import { getToken } from "../../utils/token";
// import BlogCard from "./BlogCard";
// import toast from "react-hot-toast";

// export default function BlogsSection() {
//   const [likedCards, setLikedCards] = useState(new Set());
//   const [bookmarkedCards, setBookmarkedCards] = useState(new Set());
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [selectedLevel, setSelectedLevel] = useState("All");

//   const userData = JSON.parse(
//     localStorage.getItem("eg_user_data") ??
//       sessionStorage.getItem("eg_user_data")
//   );
//   const { TextArea } = Input;
//   const [commentModalOpen, setCommentModalOpen] = useState(false);
//   const [activePost, setActivePost] = useState(null);
//   const [commentValue, setCommentValue] = useState("");
//   const [commentsByPost, setCommentsByPost] = useState({});
//   const [isRecording, setIsRecording] = useState(false);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const token = getToken();

//   // Common emojis for quick picker

//   const insertEmoji = (emoji) => {
//     setCommentValue((prev) => prev + emoji);
//     setShowEmojiPicker(false);
//   };

//   // Categories for separation
//   /*  const categories = [
//     "All",
//     "Beginner",
//     "Culture",
//     "Advanced",
//     "Pronunciation",
//     "Literature",
//     "Business",
//   ]; */

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(handleGetAllBlogs());
//   }, [dispatch]);

//   const { all_blogs_loading, all_blogs_data } = useSelector(
//     (state) => state.blogs
//   );

//   const blogPosts =
//     all_blogs_data?.message?.map((post, index) => {
//       const safeId = post?.id ?? post?._id ?? post?.blog_id ?? index + 1;

//       // Determine icon based on category (logic can be improved)
//       let Icon = BookOpen;
//       let gradient = "from-emerald-400 via-teal-500 to-cyan-600";
//       if (post.category === "Culture") {
//         Icon = Sparkles;
//         gradient = "from-purple-400 via-indigo-500 to-blue-600";
//       } else if (post.category === "Advanced") {
//         Icon = Award;
//         gradient = "from-red-400 via-pink-500 to-rose-600";
//       }

//       return {
//         id: safeId,
//         title: post.title,
//         titleArabic: post.arabic_title,
//         excerpt:
//           post.content ??
//           "Master these fundamental phrases and start your Arabic journey with confidence.",
//         author: "Dr. Amina Hassan",
//         authorArabic: "د. أمينة حسن",
//         date: formatToLongEnglish(post.created_at),
//         readTime: "5 min read",
//         views: "2.3k",
//         likes: post.likes_count ?? 0,
//         comments: post.comments_count ?? 0,
//         category: post.category || "General",
//         level: post.level || "Beginner",
//         image:
//           post.image ??
//           "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
//         gradient: gradient,
//         icon: Icon,
//       };
//     }) || [];
//   const categories = blogPosts.map((post) => {
//     return post.category;
//   });
//   const uniqueCategories = [...new Set(categories)];
//   const filterCategories = ["All", ...uniqueCategories];

//   // Get unique levels
//   const levels = blogPosts.map((post) => post.level);
//   const uniqueLevels = [...new Set(levels)];
//   const filterLevels = ["All", ...uniqueLevels];

//   // Filter Logic
//   const filteredPosts = blogPosts.filter((post) => {
//     const matchesSearch =
//       post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       post.titleArabic.includes(searchQuery);
//     const matchesCategory =
//       selectedCategory === "All" || post.category === selectedCategory;
//     const matchesLevel =
//       selectedLevel === "All" || post.level === selectedLevel;

//     return matchesSearch && matchesCategory && matchesLevel;
//   });

//   const toggleBookmark = (cardId) => {
//     setBookmarkedCards((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(cardId)) newSet.delete(cardId);
//       else newSet.add(cardId);
//       return newSet;
//     });
//   };

//   // Comment Modal handlers
//   const openCommentModal = (post) => {
//     setActivePost(post);
//     setCommentModalOpen(true);
//   };

//   const closeCommentModal = () => {
//     setCommentModalOpen(false);
//     setActivePost(null);
//     setCommentValue("");
//   };

//   const activeComments = activePost ? commentsByPost[activePost.id] || [] : [];

//   const addComment = async (blog) => {
//     if (!activePost) return;
//     const text = commentValue.trim();
//     if (!text) return;

//     const payload = {
//       comment: text,
//       user_id: userData.student_id,
//       blog_id: blog,
//     };
//     console.log(payload);

//     try {
//       const response = await dispatch(handleMakeComment({ payload })).unwrap();
//       if (response.status === "success") {
//         toast.success(response.message);
//         dispatch(handleGetAllBlogs());
//         closeCommentModal();
//       } else {
//         toast.error(response.message);
//       }
//       console.log(response);

//       // Optimistically update local comments (optional, effectively handled by refetch or separate state)
//       // For now, we rely on the backend or simple feedback
//     } catch (error) {
//       toast.error(error.message);
//     }

//     setCommentValue("");
//   };

//   const addLike = async (blog) => {
//     const payload = {
//       user_id: userData.student_id,
//       blog_id: blog,
//     };

//     try {
//       const response = await axios.post(
//         `${base_url}/blogs/make_like.php`,
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (response.data.status === "success") {
//         toast.success(response.data.message);
//         dispatch(handleGetAllBlogs());
//       } else {
//         toast.error(response.data.message);
//       }
//       // Optimistic update for UI
//       setLikedCards((prev) => {
//         const newSet = new Set(prev);
//         if (newSet.has(blog)) newSet.delete(blog);
//         else newSet.add(blog);
//         return newSet;
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (all_blogs_loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Spin size="large" spinning />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
//       {/* Header & Controls */}
//       <div className="max-w-7xl mx-auto mb-12">
//         <div className="text-center mb-10">
//           <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-600 via-teal-600 to-teal-600 bg-clip-text text-transparent mb-4">
//             Arabic Learning Blog
//           </h1>
//           <p className="text-xl text-gray-600 mb-8">مدونة تعلم اللغة العربية</p>
//           <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-blue-500 mx-auto rounded-full"></div>
//         </div>

//         {/* Search and Filters */}
//         <div className="flex flex-col md:flex-row items-center justify-between md:justify-between gap-6 bg-white/50 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-white/50">
//           {/* Search Bar */}
//           <div className="relative w-full md:w-96">
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search blogs..."
//               className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none bg-white/80"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>

//           {/* Category Filters */}
//           <div className="flex flex-col md:flex-row items-center md:items-start justify-end gap-4 w-full">
//             <div className="flex flex-wrap items-center justify-center gap-2">
//               <span className="text-xs font-semibold text-gray-500 uppercase mr-2">
//                 Category:
//               </span>
//               {filterCategories.map((cat) => (
//                 <button
//                   key={cat}
//                   onClick={() => setSelectedCategory(cat)}
//                   className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
//                     selectedCategory === cat
//                       ? "bg-teal-600 text-white shadow-lg shadow-teal-200"
//                       : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-100"
//                   }`}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>

//             {/* Level Filters */}
//             <div className="flex flex-wrap items-center justify-center gap-2">
//               <span className="text-xs font-semibold text-gray-500 uppercase mr-2">
//                 Level:
//               </span>
//               {filterLevels.map((level) => (
//                 <button
//                   key={level}
//                   onClick={() => setSelectedLevel(level)}
//                   className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
//                     selectedLevel === level
//                       ? "bg-purple-600 text-white shadow-lg shadow-purple-200"
//                       : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-100"
//                   }`}
//                 >
//                   {level}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Blog Cards Grid */}
//       <div className="max-w-7xl mx-auto">
//         {filteredPosts.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredPosts.map((post, index) => (
//               <div
//                 key={post.id}
//                 className="h-full"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <BlogCard
//                   post={post}
//                   isLiked={likedCards.has(post.id)}
//                   isBookmarked={bookmarkedCards.has(post.id)}
//                   onLike={addLike}
//                   onComment={() => openCommentModal(post)}
//                   onBookmark={toggleBookmark}
//                 />
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-20">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
//               <Search className="w-8 h-8 text-gray-400" />
//             </div>
//             <h3 className="text-xl font-bold text-gray-700 mb-2">
//               No blogs found
//             </h3>
//             <p className="text-gray-500">
//               Try adjusting your search or filters
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Comment Modal */}
//       <Modal
//         open={commentModalOpen}
//         onCancel={closeCommentModal}
//         footer={null}
//         centered
//         width={600}
//         closeIcon={
//           <div className="p-2 hover:bg-gray-100 rounded-full transition-colors">
//             <X className="w-5 h-5 text-gray-500" />
//           </div>
//         }
//         className="custom-comment-modal"
//         styles={{
//           content: { borderRadius: "24px", padding: "0", overflow: "hidden" },
//         }}
//         title={null} // Custom header
//       >
//         {!activePost ? (
//           <div className="flex flex-col items-center justify-center h-64 text-gray-400">
//             <Empty description="No post selected" />
//           </div>
//         ) : (
//           <div className="flex flex-col h-[600px]">
//             {/* Custom Header */}
//             <div className="px-6 py-4 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between">
//               <div>
//                 <h3 className="font-bold text-lg text-gray-800 line-clamp-1">
//                   {activePost.title}
//                 </h3>
//                 <p className="text-xs text-gray-500 font-arabic">
//                   {activePost.titleArabic}
//                 </p>
//               </div>
//               <div className="bg-teal-50 text-teal-600 px-3 py-1 rounded-full text-xs font-bold">
//                 {activePost.comments} comments
//               </div>
//             </div>

//             {/* Comments List */}
//             <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-gray-50/30">
//               {activeComments.length === 0 ? (
//                 <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-60">
//                   <MessageCircle className="w-16 h-16 mb-4 text-gray-300" />
//                   <p className="font-medium">No comments yet</p>
//                   <p className="text-sm">Start the conversation!</p>
//                 </div>
//               ) : (
//                 <List
//                   itemLayout="horizontal"
//                   dataSource={activeComments}
//                   renderItem={(item) => (
//                     <div className="flex gap-4 mb-6 group animate-in fade-in slide-in-from-bottom-2 duration-500">
//                       <Avatar
//                         className="bg-gradient-to-br from-teal-400 to-blue-500 flex-shrink-0 shadow-md border-2 border-white"
//                         size={40}
//                       >
//                         {(item.author || "U")[0].toUpperCase()}
//                       </Avatar>
//                       <div className="flex-1 max-w-[85%]">
//                         <div className="flex items-baseline gap-2 mb-1 pl-1">
//                           <span className="font-bold text-sm text-gray-900">
//                             {item.author}
//                           </span>
//                           <span className="text-[10px] text-gray-400 font-medium">
//                             {new Date(item.createdAt).toLocaleDateString()}
//                           </span>
//                         </div>
//                         <div className="bg-white rounded-2xl rounded-tl-none p-3 px-5 shadow-sm border border-gray-100 group-hover:shadow-md transition-all duration-300">
//                           <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
//                             {item.text}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 />
//               )}
//             </div>

//             {/* Rich Input Area */}
//             <div className="p-4 bg-white border-t border-gray-100">
//               <div
//                 className={`border rounded-3xl transition-all duration-300 bg-gray-50/50 ${
//                   isRecording
//                     ? "border-red-400 ring-2 ring-red-100 bg-red-50/10"
//                     : "border-gray-200 focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-50 focus-within:bg-white"
//                 }`}
//               >
//                 <textarea
//                   value={commentValue}
//                   onChange={(e) => setCommentValue(e.target.value)}
//                   placeholder="Share your thoughts..."
//                   className="w-full p-4 bg-transparent border-none focus:ring-0 focus-within:ring-4 focus-within:ring-teal-50 focus-within:outline-none resize-none min-h-[80px] text-gray-700 placeholder-gray-400 text-sm"
//                 />

//                 <div className="flex items-center justify-between px-3 pb-2 pt-1">
//                   <div className="flex items-center gap-1 relative">
//                     {/* Emoji Picker Dropdown */}
//                   </div>

//                   <button
//                     onClick={() => addComment(activePost.id)}
//                     disabled={!commentValue.trim()}
//                     className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 font-bold text-sm shadow-sm ${
//                       commentValue.trim()
//                         ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-teal-200 hover:shadow-lg hover:from-teal-600 hover:to-teal-700 transform hover:-translate-y-0.5"
//                         : "bg-gray-200 text-gray-400 cursor-not-allowed"
//                     }`}
//                   >
//                     <span>Post</span>
//                     <Send className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </Modal>

//       <style jsx global>{`
//         @font-face {
//           font-family: "Arabic";
//           src: url("https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap");
//         }
//         .font-arabic {
//           font-family: "Amiri", serif;
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";
import { useState, useEffect, useMemo } from "react";
import {
  Search,
  BookOpen,
  Sparkles,
  Award,
  Send,
  X,
  MessageCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleGetAllBlogs,
  handleMakeComment,
} from "@/libs/features/blogsSlice";
import { Spin, Modal, Input, List, Avatar, Empty } from "antd";
import { formatToLongEnglish } from "../../libs/shared/ParseDate";
import axios from "axios";
import { base_url } from "../../libs/constant";
import { getToken } from "../../utils/token";
import BlogCard from "./BlogCard";
import toast from "react-hot-toast";

export default function BlogsSection() {
  const [bookmarkedCards, setBookmarkedCards] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [activePost, setActivePost] = useState(null);
  const [commentValue, setCommentValue] = useState("");
  const [commentsByPost, setCommentsByPost] = useState({});

  // ✅ Optimistic Like States
  const [likedById, setLikedById] = useState({});
  const [likesCountById, setLikesCountById] = useState({});
  const [likeLoadingById, setLikeLoadingById] = useState({}); // لمنع spam فقط

  const { TextArea } = Input;
  const token = getToken();

  // ✅ userData guarded
  const userData = useMemo(() => {
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

  const dispatch = useDispatch();

  useEffect(() => {
    const payload = {};
    if (userData) {
      payload.user_id = userData.student_id;
    }
    dispatch(handleGetAllBlogs(payload));
  }, [dispatch]);

  const { all_blogs_loading, all_blogs_data } = useSelector(
    (state) => state.blogs
  );

  // ✅ Normalize posts with comments from API
  const blogPosts =
    all_blogs_data?.message?.map((post, index) => {
      const safeId = post?.id ?? post?._id ?? post?.blog_id ?? index + 1;

      let Icon = BookOpen;
      let gradient = "from-emerald-400 via-teal-500 to-cyan-600";
      if (post.category === "Culture") {
        Icon = Sparkles;
        gradient = "from-purple-400 via-indigo-500 to-blue-600";
      } else if (post.category === "Advanced") {
        Icon = Award;
        gradient = "from-red-400 via-pink-500 to-rose-600";
      }

      return {
        id: safeId,
        title: post.title,
        titleArabic: post.arabic_title,
        excerpt:
          post.content ??
          "Master these fundamental phrases and start your Arabic journey with confidence.",
        author: "Dr. Amina Hassan",
        authorArabic: "د. أمينة حسن",
        date: formatToLongEnglish(post.created_at),
        readTime: "5 min read",
        views: "2.3k",
        likes: parseInt(post.likes_count) ?? 0,
        commentsCount: parseInt(post.comments_count) ?? 0,
        liked: post.liked === "1", // API returns "1" or "0"
        comments: post.comments ?? [], // ✅ Include comments array from API
        category: post.category || "General",
        level: post.level || "Beginner",
        image:
          post.image ??
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
        gradient,
        icon: Icon,
      };
    }) || [];

  // ✅ Init likesCountById and likedById from API response
  useEffect(() => {
    if (!blogPosts.length) return;
    const likesMap = {};
    const likedMap = {};
    blogPosts.forEach((p) => {
      likesMap[p.id] = p.likes ?? 0;
      likedMap[p.id] = p.liked ?? false; // ✅ Use API's liked field
    });
    setLikesCountById(likesMap);
    setLikedById(likedMap);
  }, [all_blogs_data]); // important - use all_blogs_data not blogPosts to avoid infinite loop

  console.log(all_blogs_data);

  // ✅ Categories / Levels
  const uniqueCategories = useMemo(() => {
    const categories = blogPosts.map((post) => post.category);
    return ["All", ...new Set(categories)];
  }, [blogPosts]);

  const uniqueLevels = useMemo(() => {
    const levels = blogPosts.map((post) => post.level);
    return ["All", ...new Set(levels)];
  }, [blogPosts]);

  // ✅ Filter Logic
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.titleArabic || "").includes(searchQuery);

      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      const matchesLevel =
        selectedLevel === "All" || post.level === selectedLevel;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [blogPosts, searchQuery, selectedCategory, selectedLevel]);

  const toggleBookmark = (cardId) => {
    setBookmarkedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) newSet.delete(cardId);
      else newSet.add(cardId);
      return newSet;
    });
  };

  // ✅ Comment Modal handlers
  const openCommentModal = (post) => {
    setActivePost(post);
    setCommentModalOpen(true);
  };

  const closeCommentModal = () => {
    setCommentModalOpen(false);
    setActivePost(null);
    setCommentValue("");
  };

  // ✅ Get comments from the activePost directly (from API)
  const activeComments = activePost?.comments ?? [];

  const addComment = async (blogId) => {
    if (!activePost) return;
    const text = commentValue.trim();
    if (!text) return;

    if (!userData?.student_id) {
      toast.error("Please login first");
      return;
    }

    const payload = {
      comment: text,
      user_id: userData.student_id,
      blog_id: blogId,
    };

    try {
      const response = await dispatch(handleMakeComment({ payload })).unwrap();
      if (response.status === "success") {
        toast.success(response.message || "Comment added!");

        // ✅ Optimistic update: add comment to activePost.comments
        const newComment = {
          comment_id: Date.now().toString(), // temp ID
          comment: text,
          user_id: userData.student_id,
          blog_id: blogId,
          created_at: new Date().toISOString(),
          student_name: userData.student_name || "You",
          image: userData.image || null,
        };
        setActivePost((prev) => ({
          ...prev,
          comments: [...(prev?.comments || []), newComment],
          commentsCount: (prev?.commentsCount || 0) + 1,
        }));

        // Refetch in background for sync
        dispatch(handleGetAllBlogs());
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setCommentValue("");
  };

  // ✅ LIKE: Optimistic + Background request + NO full page loading
  const addLike = async (blogId) => {
    if (!userData?.student_id) {
      toast.error("Please login first");
      return;
    }

    if (likeLoadingById[blogId]) return; // ✅ prevent spam

    const prevLiked = !!likedById[blogId];
    const prevCount = likesCountById[blogId] ?? 0;

    // ✅ Optimistic update
    setLikedById((prev) => ({ ...prev, [blogId]: !prevLiked }));
    setLikesCountById((prev) => ({
      ...prev,
      [blogId]: prevLiked ? Math.max(0, prevCount - 1) : prevCount + 1,
    }));
    setLikeLoadingById((prev) => ({ ...prev, [blogId]: true }));

    const payload = {
      user_id: userData.student_id,
      blog_id: blogId,
    };

    try {
      const response = await axios.post(
        `${base_url}/blogs/make_like.php`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status !== "success") {
        throw new Error(response.data.message);
      }

      // ✅ Success: no refetch to avoid global loading
      // (اختياري تعمل sync silent بعد وقت)
      // toast.success(response.data.message);
    } catch (error) {
      // ❌ Rollback
      setLikedById((prev) => ({ ...prev, [blogId]: prevLiked }));
      setLikesCountById((prev) => ({ ...prev, [blogId]: prevCount }));
      toast.error(error.message || "Failed to like");
    } finally {
      setLikeLoadingById((prev) => ({ ...prev, [blogId]: false }));
    }
  };

  if (all_blogs_loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" spinning />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      {/* Header & Controls */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-600 via-teal-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Arabic Learning Blog
          </h1>
          <p className="text-xl text-gray-600 mb-8">مدونة تعلم اللغة العربية</p>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between md:justify-between gap-6 bg-white/50 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-white/50">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search blogs..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none bg-white/80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-end gap-4 w-full">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs font-semibold text-gray-500 uppercase mr-2">
                Category:
              </span>
              {uniqueCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat
                      ? "bg-teal-600 text-white shadow-lg shadow-teal-200"
                      : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Level Filters */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs font-semibold text-gray-500 uppercase mr-2">
                Level:
              </span>
              {uniqueLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedLevel === level
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-200"
                      : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-100"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="max-w-7xl mx-auto">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <div
                key={post.id}
                className="h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <BlogCard
                  post={{
                    ...post,
                    likes: likesCountById[post.id] ?? post.likes,
                  }}
                  isLiked={!!likedById[post.id]}
                  isBookmarked={bookmarkedCards.has(post.id)}
                  onLike={addLike}
                  onComment={() => openCommentModal(post)}
                  onBookmark={toggleBookmark}
                  likeDisabled={!!likeLoadingById[post.id]} // optional
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              No blogs found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Comment Modal */}
      <Modal
        open={commentModalOpen}
        onCancel={closeCommentModal}
        footer={null}
        centered
        width={600}
        closeIcon={
          <div className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </div>
        }
        className="custom-comment-modal"
        styles={{
          content: { borderRadius: "24px", padding: "0", overflow: "hidden" },
        }}
        title={null}
      >
        {!activePost ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <Empty description="No post selected" />
          </div>
        ) : (
          <div className="flex flex-col h-[600px]">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-gray-800 line-clamp-1">
                  {activePost.title}
                </h3>
                <p className="text-xs text-gray-500 font-arabic">
                  {activePost.titleArabic}
                </p>
              </div>
              <div className="bg-teal-50 text-teal-600 px-3 py-1 rounded-full text-xs font-bold">
                {activePost.commentsCount || activeComments.length} comments
              </div>
            </div>

            {/* Comments */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-gray-50/30">
              {activeComments.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-60">
                  <MessageCircle className="w-16 h-16 mb-4 text-gray-300" />
                  <p className="font-medium">No comments yet</p>
                  <p className="text-sm">Start the conversation!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeComments.map((item) => (
                    <div
                      key={item.comment_id}
                      className="flex gap-4 group animate-in fade-in slide-in-from-bottom-2 duration-300"
                    >
                      <Avatar
                        src={item.image}
                        className="bg-gradient-to-br from-teal-400 to-blue-500 flex-shrink-0 shadow-md border-2 border-white"
                        size={40}
                      >
                        {(item.student_name || "U")[0].toUpperCase()}
                      </Avatar>
                      <div className="flex-1 max-w-[85%]">
                        <div className="flex items-baseline gap-2 mb-1 pl-1">
                          <span className="font-bold text-sm text-gray-900">
                            {item.student_name}
                          </span>
                          <span className="text-[10px] text-gray-400 font-medium">
                            {new Date(item.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="bg-white rounded-2xl rounded-tl-none p-3 px-5 shadow-sm border border-gray-100 group-hover:shadow-md transition-all duration-300">
                          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                            {item.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="border border-gray-200 rounded-3xl bg-gray-50/50 focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-50 focus-within:bg-white transition-all duration-300">
                <textarea
                  value={commentValue}
                  onChange={(e) => setCommentValue(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full p-4 bg-transparent border-none focus:outline-none resize-none min-h-[80px] text-gray-700 placeholder-gray-400 text-sm"
                />

                <div className="flex items-center justify-end px-3 pb-2 pt-1">
                  <button
                    onClick={() => addComment(activePost.id)}
                    disabled={!commentValue.trim()}
                    className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 font-bold text-sm shadow-sm ${
                      commentValue.trim()
                        ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-teal-200 hover:shadow-lg hover:from-teal-600 hover:to-teal-700 transform hover:-translate-y-0.5"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <span>Post</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <style jsx global>{`
        @font-face {
          font-family: "Arabic";
          src: url("https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap");
        }
        .font-arabic {
          font-family: "Amiri", serif;
        }
      `}</style>
    </div>
  );
}
