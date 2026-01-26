// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Star,
//   Quote,
//   ChevronLeft,
//   ChevronRight,
//   Award,
//   Users,
//   BookOpen,
//   Clock,
// } from "lucide-react";

// const PRIMARY = "#02AAA0";
// const SECONDARY = "#C9AE6C";

// const testimonials = [
//   {
//     id: 1,
//     name: "Sarah Johnson",
//     role: "Advanced Arabic Student",
//     location: "New York, USA",
//     avatar:
//       "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
//     rating: 5,
//     text:
//       "Ahmad's teaching method is absolutely incredible! I went from struggling with basic vocabulary to having conversations in Arabic within just 6 months. His patience and personalized approach made all the difference. I can't recommend him enough!",
//     course: "Conversational Arabic Mastery",
//     date: "2 weeks ago",
//     verified: true,
//   },
//   {
//     id: 2,
//     name: "Michael Chen",
//     role: "Business Professional",
//     location: "London, UK",
//     avatar:
//       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
//     rating: 5,
//     text:
//       "As someone who needed Arabic for business purposes, Ahmad's structured approach and real-world applications were exactly what I needed. The lessons are engaging, practical, and perfectly tailored to my schedule.",
//     course: "Business Arabic Intensive",
//     date: "1 month ago",
//     verified: true,
//   },
//   {
//     id: 3,
//     name: "Emma Rodriguez",
//     role: "University Student",
//     location: "Madrid, Spain",
//     avatar:
//       "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
//     rating: 5,
//     text:
//       "I was preparing for my Arabic studies abroad and Ahmad helped me build a solid foundation. His cultural insights and grammar explanations are outstanding. I felt completely prepared for my exchange program!",
//     course: "Academic Arabic Preparation",
//     date: "3 weeks ago",
//     verified: true,
//   },
//   {
//     id: 4,
//     name: "David Thompson",
//     role: "Language Enthusiast",
//     location: "Toronto, Canada",
//     avatar:
//       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
//     rating: 5,
//     text:
//       "Ahmad makes learning Arabic enjoyable and accessible. His use of technology, interactive materials, and consistent feedback keeps me motivated. I've tried many language teachers, but none compare to his expertise.",
//     course: "Complete Arabic Journey",
//     date: "1 week ago",
//     verified: true,
//   },
// ];

// const stats = [
//   { icon: <Users className="w-5 h-5" />, value: "500+", label: "Students Taught" },
//   { icon: <Star className="w-5 h-5" />, value: "4.9", label: "Average Rating" },
//   { icon: <BookOpen className="w-5 h-5" />, value: "15+", label: "Courses Created" },
//   { icon: <Clock className="w-5 h-5" />, value: "3000+", label: "Hours Taught" },
// ];

// export default function TeacherProfileTestimonial() {
//   const [current, setCurrent] = useState(0);
//   const currentReview = testimonials[current];

//   const next = () => setCurrent((p) => (p + 1) % testimonials.length);
//   const prev = () =>
//     setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);

//   // Keyboard navigation
//   useEffect(() => {
//     const onKey = (e) => {
//       if (e.key === "ArrowRight") next();
//       if (e.key === "ArrowLeft") prev();
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, []);

//   return (
//     <section className="py-16 px-6 bg-gradient-to-br from-[#F0FBFA] via-white to-[#F0FBFA] relative overflow-hidden">
//       {/* soft background dots */}
//       <div className="pointer-events-none absolute inset-0 opacity-30">
//         <div className="absolute inset-0 bg-[radial-gradient(#02AAA010_1px,transparent_1px)] [background-size:20px_20px]" />
//       </div>

