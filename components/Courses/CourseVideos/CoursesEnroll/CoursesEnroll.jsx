"use client";

import React, { useState, useEffect } from "react";
import {
  Clock,
  Users,
  Star,
  BookOpen,
  Play,
  Lock,
  CheckCircle,
  ArrowRight,
  Calendar,
  Award,
  Target,
  FileText,
  Brain,
  CreditCard,
  FolderOpen,
  Globe,
  ChevronDown,
  ChevronRight,
  Loader2,
  MessageCircle,
  Headphones,
  PenTool,
  Video,
  Volume2,
  X,
  ArrowLeft,
  Timer,
  AlertCircle,
  Mail,
  CheckSquare,
  UserCheck,
  Lightbulb,
  Languages,
  BookOpenCheck,
  GraduationCap,
} from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import LevelCard from "../../LevelCard";
import OralMeetingModal from "../OralMeetingModal";

// Pre-Placement Questions Modal
// Pre-Placement Questions Modal
const PrePlacementQuestionsModal = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    learningGoal: null,
    skills: [],
    previousKnowledge: null,
    selfAssessment: null,
  });

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
      icon: "BookOpenCheck",
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

  // Icon mapping
  const getIcon = (iconName) => {
    const iconMap = {
      Lightbulb: Lightbulb,
      Globe: Globe,
      BookOpen: BookOpen,
      Users: Users,
      Star: Star,
      Target: Target,
      Languages: Languages,
      MessageCircle: MessageCircle,
      Headphones: Headphones,
      PenTool: PenTool,
      BookOpenCheck: BookOpenCheck,
      X: X,
      CheckCircle: CheckCircle,
      Award: Award,
      GraduationCap: GraduationCap,
    };
    return iconMap[iconName] || BookOpen;
  };

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
    }
  };

  if (!isOpen) return null;

  const StepIcon = getIcon(currentStepData.icon);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000] p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
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

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-teal-600 to-cyan-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
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

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
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
};

