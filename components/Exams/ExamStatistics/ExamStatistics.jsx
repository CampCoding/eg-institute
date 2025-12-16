"use client";
import { BookOpen, Trophy, Users } from 'lucide-react';
import React, { useState } from 'react';

const features = [
  { 
    icon: BookOpen, 
    title: "Smart Learning", 
    desc: "AI-powered study guides that adapt to your learning style",
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    hoverGradient: "from-emerald-300 via-teal-400 to-cyan-500",
    shadowColor: "shadow-teal-500/30",
    borderColor: "border-teal-400/40"
  },
  { 
    icon: Trophy, 
    title: "Track Progress", 
    desc: "Real-time performance analytics with detailed insights",
    gradient: "from-amber-400 via-orange-500 to-red-500",
    hoverGradient: "from-amber-300 via-orange-400 to-red-400",
    shadowColor: "shadow-orange-500/30",
    borderColor: "border-orange-400/40"
  },
  { 
    icon: Users, 
    title: "Expert Support", 
    desc: "24/7 tutor assistance from certified professionals",
    gradient: "from-purple-400 via-pink-500 to-rose-500",
    hoverGradient: "from-purple-300 via-pink-400 to-rose-400",
    shadowColor: "shadow-pink-500/30",
    borderColor: "border-pink-400/40"
  }
];

export default function ExamStatistics() {
  const [activeFeature, setActiveFeature] = useState(0);
  
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden'>
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-teal-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-orange-400/5 to-red-400/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-cyan-200 to-teal-300 bg-clip-text text-transparent mb-6">
              Exam Statistics
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover powerful features designed to elevate your learning experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`group relative p-8 rounded-3xl backdrop-blur-lg transition-all duration-700 transform hover:scale-105 hover:-translate-y-4 cursor-pointer bg-white/5 border border-white/20 hover:bg-white/10 hover:border-white/30`}
                  style={{
                    animationDelay: `${index * 200}ms`
                  }}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  {/* Glowing effect */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Icon container */}
                  <div className={`relative w-20 h-20 rounded-2xl mb-8 flex items-center justify-center transition-all duration-500 ${
                    activeFeature === index
                      ? `bg-gradient-to-br ${feature.gradient} shadow-lg ${feature.shadowColor} animate-pulse`
                      : `bg-gradient-to-br from-gray-700 to-gray-800 group-hover:bg-gradient-to-br group-hover:${feature.hoverGradient}`
                  }`}>
                    <Icon className="w-10 h-10 text-white drop-shadow-lg" />
                    
                    {/* Floating particles effect */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                      <div className="absolute w-2 h-2 bg-white/30 rounded-full animate-ping" style={{top: '20%', left: '80%', animationDelay: '0s'}}></div>
                      <div className="absolute w-1 h-1 bg-white/40 rounded-full animate-ping" style={{top: '70%', left: '20%', animationDelay: '1s'}}></div>
                      <div className="absolute w-1.5 h-1.5 bg-white/20 rounded-full animate-ping" style={{top: '30%', left: '30%', animationDelay: '2s'}}></div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className={`text-2xl md:text-3xl font-bold mb-4 transition-all duration-300 ${
                    activeFeature === index 
                      ? `bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`
                      : 'text-white group-hover:text-cyan-300'
                  }`}>
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300 text-lg leading-relaxed">
                    {feature.desc}
                  </p>

                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-8 right-8 h-1 rounded-full transition-all duration-500 ${
                    activeFeature === index
                      ? `bg-gradient-to-r ${feature.gradient} opacity-100`
                      : 'bg-white/20 opacity-0 group-hover:opacity-50'
                  }`}></div>

                  {/* Corner decoration */}
                  <div className="absolute top-6 right-6 w-3 h-3 border-t-2 border-r-2 border-white/20 group-hover:border-white/40 transition-colors duration-300"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}