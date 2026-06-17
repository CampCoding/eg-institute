"use client";
import { CheckCircle, Download, FileText, Upload } from "lucide-react";
import React, { useState } from "react";

export default function ExamPdfQuestions({ activeTab }) {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setUploadedFile(file);
    }
  };

  return (
    <div
      className={`transition-all duration-500 transform ${
        activeTab === 1
          ? "opacity-100 translate-x-0"
          : "opacity-0 absolute inset-0 translate-x-full"
      }`}
    >
      <div className="p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#02AAA0] to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">PDF Exam</h2>
          <p className="text-gray-600">
            Download, solve offline, and upload your answers
          </p>
        </div>

        {/* Download Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Download className="w-5 h-5 text-[#02AAA0]" />
              Step 1: Download Exam
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Get your exam paper in PDF format
            </p>
            <button className="w-full bg-gradient-to-r from-[#02AAA0] to-cyan-500 text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Upload className="w-5 h-5 text-[#02AAA0]" />
              Step 2: Upload Solution
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Upload your completed exam
            </p>
            <div className="relative">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" />
                Choose File
              </button>
            </div>
          </div>
        </div>

        {/* Upload Status */}
        {uploadedFile && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-xl mb-6 animate-pulse">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">File uploaded successfully!</span>
              <span className="text-green-100">({uploadedFile.name})</span>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="font-semibold text-gray-800 mb-3">Instructions:</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-[#02AAA0] rounded-full mt-2 flex-shrink-0"></div>
              Download the PDF exam paper
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-[#02AAA0] rounded-full mt-2 flex-shrink-0"></div>
              Print or solve digitally
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-[#02AAA0] rounded-full mt-2 flex-shrink-0"></div>
              Scan/save your answers as PDF
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-[#02AAA0] rounded-full mt-2 flex-shrink-0"></div>
              Upload the completed file
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