// Class Type Selection Modal (Group vs Private)
const ClassTypeSelectionModal = ({
  isOpen,
  onClose,
  onSelectType,
  isAbsoluteBeginner,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000] p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-cyan-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#023f4d]">
                Choose Your Learning Path
              </h2>
              <p className="text-gray-600 text-sm">
                Select the type of classes that works best for you
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Group Classes */}
            <button
              onClick={() => onSelectType("group")}
              className="group p-8 rounded-2xl border-2 border-gray-200 hover:border-teal-500 hover:bg-teal-50 transition-all duration-300 text-left"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-[#023f4d] mb-3">
                Group Classes
              </h3>

              <p className="text-gray-600 mb-6">
                Learn with other students in an interactive and engaging
                environment
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-teal-600" />
                  <span>4-8 students per class</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-teal-600" />
                  <span>Fixed schedule</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-teal-600" />
                  <span>Interactive activities</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-teal-600" />
                  <span>More affordable</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-3xl font-bold text-teal-600">$149</div>
                <div className="text-sm text-gray-500">per month</div>
              </div>
            </button>

            {/* Private Classes */}
            <button
              onClick={() => onSelectType("private")}
              className="group p-8 rounded-2xl border-2 border-gray-200 hover:border-cyan-500 hover:bg-cyan-50 transition-all duration-300 text-left relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </div>

              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <UserCheck className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-[#023f4d] mb-3">
                Private Classes
              </h3>

              <p className="text-gray-600 mb-6">
                One-on-one personalized lessons tailored to your goals and pace
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-cyan-600" />
                  <span>Individual attention</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-cyan-600" />
                  <span>Flexible schedule</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-cyan-600" />
                  <span>Customized curriculum</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-5 h-5 text-cyan-600" />
                  <span>Faster progress</span>
                </div>
                {!isAbsoluteBeginner && (
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle className="w-5 h-5 text-cyan-600" />
                    <span>Includes placement test & trial</span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-3xl font-bold text-cyan-600">$299</div>
                <div className="text-sm text-gray-500">per month</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Schedule Selection Modal
const ScheduleSelectionModal = ({
  isOpen,
  onClose,
  onSelectSchedule,
  type,
  needsTrial,
}) => {
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  // Sample schedules
  const schedules = [
    {
      id: 1,
      day: "Saturday & Monday",
      time: "10:00 AM - 12:00 PM",
      startDate: "Dec 15, 2024",
      available: true,
    },
    {
      id: 2,
      day: "Sunday & Wednesday",
      time: "2:00 PM - 4:00 PM",
      startDate: "Dec 18, 2024",
      available: true,
    },
    {
      id: 3,
      day: "Tuesday & Thursday",
      time: "6:00 PM - 8:00 PM",
      startDate: "Dec 20, 2024",
      available: false,
    },
  ];

  const handleConfirm = () => {
    if (selectedSchedule) {
      onSelectSchedule(selectedSchedule);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000] p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-cyan-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#023f4d]">
                {needsTrial
                  ? "Select Schedule for Placement Test & Trial"
                  : "Select Your Schedule"}
              </h2>
              <p className="text-gray-600 text-sm">
                Choose a schedule that works for you
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-3 mb-6">
            {schedules.map((schedule) => (
              <button
                key={schedule.id}
                onClick={() =>
                  schedule.available && setSelectedSchedule(schedule)
                }
                disabled={!schedule.available}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                  selectedSchedule?.id === schedule.id
                    ? "border-teal-500 bg-teal-50"
                    : schedule.available
                    ? "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    : "border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Calendar
                      className={`w-5 h-5 ${
                        selectedSchedule?.id === schedule.id
                          ? "text-teal-600"
                          : "text-gray-400"
                      }`}
                    />
                    <div>
                      <div className="font-semibold text-gray-800">
                        {schedule.day}
                      </div>
                      <div className="text-sm text-gray-600">
                        {schedule.time}
                      </div>
                      <div className="text-xs text-gray-500">
                        Starts: {schedule.startDate}
                      </div>
                    </div>
                  </div>
                  {!schedule.available && (
                    <span className="text-sm text-red-600 font-medium">
                      Fully Booked
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={handleConfirm}
            disabled={!selectedSchedule}
            className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-teal-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Confirm Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

// Email Notification Component (Updated)
const EmailNotificationModal = ({
  isOpen,
  onClose,
  courseData,
  userAnswers,
  selectedClassType,
  selectedSchedule,
}) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setEmail("");
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen || !courseData) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000] p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-cyan-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-teal-600" />
              <div>
                <h2 className="text-xl font-bold text-[#023f4d]">
                  {isSubmitted
                    ? "Enrollment Confirmed!"
                    : "Complete Enrollment"}
                </h2>
                <p className="text-gray-600 text-sm">
                  {isSubmitted
                    ? "Check your inbox for next steps"
                    : "We'll send you enrollment details"}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {!isSubmitted ? (
            <div>
              {/* Enrollment Summary */}
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-[#023f4d] mb-3">
                  Enrollment Summary:
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Class Type:</span>
                    <span className="font-bold text-[#023f4d]">
                      {selectedClassType === "group"
                        ? "Group Classes"
                        : "Private Classes"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Level:</span>
                    <span className="font-bold text-teal-600">
                      {userAnswers?.selfAssessment
                        ?.replace(/_/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                  </div>
                  {selectedSchedule && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Schedule:</span>
                        <span className="font-medium text-gray-800">
                          {selectedSchedule.day}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium text-gray-800">
                          {selectedSchedule.time}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <p className="text-gray-600 mb-4">
                Enter your email address and we'll send you:
              </p>
              <ul className="text-sm text-gray-600 mb-4 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600" />
                  Payment link and instructions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600" />
                  Course access details
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600" />
                  Welcome materials and resources
                </li>
              </ul>

              <form onSubmit={handleSubmitEmail}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="w-full bg-gradient-to-r from-[#023f4d] to-teal-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-[#023f4d] hover:to-teal-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 mr-2" />
                      Send Enrollment Information
                    </>
                  )}
                </button>
              </form>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">
                  By providing your email, you agree to receive course
                  information and enrollment details.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckSquare className="w-8 h-8 text-green-600" />
              </div>

              <h3 className="text-xl font-bold text-[#023f4d] mb-2">
                Enrollment Email Sent!
              </h3>

              <p className="text-gray-600 mb-4">
                We've sent detailed enrollment information to{" "}
                <strong>{email}</strong>
              </p>

              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-[#023f4d] mb-2">
                  What's Next?
                </h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600" />
                    <span>Check your email for payment link</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600" />
                    <span>Complete the payment within 48 hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600" />
                    <span>
                      You'll receive course access immediately after payment
                    </span>
                  </div>
                  {selectedClassType === "private" &&
                    userAnswers?.selfAssessment !== "absolute_beginner" && (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-teal-600" />
                        <span>
                          We'll confirm your placement test & trial schedule
                        </span>
                      </div>
                    )}
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Placement Test Component (Simplified - only for non-absolute beginners)
const PlacementTestModal = ({ isOpen, onClose, onComplete, courseTitle }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1200);
  const [showResults, setShowResults] = useState(false);
  const [testScore, setTestScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What does 'أهلاً وسهلاً' mean in English?",
      options: ["Good morning", "Welcome/Hello", "How are you?", "Goodbye"],
      correct: 1,
    },
    {
      id: 2,
      question: "How do you say 'My name is...' in Egyptian Arabic?",
      options: ["اسمي...", "أنا اسمي...", "اسمي هو...", "إسمي..."],
      correct: 0,
    },
    {
      id: 3,
      question: "What is the Egyptian Arabic word for 'water'?",
      options: ["ماية", "مويا", "مايه", "All of the above"],
      correct: 3,
    },
    {
      id: 4,
      question: "Complete the phrase: 'إزايك يا...' (How are you...)",
      options: [
        "حبيبي/حبيبتي",
        "أستاذ/أستاذة",
        "صديقي/صديقتي",
        "All are correct",
      ],
      correct: 3,
    },
    {
      id: 5,
      question: "What does 'معلش' mean in Egyptian Arabic?",
      options: ["Thank you", "Never mind/It's okay", "Excuse me", "I'm sorry"],
      correct: 1,
    },
  ];

  useEffect(() => {
    if (isOpen && !showResults && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0 && !showResults) {
      handleSubmitTest();
    }
  }, [timeLeft, isOpen, showResults]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers({
      ...answers,
      [questionId]: answerIndex,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmitTest();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitTest = async () => {
    setIsSubmitting(true);

    let score = 0;
    questions.forEach((question) => {
      if (answers[question.id] === question.correct) {
        score += 1;
      }
    });

    const percentage = Math.round((score / questions.length) * 100);
    setTestScore(percentage);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowResults(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000] p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-cyan-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#023f4d]">
                Placement Test
              </h2>
              <p className="text-gray-600 text-sm">{courseTitle}</p>
            </div>
            {!showResults && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Timer className="w-4 h-4" />
                  <span
                    className={timeLeft < 300 ? "text-red-600 font-medium" : ""}
                  >
                    {formatTime(timeLeft)}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {!showResults && !isSubmitting ? (
            <>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-sm text-gray-500">
                    {Math.round(
                      ((currentQuestion + 1) / questions.length) * 100
                    )}
                    % Complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-teal-600 to-cyan-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        ((currentQuestion + 1) / questions.length) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#023f4d] mb-6">
                  {questions[currentQuestion].question}
                </h3>

                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        handleAnswerSelect(questions[currentQuestion].id, index)
                      }
                      className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                        answers[questions[currentQuestion].id] === index
                          ? "border-teal-500 bg-teal-50 text-teal-700"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            answers[questions[currentQuestion].id] === index
                              ? "border-teal-500 bg-teal-500"
                              : "border-gray-300"
                          }`}
                        >
                          {answers[questions[currentQuestion].id] === index && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span className="font-medium">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 0}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>

                <button
                  onClick={handleNextQuestion}
                  disabled={
                    answers[questions[currentQuestion].id] === undefined
                  }
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:from-teal-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {currentQuestion === questions.length - 1
                    ? "Submit Test"
                    : "Next"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : isSubmitting ? (
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 animate-spin text-teal-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#023f4d] mb-2">
                Evaluating Your Responses
              </h3>
              <p className="text-gray-600">
                Please wait while we calculate your placement level...
              </p>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#023f4d] mb-2">
                  Test Complete!
                </h3>
                <p className="text-gray-600">
                  Here are your placement test results
                </p>
              </div>

              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 mb-6">
                <div className="text-4xl font-bold text-[#023f4d] mb-2">
                  {testScore}%
                </div>
                <p className="text-gray-600">
                  You answered{" "}
                  {Math.round((testScore / 100) * questions.length)} out of{" "}
                  {questions.length} questions correctly
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    onComplete(testScore);
                    onClose();
                  }}
                  className="flex-1 bg-gradient-to-r from-[#023f4d] to-teal-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-[#023f4d] hover:to-teal-700 transition-all duration-200"
                >
                  Continue Enrollment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CoursesEnroll = ({ params }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedUnits, setExpandedUnits] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [subject, setSubject] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // New states for enrollment flow
  const [showPrePlacementQuestions, setShowPrePlacementQuestions] =
    useState(false);
  const [showPlacementTest, setShowPlacementTest] = useState(false);
  const [showClassTypeSelection, setShowClassTypeSelection] = useState(false);
  const [showScheduleSelection, setShowScheduleSelection] = useState(false);
  const [showEmailNotification, setShowEmailNotification] = useState(false);

  const [userAnswers, setUserAnswers] = useState(null);
  const [placementTestScore, setPlacementTestScore] = useState(null);
  const [selectedClassType, setSelectedClassType] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const unwrappedParams = params;

  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem("egy-user");
    setIsLoggedIn(!!user);
  }, []);

  useEffect(() => {
    const fetchSubjectData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const subjectData = {
        id: unwrappedParams?.id,
        title: "Egyptian Arabic Complete Course",
        description:
          "Master Egyptian Arabic from beginner to advanced with comprehensive lessons covering daily conversations, cultural contexts, and practical communication skills.",
        longDescription:
          "This comprehensive Egyptian Arabic course is designed for learners who want to communicate effectively in everyday Egyptian life. Through interactive lessons, real-life dialogues, and cultural insights, you'll learn to speak, understand, and interact confidently in Egyptian Arabic.",
        instructor: "Ahmed Hassan",
        duration: "12 weeks",
        students: 2847,
        rating: 4.9,
        reviews: 312,
        price: 149,
        originalPrice: 199,
        totalExams: 36,
        totalFlashcardSets: 24,
        image: "/images/online-course-of-study.jpg",
        advertisingVideoType: "url",
        advertisingVideoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        publicExams: [
          {
            id: 1,
            title: "Egyptian Arabic Basics - Free Trial",
            questions: 20,
            duration: "25 min",
            type: "MCQ",
            isFree: true,
            description: "Test your basic Egyptian Arabic knowledge",
          },
        ],
        units: [
          {
            id: 1,
            title: "Unit 1: Getting Started with Egyptian Arabic",
            description:
              "Foundation of Egyptian Arabic communication and pronunciation",
            topics: [
              {
                id: 1,
                title: "Arabic Alphabet & Pronunciation",
                description:
                  "Master the Arabic alphabet and Egyptian pronunciation patterns",
                exams: [
                  {
                    id: 1,
                    title: "Alphabet Recognition Test",
                    questions: 30,
                    duration: "35 min",
                    type: "MCQ",
                    isPreview: true,
                  },
                ],
                flashcardSets: [
                  {
                    id: 1,
                    title: "Arabic Letters",
                    cards: 28,
                    isCompleted: false,
                    isPreview: true,
                    category: "Alphabet",
                  },
                ],
              },
            ],
          },
        ],
      };

      setSubject(subjectData);
      setIsLoading(false);
    };

    fetchSubjectData();
  }, [unwrappedParams.id]);

  const handleStartEnrollment = () => {
    // Check if user is logged in
    if (!isLoggedIn) {
      // Redirect to login page
      router.push("/login");
      return;
    }

    // Start the enrollment flow
    setShowPrePlacementQuestions(true);
  };

  const handlePrePlacementComplete = (answers) => {
    setUserAnswers(answers);
    setShowPrePlacementQuestions(false);

    // If absolute beginner, skip placement test
    if (answers.selfAssessment === "absolute_beginner") {
      setShowClassTypeSelection(true);
    } else {
      // Show placement test for other levels
      setShowPlacementTest(true);
    }
  };

  const handlePlacementTestComplete = (score) => {
    setPlacementTestScore(score);
    setShowPlacementTest(false);
    setShowClassTypeSelection(true);
  };

  const handleClassTypeSelect = (type) => {
    setSelectedClassType(type);
    setShowClassTypeSelection(false);

    // Determine if needs trial/placement scheduling
    const needsScheduling =
      type === "group" ||
      (type === "private" &&
        userAnswers?.selfAssessment !== "absolute_beginner");

    if (needsScheduling) {
      setShowScheduleSelection(true);
    } else {
      // For absolute beginner private classes, go straight to email
      setShowEmailNotification(true);
    }
  };

  const handleScheduleSelect = (schedule) => {
    setSelectedSchedule(schedule);
    setShowScheduleSelection(false);
    setShowEmailNotification(true);
  };

  const toggleUnit = (unitId) => {
    const newExpandedUnits = new Set(expandedUnits);
    if (newExpandedUnits.has(unitId)) {
      newExpandedUnits.delete(unitId);
    } else {
      newExpandedUnits.add(unitId);
    }
    setExpandedUnits(newExpandedUnits);
  };

  const renderAdvertisingVideo = () => {
    if (!subject?.advertisingVideoType) return null;

    let videoSrc = null;

    if (subject.advertisingVideoType === "url" && subject.advertisingVideoUrl) {
      videoSrc = subject.advertisingVideoUrl;
    }

    if (!videoSrc) return null;

    return (
      <div className="mb-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Video className="w-6 h-6 text-[#023f4d]" />
              <div>
                <h2 className="text-xl font-bold text-[#023f4d]">
                  Course Preview
                </h2>
                <p className="text-gray-600 text-sm">
                  Get a taste of what you'll learn in this course
                </p>
              </div>
            </div>
          </div>

          <div className="relative bg-black">
            <video
              className="w-full h-auto max-h-[500px] object-cover"
              controls
              preload="metadata"
              poster={subject.image}
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
              onEnded={() => setIsVideoPlaying(false)}
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-2 text-sm">
                <Volume2 className="w-4 h-4" />
                <span>Course Introduction</span>
              </div>
            </div>

            {isVideoPlaying && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium animate-pulse">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  LIVE PREVIEW
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-gradient-to-r from-teal-50 to-cyan-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-semibold text-[#023f4d] mb-1">
                  Why Choose This Course?
                </h3>
                <p className="text-gray-600 text-sm">
                  Watch this preview to understand our teaching methodology and
                  course quality
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4 text-teal-600" />
                  <span>
                    {subject.students.toLocaleString()} students enrolled
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>{subject.rating} rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!subject) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#023f4d] mx-auto mb-4" />
          <p className="text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {renderAdvertisingVideo()}

              {/* Subject Header */}
              <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-1/3">
                    <div className="relative">
                      <img
                        src={subject.image}
                        alt={subject.title}
                        className="w-full h-48 object-cover rounded-xl"
                      />
                      <button className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors rounded-xl">
                        <Brain className="w-12 h-12 text-white" />
                      </button>
                    </div>
                  </div>

                  <div className="lg:w-2/3">
                    <h1 className="text-3xl font-bold text-[#023f4d] mb-4">
                      {subject.title}
                    </h1>
                    <p className="text-gray-600 mb-6">{subject.description}</p>

                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-teal-600" />
                        <span className="text-sm text-gray-600">
                          {subject.duration}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-teal-600" />
                        <span className="text-sm text-gray-600">
                          {subject.students} students
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <span className="text-sm text-gray-600">
                          {subject.rating} ({subject.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white rounded-2xl shadow-sm">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6 overflow-x-auto">
                    <button
                      onClick={() => setActiveTab("overview")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                        activeTab === "overview"
                          ? "border-[#023f4d] text-[#023f4d]"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab("units")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                        activeTab === "units"
                          ? "border-[#023f4d] text-[#023f4d]"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Course Content
                    </button>
                    <button
                      onClick={() => setActiveTab("instructor")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                        activeTab === "instructor"
                          ? "border-[#023f4d] text-[#023f4d]"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Instructor
                    </button>
                    <button
                      onClick={() => setActiveTab("levels")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                        activeTab === "levels"
                          ? "border-[#023f4d] text-[#023f4d]"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Levels
                    </button>
                  </nav>
                </div>

                <div className="p-6">
                  {activeTab === "overview" && (
                    <div>
                      <h3 className="text-xl font-bold text-[#023f4d] mb-4">
                        Course Overview
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {subject.longDescription}
                      </p>

                      <h4 className="text-lg font-bold text-[#023f4d] mb-4">
                        What you'll learn:
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-teal-600 mt-1" />
                          <span className="text-gray-700">
                            Read and write Arabic script fluently
                          </span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-teal-600 mt-1" />
                          <span className="text-gray-700">
                            Engage in everyday Egyptian conversations
                          </span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-teal-600 mt-1" />
                          <span className="text-gray-700">
                            Understand Egyptian movies and TV shows
                          </span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-teal-600 mt-1" />
                          <span className="text-gray-700">
                            Master Egyptian expressions and idioms
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "units" && (
                    <div>
                      <h3 className="text-xl font-bold text-[#023f4d] mb-6">
                        Course Content
                      </h3>
                      <div className="space-y-4">
                        {subject.units.map((unit) => (
                          <div
                            key={unit.id}
                            className="border border-gray-200 rounded-xl overflow-hidden hover:border-[#023f4d] transition-colors"
                          >
                            <button
                              onClick={() => toggleUnit(unit.id)}
                              className="w-full p-6 bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
                            >
                              <div className="flex items-center space-x-3">
                                <FolderOpen className="w-6 h-6 text-[#023f4d]" />
                                <div className="text-left">
                                  <h4 className="text-lg font-bold text-[#023f4d]">
                                    {unit.title}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    {unit.description}
                                  </p>
                                </div>
                              </div>
                              {expandedUnits.has(unit.id) ? (
                                <ChevronDown className="w-5 h-5 text-[#023f4d]" />
                              ) : (
                                <ChevronRight className="w-5 h-5 text-[#023f4d]" />
                              )}
                            </button>

                            {expandedUnits.has(unit.id) && (
                              <div className="border-t border-gray-200 bg-gray-50 p-6">
                                <div className="space-y-4">
                                  {unit.topics.map((topic) => (
                                    <div
                                      key={topic.id}
                                      className="bg-white rounded-lg p-4 border border-gray-200"
                                    >
                                      <h5 className="font-semibold text-[#023f4d] mb-2">
                                        {topic.title}
                                      </h5>
                                      <p className="text-sm text-gray-600">
                                        {topic.description}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "instructor" && (
                    <div>
                      <h3 className="text-xl font-bold text-[#023f4d] mb-4">
                        About the Instructor
                      </h3>
                      <div className="grid grid-cols-[auto_1fr] gap-4">
                        <div className="w-[64px] h-[64px] bg-[#023f4d] rounded-full flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">
                            AH
                          </span>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-[#023f4d]">
                            {subject.instructor}
                          </h4>
                          <p className="text-gray-600 mb-4">
                            Native Egyptian Arabic Teacher & Cultural Expert
                          </p>
                          <p className="text-gray-600">
                            Ahmed Hassan is a certified Arabic language
                            instructor with over 10 years of experience.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "levels" && (
                    <div className="grid grid-cols-2 gap-5">
                      <LevelCard />
                      <LevelCard />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-[6rem]">
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-[#023f4d]">
                      ${subject.price}
                    </div>
                    <div className="text-lg text-gray-500 line-through">
                      ${subject.originalPrice}
                    </div>
                    <div className="text-sm text-teal-600 font-medium">
                      25% off - Limited Time
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
                      onClick={handleStartEnrollment}
                      className="w-full bg-gradient-to-r from-[#023f4d] to-teal-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-[#023f4d] hover:to-teal-700 transition-all duration-300 flex items-center justify-center"
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

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 font-semibold">
                        This course includes:
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-teal-600" />
                        <span className="text-sm text-gray-700">
                          {subject.totalExams} Practice Tests
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-teal-600" />
                        <span className="text-sm text-gray-700">
                          {subject.totalFlashcardSets} Flashcard Sets
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-teal-600" />
                        <span className="text-sm text-gray-700">
                          Lifetime Access
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-teal-600" />
                        <span className="text-sm text-gray-700">
                          Certificate of Completion
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                      <Lock className="w-4 h-4" />
                      <span>30-day money-back guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <PrePlacementQuestionsModal
        isOpen={showPrePlacementQuestions}
        onClose={() => setShowPrePlacementQuestions(false)}
        onComplete={handlePrePlacementComplete}
      />

      {/* <PlacementTestModal
        isOpen={showPlacementTest}
        onClose={() => setShowPlacementTest(false)}
        onComplete={handlePlacementTestComplete}
        courseTitle={subject.title}
      /> */}

      <OralMeetingModal
        open={showPlacementTest}
        onClose={() => setShowPlacementTest(false)}
        onSubmit={handlePlacementTestComplete}
      />

      <ClassTypeSelectionModal
        isOpen={showClassTypeSelection}
        onClose={() => setShowClassTypeSelection(false)}
        onSelectType={handleClassTypeSelect}
        isAbsoluteBeginner={userAnswers?.selfAssessment === "absolute_beginner"}
      />

      <ScheduleSelectionModal
        isOpen={showScheduleSelection}
        onClose={() => setShowScheduleSelection(false)}
        onSelectSchedule={handleScheduleSelect}
        type={selectedClassType}
        needsTrial={
          selectedClassType === "private" &&
          userAnswers?.selfAssessment !== "absolute_beginner"
        }
      />

      <EmailNotificationModal
        isOpen={showEmailNotification}
        onClose={() => setShowEmailNotification(false)}
        courseData={subject}
        userAnswers={userAnswers}
        selectedClassType={selectedClassType}
        selectedSchedule={selectedSchedule}
      />
    </>
  );
};

export default CoursesEnroll;