//       <div className="max-w-6xl mx-auto relative">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 shadow"
//             style={{ backgroundColor: PRIMARY, color: "white" }}
//           >
//             <Award className="w-4 h-4" />
//             <span className="text-sm font-semibold">Student Success Stories</span>
//           </div>
//           <h2 className="text-4xl md:text-5xl font-extrabold mb-3 text-slate-900">
//             What My Students Say
//           </h2>
//           <p className="text-lg text-slate-600 max-w-2xl mx-auto">
//             Real feedback from learners who transformed their Arabic journey.
//           </p>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
//           {stats.map((s, i) => (
//             <div
//               key={i}
//               className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border"
//               style={{ borderColor: `${PRIMARY}33` }}
//             >
//               <div
//                 className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center shadow-sm"
//                 style={{ backgroundColor: `${PRIMARY}1A`, color: PRIMARY }}
//               >
//                 {s.icon}
//               </div>
//               <div className="text-2xl font-bold mb-1 text-slate-900">
//                 {s.value}
//               </div>
//               <div className="text-sm text-slate-600">{s.label}</div>
//             </div>
//           ))}
//         </div>

//         {/* Main card with gradient border */}
//         <div className="relative">
//           <div
//             className="rounded-3xl p-[2px] shadow-2xl"
//             style={{
//               background:
//                 `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})`,
//             }}
//           >
//             <div className="bg-white rounded-[calc(1.5rem-2px)] overflow-hidden relative">
//               {/* top ribbon */}
//               <div
//                 className="absolute top-0 left-0 right-0 h-28 opacity-10"
//                 style={{
//                   background: `linear-gradient(135deg, ${PRIMARY} 0%, ${SECONDARY} 100%)`,
//                 }}
//               />
//               <div className="relative p-8 md:p-12">

//                 <div className="grid md:grid-cols-3 gap-8 items-center">
//                   {/* Left: person */}
//                   <div className="text-center md:text-left">
//                     <div className="relative inline-block mb-4">
//                       <img
//                         src={currentReview.avatar}
//                         alt={currentReview.name}
//                         className="w-24 h-24 rounded-full object-cover shadow-lg border-4"
//                         style={{ borderColor: `${PRIMARY}80` }}
//                       />
//                       {currentReview.verified && (
//                         <div
//                           className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center shadow ring-2 ring-white"
//                           style={{ backgroundColor: PRIMARY }}
//                           title="Verified student"
//                         >
//                           <Award className="w-4 h-4 text-white" />
//                         </div>
//                       )}
//                     </div>

//                     <h3 className="text-xl font-bold mb-1 text-slate-900">
//                       {currentReview.name}
//                     </h3>
//                     <p className="text-slate-600 mb-1">{currentReview.role}</p>
//                     <p className="text-sm text-slate-500 mb-3">
//                       {currentReview.location}
//                     </p>

//                     {/* rating */}
//                     <div className="flex justify-center md:justify-start items-center gap-1 mb-3">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`w-4 h-4 ${
//                             i < currentReview.rating
//                               ? "text-yellow-400 fill-yellow-400"
//                               : "text-slate-300"
//                           }`}
//                           aria-hidden="true"
//                         />
//                       ))}
//                       <span className="ml-2 text-sm font-semibold text-slate-900">
//                         {currentReview.rating}.0
//                       </span>
//                     </div>

//                     <div
//                       className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white"
//                       style={{ backgroundColor: SECONDARY }}
//                     >
//                       {currentReview.course}
//                     </div>
//                   </div>

//                   {/* Right: text */}
//                   <div className="md:col-span-2">
//                     <p className="text-lg md:text-xl leading-relaxed mb-6 text-slate-900">
//                       “{currentReview.text}”
//                     </p>

//                     <div className="flex items-center justify-between">
//                       <div className="text-sm text-slate-500">
//                         {currentReview.date}
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={prev}
//                           className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-white"
//                           style={{ backgroundColor: PRIMARY }}
//                           aria-label="Previous testimonial"
//                         >
//                           <ChevronLeft className="w-5 h-5" />
//                         </button>
//                         <button
//                           onClick={next}
//                           className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-white"
//                           style={{ backgroundColor: PRIMARY }}
//                           aria-label="Next testimonial"
//                         >
//                           <ChevronRight className="w-5 h-5" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Indicators */}
//           <div className="flex justify-center gap-2 mt-8">
//             {testimonials.map((t, i) => {
//               const active = i === current;
//               return (
//                 <button
//                   key={t.id}
//                   onClick={() => setCurrent(i)}
//                   aria-label={`Go to testimonial ${i + 1}`}
//                   aria-current={active ? "true" : "false"}
//                   className={`h-2.5 rounded-full transition-all duration-300 ${
//                     active ? "w-8 shadow" : "w-2.5 hover:w-4"
//                   }`}
//                   style={{
//                     backgroundColor: active ? PRIMARY : "#d1d5db",
//                   }}
//                 />
//               );
//             })}
//           </div>
//         </div>

