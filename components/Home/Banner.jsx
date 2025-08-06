

import React from 'react'
import { Star, Users, BookOpen, Award } from 'lucide-react';

const Banner = () => {
  return (
      <main className="relative z-10 container mx-auto  md:!px-6 px-3 overflow-hidden py-16 border-b border-primary border-dashed">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-white/40">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className=" text-xs md:text-sm font-medium text-gray-700">WELCOME TO THE EGYPTIAN INSTITUTE OF ARABIC LANGUAGE</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                Upgrade your{' '}
                <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  skills
                </span>
                <br />
                and knowledge with
                <br />
                our{' '}
                <span className="bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                  online course.
                </span>
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                At our institute, we provide engaging and personalized learning experiences to help you unlock fluency, build confidence, and immerse yourself in the beauty of the Arabic language. Whether you're exploring the vibrant Egyptian dialect, mastering Modern Standard Arabic, or seeking fun and interactive kids' classes, we have something for everyone.
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 py-6">
              {[
                { icon: Users, label: 'Students', value: '2K+' },
                { icon: BookOpen, label: 'Courses', value: '50+' },
                { icon: Award, label: 'Success Rate', value: '95%' }
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="text-center group">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-100 to-cyan-100 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">{value}</div>
                  <div className="text-sm text-gray-500">{label}</div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden group">
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>EXPLORE COURSES</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              
              <button className="border-2 border-teal-600 text-teal-700 px-8 py-4 rounded-xl font-semibold hover:bg-teal-600 hover:text-white transition-all duration-300 backdrop-blur-sm bg-white/30">
                DISCOVER MORE
              </button>
            </div>
          </div>

          {/* Right Content - Enhanced Student Image */}
          <div className="relative">
            <div className="relative z-10">
              {/* Decorative dots pattern */}
              <div className="absolute -top-8 -left-8 grid grid-cols-8 gap-2 opacity-60">
                {[...Array(64)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full animate-pulse" style={{animationDelay: `${i * 50}ms`}}></div>
                ))}
              </div>

              {/* Main student illustration placeholder */}
              <div className="relative bg-gradient-to-br from-orange-100 via-yellow-100 to-orange-200 rounded-3xl p-8 shadow-2xl">
                <div className="bg-gradient-to-br from-cyan-400 to-teal-500 rounded-2xl p-6 mb-6">
                  <div className="w-full h-80 bg-gradient-to-br from-white/20 to-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <img  draggable={false} className='select-none' src="/images/banner.png" alt="" />
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-lg animate-bounce">
                  <Star className="w-6 h-6 text-yellow-500" />
                </div>
                
                <div className="absolute top-1/3 -left-6 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl p-3 shadow-lg animate-pulse">
                  <BookOpen className="w-6 h-6" />
                </div>
                
                <div className="absolute bottom-1/4 -right-6 bg-white rounded-xl p-3 shadow-lg animate-bounce delay-500">
                  <Award className="w-6 h-6 text-teal-600" />
                </div>
              </div>

              {/* Background circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-teal-200/30 to-cyan-200/30 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </main>

  )
}

export default Banner
