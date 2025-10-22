import { Award, Calendar, Heart, MapPin, MessageCircle, Share2, Star, Users } from 'lucide-react'
import React, { useState } from 'react'
import TeacherReservationLessonModal from '../TeacherReservationLessonModal/TeacherReservationLessonModal';

export default function TecherProfileBanner({teacher}) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
          <div className="relative overflow-hidden bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full translate-y-40 -translate-x-40"></div>
                
                <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-20">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">

                    <div className="lg:col-span-1">
                      <div className="relative">
                        <div className="relative w-80 h-80 mx-auto">
                          <img
                            src={teacher.image}
                            alt={teacher.name}
                            className="w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-white/20"
                          />
                          <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl">
                            <div className="flex items-center gap-2">
                              <Star className="w-6 h-6 text-yellow-500 fill-current" />
                              <span className="text-2xl font-bold text-gray-900">{teacher.rating}</span>
                              <span className="text-gray-600">({teacher.totalReviews})</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
        
                    {/* Teacher Details */}
                    <div className="lg:col-span-2 text-white">
                      <div className="space-y-6">
                        <div>
                          <h1 className="text-5xl md:text-6xl font-black mb-3">{teacher.name}</h1>
                          <p className="text-2xl text-teal-100 font-medium mb-6">{teacher.title}</p>
                          
                          <div className="flex flex-wrap gap-6 text-lg">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-5 h-5 text-teal-200" />
                              <span>{teacher.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-5 h-5 text-teal-200" />
                              <span>{teacher.totalStudents}+ Students</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Award className="w-5 h-5 text-teal-200" />
                              <span>{teacher.experienceYears} Years Experience</span>
                            </div>
                          </div>
                        </div>
        
                        <p className="text-xl text-teal-50 leading-relaxed max-w-3xl">
                          {teacher.brief}
                        </p>
        
                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4 pt-4">
                          <button 
                          onClick={() => setOpenModal(true)}
                          className="bg-white text-teal-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-xl">
                            <Calendar className="w-6 h-6 inline mr-2" />
                            Reserve Lesson
                          </button>
                          <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-4 rounded-2xl font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30">
                            <MessageCircle className="w-5 h-5 inline mr-2" />
                            Send Message
                          </button>
                          <button className="bg-white/20 backdrop-blur-sm text-white p-4 rounded-2xl hover:bg-white/30 transition-all duration-300 border border-white/30">
                            <Heart className="w-5 h-5" />
                          </button>
                          <button className="bg-white/20 backdrop-blur-sm text-white p-4 rounded-2xl hover:bg-white/30 transition-all duration-300 border border-white/30">
                            <Share2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <TeacherReservationLessonModal open={openModal} setOpen={setOpenModal} data={teacher}/>
    </div>
  )
}
