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
    text:
      "Ahmad's teaching method is absolutely incredible! I went from struggling with basic vocabulary to having conversations in Arabic within just 6 months. His patience and personalized approach made all the difference. I can't recommend him enough!",
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
    text:
      "As someone who needed Arabic for business purposes, Ahmad's structured approach and real-world applications were exactly what I needed. The lessons are engaging, practical, and perfectly tailored to my schedule.",
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
    text:
      "I was preparing for my Arabic studies abroad and Ahmad helped me build a solid foundation. His cultural insights and grammar explanations are outstanding. I felt completely prepared for my exchange program!",
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
    text:
      "Ahmad makes learning Arabic enjoyable and accessible. His use of technology, interactive materials, and consistent feedback keeps me motivated. I've tried many language teachers, but none compare to his expertise.",
    course: "Complete Arabic Journey",
    date: "1 week ago",
    verified: true,
    progress: "Completed 4 levels successfully",
  },
];

const stats = [
  { icon: <Users className="w-6 h-6" />, value: "500+", label: "Students Taught", color: "#FF6B6B" },
  { icon: <Star className="w-6 h-6" />, value: "4.9", label: "Average Rating", color: "#FFD93D" },
  { icon: <BookOpen className="w-6 h-6" />, value: "15+", label: "Courses Created", color: "#6BCF7F" },
  { icon: <Clock className="w-6 h-6" />, value: "3000+", label: "Hours Taught", color: "#4D96FF" },
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
        <div className="absolute top-40 right-20 w-3 h-3 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-30 animate-bounce" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-40 left-20 w-2 h-2 bg-gradient-to-r from-green-400 to-teal-400 rounded-full opacity-30 animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
               style={{ background: 'linear-gradient(to right, rgb(15, 23, 42), rgb(51, 65, 85))' }}>
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-semibold">Student Success Stories</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight"
              style={{ 
                background: 'linear-gradient(to bottom right, rgb(15, 23, 42), rgb(51, 65, 85), rgb(100, 116, 139))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
            What My Students Say
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Real feedback from learners who transformed their Arabic journey with personalized guidance and proven methods.
          </p>
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((s, i) => (
            <div
              key={i}
              className="group bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 relative overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div
                  className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300"
                  style={{ 
                    backgroundColor: s.color + "20",
                    color: s.color
                  }}
                >
                  {s.icon}
                </div>
                <div className="text-3xl font-black mb-2 text-slate-900 group-hover:scale-105 transition-transform duration-300">
                  {s.value}
                </div>
                <div className="text-sm font-medium text-slate-600">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Main Testimonial Card */}
        <div className="relative mb-16">
          <div 
            className="absolute inset-0 rounded-4xl opacity-20 blur-xl transform rotate-1"
            style={{ background: 'linear-gradient(to right, rgb(37, 99, 235), rgb(147, 51, 234), rgb(20, 184, 166))' }}
          />
          <div
            className="relative rounded-4xl p-[3px] shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY}, ${PRIMARY})`,
              borderRadius: '2rem'
            }}
          >
            <div 
              className="bg-white overflow-hidden relative"
              style={{ borderRadius: 'calc(2rem - 3px)' }}
            >
              {/* Animated background */}
              <div 
                className="absolute inset-0 opacity-60"
                style={{ background: 'linear-gradient(to bottom right, rgb(248, 250, 252), white, rgb(239, 246, 255))' }}
              />
              <div className="absolute top-0 right-0 w-96 h-96 opacity-30 rounded-full -translate-y-48 translate-x-48" 
                   style={{ background: 'linear-gradient(to bottom left, rgba(59, 130, 246, 0.1), transparent)' }} />
              
              <div className={`relative p-10 md:p-16 transition-all duration-500 ${isAnimating ? 'opacity-70 scale-95' : 'opacity-100 scale-100'}`}>
                <div className="grid md:grid-cols-5 gap-12 items-center">
                  {/* Enhanced Left Section */}
                  <div className="md:col-span-2 text-center md:text-left">
                    <div className="relative inline-block mb-6">
                      <div 
                        className="absolute inset-0 rounded-full blur-md opacity-20 scale-110"
                        style={{ background: 'linear-gradient(to right, rgb(96, 165, 250), rgb(168, 85, 247))' }}
                      />
                      <img
                        src={currentReview.avatar}
                        alt={currentReview.name}
                        className="relative w-32 h-32 rounded-full object-cover shadow-xl border-4 border-white"
                      />
                      {currentReview.verified && (
                        <div
                          className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white animate-pulse"
                          style={{ backgroundColor: PRIMARY }}
                          title="Verified student"
                        >
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </div>

                    <h3 className="text-2xl font-black mb-2 text-slate-900">
                      {currentReview.name}
                    </h3>
                    <p className="text-slate-700 font-medium mb-1">{currentReview.role}</p>
                    {/* <p className="text-sm text-slate-500 mb-4 flex items-center justify-center md:justify-start gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full" />
                      {currentReview.location}
                    </p> */}

                    {/* Enhanced rating */}
                    <div className="flex justify-center md:justify-start items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 transition-all duration-300 ${
                            i < currentReview.rating
                              ? "text-yellow-400 fill-yellow-400 drop-shadow-sm"
                              : "text-slate-300"
                          }`}
                        />
                      ))}
                      <span className="ml-3 text-lg font-black text-slate-900">
                        {currentReview.rating}.0
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div
                        className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg"
                        style={{ backgroundColor: SECONDARY }}
                      >
                        {currentReview.course}
                      </div>
                      
                      {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-semibold">
                        <ArrowRight className="w-4 h-4" />
                        {currentReview.progress}
                      </div> */}
                    </div>
                  </div>

                  {/* Enhanced Right Section */}
                  <div className="md:col-span-3 relative">
                    <Quote className="w-12 h-12 text-slate-300 mb-4" />
                    <blockquote className="text-xl md:text-2xl leading-relaxed mb-8 text-slate-800 font-medium">
                      {currentReview.text}
                    </blockquote>

                    <div className="flex items-center justify-between">
                      {/* <div className="text-sm text-slate-500 font-medium">
                        {currentReview.date}
                      </div> */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={prev}
                          disabled={isAnimating}
                          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-white disabled:opacity-50"
                          style={{ background: 'linear-gradient(to right, rgb(51, 65, 85), rgb(15, 23, 42))' }}
                          aria-label="Previous testimonial"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={next}
                          disabled={isAnimating}
                          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-white disabled:opacity-50"
                          style={{ background: 'linear-gradient(to right, rgb(51, 65, 85), rgb(15, 23, 42))' }}
                          aria-label="Next testimonial"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Indicators */}
          <div className="flex justify-center gap-3 mt-10">
            {testimonials.map((t, i) => {
              const active = i === current;
              return (
                <button
                  key={t.id}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={active ? "true" : "false"}
                  className={`h-3 rounded-full transition-all duration-500 shadow-lg ${
                    active ? "w-12 shadow-xl" : "w-3 hover:w-6"
                  }`}
                  style={{
                    backgroundColor: active ? PRIMARY : "#cbd5e1",
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Enhanced Preview Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials
            .filter((_, i) => i !== current)
            .slice(0, 3)
            .map((t, index) => (
              <button
                key={t.id}
                onClick={() =>
                  setCurrent(testimonials.findIndex((x) => x.id === t.id))
                }
                className="group text-left bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-16 h-16 rounded-full object-cover border-3 shadow-lg group-hover:scale-110 transition-transform duration-300"
                      style={{ borderColor: PRIMARY }}
                    />
                    <div>
                      <h4 className="font-black text-slate-900 text-lg">{t.name}</h4>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < t.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-slate-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600 line-clamp-3 leading-relaxed">"{t.text}"</p>
                  
                  <div className="mt-4 inline-flex items-center text-sm font-semibold text-slate-500 group-hover:text-slate-700 transition-colors">
                    Read more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            ))}
        </div>
      </div>
    </section>
  );
}