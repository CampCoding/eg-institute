"use client";
import { Award, CheckCircle, Download } from "lucide-react";
import React, { useState } from "react";

export default function TeacherProfileCertifications({ teacher }) {
  const [hoveredCert, setHoveredCert] = useState(null);

  return (
    <div>
      {/* <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center">
            <Award className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            Certificates & Awards
          </h3>
        </div>

        <div className="space-y-4">
          {teacher.certificates.map((cert, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-5 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-2xl hover:from-yellow-50 hover:to-orange-50 transition-all duration-300 cursor-pointer group transform hover:scale-[1.02]"
              onMouseEnter={() => setHoveredCert(index)}
              onMouseLeave={() => setHoveredCert(null)}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-lg group-hover:text-orange-700 transition-colors duration-300">
                  {cert.name}
                </h4>
                <p className="text-gray-600 font-medium">{cert.institution}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm text-orange-600 font-bold">
                    {cert.year}
                  </p>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
