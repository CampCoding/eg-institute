"use client";
import { DatabaseZap, Headset, MessageSquareMore, ArrowRight, Sparkles, Star, Trophy, Users, Clock, CheckCircle } from "lucide-react";
import React, { useState, useEffect } from "react";

const items = [
  {
    id: 1,
    title: "24/7 Support",
    desc: "We are always available and you can count on our help whenever you have a question.",
    icon: <Headset className="h-8 w-8" />,
    gradient: "from-blue-500 via-cyan-500 to-blue-600",
    bgColor: "bg-blue-50",
    ringColor: "ring-blue-100/50",
    stats: "1.2k+ Resolved",
    badge: "Live Support",
    delay: 0,
  },
  {
    id: 2,
    title: "Free Courses",
    desc: "In our academy, we have prepared a lot of free and quality lessons for you.",
    icon: <MessageSquareMore className="h-8 w-8" />,
    gradient: "from-purple-500 via-pink-500 to-purple-600",
    bgColor: "bg-purple-50",
    ringColor: "ring-purple-100/50",
    stats: "500+ Courses",
    badge: "Premium Content",
    delay: 200,
  },
  {
    id: 3,
    title: "Powerful Program",
    desc: "Our programs are up-to-date with prevailing practices. So feel free to start.",
    icon: <DatabaseZap className="h-8 w-8" />,
    gradient: "from-emerald-500 via-teal-500 to-emerald-600",
    bgColor: "bg-emerald-50",
    ringColor: "ring-emerald-100/50",
    stats: "98% Success",
    badge: "AI-Powered",
    delay: 400,
  },
];

export default function TeacherReasons() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    const section = document.getElementById('teacher-reasons');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      id="teacher-reasons"
      className="relative min-h-screen px-4 py-24 overflow-hidden"
    >

      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl transition-all duration-1000"
          style={{
            left: `${mousePosition.x * 0.3}%`,
            top: `${mousePosition.y * 0.2}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-to-br from-pink-500/15 to-cyan-500/15 rounded-full blur-2xl transition-all duration-1500"
          style={{
            right: `${(100 - mousePosition.x) * 0.2}%`,
            bottom: `${(100 - mousePosition.y) * 0.3}%`,
            transform: 'translate(50%, 50%)'
          }}
        />
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse opacity-30" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">

        <div className={`text-center mb-20 transform transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 text-white text-sm font-medium mb-8">
            <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
            <span>Premium Learning Experience</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-200">
              3 Reasons To
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 relative">
              Choose Us
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-pulse" />
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Experience learning like never before with our cutting-edge platform designed for modern learners
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {items.map((item, index) => (
            <article
              key={item.id}
              className={`group relative transform transition-all duration-700 hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              } ${hoveredCard === item.id ? 'z-20' : 'z-10'}`}
              style={{ 
                transitionDelay: `${item.delay}ms`,
                animationDelay: `${item.delay}ms`
              }}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Glow Effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${item.gradient} rounded-3xl blur opacity-20 group-hover:opacity-60 transition-all duration-500`} />
              
              {/* Main Card */}
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-full overflow-hidden">
                {/* Floating Badge */}
                <div className="absolute -top-3 -right-3 z-10">
                  <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${item.gradient} text-white text-xs font-semibold shadow-lg`}>
                    {item.badge}
                  </div>
                </div>

                {/* Stats Counter */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium">
                    <div className={`w-2 h-2 bg-gradient-to-r ${item.gradient} rounded-full animate-pulse`} />
                    {item.stats}
                  </div>
                </div>

                {/* Enhanced Icon Container */}
                <div className="flex justify-center mb-8 mt-8">
                  <div className={`relative w-24 h-24 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center shadow-2xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-500`}>
                    <div className="text-white relative z-10">
                      {item.icon}
                    </div>
                    
                    {/* Sparkle effects */}
                    <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Star className="h-4 w-4 text-yellow-400 animate-pulse" />
                    </div>
                    <div className="absolute -bottom-2 -left-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      <Sparkles className="h-4 w-4 text-cyan-400 animate-bounce" />
                    </div>

                    {/* Rotating ring */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.gradient} opacity-30 animate-spin`} style={{ animationDuration: '8s' }} />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-200 transition-all duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-300 leading-relaxed mb-6 group-hover:text-slate-200 transition-colors">
                    {item.desc}
                  </p>

                  {/* Enhanced CTA */}
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${item.gradient} text-white text-sm font-medium transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 cursor-pointer hover:scale-105`}>
                    <span>Explore Feature</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Animated bottom border */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left rounded-b-3xl`} />
                
                {/* Floating particles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                  <div className={`absolute top-1/4 left-1/4 w-2 h-2 bg-gradient-to-r ${item.gradient} rounded-full opacity-0 group-hover:opacity-60 transition-all duration-1000 animate-bounce`} style={{ animationDelay: '0.5s' }} />
                  <div className={`absolute top-3/4 right-1/4 w-1 h-1 bg-gradient-to-r ${item.gradient} rounded-full opacity-0 group-hover:opacity-80 transition-all duration-1000 animate-pulse`} style={{ animationDelay: '1s' }} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}