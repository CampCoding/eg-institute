"use client";

import { Lock, Target, CheckCircle, BookOpen, Play } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EnrollmentSidebar({
  course,
  isLoggedIn,
  onEnrollClick,
}) {
  const router = useRouter();
  const features = course.feature?.split("**CAMP**") || [];

  // ✅ التحقق من ملكية الكورس
  const isOwned = course.own === 1 || course.own === "1";

  const handleContinueLearning = () => {
    router.push(`/my-courses/${course.course_id}`);
  };

  return (
    <div className="sticky top-[6rem]">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        {/* ✅ لو الطالب مشترك في الكورس */}
        {isOwned ? (
          <>
            {/* Enrolled Badge */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-3">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Enrolled</span>
              </div>
            </div>

            <div className="space-y-3">
              {/* Continue Learning Button */}
              <button
                onClick={handleContinueLearning}
                className="w-full bg-gradient-to-r from-[#023f4d] to-teal-600 text-white py-3 px-4 rounded-xl font-semibold hover:to-teal-700 transition-all duration-300 flex items-center justify-center"
              >
                <Play className="w-4 h-4 mr-2" />
                Continue Learning
              </button>

              {/* Go to My Courses */}
              {/* <button
                onClick={() => router.push("/my-courses")}
                className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                My Courses
              </button> */}
            </div>
          </>
        ) : (
          <>
            {/* ✅ لو الطالب مش مشترك - عرض الأسعار */}
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-[#023f4d]">
                ${course.group_price}
              </div>
              <div className="text-lg text-gray-500 line-through">
                ${course.private_price}
              </div>
              <div className="text-sm text-teal-600 font-medium">
                Group Class Price
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-200 mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="w-5 h-5 text-teal-600" />
                  <h4 className="font-semibold text-[#023f4d]">
                    Start Your Journey
                  </h4>
                </div>
                <p className="text-sm text-gray-600">
                  {isLoggedIn
                    ? "Complete a quick assessment to find your perfect starting point"
                    : "Sign in to start your enrollment process"}
                </p>
              </div>

              <button
                onClick={onEnrollClick}
                className="w-full bg-gradient-to-r from-[#023f4d] to-teal-600 text-white py-3 px-4 rounded-xl font-semibold hover:to-teal-700 transition-all duration-300 flex items-center justify-center"
              >
                {isLoggedIn ? (
                  <>
                    <Target className="w-4 h-4 mr-2" />
                    Start Enrollment
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Sign In to Enroll
                  </>
                )}
              </button>

              <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                Add to Wishlist
              </button>
            </div>
          </>
        )}

        {/* Course Features - يظهر دائماً */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 font-semibold">
              This course includes:
            </span>
          </div>
          <div className="space-y-2">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-teal-600" />
              <span className="text-sm text-gray-700">Lifetime Access</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-teal-600" />
              <span className="text-sm text-gray-700">
                Certificate of Completion
              </span>
            </div>
          </div>
        </div>

        {/* Footer - يتغير حسب الحالة */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          {isOwned ? (
            <div className="flex items-center justify-center space-x-2 text-sm text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span>Full lifetime access</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Lock className="w-4 h-4" />
              <span>30-day money-back guarantee</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