//         {/* Preview cards */}
//         <div className="mt-16 grid md:grid-cols-3 gap-6">
//           {testimonials
//             .filter((_, i) => i !== current)
//             .slice(0, 3)
//             .map((t) => (
//               <button
//                 key={t.id}
//                 onClick={() =>
//                   setCurrent(testimonials.findIndex((x) => x.id === t.id))
//                 }
//                 className="text-left bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border"
//                 style={{ borderColor: `${PRIMARY}26` }}
//               >
//                 <div className="flex items-center gap-3 mb-3">
//                   <img
//                     src={t.avatar}
//                     alt={t.name}
//                     className="w-12 h-12 rounded-full object-cover border-2"
//                     style={{ borderColor: PRIMARY }}
//                   />
//                   <div>
//                     <h4 className="font-semibold text-slate-900">{t.name}</h4>
//                     <div className="flex items-center gap-1">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`w-3 h-3 ${
//                             i < t.rating
//                               ? "text-yellow-400 fill-yellow-400"
//                               : "text-slate-300"
//                           }`}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <p className="text-sm text-slate-600 line-clamp-3">“{t.text}”</p>
//               </button>
//             ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Award,
  Users,
  BookOpen,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const PRIMARY = "#02AAA0";
const SECONDARY = "#C9AE6C";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Advanced Arabic Student",
    location: "New York, USA",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Ahmad's teaching method is absolutely incredible! I went from struggling with basic vocabulary to having conversations in Arabic within just 6 months. His patience and personalized approach made all the difference. I can't recommend him enough!",
    course: "Conversational Arabic Mastery",
    date: "2 weeks ago",
    verified: true,
    progress: "0 → Conversational in 6 months",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Business Professional",
    location: "London, UK",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "As someone who needed Arabic for business purposes, Ahmad's structured approach and real-world applications were exactly what I needed. The lessons are engaging, practical, and perfectly tailored to my schedule.",
    course: "Business Arabic Intensive",
    date: "1 month ago",
    verified: true,
    progress: "Landed dream job in Dubai",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "University Student",
    location: "Madrid, Spain",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "I was preparing for my Arabic studies abroad and Ahmad helped me build a solid foundation. His cultural insights and grammar explanations are outstanding. I felt completely prepared for my exchange program!",
    course: "Academic Arabic Preparation",
    date: "3 weeks ago",
    verified: true,
    progress: "Aced university entrance exam",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Language Enthusiast",
    location: "Toronto, Canada",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Ahmad makes learning Arabic enjoyable and accessible. His use of technology, interactive materials, and consistent feedback keeps me motivated. I've tried many language teachers, but none compare to his expertise.",
    course: "Complete Arabic Journey",
    date: "1 week ago",
    verified: true,
    progress: "Completed 4 levels successfully",
  },
];

const stats = [
  {
    icon: <Users className="w-6 h-6" />,
    value: "500+",
    label: "Students Taught",
    color: "#FF6B6B",
  },
  {
    icon: <Star className="w-6 h-6" />,
    value: "4.9",
    label: "Average Rating",
    color: "#FFD93D",
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    value: "15+",
    label: "Courses Created",
    color: "#6BCF7F",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    value: "3000+",
    label: "Hours Taught",
    color: "#4D96FF",
  },
];

export default function TeacherProfileTestimonial() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const currentReview = testimonials[current];

  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((p) => (p + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(next, 8000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Enhanced background pattern */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(2,170,160,0.05)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(201,174,108,0.05)_0%,transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_49%,rgba(2,170,160,0.02)_50%,transparent_51%)] bg-[length:20px_20px]" />
      </div>

      {/* Floating elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-30 animate-pulse" />
        <div
          className="absolute top-40 right-20 w-3 h-3 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-30 animate-bounce"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-40 left-20 w-2 h-2 bg-gradient-to-r from-green-400 to-teal-400 rounded-full opacity-30 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>
    </section>
  );
}
