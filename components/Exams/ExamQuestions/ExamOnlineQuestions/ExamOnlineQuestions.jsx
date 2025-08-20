"use client";
import { ArrowRight, CheckCircle, HelpCircle } from "lucide-react";
import React, { useState } from "react";

const sampleQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correct: 2,
  },
  {
    id: 2,
    question: "Which programming language is known for its simplicity?",
    options: ["Assembly", "Python", "C++", "Java"],
    correct: 1,
  },
  {
    id: 3,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correct: 1,
  },
];
export default function ExamOnlineQuestions({ activeTab, setActiveTab }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const submitQuiz = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    sampleQuestions.forEach((q) => {
      if (answers[q.id] === q.correct) correct++;
    });
    return correct;
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
  };

  return (
    <div
      className={`transition-all duration-500 transform ${
        activeTab === 2
          ? "opacity-100 translate-x-0"
          : "opacity-0 absolute inset-0 -translate-x-full"
      }`}
    >
      <div className="p-8">
        {!showResults ? (
          <>
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-[#02AAA0] to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Multiple Choice Quiz
              </h2>
              <p className="text-gray-600">Interactive online examination</p>
            </div>

            {/* Progress Bar */}
            <div className="bg-gray-200 rounded-full h-2 mb-6">
              <div
                className="bg-gradient-to-r from-[#02AAA0] to-cyan-500 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${
                    (Object.keys(answers).length / sampleQuestions.length) * 100
                  }%`,
                }}
              ></div>
            </div>

            <div className="text-center mb-6">
              <span className="text-sm text-gray-600">
                Progress: {Object.keys(answers).length} of{" "}
                {sampleQuestions.length} questions answered
              </span>
            </div>

            {/* Questions */}
            <div className="space-y-6">
              {sampleQuestions.map((question, index) => (
                <div
                  key={question.id}
                  className="bg-gray-50 p-6 rounded-xl border border-gray-100"
                >
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-gradient-to-r from-[#02AAA0] to-cyan-500 text-white rounded-full flex items-center justify-center text-sm">
                      {index + 1}
                    </span>
                    {question.question}
                  </h3>
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        onClick={() =>
                          handleAnswerSelect(question.id, optionIndex)
                        }
                        className={`w-full text-left p-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] ${
                          answers[question.id] === optionIndex
                            ? "bg-gradient-to-r from-[#02AAA0] to-cyan-500 text-white shadow-lg"
                            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                        }`}
                      >
                        <span className="font-medium mr-2">
                          {String.fromCharCode(65 + optionIndex)}.
                        </span>
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="text-center mt-8">
              <button
                onClick={submitQuiz}
                disabled={
                  Object.keys(answers).length !== sampleQuestions.length
                }
                className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto ${
                  Object.keys(answers).length === sampleQuestions.length
                    ? "bg-gradient-to-r from-[#02AAA0] to-cyan-500 text-white shadow-lg hover:shadow-xl"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Submit Quiz
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          /* Results */
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Quiz Completed!
            </h2>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl border border-green-100 mb-6">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {calculateScore()}/{sampleQuestions.length}
              </div>
              <p className="text-green-700">
                You scored{" "}
                {Math.round((calculateScore() / sampleQuestions.length) * 100)}%
              </p>
            </div>
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-gradient-to-r from-[#02AAA0] to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
