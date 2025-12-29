"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  handleGetBlogDetails,
  handleMakeComment,
} from "@/libs/features/blogsSlice";
import BlogDetails from "@/components/Blogs/BlogDetails";
import PagesBanner from "@/components/layout/PagesBanner";
import toast from "react-hot-toast";
import { useMemo, useState } from "react";
import axios from "axios";
import { base_url } from "@/libs/constant";
import { getToken } from "@/utils/token";

export default function BlogDetailPage() {
  const { Bid } = useParams();
  console.log(Bid);
  const dispatch = useDispatch();
  const { blog_details_loading, blog_details_data, blog_details_error } =
    useSelector((state) => state.blogs);

  const [optimisticPost, setOptimisticPost] = useState(null);
  const [likeLoading, setLikeLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);

  // Guarded user data
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

  const token = getToken();

  useEffect(() => {
    const payload = { blog_id: Bid };
    if (userData) {
      payload.user_id = userData.student_id;
    }
    if (Bid) {
      dispatch(handleGetBlogDetails(payload));
    }
  }, [Bid, dispatch]);

  useEffect(() => {
    if (blog_details_data?.message) {
      setOptimisticPost(blog_details_data.message);
    }
  }, [blog_details_data]);

  const handleLike = async (blogId) => {
    if (!userData?.student_id) {
      toast.error("Please login first");
      return;
    }

    if (likeLoading) return;

    const currentLikes = optimisticPost?.likes || [];
    const isAlreadyLiked = currentLikes.some(
      (like) => like.user_id === userData.student_id
    );

    // Optimistic Update
    setOptimisticPost((prev) => {
      const newLikes = isAlreadyLiked
        ? (prev.likes || []).filter((l) => l.user_id !== userData.student_id)
        : [...(prev.likes || []), { user_id: userData.student_id }];

      return {
        ...prev,
        likes: newLikes,
        liked: isAlreadyLiked ? "0" : "1", // kept for compatibility if needed elsewhere
        likes_count: newLikes.length,
      };
    });
    setLikeLoading(true);

    try {
      const response = await axios.post(
        `${base_url}/blogs/make_like.php`,
        { user_id: userData.student_id, blog_id: Bid },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.status !== "success") {
        throw new Error(response.data.message);
      }
    } catch (error) {
      // Rollback
      setOptimisticPost((prev) => {
        const revertedLikes = isAlreadyLiked
          ? [...(prev.likes || []), { user_id: userData.student_id }]
          : (prev.likes || []).filter((l) => l.user_id !== userData.student_id);

        return {
          ...prev,
          likes: revertedLikes,
          liked: isAlreadyLiked ? "1" : "0",
          likes_count: revertedLikes.length,
        };
      });
      toast.error(error.message || "Failed to update like");
    } finally {
      setLikeLoading(false);
    }
  };

  const handleComment = async (text) => {
    if (!userData?.student_id) {
      toast.error("Please login first");
      return;
    }

    setCommentLoading(true);
    const payload = {
      comment: text,
      user_id: userData.student_id,
      blog_id: Bid,
    };

    try {
      const response = await dispatch(handleMakeComment({ payload })).unwrap();
      if (response.status === "success") {
        toast.success(response.message || "Comment added!");

        const newComment = {
          comment_id: Date.now().toString(),
          comment: text,
          user_id: userData.student_id,
          blog_id: Bid,
          created_at: new Date().toISOString(),
          student_name: userData.student_name || "You",
          image: userData.image || null,
        };

        setOptimisticPost((prev) => ({
          ...prev,
          comments: [newComment, ...(prev?.comments || [])],
          comments_count: (parseInt(prev?.comments_count) || 0) + 1,
        }));
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to add comment");
    } finally {
      setCommentLoading(false);
    }
  };

  const post = optimisticPost;
  console.log(post);

  return (
    <main className="bg-white min-h-screen">
      <PagesBanner
        title="Blog Details"
        subTitle={post?.title || "Exploring Arabic Excellence"}
      />
      <BlogDetails
        post={post}
        loading={blog_details_loading}
        error={blog_details_error}
        onLike={handleLike}
        onComment={handleComment}
        isLikeLoading={likeLoading}
        isCommentLoading={commentLoading}
      />
    </main>
  );
}
