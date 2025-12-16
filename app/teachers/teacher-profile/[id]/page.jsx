// import TeacherProfileBanner from '@/components/Teachers/TeacherProfile/TeacherProfileBanner/TecherProfileBanner'
// import React from 'react'

// export default function page() {
//   return (
//     <div>
//         <TeacherProfileBanner />
//     </div>
//   )
// }


"use client";
import React, { useState } from 'react';
import { 
  Star, 
  Phone, 
  Play, 
  Award, 
  BookOpen, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle, 
  MessageCircle,
  Heart,
  Share2,
  MapPin,
  Globe,
  ChevronDown,
  PlayCircle
} from 'lucide-react';
import TecherProfileBanner from '@/components/Teachers/TeacherProfile/TeacherProfileBanner/TecherProfileBanner';
import TeacherProfileMainContent from '@/components/Teachers/TeacherProfile/TecherProfileMainContent/TecherProfileMainContent';

const TeacherProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showVideo, setShowVideo] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const teacher = {
    name: "Dr. Amira Hassan",
    title: "Expert Arabic Language Instructor",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=800&h=800&fit=crop",
    phone: "+20 1234 567 890",
    location: "Cairo, Egypt",
    languages: ["Arabic (Native)", "English (Fluent)", "French (Intermediate)"],
    rating: 4.9,
    totalReviews: 247,
    totalStudents: 1205,
    experienceYears: 12,
    brief: "Passionate Arabic educator with over a decade of experience teaching Modern Standard Arabic and Egyptian dialect. Specialized in helping international students master Arabic grammar, conversation, and cultural nuances through innovative teaching methods.",
    fullBio: "Dr. Amira Hassan is a distinguished Arabic language educator with a Ph.D. in Arabic Linguistics from Cairo University. With over 12 years of teaching experience, she has helped thousands of students from around the world achieve fluency in Arabic. Her teaching methodology combines traditional Arabic pedagogy with modern interactive techniques, making learning both effective and enjoyable.",
    introVideo: "https://example.com/intro-video.mp4",
    certificates: [
      { name: "Ph.D. in Arabic Linguistics", institution: "Cairo University", year: "2015" },
      { name: "TESOL Certification", institution: "Cambridge", year: "2018" },
      { name: "Arabic Teaching Excellence Award", institution: "Ministry of Education", year: "2022" }
    ],
    subjects: [
      { 
        id: 1, 
        name: "Modern Standard Arabic", 
        level: "Beginner to Advanced", 
        price: 25, 
        duration: 60,
        description: "Comprehensive MSA course covering grammar, vocabulary, and formal writing"
      },
      { 
        id: 2, 
        name: "Egyptian Dialect", 
        level: "Beginner to Intermediate", 
        price: 22, 
        duration: 60,
        description: "Learn everyday Egyptian Arabic for real-world conversations"
      },
      { 
        id: 3, 
        name: "Quranic Arabic", 
        level: "Intermediate to Advanced", 
        price: 30, 
        duration: 60,
        description: "Classical Arabic focused on Quranic text comprehension"
      },
      { 
        id: 4, 
        name: "Business Arabic", 
        level: "Intermediate to Advanced", 
        price: 35, 
        duration: 60,
        description: "Professional Arabic for business communications and meetings"
      }
    ],
    availability: {
      timezone: "GMT+2 (Cairo)",
      nextAvailable: "Today, 3:00 PM"
    },
    slots: {
    // ISO date (YYYY-MM-DD) => array of 24h times
    "2025-08-05": ["09:00", "10:30", "13:00"],
    "2025-08-06": ["11:00", "15:30"],
  },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* Hero Section */}
    <TecherProfileBanner teacher={teacher}/>

      {/* Main Content */}
      <TeacherProfileMainContent teacher={teacher} />

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
             onClick={() => setShowVideo(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Introduction Video</h3>
              <button 
                onClick={() => setShowVideo(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="aspect-video bg-gray-900 rounded-2xl flex items-center justify-center">
              <p className="text-white">Video Player Would Be Here</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherProfile;