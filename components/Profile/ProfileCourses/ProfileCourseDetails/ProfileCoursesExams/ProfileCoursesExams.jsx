// "use client";
import { Modal } from "antd";
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Download,
  Eye,
  Lock,
  Star,
  Target,
  Trophy,
  Upload,
  Zap,
} from "lucide-react";
import { Spin } from "antd";
import { useRouter, useParams } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleGetQuizzes } from "@/libs/features/coursesSlice";
import toast from "react-hot-toast";
import usePdfUploader from "../../../../../libs/shared/PdfUploader";
import { base_url } from "../../../../../libs/constant";
import { _post } from "../../../../../libs/shared/api";

export default function ProfileCoursesExams() {
  const dispatch = useDispatch();
  const { upload } = usePdfUploader("/pdf_uplouder.php");

  const { id } = useParams();
  const { quizzes_data, quizzes_loading } = useSelector(
    (state) => state.courses
  );
  const router = useRouter();

  const [viewResultModal, setViewResultModal] = useState(false);
  const [downloadedExams, setDownloadedExams] = useState([]);

  // ✅ per-exam uploading state (instead of global)
  const [uploadingId, setUploadingId] = useState(null);

  // ✅ refs to reset file input per exam
  const fileInputsRef = useRef({});

  useEffect(() => {
    if (id) {
      dispatch(handleGetQuizzes({ data: { student_id: id } }));
    }
  }, [id, dispatch]);

  const exams =
    quizzes_data?.message?.flatMap((group) => group.group_quizes) || [];
  const solved = exams?.filter((exam) => exam.solved === 1);

  console.log(exams);

  const handleDownload = async (exam) => {
    try {
      const res = await fetch(exam.quiz_url, { method: "GET" });
      if (!res.ok) throw new Error("Failed to fetch file");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${exam.quiz_title || "quiz"}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      setDownloadedExams((prev) =>
        prev.includes(exam.quiz_id) ? prev : [...prev, exam.quiz_id]
      );
    } catch (err) {
      console.error(err);
      Modal.error({
        title: "Download Failed",
        content: "Could not download the file. Please try again later.",
        centered: true,
      });
    }
  };

  const handleUploadAnswer = async (e, examId) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ✅ IMPORTANT: reset input value so same file triggers onChange next time
    e.target.value = "";

    if (file.type !== "application/pdf") {
      toast.error("Please select a PDF file");
      return;
    }

    // ✅ prevent double upload
    if (uploadingId) return;

    try {
      setUploadingId(examId);

      // 1) upload file to /pdf_uplouder.php
      const response = await upload(file);

      if (response?.status !== "success" || !response?.file_url) {
        toast.error(response?.message || "Upload failed");
        return;
      }

      // 2) send record to upload_solved_quiz.php
      const uploadFile = await _post(
        `${base_url}/units/content/quizes/upload_solved_quiz.php`,
        {
          student_id: id,
          quiz_id: examId,
          solved_quiz_url: response.file_url,
        }
      );

      if (uploadFile?.data?.status === "success") {
        toast.success(uploadFile?.data?.message || "Uploaded Successfully ✅");

        // ✅ refresh list
        dispatch(handleGetQuizzes({ data: { student_id: id } }));

        // ✅ reset input ref too (extra safety)
        if (fileInputsRef.current[examId]) {
          fileInputsRef.current[examId].value = "";
        }
      } else {
        toast.error(uploadFile?.data?.message || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Upload failed");
    } finally {
      setUploadingId(null);
    }
  };

  if (quizzes_loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-8 px-4">
      {/* Exam Performance Overview */}
      <div className="relative overflow-hidden mt-5 bg-gradient-to-br from-[#02AAA0] to-[#018b83] rounded-[2.5rem] p-10 shadow-2xl shadow-[#02AAA0]/20 border border-white/10 group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-white/15 transition-all duration-700"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C9AE6C]/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-inner">
              <BarChart3 className="w-10 h-10 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">
                Academic Progress
              </h3>
              <p className="text-white/80 font-medium text-lg">
                Track your journey through course evaluations
              </p>
            </div>
          </div>

          <div className="flex bg-white/10 backdrop-blur-xl rounded-[2rem] p-6 border border-white/20 shadow-xl items-center divide-x divide-white/10">
            <div className="px-8 text-center">
              <div className="text-4xl font-black text-white mb-1 drop-shadow-md">
                {solved?.length || 0}
              </div>
              <div className="text-xs text-white/60 font-black uppercase tracking-widest">
                Finished
              </div>
            </div>
            <div className="px-8 text-center">
              <div className="text-4xl font-black text-[#C9AE6C] mb-1 drop-shadow-md">
                {exams.filter((e) => e.solved === 0).length}
              </div>
              <div className="text-xs text-white/60 font-black uppercase tracking-widest">
                Available
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-3 gap-8">
        {exams.length > 0 ? (
          exams.map((exam) => (
            <div
              key={exam.quiz_id || exam.id}
              className="group relative bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_rgba(2,170,160,0.15)] transition-all duration-700 transform hover:-translate-y-3 border border-white/40 overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#02AAA0]/5 rounded-full blur-3xl group-hover:bg-[#02AAA0]/10 transition-all duration-700"></div>
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#C9AE6C]/5 rounded-full blur-3xl group-hover:bg-[#C9AE6C]/10 transition-all duration-700"></div>

              <div className="relative p-8 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div className="relative">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 ${
                        exam.solved
                          ? "bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-emerald-200"
                          : exam.hidden === "0"
                          ? "bg-gradient-to-br from-[#02AAA0] to-[#02AAA0]/80 shadow-[#02AAA0]/20"
                          : "bg-gradient-to-br from-gray-400 to-gray-500 shadow-gray-200"
                      }`}
                    >
                      {exam.solved ? (
                        <CheckCircle className="w-7 h-7 text-white" />
                      ) : exam.hidden === "0" ? (
                        <Target className="w-7 h-7 text-white" />
                      ) : (
                        <Lock className="w-7 h-7 text-white" />
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {exam.solved === 1 && (
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Solved
                      </span>
                    )}
                    {exam.solved === 0 && (
                      <span className="px-3 py-1 bg-red-500 text-white border border-red-500 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Not Solved
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-gray-900 leading-tight mb-3 group-hover:text-[#02AAA0] transition-colors duration-300">
                    {exam.quiz_title || exam.title}
                  </h3>

                  <p className="my-3 text-sm text-gray-600 font-medium">
                    Group:{" "}
                    <span className="text-gray-400 font-bold ml-1">
                      {exam.group_name}
                    </span>
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span
                      className={`px-4 py-1 rounded-lg text-xs font-extrabold flex items-center gap-1.5 ${
                        exam.solved
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                          : "bg-[#02AAA0]/10 text-[#02AAA0] border border-[#02AAA0]/20"
                      }`}
                    >
                      <Zap className="w-3 h-3" />
                      {exam.quiz_url?.toLowerCase().endsWith(".pdf")
                        ? "Document"
                        : "Comprehensive"}
                    </span>
                    <span className="px-4 py-1 bg-amber-50 text-amber-600 border border-amber-100 rounded-lg text-xs font-extrabold flex items-center gap-1.5">
                      <Star className="w-3 h-3" />
                      Certified
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  {exam.solved ? (
                    <div className="w-full px-6 py-4 bg-emerald-50 text-emerald-600 rounded-[1.25rem] font-black flex items-center gap-3 justify-center border-2 border-emerald-100 shadow-inner">
                      <CheckCircle className="w-5 h-5" />
                      Assignment Submitted
                    </div>
                  ) : exam.hidden === "0" ? (
                    <>
                      {/* Download */}
                      <button
                        onClick={() => handleDownload(exam)}
                        className="w-full px-6 py-4 bg-[#14B8A6] text-white rounded-[1.25rem] font-black shadow-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02] flex items-center gap-3 justify-center"
                      >
                        <Download className="w-5 h-5" />
                        Download PDF
                      </button>

                      {/* Upload */}
                      <div className="relative group/upload">
                        <input
                          ref={(el) =>
                            (fileInputsRef.current[exam.quiz_id] = el)
                          }
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleUploadAnswer(e, exam.quiz_id)}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          disabled={uploadingId === exam.quiz_id}
                        />

                        <button
                          className={`w-full px-6 py-4 bg-gradient-to-r from-[#02AAA0] to-teal-600 text-white rounded-[1.25rem] font-black shadow-2xl transition-all duration-300 flex items-center gap-3 justify-center ${
                            uploadingId === exam.quiz_id
                              ? "opacity-70"
                              : "hover:scale-[1.02] hover:shadow-[#02AAA0]/30"
                          }`}
                        >
                          {uploadingId === exam.quiz_id ? (
                            <Spin size="small" />
                          ) : (
                            <Upload className="w-5 h-5" />
                          )}
                          {uploadingId === exam.quiz_id
                            ? "Uploading..."
                            : "Upload Solution"}
                        </button>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-32 text-center bg-white/50 backdrop-blur-sm rounded-[3rem] border-4 border-dashed border-gray-100">
            <BarChart3 className="w-24 h-24 text-gray-200 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-gray-300 uppercase tracking-widest">
              Assessments Pending
            </h3>
          </div>
        )}
      </div>

      {/* Optional Modal */}
      <Modal
        open={viewResultModal}
        onCancel={() => setViewResultModal(false)}
        footer={null}
      >
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Quiz Completed!
          </h2>
        </div>
      </Modal>
    </div>
  );
}
