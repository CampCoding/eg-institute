"use client";
import { PlayCircle, Video } from 'lucide-react'
import React, { useState } from 'react'

export default function TeacherProfileVideoIntroduction({teacher}) {
    const [showVideo , setShowVideo] = useState(false);
  return (
    <div>  {/* Introduction Video */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <Video className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Introduction Video</h3>
                </div>
                
                <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden group cursor-pointer transform hover:scale-[1.02] transition-all duration-500 shadow-2xl"
                     onClick={() => setShowVideo(true)}>
                  <img
                    src={teacher.image}
                    alt="Video thumbnail"
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity duration-300"
                  />
                  
                  {/* Play button with enhanced animation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-2xl">
                        <PlayCircle className="w-16 h-16 text-white group-hover:text-teal-200 transition-colors duration-300" />
                      </div>
                      <div className="absolute inset-0 bg-white/10 rounded-full animate-ping"></div>
                    </div>
                  </div>
                  
                  {/* Video info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="font-bold text-lg">Meet {teacher.name.split(' ')[1]}</p>
                        <p className="text-sm opacity-90">Personal Introduction</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-sm font-medium">3:24</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div></div>
  )
}
