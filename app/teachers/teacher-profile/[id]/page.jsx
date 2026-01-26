"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { PlayCircle } from "lucide-react";
import TecherProfileBanner from "@/components/Teachers/TeacherProfile/TeacherProfileBanner/TecherProfileBanner";
import TeacherProfileMainContent from "@/components/Teachers/TeacherProfile/TecherProfileMainContent/TecherProfileMainContent";
import { base_url } from "../../../../libs/constant";
import { useParams } from "next/navigation";

const TeacherProfile = ({}) => {
  const [showVideo, setShowVideo] = useState(false);
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const teacher_id = useParams();

  // Get token from localStorage
  const getAuthToken = () => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("EGYPTIANINTITUTETOKENNAME") ||
        localStorage.getItem("AccessToken") ||
        localStorage.getItem("token")
      );
    }
    return null;
  };

  const transformTeacherData = (apiResponse) => {
    const teacherData = apiResponse.message;

    // Generate time slots calendar
    const transformSlotsToCalendar = (teacherSlots) => {
      const slots = {};
      const today = new Date();

      for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
        const dateISO = date.toISOString().slice(0, 10);

        const daySlot = teacherSlots.find(
          (slot) => slot.day === dayName && slot.hidden === "0"
        );

        if (daySlot) {
          const timeSlots = generateTimeSlots(
            daySlot.slots_from,
            daySlot.slots_to
          );
          slots[dateISO] = timeSlots;
        }
      }

      return slots;
    };

    const generateTimeSlots = (fromTime, toTime) => {
      const slots = [];
      const from = new Date(`2000-01-01 ${fromTime}`);
      const to = new Date(`2000-01-01 ${toTime}`);

      let current = new Date(from);
      while (current < to) {
        slots.push(current.toTimeString().slice(0, 5));
        current.setHours(current.getHours() + 1);
      }

      return slots;
    };

    // Transform courses to subjects
    const transformCoursesToSubjects = (courses) => {
      if (!Array.isArray(courses)) return [];

      return courses.map((course) => ({
        id: course.teacher_subject_id,
        name: course.course_name,
        level: course.level,
        price: parseInt(course.private_price) || 0,
        duration: parseInt(course.Duration) || 60,
        description: course.course_descreption || course.overview || "",
        overview: course.overview || "",
        type: course.type,
        lessons: course.lessons,
        groupPrice: parseInt(course.group_price) || 0,
        privatePrice: parseInt(course.private_price) || 0,
        image: course.image || "",
        video: course.video || "",
        advertisingVideo: course.advertising_video || "",
        willLearn: course.wiil_learn
          ? course.wiil_learn.split("**CAMP**").filter(Boolean)
          : [],
        features: course.feature
          ? course.feature.split("**CAMP**").filter(Boolean)
          : [],
        createdAt: course.created_at,
        hidden: course.hidden,
      }));
    };

    // Helper to capitalize first letter
    const capitalizeFirstLetter = (str) => {
      if (!str) return "";
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    return {
      // Basic Info
      id: teacherData.teacher_id,
      name: teacherData.teacher_name,
      title: teacherData.specialization || "Language Instructor",
      image: teacherData.teacher_image || "",
      phone: teacherData.phone || "",
      email: teacherData.teacher_email || "",

      // Location & Languages
      location: teacherData.country || "Not specified",
      languages: Array.isArray(teacherData.languages)
        ? teacherData.languages
        : [],
      timezone: teacherData.time_zone || "GMT+0",

      // Stats
      rating: parseFloat(teacherData.rate) || 0,
      totalReviews: 247, // Static for now, add to API if available
      totalStudents: parseInt(teacherData.student_count) || 0,
      classCount: parseInt(teacherData.class_count) || 0,
      experienceYears: teacherData.experience_hours
        ? Math.floor(parseInt(teacherData.experience_hours) / 1000)
        : 0,

      // Bio & Description
      brief: teacherData.bio || `Expert ${teacherData.specialization} teacher`,
      fullBio:
        teacherData.bio ||
        `Experienced ${teacherData.specialization} instructor with ${teacherData.experience_hours || 0} hours of teaching experience.`,

      // Videos - ✅ IMPORTANT: Use teacher.video for intro
      video: teacherData.video || "",
      introVideo: teacherData.video || "",
      videoUrl: teacherData.video || "",

      // Professional Info
      specialization: teacherData.specialization || "",
      hourlyRate: parseInt(teacherData.hourly_rate) || 0,
      level: capitalizeFirstLetter(teacherData.level) || "Beginner",
      tags: teacherData.tags
        ? teacherData.tags.split(",").map((tag) => tag.trim())
        : [],

      // Metadata
      hidden: teacherData.hidden,
      createdAt: teacherData.created_at,

      // Transformed Data
      subjects: transformCoursesToSubjects(teacherData.teacher_courses || []),
      slots: transformSlotsToCalendar(teacherData.teacher_slots || []),
      teacher_slots: teacherData.teacher_slots || [],

      // Certificates (static for now)
      certificates: [
        {
          name: `${teacherData.specialization || "Teaching"} Certification`,
          institution: "Certified Institution",
          year: "2020",
        },
        {
          name: "Teaching Excellence Award",
          institution: "Educational Board",
          year: "2023",
        },
      ],

      // Availability
      availability: {
        timezone: teacherData.time_zone || "GMT+0",
        nextAvailable: "Available today",
      },

      // Raw data for reference
      rawData: teacherData,
      rawCourses: teacherData.teacher_courses || [],
    };
  };

  // Fetch teacher data
  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = getAuthToken();

        if (!token) {
          throw new Error("Authentication token not found. Please login.");
        }

        const response = await axios.post(
          `${base_url}/teachers/select_teacher_profile.php`,
          {
            teacher_id: teacher_id?.id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            timeout: 10000,
          }
        );

        console.log("API Response:", response.data);

        if (response.data && response.data.status === "success") {
          const transformedTeacher = transformTeacherData(response.data);
          console.log("Transformed Teacher:", transformedTeacher);
          setTeacher(transformedTeacher);
        } else {
          throw new Error(
            response.data?.message || "Failed to load teacher data"
          );
        }
      } catch (error) {
        console.error("Error fetching teacher data:", error);

        if (error.response) {
          setError(
            `Server error: ${error.response.status} - ${error.response.data?.message || "Unknown error"}`
          );
        } else if (error.request) {
          setError(
            "Network error: Unable to connect to server. Please check your internet connection."
          );
        } else {
          setError(error.message || "An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, [teacher_id?.id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-teal-500 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Loading Teacher Profile
            </h2>
            <p className="text-gray-600">
              Please wait while we fetch the teacher information...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-500 text-2xl">⚠</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Error Loading Teacher
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
              >
                Try Again
              </button>
              <button
                onClick={() => window.history.back()}
                className="w-full bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No teacher data
  if (!teacher) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Teacher Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The requested teacher profile could not be found.
            </p>
            <button
              onClick={() => window.history.back()}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* Hero Section */}
      <TecherProfileBanner teacher={teacher} />

      {/* Main Content */}
      <TeacherProfileMainContent teacher={teacher} />
    </div>
  );
};

export default TeacherProfile;
