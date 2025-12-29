"use client";
import { Sparkles, Star, Award, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleGetAllTeachers } from "../../../libs/features/teacherSlice";

export default function TeacherSection() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const { all_Teachers_loading, all_Teachers_data } = useSelector(
    (state) => state.teachers
  );
  const dispatch = useDispatch();
  console.log(all_Teachers_data);
  useEffect(() => {
    dispatch(handleGetAllTeachers());
  }, []);
  const teachers = all_Teachers_data?.message?.map((teacher) => {
    return {
      id: teacher.teacher_id,
      name: teacher.teacher_name,
      role: teacher.specialization ?? "Modern Standards Arabic",
      photo:
        teacher.teacher_image ??
        "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=600&h=600&fit=crop",
      bio:
        teacher.bio ??
        "Specialist in advanced syntax and media Arabic with 10+ years teaching experience.",
      rating: teacher.rate ?? 4.9,
      students: 1200,
      specialties: teacher.languages.split("**"),
      level: teacher.level ?? "Expert",
    };
  }) || [
    {
      id: "t1",
      name: "Dr. Amira Hassan",
      role: "Modern Standard Arabic",
      photo:
        "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=600&h=600&fit=crop",
      bio: "Specialist in advanced syntax and media Arabic with 10+ years teaching experience.",
      rating: 4.9,
      students: 1200,
      specialties: ["Grammar", "Media Arabic", "Academic Writing"],
    },
    {
      id: "t2",
      name: "Omar El-Sayed",
      role: "Egyptian Dialect",
      photo:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=600&fit=crop",
      bio: "Focuses on everyday conversation, street phrases, and cultural nuance.",
      rating: 4.8,
      students: 950,
      specialties: ["Conversation", "Culture", "Slang"],
    },
    {
      id: "t3",
      name: "Nour Fathy",
      role: "Pronunciation & Phonetics",
      photo:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=600&h=600&fit=crop",
      bio: "Helps learners master vowel length, emphatics, and natural stress patterns.",
      rating: 4.9,
      students: 800,
      specialties: ["Phonetics", "Accent", "Speaking"],
    },
  ];

  const router = useRouter();

  return (
    <section className="relative px-4 py-20 md:py-28 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-teal-50"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-teal-100/40 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-cyan-100/40 to-transparent rounded-full blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 md:mb-20 text-center">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-teal-500/10 backdrop-blur-sm rounded-full px-8 py-4 mb-8 border border-teal-200/50 shadow-sm">
            <Sparkles className="w-5 h-5 text-teal-600 animate-pulse" />
            <span className="text-teal-700 font-semibold text-lg">
              Meet Our Expert Teachers
            </span>
            <Award className="w-5 h-5 text-teal-600" />
          </div>

          <h2 className="text-6xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight">
            Learn from{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 bg-clip-text text-transparent">
                Masters
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full opacity-60"></div>
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our experienced educators combine deep linguistic knowledge with
            innovative teaching methods to accelerate your Arabic learning
            journey.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {teachers.map((teacher, index) => (
            <article
              key={teacher.id}
              className="group relative h-full"
              onMouseEnter={() => setHoveredCard(teacher.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`,
              }}
            >
              {/* Card */}
              <div className="relative h-full rounded-3xl bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:-translate-y-2">
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10`}
                ></div>

                <div className="relative aspect-[4/3] overflow-hidden rounded-t-3xl">
                  <img
                    src={teacher.photo}
                    alt={teacher.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                    onError={(e) => {
                      const img = e.currentTarget;
                      img.onerror = null; // ✅ prevent infinite loop
                      img.src =
                        "https://plus.unsplash.com/premium_photo-1661942126259-fb08e7cce1e2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
                    }}
                  />

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-bold text-gray-900">
                        {teacher.rating}
                      </span>
                    </div>
                  </div>

                  {/* Floating Action Button */}
                  <div
                    className={`absolute bottom-4 right-4 transition-all duration-300 ${
                      hoveredCard === teacher.id
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    <button className="bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="relative h-full   p-8 z-20">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors duration-300">
                      {teacher.name}
                    </h3>
                    <p className="text-teal-600 font-semibold text-lg mb-3">
                      {teacher.role}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {teacher.bio}
                    </p>
                  </div>

                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {teacher.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 text-sm font-medium rounded-full border border-teal-200/50"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        {teacher.students}+ students
                      </span>
                    </div>
                    <span className="text-teal-600 font-semibold">
                      {teacher.level} Level
                    </span>
                  </div>

                  <button
                    onClick={() => router.push(`/teachers/teacher-profile/1`)}
                    className="w-full mt-auto bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg group/btn"
                  >
                    <span className="flex  items-center justify-center gap-2">
                      Details
                      <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
