"use client";

import { useState, useEffect } from "react";
import {
  X,
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  Globe,
  BookOpen,
  Users,
  Star,
  Target,
  Languages,
  MessageCircle,
  Headphones,
  PenTool,
  CheckCircle,
  Award,
  GraduationCap,
} from "lucide-react";

export default function PrePlacementQuestionsModal({
  isOpen,
  onClose,
  onComplete,
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    learningGoal: null,
    skills: [],
    previousKnowledge: null,
    selfAssessment: null,
  });

  const getIcon = (iconName) => {
    const iconMap = {
      Lightbulb,
      Globe,
      BookOpen,
      Users,
      Star,
      Target,
      Languages,
      MessageCircle,
      Headphones,
      PenTool,
      X,
      CheckCircle,
      Award,
      GraduationCap,
    };
    return iconMap[iconName] || BookOpen;
  };

  const steps = [
    {
      id: "learningGoal",
      question: "Why do you want to learn Egyptian Arabic?",
      icon: "Lightbulb",
      type: "single",
      options: [
        { value: "travel", label: "Travel to Egypt", icon: "Globe" },
        { value: "work", label: "Work/Business", icon: "BookOpen" },
        { value: "family", label: "Connect with Family", icon: "Users" },
        { value: "culture", label: "Culture & Entertainment", icon: "Star" },
        { value: "other", label: "Other", icon: "Target" },
      ],
    },
    {
      id: "skills",
      question: "Which skills do you want to focus on?",
      icon: "Languages",
      type: "multiple",
      options: [
        { value: "speaking", label: "Speaking", icon: "MessageCircle" },
        { value: "listening", label: "Listening", icon: "Headphones" },
        { value: "reading", label: "Reading", icon: "BookOpen" },
        { value: "writing", label: "Writing", icon: "PenTool" },
      ],
    },
    {
      id: "previousKnowledge",
      question: "Have you studied Egyptian Arabic before?",
      icon: "BookOpen",
      type: "single",
      options: [
        { value: "no", label: "No, I'm completely new", icon: "X" },
        { value: "little", label: "A little bit", icon: "CheckCircle" },
        { value: "some", label: "Yes, I have some knowledge", icon: "Award" },
      ],
    },
    {
      id: "selfAssessment",
      question: "How would you rate your current level?",
      icon: "GraduationCap",
      type: "single",
      options: [
        {
          value: "absolute_beginner",
          label: "Absolute Beginner",
          description: "I know nothing about Egyptian Arabic",
          icon: "BookOpen",
        },
        {
          value: "beginner_knowledge",
          label: "Beginner with Previous Knowledge",
          description: "I know some basic words and phrases",
          icon: "BookOpen",
        },
        {
          value: "lower_intermediate",
          label: "Lower Intermediate",
          description: "I can have simple conversations",
          icon: "MessageCircle",
        },
        {
          value: "upper_intermediate",
          label: "Upper Intermediate",
          description: "I can discuss various topics",
          icon: "Users",
        },
        {
          value: "lower_advanced",
          label: "Lower Advanced",
          description: "I'm fluent in most situations",
          icon: "Award",
        },
        {
          value: "upper_advanced",
          label: "Upper Advanced",
          description: "I'm nearly native-level",
          icon: "GraduationCap",
        },
      ],
    },
  ];

  const currentStepData = steps[currentStep];

  const handleAnswer = (stepId, value) => {
    if (currentStepData.type === "multiple") {
      setAnswers((prev) => {
        const currentSkills = prev.skills || [];
        const newSkills = currentSkills.includes(value)
          ? currentSkills.filter((s) => s !== value)
          : [...currentSkills, value];
        return { ...prev, skills: newSkills };
      });
    } else {
      setAnswers((prev) => ({ ...prev, [stepId]: value }));
    }
  };

  const canProceed = () => {
    if (currentStepData.type === "multiple") {
      return answers.skills && answers.skills.length > 0;
    }
    return answers[currentStepData.id] !== null;
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setAnswers({
        learningGoal: null,
        skills: [],
        previousKnowledge: null,
        selfAssessment: null,
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const StepIcon = getIcon(currentStepData.icon);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000] p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-cyan-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <StepIcon className="w-6 h-6 text-teal-600" />
              <div>
                <h2 className="text-xl font-bold text-[#023f4d]">
                  Tell Us About Yourself
                </h2>
                <p className="text-gray-600 text-sm">
                  Step {currentStep + 1} of {steps.length}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="px-6 pt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-teal-600 to-cyan-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-bold text-[#023f4d] mb-8 text-center">
            {currentStepData.question}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentStepData.options.map((option) => {
              const OptionIcon = getIcon(option.icon);
              const isSelected =
                currentStepData.type === "multiple"
                  ? answers.skills?.includes(option.value)
                  : answers[currentStepData.id] === option.value;

              return (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(currentStepData.id, option.value)}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                    isSelected
                      ? "border-teal-500 bg-teal-50 shadow-lg"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? "bg-teal-500 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <OptionIcon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4
                        className={`font-semibold mb-1 ${
                          isSelected ? "text-teal-700" : "text-gray-800"
                        }`}
                      >
                        {option.label}
                      </h4>
                      {option.description && (
                        <p className="text-sm text-gray-600">
                          {option.description}
                        </p>
                      )}
                    </div>

                    {currentStepData.type === "multiple" && (
                      <div
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                          isSelected
                            ? "border-teal-500 bg-teal-500"
                            : "border-gray-300"
                        }`}
                      >
                        {isSelected && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {currentStep === 0 ? "Cancel" : "Back"}
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl hover:from-teal-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {currentStep === steps.length - 1 ? "Complete" : "Next"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
