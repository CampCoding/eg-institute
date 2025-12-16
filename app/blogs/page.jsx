"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  BookOpen,
  Star,
  ArrowRight,
  Bookmark,
  PlayCircle,
  Headphones,
  Globe,
  Sparkles,
  TrendingUp,
  Award,
} from "lucide-react";
import BlogsSection from "../../components/Blogs/BlogsSection";
import PagesBanner from "../../components/layout/PagesBanner";

export default function BlogCards() {
  const [likedCards, setLikedCards] = useState(new Set());
  const [bookmarkedCards, setBookmarkedCards] = useState(new Set());
  const [hoveredCard, setHoveredCard] = useState(null);

  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Arabic Phrases Every Beginner Should Know",
      titleArabic: "عشر عبارات أساسية في اللغة العربية",
      excerpt:
        "Master these fundamental phrases and start your Arabic journey with confidence. Perfect for absolute beginners.",
      author: "Dr. Amina Hassan",
      authorArabic: "د. أمينة حسن",
      date: "March 15, 2024",
      readTime: "5 min read",
      views: "2.3k",
      likes: 89,
      comments: 23,
      category: "Beginner",
      categoryColor: "from-green-400 to-emerald-500",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
      gradient: "from-emerald-400 via-teal-500 to-cyan-600",
      icon: BookOpen,
      trending: true,
    },
    {
      id: 2,
      title: "The Art of Arabic Calligraphy: A Visual Journey",
      titleArabic: "فن الخط العربي: رحلة بصرية",
      excerpt:
        "Explore the mesmerizing world of Arabic calligraphy and its profound cultural significance throughout history.",
      author: "Ahmed Al-Khattat",
      authorArabic: "أحمد الخطاط",
      date: "March 12, 2024",
      readTime: "8 min read",
      views: "4.1k",
      likes: 156,
      comments: 45,
      category: "Culture",
      categoryColor: "from-purple-400 to-indigo-500",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      gradient: "from-purple-400 via-indigo-500 to-blue-600",
      icon: Sparkles,
      featured: true,
    },
    {
      id: 3,
      title: "Advanced Grammar: Mastering Arabic Verb Conjugations",
      titleArabic: "القواعد المتقدمة: إتقان تصريف الأفعال العربية",
      excerpt:
        "Dive deep into Arabic verb patterns and conjugations with practical examples and memory techniques.",
      author: "Prof. Sarah Mahmoud",
      authorArabic: "أ. سارة محمود",
      date: "March 10, 2024",
      readTime: "12 min read",
      views: "1.8k",
      likes: 67,
      comments: 31,
      category: "Advanced",
      categoryColor: "from-red-400 to-pink-500",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop",
      gradient: "from-red-400 via-pink-500 to-rose-600",
      icon: Award,
      hasAudio: true,
    },
    {
      id: 4,
      title: "Arabic Pronunciation Guide: Perfect Your Accent",
      titleArabic: "دليل النطق العربي: أتقن لهجتك",
      excerpt:
        "Learn the secrets of authentic Arabic pronunciation with audio examples and phonetic breakdowns.",
      author: "Layla Qasemi",
      authorArabic: "ليلى قاسمي",
      date: "March 8, 2024",
      readTime: "6 min read",
      views: "3.2k",
      likes: 124,
      comments: 18,
      category: "Pronunciation",
      categoryColor: "from-orange-400 to-yellow-500",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop",
      gradient: "from-orange-400 via-yellow-500 to-amber-600",
      icon: Headphones,
      hasVideo: true,
    },
    {
      id: 5,
      title: "Exploring Arabic Literature: Poetry Through the Ages",
      titleArabic: "استكشاف الأدب العربي: الشعر عبر العصور",
      excerpt:
        "Journey through centuries of Arabic poetry, from pre-Islamic verse to contemporary masterpieces.",
      author: "Dr. Omar Farid",
      authorArabic: "د. عمر فريد",
      date: "March 5, 2024",
      readTime: "10 min read",
      views: "2.7k",
      likes: 98,
      comments: 27,
      category: "Literature",
      categoryColor: "from-teal-400 to-cyan-500",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop",
      gradient: "from-teal-400 via-cyan-500 to-blue-600",
      icon: Globe,
      premium: true,
    },
    {
      id: 6,
      title: "Business Arabic: Professional Communication Skills",
      titleArabic: "العربية التجارية: مهارات التواصل المهني",
      excerpt:
        "Master formal Arabic for business contexts, emails, presentations, and professional networking.",
      author: "Khalid Al-Mansouri",
      authorArabic: "خالد المنصوري",
      date: "March 3, 2024",
      readTime: "7 min read",
      views: "1.9k",
      likes: 73,
      comments: 15,
      category: "Business",
      categoryColor: "from-indigo-400 to-purple-500",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
      gradient: "from-indigo-400 via-purple-500 to-violet-600",
      icon: TrendingUp,
      new: true,
    },
  ];

  const toggleLike = (cardId) => {
    setLikedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const toggleBookmark = (cardId) => {
    setBookmarkedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  return (
    <main>
      <PagesBanner
        title="Blogs"
        subTitle={
          "Explore Arabic, Embrace the Culture – Your Journey Starts Here"
        }
      />
      <BlogsSection />
    </main>
  );
}
